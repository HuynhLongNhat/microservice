import orderItemService from "../service/order/orderItemService";

/**
 * Controller lấy danh sách tất cả mặt hàng trong đơn hàng
 */
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await orderItemService.getAllOrderItems();
    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({
        EM: "Không tìm thấy mặt hàng trong đơn hàng",
        EC: -1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Lấy danh sách mặt hàng thành công",
      EC: 0,
      DT: orderItems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: error.message,
      EC: -1,
      DT: null,
    });
  }
};

/**
 * Controller lấy thông tin chi tiết một mặt hàng trong đơn hàng
 */
const getOrderItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderItem = await orderItemService.getOrderItemById(id);
    if (!orderItem) {
      return res.status(404).json({
        EM: "Không tìm thấy mặt hàng",
        EC: -1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Lấy thông tin mặt hàng thành công",
      EC: 0,
      DT: orderItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: error.message,
      EC: -1,
      DT: null,
    });
  }
};

/**
 * Controller tạo mặt hàng mới trong đơn hàng
 */
const createOrderItem = async (req, res) => {
  const orderItemData = req.body;
  try {
    const newOrderItem = await orderItemService.createOrderItem(orderItemData);
    return res.status(201).json({
      EM: "Tạo mặt hàng thành công",
      EC: 0,
      DT: newOrderItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: error.message,
      EC: -1,
      DT: null,
    });
  }
};

/**
 * Controller cập nhật thông tin mặt hàng trong đơn hàng
 */
const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const orderItemData = req.body;
  try {
    const updatedOrderItem = await orderItemService.updateOrderItem(
      id,
      orderItemData
    );
    if (!updatedOrderItem) {
      return res.status(404).json({
        EM: "Không tìm thấy mặt hàng",
        EC: -1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Cập nhật mặt hàng thành công",
      EC: 0,
      DT: updatedOrderItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: error.message,
      EC: -1,
      DT: null,
    });
  }
};

/**
 * Controller xóa mặt hàng trong đơn hàng
 */
const deleteOrderItem = async (req, res) => {
  const { id } = req.params;
  try {
    const success = await orderItemService.deleteOrderItem(id);
    if (!success) {
      return res.status(404).json({
        EM: "Không tìm thấy mặt hàng",
        EC: -1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Xóa mặt hàng thành công",
      EC: 0,
      DT: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: error.message,
      EC: -1,
      DT: null,
    });
  }
};

export default {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
