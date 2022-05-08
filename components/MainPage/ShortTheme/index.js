import React from "react";
import Link from "next/link";

export default function Index({ title, numberPosts }) {
  return (
    <div className="py-4">
      <Link href={`/theme/${title}`}>
        <a>
          <div className="cursor-pointer font-body text-lg">
            <p>
              {title}: {numberPosts} posts
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
}
