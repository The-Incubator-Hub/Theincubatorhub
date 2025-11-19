import HomeClient from "./HomeClient"
import client from "../../tina/__generated__/client"

export default async function Home() {
  let data = {}
  let query = {}
  let variables = { relativePath: "home.json" }
  
  try {
    const res = await client.queries.home(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching home data:", error)
  }

  return (
    <HomeClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}
