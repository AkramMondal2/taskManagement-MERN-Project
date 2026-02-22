import express from "express";
import dotenv from "dotenv/config";
import { dbConnect } from "./src/config/dbConnect.js";
import userRouter from "./src/routers/userRouter.js";
import taskRouter from "./src/routers/taskRouter.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8001;

dbConnect();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTestMail = async () => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // এটা পরিবর্তন করবে না
      to: "abcmondalxyz@gmail.com", // এখানে তোমার নিজের email দাও
      subject: "Test Email",
      html: "<h1>Hello! Resend working 🚀</h1>",
    });

    console.log("Email Sent:", response);
  } catch (error) {
    console.error("Error:", error);
  }
};
await sendTestMail();

app.listen(port, () => {
  console.log(`App listen on port http://localhost:${port}`);
});
