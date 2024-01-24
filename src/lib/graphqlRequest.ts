export default async function graphqlRequest(query:any) {
    // GraphQL endpoint URL
    const url = "https://wordpress-headless-with-nextjs.000webhostapp.com/graphql";
  
    // Headers for the request
    const headers:any = { 'Content-Type': 'application/json' };
  
    // Add authorization header if a refresh token is provided
    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
    }
  
    // Send the POST request to the GraphQL endpoint
    const res = await fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(query)
    });
  
    // Parse the response as JSON and return it
    const resJson = await res.json();
    return resJson;
  }
  