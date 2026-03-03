import BlogClient from "./BlogClient"
import client from "../../../tina/__generated__/client"
import {
  loadCollectionDocument,
  loadTinaSingleton,
} from "@/lib/tina-fallback.mjs"

export default async function Page() {
  const variables = { relativePath: "blog.json" }
  let {
    data,
    query,
    variables: resolvedVariables,
  } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.blog(vars),
    variables,
    fallbackCollection: "blog",
    fallbackFile: "blog.json",
    rootKey: "blog",
    context: "blog-page",
  })

  // Ensure blog post cards are available even when Tina query omits newly added fields.
  if (!data?.blog?.blogPostsGrid?.posts?.length) {
    const local = await loadCollectionDocument("blog", "blog.json", "blog")
    if (local?.blog?.blogPostsGrid?.posts?.length) {
      data = {
        ...data,
        blog: {
          ...(data?.blog || {}),
          blogPostsGrid: {
            ...(data?.blog?.blogPostsGrid || {}),
            posts: local.blog.blogPostsGrid.posts,
          },
        },
      }
    }
  }

  return (
    <BlogClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}


  
