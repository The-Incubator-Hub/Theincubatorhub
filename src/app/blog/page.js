import BlogClient from "./BlogClient"
import client from "../../../tina/__generated__/client"

export default async function Page() {
  let data = {}
  let query = {}
  let variables = { relativePath: "blog.json" }
  
  try {
    const res = await client.queries.blog(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching blog data:", error)
  }

  return (
    <BlogClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}


  