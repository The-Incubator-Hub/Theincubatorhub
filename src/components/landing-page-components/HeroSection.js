"use client";

import { Button } from "@/components/ui/button";
import { Circle, Play } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className='bg-gradient-to-r from-[#4E4E50] to-black'>
      {/* Navbar offset: mobile ~80px, md+ ~96px */}
      <div className='mx-auto max-w-7xl px-4 pt-[96px] md:pt-[112px] pb-14 md:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center'>
          {/* Left Content */}
          <div className='flex flex-col justify-center space-y-6'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight'>
              Deliberate and Strategic{" "}
              <span className='px-2 py-1 bg-[#22C55E] inline-block'>
                Impact
              </span>
            </h1>

            <p className='text-gray-300 text-base md:text-lg leading-relaxed max-w-xl'>
              We are building Africa’s next generation of tech leaders through
              practical training, inclusive programs, and future-focused
              innovation.
            </p>

            <div className='pt-1'>
              <Button
                className='bg-black hover:bg-gray-900 text-white px-8 py-6 text-base font-semibold rounded-lg transition-colors w-full sm:w-auto'
                onClick={() => console.log("Get Started clicked")}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Right Media */}
          <div className='relative'>
            <div className='relative mx-auto w-full max-w-xl'>
              {/* More standard hero image height (not full screen) */}
              <div className='border-[12px] md:border-[16px] border-[#4E4E50]/10 relative w-full h-72 sm:h-80 md:h-[26rem] lg:h-[28rem] overflow-hidden shadow-2xl'>
                <Image
                  src='/team-collaboration-working-together.jpg'
                  alt='Team collaboration'
                  fill
                  className='object-cover'
                  priority
                />

                {/* Play Button */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <button
                    type='button'
                    className='bg-white rounded-full p-3 md:p-4 hover:bg-gray-100 transition-colors shadow-lg'
                    aria-label='Play video'
                  >
                    <Play className='w-6 h-6 md:w-8 md:h-8 fill-[#0B63E5] stroke-[#0B63E5]' />
                  </button>
                </div>

                {/* Live Classes Badge */}
                <div className='flex items-center gap-2 border-2 border-[#22C55E] bg-black/30 absolute top-3 right-3 text-white px-3 py-1 rounded-sm text-xs md:text-sm font-bold backdrop-blur'>
                  <Circle className='w-2 h-2 bg-[#22C55E] rounded-full' />
                  <span>Live, Mentor-Led Classes</span>
                </div>

                {/* Students Badge */}
                <div className='flex items-center gap-2 absolute bottom-3 left-3 bg-[#4ADE80] text-white px-3 py-2 rounded text-xs md:text-sm font-semibold'>
                  <span className='rounded-full bg-[#22C55E] w-2 h-2' />
                  <div>
                    <div>185,034+ Students</div>
                    <span className='text-xs'>Enrolled</span>
                  </div>
                </div>
              </div>

              {/* Service Tags (hide on very small screens to reduce clutter) */}
              <div className='hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 flex-col items-start space-y-2 md:space-y-3'>
                {[
                  "Product Design",
                  "Software Development",
                  "Digital Marketing",
                  "Project Management",
                ].map((tag) => (
                  <div
                    key={tag}
                    className='border-2 border-[#22C55E] bg-black/70 text-white px-3 py-1 rounded text-xs md:text-sm font-medium'
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* end Right Media */}
        </div>
      </div>
    </section>
  );
}
