import React from 'react'
import Link from "next/link";
import Image from 'next/image';


function index() {
  return (
    <>
      <nav className='flex items-center flex-wrap bg-black py-3 px-10 '>
        <Link href='/'>
            <Image className="cursor-pointer" src="/couch.svg" width="100" height="100" alt='Couch Forum' />
        </Link>

        <Link href='/'>
            <div className='cursor-pointer font-title text-6xl text-amber-50 px-10'>Couch Forum</div>
        </Link>
      </nav>
    </>
  )
}

export default index