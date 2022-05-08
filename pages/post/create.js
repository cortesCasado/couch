import axios from "axios";
import {
  FieldTextBox,
  FieldTextAreaBox,
  FieldSelectorBox,
} from "@/components/Forms";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

export default function CreatePost() {
  const { data: themesData, error: themesError } = useSWR("/api/theme");
  const [tematica, setTematica] = useState(getFirstTheme(themesData));

  const options = [];

  if (themesData !== undefined) {
    themesData.map((x) =>
      options.push({
        label: x.key,
        value: x.key,
      })
    );
  }

  // Evita too many re-renders error
  function getFirstTheme(themesData) {
    if (themesData !== undefined) {
      return themesData[0].key;
    }
  }

  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      publication_date: new Date().toISOString(),
      type: "post",
      theme: tematica,
      username: event.target.username.value,
      title: event.target.title.value,
      body: event.target.body.value,
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

    let message;

    await axios
      .put(endpoint, data)
      .then((res) => {
        message = res.data.message;
        alert(`${message}`);
        router.push("/");
      })
      .catch((err) => {
        message = err.response.data.message;
        alert(`${message}`);
      });
  };

  return (
    <div className="md:bg-gray-100 flex justify-center items-center">
      <main
        id="main"
        className="md:bg-white p-5 pl-10 pr-10 md:w-4/5 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-8 md:mb-8 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-500 text-center">
          Crea tu post!
        </h2>
        <form onSubmit={handleSubmit}>
          <FieldSelectorBox
            label="Temática"
            options={options}
            onChange={(e) => {
              setTematica(e.target.value);
            }}
            required={true}
          />

          <FieldTextBox
            label="Autor"
            id="username"
            name="username"
            required={true}
          />
          <FieldTextBox
            label="Título"
            id="title"
            name="title"
            required={true}
          />
          <FieldTextAreaBox
            label="Cuerpo"
            id="body"
            name="body"
            required={true}
          />
          <Button type="submit">Publicar</Button>
        </form>
        <hr className="my-4" />
      </main>
    </div>
  );
}
