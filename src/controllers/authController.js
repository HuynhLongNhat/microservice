// controllers/authController.js
import jwt from "jsonwebtoken";
import authService from "../service/auth/authService.js";

const JWT_SECRET = "your_jwt_secret_key";

const login = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    const user = await authService.login(UserName, Password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ IdUser: user.IdUser }, JWT_SECRET);

    await authService.updateToken(user.IdUser, token);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const register = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    // Gọi service để xử lý logic đăng ký
    const newUser = await authService.register(UserName, Password);

    // Trả về response thành công
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);

    // Xử lý lỗi từ service
    if (error.message === "Username already exists") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Server error" });
  }
};

export { login, register }; // Sử dụng export để export function login
