"use client"

import { useTina } from "tinacms/dist/react"
import Navbar from "@/components/Navbar.js"
import HeaderCareer from "@/components/HeaderCareer.js"
import FooterR from "@/components/FooterR.js"
import Future from "@/components/Future.js"
import BlogPostsGrid from "@/components/post.js"

export default function BlogClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const blogData = data?.blog || {}
  const headerData = blogData.header || {}
  const futureData = blogData.future || {}
  const blogPostsGridData = blogData.blogPostsGrid || {}

  return (
    <div>
      <HeaderCareer 
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <Future 
        searchPlaceholder={futureData.searchPlaceholder}
        filters={futureData.filters}
      />
      <BlogPostsGrid 
        title={blogPostsGridData.title}
        description={blogPostsGridData.description}
      />
    </div>
  )
}

