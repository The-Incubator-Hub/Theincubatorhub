"use client"

import { MissionSection } from "@/components/about-us-components/MissionSection"
import { WhoWeAreSection } from "@/components/about-us-components/WhoWeAreSection"
import Statistics from "@/components/landing-page-components/Statistics"
import ValuesSection from "@/components/about-us-components/ValuesSection"
import TeamMembersSection from "@/components/about-us-components/TeamMemberSection"
import CTABanner from "@/components/landing-page-components/CtaBanner";
import TrustedOrganizations from "@/components/landing-page-components/TrustedOrganizations";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <MissionSection />
      <WhoWeAreSection />
      <Statistics />
      <ValuesSection />
      <TeamMembersSection />
      <CTABanner />
      <TrustedOrganizations />
    </main>
  )
}
