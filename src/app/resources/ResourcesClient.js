"use client"

import { useTina } from "tinacms/dist/react"
import LearningResources from "@/components/learning.js"
import ViewResources from "@/components/ViewResources.js"
import JoinUs from "@/components/JoinUs.js"
import Reveal from "@/components/motion/Reveal"

export default function ResourcesClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const resourcesData = data?.resources || {}
  const learningResourcesData = resourcesData.learningResources || {}
  const viewResourcesData = resourcesData.viewResources || {}
  const joinUsData = resourcesData.joinUs || {}

  return (
    <div>
      <Reveal>
        <LearningResources 
          title={learningResourcesData.title}
          description={learningResourcesData.description}
          searchPlaceholder={learningResourcesData.searchPlaceholder}
          resources={learningResourcesData.resources}
        />
      </Reveal>
      <Reveal delay={80}>
        <ViewResources 
          resourceCards={viewResourcesData.resourceCards}
        />
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
  )
}
