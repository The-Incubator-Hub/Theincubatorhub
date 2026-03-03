// This page is now handled by the dynamic route at /blogdetails/[slug]
// Redirect to blog listing or show a message
import { redirect } from 'next/navigation'
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Blog Details",
  description: "Blog detail page redirect.",
  path: "/blogdetails",
  noIndex: true,
})

export default function Page() {
  redirect('/blog')
}
