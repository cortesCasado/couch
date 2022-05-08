import { getUUID } from "@/api/_utils";
import { getThemeByTitle } from "@/api/theme";

export default async function handler(req, res) {
  let dbResponse;
  switch (req.method) {
    case "GET":
      // Consultar últimos posts
      dbResponse = await getLastPosts();

      if (!dbResponse.error) {
        res.status(200).json(dbResponse);
      } else {
        res.status(dbResponse.status).json(dbResponse.data);
      }

      break;

    case "PUT":
      // Consultar si existe la tématica
      const theme = await getThemeByTitle(req.body.theme);

      // Si existe el tema, crear el post
      if (theme.length) {
        req.body.theme = theme[0].title;
        // Crear post
        dbResponse = await putPost(req.body);

        if (dbResponse === 201) {
          res.status(201).json({
            message: "Post creado correctamente.",
          });
        } else {
          res.status(dbResponse.status);
        }
      } else {
        // Alertar que la temática no existe
        res.status(400).json({
          message: "La temática no existe.",
        });
      }

      break;
  }
}

// Create

export async function putPost(body) {
  // Obtener UID
  const uuids = await getUUID(1);

  const JSONdata = JSON.stringify({
    _id: uuids[0],
    ...body,
  });

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.ADMIN}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
    body: JSONdata,
  };

  return await fetch(
    `${process.env.NGINX_URL || "http://localhost:5984"}/${
      process.env.DBNAME
    }/${uuids[0]}`,
    options
  )
    .then((r) => r.status)
    .catch((e) => e.status);
}

// Read

// Get 10 last posts
export async function getLastPosts() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.ADMIN}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
  };

  return await fetch(
    `${process.env.NGINX_URL || "http://localhost:5984"}/${
      process.env.DBNAME
    }/_design/post/_view/by_date?descending=true&limit=10`,
    options
  )
    .then((res) => res.json())
    .catch((e) => e);
}
