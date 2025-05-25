import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const oAuth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!,
});

export default oAuth2Client;
