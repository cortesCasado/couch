import React from 'react'

function index({username, comment, date}) {
  return (
    <div className='border-2 border-black'>
      <div>{username} {new Date(date).toLocaleString()}</div>
      <div>{comment}</div>
    </div>
  )
}

export default index
