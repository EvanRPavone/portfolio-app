import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import { googleClient } from "../config/googleClient";

dotenv.config();

export const login = (req: Request, res: Response): void => {
  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });

  res.send(`
    <h2>🔐 Click below to log in with Google:</h2>
    <a href="${url}" target="_blank">Login with Google</a>
  `);
};

export const handleCallback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).send("Missing authorization code");
    return;
  }

  try {
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    console.log("✅ Tokens received:");
    console.log(tokens);

    res.send("✅ Login successful. Tokens received!");
  } catch (error) {
    console.error("❌ Error exchanging code:", error);
    res.status(500).send("OAuth token exchange failed");
  }
};
