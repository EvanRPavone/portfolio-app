import { Request, Response } from "express";
import { getSheetData } from "../services/sheets.services";
import dotenv from "dotenv";
import SheetRanges from "../config/sheetRanges.json";

dotenv.config();

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID!;
    const range = SheetRanges.Projects.range;// Adjust range based on sheet structure

    const rows = await getSheetData(sheetId, range);

    if (!rows || rows.length === 0) {
      res.status(404).send("No project data found.");
      return;
    }

    const [headers, ...data] = rows;

    const projects = data.map((row) =>
      headers.reduce((acc, header, i) => {
        acc[header] = row[i] || "";
        return acc;
      }, {} as Record<string, string>)
    );

    res.json(projects);
  } catch (error) {
    console.error("❌ Error fetching project data:", error);
    res.status(500).send("Failed to fetch project data");
  }
};
