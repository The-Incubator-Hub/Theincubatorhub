"use client"

import { useTina } from "tinacms/dist/react"
import HeroSection from "@/components/landing-page-components/HeroSection"
import AboutIncubator from "@/components/landing-page-components/AboutIncubator"
import TrustedOrganizations from "@/components/landing-page-components/TrustedOrganizations"
import WhyIncubator from "@/components/landing-page-components/WhyIncubator"
import Statistics from "@/components/landing-page-components/Statistics"
import BootcampsCarousel from "@/components/landing-page-components/BootcampsCarousel"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import TestimonialCarousel from "@/components/landing-page-components/TestimonialCarousel"
import PressReleases from "@/components/landing-page-components/PressReleases"

export default function HomeClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  // Extract home page data from TinaCMS
  const homeData = data?.home || {}
  const heroData = homeData.hero || {}
  const aboutData = homeData.aboutIncubator || {}
  const statisticsData = homeData.statistics || {}
  const ctaData = homeData.ctaBanner || {}

  return (
    <main className="bg-white">
      <HeroSection 
        heading={heroData.heading}
        highlightedText={heroData.highlightedText}
        description={heroData.description}
        primaryButtonText={heroData.primaryButtonText}
        secondaryButtonText={heroData.secondaryButtonText}
        image={heroData.image}
      />
      <AboutIncubator 
        title={aboutData.title}
        description1={aboutData.description1}
        description2={aboutData.description2}
        buttonText={aboutData.buttonText}
        image={aboutData.image}
        studentsEnrolled={aboutData.studentsEnrolled}
        reviewsCount={aboutData.reviewsCount}
      />
      <TrustedOrganizations />
      <WhyIncubator />
      <Statistics 
        title={statisticsData.title}
        stats={statisticsData.stats}
      />  
      <BootcampsCarousel />
      <CTABanner 
        title={ctaData.title}
        description={ctaData.description}
        buttonText={ctaData.buttonText}
        backgroundImage={ctaData.backgroundImage}
      />
      <TestimonialCarousel />
      <PressReleases />
    </main>
  )
}

