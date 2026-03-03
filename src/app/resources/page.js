import ResourcesClient from "./ResourcesClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Resources",
  description:
    "Access curated learning resources, guides, and tools to accelerate your growth in tech.",
  path: "/resources",
})

export default async function ResourcesPage() {
  const variables = { relativePath: "resources.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.resources(vars),
    variables,
    fallbackCollection: "resources",
    fallbackFile: "resources.json",
    rootKey: "resources",
    context: "resources-page",
  })

  return (
    <ResourcesClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
