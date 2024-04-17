import express from "express";
import { DeleteAccount, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/test", (req, res) => {
//   res.json({
//     message: "API is working..",
//   });
// });
router.get("/test", test);
router.put("/update/:id", verifyToken,updateUser);
router.delete("/delete/:id",verifyToken,DeleteAccount)

export default router;
