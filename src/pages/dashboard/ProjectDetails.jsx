import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetProject } from  '../../services/dashboard';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const res = await apiGetProject(projectId);
      console.log("API Response:", res);
      setProject(res?.data || {});
      console.log("Fetched project details:", res.data);
    } catch (error) {
      console.log("Error fetching project details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const handleEdit = () => {
    navigate(`/dashboard/edit-project/${projectId}`);
  };

  const handleDelete = () => {
    console.log(`Deleting project with ID: ${projectId}`);
    navigate('/dashboard/projects');
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress size={64} color="primary" />
        <span className="ml-4 text-gray-600 text-lg">Loading project details...</span>
      </Box>
    );
  }

  if (!project) {
    return <Typography>Error fetching project details.</Typography>;
  }

  return (
    <Box p={2}>
      <Typography variant="h4" color="#00796B" mb={2}>
        {project.projectName}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" color="#00796B">
            Client Name: {project.clientName}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Begins: {project.projectBegins}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Deadline: {project.projectDeadline}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Budget: {project.projectBudget}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Status: {project.status}
          </Typography>
          <Typography variant="body1" color="textSecondary" mt={2}>
            Description: {project.description}
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