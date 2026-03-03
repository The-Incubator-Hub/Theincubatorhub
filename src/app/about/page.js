import AboutClient from "./AboutClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about The Incubator Hub mission, values, and impact in building Africa's next generation of tech talent.",
  path: "/about",
})

export default async function AboutPage() {
  const { data } = await loadSingletonPage({
    collection: "about",
    fileName: "about.json",
    rootKey: "about",
  })

  return (
    <AboutClient 
      initialData={data}
    />
  )
}
