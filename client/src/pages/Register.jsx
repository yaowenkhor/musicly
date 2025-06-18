import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { register } from "../api/user.auth.js";
import { useAuth } from "../contexts/AuthProvider.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const navigate = useNavigate();
  const { loginAuth } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {};

    const { username, email, password } = formData;

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length <= 3) {
      newErrors.username = "Username must be at least 4 characters";
    } else if (username.length > 15) {
      newErrors.username = "Username must be less than 15 characters";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 7) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const data = await register(formData);
      loginAuth(data.user, data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      throw new Error("Register failed");
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#f4f4f4]">
      <NavLink to={"/"} className="mb-10">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight border-b-4 border-black pb-2">
          Musicly
        </h1>
      </NavLink>
      <div className="w-full max-w-md bg-white border-4 border-black shadow-lg p-10 space-y-6">
        <h2 className="text-2xl font-extrabold uppercase">Create Account</h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-bold uppercase">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-3 bg-transparent border-2 border-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
              autoComplete="none"
              onChange={handleChange}
            />
            {error.email && (
              <span className="text-sm font-medium text-red-600">
                {error.email}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-bold uppercase">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="p-3 bg-transparent border-2 border-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
              autoComplete="none"
              onChange={handleChange}
            />
            {error.username && (
              <span className="text-sm font-medium text-red-600">
                {error.username}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-bold uppercase">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-3 bg-transparent border-2 border-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
              autoComplete="none"
              onChange={handleChange}
            />
            {error.password && (
              <span className="text-sm font-medium text-red-600">
                {error.password}
              </span>
            )}
          </div>

          <button
            className="w-full p-3 mt-4 bg-black text-white font-bold uppercase border-2 border-black hover:bg-white hover:text-black transition-all cursor-pointer"
            type="submit"
            value="Submit"
          >
            Register
          </button>
        </form>
      </div>
      <div className="pt-10">
        <h4>
          Already have an account ?{" "}
          <NavLink to={"/login"}>
            <span className="underline cursor-pointer">Sign In</span>
          </NavLink>
        </h4>
      </div>
    </div>
  );
};

export default Register;
