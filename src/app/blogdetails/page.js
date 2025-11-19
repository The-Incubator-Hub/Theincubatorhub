// This page is now handled by the dynamic route at /blogdetails/[slug]
// Redirect to blog listing or show a message
import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/blog')
}
