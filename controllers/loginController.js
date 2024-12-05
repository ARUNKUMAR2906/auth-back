import bcrypt from "bcrypt";
import { checkUser } from "./checkUser.js";
import { generateJWTKey } from "../utils/jwt.js"; // Function to generate a JWT
import { userModel } from "../Models/user.js";
import redisClient from "../utils/redisConnect.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide both email and password." });
    }

    // Check if the user exists
    const user = await checkUser(email);
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found. Please sign up first." });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const token = generateJWTKey(user.name, user.email);

    const response = {
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      status: true,
    };
    await redisClient.set(`key-${email}`, JSON.stringify(response));
    // Update token in the database (if necessary)
    await userModel.findOneAndUpdate(
      { email: user.email },
      { $set: { token: token } },
      { new: true }
    );

    // Respond with success and the token
    return res.status(200).json({
      message: "Login successful!",
      token, // Return the token directly
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};

export const authorizeUser = async (token) => {
  try {
    if (!token) {
      console.error("Missing token in authorizeUser");
      return false;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY); // Ensure JWT_KEY is set
    const email = decodedToken.email;

    // Attempt to retrieve data from Redis
    const cachedAuth = await redisClient.get(`key-${email}`);
    if (cachedAuth) {
      console.log("Cache hit for user:", email);
      return JSON.parse(cachedAuth);
    }

    // Fallback to MongoDB
    const user = await userModel.findOne({ email });
    if (user) {
      console.log("Fetched user from DB:", email);
      await redisClient.set(`key-${email}`, JSON.stringify(user), { EX: 3600 });
      return user;
    }

    return false; // User not found
  } catch (error) {
    console.error("Error in authorizeUser:", error);
    return false;
  }
};
