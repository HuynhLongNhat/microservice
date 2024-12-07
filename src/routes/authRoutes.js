// routes/authRoutes.js
import express from "express";
import { login, register } from "../controllers/authController.js"; // Import named export
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/auth", authenticateToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

router.get("/hello", authenticateToken, (req, res) => {
  res.send("Hello World!");
});
export default router;
