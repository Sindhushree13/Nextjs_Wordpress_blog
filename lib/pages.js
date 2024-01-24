// lib/pages.js
import graphqlRequest from './graphqlRequest';

export async function getPageSlugs() {
  const query = {
    query: `
      query getPageSlugs {
        pages {
          nodes {
            slug
          }
        }
      }
    `,
  };

  const resJson = await graphqlRequest(query);
  const slugs = resJson.data?.pages?.nodes || [];
  return slugs;
}

export async function getSinglePage(slug) {
  const query = {
    query: `
      query NewQuery($slug: String!) {
        pages(where: { name: $slug }) {
          nodes {
            content(format: RENDERED)
            date
            modified
            slug
            title(format: RENDERED)
          }
        }
      }
    `,
    variables: { slug },
  };

  const resJson = await graphqlRequest(query);

  if (resJson.errors) {
    throw new Error(
      `GraphQL request failed: ${resJson.errors.map((error) => error.message).join(', ')}`
    );
  }

  const pageData = resJson.data?.pages?.nodes?.[0] || {};
  return pageData;
}
