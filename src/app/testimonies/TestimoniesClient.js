"use client"

import HeaderCareer from "@/components/HeaderCareer.js"
import TeamIntro from "@/components/TeamIntro.js"
import Testimonials from "@/components/testimonials"
import JoinUs from "@/components/JoinUs.js"
import Reveal from "@/components/motion/Reveal"

export default function TestimoniesClient({ initialData }) {
  const data = initialData || {}

  const testimoniesData = data?.testimonies || {}
  const headerData = testimoniesData.header || {}
  const teamIntroData = testimoniesData.teamIntro || {}
  const testimonialsData = testimoniesData.testimonials || {}
  const joinUsData = testimoniesData.joinUs || {}

  return (
    <div>
      <HeaderCareer 
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <Reveal>
        <TeamIntro 
          title={teamIntroData.title}
          description={teamIntroData.description}
        />
      </Reveal>
      <Reveal delay={80}>
        <Testimonials 
          categories={testimonialsData.categories}
          testimonials={testimonialsData.testimonials}
        />
      </Reveal>
      <Reveal delay={120}>
        <JoinUs 
          title={joinUsData.title}
          description={joinUsData.description}
          ctaText={joinUsData.ctaText}
          ctaLink={joinUsData.ctaLink}
          backgroundImage={joinUsData.backgroundImage}
        />
      </Reveal>
    </div>
  )
}
