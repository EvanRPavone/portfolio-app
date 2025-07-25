// portfolio-app/backend/config/googleClient.ts

import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

export const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);
