"use client"

import { useTina } from "tinacms/dist/react"
import ContactSection from "@/components/contact-components/ContactSection"
import CTABanner from "@/components/landing-page-components/CtaBanner"
import HeaderCareer from "@/components/HeaderCareer"
import Reveal from "@/components/motion/Reveal"

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
      <Reveal>
        <ContactSection 
          title={contactSectionData.title}
          description={contactSectionData.description}
          reachOutTitle={contactSectionData.reachOutTitle}
          reachOutItems={contactSectionData.reachOutItems || []}
          email={contactSectionData.email}
          phone={contactSectionData.phone}
          addressLine1={contactSectionData.addressLine1}
          addressLine2={contactSectionData.addressLine2}
          contactLabels={contactSectionData.contactLabels || {}}
          socialTitle={contactSectionData.socialTitle}
          socialDescription={contactSectionData.socialDescription}
          socialMedia={contactSectionData.socialMedia || {}}
          formLabels={contactSectionData.formLabels || {}}
        />
      </Reveal>
      <Reveal delay={80}>
        <CTABanner 
          title={ctaBannerData.title}
          description={ctaBannerData.description}
          buttonText={ctaBannerData.buttonText}
          buttonLink={ctaBannerData.buttonLink}
          backgroundImage={ctaBannerData.backgroundImage}
        />
      </Reveal>
    </div>
  )
}
