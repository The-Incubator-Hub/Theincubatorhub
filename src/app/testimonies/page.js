import TestimoniesClient from "./TestimoniesClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

export default async function TestimoniesPage() {
  const variables = { relativePath: "testimonies.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.testimonies(vars),
    variables,
    fallbackCollection: "testimonies",
    fallbackFile: "testimonies.json",
    rootKey: "testimonies",
    context: "testimonies-page",
  })

  return (
    <TestimoniesClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
