import FAQsClient from "./FAQsClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

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
