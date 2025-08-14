import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useAuth } from "../contexts/AuthProvider";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }, [debouncedQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/discover");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row p-4 justify-between items-center">
      <div className="flex items-center">
        <NavLink className="flex" to={"/"}>
          <HomeTwoToneIcon className="mr-1.5" />
        </NavLink>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ "& > :not(style)": { m: 1 } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="search"
            label="Search..."
            variant="outlined"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: "56rem",
              "& .MuiOutlinedInput-root": {
                height: "3rem",
                padding: "0 0.75rem",
                backgroundColor: "#fff",
                borderRadius: "2rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                "& fieldset": {
                  border: "none",
                },
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                },
                "&.Mui-focused": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  backgroundColor: "#fff",
                },
              },
              "& .MuiInputBase-input": {
                padding: "0.75rem",
                fontSize: "1rem",
                color: "#333",
              },
              "& .MuiInputLabel-root": {
                color: "#bbb",
                fontSize: "0.9rem",
                "&.Mui-focused": {
                  color: "#666",
                },
              },
            }}
          />
        </Box>
      </div>

      <div className="flex space-x-4">
        {user ? (
          <div className="flex gap-5 items-center justify-center">
            <div className="flex items-center gap-1.5">
              <img
                src="/icons8-user-48.png"
                alt="user image"
                className="w-10 h-10 rounded-full  object-cover border-2"
              />
              <span className="pl-1.5 text-sm font-medium">
                {user.username}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="py-2 px-6 border border-gray-300 text-gray-700 bg-white font-medium rounded-full shadow-sm 
               hover:bg-pink-200 hover:text-gray-900 transition-all duration-200 ease-in-out cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <NavLink to={"/login"}>
              <button className="py-2 px-6 border-2 border-black text-black bg-white font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer">
                Login
              </button>
            </NavLink>

            <NavLink to={"/register"}>
              <button className="py-2 px-6 border-2 border-black text-black bg-white font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer">
                Register
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
