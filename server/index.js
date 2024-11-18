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
    const { spreadsheetId, name } = req.body;  // 'name' is a 2D array of names (first name, last name)

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

        // 2. Format and write all names to the sheet
        const values = name; 
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Sheet1!A${firstEmptyRow}`,
            valueInputOption: "RAW",
            resource: { values },
        });

        // 3. Create a new sheet for each person in the array
        const requests = name.map(([firstName]) => {
            const newSheetTitle = firstName;  
            return {
                addSheet: {
                    properties: {
                        title: newSheetTitle,  // Make title of new sheet the name of the person
                    },
                },
            };
        });

        // 4. Execute the batch update to create multiple sheets
        const addSheetResponse = await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests,  // Pass the array of requests (one for each name)
            },
        });

        res.status(200).json({
            message: "Data written and new sheets created successfully",
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
