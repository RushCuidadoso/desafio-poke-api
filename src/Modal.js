
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
  }
  
  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
  }

export default function Modal({ open, onClose, info }) {

    const [data, setData] = useState()

    const getData = async function(){
        await fetch(`https://pokeapi.co/api/v2/pokemon/${info}`)
        .then(response => response.json())
        .then(response => setData(response))
        console.log(data)
    }

    useEffect(() => {
        getData();
      }, [open]);

    if (!open) return null;

    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
            <div className='container'>
                </div>

          <button onClick={onClose}>Close Modal</button>
        </div>
      </>,
      document.getElementById('portal')
    )
  }