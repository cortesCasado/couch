// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.ADMIN}:${process.env.PASSWORD}`
        ).toString("base64")}`,
      },
    };

    const response = await axios
      .put(
        `${process.env.NGINX_URL || "http://localhost:5984"}/${
          process.env.DBNAME
        }/_design/post/_update/updateComments/${id}`,
        req.body,
        options
      )
      .then((r) => {
        res.status(r.status).json("Comentario creado con éxito.");
      })
      .catch((err) => {
        res.status(err.response.status).json(err.response.data["reason"]);
      });
  }
}
