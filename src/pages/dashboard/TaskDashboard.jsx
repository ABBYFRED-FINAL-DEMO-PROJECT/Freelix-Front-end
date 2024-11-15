import React, { useState, useEffect, useRef } from 'react';
import {
  apiAddTask,
  apiGetTasks,
  apiGetTaskById,
  apiEditTask,
  apiDeleteTask,
} from '../../services/task';
import {apiGetUserData} from '../../services/dashboard'

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState('in progress');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editdescription, setEditDescription] = useState('');
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [showAddFields, setShowAddFields] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRefs = useRef({});

  // Fetch tasks and user data on mount
  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await apiGetTasks();
      setTasks(fetchedTasks);
    };

    const fetchUserData = async () => {
      const user = await apiGetUserData();
      setUserData(user);
    };

    fetchTasks();
    fetchUserData();
  }, []);

  const addTask = async () => {
    if (!taskDescription.trim()) return;
    const newTask = { description: taskDescription, status };
    const createdTask = await apiAddTask(newTask);
    setTasks([...tasks, createdTask]);
    setTaskDescription('');
    setShowAddFields(false); // Hide fields after adding
  };

  const handleEdit = async (id) => {
    const taskToEdit = await apiGetTaskById(id);
    setEditTaskId(id);
    setEditDescription(taskToEdit.description);
    setIsEditing(true);
    setDropdownOpenId(null); // Close dropdown after editing
  };

  const saveEdit = async () => {
    try {
      await apiEditTask(editTaskId, editdescription);
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, description: editdescription } : task
        )
      );
      setIsEditing(false);
      setEditTaskId(null);
      setEditDescription('');
    } catch (error) {
      console.error('Error saving edited task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const deleteTask = async (id) => {
    await apiDeleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
    setDropdownOpenId(null); // Close dropdown after deletion
  };

  const changeStatus = (id, newStatus) => {
    // Client-side only update for task status
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    setDropdownOpenId(null); // Close dropdown after status change
  };

  const toggleDropdown = (id) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpenId) {
        const dropdownElement = dropdownRefs.current[dropdownOpenId];
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          setDropdownOpenId(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpenId]);

  // Task counts
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((task) => task.status === 'in progress').length;
  const doneTasks = tasks.filter((task) => task.status === 'done').length;
  const closedTasks = tasks.filter((task) => task.status === 'closed').length;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              {userData ? `Welcome, ${userData.fullName}!` : 'Welcome!'}
            </h1>
            <p className="text-gray-500">
              Here’s your task dashboard. Let’s make progress today!
            </p>
          </div>
          <button
            onClick={() => setShowAddFields(!showAddFields)}
            className="text-blue-500 hover:text-blue-700 text-3xl"
            title="Add Task"
          >
            +
          </button>
        </div>
        {showAddFields && (
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex-1 mb-4 sm:mb-0">
              <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter Task"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
                <option value="closed">Closed</option>
              </select>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { statusType: 'all', count: totalTasks, label: 'All Tasks' },
          { statusType: 'in progress', count: inProgressTasks, label: 'In Progress' },
          { statusType: 'done', count: doneTasks, label: 'Done' },
          { statusType: 'closed', count: closedTasks, label: 'Closed' },
        ].map(({ statusType, count, label }) => (
          <div key={statusType}>
            <h3 className="text-2xl font-semibold mb-4 capitalize">
              {label} ({count})
            </h3>
            {tasks
              .filter((task) =>
                statusType === 'all' ? true : task.status === statusType
              )
              .map((task) => (
                <div
                  key={task.id}
                  className={`relative p-4 border border-gray-300 rounded-lg shadow-md mb-4 ${
                    statusType === 'in progress'
                      ? 'bg-[#8BBEB9]'
                      : statusType === 'done'
                      ? 'bg-[#4E9E94]'
                      : statusType === 'closed'
                      ? 'bg-[#0A7A6D]'
                      : 'bg-[#DAE8E6]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xl font-semibold">
                      {isEditing && editTaskId === task.id ? (
                        <input
                          type="text"
                          value={editdescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full border px-3 py-2 rounded-md"
                        />
                      ) : (
                        task.description
                      )}
                    </h4>
                    <div ref={(el) => (dropdownRefs.current[task.id] = el)} className="relative">
                      <button
                        onClick={() => toggleDropdown(task.id)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        •••
                      </button>
                      {dropdownOpenId === task.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <button
                            onClick={() => handleEdit(task.id)}
                            className="block px-4 py-2 text-sm text-left text-gray-700 w-full hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="block px-4 py-2 text-sm text-left text-gray-700 w-full hover:bg-gray-100"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              changeStatus(
                                task.id,
                                task.status === 'in progress'
                                  ? 'done'
                                  : task.status === 'done'
                                  ? 'closed'
                                  : 'in progress'
                              )
                            }
                            className="block px-4 py-2 text-sm text-left text-gray-700 w-full hover:bg-gray-100"
                          >
                            Move to{' '}
                            {task.status === 'in progress'
                              ? 'Done'
                              : task.status === 'done'
                              ? 'Closed'
                              : 'In Progress'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">Status: {task.status}</div>
                  {isEditing && editTaskId === task.id && (
                    <div className="mt-3 flex items-center space-x-4">
                      <button
                        onClick={saveEdit}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;
