import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";
import axios from 'axios'

const InputTask = ({ onCancel , fromEdit , id}) => {
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if(fromEdit == false){
      try {
        e.preventDefault();
        const response = await axios.post('https://simplify-3iue.onrender.com/tasks/create', formData, { headers } );
        console.log(response);
        if(response.status == 201){
          window.location.reload();
        }
        setFormData({ title: "", description: "" }); 
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    }
    else if(fromEdit == true){
      try {
        e.preventDefault();
        const response = await axios.post(`https://simplify-3iue.onrender.com/tasks/update/${id}`, formData, { headers } );
        console.log(response);
        if(response.status == 200){
          window.location.reload();
        }
        setFormData({ title: "", description: "" }); 
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    }
  };

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
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className='text-gray-400 text-lg font-semibold'>Title for your Task</label>
            <input
              type='text'
              placeholder='Title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className='w-full p-3 text-black border border-white rounded-xl my-2'
              required
            />
            <label htmlFor="description" className='text-gray-400 text-lg font-semibold'>Describe your Task</label>
            <textarea
              placeholder='Description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full h-32 p-3 my-2 text-black border border-white rounded-xl'
              required
            />
            <div className='flex justify-center items-center'>
              <button
                type='submit'
                className='bg-green-500 hover:bg-green-700 text-white font-bold p-3 font-sourgummy rounded-lg'
              >
                ADD TASK
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default InputTask;
