"use client"

import { useTina } from "tinacms/dist/react"
import PhotoVideoSection from "@/components/gallery-components/PhotoVideoSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"

export default function GalleryClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const galleryData = data?.gallery || {}
  const headerData = galleryData.header || {}
  const photoVideoSectionData = galleryData.photoVideoSection || {}
  const ctaBannerData = galleryData.ctaBanner || {}

  return (
    <div>
      <HeaderCareer 
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <PhotoVideoSection 
        title={photoVideoSectionData.title}
        description={photoVideoSectionData.description}
        filterButtons={photoVideoSectionData.filterButtons}
        images={photoVideoSectionData.images}
        videos={photoVideoSectionData.videos}
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

