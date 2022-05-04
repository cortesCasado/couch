import ShortPost from "@/components/MainPage/ShortPost";

export default function Theme({ theme, posts }) {

    return (
        <div className="bg-white md:rounded-xl p-4 divide-y-2">
            <h1 className="font-title text-4xl pb-4">{theme}</h1>

            {posts.map((post) => (
                <ShortPost
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    username={post.username}
                    date={post.publication_date}
                />
            ))}
        </div>
    );
};

export async function getServerSideProps(context) {
    const { title } = context.query;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
                `${process.env.ADMIN}:${process.env.PASSWORD}`
            ).toString("base64")}`,
        },
    };

    const res = await fetch(`http://localhost:5984/${process.env.DBNAME}/_design/post/_view/by_theme?group=true&key="${title}"`, options);
    const data = await res.json();

    console.log(data);

    return {
        props: {
            theme: data.rows[0].key,
            posts: data.rows[0].value,
        },
    };
}