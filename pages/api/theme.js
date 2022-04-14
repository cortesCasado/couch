// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
    
    // Obtiene un id nuevo automático de la DB
    let uuid;
    const uuids = await axios.get(`http://localhost:5984/_uuids`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
      },
    }).then(r => { 
        uuid = r.data["uuids"][0];
    }).catch(err => {
        res.status(err.response.status).json(err.response.data["reason"])
    })

    // Crea el nuevo tema
    const response = await axios.put(`http://localhost:5984/${process.env.DBNAME}/${uuid}`, req.body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
      },
    }).then(r => {
        res.status(r.status).json("Tema creado con éxito.");
    }).catch(err => {
        res.status(err.response.status).json(err.response.data["reason"])
    });
 }
  