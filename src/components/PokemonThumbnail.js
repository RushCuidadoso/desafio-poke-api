import React, { useState } from 'react'
import Modal from '../Modal'

const PokemonThumbnail = ({ id, name, image, type }) => {
  const [isOpen, setIsOpen] = useState(false)
  const style = `thumb-container ${type}`
  return (
    <>
    <div className={style}>

        <div className='number'>
          <small>#0{id}</small>
        </div>

      <img src={image} alt={name}></img>
      <div className='detail-wrapper'>
        <h3>{name}</h3>
        <small>Type: {type}</small>
        <div>
          <button onClick={() => setIsOpen(true)}>More</button>
        </div>
      </div>
    </div>

    <Modal open ={isOpen} onClose={() => setIsOpen(false)} info={id}/>
    </>
  )
}

export default PokemonThumbnail