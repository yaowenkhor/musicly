import React, { useEffect, useState } from "react";
import { getAlbum } from "../api/spotify.album";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import MusicCard from "../components/MusicCard";

const Album = () => {
  const { album_id } = useParams();
  const [album, setAlbum] = useState({ track: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlbum(album_id);
        setAlbum(data);
      } catch (error) {
        setError("Failed to fetch album data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [album_id]);

  if (loading) {
    return <p>Loading album data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <div className="w-full h-80 flex items-center">
        <ProfileHeader
          type="album"
          key={album.album_id}
          img={album.images[0]?.url || "default_image_url"}
          albumName={album.album_name}
          totalTracks={album.total_tracks}
          releaseDate={album.release_date}
          artistId={album.artist_id}
          artist={album.artist_name}
        />
      </div>
      <div>
        {album.track.map((track, index) => (
          <MusicCard
            type="artist"
            key={track.track_id}
            track_id={track.track_id}
            number={index + 1}
            track_name={track.track_name}
            track_duration={track.duration}
            img={album.images[0]?.url || "default_image_url"}
            artists={track.artist}
          />
        ))}
      </div>
    </div>
  );
};

export default Album;
