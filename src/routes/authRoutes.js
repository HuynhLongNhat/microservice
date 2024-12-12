// routes/userRoutes.js
import express from "express";
import authController from "../controller/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Routes liên quan đến đăng nhập, đăng ký và xác thực người dùng
 */
const initAuthRoutes = (app) => {
  // Route đăng nhập
  router.post("/login", authController.login);

  // Route đăng ký
  router.post("/register", authController.register);

  // Route xác thực token
  router.post("/auth", authenticateToken, (req, res) => {
    res.json({ message: "Token is valid", user: req.user });
  });

  // Route lấy thông tin người dùng (cần token hợp lệ)
  router.get("/hello", authenticateToken, (req, res) => {
    res.send("Hello World!");
  });

  // Gắn router vào app
  return app.use("/auth", router);
};

export default initAuthRoutes;
