import TeamsClient from "./TeamsClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the team behind The Incubator Hub and the people driving tech empowerment across Africa.",
  path: "/teams",
})

export default async function TeamsPage() {
  const { data } = await loadSingletonPage({
    collection: "teams",
    fileName: "teams.json",
    rootKey: "teams",
  })

  return (
    <TeamsClient 
      initialData={data}
    />
  )
}
