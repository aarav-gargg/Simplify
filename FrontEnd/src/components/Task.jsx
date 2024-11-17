import React, { useEffect, useState } from 'react';

const Task = ({ title, description , complete , important , id}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImportant , setImportant] = useState({complete});
  const [isComplete , setComplete] = useState({important});

  // useEffect(() => {
  //   console.log(isComplete);
  //   console.log(isImportant);
  // },[isComplete , isImportant]);

  const toggleImportant = () => {
    setImportant(!isImportant);
  }

  const toggleComplete = () => {
    setComplete(!isComplete);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
            className={`absolute top-12 right-4 bg-black border border-gray-300 rounded-lg shadow-lg w-40 py-2 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <button onClick={toggleComplete} className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition duration-300">
              Mark as Complete
            </button>
            <button  onClick={toggleImportant} className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800  rounded-lg transition duration-300">
              Mark as Important
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition duration-300">
              Edit
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg transition duration-300">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
