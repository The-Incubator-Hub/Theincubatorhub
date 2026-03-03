import PartnershipsClient from "./PartnershipsClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Partnerships",
  description:
    "Partner with The Incubator Hub to co-create programs, sponsor training, and scale measurable social impact.",
  path: "/partnerships",
})

export default async function PartnershipsPage() {
  const variables = { relativePath: "partnerships.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.partnerships(vars),
    variables,
    fallbackCollection: "partnerships",
    fallbackFile: "partnerships.json",
    rootKey: "partnerships",
    context: "partnerships-page",
  })

  return (
    <PartnershipsClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
