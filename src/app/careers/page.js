import CareersClient from "./CareersClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

export default async function Page() {
  const variables = { relativePath: "careers.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.careers(vars),
    variables,
    fallbackCollection: "careers",
    fallbackFile: "careers.json",
    rootKey: "careers",
    context: "careers-page",
  })

  return (
    <CareersClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
