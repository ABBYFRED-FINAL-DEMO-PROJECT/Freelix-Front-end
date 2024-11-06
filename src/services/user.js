import { apiClient } from "./config";

// Get All Adverts
export const apiGetAllAdverts = async (filter, sort) => {
  return apiClient.get(`/adverts?filter=${filter}&limit=0&sort=${sort}`);
};

// Get Advert Details
export const apiGetAdvertDetails = async (id) => {
  return apiClient.get(`/adverts/${id}`);
};

// Search Adverts by category, title, or price
export const apiSearchAdverts = async (searchParams) => {
  const { category, title, price } = searchParams;
  return apiClient.get("/adverts/search", {
    params: { category, title, price },
  });
};

// Get Adverts by Category
export const apiGetAdvertsByCategory = async (category) => {
  return apiClient.get(`/adverts/category/${category}`);
};

// Add Advert to Wishlist
export const apiAddToWishlist = async (userId, advertId) => {
  return apiClient.post(`/users/${userId}/wishlist`, { advertId });
};

