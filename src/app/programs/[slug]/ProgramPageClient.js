"use client"

import ProgramHeader from "@/components/program-components/ProgramHeader"
import LearningPathway from "@/components/program-components/LearningPathway"
import VideoSection from "@/components/program-components/VideoSection"
import GalleryPreview from "@/components/program-components/GalleryPreview"
import Partners from "@/components/program-components/Partners"    
import CTABanner from "@/components/landing-page-components/CtaBanner"
import Testimonials from "@/components/program-components/Testimonial"
import Reveal from "@/components/motion/Reveal"

export default function ProgramPageClient({ initialData }) {
  const data = initialData || {}

  const programData = data?.programPage || {}
  const programHeaderData = programData.programHeader || {}
  const learningPathwayData = programData.learningPathway || {}
  const videoSectionData = programData.videoSection || {}
  const partnersData = programData.partners || {}
  const testimonialsData = programData.testimonials || {}
  const galleryData = programData.gallery || {}
  const ctaBannerData = programData.ctaBanner || {}

  const galleryImages = galleryData.images || []

  return (
    <div className="mt-16 md:mt-18">
      <ProgramHeader 
        title={programHeaderData.title}
        description={programHeaderData.description}
        programs={programHeaderData.programs}
        stats={programHeaderData.stats}
        images={programHeaderData.images}
      />
      <Reveal>
        <LearningPathway 
          phases={learningPathwayData.phases}
          objectives={learningPathwayData.objectives}
          outcomes={learningPathwayData.outcomes}
        />
      </Reveal>
      <Reveal delay={80}>
        <VideoSection 
          title={videoSectionData.title}
          subtitle={videoSectionData.subtitle}
          imageUrl={videoSectionData.imageUrl}
          videoUrl={videoSectionData.videoUrl}
        />
      </Reveal>
      <Reveal delay={120}>
        <Partners 
          title={partnersData.title}
          partners={partnersData.partners}
        />
      </Reveal>
      <Reveal delay={160}>
        <GalleryPreview 
          title={galleryData.title || `${programData.title} Gallery`}
          subtitle={galleryData.subtitle || `Watch video highlights of ${programData.title} through our lens`}
          images={galleryImages}
        />
      </Reveal>
      <Reveal delay={200}>
        <Testimonials 
          title={testimonialsData.title}
          testimonials={testimonialsData.testimonials}
        />
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
    </div>
  )
}
