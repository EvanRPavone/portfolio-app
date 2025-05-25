import express from "express";
import { getCustomization } from "../controllers/customization.controller";

const router = express.Router();

router.get("/customization", getCustomization);

export default router;
