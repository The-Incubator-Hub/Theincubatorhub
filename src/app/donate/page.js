import DonateSection from "@/components/donate-components/DonateSection"
import DonationForm from "@/components/donate-components/DonationForm"
import BankTransferSection from "@/components/donate-components/BankTransferSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
export default function DonatePage() {
    return (
        <div>
            <DonateSection />
            <DonationForm />
            <BankTransferSection />
            <CTABanner />
            <div className="h-16"></div>
        </div>
    )
}