import Navbar from "@/components/Navbar.js";
import HeaderCareer from "@/components/HeaderCareer.js";
import FooterR from "@/components/FooterR.js"
import Future from "@/components/Future.js";
import BlogPostsGrid from "@/components/post.js";

export default function Page() {
    return (
      <div>
       
        <HeaderCareer /> 
        <Future />
        <BlogPostsGrid />
        
      </div>
    );
  }


  