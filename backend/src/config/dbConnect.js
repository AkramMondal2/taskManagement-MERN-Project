import mongoose from "mongoose";

export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "taskManagement",
    });
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Mongodb not connected", error);
  }
}
