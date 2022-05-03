import React from "react";

export default function Post({ post }) {
  return (
    <div className="border-2 border-black">
      <div>Título: {post.title}</div>
      <div>Usuario: {post.username}</div>
      <div>Fecha de publicación: {new Date(post.publication_date).toLocaleString("es-ES")}</div>
      <br />
      <div>{post.body}</div>
      <br />
      <div>
        Likes: {post.likes}
        <br />
        <button>Me gusta</button>
        <button>No me gusta</button>
      </div>
    </div>
  );
};
