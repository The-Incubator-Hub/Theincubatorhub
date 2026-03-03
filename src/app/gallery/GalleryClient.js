"use client"

import PhotoVideoSection from "@/components/gallery-components/PhotoVideoSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"
import Reveal from "@/components/motion/Reveal"

export default function GalleryClient({ initialData }) {
  const data = initialData || {}

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
      <Reveal>
        <PhotoVideoSection 
          title={photoVideoSectionData.title}
          description={photoVideoSectionData.description}
          filterButtons={photoVideoSectionData.filterButtons}
          images={photoVideoSectionData.images}
          videos={photoVideoSectionData.videos}
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
      <div className="h-16"></div>
    </div>
  )
}
