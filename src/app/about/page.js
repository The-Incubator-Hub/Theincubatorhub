import AboutClient from "./AboutClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

export default async function AboutPage() {
  const variables = { relativePath: "about.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.about(vars),
    variables,
    fallbackCollection: "about",
    fallbackFile: "about.json",
    rootKey: "about",
    context: "about-page",
  })

  return (
    <AboutClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
