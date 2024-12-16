import db from "../../models"; // Import các model cần thiết

// Lấy danh sách tất cả mặt hàng trong đơn hàng
const getAllOrderItems = async () => {
  try {
    const orderItems = await db.otheritems.findAll({
      include: [
        {
          model: db.products,
          as: "product", // Alias phải khớp với định nghĩa trong model
          attributes: ["id", "name", "price"], // Chỉ lấy các trường cần thiết
        },
        {
          model: db.orders,
          as: "order", // Alias phải khớp với định nghĩa trong model
          attributes: ["id", "customer_name", "status"],
        },
      ],
    });

    console.log("Danh sách mặt hàng:", JSON.stringify(orderItems, null, 2));
    return orderItems;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách mặt hàng:", error.message);
    throw new Error("Không thể lấy thông tin đơn hàng: " + error.message);
  }
};

// Lấy thông tin chi tiết một mặt hàng trong đơn hàng
const getOrderItemById = async (id) => {
  try {
    // Tìm mặt hàng theo ID
    const orderItem = await db.otheritems.findOne({ where: { id: id } });
    if (!orderItem) {
      throw new Error("Mặt hàng không tồn tại");
    }
    return orderItem;
  } catch (error) {
    throw new Error("Không thể lấy thông tin mặt hàng");
  }
};

const createOrderItem = async (orderItemData) => {
  console.log(orderItemData);
  try {
    // Kiểm tra xem dữ liệu mặt hàng có hợp lệ không
    if (
      !orderItemData ||
      !orderItemData.order_id ||
      !orderItemData.product_name ||
      !orderItemData.product_id ||
      !orderItemData.quantity
    ) {
      throw new Error("Dữ liệu mặt hàng không hợp lệ");
    }

    const product = await db.Product.findOne({
      where: { id: orderItemData.product_id },
    });
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    if (orderItemData.quantity <= 0) {
      throw new Error("Số lượng mặt hàng không hợp lệ");
    }

    // Tạo mặt hàng mới và lưu vào cơ sở dữ liệu
    const newOrderItem = await db.otheritems.create(orderItemData);

    return newOrderItem;
  } catch (error) {
    // Log lỗi chi tiết và ném lỗi
    console.error(error);
    throw new Error("Không thể tạo mặt hàng mới: " + error.message);
  }
};
// Cập nhật mặt hàng
const updateOrderItem = async (id, orderItemData) => {
  try {
    // Tìm mặt hàng theo ID
    const orderItem = await db.otheritems.findByPk(id);
    if (!orderItem) {
      throw new Error("Mặt hàng không tồn tại");
    }

    // Cập nhật thông tin mặt hàng
    orderItem.set(orderItemData);
    await orderItem.save();
    return orderItem;
  } catch (error) {
    throw new Error("Không thể cập nhật mặt hàng");
  }
};

// Xóa mặt hàng
const deleteOrderItem = async (id) => {
  try {
    const orderItem = await db.otheritems.findByPk(id);
    if (!orderItem) {
      throw new Error("Mặt hàng không tồn tại");
    }

    // Xóa mặt hàng
    await orderItem.destroy();
    return true;
  } catch (error) {
    throw new Error("Không thể xóa mặt hàng");
  }
};

export default {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
