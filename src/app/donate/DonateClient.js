"use client";


import BankTransferSection from "@/components/donate-components/BankTransferSection";
import DonateSection from "@/components/donate-components/DonateSection";
import DonationForm from "@/components/donate-components/DonationForm";
import PartnershipSection from "@/components/donate-components/PartnershipSection";
import VolunteersSection from "@/components/donate-components/VolunteersSection";
import CTABanner from "@/components/landing-page-components/CtaBanner";
import Reveal from "@/components/motion/Reveal";

export default function DonateClient({ initialData }) {
  const data = initialData || {};

  const donateData = data?.donate || {};

  const donateSectionData = donateData.donateSection || {};
  const volunteersData = donateData.volunteers || {};
  const partnershipData = donateData.partnership || {};
  const donationFormData = donateData.donationForm || {};
  const bankTransferData = donateData.bankTransfer || {};
  const ctaBannerData = donateData.ctaBanner || {};

  return (
    <div className="mt-16 md:mt-18">
      <Reveal>
        <DonateSection
          heading={donateSectionData.heading}
          highlightedText={donateSectionData.highlightedText}
          description={donateSectionData.description}
          technologies={donateSectionData.technologies}
          stats={donateSectionData.stats}
          studentsImpacted={donateSectionData.studentsImpacted}
          image={donateSectionData.image}
        />
      </Reveal>

      <Reveal delay={80}>
        <VolunteersSection
          title={volunteersData.title}
          description={volunteersData.description}
          buttonText={volunteersData.buttonText}
          buttonLink={volunteersData.buttonLink}
        />
      </Reveal>

      <Reveal delay={120}>
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
      </Reveal>

      <Reveal delay={160}>
        <DonationForm
          title={donationFormData.title}
          description={donationFormData.description}
          buttonText={donationFormData.buttonText}
        />
      </Reveal>

      <Reveal delay={200}>
        <BankTransferSection
          title={bankTransferData.title}
          description={bankTransferData.description}
          nairaAccount={bankTransferData.nairaAccount}
          usdAccount={bankTransferData.usdAccount}
        />
      </Reveal>

      <Reveal delay={240}>
        <CTABanner
          title={ctaBannerData.title}
          description={ctaBannerData.description}
          buttonText={ctaBannerData.buttonText}
          buttonLink={ctaBannerData.buttonLink || "/contact"}
          backgroundImage={ctaBannerData.backgroundImage}
        />
      </Reveal>

      <div className="h-16" />
    </div>
  );
}
