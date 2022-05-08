import React from "react";

export default function Post({ post }) {
  return (
    <>
      <div className="p-4 space-y-2">
        <div className="font-title text-4xl">{post.title}</div>
        <div className="font-body text-2xl">Usuario: {post.username}</div>
        <div className="font-body text-2xl">
          Fecha de publicación:{" "}
          {new Date(post.publication_date).toLocaleString("es-ES", {
            timeZone: "UTC",
          })} UTC±00:00
        </div>
      </div>
      <div className="font-body text-lg p-4">{post.body}</div>
    </>
  );
}
