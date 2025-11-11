import HeroSection from "@/components/landing-page-components/HeroSection"
import AboutIncubator from "@/components/landing-page-components/AboutIncubator"
import TrustedOrganizations from "@/components/landing-page-components/TrustedOrganizations"
import WhyIncubator from "@/components/landing-page-components/WhyIncubator"
import Statistics from "@/components/landing-page-components/Statistics"
import BootcampsCarousel from "@/components/landing-page-components/BootcampsCarousel"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import TestimonialCarousel from "@/components/landing-page-components/TestimonialCarousel"
import PressReleases from "@/components/landing-page-components/PressReleases"
export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutIncubator />
      <TrustedOrganizations />
      <WhyIncubator />
      <Statistics />  
      <BootcampsCarousel />
      <CTABanner />
      <TestimonialCarousel />
      <PressReleases />
    </main>
  )
}
