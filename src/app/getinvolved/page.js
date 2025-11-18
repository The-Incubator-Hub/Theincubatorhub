import GetInvolvedSection from "@/components/get-involved-components/GetInvolvedSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"
export default function GetInvolvedPage() {
    return (
        <div className="mt-16 md:mt-18">
            <HeaderCareer />
            <GetInvolvedSection />
            <CTABanner />
            <div className="h-16"></div>
        </div>
    )
}