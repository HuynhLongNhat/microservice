import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/service/authService";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/products");
    }
  }, [navigate]);

  const handleLoginUser = async () => {
    if (!userName || !password) {
      alert("Vui lòng nhập tài khoản và mật khẩu");
      return;
    }
    const res = await loginUser({
      UserName: userName,
      Password: password,
    });

    if (res.data.EC === 0) {
      alert(res.data.EM);
      localStorage.setItem("token", res.data.DT.token);
      navigate("/products");
    } else {
      alert(res.data.EM);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Please login to your account.
        </p>
        <form className="space-y-4">
          {/* Username */}
          <div className="grid w-full gap-1">
            <Label className="text-left mb-1">Username</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your username"
                className="pl-10"
                onChange={(e) => setUserName(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <User />
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="grid w-full gap-1">
            <Label className="text-left mb-1">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Lock />
              </span>
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff /> : <Eye />}{" "}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            className="w-full"
            onClick={() => handleLoginUser()}
          >
            Login
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
