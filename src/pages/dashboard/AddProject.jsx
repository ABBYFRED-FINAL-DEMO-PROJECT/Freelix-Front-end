import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddProject = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    projectStartDate: '',
    projectDeadline: '',
    projectBudget: '',
    projectStructure: '',
    projectDescription: '',
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
      // Simulate adding the project
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleAddProject({ ...formData });
      enqueueSnackbar('Project added successfully!', { variant: 'success' });
      navigate('/dashboard/projects');
    } catch (err) {
      setError(err.message || 'Failed to add project');
      enqueueSnackbar('Failed to add project!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
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
          label="Project Start Date"
          name="projectStartDate"
          placeholder="Select start date"
          type="date"
          variant="outlined"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.projectStartDate}
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
          label="Project Structure"
          name="projectStructure"
          placeholder="Describe the project structure"
          variant="outlined"
          fullWidth
          required
          value={formData.projectStructure}
          onChange={handleChange}
        />
        <TextField
          label="Project Description"
          name="projectDescription"
          placeholder="Enter project description"
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
          required
          value={formData.projectDescription}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          style={{ backgroundColor: '#00796B', color: 'white' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Project'}
        </Button>
      </form>
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AddProject;
