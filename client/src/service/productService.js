import axios from "axios";
const token = localStorage.getItem("token");

export const getAllProduct = () => {
  return axios.get("http://localhost:8081/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
