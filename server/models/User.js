import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // hide by default
    },
    img: { type: String, default: null },
  },
  { timestamps: true }
);

// enforce unique index at schema level
userSchema.index({ email: 1 }, { unique: true });

// Hash password before saving (only when modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = Number(process.env.BCRYPT_ROUNDS) || 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// Transform output: remove sensitive/internal fields, expose id
function hidePrivate(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.password;
}
userSchema.set("toJSON", { transform: hidePrivate });
userSchema.set("toObject", { transform: hidePrivate });

const User = mongoose.model("User", userSchema);
export default User;
