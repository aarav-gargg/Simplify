import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import IncTasks from './components/IncTasks';
import ComTasks from './components/ComTasks';
import ImpTasks from './components/ImpTasks';
import Navbar from './components/Navbar';
import { HiMenu } from 'react-icons/hi';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { useLocation } from 'react-router-dom';
import { Auth } from './store/auth.js';
import {useDispatch} from "react-redux"

function AppLayout() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const location = useLocation();
  const noNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = noNavbarRoutes.includes(location.pathname);

  const closeNavbar = () => setIsNavbarOpen(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {!shouldHideNavbar && (
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
      )}

      {!shouldHideNavbar && isNavbarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeNavbar}
        ></div>
      )}

      {!shouldHideNavbar && (
        <div
          className={`fixed md:static top-0 left-0 w-2/3 md:w-1/6 bg-sidebar text-amber-200 min-h-screen z-50 transition-transform duration-300 ease-in-out ${
            isNavbarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <Navbar />
        </div>
      )}

      <div
        className={`w-full ${
          shouldHideNavbar ? "md:w-full" : "md:w-5/6"
        } bg-black text-amber-600  min-h-screen`}
      >
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token") && !isLoggedIn) {
      dispatch(Auth.login());
    }
    else if (isLoggedIn == false && !["/login", "/signup"].includes(location.pathname)) {
      navigate("/signup");
    }
  }, [dispatch, isLoggedIn, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/incomplete" element={<IncTasks />} />
        <Route path="/complete" element={<ComTasks />} />
        <Route path="/important" element={<ImpTasks />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Route>
    </Routes>
  );
}

export default App;

