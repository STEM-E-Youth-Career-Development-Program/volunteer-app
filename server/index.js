// Node JS Backend to be able to write to the spreadsheet
    // Need to run it along side the npm start (node)

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
    const { spreadsheetId, range, values } = req.body;

    try {
        const response = await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: "RAW",
            resource: { values },
        });

        res.status(200).json({ message: "Data written successfully", response: response.data });
    } catch (error) {
        console.error("Error writing to Google Sheets:", error);
        res.status(500).json({ error: "Failed to write to Google Sheets" });
    }
});

// Start the server
const PORT = 5001; // Or any port you prefer
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
