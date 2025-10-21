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
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Features Section */}
        <div className="flex flex-col space-y-8">
          {/* Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight text-balance">
              Why Incubator?
            </h2>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 items-start">
                {/* Number and Checkmark */}
                <div className="flex flex-col items-center">
                  <div className="text-gray-300 text-2xl md:text-3xl font-bold">{feature.number}</div>
                  <div className="bg-black rounded-full p-2 mt-2">
                    <Check className="w-5 h-5 text-white" />
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

          {/* CTA Section */}
          <div className="pt-4 space-y-3">
            <h4 className="text-lg font-bold text-black">Ready to Get Started?</h4>
            <p className="text-gray-600 text-sm md:text-base">Join thousands of young innovators across Africa</p>
            <div className="flex gap-3 pt-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold">
                🚀
              </div>
              <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-xs font-bold">
                💡
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                ⭐
              </div>
            </div>
          </div>
        </div>

        {/* Right Profile Section */}
        <div className="flex flex-col items-center justify-center">
          {/* Profile Image Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Circular Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full"></div>

            {/* Profile Image */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image src="/professional-headshot-man-smiling.jpg" alt="Incubator member" fill className="object-cover" />
            </div>

            {/* Student Count Badge */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white text-black px-6 py-3 rounded-full shadow-lg font-bold text-lg md:text-xl border-4 border-blue-100">
              50000+
            </div>
          </div>

          {/* Description Text */}
          <div className="mt-16 text-center max-w-sm">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Incubator is a pioneering platform that fosters digital excellence, innovation, and tech readiness across
              Africa. We empower young innovators.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
