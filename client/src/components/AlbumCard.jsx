import React from 'react';

const AlbumCard = ({ img, albumName, albumType, totalTracks, artist }) => {
    return (
        <div className="relative flex flex-row items-center gap-4 border-4 border-black p-4 group cursor-pointer transition-transform hover:scale-105">

            <img
                src={img}
                alt={albumName}
                className="w-40 h-40 object-cover border-4 border-black"
            />


            <div className="flex flex-col">
                <h3 className="text-2xl font-extrabold uppercase tracking-wide">{albumName}</h3>
                <h4 className="text-md font-medium">{albumType}</h4>
                <h4 className="text-md">{totalTracks} Tracks</h4>
                <h4 className="text-md font-semibold">{artist.join(', ')}</h4>
            </div>
        </div>
    );
};

export default AlbumCard;
