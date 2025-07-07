import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AddIcon from "@mui/icons-material/Add";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import DeleteIcon from "@mui/icons-material/Delete";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import toast from "react-hot-toast";

import ContextMenu from "./ContextMenu";

import { useAuth } from "../contexts/AuthProvider";

import { create, deletePlaylist } from "../api/playlist";

import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "24px",
};

const Sidebar = () => {
  const options = [
    { name: "Discover", path: "/discover", icon: <MusicNoteIcon /> },
    { name: "Popular", path: "/popular", icon: <TrendingUpIcon /> },
    { name: "Chart", path: "/chart", icon: <SsidChartIcon /> },
    { name: "New Release", path: "/new-release", icon: <NewReleasesIcon /> },
  ];

  const { user, playlist, fetchPlaylists } = useAuth();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const contextMenuRef = useRef(null);

  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const [deletePlaylistId, setDeletePlaylistId] = useState();

  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleOnContextMenu = (e, rightClickPlaylist) => {
    e.preventDefault();

    const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();

    const isLeft = e.clientX < window?.innerWidth / 2;

    let x;
    let y = e.clientY;

    if (isLeft) {
      x = e.clientX;
    } else {
      x = contextMenuAttr.width;
    }

    setContextMenu({
      position: {
        x,
        y,
      },
      toggled: true,
    });

    setDeletePlaylistId(rightClickPlaylist._id);
  };

  function resetContextMenu() {
    setContextMenu({
      position: {
        x: 0,
        y: 0,
      },
      toggled: false,
    });
  }

  useEffect(() => {
    function handler(e) {
      if (contextMenuRef.current) {
        if (!contextMenuRef.current.contains(e.target)) {
          resetContextMenu();
        }
      }
    }

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = user?.id || user?._id;

    try {
      const response = await create(name, description, user_id);
      setMessage(response.message);

      toast.success("Playlist successfully created", {
        position: "top-center",
      });

      setOpen(false);
      setName("");
      setDescription("");
      setMessage("");

      await fetchPlaylists(user_id);
    } catch (error) {
      toast.error("Something is Wrong !", {
        position: "top-center",
      });
      console.error("Error creating playlist:", error);
      setMessage(response.message);
    }
  };

  const handleDeletePlaylist = async (playlist_id) => {
    const user_id = user?.id || user?._id;
    try {
      const response = await deletePlaylist(playlist_id);

      await fetchPlaylists(user_id);

      setDeletePlaylistId();
      resetContextMenu();

      toast.success("Playlist successfully deleted", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Something is Wrong !", {
        position: "top-center",
      });
      console.log("Error deleting playlist:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#333333] text-white overflow-hidden pb-22">
      <NavLink to={"/"}>
        <h1 className="text-3xl font-bold p-4 font-mono">Musicly</h1>
      </NavLink>
      <div className="p-4">
        <ul>
          {options.map((option) => (
            <li key={option.name} className="font-semibold py-5 text-lg">
              <NavLink
                to={option.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-black bg-white px-4 py-2 font-bold border-4 border-black shadow-[4px_4px_0px_#000] transition-all duration-200"
                    : "text-white hover:text-black hover:bg-gray-100 px-4 py-2 transition-all duration-200"
                }
              >
                <span className="mr-0.5">{option.icon}</span>
                {option.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {user && (
        <div className="px-4 py-2 border-t border-[#505050]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">
              <span className="pr-2">
                <LibraryMusicIcon />
              </span>
              Playlists
            </h3>
            <button
              className="cursor-pointer hover:bg-gray-300 hover:text-black rounded-full p-2 transition-all duration-200"
              onClick={handleOpen}
            >
              <AddIcon />
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create a new playlist
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <form action="" onSubmit={handleSubmit}>
                    <TextField
                      required
                      id="standard-basic"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                    />
                    <Box sx={{ mt: 2 }}></Box>
                    <TextField
                      required
                      id="standard-basic"
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      fullWidth
                    />
                    <Box sx={{ mt: 2 }}></Box>
                    <Button variant="contained" color="secondary" type="submit">
                      Create
                    </Button>
                  </form>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      )}
      {user && (
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <p className="text-center text-gray-400 p-4">
              Loading playlists...
            </p>
          ) : (
            <div className="h-full overflow-y-auto px-4">
              <ul className="space-y-1 pb-4">
                {playlist.map((item) => (
                  <Link key={item._id} to={`/playlist/${item._id}`}>
                    <li
                      className="py-1.5 px-2 cursor-pointer hover:bg-[#393E46] hover:rounded-xl hover:backdrop-blur-md hover:shadow-md"
                      onContextMenu={(e) => handleOnContextMenu(e, item)}
                    >
                      {item.playlistName}
                    </li>
                  </Link>
                ))}
              </ul>
              <ContextMenu
                contextMenuRef={contextMenuRef}
                isToggled={contextMenu.toggled}
                positionX={contextMenu.position.x}
                positionY={contextMenu.position.y}
                buttons={[
                  {
                    text: "Delete",
                    icon: <DeleteIcon />,
                    onClick: () => handleDeletePlaylist(deletePlaylistId),
                  },
                ]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
