import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetProject, apiUpdateProject } from '../../services/dashboard';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectBegins, setProjectBegins] = useState('');
  const [projectDeadline, setProjectDeadline] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch existing project details using projectId
    const fetchProject = async () => {
      try {
        const res = await apiGetProject(projectId);
        const project = res?.data;

        setProjectName(project?.projectName || '');
        setClientName(project?.clientName || '');
        setProjectBegins(project?.projectBegins || '');
        setProjectDeadline(project?.projectDeadline || '');
        setProjectBudget(project?.projectBudget || '');
        setDescription(project?.description || '');
        setStatus(project?.status || '');
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      projectName,
      clientName,
      projectBegins,
      projectDeadline,
      projectBudget,
      description,
      status,
    };

    try {
      await apiUpdateProject(projectId, updatedProject);
      console.log('Project updated successfully:', updatedProject);
      navigate('/dashboard/projects'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" color="#00796B" mb={2}>
        Edit Project
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Project Name"
              variant="outlined"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Client Name"
              variant="outlined"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Project Begins"
              type="date"
              variant="outlined"
              value={projectBegins}
              onChange={(e) => setProjectBegins(e.target.value)}
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Project Deadline"
              type="date"
              variant="outlined"
              value={projectDeadline}
              onChange={(e) => setProjectDeadline(e.target.value)}
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Project Budget"
              type="number"
              variant="outlined"
              value={projectBudget}
              onChange={(e) => setProjectBudget(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Status"
              variant="outlined"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Update Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProject;
