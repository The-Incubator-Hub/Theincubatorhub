import PressClient from "./PressClient"
import client from "../../../tina/__generated__/client"

export default async function PressPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "press.json" }
  
  try {
    const res = await client.queries.press(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching press data:", error)
  }

  return (
    <PressClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}