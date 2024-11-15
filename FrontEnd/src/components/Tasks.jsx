import React from 'react';
import Task from './Task';

const Tasks = () => {
  const data = [
    {
      title: 'First Task',
      description: 'This is the first task and it must be completed first.',
    },
    {
      title: 'Second Task',
      description: 'This is the second task and it should follow the first task.',
    },
    {
      title: 'First Task',
      description: 'This is the first task and it must be completed first.',
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-5xl font-extrabold font-roboto mb-6">All Tasks</h1>
      <div className="flex flex-col space-y-6">
        {data.map((item, index) => (
          <Task key={index} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
