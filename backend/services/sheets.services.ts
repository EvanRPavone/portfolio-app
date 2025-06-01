import { google } from "googleapis";
import { googleClient } from "../config/googleClient";

/**
 * Fetches raw values from a specified sheet range
 */
export const getSheetData = async (sheetId: string, range: string): Promise<string[][]> => {
  try {
    const sheets = google.sheets({ version: "v4", auth: googleClient });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error("❌ Google Sheets API error:", error);
    throw new Error("Failed to fetch data from Google Sheets");
  }
};
export const getTagOptions = async (): Promise<string[]> => {
  const rows = await getSheetData(process.env.GOOGLE_SHEET_ID!, "TagOptions!A1:A");
  return rows.map((row) => row[0]).filter(Boolean);
};