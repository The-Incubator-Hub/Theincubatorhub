"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-black flex items-center justify-center px-4 py-12 md:py-0">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Deliberate And Strategic
              <span className="block text-green-400 text-balance">Impact</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md">
            Zakroofl gives you everything you need to create your website in minutes. Bootstrap code with a
            well-organized design & develop your next web
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-base font-semibold rounded-lg transition-colors"
              onClick={() => console.log("Get Started clicked")}
            >
              Get Started →
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-base font-semibold rounded-lg transition-colors bg-transparent"
              onClick={() => console.log("View Preview clicked")}
            >
              View Preview
            </Button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative h-96 md:h-full md:min-h-screen flex items-center justify-center">
          {/* Main Image */}
          <div className="relative w-full h-96 md:h-96 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/team-collaboration-working-together.jpg"
              alt="Team collaboration"
              fill
              className="object-cover"
            />

            {/* Live Classes Badge - Top Right */}
            <div className="absolute top-4 right-4 bg-green-400 text-black px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
              ✓ Live Classes
            </div>

            {/* Service Tags - Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-4 md:p-6 space-y-2">
              <div className="bg-black/70 text-white px-3 py-1 rounded text-xs md:text-sm font-medium">
                Product Design
              </div>
              <div className="bg-black/70 text-white px-3 py-1 rounded text-xs md:text-sm font-medium">
                Digital Marketing
              </div>
              <div className="bg-black/70 text-white px-3 py-1 rounded text-xs md:text-sm font-medium">
                Project Management
              </div>
              <div className="bg-black/70 text-white px-3 py-1 rounded text-xs md:text-sm font-medium">
                Software Development
              </div>
            </div>

            {/* Play Button - Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors shadow-lg">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-black fill-black" />
              </button>
            </div>

            {/* Students Badge - Bottom Right */}
            <div className="absolute bottom-4 right-4 bg-green-400 text-black px-3 py-2 rounded text-xs md:text-sm font-semibold">
              100,000+ students learning
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
