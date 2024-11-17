import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './Task';

const ImpTasks = () => {
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
          "http://localhost:3000/tasks/important",
          {},
          { headers }
        );
        if (resp.status === 201) {
          setTasks([]); 
        } else {
          const formattedTasks = resp.data.map((task) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            important: task.important,
            complete: task.complete,
          }));

          setTasks(formattedTasks);
        }

        setLoading(false); 
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
        setLoading(false); 
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="p-4">
        <h1 className="text-5xl font-extrabold font-roboto">Important Tasks</h1>
        <hr className="my-2" />

        <div className="mt-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : tasks.length === 0 ? (
            <div className="flex justify-center items-center p-4 bg-red-600 rounded-md">
              <p className="text-xl text-gray-300 font-semibold">No important tasks found.</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 mt-4">
              {tasks.map((item, index) => (
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
    </>
  );
};

export default ImpTasks;
