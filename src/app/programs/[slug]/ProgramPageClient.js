"use client"

import Link from "next/link"
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
  const programSlug = data?.slug || programData?.slug || ""
  const programTitle = programHeaderData.title || programData.title || "this program"

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
      {programSlug ? (
        <section className="bg-white px-6 py-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-2xl border border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Ready to apply?</h2>
              <p className="mt-1 text-sm text-gray-600">
                Submit your application for {programTitle} and track progress in your portal.
              </p>
            </div>
            <Link
              href={`/programs/${programSlug}/apply`}
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black"
            >
              Apply Now
            </Link>
          </div>
        </section>
      ) : null}
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
