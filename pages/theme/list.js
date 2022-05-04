import useSWR from "swr";
import ShortTheme from "@/components/MainPage/ShortTheme";

export default function List() {
  const { data, error } = useSWR(`/api/theme/`);

  if (error) return <div> failed to load </div>;
  if (!data) return <div> loading... </div>;

  return (

    <div className="bg-white md:rounded-xl p-4 divide-y-2">
      <h1 className="font-title text-4xl pb-4">Temas más populares</h1>
      {data.rows.map((theme) => (
        <ShortTheme
          key={theme.key}
          title={theme.key}
          numberPosts={theme.value}
        />
      ))}
    </div>

  );
}
