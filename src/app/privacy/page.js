import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for The Incubator Hub website.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-28">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Privacy Policy
      </h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        We only collect information needed to provide responses and services you
        request.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        We do not sell your personal information, and we use reasonable
        safeguards to protect data shared through this website.
      </p>
      <p className="text-gray-700 leading-relaxed">
        For privacy questions, contact us through the contact page.
      </p>
    </main>
  );
}
