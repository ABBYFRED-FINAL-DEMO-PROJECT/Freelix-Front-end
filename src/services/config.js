import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

// const token = localStorage.getItem("token");

// console.log('token',token)

// if (token) {
//  axios.defaults.headers.common["Authorization"] =`Bearer ${token}`
// }
const client = axios.create({
  baseURL: baseUrl,
});

client.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiClient = client;