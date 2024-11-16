import { useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";
import Home from "./components/Home";
import IncTasks from "./components/IncTasks";
import ComTasks from "./components/ComTasks";
import ImpTasks from "./components/ImpTasks";
import { GrTasks } from "react-icons/gr";
import Navbar from "./components/Navbar";
import { HiMenu } from "react-icons/hi";

function AppLayout() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const closeNavbar = () => setIsNavbarOpen(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex md:hidden justify-between items-center bg-black text-amber-600 p-4">
        <h1 className="text-2xl font-bold">Simplify</h1>
        <button
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          className="text-3xl focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <HiMenu />
        </button>
      </div>

  
      {isNavbarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeNavbar}
        ></div>
      )}

      <div
        className={`fixed md:static top-0 left-0 w-2/3 md:w-1/6 bg-sidebar text-amber-200 min-h-screen z-50 transition-transform duration-300 ease-in-out ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Navbar />
      </div>

      <div className="w-full md:w-5/6 bg-black text-amber-600 p-4 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<AppLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/incomplete" element={<IncTasks />} />
        <Route path="/complete" element={<ComTasks />} />
        <Route path="/important" element={<ImpTasks />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
