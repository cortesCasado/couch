import useSWR from "swr";
import ShortTheme from "@/components/MainPage/ShortTheme";

export default function List() {
  const { data, error } = useSWR(`/api/theme/`);

  if (error) return <div> failed to load </div>;
  if (!data) return <div> loading... </div>;

  console.log(data.rows);

  return (

    <div>
      <h1>Temas más populares</h1>
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
