import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  deleteList,
  listing,
  updateList,
} from "../controllers/list.controller.js";

const router = express.Router();

router.post("/create", verifyToken, listing);
router.delete("/delete/:id", verifyToken, deleteList);
router.put("/update/:id", verifyToken, updateList);
export default router;
