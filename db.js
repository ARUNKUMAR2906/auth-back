import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URL);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
