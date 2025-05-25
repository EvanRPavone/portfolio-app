import express from "express";
import { getImages } from "../controllers/images.controller";

const router = express.Router();

router.get("/images", getImages);

export default router;
