import BlogDetailsClient from "./BlogDetailsClient"
import client from "../../../../tina/__generated__/client"
import { notFound } from "next/navigation"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { logTinaFallback } from "@/lib/tina-fallback.mjs"

const BLOG_POSTS_DIR = path.join(process.cwd(), "content", "blog-posts")

const deriveBlogSlug = (post, filename = "") =>
  (typeof post?.slug === "string" && post.slug.trim()) ||
  filename.replace(".json", "")

async function loadBlogPostsFromFiles() {
  try {
    const entries = await readdir(BLOG_POSTS_DIR, { withFileTypes: true })
    const files = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".json")
    )

    const posts = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = path.join(BLOG_POSTS_DIR, file.name)
          const raw = await readFile(filePath, "utf8")
          const json = JSON.parse(raw)
          return {
            ...json,
            _sys: { filename: file.name },
            slug: deriveBlogSlug(json, file.name),
          }
        } catch (error) {
          console.error(`Error parsing blog post file ${file.name}:`, error)
          return null
        }
      })
    )

    return posts.filter(Boolean)
  } catch (error) {
    console.error("Error loading local blog posts:", error)
    return []
  }
}

export async function generateStaticParams() {
  try {
    const postsListData = await client.queries.blogPostConnection()
    return postsListData.data.blogPostConnection.edges.map((post) => ({
      slug: post.node.slug || post.node._sys.filename.replace('.json', ''),
    }))
  } catch (error) {
    logTinaFallback("blogdetails-generate-static-params", error)
    const localPosts = await loadBlogPostsFromFiles()
    return localPosts.map((post) => ({
      slug: post.slug,
    }))
  }
}

export default async function BlogDetailsPage({ params }) {
  let data = {}
  let query = {}
  let variables = {}
  const slug = params.slug

  try {
    variables = { relativePath: `${slug}.json` }
    const res = await client.queries.blogPost(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    logTinaFallback("blogdetails-page-fetch", error)

    // Try to find by slug if direct filename lookup fails
    try {
      const postsListData = await client.queries.blogPostConnection()
      const post = postsListData.data.blogPostConnection.edges.find(
        (edge) =>
          (edge.node.slug || edge.node._sys.filename.replace(".json", "")) ===
          slug
      )
      if (post) {
        const res = await client.queries.blogPost({
          relativePath: `${post.node._sys.filename}`,
        })
        query = res.query
        data = res.data
        variables = res.variables
      }
    } catch (err) {
      logTinaFallback("blogdetails-find-post-by-slug", err)
    }
  }

  if (!data?.blogPost) {
    const localPosts = await loadBlogPostsFromFiles()
    const localPost = localPosts.find((post) => post.slug === slug)

    if (!localPost) {
      notFound()
    }

    data = { blogPost: localPost }
  }

  return (
    <BlogDetailsClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}
