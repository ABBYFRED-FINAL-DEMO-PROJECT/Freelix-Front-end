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

const EditProject = () => {
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Here you can fetch the existing project details using the projectId
    // For demonstration, we'll use static data
    const existingProject = { name: 'Project Alpha', dateAdded: '2024-11-01' }; // Replace with actual fetch logic
    setProjectName(existingProject.name);
    setDateAdded(existingProject.dateAdded);
  }, [projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic to update the project
    console.log('Project updated:', { projectId, projectName, dateAdded });
    // Redirect to the projects page after updating the project
    navigate('/dashboard/projects');
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
              label="Date Added"
              type="date"
              variant="outlined"
              value={dateAdded}
              onChange={(e) => setDateAdded(e.target.value)}
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
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
