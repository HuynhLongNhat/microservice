import userService from "../service/auth/userService.js";

// Controller đăng nhập
const login = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    const data = await userService.loginUser(UserName, Password);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      EM: error.message,
      EC: -1,
      DT: null,
    });
  }
};

// Controller đăng ký
const register = async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    const data = await userService.registerUser(UserName, Password);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      EM: error.message,
      EC: -1,
      DT: null,
    });
  }
};

// Controller lấy thông tin tài khoản người dùng
const getUserInfo = async (req, res) => {
  return res.status(200).json({
    EM: "Get user info is success",
    EC: 0,
    DT: {
      userName: req.user.UserName,
      access_token: req.token,
    },
  });
};

export default {
  login,
  register,
  getUserInfo,
};
