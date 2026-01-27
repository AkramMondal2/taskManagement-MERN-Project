import express from "express";
import {
  forgotPassword,
  login,
  logout,
  refreshAccessToken,
  register,
  resendVerification,
  resetPassword,
} from "../controllers/userController.js";
import { verification } from "../emailVerify/verifyMail.js";
import { checkToken } from "../middleware/checkToken.js";
import { validationSchema } from "../middleware/validationSchema.js";
import {
  forgotPasswordSchema,
  validateUserSchema,
} from "../validator/validateUserSchema.js";

const userRouter = express.Router();

userRouter.post("/register", validationSchema(validateUserSchema), register);
userRouter.post("/verifymail", verification);
userRouter.post("/login", login);
userRouter.post("/logout", checkToken, logout);
userRouter.post("/resendVerification", resendVerification);
userRouter.post("/refreshAccessToken", refreshAccessToken);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post(
  "/resetPassword/:token",
  validationSchema(forgotPasswordSchema),
  resetPassword,
);

export default userRouter;
