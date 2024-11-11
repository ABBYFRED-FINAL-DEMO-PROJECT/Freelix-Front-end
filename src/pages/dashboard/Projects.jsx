import React, { useState, useEffect } from "react";
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
  Tooltip,
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ViewList, ViewModule, Add } from "@mui/icons-material";
import { apiGetAllProjects } from "../../services/dashboard.js";

const Projects = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  // Access handleAddProject, fetchTrigger, and projects from the Outlet context in Dashboard
  // const { handleAddProject, fetchTrigger } = useOutletContext();

  const fetchProjects = async () => {
    try {
      // Fetch projects without filter or sort
      const res = await apiGetAllProjects();
      console.log("API Response:", res);
      setProjects(res?.data || []);
      console.log("Fetched projects:", res.data);
    } catch (error) {
      console.log("Error fetching projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []); // Re-fetch projects on toggle

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  const handleAddProjectClick = () => {
    navigate("/dashboard/add-project");
  };

  const paginatedProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-teal-700">Projects</h1>
        <div className="flex items-center">
          <Tooltip title="Add New Project">
            <IconButton
              onClick={handleAddProjectClick}
              className="mr-2 text-teal-700"
            >
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Grid View">
            <IconButton
              onClick={() => handleViewChange("grid")}
              className={`mr-2 ${viewMode === "grid" ? "text-teal-700" : ""}`}
            >
              <ViewModule />
            </IconButton>
          </Tooltip>
          <Tooltip title="List View">
            <IconButton
              onClick={() => handleViewChange("list")}
              className={`${viewMode === "list" ? "text-teal-700" : ""}`}
            >
              <ViewList />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <h2 className="text-lg font-semibold text-teal-700">
                {project.name}
              </h2>
              <p className="text-sm text-gray-600">
                Client: {project.clientName}
              </p>
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Projects;
