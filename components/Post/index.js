import React from 'react'
import { useState, useEffect } from 'react'

function index({post}) {

  return (
    <div className='border-2 border-black'>
      <div>Título: {post[0]}</div>
      <div>Usuario: {post[1]}</div>
      <div>Fecha de publicación: {new Date(post[2]).toLocaleString()}</div>
      <br/>
      <div>{post[3]}</div>
      <br/>
      <div>
        Likes: {post[4]}
        <br/>
        <button>Me gusta</button>
        <button>No me gusta</button>
      </div>
    </div>
  )
}

export default index
