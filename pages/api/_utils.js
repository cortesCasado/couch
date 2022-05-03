// Función para obtener el UUID del objeto a insertar

export async function getUUID(count = 1) {
  return await fetch(`http://localhost:5984/_uuids?count=${count}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.ADMIN}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
  })
    .then((r) => r.json().then((data) => data.uuids))
    .catch((err) => console.log(err));
}
