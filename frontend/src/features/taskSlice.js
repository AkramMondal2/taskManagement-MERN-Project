import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

const initialState = {
  task: [],
  loading: false,
  error: null,
};

// Fetch all tasks
export const fetchTask = createAsyncThunk(
  "task/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await api.get("/api/task/gettask");
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks",
      );
    }
  },
);

// Add task
export const addTask = createAsyncThunk("task/add", async (data, thunkApi) => {
  try {
    const response = await api.post("/api/task/addtask", data);
    return response.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error.response?.data?.message || "Failed to add task",
    );
  }
});

// Delete task
export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id, thunkApi) => {
    try {
      await api.delete(`/api/task/deletetask/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to delete task",
      );
    }
  },
);

// Update task
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ taskId, data }, thunkApi) => {
    try {
      const response = await api.put(`/api/task/updatedtask/${taskId}`, data);
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update task",
      );
    }
  },
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateCompletedTaskStatus: (state, action) => {
      const id = action.payload;
      state.task = state.task.map((item) =>
        item._id === id
          ? { ...item, completedTask: !item.completedTask }
          : item,
      );
    },
    updateImportantTaskStatus: (state, action) => {
      const id = action.payload;
      state.task = state.task.map((item) =>
        item._id === id
          ? { ...item, importantTask: !item.importantTask }
          : item,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload || [];
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.task = state.task.filter((task) => task._id !== action.payload);
      })

      // Update
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.task.findIndex(
          (task) => task._id === action.payload._id,
        );
        if (index !== -1) {
          state.task[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateCompletedTaskStatus, updateImportantTaskStatus } =
  taskSlice.actions;

export default taskSlice.reducer;
