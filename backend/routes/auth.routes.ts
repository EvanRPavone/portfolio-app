import express from "express";
import { login, handleCallback, checkAuthStatus } from "../controllers/auth.controller";

const router = express.Router();

router.get("/auth", login);
router.get("/auth/callback", handleCallback);
router.get("/auth/status", checkAuthStatus); // ← NEW

export default router;
