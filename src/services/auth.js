import { apiClient } from "./config";

// User Registration
export const apiUserSignup = async (payload) => {
  return await apiClient.post("users/register", payload);
};

// Login for Users
export const apiUserLogin = async (payload) => {
  return await apiClient.post("users/login", payload);
};

// Logout for Users 
export const apiLogout = async () => {
    const endpoint = "users/logout";
    return apiClient.post(endpoint);
  };
  