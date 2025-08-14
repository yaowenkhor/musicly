import React, { useState, useRef, useEffect } from "react";
import usePlayer from "../contexts/PlayerProvider";
import { useAuth } from "../contexts/AuthProvider";

import { addSongToPlaylist } from "../api/playlist";
import toast from "react-hot-toast";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

const MusicCard = ({
  number,
  track_id,
  track_name,
  track_duration,
  type,
  img,
  artists,
  handleDelete
}) => {
  const { playTrack } = usePlayer();
  const { user, playlist } = useAuth();

  const [mouseOn, setMouseOn] = useState(false);
  const [mouseOnOptions, setMouseOnOptions] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const optionsRef = useRef(null);

  function handleOptionClick() {
    setMouseOnOptions(!mouseOnOptions);
    setShowPlaylist(false);
  }

  const handleAddToPlaylist = async (playlist_id, songData) => {
    try {
      const response = await addSongToPlaylist(playlist_id, songData);

      toast.success(response.message, {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    function handler(e) {
      if (optionsRef.current) {
        if (!optionsRef.current.contains(e.target)) {
          setMouseOnOptions(false);
          setShowPlaylist(false);
        }
      }
    }

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <article
      className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-300"
      onMouseEnter={() => setMouseOn(true)}
      onMouseLeave={() => setMouseOn(false)}
    >
      <div className="w-5 text-center">
        <span className="text-lg font-semibold">
          {mouseOn ? (
            <PlayArrowIcon
              onClick={() =>
                playTrack({ track_name, track_duration, img, artists })
              }
              className="text-gray-700 w-6 h-6"
            />
          ) : (
            <span className="text-lg font-semibold">{number}</span>
          )}
        </span>
      </div>
      <div className="flex-1 px-4 flex flex-row gap-1.5 items-center">
        {type === "artist" && (
          <img src={img} alt="Artist" className="w-8 h-8 rounded-sm" loading="lazy"/>
        )}
        {type === "playlist" && (
          <img src={img} alt="Artist" className="w-8 h-8 rounded-sm" loading="lazy"/>
        )}
        <div className="flex flex-col justify-center items-start">
          <h5 className="text-sm font-medium">{track_name}</h5>
          <div className="flex flex-wrap items-center">
            {artists.map((artist, index) => (
              <span key={artist.artist_id} className="flex items-center">
                <Link
                  to={`/artist/${artist.artist_id}`}
                  className="text-sm font-medium hover:underline"
                >
                  {artist.artist_name}
                </Link>
                {index < artists.length - 1 && <span>,&nbsp;</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mr-1.5">
        <h5 className="text-lg font-medium">{track_duration}</h5>
      </div>
      {user && (
        <div className="relative" ref={optionsRef}>
          <div
            onClick={(e) => handleOptionClick(e)}
            className="p-1 rounded-full hover:bg-[#939393] transition-colors duration-100"
          >
            <MoreHorizIcon className="text-gray-700" />
          </div>
          {mouseOnOptions && (
            <ul className="absolute right-5 top-8 w-36 bg-white shadow-lg rounded-md py-1 z-10 border border-gray-200">
              <li
                className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                onClick={() => setShowPlaylist(!showPlaylist)}
              >
                + Add to Playlist
              </li>
              {type == "playlist" && (
                <li
                  className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => handleDelete()}
                >
                  - Delete
                </li>
              )}
            </ul>
          )}
          {showPlaylist && (
            <ul className="absolute right-40 top-8 mr-1 w-36 bg-white shadow-lg rounded-md py-1 z-20 border border-gray-200">
              {playlist.map((item) => (
                <li
                  key={item._id}
                  className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() =>
                    handleAddToPlaylist(item._id, {
                      songID: track_id,
                      songName: track_name,
                      songArtist: artists,
                      songImage: img,
                    })
                  }
                >
                  {item.playlistName}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
};

export default MusicCard;
