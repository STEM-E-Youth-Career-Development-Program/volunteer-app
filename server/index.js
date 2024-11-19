const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Load service account credentials
const serviceAccount = require("../volunteer-app/testing-steme-c916a02a8270.json");

const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// API endpoint to write data to Google Sheets
app.post("/api/write-to-sheet", async (req, res) => {
    const ORIGINAL_SHEET = "Summary";
    const PVSA_SHEET = "PVSA";

    const { spreadsheetId, name } = req.body;  // name is a 2D array of names 

    try {
        console.log("Received name array:", name);  // Log the received data

        // 1. Find the first empty row in the existing sheet 
        const range = `${ORIGINAL_SHEET}!A:A`; 
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values || [];
        const firstEmptyRow = rows.length + 1; 

        // 2. Create a new sheet for each person in the array and prepare hyperlinks
        const requests = name.map(([personName], index) => {
            const newSheetTitle = personName;  // Title of the new sheet is the person's name

            return {
                addSheet: {
                    properties: {
                        title: newSheetTitle,  
                    },
                },
            };
        });

        // 3. Execute the batch update to create multiple sheets
        const addSheetResponse = await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests,  // Pass array of requests
            },
        });

        // 4. Get the sheetId of each newly created sheet (for hyperlinks)
        const sheetIds = addSheetResponse.data.replies.map(reply => reply.addSheet.properties.sheetId);

        // 5. Populate (each sheet) with calendar template
        const MONTHS = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ];
        
        await Promise.all(
            sheetIds.map(async (sheetId, index) => {
                const personName = name[index][0]; 
        
                // Calendar structure 
                const calendarData = [
                    [
                        personName, "REMEMBER: Include any time for meetings, calls, events, trainings, computer research, and work",
                        ...Array(6).fill(""),
                        `=HYPERLINK("https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=0", "BACK TO SUMMARY PAGE")`, // Link back to summary page
                    ], // Name, reminder, link
                    ["Date", ...MONTHS], // Months
                    ...Array.from({ length: 31 }, (_, i) => [i + 1, ...Array(12).fill("")]), // Days of the month
                ];

                const TIME_SHEET_DIRECTIONS = [
                    ["TIME SHEET DIRECTIONS"],
                    ["1. Click on your name to go to your tab"],
                    ["2. Find the date you volunteered: find the month up top and date to the left"],
                    ["3. Enter the number of hours in the cross-referenced cell. Only enter numbers"],
                    ["4. You may enter numbers in quarters of an hour (every 15 minutes) by entering in 0.25 increments (1.00, 1.25, 1.50, 1.75)"],
                    ["5. The summary sheet will auto update with your total hours."]
                ];

                // Time Sheet Directions
                TIME_SHEET_DIRECTIONS.forEach((row, i) => {
                    calendarData[i] = [...(calendarData[i] || []), ...Array(13-calendarData[i].length).fill(""), row[0]]; // Extend to column 'N'
                });
        
                // Summation rows (total hours)
                const totalRow = [
                    "TOTAL", 
                    ...MONTHS.map((_, colIndex) => `=SUM(${String.fromCharCode(66+colIndex)}3:${String.fromCharCode(66+colIndex)}33)`),
                ];
                const yearlyTotalRow = [...Array(11).fill(""), "Yearly Total", `=SUM(B34:M34)`];
        
                calendarData.push(totalRow);
                calendarData.push(yearlyTotalRow); 
        
                // Write the table to the new sheet
                const range = `'${personName}'!A1`; 
                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range,
                    valueInputOption: "USER_ENTERED", 
                    resource: { values: calendarData },
                });

                // Combining settings values and data validation -> need request array instead of 2d nested array
                const dataValidationRequest = {
                    requests: [
                        {
                            updateCells: {
                                range: {
                                    sheetId: sheetId,
                                    startRowIndex: 11, 
                                    endRowIndex: 12, 
                                    startColumnIndex: 14,
                                    endColumnIndex: 15,
                                },
                                rows: [
                                    {
                                        values: [
                                            {
                                                userEnteredValue: {
                                                    stringValue: "D.O.B (MM/DD/YYYY)",
                                                },
                                            },
                                        ],
                                    },
                                ],
                                fields: "userEnteredValue",
                            },
                        },
                        {
                            updateCells: {
                                range: {
                                    sheetId: sheetId,
                                    startRowIndex: 12,
                                    endRowIndex: 13,
                                    startColumnIndex: 14,
                                    endColumnIndex: 15,
                                },
                                rows: [
                                    {
                                        values: [
                                            {
                                                userEnteredValue: {
                                                    stringValue: "U.S. Citizen/Green Card Holder?",
                                                },
                                            },
                                        ],
                                    },
                                ],
                                fields: "userEnteredValue",
                            },
                        },
                        // Data Validation Cell
                        {
                            setDataValidation: {
                                range: {
                                    sheetId: sheetId, 
                                    startRowIndex: 12, 
                                    endRowIndex: 13,
                                    startColumnIndex: 15, 
                                    endColumnIndex: 16, 
                                },
                                rule: {
                                    condition: {
                                        type: "ONE_OF_LIST", // Only true or false
                                        values: [
                                            { userEnteredValue: "Yes" },
                                            { userEnteredValue: "No" },
                                        ],
                                    },
                                    showCustomUi: true, // Allows the dropdown UI to appear in Sheets
                                    strict: true, // Restrict values to the dropdown options
                                },
                            },
                        },
                    ],
                };
        
                // Batch update request to set data validation
                await sheets.spreadsheets.batchUpdate({
                    spreadsheetId,
                    requestBody: dataValidationRequest,
                });
            })
        );
        

        // 6. Prepare the data for each row (including the A1 cell from the created sheet)
        const rowsToWrite = sheetIds.map((sheetId, index) => {
            const personName = name[index][0]; 
            const hyperlink = `=HYPERLINK("https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=${sheetId}", "${personName}")`;

            const totalHours = `='${personName}'!M35`; 
            const currentDate = new Date().toLocaleDateString();
            const todayFormula = "=TODAY()";
            const weeknumFormula = `=WEEKNUM(D${firstEmptyRow+index}-C${firstEmptyRow+index},1)`;
            const divisionFormula = `=B${firstEmptyRow+index}/E${firstEmptyRow+index}`;

            return [
                hyperlink,
                totalHours,
                currentDate,
                todayFormula,
                weeknumFormula,
                divisionFormula
            ];
        });

        // 7. Write the data to the sheet
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${ORIGINAL_SHEET}!A${firstEmptyRow}`, // Write starting at the first empty row
            valueInputOption: "USER_ENTERED", // Allow formulas
            resource: { values: rowsToWrite },
        });

        res.status(200).json({
            message: "Data written and new sheets created successfully with links.",
            response: addSheetResponse.data,
        });
    } catch (error) {
        console.error("Error writing to Google Sheets:", error);
        /*
        res.status(500).json({
            error: `Failed to write to Google Sheets: ${error.message}`,
        });
        */
    }
});


// Start the server
const PORT = 5001; // Or any port you prefer
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
