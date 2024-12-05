import express from "express";
import { authorizeUser } from "../controllers/loginController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authorization header missing or invalid.",
      });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];
    const auth = await authorizeUser(token);

    if (!auth) {
      return res.status(401).json({ error: "Invalid token or unauthorized." });
    }

    res.json(auth); // Return the user data
  } catch (error) {
    console.error("Error in authorization route:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
