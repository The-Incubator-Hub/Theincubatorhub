import HomeClient from "./HomeClient"
import { loadSingletonPage } from "@/lib/content-loader.mjs"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Practical Tech Training and Mentorship",
  description:
    "Build in-demand tech skills through practical training, mentorship, and career support at The Incubator Hub.",
  path: "/",
})

export default async function Home() {
  const { data } = await loadSingletonPage({
    collection: "home",
    fileName: "home.json",
    rootKey: "home",
  })

  return (
    <HomeClient 
      initialData={data}
    />
  )
}
