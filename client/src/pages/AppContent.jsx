import Navigation from "@/components/user/Navigation";
import AppRoutes from "@/routes/AppRoutes";

import { useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation(); // Lấy thông tin URL hiện tại
  const hideNavbarRoutes = ["/login", "/register"]; // Các route không cần Navigation

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        <div className="app-header">
          <Navigation />
        </div>
      )}
      <div className="app-container">
        <AppRoutes />
      </div>
    </>
  );
};
export default AppContent;
