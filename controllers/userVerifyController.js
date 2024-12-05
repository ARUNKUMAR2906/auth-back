import { userModel } from "../Models/user.js";
import { userVerifyModel } from "../Models/userVerify.js";

export const userVerifyController = async (req, res) => {
  try {
    const { token } = req.params;

    // Check if the token exists in the database
    const userVerified = await userVerifyModel.findOne({ token });
    if (!userVerified) {
      console.log("Token not found or expired.");
      return res.status(400).send("Invalid or expired verification link.");
    }

    // Create a new user in the main user collection
    const newUser = new userModel({
      name: userVerified.name,
      email: userVerified.email,
      password: userVerified.password,
      forgotPassword: {},
    });

    await newUser.save();
    console.log("User successfully verified and saved.");
    res.status(200).redirect("/verify/success");
    await userVerifyModel.deleteOne({ token });
  } catch (error) {
    console.error("Error during user verification:", error);
    res.status(500).send("Internal server error. Please try again later.");
  }
};
