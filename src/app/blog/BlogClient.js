"use client";

import Future from "@/components/Future.js";
import HeaderCareer from "@/components/HeaderCareer.js";
import BlogPostsGrid from "@/components/post.js";
import { useTina } from "tinacms/dist/react";

export default function BlogClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  });

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
      <Future
        searchPlaceholder={futureData.searchPlaceholder}
        filters={futureData.filters}
      />
      <BlogPostsGrid
        title={blogPostsGridData.title}
        description={blogPostsGridData.description}
      />
    </div>
  );
}
