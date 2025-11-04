"use client"

import { Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function BootcampCard({ bootcamp }) {
  return (
    <div className={`${bootcamp.cardBg} rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col`}>
      {/* Card Header with Badge */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 flex items-end p-4 sm:p-6 md:p-8">
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
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="bg-gray-50 p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="bg-black text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Closes {bootcamp.closesDate}
          </div>
          <div className="bg-pink-100 text-[#B3261E] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Limited Spots
          </div>
        </div>

        {/* Title */}
        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 sm:mb-3">{bootcamp.title}</h4>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
          {bootcamp.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 py-4 sm:py-6  border-b border-[#F3E7E7]">
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase mb-1 sm:mb-2">Duration</p>
            <p className="text-black font-bold text-sm md:text-base lg:text-lg">{bootcamp.duration}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase mb-1 sm:mb-2">Format</p>
            <p className="text-black font-bold text-sm md:text-base lg:text-lg">{bootcamp.format}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-between sm:flex-row gap-3 mt-auto">
          <Button className="bg-black hover:bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm md:text-base font-semibold rounded-lg transition-colors">
            Apply Now →
          </Button>
          <Button
            variant="ghost"
            className="text-black hover:bg-gray-200 px-4 sm:px-6 py-2 sm:py-3 text-sm md:text-base font-semibold rounded-lg transition-colors"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}
