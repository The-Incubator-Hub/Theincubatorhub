import TestimoniesClient from "./TestimoniesClient"
import client from "../../../tina/__generated__/client"

export default async function TestimoniesPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "testimonies.json" }
  
  try {
    const res = await client.queries.testimonies(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching testimonies data:", error)
  }

  return (
    <TestimoniesClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}
