import React, { useState } from 'react'
import Modal from '../Modal'

var data

const PokemonThumbnail = ({ id, name, image, type }) => {
  const [isOpen, setIsOpen] = useState(false)
  const style = `thumb-container ${type}`

  const getData = async function(){
      data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(response => {
        return (response)
      })
      console.log(data)
      setIsOpen(true)
  }

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
          <button onClick={() => {getData()}}>More</button>
        </div>
      </div>
    </div>

    <Modal open = {isOpen} onClose={() => setIsOpen(false)} info={data}/>
    </>
  )
}

export default PokemonThumbnail