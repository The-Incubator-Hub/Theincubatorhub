import FAQsClient from "./FAQsClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about The Incubator Hub programs, admissions, support, and participation.",
  path: "/faqs",
})

export default async function Page() {
  const { data } = await loadSingletonPage({
    collection: "faqs",
    fileName: "faqs.json",
    rootKey: "faqs",
  })

  return (
    <FAQsClient 
      initialData={data}
    />
  )
}   
