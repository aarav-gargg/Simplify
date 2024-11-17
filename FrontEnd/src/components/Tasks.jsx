import React, { useEffect, useState } from 'react';
import Task from './Task';
import axios from "axios";
import { IoAddOutline } from "react-icons/io5";
import InputTask from './InputTask';

const Tasks = () => {
  const [showInputTask, setShowInputTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const resp = await axios.post(
          "https://simplify-3iue.onrender.com/tasks/all",
          {},
          { headers }
        );

        const formattedTasks = resp.data.map((task) => ({
          id: task._id,
          title: task.title,
          description: task.description,
          important: task.important,
          complete: task.complete,
        }));

        setTasks(formattedTasks);
        console.log("Tasks fetched successfully:", formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

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
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : tasks.length === 0 ? (
            <div className="flex justify-center items-center p-4 bg-red-600 rounded-md">
              <p className="text-xl text-gray-300 font-semibold">No Incomplete tasks found.</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 mt-4">
              {tasks.filter((task) => !task.complete).map((item, index) => (
                <Task
                  key={index}
                  title={item.title}
                  description={item.description}
                  complete={item.complete}
                  important={item.important}
                  id={item.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showInputTask && <InputTask onCancel={handleCancel} fromEdit={false} id={null} />}
    </>
  );
};

export default Tasks;
