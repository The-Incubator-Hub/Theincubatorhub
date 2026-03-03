import HomeClient from "./HomeClient"
import client from "../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

export default async function Home() {
  const variables = { relativePath: "home.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.home(vars),
    variables,
    fallbackCollection: "home",
    fallbackFile: "home.json",
    rootKey: "home",
    context: "home-page",
  })

  return (
    <HomeClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
