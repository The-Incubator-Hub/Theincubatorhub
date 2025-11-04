import Navbar from "@/components/Navbar.js";
import Article from "@/components/Article.js";
import FooterR from "@/components/FooterR.js"
import BlogPostsGrid from "@/components/post.js";

export default function Page() {
    return (
      <div>
        <Navbar />
        <Article />
        <BlogPostsGrid />
        <FooterR />
      </div>
    );
  }