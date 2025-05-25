import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/projects.routes";
import imagesRoutes from "./routes/images.routes";
import customizationRoutes from "./routes/customization.routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check
app.get("/", (_req: Request, res: Response) => {
    res.send("✅ Portfolio backend is running!");
});

// Routes
app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", userRoutes);
app.use("/api", imagesRoutes);
app.use("/api", customizationRoutes);

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
