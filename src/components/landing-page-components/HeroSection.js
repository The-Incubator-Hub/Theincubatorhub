"use client"

import { Button } from "@/components/ui/button"
import { Circle, Play } from "lucide-react"
import Image from "next/image"

export default function HeroSection({ 
  heading = "Deliberate And Strategic",
  highlightedText = "Impact",
  description = "Zakroofl gives you everything you need to create your website in minutes. Bootstrap code with a well-organized design & develop your next web",
  primaryButtonText = "Get Started",
  secondaryButtonText = "View Preview",
  image = "/team-collaboration-working-together.jpg"
}) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4E4E50] to-black flex items-center justify-center px-4 pt-32 md:pt-40 pb-12 md:pb-0">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {heading} {""}
              <span className="px-1 py-0 bg-[#22C55E] ">{highlightedText}</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-base font-semibold rounded-lg transition-colors w-full sm:w-auto"
              onClick={() => console.log("Get Started clicked")}
            >
              {primaryButtonText}
            </Button>
            <Button
              variant="ghost"
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-base font-bold rounded-lg transition-colors w-full sm:w-auto"
              onClick={() => console.log("View Preview clicked")}
            >
              {secondaryButtonText}
            </Button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative h-64 md:h-96 lg:h-full lg:min-h-screen flex items-center justify-center">
          {/* Main Image */}
          <div className="border-[20px] border-[#4E4E50]/10 relative w-full md:w-[48rem] h-64 md:h-[38.5rem] overflow-hidden shadow-2xl">
            <Image
              src={image}
              alt="Team collaboration"
              fill
              className="object-cover"
            />

            {/* Play Button - Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white rounded-full p-3 md:p-4 hover:bg-gray-100 transition-colors shadow-lg">
                <Play className="w-6 h-6 md:w-8 md:h-8 fill-[#0B63E5] stroke-[#0B63E5]" />
              </button>
            </div>
          </div>

          {/* Service Tags - Overlay */}
          <div className="absolute -inset-1 md:-inset-14 flex flex-col justify-center items-start p-2 md:p-4 md:p-6 space-y-2 md:space-y-6">
            <div className="border-2 border-[#22C55E] bg-black/70 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium">
              Product Design
            </div>
            <div className="border-2 border-[#22C55E] bg-black/70 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium">
              Digital Marketing
            </div>
            <div className="border-2 border-[#22C55E] bg-black/70 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium">
              Project Management
            </div>
            <div className="border-2 border-[#22C55E] bg-black/70 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium">
              Software Development
            </div>
          </div>

          {/* Live Classes Badge - Top Right */}
          <div className="flex items-center gap-2 border-2 border-[#22C55E] bg-transparent absolute top-4 md:top-36 right-4 text-white px-3 py-1 rounded-sm text-xs md:text-sm font-bold">
            <Circle className="w-2 h-2 bg-[#22C55E] rounded-full" /> 
            <div>Live Classes</div>
          </div>

          {/* Students Badge - Bottom Right */}
          <div className="flex items-center gap-2 absolute bottom-4 md:bottom-[8.25rem] bg-[#4ADE80] text-white px-3 py-2 rounded text-xs md:text-sm font-semibold">
            <div className="rounded-full bg-[#22C55E] w-2 h-2"></div> 
            <div className="block">
              <div>100,000+ students</div>
              <span className="text-xs">trained</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}