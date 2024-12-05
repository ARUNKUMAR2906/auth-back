import express from "express";
import { signUpController } from "../controllers/signUpController.js";

const router = express.Router();

router.post("/", signUpController);

export default router;
