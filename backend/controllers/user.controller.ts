import { Request, Response } from "express";
import { googleClient } from "../config/googleClient";
import { google } from "googleapis";

export const getUserInfo = async (_req: Request, res: Response): Promise<void> => {
  try {
    const oauth2 = google.oauth2({
      version: "v2",
      auth: googleClient,
    });

    const response = await oauth2.userinfo.get();
    const user = response.data;

    res.json({
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    console.error("❌ Failed to get user info:", error);
    res.status(500).send("Unable to fetch user info.");
  }
};
