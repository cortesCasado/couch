export default async function handler(req, res) {
    if (req.method === "GET") {
        const themes = await fetch(`http://localhost:5984/${process.env.DBNAME}/_design/theme/_view/themes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
            },
        })
            .then(r => r.json())
            .catch(err => err);

        if (themes.error) {
            res.status(500).json(themes.reason);
        } else {
            res.status(200).json(themes);
        }

    }
}


export async function getTheme(title) {
    return await fetch(`http://localhost:5984/${process.env.DBNAME}/_find`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${Buffer.from(`${process.env.ADMIN}:${process.env.PASSWORD}`).toString('base64')}`,
        },
        body: JSON.stringify({
            "selector": {
                "type": {
                    "$eq": "theme"
                },
                "title": {
                    "$eq": title
                }
            }
        })
    })
        .then(r => r.json().then(data => data.docs))
        .catch(err => err);
};