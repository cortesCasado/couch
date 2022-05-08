import ShortPost from "@/components/MainPage/ShortPost";
import ShortTheme from "@/components/MainPage/ShortTheme";
import SearchForm from "@/components/Forms/SearchForm";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/Button";
import Head from "next/head";

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

  // If there is data, show it
  return (
    <div>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10 px-4 h-full bg-gray-200">
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
            <div className="py-4">
              <Link href="post/create">
                <a>
                  <Button>Crear post</Button>
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div>Todavía no se ha creado ningún post.</div>
        )}

        {/* Temas más populares */}
        {themesData.length !== 0 ? (
          <div className="bg-white md:rounded-xl divide-y-2 p-4">
            <h1 className="font-title text-4xl pb-4">Temas más populares</h1>
            {themesData.map((theme) => (
              <ShortTheme
                key={theme.key}
                title={theme.key}
                numberPosts={theme.value}
              />
            ))}
            <div className="py-4 flex justify-center">
              <Link href="/theme/list">
                <a>
                  <Button>Ver todos los temas</Button>
                </a>
              </Link>
              <Link href="/theme/create">
                <a>
                  <Button>Crear temática</Button>
                </a>
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
