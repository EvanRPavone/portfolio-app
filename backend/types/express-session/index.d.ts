import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      name: string;
      email: string;
      picture?: string;
    };
    tokens?: {
      access_token: string;
      refresh_token?: string;
      expiry_date?: number;
    };
  }
}
