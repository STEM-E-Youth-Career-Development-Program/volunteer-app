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
    const { spreadsheetId, name } = req.body;  // name is a 2D array of names 

    try {
        console.log("Received name array:", name);  // Log the received data

        // 1. Find the first empty row in the existing sheet (Sheet1)
        const range = "Sheet1!A:A"; 
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

        // 5. Prepare hyperlinks
        const hyperlinks = sheetIds.map((sheetId, index) => {
            const personName = name[index][0]; 
            const hyperlink = `=HYPERLINK("https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=${sheetId}", "${personName}")`;
            return [hyperlink];
        });

        // 6. Update the main sheet with hyperlink
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Sheet1!A${firstEmptyRow}`,  // Overwrite the name cell with the hyperlink
            valueInputOption: "USER_ENTERED",
            resource: { values: hyperlinks },
        });

        res.status(200).json({
            message: "Data written and new sheets created successfully with links.",
            response: addSheetResponse.data,
        });
    } catch (error) {
        console.error("Error writing to Google Sheets:", error);
        res.status(500).json({
            error: `Failed to write to Google Sheets: ${error.message}`,
        });
    }
});


// Start the server
const PORT = 5001; // Or any port you prefer
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
