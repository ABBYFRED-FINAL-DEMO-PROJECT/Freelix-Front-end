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

// Post Project
export const apiPostProject = async (payload) => {
  try {
    // Retrieve the token from localStorage or any other storage location
    // const token = localStorage.getItem('token'); // Adjust based on where the token is stored

    const response = await apiClient.post("/projects", payload, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`, // Add the authorization header
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error posting new project:", error);
    throw error; // Re-throw to allow the calling function to handle it
  }
};


// Get All Projects
export const apiGetAllProjects = async () => {
  return apiClient.get(`/projects?limit=0`);
};


// Get Project by ID
export const apiGetProject = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response; // Return the entire response object
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};



// Update Project
export const apiUpdateProject = async (projectId, payload) => {
  try {
    const response = await apiClient.patch(`/projects/${projectId}`, payload);
    return response.data; // Return the updated advert
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// Delete Advert
export const apiDeleteProject = async (projectId) => {
  try {
    const response = await apiClient.delete(`/projects/${projectId}`);
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
