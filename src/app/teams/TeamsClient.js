"use client"

import { useTina } from "tinacms/dist/react"
import Header from "@/components/Header.js";
import TeamIntro from "@/components/TeamIntro.js";
import Teamgrid from "@/components/Teamgrid.js";
import JoinUs from "@/components/JoinUs.js"

export default function TeamsClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const teamsData = data?.teams || {}

  return (
    <div>
      <Header 
        title={teamsData.header?.title}
        description={teamsData.header?.description}
        backgroundImage={teamsData.header?.backgroundImage}
      />
      <TeamIntro 
        title={teamsData.teamIntro?.title}
        description={teamsData.teamIntro?.description}
      />
      <Teamgrid 
        members={teamsData.teamGrid?.members}
      />
      <JoinUs 
        title={teamsData.joinUs?.title}
        description={teamsData.joinUs?.description}
        ctaText={teamsData.joinUs?.ctaText}
        ctaLink={teamsData.joinUs?.ctaLink}
        backgroundImage={teamsData.joinUs?.backgroundImage}
      />
    </div>
  );
}


