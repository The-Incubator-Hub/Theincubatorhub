"use client"

import { useTina } from "tinacms/dist/react"
import { MissionSection } from "@/components/about-us-components/MissionSection"
import { WhoWeAreSection } from "@/components/about-us-components/WhoWeAreSection"
import Statistics from "@/components/landing-page-components/Statistics"
import ValuesSection from "@/components/about-us-components/ValuesSection"
import TeamMembersSection from "@/components/about-us-components/TeamMemberSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import TrustedOrganizations from "@/components/landing-page-components/TrustedOrganizations"
import HeaderCareer from "@/components/HeaderCareer"

export default function AboutClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const aboutData = data?.about || {}
  const headerData = aboutData.header || {}
  const statisticsData = aboutData.statistics || {}
  const ctaBannerData = aboutData.ctaBanner || {}

  return (
    <main className="min-h-screen bg-white mt-16 md:mt-18">
      <HeaderCareer 
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <MissionSection />
      <WhoWeAreSection />
      <Statistics title={statisticsData.title} stats={statisticsData.stats} />
      <ValuesSection />
      <TeamMembersSection />
      <CTABanner 
        title={ctaBannerData.title}
        description={ctaBannerData.description}
        buttonText={ctaBannerData.buttonText}
        buttonLink={ctaBannerData.buttonLink}
        backgroundImage={ctaBannerData.backgroundImage}
      />
      <TrustedOrganizations />
    </main>
  )
}
