import orderService from "../service/order/orderService";

/**
 * Controller lấy danh sách tất cả đơn hàng
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).json({
      EM: "Lấy danh sách đơn hàng thành công",
      EC: 0,
      DT: orders,
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
 * Controller lấy thông tin chi tiết một đơn hàng
 */
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({
        EM: "Không tìm thấy đơn hàng",
        EC: -1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Lấy thông tin đơn hàng thành công",
      EC: 0,
      DT: order,
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
 * Controller tạo đơn hàng mới
 */
const createOrder = async (req, res) => {
  try {
    const { customer_name, customer_email, total_amount, status } = req.body;

    // Kiểm tra xem các trường có hợp lệ hay không
    if (!customer_name || !customer_email || !total_amount || !status) {
      return res.status(400).json({
        EM: "Thiếu thông tin bắt buộc",
        EC: -1,
        DT: null,
      });
    }

    // Chuyển đổi giá trị nếu cần thiết (ví dụ: total_amount có thể là chuỗi, bạn cần chuyển thành số)
    const amount = parseInt(total_amount, 10);

    // Tạo đơn hàng mới trong cơ sở dữ liệu
    const newOrder = await orderService.createOrder(req.body);

    if (newOrder) {
      // Trả về kết quả
      return res.status(201).json({
        EM: "Tạo đơn hàng thành công",
        EC: 0,
        DT: newOrder,
      });
    }
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
 * Controller cập nhật trạng thái đơn hàng
 */
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await orderService.updateOrderStatus(id, status);
    if (!updatedOrder) {
      return res.status(404).json({
        EM: "Không tìm thấy đơn hàng",
        EC: -1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Cập nhật trạng thái đơn hàng thành công",
      EC: 0,
      DT: updatedOrder,
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
 * Controller xóa đơn hàng
 */
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await orderService.deleteOrder(id);
    if (!result) {
      return res.status(404).json({
        EM: "Không tìm thấy đơn hàng",
        EC: -1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Xóa đơn hàng thành công",
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
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
