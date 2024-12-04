// src/services/productService.js

import Product from "../model/product.js";

const ProductService = {
  getAllProducts: () => {
    return new Promise((resolve, reject) => {
      Product.getAll((err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getProductById: (productId) => {
    return new Promise((resolve, reject) => {
      Product.getById(productId, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]); // Trả về sản phẩm đầu tiên hoặc null
        }
      });
    });
  },

  createProduct: (newProduct) => {
    return new Promise((resolve, reject) => {
      Product.create(newProduct, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  },

  updateProduct: (productId, updatedProduct) => {
    return new Promise((resolve, reject) => {
      Product.update(productId, updatedProduct, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0); // Trả về true nếu cập nhật thành công
        }
      });
    });
  },

  deleteProduct: (productId) => {
    return new Promise((resolve, reject) => {
      Product.delete(productId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0); // Trả về true nếu xóa thành công
        }
      });
    });
  },
};

export default ProductService;
