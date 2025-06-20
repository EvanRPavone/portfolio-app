import { Response, Request } from "express";
import session from "express-session";
import { getSheetData } from "../services/sheets.services";
import dotenv from "dotenv";
import SheetRanges = require("../config/sheetRanges.json");

dotenv.config();

interface AuthenticatedRequest extends Request {
  session: session.Session & Partial<session.SessionData>;
}

export const getCustomization = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const accessToken = req.session.tokens?.access_token;

    if (!accessToken) {
      res.status(401).send("User not authenticated or missing token.");
      return;
    }

    const sheetId = process.env.GOOGLE_SHEET_ID!;
    const range = SheetRanges.Customization.range;

    const rows = await getSheetData(accessToken, sheetId, range);

    if (!rows || rows.length < 2) {
      res.status(404).send("Customization data not found.");
      return;
    }

    const [headers, values] = rows;

    const customization = headers.reduce((acc, header, i) => {
      const normalizedKey = header.toLowerCase().replace(/\s+/g, "");
      acc[normalizedKey] = values[i] || "";
      return acc;
    }, {} as Record<string, string>);

    res.json(customization);
  } catch (error) {
    console.error("❌ Error fetching customization data:", error);
    res.status(500).send("Failed to fetch customization.");
  }
};
