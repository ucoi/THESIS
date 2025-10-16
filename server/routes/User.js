import express from "express";
import {
  registerUser,
  loginUser,
  getUserDashboard,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/dashboard", verifyToken, getUserDashboard);

export default router;
