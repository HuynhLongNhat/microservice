import express from "express";
import orderItemController from "../controller/orderItemController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Routes liên quan đến mặt hàng trong đơn hàng
 */
const initOrderItemsRoutes = (app) => {
  // Lấy danh sách tất cả mặt hàng trong đơn hàng
  router.get("/", authenticateToken, orderItemController.getAllOrderItems);

  // Lấy thông tin chi tiết một mặt hàng trong đơn hàng
  router.get("/:id", authenticateToken, orderItemController.getOrderItemById);

  // Tạo mặt hàng mới
  router.post("/", authenticateToken, orderItemController.createOrderItem);

  // Cập nhật mặt hàng
  router.put("/:id", authenticateToken, orderItemController.updateOrderItem);

  // Xóa mặt hàng
  router.delete("/:id", authenticateToken, orderItemController.deleteOrderItem);

  // Gắn router vào app
  return app.use("/order/items", router);
};

export default initOrderItemsRoutes;
