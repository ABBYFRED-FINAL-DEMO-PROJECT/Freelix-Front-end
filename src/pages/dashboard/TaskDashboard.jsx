import React, { useState, useEffect, useRef } from 'react';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const dropdownRef = useRef(null);

  // Add new task
  const addTask = () => {
    if (!taskName.trim()) return;
    const newTask = { id: Date.now(), name: taskName, status };
    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  // Edit task
  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTaskId(id);
    setEditTaskName(taskToEdit.name);
    setIsEditing(true);
    setDropdownOpenId(null); // Close dropdown after editing
  };

  // Save edited task
  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId ? { ...task, name: editTaskName } : task
      )
    );
    setIsEditing(false);
    setEditTaskId(null);
    setEditTaskName('');
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setDropdownOpenId(null); // Close dropdown after deletion
  };

  // Change status of task
  const changeStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    setDropdownOpenId(null); // Close dropdown after status change
  };

  // Toggle dropdown menu visibility for a specific task
  const toggleDropdown = (id) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Add Task Form */}
      <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex-1 mb-4 sm:mb-0">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
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
              <option value="in-progress">In Progress</option>
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
      </div>

      {/* Task Counts */}
      <div className="mt-5 flex flex-wrap justify-between text-lg font-semibold space-x-4">
        <div>Total Tasks: {tasks.length}</div>
        <div>In Progress: {tasks.filter((task) => task.status === 'in-progress').length}</div>
        <div>Done: {tasks.filter((task) => task.status === 'done').length}</div>
        <div>Closed: {tasks.filter((task) => task.status === 'closed').length}</div>
      </div>

      {/* Task List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {['all', 'in-progress', 'done', 'closed'].map((statusType) => (
          <div key={statusType}>
            <h3 className="text-2xl font-semibold mb-4 capitalize">
              {statusType === 'all' ? 'All Tasks' : statusType}
            </h3>
            {tasks
              .filter((task) =>
                statusType === 'all' ? true : task.status === statusType
              )
              .map((task) => (
                <div
                  key={task.id}
                  className="relative bg-white p-4 border border-gray-300 rounded-lg shadow-md mb-4"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xl font-semibold">
                      {isEditing && editTaskId === task.id ? (
                        <input
                          type="text"
                          value={editTaskName}
                          onChange={(e) => setEditTaskName(e.target.value)}
                          className="w-full border px-3 py-2 rounded-md"
                        />
                      ) : (
                        task.name
                      )}
                    </h4>
                    {/* Three-dot menu */}
                    <div ref={dropdownRef} className="relative">
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
                            disabled={task.status === 'closed'}
                            className={`block px-4 py-2 text-sm text-left text-gray-700 w-full hover:bg-gray-100 ${
                              task.status === 'closed' ? 'cursor-not-allowed text-gray-400' : ''
                            }`}
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
                                task.status === 'in-progress'
                                  ? 'done'
                                  : task.status === 'done'
                                  ? 'closed'
                                  : 'in-progress'
                              )
                            }
                            disabled={task.status === 'closed'}
                            className={`block px-4 py-2 text-sm text-left text-gray-700 w-full hover:bg-gray-100 ${
                              task.status === 'closed' ? 'cursor-not-allowed text-gray-400' : ''
                            }`}
                          >
                            Move to{' '}
                            {task.status === 'in-progress'
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
                    <button
                      onClick={saveEdit}
                      className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      Save
                    </button>
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
