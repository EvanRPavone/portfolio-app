// # controllers/projects.controller.ts
import { Request, Response } from "express";
import session from "express-session";
import { getSheetData } from "../services/sheets.services";
import dotenv from "dotenv";
import SheetRanges from "../config/sheetRanges.json";

dotenv.config();

// Extend request with session data
interface AuthenticatedRequest extends Request {
  session: session.Session & Partial<session.SessionData>;
}

export const getProjects = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const accessToken = req.session.tokens?.access_token;

    if (!accessToken) {
      res.status(401).send("User not authenticated or missing token.");
      return;
    }

    const sheetId = process.env.GOOGLE_SHEET_ID!;
    const range = SheetRanges.Projects.range;

    const rows = await getSheetData(accessToken, sheetId, range);

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
