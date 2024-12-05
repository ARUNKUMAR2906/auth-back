import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import signUpVerify from "./routes/signUpRoute.js";
import userVerify from "./routes/userVerifyRoute.js";
import successRoute from "./routes/successRoute.js";
import loginRoute from "./routes/loginRoute.js";
import homeRoute from "./routes/home.js";

const port = 3001;
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// Routes
app.use("/api/signup", signUpVerify);
app.use("/verify", successRoute);
app.use("/", userVerify);
app.use("/api", loginRoute);
app.use("/home", homeRoute);

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong! Please try again later.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
