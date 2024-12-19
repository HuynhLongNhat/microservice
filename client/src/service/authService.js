import axios from "axios";

export const registerUser = (data) => {
  return axios.post("http://localhost:8080/auth/register", data);
};

export const loginUser = (data) => {
  return axios.post("http://localhost:8080/auth/login", data);
};

export const getUserInfo = async () => {
  const token = localStorage.getItem("token");
  return axios.get("http://localhost:8080/auth/auth", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// export const createBuilding = (data) => {
//   return axios.post("/building", { ...data });
// };

// export const getAllBuilding = () => {
//   return axios.get("/building");
// };

// export const getBuildingDetail = (id) => {
//   return axios.get(`/building/${id}`);
// };

// export const updateBuilding = (id, data) => {
//   return axios.put(`/building/${id}`, data);
// };

// export const deleteBuilding = (id) => {
//   return axios.delete(`/building/${id}`);
// };
