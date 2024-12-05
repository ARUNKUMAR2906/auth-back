import { userVerifyModel } from "../Models/userVerify.js";
import { sendEmail } from "../service/sendMail.js";
import { generateJWTKey } from "../utils/jwt.js";
import { checkUser } from "./checkUser.js";
import bcrypt from "bcrypt";

export const signUpController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Check if the user already exists
    const userCredential = await checkUser(email);
    if (userCredential) {
      return res.status(409).json({ error: "User already exists" });
    }
    if (userCredential === "Server Busy") {
      return res
        .status(503)
        .json({ error: "Server is busy. Please try again later." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Generate token and verification link
    const token = generateJWTKey(name, email);
    const verificationLink = `http://localhost:3001/verify/${token}`;

    // Save new user
    const newUser = new userVerifyModel({
      name: name,
      email: email,
      password: hashPassword,
      token: token,
    });
    await newUser.save();

    // Send verification email
    await sendEmail(email, name, verificationLink);

    // Respond with success
    res.status(201).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
