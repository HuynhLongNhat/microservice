// services/authService.js
import bcrypt from "bcryptjs";
import userModel from "../model/user.js";

const login = async (UserName, Password) => {
  try {
    const user = await userModel.findByUsername(UserName);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const register = async (UserName, Password) => {
  try {
    // Kiểm tra xem username đã tồn tại chưa
    const existingUser = await userModel.findByUsername(UserName);
    if (existingUser) {
      throw new Error("Username already exists"); // Ném lỗi để controller xử lý
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Tạo user mới
    const newUser = await userModel.createUser(UserName, hashedPassword);

    return newUser;
  } catch (error) {
    throw error; // Ném lỗi để controller xử lý
  }
};

const updateToken = async (IdUser, token) => {
  try {
    await userModel.updateToken(IdUser, token);
  } catch (error) {
    throw error;
  }
};

const authService = { login, register, updateToken };

export default authService;
