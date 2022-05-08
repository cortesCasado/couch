import ShortPost from "@/components/MainPage/ShortPost";

export default function Theme({ theme, posts }) {
  return (
    <div className="bg-white md:rounded-xl p-4">
      <h1 className="font-title text-4xl mb-4">{theme.title}</h1>
      <h6 className="font-body text-md ">{theme.description}</h6>
      <hr className="my-2" />

      <div className="divide-y-2">
        {posts !== "no hay" ? (
          posts.map((post) => (
            <ShortPost
              key={post._id}
              id={post._id}
              title={post.title}
              username={post.username}
              date={post.publication_date}
            />
          ))
        ) : (
          <div className="font-body text-lg py-4">
            Aún no hay posts de este tema. ¡Anímate a ser el primero y crear
            uno!
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { title } = context.query;

  const JSONdata = JSON.stringify({
    selector: {
      type: {
        $eq: "theme",
      },
      title: {
        $regex: `(?i)^${title}$`,
      },
    },
  });

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.ADMIN}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
    body: JSONdata,
  };

  const theme = await fetch(
    `${process.env.NGINX_URL || "http://localhost:5984"}/${
      process.env.DBNAME
    }/_find`,
    options
  )
    .then((r) => r.json().then((data) => data.docs))
    .catch((err) => err);

  if (theme.length === 0) {
    return {
      props: {
        theme: "no hay",
        posts: "no hay",
      },
    };
  }

  options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.ADMIN}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
  };

  const res = await fetch(
    `${process.env.NGINX_URL || "http://localhost:5984"}/${
      process.env.DBNAME
    }/_design/post/_view/by_theme?group=true&key="${theme[0].title}"`,
    options
  );
  const data = await res.json();

  console.log(data);

  let posts;
  if (data.rows.length === 0) {
    posts = "no hay";
  } else {
    posts = data.rows[0].value;
  }

  return {
    props: {
      theme: theme[0],
      posts: posts,
    },
  };
}
