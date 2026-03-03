"use client";

import Future from "@/components/Future.js";
import HeaderCareer from "@/components/HeaderCareer.js";
import BlogPostsGrid from "@/components/post.js";
import Reveal from "@/components/motion/Reveal";

export default function BlogClient({ initialData }) {
  const data = initialData || {}

  const blogData = data?.blog || {};
  const headerData = blogData.header || {};
  const futureData = blogData.future || {};
  const blogPostsGridData = blogData.blogPostsGrid || {};

  return (
    <div>
      <HeaderCareer
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <Reveal>
        <Future
          searchPlaceholder={futureData.searchPlaceholder}
          filters={futureData.filters}
        />
      </Reveal>
      <Reveal delay={80}>
        <BlogPostsGrid
          title={blogPostsGridData.title}
          description={blogPostsGridData.description}
          posts={blogPostsGridData.posts}
        />
      </Reveal>
    </div>
  );
}
