import Navbar from "@/components/Navbar.js";
import HeaderCareer from "@/components/HeaderCareer.js";
import FooterR from "@/components/FooterR.js"
import TeamIntro from "@/components/TeamIntro.js";
import JobListings from "@/components/Job.js";
import ResumeCTA from "@/components/Resume.js";

export default function Page() {
    return (
      <div>
        <Navbar />
        <HeaderCareer />
        <TeamIntro />
        <JobListings />
        <ResumeCTA />
        <FooterR />
      </div>
    );
  }