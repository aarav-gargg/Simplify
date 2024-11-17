import React, { useState } from 'react';
import axios from 'axios';
import InputTask from './InputTask';

const Task = ({ title, description, complete, important, id }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleDelete = async () => {
    try {
      const resp = await axios.post(`https://simplify-3iue.onrender.com/tasks/delete-task/${id}`, {}, { headers });
      if (resp.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      alert(errorMessage);
      console.error("Error details:", error);
    }
  };
  const handleCancel = () => {
    setShowInputTask(false);  
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImportant, setImportant] = useState(important);
  const [showInputTask, setShowInputTask] = useState(false);
  const [isComplete, setComplete] = useState(complete);

  const toggleImportant = async () => {
    try {
      const resp = await axios.post(`https://simplify-3iue.onrender.com/tasks/updateImp/${id}`, {}, { headers });
      if (resp.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      alert(errorMessage);
      console.error("Error details:", error);
    }
  };

  const toggleComplete = async () => {
    try {
      const resp = await axios.post(`https://simplify-3iue.onrender.com/tasks/updateCom/${id}`, {}, { headers });
      if (resp.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      alert(errorMessage);
      console.error("Error details:", error);
    }
  };

  const toggleEdit = () => {
    setShowInputTask(!showInputTask); 
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
    <div className="flex flex-col space-y-6 p-4">
      <div className="border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out p-6 h-64 flex flex-col justify-between relative">
        <h3 className="text-2xl font-semibold mb-2 text-center sm:text-left">{title}</h3>
        <p className="text-gray-400 mb-4 text-lg text-center sm:text-left">{description}</p>
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mb-1"></div>
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mb-1"></div>
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
        </div>

        {isMenuOpen && (
          <div
            className={`absolute top-12 right-4 bg-black border border-gray-300 rounded-lg shadow-lg w-40 py-2 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
          >
            <button
              onClick={toggleComplete}
              className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition duration-300"
            >
              {isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button
              onClick={toggleImportant}
              className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition duration-300"
            >
              {isImportant ? 'Mark as Not Important' : 'Mark as Important'}
            </button>
            <button onClick={toggleEdit} className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition duration-300">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition duration-300"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
    {showInputTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-lg">
            <InputTask onCancel={handleCancel} fromEdit={true} id = {id}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
