import React, { useState } from "react";
import { data, NavLink, useNavigate } from "react-router-dom";

import { loginAPI } from "../api/user.auth";
import { useAuth } from "../contexts/AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { loginAuth } = useAuth();
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};

    const { username, password } = formData;

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const data = await loginAPI(formData);
      loginAuth(data.user, data.token);
      navigate("/");
    } catch (error) {
      const errorMessage = error.message || "Login failed. Please try again.";
      newErrors.auth = errorMessage;
      setError(newErrors);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#f4f4f4]">
      <NavLink to={"/"} className="mb-10">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight border-b-4 border-black pb-2">
          Musicly
        </h1>
      </NavLink>
      <div className="w-full max-w-md bg-white border-4 border-black shadow-lg p-10 space-y-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl font-extrabold uppercase">
            Login to your account
          </h2>

          {error.auth && (
            <span className="text-sm font-medium text-red-600">
              {error.auth}
            </span>
          )}
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
      </div>
      <div className="pt-10">
        <h4>
          Don't have an account?{" "}
          <NavLink to={"/register"}>
            <span className="underline cursor-pointer">Sign Up</span>
          </NavLink>
        </h4>
      </div>
    </div>
  );
};

export default Login;
