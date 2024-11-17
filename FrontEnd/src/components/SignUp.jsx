import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  if(isLoggedIn == true){
    navigate("/");
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    else {
      try {
        const resp = await axios.post("https://simplify-3iue.onrender.com/user/signUp", formData);
        if(resp.status == 200){
          alert("USER SIGNED UP SUCCESSFULLY LOGIN TO CONTINUE");
          navigate("/login");
        }

      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred.";
        alert(errorMessage);
        console.error("Error details:", error);
      }
    }
  };
  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <div className="bg-gradient-to-r from-gray-950 via-black to-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-red rounded-lg shadow-lg border border-white">
        <div className="text-center  mb-6">
          <h1 className="text-2xl font-bold text-red-700">Welcome to Simplify</h1>
          <p className="text-amber-500">Sign up to manage your tasks effectively!</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-amber-500">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-500">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md  hover:bg-red-700 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-amber-500">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp
