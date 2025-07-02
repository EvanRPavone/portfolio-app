// backend/controllers/user.controller.ts
import { Response, Request } from "express";
import { getSheetData } from "../services/sheets.services";
import sheetRanges from "../config/sheetRanges.json";
import dotenv from "dotenv";

dotenv.config();

export const getUserInfo = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID!;
    const sheetRange = sheetRanges["UserInfo"].range;

    const rows = await getSheetData(sheetId, sheetRange);

    const [headers, ...data] = rows;

    if (!headers || !data.length) {
      res.status(404).json({ error: "User info not found." });
      return;
    }

    const sheetUser = headers.reduce((acc, header, i) => {
      acc[header] = data[0][i] || "";
      return acc;
    }, {} as Record<string, string>);

    res.json([sheetUser]);
  } catch (error) {
    console.error("❌ Error fetching user info:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};
