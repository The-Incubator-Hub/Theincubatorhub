import HeroSection from "@/components/HeroSection"
import AboutIncubator from "@/components/AboutIncubator"
import TrustedOrganizations from "@/components/TrustedOrganizations"
import WhyIncubator from "@/components/WhyIncubator"
import Statistics from "@/components/Statistics"
import BootcampsCarousel from "@/components/BootcampsCarousel"
import CTABanner from "@/components/CtaBanner"
import TestimonialCarousel from "@/components/TestimonialCarousel"
import PressReleases from "@/components/PressReleases"
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
