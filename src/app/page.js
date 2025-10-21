import HeroSection from "@/components/HeroSection"
import AboutIncubator from "@/components/AboutIncubator"
import TrustedOrganizations from "@/components/TrustedOrganizations"
import WhyIncubator from "@/components/WhyIncubator"
import Statistics from "@/components/Statistics"
export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutIncubator />
      <TrustedOrganizations />
      <WhyIncubator />
      <Statistics />  
    </main>
  )
}
