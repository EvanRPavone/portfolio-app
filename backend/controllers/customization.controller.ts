import { Request, Response } from "express";
import { getSheetData } from "../services/sheets.services";
import dotenv from "dotenv";
import SheetRanges = require("../config/sheetRanges.json");

dotenv.config();

export const getCustomization = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID!;
    const range = SheetRanges.Customization.range;; // Row 1 = headers, Row 2 = values

    const rows = await getSheetData(sheetId, range);

    if (!rows || rows.length < 2) {
      res.status(404).send("Customization data not found.");
      return;
    }

    const [headers, values] = rows;
    const customization = headers.reduce((acc, header, i) => {
      acc[header] = values[i] || "";
      return acc;
    }, {} as Record<string, string>);

    res.json(customization);
  } catch (error) {
    console.error("❌ Error fetching customization data:", error);
    res.status(500).send("Failed to fetch customization.");
  }
};
