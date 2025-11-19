"use client"
import { Check } from "lucide-react"
import Image from "next/image"

export default function WhyIncubator() {
  const features = [
    {
      number: "01",
      title: "Promoting Digital Education",
      description:
        "Empowering learners with cutting-edge digital skills and knowledge to build tomorrow's tech leaders and innovators.",
    },
    {
      number: "02",
      title: "Enhancing Workplace Collaboration",
      description:
        "Fostering seamless teamwork and communication tools that bring teams together, no matter where they are.",
    },
    {
      number: "03",
      title: "Streamlining Project Management",
      description:
        "Efficient methodologies and software solutions to keep projects on track, within budget, and delivered on time.",
    },
    {
      number: "04",
      title: "Fostering Innovation in Tech",
      description:
        "Cultivating a culture that encourages creative thinking and the development of cutting-edge technologies.",
    },
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 md:py-0">
      <div className="max-w-7xl w-full">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight text-balance">
            Why Incubator?
          </h2>
          {/* Description Text */}
          <div className="mt-4 md:mt-16 max-w-sm w-full md:w-auto">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Incubator is a pioneering platform that fosters digital excellence, innovation, and tech readiness across
              Africa. We empower young innovators.
            </p>
          </div>
        </div>

        <div className="bg-white flex items-center justify-center px-4 py-12 md:py-0">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Features Section */} 
            <div className="flex flex-col space-y-8">

              {/* Features List */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    {/* Number and Checkmark */}
                    <div className="relative w-16 md:w-18 flex font-normal gap-2">
                      <div className="text-gray-300 text-2xl md:text-3xl">{feature.number}</div>
                      <div className="bg-black rounded-full p-2 top-0 right-0 absolute">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg md:text-xl font-bold text-black mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Profile Section */}
            <div className="flex flex-col items-center justify-center">
              {/* Profile Image Container */}
              <div className="relative border border-[#8E8E93] rounded-full w-64 md:w-140 h-64 md:h-140 flex items-center justify-center">
                {/* Circular Background */}
                <div className="absolute inset-0 rounded-full"></div>
                {/* Profile Image */}
                <div className="relative w-32 md:w-56 md:h-56 lg:w-136 lg:h-136 rounded-full bg-[#D9D9D9] overflow-hidden border-4 border-white shadow-lg">
                  <Image src="/avatar.jpg" alt="Incubator member" fill className="object-cover" />
                </div>

                {/* Student Count Badge */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg font-bold text-base md:text-lg md:text-xl">
                  <p className="text-center text-xs text-[#47566D]">Students Impacted</p>
                  <p className="text-center text-xl md:text-2xl text-[#1C2D49]">
                    50000+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> 
        {/* CTA Section */}
        <div className="pt-4 space-y-3">
          <h4 className="text-lg font-bold text-black">Ready to Get Started?</h4>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
            <p className="text-gray-600 text-sm md:text-base">Join thousands of young innovators across Africa</p>
            <div className="flex items-center justify-center md:justify-start -space-x-3">
              <div className="flex items-center gap-2 mr-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                <div className="relative w-6 h-6 rounded-full border-2 border-white gap-2 overflow-hidden">
                  <Image
                    src="/avatar.jpg" // make sure this file exists in /public
                    alt="Reviewer"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="bg-[#757575] px-2 py-1 md:px-3 md:py-2">
                <p className="text-xs md:text-sm text-white">25,000+ students</p>
              </div>
            </div>
          </div>            
        </div>
      </div>
    </div>
  )
}