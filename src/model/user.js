// models/userModel.js

import dbConnect from "../config/db.js";
const User = {
  createUser: async (UserName, hashedPassword) => {
    try {
      const result = await dbConnect.connection
        .promise()
        .query("INSERT INTO User (UserName, Password) VALUES (?, ?)", [
          UserName,
          hashedPassword,
        ]);
      const newUser = { IdUser: result[0].insertId, UserName };
      return newUser;
    } catch (error) {
      throw error;
    }
  },
  findByUsername: async (UserName) => {
    try {
      const [rows] = await dbConnect.connection
        .promise()
        .query("SELECT * FROM User WHERE UserName = ?", [UserName]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  updateToken: async (IdUser, token) => {
    try {
      await dbConnect.connection
        .promise()
        .query("UPDATE User SET Token = ? WHERE IdUser = ?", [token, IdUser]);
    } catch (error) {
      throw error;
    }
  },
};

export default User;
