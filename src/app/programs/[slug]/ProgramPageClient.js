"use client"

import { useTina } from "tinacms/dist/react"
import ProgramHeader from "@/components/program-components/ProgramHeader"
import LearningPathway from "@/components/program-components/LearningPathway"
import VideoSection from "@/components/program-components/VideoSection"
import GalleryPreview from "@/components/program-components/GalleryPreview"
import Partners from "@/components/program-components/Partners"    
import CTABanner from "@/components/landing-page-components/CtaBanner"
import Testimonials from "@/components/program-components/Testimonial"

export default function ProgramPageClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const programData = data?.programPage || {}
  const programHeaderData = programData.programHeader || {}
  const learningPathwayData = programData.learningPathway || {}
  const videoSectionData = programData.videoSection || {}
  const partnersData = programData.partners || {}
  const testimonialsData = programData.testimonials || {}
  const galleryData = programData.gallery || {}
  const ctaBannerData = programData.ctaBanner || {}

  const galleryImages = galleryData.images || []

  const handlePrev = () => {
    console.log('Navigate to previous set of images')
  }

  const handleNext = () => {
    console.log('Navigate to next set of images')
  }

  return (
    <div className="mt-16 md:mt-18">
      <ProgramHeader 
        title={programHeaderData.title}
        description={programHeaderData.description}
        programs={programHeaderData.programs}
        stats={programHeaderData.stats}
        images={programHeaderData.images}
      />
      <LearningPathway 
        phases={learningPathwayData.phases}
        objectives={learningPathwayData.objectives}
        outcomes={learningPathwayData.outcomes}
      />
      <VideoSection 
        title={videoSectionData.title}
        subtitle={videoSectionData.subtitle}
        imageUrl={videoSectionData.imageUrl}
        videoUrl={videoSectionData.videoUrl}
      />
      <Partners 
        title={partnersData.title}
        partners={partnersData.partners}
      />
      <GalleryPreview 
        title={galleryData.title || `${programData.title} Gallery`}
        subtitle={galleryData.subtitle || `Watch video highlights of ${programData.title} through our lens`}
        images={galleryImages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <Testimonials 
        title={testimonialsData.title}
        testimonials={testimonialsData.testimonials}
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

