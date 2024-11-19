import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetProject, apiDeleteProject } from '../../services/dashboard';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const res = await apiGetProject(projectId);
      console.log('API Response:', res);
      setProject(res?.data || null);
    } catch (error) {
      console.error('Error fetching project details:', error);
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

  const handleDelete = async () => {
    try {
      await apiDeleteProject(projectId);
      console.log(`Project with ID: ${projectId} deleted successfully.`);
      navigate('/dashboard/projects'); // Navigate after successful delete
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleClose = () => {
    navigate('/dashboard/projects'); // Navigate back to projects page
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4">
          <Skeleton height={40} width={300} />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(5)].map((_, index) => (
              <div key={index}>
                <Skeleton height={24} width={120} className="mb-2" />
                <Skeleton height={20} width={200} />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Skeleton height={24} width={120} className="mb-2" />
            <Skeleton height={60} />
          </div>
          <div className="flex mt-6 space-x-4">
            <Skeleton height={48} width={48} circle />
            <Skeleton height={48} width={48} circle />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error fetching project details. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">{project.projectName || 'Project Details'}</h1>
      <div className="relative bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          title="Close"
        >
          <FaTimes size={20} />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Client Name:</h2>
            <p className="text-gray-600">{project.clientName || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Begins:</h2>
            <p className="text-gray-600">{project.projectBegins || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Deadline:</h2>
            <p className="text-gray-600">{project.projectDeadline || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Budget:</h2>
            <p className="text-gray-600">{project.projectBudget || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Status:</h2>
            <p className="text-gray-600">{project.status || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Description:</h2>
          <p className="text-gray-600">{project.description || 'No description available.'}</p>
        </div>
        <div className="flex mt-6 space-x-4">
          <button
            onClick={handleEdit}
            className="p-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
            title="Edit Project"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-3 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
            title="Delete Project"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-800">Confirm Delete</h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;