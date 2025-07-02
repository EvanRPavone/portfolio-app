import express, { Application, Request, Response } from "express";
// import * as session from "express-session";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Route imports
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/projects.routes";
import imagesRoutes from "./routes/images.routes";
import customizationRoutes from "./routes/customization.routes";

const app: Application = express();
const port = process.env.PORT || 3001;

// CORS config
const allowedOrigins = process.env.FRONTEND_URL?.split(",") || [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("✅ Portfolio backend is running!");
});

// Mount routes
app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", userRoutes);
app.use("/api", imagesRoutes);
app.use("/api", customizationRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
