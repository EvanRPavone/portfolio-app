// backend/controllers/images.controller.ts
import { Request, Response } from "express";
import { getSheetData } from "../services/sheets.services";
import dotenv from "dotenv";
import SheetRanges = require("../config/sheetRanges.json");

dotenv.config();

export const getImages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID!;
    const range = SheetRanges.Images.range;

    const rows = await getSheetData(sheetId, range);

    if (!rows || rows.length === 0) {
      res.status(404).send("No images found.");
      return;
    }

    const [headers, ...data] = rows;
    const images = data.map((row) =>
      headers.reduce((acc, header, i) => {
        acc[header] = row[i] || "";
        return acc;
      }, {} as Record<string, string>)
    );

    res.json(images);
  } catch (error) {
    console.error("❌ Error fetching image data:", error);
    res.status(500).send("Failed to fetch images.");
  }
};
