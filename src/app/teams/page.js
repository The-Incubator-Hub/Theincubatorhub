import TeamsClient from "./TeamsClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

export default async function TeamsPage() {
  const variables = { relativePath: "teams.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.teams(vars),
    variables,
    fallbackCollection: "teams",
    fallbackFile: "teams.json",
    rootKey: "teams",
    context: "teams-page",
  })

  return (
    <TeamsClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
