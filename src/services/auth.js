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
  try {
    await apiClient.post("/users/logout");
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
