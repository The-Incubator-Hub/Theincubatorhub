import PartnershipsClient from "./PartnershipsClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

export default async function PartnershipsPage() {
  const variables = { relativePath: "partnerships.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.partnerships(vars),
    variables,
    fallbackCollection: "partnerships",
    fallbackFile: "partnerships.json",
    rootKey: "partnerships",
    context: "partnerships-page",
  })

  return (
    <PartnershipsClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
