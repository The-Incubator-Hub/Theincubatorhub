"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function AboutIncubator() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 md:py-0">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Image Section */}
        <div className="relative flex flex-col items-center md:items-start">
          {/* Decorative Dots - Top */}
          <div className="absolute -top-8 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 flex gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>

          {/* Main Image Container */}
          <div className="relative w-full max-w-sm h-80 md:h-96 rounded-lg overflow-hidden shadow-xl border-8 border-gray-100">
            <Image src="/professional-team-collaboration-mentoring.jpg" alt="Incubator team collaboration" fill className="object-cover" />

            {/* Students Enrolled Badge - Top Right */}
            <div className="absolute top-4 right-4 bg-white text-black px-3 py-2 rounded-lg text-xs md:text-sm font-semibold shadow-lg border border-gray-200">
              <div className="font-bold">Students Enrolled</div>
              <div className="text-lg font-bold">50,000+</div>
            </div>

            {/* Reviews Badge - Bottom Left */}
            <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-2 rounded-lg text-xs md:text-sm font-semibold shadow-lg border border-gray-200 flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">★</div>
              <span>8,000+ reviews</span>
            </div>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8">
          {/* Decorative Dots - Top Right */}
          <div className="flex gap-2 justify-start md:justify-start">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight text-balance">
              About Incubator
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
            <p>
              Introducing Incubator: a revolutionary tech training organization that is reshaping how you interact with
              technology. This innovation fosters seamless collaboration, enhancing your educational experience. With
              just a click, you can enroll in courses and monitor your progress alongside your peers.
            </p>
            <p>
              This method not only enhances teamwork but also ensures that everyone has access to essential knowledge,
              cultivating a more connected and efficient learning environment. Join us in this exciting journey to
              elevate your tech skills! Together, we can unlock new opportunities and drive innovation in the tech
              world.
            </p>
          </div>

          {/* Read More Button */}
          <div className="pt-4">
            <Button
              className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-base font-semibold rounded-lg transition-colors flex items-center gap-2"
              onClick={() => console.log("Read More clicked")}
            >
              Read More
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
