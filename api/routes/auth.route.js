import {
  signUp,
  signIn,
  google,
  signOut,
} from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/google", google);
router.get("/sign-out", signOut);

export default router;
