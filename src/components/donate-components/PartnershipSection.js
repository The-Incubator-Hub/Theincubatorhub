"use client";

import Link from "next/link";

export default function PartnershipSection({
  title = "Partnership & Sponsorship",
  intro = "Join us in shaping the future of technology. The Incubator Hub is dedicated to empowering individuals with digital skills. Partner with us to:",
  points = [
    "Sponsor a Training: Invest in a specific program that aligns with your goals.",
    "Support a Course: Contribute to the development and delivery of a course.",
    "Provide Scholarships: Help individuals access our programs.",
    "Donate Training Gadgets: Equip our trainees with essential tools.",
    "Become a partner.",
  ],
  benefitsTitle = "Benefits",
  benefits = ["Brand Recognition: Increase your visibility.", "Skill Development: Contribute to a skilled workforce.", "Community Impact: Make a positive difference."],
  opportunitiesTitle = "Opportunities of Partnerships / Sponsorship",
  opportunities = [
    "Being a brand of reckoning with Incubator",
    "Achieving the vision of training 5,000 people in the locality",
    "Positioning as one of the tech sponsors",
    "Creating an avenue of building the future from now",
  ],
  buttonText = "Partner With Us →",
  buttonLink = "/partnerships",
}) {
  return (
    <section className="bg-gray-50 py-18 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white border shadow-sm p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{intro}</p>

              <ul className="mt-6 space-y-3 text-gray-700">
                {points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href={buttonLink}
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
                >
                  {buttonText}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-gray-50 border p-6">
                <h3 className="font-semibold text-gray-900">{benefitsTitle}</h3>
                <ul className="mt-3 space-y-2 text-gray-700">
                  {benefits.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-gray-50 border p-6">
                <h3 className="font-semibold text-gray-900">{opportunitiesTitle}</h3>
                <ol className="mt-3 space-y-2 text-gray-700 list-decimal list-inside">
                  {opportunities.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}