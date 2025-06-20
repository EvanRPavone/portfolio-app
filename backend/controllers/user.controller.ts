import { Response, Request } from "express";
import session from "express-session";
import { google } from "googleapis";
import { googleClient } from "../config/googleClient";
import { getSheetData } from "../services/sheets.services";
import sheetRanges from "../config/sheetRanges.json";

// Extend request to include session tokens
interface AuthenticatedRequest extends Request {
  session: session.Session & Partial<session.SessionData>;
}

export const getUserInfo = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const accessToken = req.session.tokens?.access_token;

    if (!accessToken) {
      res.status(401).json({ error: "User not authenticated or missing token." });
      return;
    }

    const sheetId = process.env.GOOGLE_SHEET_ID!;
    const sheetRange = sheetRanges["UserInfo"].range;

    const rows = await getSheetData(accessToken, sheetId, sheetRange);

    const [headers, ...data] = rows;
    const sheetUser =
      data.length > 0
        ? headers.reduce((acc, header, i) => {
            acc[header] = data[0][i] || "";
            return acc;
          }, {} as Record<string, string>)
        : {};

    const tokens = req.session.tokens;
    if (!tokens) {
    res.status(401).json({ error: "Missing Google credentials" });
    return;
    }

    googleClient.setCredentials(tokens);

    // Fetch profile picture
    const oauth2 = google.oauth2({ version: "v2", auth: googleClient });
    const { data: profile } = await oauth2.userinfo.get();

    const mergedUser = {
      ...sheetUser,
      picture: profile.picture || "",
    };

    res.json([mergedUser]);
  } catch (error) {
    console.error("❌ Error fetching user info:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};
