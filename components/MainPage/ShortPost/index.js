import React from "react";
import Link from "next/link";

function index({ id, title, username, date }) {
  return (
    <div className="py-4">
      <Link href={`/post/${id}`}>
        <a>
          <div className="cursor-pointer font-body text-lg">
            <p>
              {title} (
              {new Date(date).toLocaleString("es-ES", { timeZone: "UTC" })})
            </p>
            <p>Autor: {username}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default index;
