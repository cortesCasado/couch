import React from 'react'
import Link from 'next/link'

function index({id, title, username, date}) {
  return (
    <Link href={`/post/${id}`}>
      <div className='border-2 border-black cursor-pointer'>
        <p>{title} ({new Date(date).toLocaleString()})</p>
        <p>Autor: {username}</p>
      </div>
    </Link>
  )
}

export default index
