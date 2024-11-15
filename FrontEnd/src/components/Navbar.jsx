import React from "react";
import { SiGoogletasks } from "react-icons/si";
import { CgGoogleTasks } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { NavLink } from "react-router-dom";

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

  return (
    <div className="flex flex-col bg-sidebar h-screen text-amber-200 p-4">
      <div className="flex flex-col items-center my-4">
        <h1 className="font-bold text-2xl">Aarav Garg</h1>
        <h3 className="text-sm">aaravgarg975@gmail.com</h3>
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

      <div className="mt-auto flex justify-center">
        <button className="text-xl font-extrabold py-2 px-6 rounded-lg text-amber-200 hover:scale-125 transition-transform duration-300">
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Navbar;
