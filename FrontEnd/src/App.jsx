import { useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from 'react-router-dom';
import Home from './components/Home'
import IncTasks from './components/IncTasks';
import ComTasks from './components/ComTasks';
import ImpTasks from './components/ImpTasks';
import Navbar from './components/Navbar';

function AppLayout() {
  return (
    <div className='flex'>
      <div className='w-1/6'>
        <Navbar />
      </div>
      <div className='w-5/6 flex flex-col bg-black h-screen text-amber-600 p-2'>
          <Outlet/>
      </div>
    </div>
  );
}

function App() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route  path="" element={<AppLayout />}>
        <Route path="" element={<Home/>}/>
        <Route path="/incomplete" element={<IncTasks />} />
        <Route path="/complete" element={<ComTasks />} />
        <Route path="/important" element={<ImpTasks />} />
        </Route>
      )
    )
    return <RouterProvider router={router} />;
  
}

export default App
