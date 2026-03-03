import PressClient from "./PressClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Press",
  description:
    "Read official announcements, media updates, and milestone stories from The Incubator Hub.",
  path: "/press",
})

export default async function PressPage() {
  const { data } = await loadSingletonPage({
    collection: "press",
    fileName: "press.json",
    rootKey: "press",
  })

  return (
    <PressClient 
      initialData={data}
    />
  )
}
