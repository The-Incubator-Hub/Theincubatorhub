import { redirect } from 'next/navigation'

export default function ProgramsPage() {
  // Redirect to home page - we only use individual program pages
  redirect('/')
}