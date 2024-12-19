import axios from "axios";
const token = localStorage.getItem("token");

export const getAllOrder = () => {
  return axios.get("http://localhost:8082/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createOrder = (orderData) => {
  return axios.post("http://localhost:8082/order", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createOrderItem = (orderItemData) => {
  return axios.post("http://localhost:8082/order/items", orderItemData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllOtherItem = () => {
  return axios.get("http://localhost:8082/order/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
