import DonateClient from "./DonateClient"
import client from "../../../tina/__generated__/client"

export default async function DonatePage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "donate.json" }
  
  try {
    const res = await client.queries.donate(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching donate data:", error)
  }

  return (
    <DonateClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}