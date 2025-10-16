import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Workout category is required"],
      trim: true,
    },
    workoutName: {
      type: String,
      required: [true, "Workout name is required"],
      trim: true,
    },
    sets: {
      type: Number,
      min: [0, "Sets cannot be negative"],
      default: 0,
    },
    reps: {
      type: Number,
      min: [0, "Reps cannot be negative"],
      default: 0,
    },
    weight: {
      type: Number,
      min: [0, "Weight cannot be negative"],
      default: 0,
    },
    duration: {
      type: Number, // in minutes or seconds (you can clarify in comments)
      min: [0, "Duration cannot be negative"],
      default: 0,
    },
    caloriesBurned: {
      type: Number,
      min: [0, "Calories burned cannot be negative"],
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 🔒 Prevent duplicate workout names *for the same user*
workoutSchema.index({ user: 1, workoutName: 1 }, { unique: true });

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
