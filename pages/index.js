import ShortPost from "@/components/MainPage/ShortPost";
import ShortTheme from "@/components/MainPage/ShortTheme";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function Home() {
  // Get the last posts and themes
  const { data: postsData, error: postsError } = useSWR("/api/post");
  const { data: themesData, error: themesError } = useSWR("/api/theme");

  // If there is an error, show it
  if (postsError || themesError) {
    return <div>failed to load</div>;
  }

  // If there is no data, show a loading message
  if (!postsData || !themesData) {
    return <div>loading...</div>;
  }

  console.log(postsData);
  console.log(themesData);

  // If there is data, show it
  return (
    <div>
      
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10 px-4 h-full bg-gray-200" >
        {/* Noticias más recientes */}
        {postsData.rows.length !== 0 ? (
          <div className="bg-white md:rounded-xl p-4 divide-y-2">
            <h1 className="font-title text-4xl pb-4">Posts más recientes</h1>
            {postsData.rows.map((post) => (
              <ShortPost
                key={post.id}
                id={post.id}
                title={post.value.title}
                username={post.value.username}
                date={post.key}
              />
            ))}
          </div>
        ) : (
          <div>Todavía no se ha creado ningún post.</div>
        )}

        {/* Temas más populares */}
        {themesData.rows.length !== 0 ? (
          <div className="bg-white md:rounded-xl divide-y-2 p-4">
            <h1 className="font-title text-4xl pb-4">Temas más populares</h1>
            {themesData.rows.map((theme) => (
              <ShortTheme
                key={theme.key}
                title={theme.key}
                numberPosts={theme.value}
              />
            ))}
            <div className="py-4">
              <Link href="/theme/list">
                <Button>Ver todos los temas</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>Todavía no se ha creado ningún tema.</div>
        )}

     
      </main>
    </div>
  );
}
