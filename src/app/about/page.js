import AboutClient from "./AboutClient"
import client from "../../../tina/__generated__/client"

export default async function AboutPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "about.json" }
  
  try {
    const res = await client.queries.about(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching about data:", error)
  }

  return (
    <AboutClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}
