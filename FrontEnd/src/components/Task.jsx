import React from 'react';

const Task = ({ title, description }) => {
  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out p-6 h-64 flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4 text-sm">{description}</p>
        <div className="flex justify-between items-center mt-auto">
          <button className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-200">
            Mark as Important
          </button>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200">
              Edit
            </button>
            <button className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
