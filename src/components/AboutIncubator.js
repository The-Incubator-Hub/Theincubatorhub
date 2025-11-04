"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Raleway } from "next/font/google"

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600", "700", "800"] })

export default function AboutIncubator() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 md:py-0">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Image Section */}
        <div className="relative flex flex-col items-center md:items-start">
          {/* Main Image Container */}
          <div className="relative w-full max-w-lg h-80 md:h-125 overflow-hidden shadow-xl border-y-12 border-[#FFFCF1] ">
            <Image src="/professional-team-collaboration-mentoring.jpg" alt="Incubator team collaboration" fill className="object-cover" />



          </div>
          {/* Students Enrolled Badge - Top Right */}
          <div className="absolute justify-center items-center top-4 -right-10 bg-white text-[#1C2D49] px-3 py-2 rounded-lg text-xs md:text-sm font-semibold shadow-lg border border-gray-200">
            <div className={`place-self-center items-center font-bold ${raleway.className}`}>Students Enrolled</div>
            <div className={`place-self-center items-center text-lg font-bold ${raleway.className}`}>50,000+</div>
          </div>
          {/* ✅ Reviews Badge - Bottom Left */}
          <div className="absolute items-center justify-center w-40 h-20 -bottom-4 left-4 gap-3 bg-white rounded-xl shadow-sm px-4 py-2 border border-gray-100">
            {/* Avatars */}
            <div className="place-self-center items-center flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
              <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <Image
                  src="/avatar.jpg" // make sure this file exists in /public
                  alt="Reviewer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-lg">
                +
              </div>
            </div>

            {/* Text */}
            <p className={`place-self-center items-center text-[#1C2D49] font-semibold text-sm sm:text-base whitespace-nowrap ${raleway.className}`}>
              8,000+ reviews
            </p>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8">

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
