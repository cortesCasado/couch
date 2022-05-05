export default async function handler(req, res) {
    const { title } = req.query;

    switch (req.method) {
        case "GET":
            const theme = await getThemePosts(title);

            if (theme.error) {
                res.status(500).json(theme);
            } else {
                res.status(200).json(theme);
            }

            break;
    }
}

// Get theme by id
export async function getThemePosts(title) {
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
        `${process.env.NGINX_URL || 'http://localhost:5984'}/${process.env.DBNAME}/_design/post/_view/by_theme?group=true&key="${title}"`,
        options
    )
        .then((res) => res.json().then(data => data.rows[0]))
        .catch((err) => {
            err.response.data["reason"];
        });
}