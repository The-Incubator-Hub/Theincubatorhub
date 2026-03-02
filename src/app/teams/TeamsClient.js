"use client";

import { useTina } from "tinacms/dist/react";
import HeaderCareer from "@/components/HeaderCareer";
import TeamIntro from "@/components/TeamIntro";
import Teamgrid from "@/components/Teamgrid";
import JoinUs from "@/components/JoinUs";

export default function TeamsClient({ initialData, query, variables }) {
  const { data } = useTina({
    query,
    variables,
    data: initialData,
  });

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
      <TeamIntro
        title={teamIntroData.title}
        description={teamIntroData.description}
      />
      <Teamgrid members={teamGridData.members || []} />
      <JoinUs
        title={joinUsData.title}
        description={joinUsData.description}
        ctaText={joinUsData.ctaText}
        ctaLink={joinUsData.ctaLink}
        backgroundImage={joinUsData.backgroundImage}
      />
    </div>
  );
}
