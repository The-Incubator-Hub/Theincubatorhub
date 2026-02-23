"use client";

import Image from "next/image";

export default function CTABanner() {
  return (
    <div className='relative w-full h-96 md:h-[420px] overflow-hidden'>
      {/* Background Image */}
      <Image
        src='/team-collaboration-working-together.jpg'
        alt='Young innovators collaborating'
        fill
        className='object-cover'
        priority
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60'></div>

      {/* Content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center'>
        <div className='max-w-3xl space-y-6'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
            Ready to Get Started?
          </h2>

          <p className='text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto'>
            Join thousands of young innovators across Africa who are building
            meaningful tech careers with Incubator.
          </p>

          <div className='pt-4'>
            <button className='bg-[#22C55E] hover:bg-[#16A34A] text-white px-8 md:px-10 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors inline-flex items-center gap-2'>
              Apply to a Program →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
