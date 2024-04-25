import express from "express";
import {
  DeleteAccount,
  getUserListings,
  test,
  updateUser,
  getUser,
  getUserListingsUpdate,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/test", (req, res) => {
//   res.json({
//     message: "API is working..",
//   });
// });
router.get("/test", test);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, DeleteAccount);
// router.get("/listings/:id", verifyToken, getUserListings);
router.get("/listings", verifyToken, getUserListingsUpdate);
router.get("/:id", getUser);

export default router;
