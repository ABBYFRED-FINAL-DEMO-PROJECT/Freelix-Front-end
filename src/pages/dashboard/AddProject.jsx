import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { apiPostProject } from "../../services/dashboard";

const AddProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    projectBegins: "",
    projectDeadline: "",
    projectBudget: "",
    status: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handleAddProject } = useOutletContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiPostProject(formData);
      console.log('Project posted:', response);
      enqueueSnackbar("Project added successfully!", { variant: "success" });
      handleAddProject();
      navigate("/dashboard/projects");
    } catch (err) {
      setError(err.message || "Failed to add project");
      enqueueSnackbar("Failed to add project!", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/dashboard/projects");
  };

  return (
    <Box p={4} className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <Typography variant="h4" className="text-[#00796B] mb-4">
        Add New Project
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Project Name"
          name="projectName"
          placeholder="Enter project name"
          variant="outlined"
          fullWidth
          required
          value={formData.projectName}
          onChange={handleChange}
        />
        <TextField
          label="Client Name"
          name="clientName"
          placeholder="Enter client name"
          variant="outlined"
          fullWidth
          required
          value={formData.clientName}
          onChange={handleChange}
        />
        <TextField
          label="Project Begins"
          name="projectBegins"
          placeholder="Select start date"
          type="date"
          variant="outlined"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.projectBegins}
          onChange={handleChange}
        />
        <TextField
          label="Project Deadline"
          name="projectDeadline"
          placeholder="Select deadline date"
          type="date"
          variant="outlined"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.projectDeadline}
          onChange={handleChange}
        />
        <TextField
          label="Project Budget"
          name="projectBudget"
          placeholder="Enter project budget"
          type="number"
          variant="outlined"
          fullWidth
          required
          value={formData.projectBudget}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          placeholder="Enter project description"
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
          required
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          label="Status"
          name="status"
          placeholder="Add a project status"
          variant="outlined"
          fullWidth
          required
          value={formData.status}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            style={{ backgroundColor: "#00796B", color: "white", flexGrow: 1, marginRight: '8px' }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add Project"
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{ borderColor: "#00796B", color: "#00796B", flexGrow: 1 }}
          >
            Close
          </Button>
        </Box>
      </form>
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AddProject;