'use client';

import HeaderCareer from "@/components/HeaderCareer.js";
import TeamIntro from "@/components/TeamIntro.js";
import Testimonials from "@/components/testimonials"
import JoinUs from "@/components/JoinUs.js"
export default function Page() {
    return (
      <div>
        <HeaderCareer />
        <TeamIntro />
        <Testimonials />
        <JoinUs />
      </div>
    );
  }
