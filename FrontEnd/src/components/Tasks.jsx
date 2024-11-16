import React, { useState } from 'react';
import Task from './Task';
import { IoAddOutline } from "react-icons/io5";
import InputTask from './InputTask';

const Tasks = () => {
  const [showInputTask, setShowInputTask] = useState(false);  
  
  
  const data = [
    {
      title: 'First Task',
      description: 'This is the first task and it must be completed first',
      important: true,
      complete: true,
    },
    {
      title: 'Second Task',
      description: 'This is the second task and it should follow the first task.',
      important: true,
      complete: false,
    },
    {
      title: 'First Task',
      description: 'This is the first task and it must be completed first.',
      important: false,
      complete: true,
    }
  ];

  const handleAddClick = () => {
    setShowInputTask(!showInputTask); 
  };

  const handleCancel = () => {
    setShowInputTask(false);  
  };

  return (
    <>
      <div className="p-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-5xl font-extrabold font-roboto">All Tasks</h1>
          <div 
            onClick={handleAddClick} 
            className="relative w-16 h-16 flex justify-center items-center bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 transition duration-300 hover:translate-x-1 hover:translate-y-1"
          >
            <IoAddOutline className="text-3xl" />
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex flex-col space-y-6 mt-4">
          {data.map((item, index) => (
            <Task 
              key={index} 
              title={item.title} 
              description={item.description} 
              complete={item.complete} 
              important={item.important} 
            />
          ))}
        </div>
      </div>

      {showInputTask && <InputTask onCancel={handleCancel} />}
    </>
  );
};

export default Tasks;
