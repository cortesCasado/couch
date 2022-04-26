import React from "react";

function index({ title, numberPosts }) {
  return (
    <div className="border-2 border-black">
      <p>
        {title}: {numberPosts} posts
      </p>
    </div>
  );
}

export default index;
