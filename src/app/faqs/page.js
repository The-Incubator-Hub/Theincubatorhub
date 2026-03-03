import FAQsClient from "./FAQsClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about The Incubator Hub programs, admissions, support, and participation.",
  path: "/faqs",
})

export default async function Page() {
  const variables = { relativePath: "faqs.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.faqs(vars),
    variables,
    fallbackCollection: "faqs",
    fallbackFile: "faqs.json",
    rootKey: "faqs",
    context: "faqs-page",
  })

  return (
    <FAQsClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}   
