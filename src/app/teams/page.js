import TeamsClient from "./TeamsClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the team behind The Incubator Hub and the people driving tech empowerment across Africa.",
  path: "/teams",
})

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
