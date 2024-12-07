// models/userModel.js

import connectDB from "../config/db.js";

const User = {
  createUser: async (UserName, hashedPassword) => {
    try {
      const db = await connectDB; // Chờ connectDB giải quyết thành dbConnect
      const [result] = await db.execute(
        // Sử dụng db.execute()
        "INSERT INTO User (UserName, Password) VALUES (?, ?)",
        [UserName, hashedPassword]
      );
      const newUser = { IdUser: result.insertId, UserName };
      return newUser;
    } catch (error) {
      throw error;
    }
  },
  findByUsername: async (UserName) => {
    try {
      const db = await connectDB;
      const result = await db.execute("SELECT * FROM User WHERE UserName = ?", [
        UserName,
      ]);
      // console.log(result); // Kiểm tra giá trị trả về
      const [rows, fields] = result; // Đảm bảo result là một mảng
      return rows[0]; // Truy cập vào phần tử đầu tiên
    } catch (error) {
      throw error;
    }
  },
  updateToken: async (IdUser, token) => {
    try {
      const db = await connectDB; // Chờ connectDB giải quyết thành dbConnect
      await db.execute(
        // Sử dụng db.execute()
        "UPDATE User SET Token = ? WHERE IdUser = ?",
        [token, IdUser]
      );
    } catch (error) {
      throw error;
    }
  },
};

export default User;
