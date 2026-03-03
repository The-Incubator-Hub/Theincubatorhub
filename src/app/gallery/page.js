import GalleryClient from "./GalleryClient"
import client from "../../../tina/__generated__/client"
import { loadTinaSingleton } from "@/lib/tina-fallback.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "View photos and videos from The Incubator Hub trainings, events, and community impact activities.",
  path: "/gallery",
})

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
