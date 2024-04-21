import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteList, listing } from "../controllers/list.controller.js";

const router = express.Router();

router.post("/create", verifyToken, listing);
router.delete("/delete/:id",verifyToken, deleteList);
export default router;
