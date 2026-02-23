import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerifyMail } from "../emailVerify/sendVerifyMail.js";
import sessionSchema from "../models/sessionSchema.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userSchema.create({
      userName,
      email,
      password: hashedPassword,
      verified: false,
    });

    const emailToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });

    await sendVerifyMail(emailToken, email);

    return res.status(201).json({
      success: true,
      emailToken,
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "You are not registered",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified. Please verify your email first.",
      });
    }

    await sessionSchema.findOneAndDelete({ userId: user._id });
    await sessionSchema.create({ userId: user._id });

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );

    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      id: user._id,
      name: user.userName,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const session = await sessionSchema.findOneAndDelete({
      userId: req.userId,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "No active session found for this user",
      });
    }
    await userSchema.findByIdAndUpdate(req.userId, {
      isLoggedIn: false,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    const emailToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });

    await sendVerifyMail(emailToken, email);

    return res.status(200).json({
      success: true,
      message: "Verification email resent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    const user = await userSchema.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const session = await sessionSchema.findOne({
      userId: user._id,
    });

    if (!session) {
      return res.status(403).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;

    await resend.emails.send({
      from: "onboarding@resend.dev", // free testing sender
      to: email,
      subject: "Reset Password",
      html: `
        <div style="font-family:sans-serif">
          <h2>Reset Your Password</h2>
          <p>Click the button below to reset your password:</p>
          
          <a href="${resetLink}" 
             style="display:inline-block;padding:10px 20px;
             background:#d9534f;color:white;
             text-decoration:none;border-radius:5px;">
             Reset Password
          </a>

          <p>This link expires in 15 minutes.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to email",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Reset link is invalid or expired",
      });
    }

    const user = await userSchema.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.isLoggedIn = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
