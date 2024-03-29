
import graphqlRequest from "./graphqlRequest";

export async function createComment(body:any) {
    const mutation = {
        query: `mutation createComment(
            $author: String = "${body.author}", 
            $authorEmail: String = "${body.authorEmail}", 
            $clientMutationId: String = "uniqueId", 
            $commentOn: Int = ${parseInt(body.postId)}, 
            $content: String = "${body.content}") {
            createComment(
              input: {
                author: $author, 
                authorEmail: 
                $authorEmail, 
                clientMutationId: $clientMutationId, 
                content: $content, 
                commentOn: $commentOn
              }
            ) {
              success
            }
          }`
    };

    const resJson = await graphqlRequest(mutation);

    return resJson;
}

export async function getComments(slug:any) {
    const query = {
        query: `query getComments {
            post(id: "${slug}", idType: SLUG) {
              comments(where: {parentIn: "null"}) {
                nodes {
                  content
                  author {
                    node {
                      name
                      avatar {
                        url
                        height
                        width
                      }
                    }
                  }
                  date
                  parentId
                  id
                }
              }
              commentCount
            }
          }`
    };

    const resJson = await graphqlRequest(query);
    
    // Check if the expected properties are available in the response
    if (resJson?.data?.post?.comments && resJson?.data?.post?.commentCount) {
        const post = resJson.data.post;
        return {
            comments: post.comments,
            commentCount: post.commentCount,
        };
    } else {
        console.error("Invalid comments data structure:", resJson);
        return {
            comments: null,
            commentCount: 0,
        };
    }
}
