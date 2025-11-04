"use client"

import { Button } from "@/components/ui/button"
import PressReleaseCard from "./PressReleaseCard"

export default function PressReleases() {
  const releases = [
    {
      id: 1,
      image: "/skillup.jpg",
      category: "Podcast",
      title: "Digital Skillup Africa Initiative Receives $4M Funding",
      description:
        "Unlocking opportunities across Africa, gender-inclusive communities access to expertise, gender-inclusive learning environment. Join us in this exciting journey to elevate your tech skills.",
      date: "25 December 2025",
    },
    {
      id: 2,
      image: "/ainow.png",
      category: "Podcast",
      title: "Digital Skillup Africa commerce with AI Tech Transformation",
      description:
        "A significant milestone in promoting gender diversity in tech. Our latest initiative aims to empower women in the tech industry with cutting-edge skills and mentorship.",
      date: "7 August 2025",
    },
    {
      id: 3,
      image: "/ladies.jpg",
      category: "Announcement",
      title: "Ladies In Tech Africa Celebrates 1000+ Female Graduates",
      description:
        "A significant milestone in promoting gender diversity in tech. Our latest initiative aims to empower women in the tech industry with cutting-edge skills and mentorship.",
      date: "12 December 2025",
    },
  ]

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">Latest Press Release</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Sed non-phasellus felis. In ultricies neque. Phasellus vitae semper turpis, ac imperdiet orci commodo id.
            Aenean lobortis justo sit amet ornare malesuada.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-14">
          {releases.map((release) => (
            <PressReleaseCard key={release.id} release={release} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button className="bg-black hover:bg-gray-900 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors">
            View All Press Release →
          </Button>
        </div>
      </div>
    </section>
  )
}
