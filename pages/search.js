import ShortPost from "@/components/MainPage/ShortPost";

export default function Search({ posts, q }) {

    return (
        <div >
            {posts.total_rows ? (
                <div className="bg-white md:rounded-xl p-4 divide-y-2">
                    <h1 className="font-title text-4xl pb-4">Resultados de la búsqueda {`"${q}"`}</h1>
                    {posts.rows.map((post) => (
                        <ShortPost
                            key={post.id}
                            id={post.id}
                            title={post.fields.title}
                            username={post.fields.username}
                            date={post.fields.publication_date}
                        />
                    ))}
                </div>
            ) : (
                <div className="ml-4">
                    <h1 className="font-title text-4xl pb-4">No se han encontrado posts para la consulta {`"${q}"`}</h1>
                    <p className="font-body">
                        Para más información sobre como realizar búsquedas avanzadas, ver el <a className="text-blue-400 underline" href="
                    https://lucene.apache.org/core/2_9_4/queryparsersyntax.html" target="_blank"> manual de Lucene</a>.
                    </p>
                    La lista de atributos disponible es:
                    <ul className="list-disc ml-10">
                        <li>title: string</li>
                        <li>body: string</li>
                        <li>username: string</li>
                        <li>publication_date: datetime (UTC Format)</li>
                    </ul>


                </div>
            )}
        </div>
    )
}




export async function getServerSideProps(context) {
    const { q } = context.query;

    // Get posts matching the query
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
                `${process.env.ADMIN}:${process.env.PASSWORD}`
            ).toString("base64")}`
        },
        body: JSON.stringify({
            q: q,
            limit: 10
        })
    };

    const endpoint = `${process.env.NGINX_URL || 'http://localhost:5984'}/${process.env.DBNAME}/_design/search/_search/post`;

    const response = await fetch(endpoint, options);

    const result = await response.json();

    // Display result page
    return {
        props: {
            posts: result,
            q: q
        }
    }

}