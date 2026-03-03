"use client"

import HeaderCareer from "@/components/HeaderCareer.js"
import TeamIntro from "@/components/TeamIntro.js"
import JobListings from "@/components/Job.js"
import ResumeCTA from "@/components/Resume.js"
import Reveal from "@/components/motion/Reveal"

export default function CareersClient({ initialData }) {
  const data = initialData || {}

  const careersData = data?.careers || {}
  const headerData = careersData.header || {}
  const teamIntroData = careersData.teamIntro || {}
  const jobListingsData = careersData.jobListings || {}
  const resumeCTAData = careersData.resumeCTA || {}

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
        <JobListings jobs={jobListingsData.jobs} />
      </Reveal>
      <Reveal delay={120}>
        <ResumeCTA 
          title={resumeCTAData.title}
          description={resumeCTAData.description}
          buttonText={resumeCTAData.buttonText}
          buttonLink={resumeCTAData.buttonLink}
          backgroundImage={resumeCTAData.backgroundImage}
        />
      </Reveal>
    </div>
  )
}
