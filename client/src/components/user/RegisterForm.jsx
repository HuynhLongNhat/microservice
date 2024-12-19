import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User, Lock, Repeat, Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/service/authService";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRePasswordVisibility = () => setShowRePassword(!showRePassword);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/products");
    }
  }, [navigate]);
  const handleRegister = async () => {
    if (!userName || !password || !rePassword) {
      alert("Please fill in all fields!");
      return;
    }
    if (password != rePassword) {
      alert("Passwords do not match!");
      return;
    }
    const res = await registerUser({
      UserName: userName,
      Password: password,
    });
    console.log(" data", res);
    if (res && res.data.EC === 0) {
      alert(res.data.EM);
      navigate("/login");
    } else {
      alert(res.data.EM);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Create an Account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign up to access your account.
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
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <User />
              </span>
            </div>
          </div>

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
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="re-password" className="text-left mb-1">
              Re-enter Password
            </Label>
            <div className="relative">
              <Input
                id="re-password"
                type={showRePassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="pl-10"
                onChange={(e) => setRePassword(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Repeat />
              </span>
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={toggleRePasswordVisibility}
              >
                {showRePassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            className="w-full"
            onClick={() => handleRegister()}
          >
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
