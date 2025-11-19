import GalleryClient from "./GalleryClient"
import client from "../../../tina/__generated__/client"

export default async function GalleryPage() {
  let data = {}
  let query = {}
  let variables = { relativePath: "gallery.json" }
  
  try {
    const res = await client.queries.gallery(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch (error) {
    console.error("Error fetching gallery data:", error)
  }

  return (
    <GalleryClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
} 