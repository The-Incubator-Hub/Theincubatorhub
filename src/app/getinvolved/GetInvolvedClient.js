"use client"

import { useTina } from "tinacms/dist/react"
import GetInvolvedSection from "@/components/get-involved-components/GetInvolvedSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"

export default function GetInvolvedClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const getInvolvedData = data?.getinvolved || {}
  const headerData = getInvolvedData.header || {}
  const getInvolvedSectionData = getInvolvedData.getInvolvedSection || {}
  const ctaBannerData = getInvolvedData.ctaBanner || {}

  return (
    <div className="mt-16 md:mt-18">
      <HeaderCareer 
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <GetInvolvedSection 
        title={getInvolvedSectionData.title}
        description={getInvolvedSectionData.description}
        opportunities={getInvolvedSectionData.opportunities}
      />
      <CTABanner 
        title={ctaBannerData.title}
        description={ctaBannerData.description}
        buttonText={ctaBannerData.buttonText}
        backgroundImage={ctaBannerData.backgroundImage}
      />
      <div className="h-16"></div>
    </div>
  )
}

