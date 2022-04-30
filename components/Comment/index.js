import React from "react";

export default function Index({ username, comment, date }) {
  return (
    <div className="p-4 space-y-2">
      <div className="font-body text-2xl">
        {username} <span className="inline float-right text-lg pl-8 pt-1">{new Date(date).toLocaleString()}</span>
      </div>
      <div className="font-body text-lg">{comment}</div>
    </div>
  );
}
