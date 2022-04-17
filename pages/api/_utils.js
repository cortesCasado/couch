// Función para obtener el UUID del objeto a insertar

export async function getUUID() {
    return await fetch(`http://localhost:5984/_uuids`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
        },
    })
        .then(res => res.json().then(data => data.uuids[0]))
        .catch(err => console.log(err));


}