import express from "express";
import { getProjects } from "../controllers/projects.controller";
import { getTagOptions } from "../services/sheets.services";

const router = express.Router();

router.get("/projects", getProjects);

router.get("/tags", async (_req, res) => {
  try {
    const tags = await getTagOptions(); // ✅ no access token needed anymore
    res.json(tags);
  } catch (err) {
    console.error("❌ Error fetching tag options:", err);
    res.status(500).json({ error: "Failed to fetch tag options" });
  }
});

export default router;
