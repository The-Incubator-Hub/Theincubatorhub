import PartnershipsClient from "./PartnershipsClient"
import client from "../../../tina/__generated__/client"

export default async function PartnershipsPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "partnerships.json" }
  
  try {
    const res = await client.queries.partnerships(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching partnerships data:", error)
  }

  return (
    <PartnershipsClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}
