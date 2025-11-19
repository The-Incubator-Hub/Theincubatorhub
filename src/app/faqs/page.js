import FAQsClient from "./FAQsClient"
import client from "../../../tina/__generated__/client"

export default async function Page() {
  let data = {}
  let query = {}
  let variables = { relativePath: "faqs.json" }
  
  try {
    const res = await client.queries.faqs(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching FAQs data:", error)
  }

  return (
    <FAQsClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}   

