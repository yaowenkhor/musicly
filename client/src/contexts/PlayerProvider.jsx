import { useState, useContext, createContext } from "react";
import { getVideoId } from "../api/youtube.search";
import React from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [musicID, setMusicId] = useState("");
  const [isPlaying, setisPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const searchMusicId = async (trackName) => {
    try {
      const data = await getVideoId(trackName);
      return data;
    } catch (error) {
      throw new Error("Error fetching search items:", error);
    }
  };

  const playTrack = async (track) => {
    const id = await searchMusicId(
      `${track.track_name} ${track.artists
        .map((a) => a.artist_name)
        .join(" ")} Official Audio`
    );

    setMusicId(id);
    setisPlaying(true);
    setCurrentTrack(track);
  };

  return (
    <PlayerContext.Provider
      value={{ musicID, isPlaying, currentTrack, playTrack, setisPlaying }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => useContext(PlayerContext);

export default usePlayer;
