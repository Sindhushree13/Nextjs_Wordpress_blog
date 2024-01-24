'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {getSinglePage} from "../lib/pages"
import "../../styles/main.css"

export async function getStaticProps({params}:any) {
    const pageData = await getSinglePage(params.pageSlug);

    return {
        props: {
            pageData,
        }
    }

}
export default function SiteHeader({ className, pageData}: any) {
    // const [posts, setPosts] = useState(pageData);
    return (
        <header className={`${className} container mx-auto lg:max-w-4xl flex items-center justify-between`}>
            <div className="logo-area">
                <Link href="/" className="flex justify-center">
                    <Image src="/logo1.jpg" alt="logo" width="90" height="20" />
                </Link>
            </div>
            <nav className="text-slate-100">
                <ul className="flex justify-center [&>li>a]:px-3 [&>li>a]:py-2 [&>li>a:hover]:text-yellow-400 [&>li>a]:transition text-xl">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/blog">Blog</Link>
                    </li>
                    {/* {pageData.map((post)( */}
                    <li>                    
                        {/* <Link href={`/about/${post?.slug}`}>About</Link> */}
                        <Link href="/about/about-page">About</Link>
                    </li>
                      {/* ))}  */}
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}