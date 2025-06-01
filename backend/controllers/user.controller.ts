import { Request, Response } from "express";
import { google } from "googleapis";
import { googleClient } from "../config/googleClient";
import { getSheetData } from "../services/sheets.services";
import sheetRanges from "../config/sheetRanges.json";

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const sheetId = process.env.GOOGLE_SHEET_ID!;
        const sheetRange = sheetRanges["UserInfo"].range;
        const rows = await getSheetData(sheetId, sheetRange);

        const [headers, ...data] = rows;
        const sheetUser = data.length > 0
            ? headers.reduce((acc, header, i) => {
                  acc[header] = data[0][i] || "";
                  return acc;
              }, {} as Record<string, string>)
            : {};

        // Fetch the authenticated Google user profile
        const oauth2 = google.oauth2({ version: "v2", auth: googleClient });
        const { data: profile } = await oauth2.userinfo.get();

        // Merge profile picture into the user info from the sheet
        const mergedUser = {
            ...sheetUser,
            picture: profile.picture || ""
        };

        res.json([mergedUser]); // keeping it as an array to match existing frontend usage
    } catch (error) {
        console.error("❌ Error fetching user info:", error);
        res.status(500).json({ error: "Failed to fetch user info" });
    }
};
