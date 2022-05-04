
import { FieldTextBox, FieldTextAreaBox } from "@/components/Forms";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";

export default function CreatePost() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      publication_date: new Date().toISOString(),
      type: "post",
      theme: event.target.themeTitle.value,
      username: event.target.username.value,
      title: event.target.title.value,
      body: event.target.body.value,
      likes: 0,
      comments: [],
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/post/";

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    alert(`${result.message}`);
    // router.push("/");

  };

  return (
    <div className="md:bg-gray-100 flex justify-center items-center">
      <main id='main' className="md:bg-white p-5 pl-10 pr-10 md:w-4/5 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-8 md:mb-8 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">
        <h2 className="text-2xl font-bold text-gray-500 text-center">Crea tu post!</h2>
        <form onSubmit={handleSubmit}>
          <FieldTextBox label="Temática" id="themeTitle" name="themeTitle" />
          <FieldTextBox label="Autor" id="username" name="username" />
          <FieldTextBox label="Título" id="title" name="title" />
          <FieldTextAreaBox label="Cuerpo" id="body" name="body" />
          <Button type="submit">Publicar
          </Button>
        </form>
        <hr className="my-4" />
      </main >
    </div >
  );
}