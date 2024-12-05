import { userModel } from "../Models/user.js";

export const checkUser = async (email) => {
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return user;
    }
  } catch (error) {
    return "Server Busy";
  }
};
