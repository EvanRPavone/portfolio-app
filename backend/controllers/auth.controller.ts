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
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
    redirect_uri: `${process.env.BACKEND_URL}/api/auth/callback`,
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

    // 🔐 Owner email check
    if (email !== process.env.OWNER_EMAIL) {
      console.warn("🚫 Unauthorized login attempt from:", email);
      res.status(403).send("Access denied: not the site owner.");
      return; // <== CRITICAL: Stop execution after sending response!
    }

    // ✅ Save user and tokens into session
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
    if (!res.headersSent) {
      res.status(500).send("OAuth callback failed");
    }
  }
};

// GET /api/auth/status
export const checkAuthStatus = (req: Request, res: Response): void => {
  const user = req.session?.user;
  const email = user?.email;

  if (email) {
    const isOwner = email === process.env.OWNER_EMAIL;
    res.json({ authenticated: true, user, isOwner });
  } else {
    res.json({ authenticated: false });
  }
};
