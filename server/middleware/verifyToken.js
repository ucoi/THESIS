import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { createError } from "../error.js";

const JWT_SECRET = process.env.JWT || "replace_with_secure_secret";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization || req.headers["x-access-token"];
    if (!authHeader)
      return next(createError(401, "No authorization header provided"));

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;
    if (!token) return next(createError(401, "No token provided"));

    if (!JWT_SECRET) return next(createError(500, "JWT secret not configured"));

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    // If jwt.verify throws, return unauthorized
    return next(createError(401, "Invalid or expired token"));
  }
};
