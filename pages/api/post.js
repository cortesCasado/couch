import { getUUID } from "@/api/_utils";
import { getTheme } from "@/api/themes";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        // Obtener UID
        const uuids = await getUUID(2);

        // Crear post
        await fetch(`http://localhost:5984/${process.env.DBNAME}/${uuids[0]}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
            },
            body: JSON.stringify({
                _id: uuids[0],
                ...req.body,

            }),
        });

        res.status(201).json({
            message: "Post creado correctamente",
        });

        // Consultar si existe la tématica
        const theme = await getTheme(req.body.theme.toLowerCase());

        // Si no existe, crearla
        if (!theme.length) {
            await fetch(`http://localhost:5984/${process.env.DBNAME}/${uuids[1]}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
                },
                body: JSON.stringify({
                    _id: uuids[1],
                    type: "theme",
                    title: req.body.theme.toLowerCase(),
                    postsCount: 1
                })
            })
        } else {
            // Si existe, actualizar el número de posts del tema
            const themeId = theme[0]._id;

            await fetch(`http://localhost:5984/${process.env.DBNAME}/_design/theme/_update/updatePostCount/${themeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
                },
            });
        }
    }
}