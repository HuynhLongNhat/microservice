// src/controllers/productController.js

import ProductService from "../service/product/productService.js"; // Import product service

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      res.status(500).json({ message: "Lỗi server" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const productId = parseInt(req.params.id, 10);
      const product = await ProductService.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      res.json(product);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", err);
      res.status(500).json({ message: "Lỗi server" });
    }
  },

  createProduct: async (req, res) => {
    try {
      const newProduct = req.body;
      const productId = await ProductService.createProduct(newProduct);
      res.status(201).json({
        message: "Thêm sản phẩm thành công",
        productId: productId,
      });
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      res.status(500).json({ message: "Lỗi server" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = parseInt(req.params.id, 10);
      const updatedProduct = req.body;
      const result = await ProductService.updateProduct(
        productId,
        updatedProduct
      );
      if (!result) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      res.json({ message: "Cập nhật sản phẩm thành công" });
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
      res.status(500).json({ message: "Lỗi server" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = parseInt(req.params.id, 10);
      const result = await ProductService.deleteProduct(productId);
      if (!result) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      res.json({ message: "Xóa sản phẩm thành công" });
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      res.status(500).json({ message: "Lỗi server" });
    }
  },
};

export default ProductController;
