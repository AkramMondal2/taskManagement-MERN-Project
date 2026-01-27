import express from "express";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
  updateCompleteTask,
  updateImportantTask,
  getOneTask,
} from "../controllers/taskController.js";
import { checkToken } from "../middleware/checkToken.js";
import { validationSchema } from "../middleware/validationSchema.js";
import { validateTaskSchema } from "../validator/validateTaskSchema.js";

const taskRouter = express.Router();

taskRouter.post(
  "/addtask",
  checkToken,
  validationSchema(validateTaskSchema),
  addTask,
);
taskRouter.get("/gettask", checkToken, getTask);
taskRouter.delete("/deletetask/:id", checkToken, deleteTask);
taskRouter.put("/updatedtask/:id", checkToken, updateTask);
taskRouter.get("/getonetask/:id", checkToken, getOneTask);
taskRouter.put("/updatecompletetask/:id", checkToken, updateCompleteTask);
taskRouter.put("/updateimportanttask/:id", checkToken, updateImportantTask);

export default taskRouter;
