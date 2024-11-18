import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  apiAddTask,
  apiGetTasks,
  apiEditTask,
  apiDeleteTask,
} from '../../services/task';
import { apiGetUserData } from '../../services/dashboard';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState('in progress');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [showAddFields, setShowAddFields] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await apiGetTasks();
      setTasks(
        fetchedTasks.map((task, index) => ({
          ...task,
          clientId: `TKS ${index + 1}`,
        }))
      );
    };

    const fetchUserData = async () => {
      const user = await apiGetUserData();
      setUserData(user);
    };

    fetchTasks();
    fetchUserData();
    setTimeout(() => setLoading(false), 2000); // Simulate a loader

    const handleClickOutside = (event) => {
      if (
        !Object.values(dropdownRefs.current).some((ref) =>
          ref?.contains(event.target)
        )
      ) {
        setDropdownOpenId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addTask = async () => {
    if (!taskDescription.trim()) return;
    const newTask = { description: taskDescription, status };
    const createdTask = await apiAddTask(newTask);
    setTasks([
      ...tasks,
      { ...createdTask, clientId: `TKS ${tasks.length + 1}` },
    ]);
    setTaskDescription('');
    setShowAddFields(false);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.clientId === id);
    if (!taskToEdit) return;
    setEditTaskId(id);
    setEditDescription(taskToEdit.description);
    setIsEditing(true);
    setDropdownOpenId(null);
  };

  const saveEdit = async () => {
    try {
      const updatedTask = tasks.find((task) => task.clientId === editTaskId);
      if (!updatedTask) return;

      const updatedTasks = tasks.map((task) =>
        task.clientId === editTaskId
          ? { ...task, description: editDescription }
          : task
      );

      await apiEditTask(updatedTask.id, editDescription); // Ensure API update
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditTaskId(null);
      setEditDescription('');
    } catch (error) {
      console.error('Error saving edited task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const confirmDeleteTask = (id) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteTask = async () => {
    try {
      const taskToDeleteData = tasks.find((task) => task.clientId === taskToDelete);
      if (!taskToDeleteData) return;

      await apiDeleteTask(taskToDeleteData.id); // Ensure API delete
      setTasks(tasks.filter((task) => task.clientId !== taskToDelete));
      setShowDeleteModal(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.clientId === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const taskColumns = [
    { statusType: 'all', label: 'All Tasks', color: '#E1F5FE' },
    { statusType: 'in progress', label: 'In Progress', color: '#FFECB3' },
    { statusType: 'done', label: 'Done', color: '#C8E6C9' },
    { statusType: 'closed', label: 'Closed', color: '#FFCDD2' },
  ];

  const Task = ({ task }) => {
    const [, dragRef] = useDrag(() => ({
      type: 'task',
      item: { id: task.clientId, status: task.status },
    }));

    const isTaskEditing = isEditing && editTaskId === task.clientId;

    return (
      <div
        ref={dragRef}
        className="relative p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transform transition-transform hover:scale-105 group"
        style={{
          backgroundColor: taskColumns.find((col) => col.statusType === task.status)?.color,
        }}
      >
        <h4 className="text-md font-semibold text-gray-800">{task.clientId}</h4>
        <div className="flex justify-between items-center">
          {isTaskEditing ? (
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full border px-2 py-1 rounded-md"
              autoFocus
            />
          ) : (
            <p className="text-sm text-gray-600">{task.description}</p>
          )}
          {!isTaskEditing && (
            <button
              onClick={() => handleEdit(task.clientId)}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800 hidden group-hover:block"
            >
              ✏️
            </button>
          )}
        </div>
        <div
          ref={(el) => (dropdownRefs.current[task.clientId] = el)}
          className="relative z-50"
        >
          <button
            onClick={() => setDropdownOpenId(task.clientId)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            •••
          </button>
          {dropdownOpenId === task.clientId && (
            <div className="absolute top-10 left-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <button
                onClick={() => handleEdit(task.clientId)}
                className="block px-4 py-2 text-sm text-left text-gray-700 w-full hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDeleteTask(task.clientId)}
                className="block px-4 py-2 text-sm text-left text-gray-700 w-full hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        {isTaskEditing && (
          <div className="mt-3 flex items-center space-x-4">
            <button
              onClick={saveEdit}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTaskId(null);
                setEditDescription('');
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  };

  const TaskColumn = ({ column }) => {
    const [, dropRef] = useDrop(() => ({
      accept: 'task',
      drop: (item) => moveTask(item.id, column.statusType),
    }));

    const filteredTasks = tasks.filter((task) =>
      column.statusType === 'all' ? true : task.status === column.statusType
    );

    return (
      <div
        ref={dropRef}
        className="space-y-4 p-4 border rounded-lg bg-gray-50 h-[500px] overflow-y-auto group"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="sticky top-0 z-50 bg-gray-50 py-2">
          <h3 className="text-lg font-semibold capitalize text-gray-800">
            {column.label} ({filteredTasks.length})
          </h3>
        </div>
        {filteredTasks.map((task) => (
          <Task key={task.clientId} task={task} />
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-7xl mx-auto p-4">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-4 gap-6">
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-64 bg-gray-300 rounded-lg shadow-md"
                  ></div>
                ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {userData ? `Welcome, ${userData.fullName}!` : 'Welcome!'}
                  </h1>
                  <p className="text-gray-600">
                    Here’s your task dashboard. Let’s make progress today!
                  </p>
                </div>
                <button
                  onClick={() => setShowAddFields(!showAddFields)}
                  className="text-white text-3xl px-3 py-2 rounded-md"
                  style={{ backgroundColor: '#00796B' }}
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
                      className="px-4 py-2 text-white rounded-md hover:opacity-90"
                      style={{ backgroundColor: '#00796B' }}
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {taskColumns.map((column) => (
                <TaskColumn key={column.statusType} column={column} />
              ))}
            </div>
          </>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this task?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteTask}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default TaskDashboard;
