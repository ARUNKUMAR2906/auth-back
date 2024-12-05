import express from "express";

const router = express.Router();

router.get("/success", (req, res) => {
  res.render("emailVerified");
});

export default router;
