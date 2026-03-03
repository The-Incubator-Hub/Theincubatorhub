import BlogClient from "./BlogClient"
import {
  loadCollectionDocument,
  loadSingletonPage,
} from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Explore insights, success stories, and updates on digital skills, innovation, and career growth from The Incubator Hub.",
  path: "/blog",
})

export default async function Page() {
  let { data } = await loadSingletonPage({
    collection: "blog",
    fileName: "blog.json",
    rootKey: "blog",
  })

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
    />
  )
}


  
