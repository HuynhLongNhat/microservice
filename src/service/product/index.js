import express from "express";
import dotenv from "dotenv";
import connectDB from "../../config/db.js"; // Chuẩn hóa tên biến thành connectDB
dotenv.config();
import { productRoutes } from "../../routes/index.js";

const productApp = express();

async function startServer() {
  try {
    await connectDB; // Chờ kết nối database hoàn tất

    const PRODUCT_PORT = process.env.PRODUCT_PORT || 8081;

    productApp.use(express.urlencoded({ extended: true }));
    productApp.use(express.json());
    productApp.use("/products", productRoutes);

    productApp.listen(PRODUCT_PORT, () => {
      console.log(
        `productService is running on http://localhost:${PRODUCT_PORT}`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
