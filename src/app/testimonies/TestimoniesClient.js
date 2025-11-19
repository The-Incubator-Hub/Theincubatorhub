"use client"

import { useTina } from "tinacms/dist/react"
import HeaderCareer from "@/components/HeaderCareer.js"
import TeamIntro from "@/components/TeamIntro.js"
import Testimonials from "@/components/testimonials"
import JoinUs from "@/components/JoinUs.js"

export default function TestimoniesClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

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
      <TeamIntro 
        title={teamIntroData.title}
        description={teamIntroData.description}
      />
      <Testimonials 
        categories={testimonialsData.categories}
        testimonials={testimonialsData.testimonials}
      />
      <JoinUs 
        title={joinUsData.title}
        description={joinUsData.description}
        ctaText={joinUsData.ctaText}
        ctaLink={joinUsData.ctaLink}
        backgroundImage={joinUsData.backgroundImage}
      />
    </div>
  )
}

