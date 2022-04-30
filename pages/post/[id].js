import React from "react";
import Post from "@/components/Post/index";
import Comment from "@/components/Comment/index";
import axios from "axios";
import { DialogText } from "@/components/DialogText";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/Button";
import Image from "next/image";

export default function PostDetails({ id, post, page }) {

  // Modal para el formulario de enviar comentario
  const [showModal, setShowModal] = useState(false);

  // Campos del formulario
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  // Número de comentarios por página
  const [elementsPerPage, setElementsPerPage] = useState(5);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    let date = new Date().toISOString();

    const data = {
      username: username,
      comment: comment,
      publication_date: date,
    };

    let message;
    await axios
      .put(`/api/addComment/${id}`, data)
      .then((res) => {
        message = res.data;
        alert(`${message}`);
        router.reload(window.location.pathname);
      })
      .catch((err) => {
        message = err.response.data;
        console.log(message);
      });
  }

  return (
    <div className="grid bg-gray-200 place-items-center md:py-4 h-full ">
      {post.error !== 'not_found' ? (
        <div className='bg-white text-webcolor-50 p-6 md:rounded-xl w-full md:w-[750px] space-y-2 divide-y-2'>
          <Post post={post} />

          <div className="font-title p-2 text-4xl">Comentarios</div>

          <div className="divide-y-2">
          {post.comments.slice((elementsPerPage*(page-1)), (elementsPerPage*(page-1)) + elementsPerPage).map((comment) => (
            <Comment
              key={comment.username}
              username={comment.username}
              comment={comment.comment}
              date={comment.publication_date}
            />
          ))}
          </div>

          <Button 
            onClick={() => router.push(`${id}?page=${page - 1}`)} disabled={page <= 1}>
            Página Anterior
          </Button>
          <Button onClick={() => router.push(`${id}?page=${+page + 1}`)} disabled={page >= Math.ceil(post.comments.length/elementsPerPage)}>
            Página Siguiente
          </Button>
          <br/>

          <Button onClick={() => setShowModal(true)}>Nuevo comentario</Button>
          {showModal && (
            <DialogText
              title="Nuevo comentario"
              width="small"
              height="small"
              onClickClose={() => setShowModal(false)}
              visibleAcceptButton={false}
              visibleCancelButton={false}
            >
              <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                <label htmlFor="username" className="px-2">Nombre de usuario:</label>
                <input
                  required
                  maxLength="40"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='border-2 border-black'
                />
                <br />
                <label htmlFor="comment" className="px-2">Comentario:</label>
                <input
                  required
                  maxLength="1000"
                  id="comment"
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className='border-2 border-black'
                />
                <br />
                <Button type="submit">
                  Enviar
                </Button>
              </form>
            </DialogText>
          )}
        </div>
      ) : (
        <div>No existe el post</div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  let { id, page } = context.query;
  
  if (page === undefined || page <= 0) {
    page = 1;
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.ADMIN}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
  };

  let post;

  post = await fetch(
    `http://localhost:5984/${process.env.DBNAME}/${id}`,
    options
  )
    .then((res) => res.json())
    .catch((err) => {
      err.response.data["reason"];
    });

  return {
    props: {
      id: id,
      post: post,
      page: page
    },
  };
}
