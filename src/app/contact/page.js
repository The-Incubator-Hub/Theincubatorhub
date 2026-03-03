import ContactClient from "./ContactClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact The Incubator Hub for partnerships, training inquiries, support, and collaboration opportunities.",
  path: "/contact",
})

export default async function ContactPage() {
  const { data } = await loadSingletonPage({
    collection: "contact",
    fileName: "contact.json",
    rootKey: "contact",
  })

  return (
    <ContactClient 
      initialData={data}
    />
  )
}
