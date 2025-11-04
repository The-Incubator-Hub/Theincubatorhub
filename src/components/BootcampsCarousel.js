"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BootcampCard from "./BootcampCard"

export default function BootcampsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const bootcamps = [
    {
      id: 1,
      title: "Apply Now: AI Now Fellowship",
      heading: "Ready to break into the Booming world of AI?",
      description:
        "Incubator is a pioneering platform that fosters digital excellence, innovation, and tech leadership across Africa. We empower young minds with the skills knowledge.",
      badge: "AI NOW",
      badgeColor: "bg-purple-600",
      cardBg: "bg-gradient-to-br from-purple-600 to-purple-800",
      headingHighlight: "text-yellow-400",
      image: "/ai-bootcamp-people.jpg",
      closesDate: "Aug 15",
      duration: "12 Weeks",
      format: "Hybrid (Online+physical)",
    },
    {
      id: 2,
      title: "Apply Now: Ladies In Tech Africa",
      heading: "Women are leading the next AI Revolution.",
      description:
        "Incubator is a pioneering platform that fosters digital excellence, innovation, and tech leadership across Africa. We empower young minds with the skills knowledge.",
      badge: "INCUBATOR",
      badgeColor: "bg-pink-500",
      cardBg: "bg-gradient-to-br from-pink-400 to-pink-600",
      headingHighlight: "text-pink-700",
      image: "/women-tech-vr.jpg",
      closesDate: "Aug 15",
      duration: "12 Weeks",
      format: "Hybrid (Online+physical)",
      cta: "Join The Movement!",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bootcamps.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + bootcamps.length) % bootcamps.length)
  }

  const current = bootcamps[currentIndex]

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 md:py-0">
      <div className="max-w-7xl w-full">
        {/* Heading */}
        <div className="relative inline-block mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-tight text-balance px-6 py-4 pr-12">
            Our Bootcamps
          </h2>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#15803D]"></div>
          <div className="absolute right-3  -bottom-3 h-11 w-1 bg-[#15803D] "></div>
        </div>
        {/* Carousel Container */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 z-10 bg-white border-2 border-gray-300 rounded-full p-3 hover:bg-gray-100 transition-colors"
            aria-label="Previous bootcamp"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          {/* Bootcamp Card */}
          <div className="w-full md:w-3/4 lg:w-2/3">
            <BootcampCard bootcamp={current} />
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 z-10 bg-white border-2 border-gray-300 rounded-full p-3 hover:bg-gray-100 transition-colors"
            aria-label="Next bootcamp"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>

          {/* Mobile Navigation */}
          <div className="md:hidden flex gap-2 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-20">
            <button
              onClick={prevSlide}
              className="bg-white border-2 border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Previous bootcamp"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white border-2 border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Next bootcamp"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
