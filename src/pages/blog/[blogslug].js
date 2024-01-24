import Head from "next/head";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import CommentForm from "../../components/CommentForm";
import { getPostSlugs, getSinglePost } from "../../../lib/posts";
import { getComments } from "../../../lib/comments";
import { Rubik, Roboto_Slab } from "next/font/google";
import Image from "next/image";
import "../../../styles/main.css";

const rubik = Rubik({ subsets: ["latin"], display: "swap" });
const roboto_slab = Roboto_Slab({ subsets: ["latin"], display: "swap" });

export async function getStaticProps({ params }) {
  const postData = await getSinglePost(params.blogslug);
  const { comments, commentCount } = await getComments(params.blogslug);

  return {
    props: {
      postData,
      comments,
      commentCount,
    },
    notFound: false,
  };
}

export async function getStaticPaths() {
  const postSlugs = await getPostSlugs();

  return {
    paths: postSlugs.map((s) => ({
      params: {
        blogslug: s.slug,
      },
    })),
    fallback: true,
  };
}

export default function BlogDetailsPage({ postData, comments, commentCount }) {
  return (
    <>
      <section className="bg-pink-900 bg-opacity-70 absolute w-full z-20 ">
        <SiteHeader className="header-single-post z-10 relative" />
      </section>
      <article className={`${rubik.className} font-light`}>
        <section className="hero-area h-auto py-10 min-h-[30rem] bg-no-repeat bg-cover bg-center relative ">
          <div className="absolute inset-0 bg-teal-800 opacity-40"></div>

          <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
            <h1
              className={`${roboto_slab.className} text-6xl font-normal text-slate-100 relative z-10 py-8 mt-12`}
            >
              {postData?.title || "Title not available"}
            </h1>

            <div className="pb-4 text-slate-100 z-10">
              Posted by Unknown, last updated on
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: postData?.excerpt || "" }}
              className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200"
            />
          </div>
        </section>
        <section className="content-area py-8">
          <div
            dangerouslySetInnerHTML={{ __html: postData?.content || "" }}
            className="post-content container lg:max-w-4xl mx-auto"
          />
        </section>
      </article>
      <div className="container mx-auto lg:max-w-4xl">
        <h3 className="text-xl py-2 my-4 border-l-4 border-l-lime-300 pl-4">
          {commentCount ? commentCount : "No"} comments on this post so far:
        </h3>
        <CommentForm postId={postData?.databaseId} />
      </div>

      <div className="container mx-auto lg:max-w-4xl">
        <section>
          <ul>
            {comments && comments.nodes ? (
              comments.nodes.map((comment) => (
                <li key={comment.id} className="pb-4 border-b">
                  <div className="comment-header flex justify-start items-center">
                    <div className="py-4">
                      <img
                        src={comment.author.node.avatar.url}
                        alt="image"
                        width={comment.author.node.avatar.width}
                        height={comment.author.node.avatar.height}
                        className="rounded-full max-w-[50px] mr-4"
                      />
                    </div>
                    <div>
                      <div className="font-bold">
                        {comment.author.node.name}
                      </div>
                    </div>
                  </div>
                  <div className="comment-body pl-[66px]">
                    <div
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    ></div>
                  </div>
                </li>
              ))
            ) : (
              <li>No comments available</li>
            )}
          </ul>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
