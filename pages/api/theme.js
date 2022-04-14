// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
    
    // status: estado HTTP, message: mensaje a devolver en caso de éxito/fallo
    let uuid, status, message;
    const uuids = await axios.get(`http://localhost:5984/_uuids`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`admin:cbd2022`).toString('base64')}`,
      },
    }).then(r => { 
        uuid = r.data["uuids"][0];
    }).catch(err => {
        res.status(err.response.status).json(err.response.data["reason"])
    })

    const response = await axios.put(`http://localhost:5984/prueba/` + uuid, req.body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`admin:cbd2022`).toString('base64')}`,
      },
    }).then(r => {
        res.status(r.status).json("Tema creado con éxito.");
    }).catch(err => {
        res.status(err.response.status).json(err.response.data["reason"])
    });
 }
  