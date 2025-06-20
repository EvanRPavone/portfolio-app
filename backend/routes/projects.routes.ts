import express from "express";
import { getProjects } from "../controllers/projects.controller";
import { getTagOptions } from "../services/sheets.services";

const router = express.Router();

router.get("/projects", getProjects);

router.get("/tags", async (req, res) => {
  try {
    const accessToken = req.session.tokens?.access_token;

    if (!accessToken) {
      res.status(401).json({ error: "Unauthorized. Missing access token." });
      return;
    }

    const tags = await getTagOptions(accessToken);
    res.json(tags);
  } catch (err) {
    console.error("❌ Error fetching tag options:", err);
    res.status(500).json({ error: "Failed to fetch tag options" });
  }
});

export default router;
