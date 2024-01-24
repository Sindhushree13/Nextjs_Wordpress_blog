import Head from "next/head";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { getPageSlugs, getSinglePage } from "../../lib/pages";
import "../../../styles/Home.module.css"

export async function getStaticProps({ params }:any) {
  try {
    // console.log("Fetching page data for slug:", params.about);
    const pageData = await getSinglePage(params.about);
    // console.log('Fetched pageData:', pageData);

    if (!pageData) {
    //   console.log('Page data not found:', pageData);
      return {
        notFound: true,
      };
    }

    const serializedPageData = {
      ...pageData,
      date: pageData.date instanceof Date ? pageData.date.toISOString() : null,
    };

    return {
      props: {
        pageData: serializedPageData,
      },
    };
  } catch (error) {
    console.error("getStaticProps error:", error);
    throw error;
  }
}

export async function getStaticPaths() {
  try {
    const pageSlugs = await getPageSlugs();
    // console.log("Fetched pageSlugs:", pageSlugs);

    return {
      paths: pageSlugs.map((s:any) => ({
        params: {
          about: s.slug,
        },
      })),
      fallback: true,
    };
  } catch (error) {
    console.error("getStaticPaths error:", error);
    throw error;
  }
}

export default function Page({ pageData, isFallback }:any) {
//   console.log('Page Data:', pageData);

  if (isFallback) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  if (!pageData) {
    console.log('Error: Page not found');
    return <div>Error: Page not found</div>;
  }

  return (
    <>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <section className="bg-slate-700">
        <SiteHeader className="header-page z-10 relative" />
      </section>
      <section className="content-area py-8">
        <article>
          <h1 className="text-6xl text-center text-slate-700 relative py-8">{pageData.title}</h1>
          <p>{pageData.date}</p>
          <div
            dangerouslySetInnerHTML={{ __html: pageData.content || '' }}
            className="post-content container mx-auto lg:max-w-4xl"
          />
        </article>
      </section>
      <SiteFooter />
    </>
  );
}
