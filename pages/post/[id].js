import React from "react";
import Post from "@/components/Post/index";
import Comment from "@/components/Comment/index";
import axios from "axios";
import { DialogText } from "@/components/DialogText";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Index({ id, post }) {
  // Modal para el formulario de enviar comentario
  const [showModal, setShowModal] = useState(false);

  // Campos del formulario
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

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
      .post(`/api/addComment/${id}`, data)
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
    <div>
      {post !== "no existe" ? (
        <>
          <Post post={post} />
          {post[5].map((comment) => (
            <Comment
              key={comment.username}
              username={comment.username}
              comment={comment.comment}
              date={comment.publication_date}
            />
          ))}
          <button onClick={() => setShowModal(true)}>Nuevo comentario</button>
          {showModal && (
            <DialogText
              title="Nuevo comentario"
              width="small"
              height="small"
              onClickClose={() => setShowModal(false)}
              visibleAcceptButton={false}
              visibleCancelButton={false}
            >
              <form onSubmit={handleSubmit} method="POST">
                <label htmlFor="username">Nombre de usuario:</label>
                <input
                  required
                  maxLength="40"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor="comment">Comentario:</label>
                <input
                  required
                  maxLength="1000"
                  id="comment"
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <br />
                <button type="submit" className="border">
                  Enviar
                </button>
              </form>
            </DialogText>
          )}
        </>
      ) : (
        <div>No existe el post</div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  let post;

  await axios
    .get(
      `http://localhost:5984/${process.env.DBNAME}/_design/post/_view/by_id?key=\"${id}\"`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.ADMIN}:${process.env.PASSWORD}`
          ).toString("base64")}`,
        },
      }
    )
    .then((res) => {
      post = res.data.rows[0].value;
    })
    .catch((err) => {
      post = "no existe";
    });

  return {
    props: {
      id: id,
      post: post,
    },
  };
}
