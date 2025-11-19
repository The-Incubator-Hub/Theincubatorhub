import ContactClient from "./ContactClient"
import client from "../../../tina/__generated__/client"

export default async function ContactPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "contact.json" }
  
  try {
    const res = await client.queries.contact(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching contact data:", error)
  }

  return (
    <ContactClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}