import { redirect } from 'next/navigation'
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Programs",
  description: "Browse technology training programs from The Incubator Hub.",
  path: "/programs",
  noIndex: true,
})

export default function ProgramsPage() {
  // Redirect to home page - we only use individual program pages
  redirect('/')
}
