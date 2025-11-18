import TeamsClient from "./TeamsClient"
import client from "../../../tina/__generated__/client"

export default async function TeamsPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "teams.json" }
  
  try {
    const res = await client.queries.teams(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching teams data:", error)
    // Return empty data if fetch fails - this allows the page to still render
  }

  return (
    <TeamsClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}
