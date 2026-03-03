import BlogDetailsClient from "./BlogDetailsClient"
import { notFound } from "next/navigation"
import {
  buildMetadata,
  siteConfig,
  titleFromSlug,
  toAbsoluteUrl,
} from "@/lib/seo"
import { loadJsonCollection } from "@/lib/content-loader.mjs"

const getBlogDescription = (post) => {
  const content =
    typeof post?.content === "string"
      ? post.content.replace(/\s+/g, " ").trim()
      : ""

  if (content.length > 0) {
    return content.length > 160 ? `${content.slice(0, 157)}...` : content
  }

  return `Read ${post?.title || "this article"} on The Incubator Hub blog.`
}

const getBlogImage = (post) => {
  if (typeof post?.featuredImage === "string" && post.featuredImage.trim()) {
    return post.featuredImage
  }
  return siteConfig.defaultOgImage
}

async function loadBlogPosts() {
  const posts = await loadJsonCollection("blog-posts")
  return posts.map((post) => ({
    ...post,
    slug:
      (typeof post?.slug === "string" && post.slug.trim()) ||
      String(post?._sys?.filename || "").replace(".json", ""),
  }))
}

async function getBlogPostBySlug(slug) {
  const posts = await loadBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

export async function generateStaticParams() {
  const posts = await loadBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return buildMetadata({
      title: titleFromSlug(slug),
      description: "Blog article",
      path: `/blogdetails/${slug}`,
      noIndex: true,
    })
  }

  const title = post.title || titleFromSlug(slug)
  const description = getBlogDescription(post)
  const image = getBlogImage(post)
  const keywords = [
    "Blog",
    post.category,
    ...(post.tags || []).map((tag) => tag?.name).filter(Boolean),
  ].filter(Boolean)

  return buildMetadata({
    title,
    description,
    path: `/blogdetails/${post.slug}`,
    image,
    type: "article",
    keywords,
    publishedTime: post.publishDate,
    authors: [post.author].filter(Boolean),
  })
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const articleTitle = post.title || titleFromSlug(slug)
  const articleDescription = getBlogDescription(post)
  const articleImage = getBlogImage(post)
  const articleUrl = toAbsoluteUrl(`/blogdetails/${post.slug}`)

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articleTitle,
    description: articleDescription,
    image: [articleImage.startsWith("http") ? articleImage : toAbsoluteUrl(articleImage)],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    datePublished: post.publishDate,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author,
        }
      : {
          "@type": "Organization",
          name: siteConfig.name,
        },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl("/images/Iogo_incubator.png"),
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogDetailsClient initialData={{ blogPost: post }} />
    </>
  )
}

