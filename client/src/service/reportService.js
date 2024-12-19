import axios from "axios";
const token = localStorage.getItem("token");
export const createOrderReport = (orderReportData) => {
  return axios.post(" http://localhost:8083/reports/orders", orderReportData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createReportProduct = (reportProduct) => {
  return axios.post("http://localhost:8083/reports/products", reportProduct, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllOrderReport = () => {
  return axios.get(" http://localhost:8083/reports/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrderReportById = (id) => {
  return axios.get(`http://localhost:8083/reports/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllReportProduct = () => {
  return axios.get("http://localhost:8083/reports/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductReportById = (id) => {
  return axios.get(`http://localhost:8083/reports/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
