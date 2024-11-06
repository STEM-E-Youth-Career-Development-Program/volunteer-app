import { db, collection, getDocs } from "./index.js"
const { google } = require('googleapis');
const { OAuth2 } = require('google-auth-library');

// TO BE CHANGED WITH ACTUAL CREDENTIALS
const credentials = require('./credentials.json'); 

const oauth2Client = new OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

// Function to authenticate and authorize
async function authorize() {
  const tokens = await oauth2Client.getToken('YOUR_AUTHORIZATION_CODE');
  oauth2Client.setCredentials(tokens.tokens);
}

const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

// Spreadsheet ID (find this in the URL of the Google Sheets document)
const spreadsheetId = 'SPREADSHEET-ID';

export async function writeMemberToSheet(member) {
    if (member.timesheetCreated) {
        console.log(`${member.name}'s timesheet has already been created.`);
        return; 
    }

    // Define the row to add - TO BE CHANGED WITH ACTUAL VALUES LATER ON
    const newRow = [
      member.name,
    ];
  
    try {
      // Append the new row to the sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: 'Sheet1!A:A', 
        valueInputOption: 'RAW',
        resource: {
          values: [newRow]
        }
      });
  
      console.log(`Timesheet added for ${member.name}!`);

      // After adding the member to the Google Sheets, mark as 'timesheetCreated' in Firestore
      const memberRef = doc(db, "members", member.id); //unique id?
      await updateDoc(memberRef, {
        timesheetCreated: true
      });
  
      console.log(`Timesheet added for ${member.name}!`);
    } catch (err) {
      console.error('Error writing to Google Sheets:', err);
    }
}
  
