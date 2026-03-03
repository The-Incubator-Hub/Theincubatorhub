import DonateClient from "./DonateClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Donate",
  description:
    "Support scholarships, training programs, and community impact initiatives at The Incubator Hub.",
  path: "/donate",
})

export default async function DonatePage() {
  const variables = { relativePath: "donate.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.donate(vars),
    variables,
    fallbackCollection: "donate",
    fallbackFile: "donate.json",
    rootKey: "donate",
    context: "donate-page",
  })

  return (
    <DonateClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
