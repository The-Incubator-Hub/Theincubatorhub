import GalleryClient from "./GalleryClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "View photos and videos from The Incubator Hub trainings, events, and community impact activities.",
  path: "/gallery",
})

export default async function GalleryPage() {
  const { data } = await loadSingletonPage({
    collection: "gallery",
    fileName: "gallery.json",
    rootKey: "gallery",
  })

  return (
    <GalleryClient 
      initialData={data}
    />
  )
} 
