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

app.listen(port, () => {
  console.log(`App listen on port http://localhost:${port}`);
});
