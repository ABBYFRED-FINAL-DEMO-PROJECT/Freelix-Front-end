import { apiClient } from "./config";

export const apiGetTasks = async () => {
    try {
      const response = await apiClient.get('/tasks');
      return response.data; // Return the list of tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  export const apiGetTaskById = async (taskId) => {
    try {
      const response = await apiClient.get(`/tasks/${taskId}`);
      return response.data; // Return the task details
    } catch (error) {
      console.error("Error fetching task details:", error);
      throw error;
    }
  };

  export const apiAddTask = async (taskData) => {
    try {
      const response = await apiClient.post('/tasks', taskData);
      return response.data; // Return the newly created task
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  export const apiEditTask = async (taskId, taskData) => {
    try {
      const response = await apiClient.patch(`/tasks/${taskId}`, taskData);
      return response.data; // Return the updated task
    } catch (error) {
      console.error("Error editing task:", error);
      throw error;
    }
  };

  export const apiDeleteTask = async (taskId) => {
    try {
      const response = await apiClient.delete(`/tasks/${taskId}`);
      return response.data; // Return the confirmation of deletion
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };
  