import React, { useEffect, useState } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import MusicCard from '../components/MusicCard'
import { useParams } from 'react-router-dom'
import { getArtist, getArtistTopTracks, getArtistAlbum } from '../api/spotify.artist'
import { Link } from 'react-router-dom'

const Artist = () => {

    const {artist_id} = useParams();
    const [artist, setArtist] = useState();
    const [topTracks, setTopTracks] = useState();
    const [albums, setAlbums] = useState();

    const [visibleTracks, setVisibleTracks] = useState(5);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleShowMore = () =>{
        setVisibleTracks((prev) => prev + 5)
    }

    const handleShowLess = () =>{
        setVisibleTracks(5);
    }

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const data = await getArtist(artist_id);
                const tracks_data = await getArtistTopTracks(artist_id);
                const album_data = await getArtistAlbum(artist_id);
                setArtist(data);
                setTopTracks(tracks_data);
                setAlbums(album_data);
            } catch (error) {
                setError('Failed to fetch artist data'); 
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    },[artist_id]);

    if(loading){
        return <p>Loading artist data...</p>;
    }

    if(error){
        return <p>{error}</p>;
    }

  return (
    <div className='p-4'>
        <div className='w-full h-80 flex items-center'>
            <ProfileHeader
                type='artist'
                key={artist.artist_id}
                img={artist.images[0]?.url || 'default_image_url'}
                artist={artist.artist_name}
            />
        </div>
        <div>
            <h4 className='text-3xl font-black tracking-wide'>Top Tracks</h4>
            {topTracks.slice(0, visibleTracks).map((track, index)=>(
                <MusicCard 
                    type='artist'
                    key={track.track_id}
                    track_id={track.track_id}
                    number={index + 1}
                    img={track.images[0]?.url || 'default_images_url'}
                    track_name={track.track_name}
                    track_duration={track.duration}
                    artists={track.artist}
                />
            ))}
            {visibleTracks < topTracks.length &&(
                <button 
                onClick={handleShowMore}
                className=' py-2 hover:underline font-semibold cursor-pointer'
                >
                    Show more
                </button>
            )}
            {visibleTracks > 5 &&(
                <button
                onClick={handleShowLess}
                className=' py-2 hover:underline font-semibold cursor-pointer'
                >
                    Show less
                </button>
            )}
        </div>
        <div className="p-4 bg-white">
            <h4 className="text-4xl font-black uppercase tracking-wide border-b-2 border-black pb-2 mb-6">
                Explore Albums
            </h4>
    
            <div className="grid grid-cols-5 gap-6">
                {albums.map((album) => (
                    <Link key={album.album_id} to={`/album/${album.album_id}`}>
                        {/* Make it a component */}
                        <div key={album.album_name} className="relative group cursor-pointer">
                            <img
                                src={album.images[0]?.url}
                                alt={album.album_name}
                                className="w-full aspect-square object-cover border-4 border-black group-hover:opacity-80"
                            />
                            <p className="mt-3 text-lg font-bold text-black uppercase tracking-wide text-center">
                                {album.album_name}
                            </p>
                         </div>
                    </Link>

                ))}
            </div>
        </div>


    </div>
  )
}

export default Artist
