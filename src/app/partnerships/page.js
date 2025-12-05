'use client';

import PartnershipsSection from "@/components/PartnershipsSection.js";
import PartnershipBenefits from "@/components/PartnershipBenefits.js";
import PartnerLogos from "@/components/PartnerLogos.js";
import TeamIntro from "@/components/TeamIntro.js";
export default function PartnershipsPage() {
  return (
    <div>
      <PartnershipsSection />
      <TeamIntro />
      <PartnershipBenefits />
      <TeamIntro />
      <PartnerLogos />
    </div>
  );
}

