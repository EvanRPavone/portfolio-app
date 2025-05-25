import express from "express";
import { login, handleCallback } from "../controllers/auth.controller";

const router = express.Router();

router.get("/auth", login);
router.get("/auth/callback", handleCallback);

export default router;
