import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "@/components/Forms/SearchForm";

function index() {
  return (
    <>
      <nav className="flex items-center flex-wrap bg-black py-3 px-10 ">
        <Link href="/">
          <a>
            <Image
              className="cursor-pointer"
              src="/couch.svg"
              width="100"
              height="100"
              alt="Couch Forum"
            />
          </a>
        </Link>

        <Link href="/">
          <a>
            <div className="cursor-pointer font-title text-6xl text-amber-50 px-10">
              Couch Forum
            </div>
          </a>
        </Link>

        <div className="flex-1">
          <SearchForm />
        </div>
      </nav>
    </>
  );
}

export default index;
