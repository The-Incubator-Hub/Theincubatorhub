import GetInvolvedClient from "./GetInvolvedClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

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
