import PartnershipsClient from "./PartnershipsClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Partnerships",
  description:
    "Partner with The Incubator Hub to co-create programs, sponsor training, and scale measurable social impact.",
  path: "/partnerships",
})

export default async function PartnershipsPage() {
  const { data } = await loadSingletonPage({
    collection: "partnerships",
    fileName: "partnerships.json",
    rootKey: "partnerships",
  })

  return (
    <PartnershipsClient 
      initialData={data}
    />
  )
}
