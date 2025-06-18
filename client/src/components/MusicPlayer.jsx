import React, { useRef } from "react";
import ReactPlayer from "react-player/youtube";
import usePlayer from "../contexts/PlayerProvider";
import { useState } from "react";

import { Link } from "react-router-dom";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RepeatIcon from "@mui/icons-material/Repeat";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import QueueIcon from "@mui/icons-material/Queue";

const MusicPlayer = () => {
  const { musicID, isPlaying, currentTrack, setisPlaying } = usePlayer();

  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMute] = useState(false);
  const [Played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  const playerRef = useRef(null);

  const handleProgess = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeek = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return currentTrack ? (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t h-22">
      <div>
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${musicID}`}
          playing={isPlaying}
          volume={volume}
          muted={isMuted}
          loop={isLoop}
          onProgress={handleProgess}
          onDuration={handleDuration}
          width={0}
          height={0}
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <img
              src={currentTrack.img}
              alt=""
              className="w-10 h-10 rounded-sm"
            />
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-sm font-medium">{currentTrack.track_name}</h1>
              <h3 className="text-sm font-light">
                {currentTrack.artists.map((artist, index) => (
                  <span key={artist.artist_id} className="flex items-center">
                    <Link
                      to={`/artist/${artist.artist_id}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {artist.artist_name}
                    </Link>
                    {index < currentTrack.artists.length - 1 && (
                      <span>,&nbsp;</span>
                    )}
                  </span>
                ))}
              </h3>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex gap-1.5 items-center justify-center w-xl">
              <RepeatIcon
                onClick={() => setIsLoop((prev) => !prev)}
                className={`cursor-pointer ${
                  isLoop ? "text-blue-500" : "text-gray-500"
                }`}
              />
              <SkipPreviousIcon className="cursor-pointer" />
              {isPlaying ? (
                <PauseIcon
                  onClick={() => setisPlaying(false)}
                  className="cursor-pointer"
                />
              ) : (
                <PlayArrowIcon
                  onClick={() => setisPlaying(true)}
                  className="cursor-pointer"
                />
              )}
              <SkipNextIcon className="cursor-pointer" />
              <QueueIcon className="cursor-pointer" />
            </div>
            <div className="flex gap-1.5 mt-1.5 items-center">
              <span className="text-xs">{formatTime(duration * Played)}</span>
              <input
                type="range"
                value={Played}
                min="0"
                max="1"
                step="0.01"
                onChange={handleSeek}
                onMouseUp={() => setSeeking(false)}
                onMouseDown={() => setSeeking(true)}
                className="w-full cursor-pointer appearance-none bg-gray-300 h-1 
                rounded-none accent-black [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-none 
                [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <span className="text-xs">
                {formatTime(duration * (1 - Played))}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMute((prev) => !prev)}
              className="cursor-pointer"
            >
              {isMuted ? (
                <VolumeMuteIcon />
              ) : volume === 0 ? (
                <VolumeOffIcon />
              ) : volume < 0.5 ? (
                <VolumeDownIcon />
              ) : (
                <VolumeUpIcon />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MusicPlayer;
