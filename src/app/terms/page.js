import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Terms and conditions for using The Incubator Hub website.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-28">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Terms & Conditions
      </h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        By using this website, you agree to use it lawfully and respectfully.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Program details, schedules, and opportunities are provided for
        informational purposes and may change when necessary.
      </p>
      <p className="text-gray-700 leading-relaxed">
        For questions about these terms, contact us through the contact page.
      </p>
    </main>
  );
}
