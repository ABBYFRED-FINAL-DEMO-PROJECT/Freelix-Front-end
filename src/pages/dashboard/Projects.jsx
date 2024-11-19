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
  Tooltip,
  Box,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ViewList, ViewModule, Add } from "@mui/icons-material";
import { apiGetAllProjects } from "../../services/dashboard.js";
import { FaCalendarAlt, FaFlag, FaDollarSign } from "react-icons/fa";

const Projects = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await apiGetAllProjects();
      console.log("API Response:", res);
      setProjects(res?.data || []);
      console.log("Fetched projects:", res.data);
    } catch (error) {
      console.log("Error fetching projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-1 rounded-md ${
              currentPage === number
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-teal-700 hover:bg-teal-500"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-teal-700">Current Projects</h1>
        <div className="flex items-center">
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

      {isLoading ? (
        <div>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                  <Skeleton variant="text" width="70%" height={32} className="mb-2" />
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="30%" />
                  </div>
                  <Skeleton variant="text" width="50%" />
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
                  {[...Array(6)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      ) : (
        <div>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {paginatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <h2 className="text-lg font-semibold text-teal-700 mb-2">
                    {project.projectName}
                  </h2>
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center space-x-1 text-sm text-gray-500">
                      <FaCalendarAlt />
                      <span>{project.projectDeadline || "N/A"}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaDollarSign />
                      <span>{project.projectBudget || "N/A"}</span>
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="flex items-center space-x-1">
                      <FaFlag />
                      <span>{project.status || "N/A"}</span>
                    </span>
                  </div>
                </div>
              ))}
              <div
                className="bg-gray-100 shadow-md rounded-lg flex justify-center items-center cursor-pointer p-6 hover:bg-gray-200"
                onClick={handleAddProjectClick}
              >
                <div className="text-center text-teal-700">
                  <Add fontSize="large" />
                  <p className="text-sm font-semibold mt-2">New Project</p>
                </div>
              </div>
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
                      <TableCell>{project.projectName}</TableCell>
                      <TableCell>{project.clientName}</TableCell>
                      <TableCell>{project.dateAdded}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}

      {!isLoading && renderPagination()}
    </div>
  );
};

export default Projects;