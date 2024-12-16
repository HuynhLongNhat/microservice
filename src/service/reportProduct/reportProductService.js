import db from "../../models/index";

const getAllReportProducts = async () => {
  return await db.product_reports.findAll({
    attributes: { exclude: ["product_id"] },
    include: [
      {
        model: db.products,
        as: "product",
        attributes: ["id", "name"],
      },
    ],
  });
};

const getReportProductById = async (id) => {
  return await db.product_reports.findOne({
    where: { id },
    attributes: { exclude: ["product_id"] },
    include: [
      {
        model: db.products,
        as: "product",
        attributes: ["id", "name"],
      },
    ],
  });
};
const postReportProducts = async (reportData) => {
  return await db.product_reports.create(reportData);
};

const deleteReportProducts = async (id) => {
  return await db.product_reports.destroy({ where: { id } });
};

const getAllReportOrders = async () => {
  return await db.orders_reports.findAll();
};

const getReportOrderById = async (id) => {
  return await db.orders_reports.findOne({ where: { id } });
};

const postReportOrder = async (orderReportData) => {
  return await db.orders_reports.create(orderReportData);
};

const deleteReportOrder = async (id) => {
  return await db.orders_reports.destroy({ where: { id } });
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
