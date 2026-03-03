"use client"

import HeroSection from "@/components/landing-page-components/HeroSection"
import AboutIncubator from "@/components/landing-page-components/AboutIncubator"
import TrustedOrganizations from "@/components/landing-page-components/TrustedOrganizations"
import WhyIncubator from "@/components/landing-page-components/WhyIncubator"
import Statistics from "@/components/landing-page-components/Statistics"
import BootcampsCarousel from "@/components/landing-page-components/BootcampsCarousel"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import TestimonialCarousel from "@/components/landing-page-components/TestimonialCarousel"
import PressReleases from "@/components/landing-page-components/PressReleases"
import Reveal from "@/components/motion/Reveal"

export default function HomeClient({ initialData }) {
  const data = initialData || {}

  // Extract home page data from local content files
  const homeData = data?.home || {}
  const heroData = homeData.hero || {}
  const aboutData = homeData.aboutIncubator || {}
  const statisticsData = homeData.statistics || {}
  const ctaData = homeData.ctaBanner || {}

  return (
    <main className="bg-white">
      <Reveal>
        <HeroSection 
          heading={heroData.heading}
          highlightedText={heroData.highlightedText}
          description={heroData.description}
          primaryButtonText={heroData.primaryButtonText}
          primaryButtonLink={heroData.primaryButtonLink || "/getinvolved"}
          secondaryButtonText={heroData.secondaryButtonText}
          secondaryButtonLink={heroData.secondaryButtonLink || "/contact"}
          image={heroData.image}
        />
      </Reveal>
      <Reveal delay={80}>
        <AboutIncubator 
          title={aboutData.title}
          description1={aboutData.description1}
          description2={aboutData.description2}
          buttonText={aboutData.buttonText}
          buttonLink={aboutData.buttonLink || "/about"}
          image={aboutData.image}
          studentsEnrolled={aboutData.studentsEnrolled}
          reviewsCount={aboutData.reviewsCount}
        />
      </Reveal>
      <Reveal delay={120}>
        <TrustedOrganizations />
      </Reveal>
      <Reveal delay={160}>
        <WhyIncubator />
      </Reveal>
      <Reveal delay={200}>
        <Statistics 
          title={statisticsData.title}
          stats={statisticsData.stats}
        />
      </Reveal>
      <Reveal delay={240}>
        <BootcampsCarousel />
      </Reveal>
      <Reveal delay={280}>
        <CTABanner 
          title={ctaData.title}
          description={ctaData.description}
          buttonText={ctaData.buttonText}
          buttonLink={ctaData.buttonLink}
          backgroundImage={ctaData.backgroundImage}
        />
      </Reveal>
      <Reveal delay={320}>
        <TestimonialCarousel />
      </Reveal>
      <Reveal delay={360}>
        <PressReleases />
      </Reveal>
    </main>
  )
}
