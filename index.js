import express from "express";
const app = express();

const PORT = 8080;
// Định nghĩa route cho trang chủ
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Lắng nghe cổng 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
