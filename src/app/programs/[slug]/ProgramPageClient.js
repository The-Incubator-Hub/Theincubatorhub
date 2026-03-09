"use client"

import { useTina } from "tinacms/dist/react"
import { useEffect, useState } from "react"
import ProgramHeader from "@/components/program-components/ProgramHeader"
import LearningPathway from "@/components/program-components/LearningPathway"
import VideoSection from "@/components/program-components/VideoSection"
import GalleryPreview from "@/components/program-components/GalleryPreview"
import Partners from "@/components/program-components/Partners"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import Testimonials from "@/components/program-components/Testimonial"

export default function ProgramPageClient({ initialData, query, variables, programSlug }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })
  const [cohorts, setCohorts] = useState([])

  useEffect(() => {
    if (!programSlug) return
    fetch(`/api/programs/${programSlug}/cohorts`)
      .then((r) => r.json())
      .then((d) => { if (d.ok) setCohorts(d.data) })
      .catch(() => {})
  }, [programSlug])

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
      {/* Cohort / Schedule section */}
      {cohorts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 font-montserrat mb-6 text-center">Upcoming Cohorts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {cohorts.map((cohort) => (
                <div key={cohort.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{cohort.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Starts:{" "}
                    {new Date(cohort.startDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  {cohort.endDate && (
                    <p className="text-sm text-gray-600 mb-1">
                      Ends:{" "}
                      {new Date(cohort.endDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${cohort.seatsRemaining > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {cohort.seatsRemaining > 0 ? `${cohort.seatsRemaining} seats left` : "Full"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Apply CTA */}
      {programSlug && (
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 font-montserrat mb-3">Ready to Apply?</h2>
            <p className="text-gray-600 mb-6">Take the first step towards transforming your tech career.</p>
            <a
              href={`/programs/${programSlug}/apply`}
              className="inline-flex items-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              Apply Now →
            </a>
          </div>
        </section>
      )}

      <CTABanner
        title={ctaBannerData.title}
        description={ctaBannerData.description}
        buttonText={ctaBannerData.buttonText}
        backgroundImage={ctaBannerData.backgroundImage}
      />
    </div>
  )
}

