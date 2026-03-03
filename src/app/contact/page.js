import ContactClient from "./ContactClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

export default async function ContactPage() {
  const variables = { relativePath: "contact.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.contact(vars),
    variables,
    fallbackCollection: "contact",
    fallbackFile: "contact.json",
    rootKey: "contact",
    context: "contact-page",
  })

  return (
    <ContactClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
}
