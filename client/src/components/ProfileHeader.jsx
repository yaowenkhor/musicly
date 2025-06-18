import React from 'react'
import { Link } from 'react-router-dom'

const ProfileHeader = ({ img, albumName, totalTracks, artist, artistId, releaseDate, type }) => {
  return (
    <div className='flex gap-10 '>
      <img src={img} alt="" className={`w-64 h-64 ml-11 ${type === 'artist' ? "rounded-full" : "rounded-lg"} object-cover`}/>
      <div className={`flex flex-col ${type === 'artist' ? "justify-center" : "justify-end"} `}>

        {type === 'album' && (
            <>
             <h2 className='text-6xl'>{albumName}</h2>
             <h4>{totalTracks} Song</h4>
             <h4>{releaseDate}</h4>
             <Link to={`/artist/${artistId}`}>
                 <h4 className='font-semibold hover:underline'>{artist}</h4>
             </Link>
            </>
        )}

        {type === 'artist' && (
            <>
             <h2 className='text-6xl font-extrabold'>{artist}</h2>
            </>
        )}


      </div>
    </div>
  )
}

export default ProfileHeader
