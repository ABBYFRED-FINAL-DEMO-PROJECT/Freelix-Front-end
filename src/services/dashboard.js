import { apiClient } from "./config";

// Get User Registration Details
export const apiGetUserData = async (_userId) => {
  try {
    const response = await apiClient.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Update User Registration Details
export const apiUpdateUserData = async (_userId, payload) => {
  try {
    const response = await apiClient.patch(`/users/me`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

// Post Advert
export const apiPostAdvert = async (payload) => {
  try {
    const response = await apiClient.post("/adverts", payload, {
      headers: {
        'Content-Type': 'multipart/form-data', // For image uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting new advert:", error);
    throw error;
  }
};

// Get All Projects
export const apiGetAllProjects = async (filter, sort) => {
  return apiClient.get(`/adverts?filter=${filter}&limit=0&sort=${sort}`);
};


// Get Advert by ID
export const apiGetProjects = async (advertId) => {
  try {
    const response = await apiClient.get(`/adverts/${advertId}`);
    return response.data; // Return the advert details
  } catch (error) {
    console.error("Error fetching advert:", error);
    throw error;
  }
};


// Update Project
export const apiUpdateProject = async (projectId, payload) => {
  try {
    const response = await apiClient.patch(`/adverts/${projectId}`, payload);
    return response.data; // Return the updated advert
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// Delete Advert
export const apiDeleteProject = async (projectId) => {
  try {
    const response = await apiClient.delete(`/adverts/${projectId}`);
    return response.data; // Return confirmation of deletion
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Get Vendor Dashboard Statistics
export const apiGetVendorStats = async (vendorId) => {
  try {
    const response = await apiClient.get(`/vendors/${vendorId}/stats`);
    return response.data; // Return vendor stats
  } catch (error) {
    console.error("Error fetching vendor stats:", error);
    throw error;
  }
};

// Get Vendor Adverts
export const apiGetVendorAdverts = async () => {
  return apiClient.get("/vendors/me/adverts?limit=0");
};

// Get Vendor Adverts Counts
export const apiGetVendorAdvertsCount = async () => {
  return apiClient.get("/vendors/me/adverts?limit=0");
};
