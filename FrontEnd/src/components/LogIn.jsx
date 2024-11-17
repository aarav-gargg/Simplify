import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Auth } from '../store/auth.js';
import {useDispatch} from "react-redux"
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const LogIn = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  if(isLoggedIn == true){
    navigate("/");
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const resp = await axios.post("https://simplify-3iue.onrender.com/user/login", formData)
      setFormData({ email: "", password: "" });
      if(resp.status==200){
        localStorage.setItem("id" , resp.data.id);
        localStorage.setItem("token" , resp.data.token);
        dispatch(Auth.login());
        alert("USER LOGGED IN SUCCESSFULLY")
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      alert(errorMessage);
      console.error("Error details:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-950 via-black to-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-red rounded-lg shadow-lg border border-white">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-red-700">Welcome Back to Simplify</h1>
          <p className="text-amber-500">Log in to manage your tasks!</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-amber-500">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-amber-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-amber-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-red-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default LogIn
