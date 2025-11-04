"use client"

import { Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function BootcampCard({ bootcamp }) {
  return (
    <div className={`${bootcamp.cardBg} rounded-2xl overflow-hidden shadow-2xl`}>
      {/* Card Header with Badge */}
      <div className="relative h-64 md:h-80 flex items-end p-6 md:p-8">
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs md:text-sm font-bold">
          {bootcamp.badge}
        </div>

        {/* Image Background */}
        <div className="absolute inset-0">
          <Image
            src={bootcamp.image || "/placeholder.svg"}
            alt={bootcamp.title}
            fill
            className="object-cover opacity-40"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight text-balance">
            {bootcamp.heading.split(" ").map((word, idx) => {
              if (word === "Booming" || word === "AI" || word === "Revolution.") {
                return (
                  <span key={idx} className={bootcamp.headingHighlight}>
                    {word}{" "}
                  </span>
                )
              }
              return <span key={idx}>{word} </span>
            })}
          </h3>
          {bootcamp.cta && <p className="text-white font-bold text-lg md:text-xl mt-3">{bootcamp.cta}</p>}
        </div>
      </div>

      {/* Card Body */}
      <div className="bg-gray-50 p-6 md:p-8">
        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="bg-black text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Closes {bootcamp.closesDate}
          </div>
          <div className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Limited Spots
          </div>
        </div>

        {/* Title */}
        <h4 className="text-xl md:text-2xl font-bold text-black mb-3">{bootcamp.title}</h4>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">{bootcamp.description}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8 py-6 border-t border-b border-gray-300">
          <div>
            <p className="text-gray-500 text-xs md:text-sm font-semibold uppercase mb-2">Duration</p>
            <p className="text-black font-bold text-base md:text-lg">{bootcamp.duration}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs md:text-sm font-semibold uppercase mb-2">Format</p>
            <p className="text-black font-bold text-base md:text-lg">{bootcamp.format}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-black hover:bg-gray-900 text-white px-6 py-3 text-base font-semibold rounded-lg transition-colors">
            Apply Now →
          </Button>
          <Button
            variant="ghost"
            className="text-black hover:bg-gray-200 px-6 py-3 text-base font-semibold rounded-lg transition-colors"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}
