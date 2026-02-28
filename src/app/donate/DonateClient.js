"use client";

import { useTina } from "tinacms/dist/react";

import BankTransferSection from "@/components/donate-components/BankTransferSection";
import DonateSection from "@/components/donate-components/DonateSection";
import DonationForm from "@/components/donate-components/DonationForm";
import PartnershipSection from "@/components/donate-components/PartnershipSection";
import VolunteersSection from "@/components/donate-components/volunteersSection";
import CTABanner from "@/components/landing-page-components/CtaBanner";

export default function DonateClient({ initialData, query, variables }) {
  const { data } = useTina({
    query,
    variables,
    data: initialData,
  });

  const donateData = data?.donate || {};

  const donateSectionData = donateData.donateSection || {};
  const volunteersData = donateData.volunteers || {};
  const partnershipData = donateData.partnership || {};
  const donationFormData = donateData.donationForm || {};
  const bankTransferData = donateData.bankTransfer || {};
  const ctaBannerData = donateData.ctaBanner || {};

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

      <VolunteersSection
        title={volunteersData.title}
        description={volunteersData.description}
        buttonText={volunteersData.buttonText}
        buttonLink={volunteersData.buttonLink}
      />

      <PartnershipSection
        title={partnershipData.title}
        intro={partnershipData.intro}
        points={partnershipData.points}
        benefitsTitle={partnershipData.benefitsTitle}
        benefits={partnershipData.benefits}
        opportunitiesTitle={partnershipData.opportunitiesTitle}
        opportunities={partnershipData.opportunities}
        buttonText={partnershipData.buttonText}
        buttonLink={partnershipData.buttonLink}
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
        buttonLink={ctaBannerData.buttonLink || "/contact"}
        backgroundImage={ctaBannerData.backgroundImage}
      />

      <div className="h-16" />
    </div>
  );
}