import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams(); // Get the projectId from the URL parameters
  const navigate = useNavigate();

  // Sample project data for demonstration. Replace this with real data fetching logic.
  const project = {
    id: projectId,
    name: 'Project Alpha',
    dateAdded: '2024-11-01',
    description: 'This is a detailed description of Project Alpha.',
  };

  const handleEdit = () => {
    navigate(`/dashboard/edit-project/${project.id}`); // Navigate to the edit project page
  };

  const handleDelete = () => {
    // Handle deletion logic here (e.g., API call to delete the project)
    console.log(`Deleting project with ID: ${project.id}`);
    // After deletion, navigate back to the projects list
    navigate('/dashboard/projects'); 
  };

  return (
    <Box p={2}>
      <Typography variant="h4" color="#00796B" mb={2}>
        {project.name}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" color="#00796B">
            Date Added: {project.dateAdded}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {project.description}
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit Project
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
              Delete Project
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProjectDetails;
