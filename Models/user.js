import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  joinedOn: {
    type: Date,
    default: Date.now(),
  },
  forgotPassword: {
    time: Date,
    otp: String,
  },
});

export const userModel = mongoose.model("user", userSchema);
