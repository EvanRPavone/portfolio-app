import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

/**
 * Create an auth client from a user's access token
 */
const getAuthedSheetsClient = (accessToken: string) => {
  const auth = new OAuth2Client();
  auth.setCredentials({ access_token: accessToken });
  return google.sheets({ version: "v4", auth });
};

/**
 * Fetches raw values from a specified sheet range using the user's access token
 */
export const getSheetData = async (
  accessToken: string,
  sheetId: string,
  range: string
): Promise<string[][]> => {
  try {
    const sheets = getAuthedSheetsClient(accessToken);

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

export const getTagOptions = async (accessToken: string): Promise<string[]> => {
  const rows = await getSheetData(accessToken, process.env.GOOGLE_SHEET_ID!, "TagOptions!A1:A");
  return rows.map((row) => row[0]).filter(Boolean);
};
