import GetInvolvedClient from "./GetInvolvedClient"
import client from "../../../tina/__generated__/client"

export default async function GetInvolvedPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "getinvolved.json" }
  
  try {
    const res = await client.queries.getinvolved(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching getinvolved data:", error)
  }

  return (
    <GetInvolvedClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}