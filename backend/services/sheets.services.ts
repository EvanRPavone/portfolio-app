// backend/services/sheets.services.ts
import { google } from "googleapis";
import { JWT } from "google-auth-library";
import fs from "fs";
import path from "path";

// Load service account credentials from file
const keyPath = path.join(__dirname, "../config/service-account.json");
const keyFile = fs.readFileSync(keyPath, "utf-8");
const credentials = JSON.parse(keyFile);

const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes,
});

const sheets = google.sheets({ version: "v4", auth });

/**
 * Reads a range from a Google Sheet using service account auth
 */
export const getSheetData = async (
  sheetId: string,
  range: string
): Promise<string[][]> => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error("❌ Google Sheets API error:", error);
    throw new Error("Failed to fetch data from Google Sheets");
  }
};
