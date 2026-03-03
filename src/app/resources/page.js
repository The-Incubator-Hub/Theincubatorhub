import ResourcesClient from "./ResourcesClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Resources",
  description:
    "Access curated learning resources, guides, and tools to accelerate your growth in tech.",
  path: "/resources",
})

export default async function ResourcesPage() {
  const { data } = await loadSingletonPage({
    collection: "resources",
    fileName: "resources.json",
    rootKey: "resources",
  })

  return (
    <ResourcesClient 
      initialData={data}
    />
  )
}
