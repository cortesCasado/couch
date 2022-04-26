import { getUUID } from "@/api/_utils";
import { getThemeByTitle, updatePostCount, putTheme } from "@/api/theme";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    // Crear post
    const dbResponse = await putPost(req.body);

    if (dbResponse.status === 200) {
      res.status(200).json(dbResponse.data);
    } else {
      res.status(dbResponse.status).json(dbResponse.data);
    }
    res.status(201).json({
      message: "Post creado correctamente",
    });

    // Consultar si existe la tématica
    const theme = await getThemeByTitle(req.body.themeTitle.toLowerCase());

    // Si no existe, crearla
    if (!theme.length) {
      await putTheme(req.body);
    } else {
      // Si existe, actualizar el número de posts del tema
      await updatePostCount(theme[0]);
    }
  } else if (req.method === "GET") {
    if (req.query.id) {
      // Consultar post por ID
      // const dbResponse = await getPostById(req.query.id);
      // if (dbResponse.status === 200) {
      //     res.status(200).json(dbResponse.data);
      // } else {
      //     res.status(dbResponse.status).json(dbResponse.data);
      // }
    } else {
      // Consultar últimos posts
      const dbResponse = await getLastPosts();

      if (!dbResponse.error) {
        res.status(200).json(dbResponse);
      } else {
        res.status(dbResponse.status).json(dbResponse.data);
      }
    }
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
    `http://localhost:5984/${process.env.DBNAME}/${uuids[0]}`,
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
    `http://localhost:5984/${process.env.DBNAME}/_design/post/_view/by_date?descending=true&limit=10`,
    options
  )
    .then((res) => res.json())
    .catch((e) => e);
}
