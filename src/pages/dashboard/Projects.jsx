// src/pages/dashboard/Projects.jsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ViewList, ViewModule } from '@mui/icons-material';

// Sample projects updated with client name field
const sampleProjects = [
  { id: 1, name: 'Project Alpha', clientName: 'Client A', dateAdded: '2024-11-01' },
  { id: 2, name: 'Project Beta', clientName: 'Client B', dateAdded: '2024-11-02' },
  { id: 3, name: 'Project Gamma', clientName: 'Client C', dateAdded: '2024-11-03' },
  // Add more sample projects as needed
];

const Projects = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const navigate = useNavigate();

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  const paginatedProjects = sampleProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const totalPages = Math.ceil(sampleProjects.length / projectsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-teal-700">Projects</h1>
        <div>
          <IconButton onClick={() => handleViewChange('grid')} className={`mr-2 ${viewMode === 'grid' ? 'text-teal-700' : ''}`}>
            <ViewModule />
          </IconButton>
          <IconButton onClick={() => handleViewChange('list')} className={`${viewMode === 'list' ? 'text-teal-700' : ''}`}>
            <ViewList />
          </IconButton>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <h2 className="text-lg font-semibold text-teal-700">{project.name}</h2>
              <p className="text-sm text-gray-600">Client: {project.clientName}</p>
            </div>
          ))}
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Date Added</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProjects.map((project) => (
                <TableRow
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.clientName}</TableCell>
                  <TableCell>{project.dateAdded}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="flex justify-center mt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Projects;
