import React from "react";
import Link from "next/link";

export default function Index({ title, numberPosts }) {
  return (
    <Link href={`/theme/${title}`}>
      <a>
        <div className="border-2 border-black">
          <p>
            {title}: {numberPosts} posts
          </p>
        </div>
      </a>
    </Link>
  );
}
