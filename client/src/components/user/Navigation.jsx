import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Home,
  Settings,
  ShoppingCart,
  BarChart2,
  User,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/service/authService";

const Navigation = () => {
  const [userName, setUserName] = useState();
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getInfoUser();
  }, []);

  const getInfoUser = async () => {
    let res = await getUserInfo();
    if (res && res.data.EC === 0) {
      setUserName(res.data.DT.userName);
      setAccessToken(res.data.DT.access_token);
    }
  };

  // Toggle the settings dropdown
  const toggleSettingsDropdown = () =>
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAccessToken(null);
    setIsSettingsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 flex items-center gap-2 hover:text-blue-500 transition-all duration-200"
        >
          <Home className="w-6 h-6 text-blue-500" />
          MyApp
        </Link>

        <div className="flex-1 md:flex md:gap-8 items-center justify-center space-x-6">
          <Link
            to="/products"
            className="text-gray-700 hover:text-blue-500 transition-all duration-200 flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium"
          >
            <ShoppingCart className="w-5 h-5" /> Products
          </Link>
          <Link
            to="/report"
            className="text-gray-700 hover:text-blue-500 transition-all duration-200 flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium"
          >
            <BarChart2 className="w-5 h-5" /> Statistical
          </Link>
        </div>

        {/* User Greeting */}
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-gray-800 font-medium text-lg">
            <User className="w-5 h-5 mr-2" />
            {userName ? userName : "Guest"}
          </span>

          {/* Settings Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              className="text-gray-600 border-gray-300 hover:border-gray-400 rounded-md py-2 px-4 text-sm font-medium transition-all duration-200"
              onClick={toggleSettingsDropdown}
            >
              <Settings className="w-5 h-5 mr-2" /> Settings
            </Button>

            {isSettingsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
                {accessToken ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left rounded-t-md"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-md"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
