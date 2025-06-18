import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";

const Layout = () => {
  return (
    <div class="h-screen grid grid-cols-[1fr_6fr]">
      <Sidebar />
      <div class="bg-[#f4f4f4] overflow-y-scroll pb-20">
        <div className="w-full">
          <Header />
        </div>
        <Outlet />
      </div>
      <MusicPlayer />
    </div>
  );
};

export default Layout;
