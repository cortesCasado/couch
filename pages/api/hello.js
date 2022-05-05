// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const dbs = await fetch(`${process.env.NGINX_URL || 'http://localhost:5984'}/_all_dbs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.ADMIN}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
  }).then((r) => r.json());

  res.status(200).json(dbs);
}
