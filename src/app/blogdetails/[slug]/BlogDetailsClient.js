"use client"

import Article from "@/components/Article.js"
import SuccessStories from "@/components/success.js"
import Reveal from "@/components/motion/Reveal"

export default function BlogDetailsClient({ initialData }) {
  const data = initialData || {}

  const postData = data?.blogPost || {}
  const relatedPosts = postData.relatedPosts || []

  return (
    <div>
      <Reveal>
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
      </Reveal>
      <Reveal delay={80}>
        <SuccessStories items={relatedPosts} />
      </Reveal>
    </div>
  )
}

