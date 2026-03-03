import HomeClient from "./HomeClient"
import client from "../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Practical Tech Training and Mentorship",
  description:
    "Build in-demand tech skills through practical training, mentorship, and career support at The Incubator Hub.",
  path: "/",
})

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
