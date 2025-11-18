import NewsSection from "@/components/press-release-components/NewsSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"
export default function PressPage() {
    return (
        <div className="mt-16 md:mt-18">
            <HeaderCareer />
            <NewsSection />
            <CTABanner />
        </div>
    )
}