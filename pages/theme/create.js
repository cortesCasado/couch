import axios from "axios";
import React from "react";
import { useState } from "react";
import { FieldTextAreaBox, FieldTextBox } from "@/components/Forms";
import { Button } from "@/components/Button";

function CreateTheme() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
      type: "theme",
    };

    let message;

    await axios
      .put("/api/theme", data)
      .then((res) => {
        message = res.data;
      })
      .catch((err) => {
        message = err.response.data;
      });

    alert(`${message}`);
  }

  return (
    <div className="md:bg-gray-100 flex justify-center items-center">
      <main id='main' className="md:bg-white p-5 pl-10 pr-10 md:w-4/5 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-8 md:mb-8 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">
        <h2 className="text-2xl font-bold text-gray-500 text-center">Crea una temática</h2>
        <form onSubmit={handleSubmit}>
          <FieldTextBox label="Título" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <FieldTextAreaBox label="Descripción" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button type="submit">Crear</Button>
        </form>
        <hr className="my-4" />
      </main >
    </div >
  );
}

export default CreateTheme;
