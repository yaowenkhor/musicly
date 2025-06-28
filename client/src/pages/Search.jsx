import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getSearch } from "../api/spotify.search";

import RowDisplay from "../components/RowDisplay";
import MusicCard from "../components/MusicCard";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visible, setVisible] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSearch(query);
        setSearchResult(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  if (loading) {
    return <p>Loading search data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let topResult = null;
  let type = null;

  const q = query.trim().toLowerCase();

  const scoredResult = [];

  searchResult.track.forEach((track) => {
    const trackName = track.track_name.trim().toLowerCase();
    const score = trackName === q ? 2 : trackName.includes(q) ? 1 : 0;
    scoredResult.push({ type: "track", data: track, score });
  });

  searchResult.artist.forEach((artist) => {
    const artistName = artist.artist_names.trim().toLowerCase();
    const score = artistName === q ? 2 : artistName.includes(q) ? 1 : 0;
    scoredResult.push({ type: "artist", data: artist, score });
  });

  if (scoredResult.length > 0) {
    const bestMatch = scoredResult.reduce((prev, curr) => {
      return curr.score > prev.score ? curr : prev;
    });
    topResult = bestMatch.data;
    type = bestMatch.type;
  }

  return (
    <div className="p-4 flex-col gap-10">
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="h-96 ">
          <h1 className="text-4xl font-bold mb-5 ">Top Result</h1>

          {type === "artist" && (
            <Link to={`/artist/${topResult.artist_id}`}>
              <div className="flex flex-row items-center gap-15">
                <img
                  src={topResult.images[0]?.url}
                  alt=""
                  className="rounded-full w-54 h-54 object-cover ml-10"
                />
                <div>
                  <h1 className="text-4xl font-extrabold">
                    {topResult.artist_names}
                  </h1>
                  <h4>Artist</h4>
                </div>
              </div>
            </Link>
          )}

          {type === "track" && (
            <div className="flex flex-row items-center gap-15">
              <img
                src={topResult.image}
                alt=""
                className="rounded-2xl w-54 h-54 object-cover ml-10"
              />
              <div>
                <h1 className="text-4xl font-extrabold">
                  {topResult.track_name}
                </h1>
                <h4>Track</h4>
              </div>
            </div>
          )}
        </div>
        <div className="h-96 overflow-y-scroll">
          <h1 className="text-4xl font-bold mb-5 ">Tracks</h1>
          {searchResult.track.slice(0, visible).map((item, index) => (
            <MusicCard
              key={item.track_id}
              track_id={item.track_id}
              type="artist"
              number={index + 1}
              track_name={item.track_name}
              track_duration={item.duration}
              img={item.image}
              artists={item.artist}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-5 border-b-4 border-black pb-4">
          Artist
        </h1>
        <div className="flex flex-row overflow-hidden w-full h-auto gap-10 justify-evenly items-center">
          {searchResult.artist.slice(0, visible).map((item) => (
            <Link to={`/artist/${item.artist_id}`}>
              <RowDisplay
                type="artist"
                key={item.artist_id}
                img={item.images[0]?.url || "default_images_url"}
                name={item.artist_names}
              />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-8 border-b-4 border-black pb-4">
          Albums
        </h1>
        <div className="flex flex-row overflow-hidden w-full h-auto gap-10 justify-evenly items-center">
          {searchResult.album.slice(0, visible).map((item) => (
            <Link to={`/album/${item.album_id}`}>
              <RowDisplay
                type="album"
                key={item.album_id}
                img={item.images[0]?.url || "default_images_url"}
                name={item.album_name}
                albumType={item.album_type}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
