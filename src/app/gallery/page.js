'use client'
import PhotoVideoSection from "@/components/gallery-components/PhotoVideoSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"
export default function GalleryPage() {
    return (
        <div>
            <HeaderCareer />
            <PhotoVideoSection />
            <CTABanner />
            <div className="h-16"></div>
        </div>
    )
} 