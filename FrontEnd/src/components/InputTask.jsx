import React from 'react';
import { MdCancel } from "react-icons/md";

const InputTask = ({ onCancel }) => {
  return (
    <>
      <div className='fixed top-0 left-0 opacity-60 h-screen w-screen bg-black'></div>
      <div className='fixed top-0 left-0 flex items-center justify-center h-screen w-screen flex-col'>
        <div className='w-3/6 bg-gray-800 h-[55vh] p-5'>
          <div className='flex justify-between items-center'>
            <h2 className='font-sourgummy text-xl font-bold mb-2'> ADD YOUR TASK</h2>
            <button onClick={onCancel} className='cursor-pointer'>
              <MdCancel className='text-3xl' />
            </button>
          </div>
          <label htmlFor="title" className='text-gray-400 text-lg font-semibold'>Title for your Task</label>
          <input type='text' placeholder='Title' name='title' className='w-full p-3 text-black border border-white rounded-xl my-2' />
          <label htmlFor="description" className='text-gray-400 text-lg font-semibold'>Describe your Task</label>
          <textarea type='text' placeholder='Description' name='description' className='w-full h-32 p-3 my-2 text-black border border-white rounded-xl' />
          <div className='flex justify-center items-center'>
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold p-3 font-sourgummy rounded-lg'>ADD TASK</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputTask;
