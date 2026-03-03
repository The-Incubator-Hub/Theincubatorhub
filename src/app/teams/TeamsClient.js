"use client";

import HeaderCareer from "@/components/HeaderCareer";
import TeamIntro from "@/components/TeamIntro";
import Teamgrid from "@/components/Teamgrid";
import JoinUs from "@/components/JoinUs";
import Reveal from "@/components/motion/Reveal";

export default function TeamsClient({ initialData }) {
  const data = initialData || {};

  const teamsData = data?.teams || {};
  const headerData = teamsData.header || {};
  const teamIntroData = teamsData.teamIntro || {};
  const teamGridData = teamsData.teamGrid || {};
  const joinUsData = teamsData.joinUs || {};

  return (
    <div>
      <HeaderCareer
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <Reveal>
        <TeamIntro
          title={teamIntroData.title}
          description={teamIntroData.description}
        />
      </Reveal>
      <Reveal delay={80}>
        <Teamgrid members={teamGridData.members || []} />
      </Reveal>
      <Reveal delay={120}>
        <JoinUs
          title={joinUsData.title}
          description={joinUsData.description}
          ctaText={joinUsData.ctaText}
          ctaLink={joinUsData.ctaLink}
          backgroundImage={joinUsData.backgroundImage}
        />
      </Reveal>
    </div>
  );
}
