import GalleryClient from "./GalleryClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"

export default async function GalleryPage() {
  const variables = { relativePath: "gallery.json" }
  const { data, query, variables: resolvedVariables } = await loadTinaSingleton({
    queryFn: (vars) => client.queries.gallery(vars),
    variables,
    fallbackCollection: "gallery",
    fallbackFile: "gallery.json",
    rootKey: "gallery",
    context: "gallery-page",
  })

  return (
    <GalleryClient 
      initialData={data}
      query={query}
      variables={resolvedVariables}
    />
  )
} 
