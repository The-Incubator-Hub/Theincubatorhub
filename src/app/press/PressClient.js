"use client"

import { useTina } from "tinacms/dist/react"
import NewsSection from "@/components/press-release-components/NewsSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"

export default function PressClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const pressData = data?.press || {}
  const headerData = pressData.header || {}
  const newsSectionData = pressData.newsSection || {}
  const ctaBannerData = pressData.ctaBanner || {}

  return (
    <div className="mt-16 md:mt-18">
      <HeaderCareer 
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <NewsSection 
        searchPlaceholder={newsSectionData.searchPlaceholder}
        categories={newsSectionData.categories}
        featuredPost={newsSectionData.featuredPost}
        latestNewsTitle={newsSectionData.latestNewsTitle}
        latestNewsDescription={newsSectionData.latestNewsDescription}
        newsPosts={newsSectionData.newsPosts}
      />
      <CTABanner 
        title={ctaBannerData.title}
        description={ctaBannerData.description}
        buttonText={ctaBannerData.buttonText}
        backgroundImage={ctaBannerData.backgroundImage}
      />
    </div>
  )
}

