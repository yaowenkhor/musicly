import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/Layout";
import Discover from "./pages/Discover";
import NewRelease from "./pages/NewRelease";
import Popular from "./pages/Popular";
import Chart from "./pages/Chart";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Playlist from "./pages/Playlist";
import NotFoundPage from "./pages/404";

import "./index.css";
import { PlayerProvider } from "./contexts/PlayerProvider";
import { AuthProvider } from "./contexts/AuthProvider";

import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "discover", element: <Discover /> },
      { path: "popular", element: <Popular /> },
      { path: "chart", element: <Chart /> },
      { path: "new-release", element: <NewRelease /> },
      { path: "album/:album_id", element: <Album /> },
      { path: "artist/:artist_id", element: <Artist /> },
      { path: "search", element: <Search /> },
      { path: "playlist/:playlist_id", element: <Playlist />},
      { path: "*", element: <NotFoundPage />}
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PlayerProvider>
        <RouterProvider router={router} />
        <Toaster />
      </PlayerProvider>
    </AuthProvider>
  </StrictMode>
);
