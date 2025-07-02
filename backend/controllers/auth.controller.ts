// portfolio-app/backend/controllers/auth.controller.ts
/// <reference types="../types/express-session" />
import { Response, Request } from "express";
import { google } from "googleapis";
import { googleClient } from "../config/googleClient";

// GET /api/auth
export const login = (_req: Request, res: Response): void => {
  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ];

  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });

  res.redirect(url);
};

// GET /api/auth/callback
export const handleCallback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).send("Missing authorization code");
    return;
  }

  try {
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    const oauth2 = google.oauth2("v2");
    const userInfoResponse = await oauth2.userinfo.get({ auth: googleClient });

    const { id, name, email, picture } = userInfoResponse.data;

    // Save user and tokens into session (auto-typed via index.d.ts)
    req.session.user = {
      id: id || "",
      name: name || "",
      email: email || "",
      picture: picture || "",
    };
    req.session.tokens = {
        access_token: tokens.access_token!,
        refresh_token: tokens.refresh_token ?? undefined,
        expiry_date: tokens.expiry_date ?? undefined,
    };

    console.log("✅ Session user set:", req.session.user);

    const redirectUrl = process.env.FRONTEND_URL?.split(",")[0] || "http://localhost:5173";
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("❌ Error during OAuth callback:", error);
    res.status(500).send("OAuth callback failed");
  }
};

// GET /api/auth/status
export const checkAuthStatus = (req: Request, res: Response) => {
  const user = req.session.user;
  if (user) {
    console.log("user:", user);
    const isOwner = user.email === process.env.OWNER_EMAIL;
    console.log(isOwner)
    res.json({ authenticated: true, user, isOwner });
  } else {
    res.json({ authenticated: false });
  }
};
