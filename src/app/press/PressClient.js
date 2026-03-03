"use client"

import NewsSection from "@/components/press-release-components/NewsSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"
import Reveal from "@/components/motion/Reveal"

export default function PressClient({ initialData }) {
  const data = initialData || {}

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
      <Reveal>
        <NewsSection 
          searchPlaceholder={newsSectionData.searchPlaceholder}
          categories={newsSectionData.categories}
          featuredPost={newsSectionData.featuredPost}
          latestNewsTitle={newsSectionData.latestNewsTitle}
          latestNewsDescription={newsSectionData.latestNewsDescription}
          newsPosts={newsSectionData.newsPosts}
        />
      </Reveal>
      <Reveal delay={80}>
        <CTABanner 
          title={ctaBannerData.title}
          description={ctaBannerData.description}
          buttonText={ctaBannerData.buttonText}
          buttonLink={ctaBannerData.buttonLink}
          backgroundImage={ctaBannerData.backgroundImage}
        />
      </Reveal>
    </div>
  )
}
