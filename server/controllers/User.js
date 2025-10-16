import dotenv from "dotenv";
dotenv.config();
import Workout from "../models/Workout.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../error.js"; // keep if you use centralized errors

const JWT_SECRET = process.env.JWT || "replace_with_secure_secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

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

/* ------------------------------ LOGIN USER ------------------------------- */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return next(
        createError
          ? createError(400, "Email and password are required")
          : new Error("400: Email and password are required")
      );
    }

    const normalizedEmail = String(email).toLowerCase();
    // include password for comparison
    const user = await User.findOne({ email: normalizedEmail })
      .select("+password")
      .exec();
    if (!user) {
      return next(
        createError
          ? createError(404, "User not found")
          : new Error("404: User not found")
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(
        createError
          ? createError(403, "Incorrect password")
          : new Error("403: Incorrect password")
      );
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    const safeUser = user.toObject ? user.toObject() : user;
    safeUser.id = safeUser.id || safeUser._id;
    delete safeUser._id;
    delete safeUser.__v;
    delete safeUser.password;

    return res.status(200).json({ token, user: safeUser });
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
    const userId = req.user?.id;
    const { workoutString } = req.body;

    if (!workoutString)
      return next(createError(400, "Workout string is missing"));

    const eachworkout = workoutString.split(";").map((line) => line.trim());
    const categories = eachworkout.filter((line) => line.startsWith("#"));
    if (categories.length === 0)
      return next(createError(400, "No categories found"));

    const parsedWorkouts = [];
    let currentCategory = "";
    let count = 0;

    for (const line of eachworkout) {
      count++;
      if (line.startsWith("#")) {
        const parts = line.split("\n").map((p) => p.trim());
        if (parts.length < 5)
          return next(
            createError(400, `Workout data missing at line ${count}`)
          );

        currentCategory = parts[0].substring(1).trim();
        const workoutDetails = parseWorkoutLine(parts);
        if (!workoutDetails)
          return next(createError(400, "Invalid workout format"));

        workoutDetails.category = currentCategory;
        parsedWorkouts.push(workoutDetails);
      }
    }

    // Calculate and save each workout
    for (const workout of parsedWorkouts) {
      workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
      await Workout.create({ ...workout, user: userId });
    }

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
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
