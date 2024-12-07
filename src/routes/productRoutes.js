import express from "express";
const router = express.Router();
import ProductController from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

router.use(authenticateToken);

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
