import axios from 'axios';
import React from 'react'
import { useState } from 'react'

function add() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');  

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      "title": title,
      "description": description,
      "type": "theme"
    }

    let message;
    const response = await axios.post('/api/theme', data)
    .then(res => {
        message=res.data;
    }).catch(err => {
      message=err.response.data;
    })

    alert(`${message}`);
  }


  return (
    <>
    <h1>Crear un tema nuevo</h1>
    <form onSubmit={handleSubmit} method='POST'>
      <label htmlFor='title'>Título:</label>
      <input required maxLength="40" id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
      <br/>
      <label htmlFor='description'>Descripción:</label>
      <input required maxLength="150" id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
      <br/>
      <button type='submit' className='border'>Enviar</button>
    </form>
    </>
  )
}

export default add
