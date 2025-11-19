"use client"

import { useTina } from "tinacms/dist/react"
import Article from "@/components/Article.js"
import SuccessStories from "@/components/success.js"

export default function BlogDetailsClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const postData = data?.blogPost || {}
  const relatedPosts = postData.relatedPosts || []

  return (
    <div>
      <Article 
        title={postData.title}
        category={postData.category}
        featuredTag={postData.featuredTag}
        secondaryTag={postData.secondaryTag}
        featuredImage={postData.featuredImage}
        author={postData.author}
        publishDate={postData.publishDate}
        readTime={postData.readTime}
        likes={postData.likes}
        content={postData.content}
        tags={postData.tags}
      />
      <SuccessStories items={relatedPosts} />
    </div>
  )
}


