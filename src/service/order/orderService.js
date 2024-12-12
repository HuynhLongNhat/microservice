import db from "../../models"; // Assuming you have models Order and Product

// Lấy danh sách tất cả đơn hàng
const getAllOrders = async () => {
  try {
    const orders = await db.Order.findAll();
    return orders;
  } catch (error) {
    throw new Error("Không thể lấy danh sách đơn hàng");
  }
};

// Lấy thông tin chi tiết một đơn hàng
const getOrderById = async (id) => {
  try {
    const order = await db.Order.findByPk(id);
    if (!order) {
      throw new Error("Không tìm thấy đơn hàng");
    }
    return order;
  } catch (error) {
    throw new Error("Không thể lấy thông tin đơn hàng");
  }
};

// Tạo đơn hàng mới
const createOrder = async (orderData) => {
  try {
    // Kiểm tra xem orderData có đủ thông tin bắt buộc không
    if (
      !orderData.customer_name ||
      !orderData.customer_email ||
      !orderData.total_amount ||
      !orderData.status
    ) {
      throw new Error("Thông tin đơn hàng không hợp lệ.");
    }

    // Tạo đơn hàng mới trong cơ sở dữ liệu
    const newOrder = await db.Order.create({
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      total_amount: orderData.total_amount,
      status: orderData.status,
    });

    return newOrder;
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error.message);
    throw new Error(error.message); // Gửi lại lỗi nếu có
  }
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (id, status) => {
  try {
    const order = await db.Order.findByPk(id);
    if (!order) {
      return null; // Đơn hàng không tồn tại
    }

    order.status = status;
    await order.save();
    return order;
  } catch (error) {
    throw new Error("Không thể cập nhật trạng thái đơn hàng");
  }
};

// Xóa đơn hàng
const deleteOrder = async (id) => {
  try {
    const order = await db.Order.findByPk(id);
    if (!order) {
      return null; // Đơn hàng không tồn tại
    }

    await order.destroy();
    return true;
  } catch (error) {
    throw new Error("Không thể xóa đơn hàng");
  }
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
