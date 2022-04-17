import { getUUID } from "@/api/_utils";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        // Obtener UID
        const uuid = await getUUID();

        if (uuid) {
            await fetch(`http://localhost:5984/${process.env.DBNAME}/${uuid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
                },
                body: JSON.stringify({
                    _id: uuid,
                    ...req.body,

                }),
            })
                .catch(err => {
                    res.status(err.response.status).json(err.response.data["reason"])
                }
                );

            res.status(201).json({
                message: "Post creado correctamente",
            });

        } else {
            res.status(500).json({
                message: "Error al obtener UID"
            });
        }
    }
};