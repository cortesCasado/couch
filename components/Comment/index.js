import React from "react";

export default function Index({ username, comment, date }) {
  return (
    <div className="border-2 border-black">
      <div>
        {username} {new Date(date).toLocaleString("es-ES")}
      </div>
      <div>{comment}</div>
    </div>
  );
}
