"use client"

import { useTina } from "tinacms/dist/react"
import DonateSection from "@/components/donate-components/DonateSection"
import DonationForm from "@/components/donate-components/DonationForm"
import BankTransferSection from "@/components/donate-components/BankTransferSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"

export default function DonateClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const donateData = data?.donate || {}
  const donateSectionData = donateData.donateSection || {}
  const donationFormData = donateData.donationForm || {}
  const bankTransferData = donateData.bankTransfer || {}
  const ctaBannerData = donateData.ctaBanner || {}

  return (
    <div className="mt-16 md:mt-18">
      <DonateSection 
        heading={donateSectionData.heading}
        highlightedText={donateSectionData.highlightedText}
        description={donateSectionData.description}
        technologies={donateSectionData.technologies}
        stats={donateSectionData.stats}
        studentsImpacted={donateSectionData.studentsImpacted}
        image={donateSectionData.image}
      />
      <DonationForm 
        title={donationFormData.title}
        description={donationFormData.description}
        buttonText={donationFormData.buttonText}
      />
      <BankTransferSection 
        title={bankTransferData.title}
        description={bankTransferData.description}
        nairaAccount={bankTransferData.nairaAccount}
        usdAccount={bankTransferData.usdAccount}
      />
      <CTABanner 
        title={ctaBannerData.title}
        description={ctaBannerData.description}
        buttonText={ctaBannerData.buttonText}
        backgroundImage={ctaBannerData.backgroundImage}
      />
      <div className="h-16"></div>
    </div>
  )
}

