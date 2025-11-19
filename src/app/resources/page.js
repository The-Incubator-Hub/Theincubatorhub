import ResourcesClient from "./ResourcesClient"
import client from "../../../tina/__generated__/client"

export default async function ResourcesPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "resources.json" }
  
  try {
    const res = await client.queries.resources(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching resources data:", error)
  }

  return (
    <ResourcesClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}
