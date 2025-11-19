import ProgramsClient from "./ProgramsClient"
import client from "../../../tina/__generated__/client"

export default async function ProgramsPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "programs.json" }
  
  try {
    const res = await client.queries.programs(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching programs data:", error)
  }

  return (
    <ProgramsClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}