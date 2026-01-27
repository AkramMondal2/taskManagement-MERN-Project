import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";

export const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        code: "TOKEN_MISSING",
        message: "Access token is missing",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    } catch (error) {

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          code: "TOKEN_EXPIRED",
          message: "Access token expired",
        });
      }

      return res.status(401).json({
        success: false,
        code: "TOKEN_INVALID",
        message: "Invalid access token",
      });
    }

    const user = await userSchema.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    req.userId = decoded.id;
    next();

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
