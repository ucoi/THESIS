import express from "express";
import {
  registerUser,
  loginUser,
  getUserDashboard,
  getWorkoutsByDate,
  addWorkout,
  deleteWorkout,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);
router.delete("/workout/:workoutId", verifyToken, deleteWorkout);

export default router;
