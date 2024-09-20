import { google } from 'googleapis';

const SHEET_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export const createSheetAndExportData = async (data) => {
    console.log(data)
  const auth = new google.auth.GoogleAuth(
    
    SHEET_SCOPES
  );

  const sheets = google.sheets({ version: 'v1', auth });

  try {
    // Create a new spreadsheet
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: 'New Spreadsheet',
        },
      },
    });

    const spreadsheetId = spreadsheet.data.spreadsheetId;

    // Prepare data for export
    // Assuming each object in 'data' has the same keys
    const headers = Object.keys(data[0]);
    const values = data.map(obj => headers.map(header => obj[header]));

    // Add headers to the first row
    const fullValues = [headers, ...values];

    // Update the spreadsheet with data
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: fullValues,
      },
    });

    console.log(`Spreadsheet created: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
  }
};
