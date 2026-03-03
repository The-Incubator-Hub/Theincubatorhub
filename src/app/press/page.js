import PressClient from "./PressClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Press",
  description:
    "Read official announcements, media updates, and milestone stories from The Incubator Hub.",
  path: "/press",
})

export default async function PressPage() {
  const variables = { relativePath: "press.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.press(vars),
    variables,
    fallbackCollection: "press",
    fallbackFile: "press.json",
    rootKey: "press",
    context: "press-page",
  })

  return (
    <PressClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
