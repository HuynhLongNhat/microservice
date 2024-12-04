import express from "express";
import dbConnect from "./config/db.js";
import { authRoutes, productRoutes } from "./routes/index.js";
const app = express();

dbConnect.connect(); // Kết nối database

const PORT = 8080;

// Định nghĩa route cho trang chủ
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Sử dụng routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
// Lắng nghe cổng 8080
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
