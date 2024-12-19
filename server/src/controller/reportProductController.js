import reportProductService from "../service/reportProduct/reportProductService.js";

const getAllReportProducts = async (req, res) => {
  try {
    const products = await reportProductService.getAllReportProducts();
    return res.status(200).json({
      EM: "Lấy danh sách báo cáo sản phẩm thành công",
      EC: 0,
      DT: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy danh sách báo cáo sản phẩm",
      EC: -1,
      DT: null,
    });
  }
};

const getReportProductById = async (req, res) => {
  try {
    const product = await reportProductService.getReportProductById(
      req.params.id
    );
    if (!product) {
      return res.status(404).json({
        EM: "Báo cáo sản phẩm không tồn tại",
        EC: 1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Lấy thông tin báo cáo sản phẩm thành công",
      EC: 0,
      DT: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy thông tin báo cáo sản phẩm",
      EC: -1,
      DT: null,
    });
  }
};

const postReportProducts = async (req, res) => {
  try {
    const newReport = await reportProductService.postReportProducts(req.body);
    return res.status(201).json({
      EM: "Tạo báo cáo sản phẩm thành công",
      EC: 0,
      DT: newReport,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      EM: "Lỗi khi tạo báo cáo sản phẩm",
      EC: -1,
      DT: null,
    });
  }
};

const deleteReportProducts = async (req, res) => {
  try {
    const deletedReport = await reportProductService.deleteReportProducts(
      req.params.id
    );
    if (!deletedReport) {
      return res.status(404).json({
        EM: "Báo cáo sản phẩm không tồn tại",
        EC: 1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Xóa báo cáo sản phẩm thành công",
      EC: 0,
      DT: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server khi xóa báo cáo sản phẩm",
      EC: -1,
      DT: null,
    });
  }
};

const getAllReportOrders = async (req, res) => {
  try {
    const orders = await reportProductService.getAllReportOrders();
    return res.status(200).json({
      EM: "Lấy danh sách báo cáo đơn hàng thành công",
      EC: 0,
      DT: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy danh sách báo cáo đơn hàng",
      EC: -1,
      DT: null,
    });
  }
};

const getReportOrderById = async (req, res) => {
  try {
    const order = await reportProductService.getReportOrderById(req.params.id);
    if (order) {
      return res.status(200).json({
        EM: order.EM,
        EC: order.EC,
        DT: order.DT,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy thông tin báo cáo đơn hàng",
      EC: -1,
      DT: null,
    });
  }
};

const postReportOrder = async (req, res) => {
  try {
    const newOrder = await reportProductService.postReportOrder(req.body);
    return res.status(201).json({
      EM: "Tạo báo cáo đơn hàng thành công",
      EC: 0,
      DT: newOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      EM: "Lỗi khi tạo báo cáo đơn hàng",
      EC: -1,
      DT: null,
    });
  }
};

const deleteReportOrder = async (req, res) => {
  try {
    const deletedOrder = await reportProductService.deleteReportOrder(
      req.params.id
    );
    if (!deletedOrder) {
      return res.status(404).json({
        EM: "Báo cáo đơn hàng không tồn tại",
        EC: 1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Xóa báo cáo đơn hàng thành công",
      EC: 0,
      DT: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server khi xóa báo cáo đơn hàng",
      EC: -1,
      DT: null,
    });
  }
};

export default {
  getAllReportProducts,
  getReportProductById,
  postReportProducts,
  deleteReportProducts,
  getAllReportOrders,
  getReportOrderById,
  postReportOrder,
  deleteReportOrder,
};
