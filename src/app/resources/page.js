import ResourcesClient from "./ResourcesClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

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
