import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MusicCard from "../components/MusicCard";

import { getPlaylistDetails, deleteSongFromPlaylist } from "../api/playlist";

const Playlist = () => {
  const { playlist_id } = useParams();

  const [playlist, setPlaylist] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const navigate = useNavigate();

  const deleteSong = async (playlist_id, track_id) => {
    try {
      const response = await deleteSongFromPlaylist(playlist_id, track_id);

      toast.success(response.message, {
        position: "top-center",
      });

      setRefreshTrigger(prev => prev + 1);

    } catch (error) {
      toast.error(error, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlaylistDetails(playlist_id);
        setPlaylist(data);
      } catch (error) {
        toast.error(error, {
          position: "top-center",
        });
        if(error == 'Access denied'){
          navigate('/discover')
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [playlist_id, refreshTrigger]);

  if (loading || !playlist) {
    return <p>Loading artist data...</p>;
  }

  return (
    <div className="p-4 h-screen">
      <div className="border-b-1">
        <h1 className="font-bold text-4xl">{playlist.playlistName}</h1>
        <h2 className="text-base">
          <span className="font-semibold text-lg">Des:</span>{" "}
          {playlist.playlistDescription}
        </h2>
      </div>
      <div className="h-full">
        {playlist.playlistSongs.map((item, index) => (
          <MusicCard
            number={index + 1}
            type="playlist"
            key={item.songID}
            track_id={item.songID}
            track_name={item.songName}
            img={item.songImage}
            artists={item.songArtist}
            handleDelete={() => {
              deleteSong(playlist_id, item.songID);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
