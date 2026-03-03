import TestimoniesClient from "./TestimoniesClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Testimonies",
  description:
    "Read testimonials from learners and partners transformed by The Incubator Hub programs.",
  path: "/testimonies",
})

export default async function TestimoniesPage() {
  const { data } = await loadSingletonPage({
    collection: "testimonies",
    fileName: "testimonies.json",
    rootKey: "testimonies",
  })

  return (
    <TestimoniesClient 
      initialData={data}
    />
  )
}
