import React from 'react'

const RowDisplay = ({ img, name, id, type, albumType }) => {
  return (
    <div className=''>
        <img src={img} alt={name} className={`${type === 'artist' ? 'rounded-full' : 'rounded-2xl'} block m-auto w-54 h-54 aspect-square object-cover`}/>
        <h4 className='text-center font-semibold'>{name}</h4>
        <h5 className='text-center font-extralight'>{albumType}</h5>
    </div>
  )
}

export default RowDisplay
