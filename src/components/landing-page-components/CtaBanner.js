"use client"

import Image from "next/image"

export default function CTABanner({
  title = "Everyone Deserves The Chance To Learn Tech",
  description = "Leading digital agency with solid design and development expertise. We build readymade websites, mobile applications, and elaborate online business services.",
  buttonText = "Let's Work Together",
  backgroundImage = "/team-collaboration-working-together.jpg"
}) {
  return (
    <div className="relative w-full h-96 md:h-[414px] overflow-hidden">
      {/* Background Image */}
      <Image src={backgroundImage} alt="Team working together" fill className="object-cover" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl text-center space-y-6">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
            {title}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <button className="bg-black hover:bg-gray-900 text-white px-8 md:px-10 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors inline-flex items-center gap-2">
              {buttonText}
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
