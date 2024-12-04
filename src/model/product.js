import dbConnect from "../config/db.js";

const Product = {
  getAll: (callback) => {
    const sql = "SELECT * FROM products";
    dbConnect.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    dbConnect.query(sql, [id], callback);
  },

  create: (product, callback) => {
    const sql = "INSERT INTO products SET ?";
    dbConnect.query(sql, product, callback);
  },

  update: (id, product, callback) => {
    const sql = "UPDATE products SET ? WHERE id = ?";
    dbConnect.query(sql, [product, id], callback);
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM products WHERE id = ?";
    dbConnect.query(sql, [id], callback);
  },
};

export default Product;
