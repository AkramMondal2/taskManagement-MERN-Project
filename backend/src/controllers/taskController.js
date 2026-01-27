import mongoose from "mongoose";
import taskSchema from "../models/taskSchema.js";

export const getTask = async (req, res) => {
  try {
    const tasks = await taskSchema.find({ userId: req.userId });

    return res.status(200).json({
      success: true,
      message:
        tasks.length === 0 ? "No tasks found" : "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body || {};

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingTask = await taskSchema.findOne({
      title,
      userId: req.userId,
    });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "Task already exists",
      });
    }

    const task = await taskSchema.create({
      title,
      description,
      userId: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const deletedTask = await taskSchema.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "No matching task found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedTask = await taskSchema.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, description },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "No matching task found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const getOneTask = await taskSchema.findOne({
      userId: req.userId,
      _id: id,
    });
    if (!getOneTask) {
      return res.status(404).json({
        success: false,
        message: "No task found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: getOneTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateCompleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await taskSchema.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No matching task found",
      });
    }

    task.completedTask = !task.completedTask;
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateImportantTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await taskSchema.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No matching task found",
      });
    }

    task.importantTask = !task.importantTask;
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
