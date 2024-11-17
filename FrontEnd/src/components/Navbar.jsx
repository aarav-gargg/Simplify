import React, { useEffect } from "react";
import { SiGoogletasks } from "react-icons/si";
import { CgGoogleTasks } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { GrTasks } from "react-icons/gr";
import {useDispatch} from "react-redux"
import { Auth } from '../store/auth.js';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";

const Navbar = () => {
  const data = [
    {
      title: "All Tasks",
      icon: <FaTasks />,
      url: "",
    },
    {
      title: "Important Tasks",
      icon: <CgGoogleTasks />,
      url: "important",
    },
    {
      title: "Pending Tasks",
      icon: <MdPending />,
      url: "incomplete",
    },
    {
      title: "Completed Tasks",
      icon: <SiGoogletasks />,
      url: "complete",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  const [user , setUser] = useState({});

  useEffect(()=>{
    const fetch = async () => {
      const resp = await axios.post("https://simplify-3iue.onrender.com/user/getUser" , {id});
      setUser(resp.data);
    }
    fetch();
  },[])
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch(Auth.logout());
    navigate("/signup")
  }

  return (
    <div className="flex flex-col bg-sidebar h-full text-amber-200 p-4">
      
      <div className="flex items-center gap-3 mb-6">
        <GrTasks className="text-3xl text-amber-200" />
        <h1 className="text-3xl font-bold text-amber-200">Simplify</h1>
      </div>

      
      <div className="flex flex-col items-center my-4">
        <h1 className="font-bold text-2xl">{user.name}</h1>
        <h3 className="text-sm">{user.email}</h3>
      </div>
      <hr className="border-gray-500" />

      
      <div className="my-8 flex flex-col items-center gap-6">
        {data.map((item, index) => (
          <NavLink
            to={item.url}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-3 text-lg font-bold cursor-pointer p-2 rounded-lg transition-transform duration-300 ${
                isActive
                  ? "text-slate-950 scale-125"
                  : "hover:scale-125 text-amber-200"
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-auto flex justify-center">
        <button className="text-xl font-extrabold py-2 px-6 rounded-lg text-amber-200 hover:scale-125 transition-transform duration-300" onClick={logout}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Navbar;
