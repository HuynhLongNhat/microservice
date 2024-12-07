import connectDB from "../config/db.js";

const Product = {
  getAll: async () => {
    try {
      const [rows] = await connectDB.execute("SELECT * FROM products");
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await connectDB.execute(
        "SELECT * FROM products WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  create: async (product) => {
    try {
      const [result] = await connectDB.execute("INSERT INTO products SET ?", [
        product,
      ]);
      return { id: result.insertId, ...product };
    } catch (error) {
      throw error;
    }
  },

  update: async (id, product) => {
    try {
      await connectDB.execute("UPDATE products SET ? WHERE id = ?", [
        product,
        id,
      ]);
      // Thường không cần return gì cho update, trừ khi bạn muốn trả về thông tin sản phẩm đã cập nhật
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await connectDB.execute("DELETE FROM products WHERE id = ?", [id]);
      // Thường không cần return gì cho delete
    } catch (error) {
      throw error;
    }
  },
};

export default Product;
