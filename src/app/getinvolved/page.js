import GetInvolvedClient from "./GetInvolvedClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Get Involved",
  description:
    "Volunteer, partner, mentor, or support programs that expand access to tech opportunities across Africa.",
  path: "/getinvolved",
})

export default async function GetInvolvedPage() {
  const variables = { relativePath: "getinvolved.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.getinvolved(vars),
    variables,
    fallbackCollection: "getinvolved",
    fallbackFile: "getinvolved.json",
    rootKey: "getinvolved",
    context: "getinvolved-page",
  })

  return (
    <GetInvolvedClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
