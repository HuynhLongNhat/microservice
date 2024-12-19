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
  router.get("/auth", authenticateToken, authController.getUserInfo);

  // Gắn router vào app
  return app.use("/auth", router);
};

export default initAuthRoutes;
