'use client'
import ProgramHeader from "@/components/program-components/ProgramHeader"
import LearningPathway from "@/components/program-components/LearningPathway"
import VideoSection from "@/components/program-components/VideoSection"
import GalleryPreview from "@/components/program-components/GalleryPreview"
import Partners from "@/components/program-components/Partners"    
import CTABanner from "@/components/landing-page-components/CtaBanner"
import Testimonials from "@/components/program-components/Testimonial"

export default function ProgramsPage() {
    const galleryImages = [
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
      ];
    
      const handlePrev = () => {
        // Optional: Implement carousel logic (e.g., using state to shift the images array)
        console.log('Navigate to previous set of images');
      };
    
      const handleNext = () => {
        // Optional: Implement carousel logic
        console.log('Navigate to next set of images');
      };
    return (
        <div className="mt-16 md:mt-18">
            <ProgramHeader />
            <LearningPathway />
            <VideoSection />
            <Partners />
            <GalleryPreview 
            title="Future Clan Bootcamp Gallery"
            subtitle="Watch video highlights of future clan bootcamp 2024 through our lens"
            images={galleryImages}
            onPrev={handlePrev}
            onNext={handleNext}
            />
            <Testimonials />
            <CTABanner />
        </div>
    )
}