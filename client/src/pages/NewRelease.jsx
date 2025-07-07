import React, {useEffect, useState} from 'react'
import {newRelease} from '../api/spotify.album.js'
import AlbumCard from '../components/AlbumCard';
import {Link} from 'react-router-dom';

const NewRelease = () => {

  const [releases, setRelease] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const fetchData = async () =>{
      try {
        const data = await newRelease();
        setRelease(data);

      } catch (error) {
        setError('Failed to fetch new releases');
      }
    };
    fetchData();
  }, [])


  return (
    <div className='p-4'>
      <h2 className='text-5xl font-extrabold font-sans'>New Release Album</h2>

      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 overflow-y '>
        {releases.map((release)=>(
          <Link key={release.albums_id} to={`/album/${release.albums_id}`}>
            <AlbumCard 
              key={release.albums_id}
              img={release.images[0]?.url}
              albumName={release.albums_name}
              totalTracks={release.total_tracks}
              albumType={release.album_type}
              //Link to artist profile
              artist={release.artist.map((a)=> a.artist_name)}
            />
          </Link>
        ))}
      </div>

    </div>
  )
}

export default NewRelease
