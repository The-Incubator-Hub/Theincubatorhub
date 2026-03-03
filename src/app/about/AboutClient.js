"use client"

import { MissionSection } from "@/components/about-us-components/MissionSection"
import { WhoWeAreSection } from "@/components/about-us-components/WhoWeAreSection"
import Statistics from "@/components/landing-page-components/Statistics"
import ValuesSection from "@/components/about-us-components/ValuesSection"
import TeamMembersSection from "@/components/about-us-components/TeamMemberSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import TrustedOrganizations from "@/components/landing-page-components/TrustedOrganizations"
import HeaderCareer from "@/components/HeaderCareer"
import Reveal from "@/components/motion/Reveal"

export default function AboutClient({ initialData }) {
  const data = initialData || {}

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
      <Reveal>
        <MissionSection />
      </Reveal>
      <Reveal delay={80}>
        <WhoWeAreSection />
      </Reveal>
      <Reveal delay={120}>
        <Statistics title={statisticsData.title} stats={statisticsData.stats} />
      </Reveal>
      <Reveal delay={160}>
        <ValuesSection />
      </Reveal>
      <Reveal delay={200}>
        <TeamMembersSection />
      </Reveal>
      <Reveal delay={240}>
        <CTABanner 
          title={ctaBannerData.title}
          description={ctaBannerData.description}
          buttonText={ctaBannerData.buttonText}
          buttonLink={ctaBannerData.buttonLink}
          backgroundImage={ctaBannerData.backgroundImage}
        />
      </Reveal>
      <Reveal delay={280}>
        <TrustedOrganizations />
      </Reveal>
    </main>
  )
}
