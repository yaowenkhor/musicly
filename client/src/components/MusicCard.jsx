import React, { useState } from "react";
import usePlayer from "../contexts/PlayerProvider";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";

const MusicCard = ({
  number,
  track_name,
  track_duration,
  type,
  img,
  artists,
}) => {
  const { playTrack } = usePlayer();

  const [mouseOn, setMouseOn] = useState(false);

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
          <img src={img} alt="Artist" className="w-8 h-8 rounded-sm" />
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
      <div className="">
        <h5 className="text-lg font-medium">{track_duration}</h5>
      </div>
    </article>
  );
};

export default MusicCard;
