import Login from "@/pages/Login";
import NotFoundPage from "@/pages/NotFoundPage";
import OrderPage from "@/pages/OrderPage";
import Products from "@/pages/Products";
import Register from "@/pages/Register";
import ReportOrderDetailPage from "@/pages/ReportOrderDetailPage";
import ReportOrderPage from "@/pages/ReportOrderPage";
import ReportPage from "@/pages/ReportPage";
import ReportProductDetailPage from "@/pages/ReportProductDetailPage";
import ReportProductPage from "@/pages/ReportProductPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectRoutes";
import CreateReportOrder from "@/components/user/ReportOrder/CreateReportOrder";
import CreateReportProduct from "@/components/user/ReportProduct/CreateReportProduct";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect to login by default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/products"
        element={
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/order"
        element={
          <ProtectedRoutes>
            <OrderPage />
          </ProtectedRoutes>
        }
      />

      {/* Nested routes under /report */}
      <Route
        path="/report"
        element={
          <ProtectedRoutes>
            <ReportPage />
          </ProtectedRoutes>
        }
      >
        <Route
          path="create/orders"
          element={
            <ProtectedRoutes>
              <CreateReportOrder />
            </ProtectedRoutes>
          }
        />
        <Route
          path="create/products"
          element={
            <ProtectedRoutes>
              <CreateReportProduct />
            </ProtectedRoutes>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoutes>
              <ReportProductPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="products/detail"
          element={
            <ProtectedRoutes>
              <ReportProductDetailPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoutes>
              <ReportOrderPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="orders/detail"
          element={
            <ProtectedRoutes>
              <ReportOrderDetailPage />
            </ProtectedRoutes>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
