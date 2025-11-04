"use client"

import { Calendar } from "lucide-react"
import Image from "next/image"

export default function PressReleaseCard({ release }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 md:h-56 w-full">
        <Image src={release.image || "/placeholder.svg"} alt={release.title} fill className="object-cover" />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {release.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-black mb-3 line-clamp-2">{release.title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">{release.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
            <Calendar className="w-4 h-4" />
            {release.date}
          </div>
          <a
            href="#"
            className="text-green-600 hover:text-green-700 font-semibold text-sm md:text-base transition-colors"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  )
}
