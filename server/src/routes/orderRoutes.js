import express from "express";
import orderController from "../controller/orderController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Routes liên quan đến đơn hàng
 */
const initOrdersRoutes = (app) => {
  // Route để lấy danh sách tất cả đơn hàng
  router.get("/", authenticateToken, orderController.getAllOrders);

  // Route để lấy thông tin chi tiết một đơn hàng
  router.get("/:id", authenticateToken, orderController.getOrderById);

  // Route để tạo đơn hàng mới
  router.post("/", authenticateToken, orderController.createOrder);

  // Route để cập nhật trạng thái đơn hàng
  router.put("/:id", authenticateToken, orderController.updateOrderStatus);

  // Route để xóa đơn hàng
  router.delete("/:id", authenticateToken, orderController.deleteOrder);

  // Gắn router vào app
  return app.use("/order", router);
};

export default initOrdersRoutes;
