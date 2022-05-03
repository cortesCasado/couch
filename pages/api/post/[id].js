export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
        case "GET":
            const post = await getPostById(id);

            if (post.error) {
                res.status(500).json(theme);
            } else {
                res.status(200).json(theme);
            }

            break;
    }
}

// Get post by id
export async function getPostById(id) {
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
        `http://localhost:5984/${process.env.DBNAME}/${id}`,
        options
    )
        .then((res) => res.json())
        .catch((err) => {
            err.response.data["reason"];
        });
}