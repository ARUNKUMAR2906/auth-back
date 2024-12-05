import mongoose from "mongoose";

const userVerifySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  token: {
    type: String,
    required: true,
  },
});

export const userVerifyModel = mongoose.model("userverify", userVerifySchema);
