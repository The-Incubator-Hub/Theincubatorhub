"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TestimonialCard from "./TestimonialCard"

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      text: "My experience with the bootcamp was incredibly positive. I gained strong technical skills. Beyond the skills, this bootcamp transformed my career trajectory. I now feel confident applying for jobs in tech, and I've even landed a role that allows me to work on exciting tech projects. The supportive community and hands-on approach made all the difference in my learning journey.",
      name: "Arlene McCoy",
      role: "Graduate",
      initials: "AM",
    },
    {
      id: 2,
      text: "This bootcamp exceeded all my expectations. The instructors were knowledgeable and supportive, and the curriculum was well-structured. I learned practical skills that I could immediately apply to real-world projects. The networking opportunities were invaluable for my career growth.",
      name: "James Chen",
      role: "Graduate",
      initials: "JC",
    },
    {
      id: 3,
      text: "The best investment I made in my career. The bootcamp provided comprehensive training and mentorship that helped me transition into tech. The community support was exceptional, and I made lasting connections with fellow students and instructors.",
      name: "Sarah Williams",
      role: "Alumni",
      initials: "SW",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  const handleSelect = (idx) => {
    setCurrentIndex(idx)
  }

  return (
    <div className="min-h-screen bg-[#FFFEF0] flex flex-col items-center justify-center px-4 py-12 md:py-0">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Section - Heading and Navigation */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight text-balance mb-8">
              What our students are saying about us.
            </h2>

            {/* Navigation Arrows - Square */}
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>

          {/* Right Section - Testimonial Card */}
          <div>
            <TestimonialCard
              testimonial={current}
              currentIndex={currentIndex}
              totalLength={testimonials.length}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}