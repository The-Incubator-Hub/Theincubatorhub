"use client"

import { useTina } from "tinacms/dist/react"
import HeaderCareer from "@/components/HeaderCareer.js"
import TeamIntro from "@/components/TeamIntro.js"
import JobListings from "@/components/Job.js"
import ResumeCTA from "@/components/Resume.js"

export default function CareersClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

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
      <TeamIntro 
        title={teamIntroData.title}
        description={teamIntroData.description}
      />
      <JobListings jobs={jobListingsData.jobs} />
      <ResumeCTA 
        title={resumeCTAData.title}
        description={resumeCTAData.description}
        buttonText={resumeCTAData.buttonText}
        buttonLink={resumeCTAData.buttonLink}
        backgroundImage={resumeCTAData.backgroundImage}
      />
    </div>
  )
}

