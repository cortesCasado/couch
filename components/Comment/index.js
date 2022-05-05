import React from "react";

export default function Index({ username, comment, date }) {
  return (
    <div className="p-4 space-y-2">
      <div className="font-body text-2xl">
        {username} {new Date(date).toLocaleString("es-ES", { timeZone: 'UTC' })}

      </div>
      <div className="font-body text-lg">{comment}</div>
    </div>
  );
}
