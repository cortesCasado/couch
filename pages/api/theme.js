import { getUUID } from "@/api/_utils";

// Endpoint for theme API:  /api/theme
export default async function handler(req, res) {
  if (req.method === "GET") {
    if (!req.query.id) {
      const themes = await getThemes();

      if (themes.error) {
        res.status(500).json(themes);
      } else {
        res.status(200).json(themes);
      }
    } else {
      const theme = await getThemeById(req.query.id);

      if (theme.error) {
        res.status(500).json(theme.reason);
      } else {
        res.status(200).json(theme);
      }
    }

  } else if (req.method === "PUT") {

    const dbResponse = await putTheme(req.body);

    if (dbResponse.error) {
      res.status(500).json(dbResponse);
    } else {
      res.status(200).json("Tema creado con éxito.");
    }


  }
}


// Create

// Insert a new theme document
export async function putTheme(body) {

  // Get a new UUID
  const uuids = await getUUID(1);

  const JSONdata = JSON.stringify({
    _id: uuids[1],
    type: "theme",
    postsCount: 1,
    ...body
  });

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
    },
    body: JSONdata
  };

  return await fetch(`http://localhost:5984/${process.env.DBNAME}/${uuids[0]}`, options)
    .then(() => "Tema creado con éxito.")
    .catch((err) => { err.response.data["reason"] });
}


// Read

// Get all themes
export async function getThemes() {

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
    },
  };

  return await fetch(`http://localhost:5984/${process.env.DBNAME}/_design/theme/_view/themes`, options)
    .then(r => r.json())
    .catch(err => err);
};

export async function getMostPopularThemes() {

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
    },
  };

  return await fetch(`http://localhost:5984/${process.env.DBNAME}/_design/theme/_view/by_popularity?group=true&limit=10`, options)
    .then(r => r.json())
    .catch(err => err);
};

// Get theme by id
export async function getThemeById(id) {
}

// Get theme by title
export async function getThemeByTitle(title) {

  const JSONdata = JSON.stringify({
    "selector": {
      "type": {
        "$eq": "theme"
      },
      "title": {
        "$eq": title
      }
    }
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
    },
    body: JSONdata
  };


  return await fetch(`http://localhost:5984/${process.env.DBNAME}/_find`, options)
    .then(r => r.json().then(data => data.docs))
    .catch(err => err);
};



// Update

// Update theme postCount
export async function updateThemePostCount(theme) {

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
    },
  };

  await fetch(`http://localhost:5984/${process.env.DBNAME}/_design/theme/_update/updatePostCount/${theme._id}`, options);
}



// Delete
