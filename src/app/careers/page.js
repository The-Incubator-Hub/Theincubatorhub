import CareersClient from "./CareersClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join The Incubator Hub team and help shape opportunities for emerging tech talent across Africa.",
  path: "/careers",
})

export default async function Page() {
  const { data } = await loadSingletonPage({
    collection: "careers",
    fileName: "careers.json",
    rootKey: "careers",
  })

  return (
    <CareersClient 
      initialData={data}
    />
  )
}
