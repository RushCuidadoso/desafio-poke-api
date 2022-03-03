import React from 'react'

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
      {gotoPrevPage && <button className='load-more' onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button className='load-more' onClick={gotoNextPage}>Next</button>}
    </div>
  )
}