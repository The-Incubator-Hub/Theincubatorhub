"use client"

import { useTina } from "tinacms/dist/react"
import LearningResources from "@/components/learning.js"
import ViewResources from "@/components/ViewResources.js"
import JoinUs from "@/components/JoinUs.js"

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
      <LearningResources 
        title={learningResourcesData.title}
        description={learningResourcesData.description}
        searchPlaceholder={learningResourcesData.searchPlaceholder}
        resources={learningResourcesData.resources}
      />
      <ViewResources 
        resourceCards={viewResourcesData.resourceCards}
      />
      <JoinUs 
        title={joinUsData.title}
        description={joinUsData.description}
        ctaText={joinUsData.ctaText}
        ctaLink={joinUsData.ctaLink}
        backgroundImage={joinUsData.backgroundImage}
      />
    </div>
  )
}

