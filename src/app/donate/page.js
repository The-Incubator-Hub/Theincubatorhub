import DonateClient from "./DonateClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

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
