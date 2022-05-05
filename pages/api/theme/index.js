import { getUUID } from "@/api/_utils";
import { data } from "autoprefixer";

// Endpoint for theme API:  /api/theme
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":

      const themes = await getThemes();

      if (themes.error) {
        res.status(500).json(themes);
      } else {
        res.status(200).json(themes);
      }

      break;
    case "PUT":
      const dbResponse = await putTheme(req.body);

      if (dbResponse.error) {
        res.status(500).json(dbResponse);
      } else {
        res.status(200).json("Tema creado con éxito.");
      }

      break;
  }
}

// Create

// Insert a new theme document
export async function putTheme(body) {
  // Get a new UUID
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
    `${process.env.NGINX_URL || 'http://localhost:5984'}/${process.env.DBNAME}/${uuids[0]}`,
    options
  )
    .then(() => "Tema creado con éxito.")
    .catch((err) => {
      err.response.data["reason"];
    });
}

// Read

// Get all themes
export async function getThemes() {
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
    `${process.env.NGINX_URL || 'http://localhost:5984'}/${process.env.DBNAME}/_design/theme/_view/themes?group_level=1&descending=true&limit=10`,
    options
  )
    .then((r) => r.json().then((data) => data.rows.sort((a, b) => b.value - a.value)))
    .catch((err) => err);
}

// Get most popular themes
// export async function getMostPopularThemes() {
//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Basic ${Buffer.from(
//         `${process.env.ADMIN}:${process.env.PASSWORD}`
//       ).toString("base64")}`,
//     },
//   };

//   return await fetch(
//     `${process.env.NGINX_URL || 'http://localhost:5984'}/${process.env.DBNAME}/_design/theme/_view/by_popularity?group=true&limit=10`,
//     options
//   )
//     .then((r) => r.json())
//     .catch((err) => err);
// }

// Get theme by title
export async function getThemeByTitle(title) {
  const JSONdata = JSON.stringify({
    selector: {
      type: {
        $eq: "theme",
      },
      title: {
        $regex: `(?i)^${title}$`,
      },
    },
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.ADMIN}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
    body: JSONdata,
  };

  return await fetch(
    `${process.env.NGINX_URL || 'http://localhost:5984'}/${process.env.DBNAME}/_find`,
    options
  )
    .then((r) => r.json().then((data) => data.docs))
    .catch((err) => err);
}



// Delete
