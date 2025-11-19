"use client"

import { useTina } from "tinacms/dist/react"
import ContactSection from "@/components/contact-components/ContactSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"

export default function ContactClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const contactData = data?.contact || {}
  const headerData = contactData.header || {}
  const contactSectionData = contactData.contactSection || {}
  const ctaBannerData = contactData.ctaBanner || {}

  return (
    <div>
      <HeaderCareer 
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <ContactSection 
        title={contactSectionData.title}
        description={contactSectionData.description}
        email={contactSectionData.email}
        phone={contactSectionData.phone}
        addressLine1={contactSectionData.addressLine1}
        addressLine2={contactSectionData.addressLine2}
        socialMedia={contactSectionData.socialMedia || {}}
      />
      <CTABanner 
        title={ctaBannerData.title}
        description={ctaBannerData.description}
        buttonText={ctaBannerData.buttonText}
        backgroundImage={ctaBannerData.backgroundImage}
      />
    </div>
  )
}

