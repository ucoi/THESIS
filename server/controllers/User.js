import dotenv from "dotenv";
dotenv.config();
import Workout from "../models/Workout.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../error.js"; // keep if you use centralized errors

const JWT_SECRET = process.env.JWT || "replace_with_secure_secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

/* ------------------------------ LOGIN USER ------------------------------- */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Email and password required"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });

    return res.status(200).json({
      token, // 👈 Make sure token is returned
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* ----------------------------- REGISTER USER ----------------------------- */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, img } = req.body || {};

    if (!name || !email || !password) {
      return next(
        createError
          ? createError(400, "Name, email and password are required")
          : new Error("400: Name, email and password are required")
      );
    }

    const normalizedEmail = String(email).toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail }).exec();
    if (existing) {
      return next(
        createError
          ? createError(409, "Email is already in use.")
          : new Error("409: Email is already in use.")
      );
    }

    // Do NOT hash here: model pre-save hook will hash password
    const user = new User({
      name,
      email: normalizedEmail,
      password,
      img,
    });

    const createdUser = await user.save();

    const token = jwt.sign({ id: createdUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    const safeUser = createdUser.toObject
      ? createdUser.toObject()
      : createdUser;
    // toObject transform already removes password/_id/__v, but normalize id just in case
    safeUser.id = safeUser.id || safeUser._id;
    delete safeUser._id;
    delete safeUser.__v;

    return res.status(201).json({ token, user: safeUser });
  } catch (err) {
    next(err);
  }
};

/* --------------------------- USER DASHBOARD DATA -------------------------- */
export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found"));

    const currentDate = new Date();
    const startToday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endToday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );

    // 🔹 Total calories burned today
    const totalCaloriesBurntAgg = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: { _id: null, totalCaloriesBurnt: { $sum: "$caloriesBurned" } },
      },
    ]);
    const totalCaloriesBurnt =
      totalCaloriesBurntAgg[0]?.totalCaloriesBurnt || 0;

    // 🔹 Total workouts today
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    // 🔹 Average calories per workout
    const avgCaloriesBurntPerWorkout =
      totalWorkouts > 0 ? totalCaloriesBurnt / totalWorkouts : 0;

    // 🔹 Calories by category (for Pie Chart)
    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);
    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    // 🔹 Past 7 days chart
    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const dayData = await Workout.aggregate([
        {
          $match: { user: user._id, date: { $gte: startOfDay, $lt: endOfDay } },
        },
        {
          $group: {
            _id: null,
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
      ]);

      caloriesBurnt.push(dayData[0]?.totalCaloriesBurnt || 0);
    }

    return res.status(200).json({
      totalCaloriesBurnt,
      totalWorkouts,
      avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: { weeks, caloriesBurned: caloriesBurnt },
      pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

/* --------------------------- GET WORKOUTS BY DATE -------------------------- */
export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found"));

    const date = req.query.date ? new Date(req.query.date) : new Date();
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, w) => total + (w.caloriesBurned || 0),
      0
    );

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};

/* ------------------------------ ADD WORKOUTS ------------------------------ */
export const addWorkout = async (req, res, next) => {
  try {
    console.log("Received body:", req.body);

    const userId = req.user?.id || req.userId;
    if (!userId) return next(createError(401, "Unauthorized"));

    const { category, workout, date } = req.body;

    if (!workout || !workout.toString().trim()) {
      return next(createError(400, "Workout details required"));
    }

    // Parse the workout string
    const lines = workout
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let parsedCategory = category || "general";
    let workoutName = "";
    let sets = 0;
    let reps = 0;
    let weight = 0;
    let duration = 0;

    lines.forEach((line) => {
      if (line.startsWith("#")) {
        parsedCategory = line.substring(1).trim();
      } else if (line.startsWith("-") && !line.includes(":")) {
        // First dash line without colon is the workout name
        if (!workoutName) workoutName = line.substring(1).trim();
      } else if (line.toLowerCase().includes("sets:")) {
        sets = parseInt(line.split(":")[1]) || 0;
      } else if (line.toLowerCase().includes("reps:")) {
        reps = parseInt(line.split(":")[1]) || 0;
      } else if (line.toLowerCase().includes("weight:")) {
        weight = parseFloat(line.split(":")[1]) || 0;
      } else if (line.toLowerCase().includes("duration:")) {
        const durationStr = line.split(":")[1].trim();
        duration = parseInt(durationStr) || 0;
      }
    });

    if (!workoutName) {
      return next(createError(400, "Workout name is required"));
    }

    // Calculate calories (simple formula: you can adjust)
    const caloriesBurned = Math.round(
      sets * reps * weight * 0.1 + duration * 5
    );

    const newWorkout = await Workout.create({
      user: userId,
      category: parsedCategory,
      workoutName,
      sets,
      reps,
      weight,
      duration,
      caloriesBurned,
      date: date ? new Date(date) : new Date(),
    });

    return res.status(201).json({ success: true, data: newWorkout });
  } catch (err) {
    console.error("[addWorkout] error:", err);

    // Handle duplicate workout name error
    if (err.code === 11000) {
      return next(createError(400, "Workout with this name already exists"));
    }

    next(err);
  }
};

/* ------------------------- HELPER: PARSE WORKOUT -------------------------- */
const parseWorkoutLine = (parts) => {
  if (parts.length >= 5) {
    try {
      const details = {
        workoutName: parts[1].substring(1).trim(),
        sets: parseInt(parts[2].split("sets")[0].substring(1).trim(), 10),
        reps: parseInt(
          parts[2].split("sets")[1].split("reps")[0].substring(1).trim(),
          10
        ),
        weight: parseFloat(parts[3].split("kg")[0].substring(1).trim()),
        duration: parseFloat(parts[4].split("min")[0].substring(1).trim()),
      };
      return details;
    } catch {
      return null;
    }
  }
  return null;
};

/* ---------------------- HELPER: CALCULATE CALORIES ------------------------ */
const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = parseInt(workoutDetails.duration, 10) || 0;
  const weightInKg = parseInt(workoutDetails.weight, 10) || 0;
  // More realistic approximation using MET values
  const MET = 8; // average for moderate workouts
  return ((durationInMinutes * MET * weightInKg) / 200).toFixed(1);
};

/* ------------------------------ DELETE WORKOUTS ------------------------------ */
export const deleteWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.userId;
    const { workoutId } = req.params;

    if (!userId) return next(createError(401, "Unauthorized"));
    if (!workoutId) return next(createError(400, "Workout ID required"));

    // Find the workout and verify it belongs to the user
    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return next(createError(404, "Workout not found"));
    }

    if (workout.user.toString() !== userId) {
      return next(createError(403, "You can only delete your own workouts"));
    }

    await Workout.findByIdAndDelete(workoutId);

    return res.status(200).json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (err) {
    console.error("[deleteWorkout] error:", err);
    next(err);
  }
};
