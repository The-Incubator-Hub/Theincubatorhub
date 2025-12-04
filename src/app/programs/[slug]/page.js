import ProgramPageClient from "./ProgramPageClient"
import client from "../../../../tina/__generated__/client"

export async function generateStaticParams() {
  try {
    const programsListData = await client.queries.programPageConnection()
    return programsListData.data.programPageConnection.edges.map((program) => ({
      slug: program.node.slug || program.node._sys.filename.replace('.json', ''),
    }))
  } catch (error) {
    console.error("Error generating static params for programs:", error)
    return []
  }
}

export default async function ProgramPage({ params }) {
  let data = {}
  let query = {}
  let variables = {}

  try {
    // Get the slug from params
    const slug = params.slug
    
    // First, get all programs to find the one with matching slug
    const programsListData = await client.queries.programPageConnection()
    const program = programsListData.data.programPageConnection.edges.find(
      (edge) => (edge.node.slug || edge.node._sys.filename.replace('.json', '')) === slug
    )

    if (program) {
      const relativePath = `${program.node._sys.filename}`
      variables = { relativePath }
      const res = await client.queries.programPage(variables)
      query = res.query
      data = res.data
      variables = res.variables
    }
  } catch (error) {
    console.error("Error fetching program data:", error)
  }

  return (
    <ProgramPageClient 
      initialData={data}
      query={query}
      variables={variables}
    />
  )
}

