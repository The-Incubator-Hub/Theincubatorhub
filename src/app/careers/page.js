import CareersClient from "./CareersClient"
import client from "../../../tina/__generated__/client"

export default async function Page() {
  let data = {}
  let query = {}
  let variables = { relativePath: "careers.json" }
  
  try {
    const res = await client.queries.careers(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching careers data:", error)
  }

  return (
    <CareersClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}