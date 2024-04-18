import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { listing } from "../controllers/list.controller.js";

const router = express.Router();

router.post("/create", verifyToken, listing);
export default router;
