import express from "express";
import dotenv from "dotenv";
import connectDB from "../../config/db.js";
dotenv.config();
import { authRoutes } from "../../routes/index.js";

const authApp = express();

async function startServer() {
  try {
    await connectDB; // Chờ kết nối database hoàn tất
    const AUTH_PORT = process.env.AUTH_PORT || 8080;

    authApp.use(express.urlencoded({ extended: true }));
    authApp.use(express.json());
    authApp.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    authApp.use("/auth", authRoutes);

    authApp.listen(AUTH_PORT, () => {
      console.log(`authService is running on http://localhost:${AUTH_PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
