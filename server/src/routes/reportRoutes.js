// routes/productRoutes.js
import express from "express";
import reportProductController from "../controller/reportProductController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Routes liên quan đến sản phẩm
 */
const initReportsProductRoutes = (app) => {
  router.get(
    "/products",
    authenticateToken,
    reportProductController.getAllReportProducts
  );

  router.get(
    "/products/:id",
    authenticateToken,
    reportProductController.getReportProductById
  );

  router.get(
    "/orders",
    authenticateToken,
    reportProductController.getAllReportOrders
  );

  router.get(
    "/orders/:id",
    authenticateToken,
    reportProductController.getReportOrderById
  );

  router.post(
    "/products",
    authenticateToken,
    reportProductController.postReportProducts
  );

  router.post(
    "/orders",
    authenticateToken,
    reportProductController.postReportOrder
  );

  router.delete(
    "/products/:id",
    authenticateToken,
    reportProductController.deleteReportProducts
  );

  router.delete(
    "/orders/:id",
    authenticateToken,
    reportProductController.deleteReportOrder
  );

  return app.use("/reports", router);
};

export default initReportsProductRoutes;
