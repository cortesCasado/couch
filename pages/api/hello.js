// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === "GET") {
    const dbs = await fetch(`http://localhost:5984/_all_dbs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`admin:password`).toString('base64')}`,
      },
    }).then(r => r.json());


    res.status(200).json(dbs)
  }
}
