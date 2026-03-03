import GetInvolvedClient from "./GetInvolvedClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Get Involved",
  description:
    "Volunteer, partner, mentor, or support programs that expand access to tech opportunities across Africa.",
  path: "/getinvolved",
})

export default async function GetInvolvedPage() {
  const { data } = await loadSingletonPage({
    collection: "getinvolved",
    fileName: "getinvolved.json",
    rootKey: "getinvolved",
  })

  return (
    <GetInvolvedClient 
      initialData={data}
    />
  )
}
