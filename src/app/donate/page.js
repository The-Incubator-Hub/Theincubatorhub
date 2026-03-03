import DonateClient from "./DonateClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Donate",
  description:
    "Support scholarships, training programs, and community impact initiatives at The Incubator Hub.",
  path: "/donate",
})

export default async function DonatePage() {
  const { data } = await loadSingletonPage({
    collection: "donate",
    fileName: "donate.json",
    rootKey: "donate",
  })

  return (
    <DonateClient 
      initialData={data}
    />
  )
}
