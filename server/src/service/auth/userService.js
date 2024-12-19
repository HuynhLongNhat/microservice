import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../models/index.js";

// Mã hóa mật khẩu người dùng
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

// Đăng ký người dùng mới
const registerUser = async (UserName, Password) => {
  const hashPassword = hashUserPassword(Password);

  try {
    // Kiểm tra nếu email đã tồn tại trong hệ thống
    const existingUser = await db.users.findOne({ where: { UserName } });
    if (existingUser) {
      return {
        EM: "Tên người dùng đã tồn tại",
        EC: -1,
        DT: "",
      };
    }
    // Tạo người dùng mới trong database
    const newUser = await db.users.create({
      UserName,
      Password: hashPassword,
    });
    if (newUser) {
      return {
        EM: "Đăng kí thành công",
        EC: 0,
        DT: newUser,
      };
    }
  } catch (error) {
    return {
      EM: `Lỗi hệ thống : +  ${error.message}}`,
      EC: -2,
      DT: "",
    };
  }
};

// Đăng nhập và tạo JWT
const loginUser = async (UserName, Password) => {
  const user = await db.users.findOne({
    where: { UserName },
  });

  if (!user) {
    return {
      EM: "Username is not found!",
      EC: -3,
      DT: "",
    };
  }

  const passwordMatch = bcrypt.compareSync(Password, user.Password);
  if (!passwordMatch) {
    return {
      EM: "Password is not found!",
      EC: -4,
      DT: "",
    };
  }

  const token = jwt.sign(
    { userId: user.id, UserName: user.UserName },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  await user.update({ Token: token });
  return {
    EM: "Login is success!",
    EC: 0,
    DT: { token },
  };
};

// Lấy thông tin người dùng

export default {
  registerUser,
  loginUser,
};
