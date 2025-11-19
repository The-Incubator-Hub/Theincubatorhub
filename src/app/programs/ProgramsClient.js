"use client"

import { useTina } from "tinacms/dist/react"
import ProgramHeader from "@/components/program-components/ProgramHeader"
import LearningPathway from "@/components/program-components/LearningPathway"
import VideoSection from "@/components/program-components/VideoSection"
import GalleryPreview from "@/components/program-components/GalleryPreview"
import Partners from "@/components/program-components/Partners"    
import CTABanner from "@/components/landing-page-components/CtaBanner"
import Testimonials from "@/components/program-components/Testimonial"

export default function ProgramsClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const programsData = data?.programs || {}
  const programHeaderData = programsData.programHeader || {}
  const learningPathwayData = programsData.learningPathway || {}
  const videoSectionData = programsData.videoSection || {}
  const partnersData = programsData.partners || {}
  const testimonialsData = programsData.testimonials || {}
  const galleryData = programsData.gallery || {}
  const ctaBannerData = programsData.ctaBanner || {}

  const galleryImages = galleryData.images || [
    {
      src: 'https://images.pexels.com/photos/12902873/pexels-photo-12902873.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Diverse group of office workers collaborating on laptops during a bootcamp session'
    },
    {
      src: 'https://images.pexels.com/photos/12899151/pexels-photo-12899151.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Two programmers discussing code on a laptop in a modern workshop setting'
    },
    {
      src: 'https://images.pexels.com/photos/5716018/pexels-photo-5716018.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Team of participants gathered around a laptop for a collaborative coding discussion'
    },
    {
      src: 'https://images.pexels.com/photos/3866621/pexels-photo-3866621.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Multiethnic group of professionals intensely working together on a laptop in an office bootcamp'
    }
  ]

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
        title={galleryData.title || "Future Clan Bootcamp Gallery"}
        subtitle={galleryData.subtitle || "Watch video highlights of future clan bootcamp 2024 through our lens"}
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

