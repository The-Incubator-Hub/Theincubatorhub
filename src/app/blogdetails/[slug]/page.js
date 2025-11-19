import BlogDetailsClient from "./BlogDetailsClient"
import client from "../../../../tina/__generated__/client"

export async function generateStaticParams() {
  try {
    const postsListData = await client.queries.blogPostConnection()
    return postsListData.data.blogPostConnection.edges.map((post) => ({
      slug: post.node.slug || post.node._sys.filename.replace('.json', ''),
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export default async function BlogDetailsPage({ params }) {
  let data = {}
  let query = {}
  let variables = { relativePath: `${params.slug}.json` }
  
  try {
    const res = await client.queries.blogPost(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching blog post data:", error)
    // Try to find by slug if direct filename lookup fails
    try {
      const postsListData = await client.queries.blogPostConnection()
      const post = postsListData.data.blogPostConnection.edges.find(
        edge => edge.node.slug === params.slug
      )
      if (post) {
        const res = await client.queries.blogPost({ relativePath: `${post.node._sys.filename}` })
        query = res.query
        data = res.data
        variables = res.variables
      }
    } catch (err) {
      console.error("Error finding post by slug:", err)
    }
  }

  return (
    <BlogDetailsClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}


