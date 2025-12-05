"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Raleway } from "next/font/google"

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600", "700", "800"] })

export default function AboutIncubator({
  title = "About Incubator",
  description1 = "Introducing Incubator: a revolutionary tech training organization that is reshaping how you interact with technology. This innovation fosters seamless collaboration, enhancing your educational experience. With just a click, you can enroll in courses and monitor your progress alongside your peers.",
  description2 = "This method not only enhances teamwork but also ensures that everyone has access to essential knowledge, cultivating a more connected and efficient learning environment. Join us in this exciting journey to elevate your tech skills! Together, we can unlock new opportunities and drive innovation in the tech world.",
  buttonText = "Read More",
  image = "/professional-team-collaboration-mentoring.jpg",
  studentsEnrolled = "50,000+",
  reviewsCount = "8,000+ reviews"
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-4 md:py-0">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Image Section */}
        <div className="relative flex flex-col items-center md:items-start order-2 md:order-none">
          {/* Main Image Container */}
          <div className="relative w-full max-w-lg h-80 md:h-125 overflow-hidden shadow-xl border-y-12 border-[#FFFCF1] ">
            <Image src={image} alt="Incubator team collaboration" fill className="object-cover" />
          </div>
          {/* Students Enrolled Badge - Top Right */}
          <div className={`absolute flex flex-col items-center justify-center top-2 right-0 md:top-4 md:-right-10 bg-white text-[#1C2D49] px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-semibold shadow-lg border border-gray-200 ${raleway.className}`}>
            <div className="font-bold text-xs md:text-sm">Students Enrolled</div>
            <div className="text-sm md:text-lg font-bold">{studentsEnrolled}</div>
          </div>
          {/* ✅ Reviews Badge - Bottom Left */}
          <div className="absolute flex flex-col items-center justify-center w-32 md:w-40 h-16 md:h-20 bottom-0 left-2 md:-bottom-4 md:left-4 gap-1 md:gap-3 bg-white rounded-xl shadow-sm px-2 md:px-4 py-1 md:py-2 border border-gray-100">
            {/* Avatars */}
            <div className="flex -space-x-2 md:-space-x-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 border-2 border-white"></div>
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 border-2 border-white"></div>
              <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white overflow-hidden">
                <Image
                  src="/avatar.jpg" // make sure this file exists in /public
                  alt="Reviewer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-xs md:text-sm">
                +
              </div>
            </div>

            {/* Text */}
            <p className={`text-[#1C2D49] font-semibold text-xs md:text-sm whitespace-nowrap ${raleway.className}`}>
              {reviewsCount}
            </p>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8 order-1 md:order-none">

          {/* Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight text-balance">
              {title}
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
            <p>{description1}</p>
            <p>{description2}</p>
          </div>

          {/* Read More Button */}
          <div className="pt-4">
            <Button
              className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-base font-semibold rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto"
              onClick={() => console.log("Read More clicked")}
            >
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}