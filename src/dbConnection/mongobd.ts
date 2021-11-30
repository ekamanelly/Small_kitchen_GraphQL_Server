import mongoose from "mongoose";
import config from "config";

export async function connectDB() {
  try {
    await mongoose.connect(config.get("dbUri"));
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
