import express from "express";
import { userVerifyController } from "../controllers/userVerifyController.js";

const router = express.Router();

router.get("/verify/:token", userVerifyController);


export default router;
