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
  return await db.order_reports.findAll({});
};

const getReportOrderById = async (id) => {
  let res = await db.order_reports.findOne({
    where: { id: id },
  });
  if (res) {
    return {
      EM: `Get report order by id : ${id}`,
      EC: 0,
      DT: res,
    };
  } else {
    return {
      EM: `Report order not found by id : ${id}`,
      EC: 1,
      DT: null,
    };
  }
};

const postReportOrder = async (orderReportData) => {
  return await db.order_reports.create(orderReportData);
};

const deleteReportOrder = async (id) => {
  return await db.order_reports.destroy({ where: { id } });
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
