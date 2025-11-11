"use client"

import Image from "next/image"

export function WhoWeAreSection() {
  return (
    <section className=" mb-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative flex flex-col items-center md:items-start order-2 md:order-none">
            {/* Main Image Container */}
            <div className="relative w-full max-w-lg h-80 md:h-[31.25rem] overflow-hidden shadow-xl border-y-12 border-[#FFFCF1] ">
                <Image src="/professional-team-collaboration-mentoring.jpg" alt="Incubator team collaboration" fill className="object-cover" />
            </div>
            {/* Students Enrolled Badge - Top Right */}
            <div className="absolute flex flex-col items-center justify-center top-2 right-0 md:top-4 md:-right-4 bg-white text-[#1C2D49] px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-semibold shadow-lg border border-gray-200">
                <div className="font-bold text-xs md:text-sm">Students Enrolled</div>
                <div className="text-sm md:text-lg font-bold">50,000+</div>
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
                <p className="text-[#1C2D49] font-semibold text-xs md:text-sm whitespace-nowrap">
                8,000+ reviews
                </p>
            </div>
            </div>

          {/* Right: Content Section */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            {/* Section Label with Decorative Dots */}
            <div className="flex items-center gap-3">
              <h2 className="text-xl md:text-2xl font-semibold text-[#1F2937] tracking-wide">Who We Are</h2>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Introducing Incubator: a revolutionary tech training organization that is managing how you interact with
                technology. This innovation fosters seamless collaboration, enhancing your educational experience. With
                just a click, you can enroll in courses and monitor your progress alongside your peers. This method not
                only enhances teamwork but also ensures that everyone has access to essential knowledge, cultivating a
                more connected and efficient learning environment.
              </p>
              <p>
                enhancing your educational experience. With just a click, you can enroll in courses and monitor your
                progress alongside your peers. This method not only enhances teamwork but also ensures that everyone has
                access to essential knowledge, cultivating a more connected and efficient learning environment.
              </p>
              <p>
                Join us in this exciting journey to elevate your tech skills! Together, we can unlock new opportunities
                and drive innovation in the tech world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}