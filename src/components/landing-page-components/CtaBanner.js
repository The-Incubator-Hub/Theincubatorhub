"use client";

import Image from "next/image";

export default function CTABanner() {
  return (
    <section className='relative w-full h-[420px] flex items-center justify-center overflow-hidden'>
      <Image
        src='/team-collaboration-working-together.jpg'
        alt='Young innovators collaborating'
        fill
        className='object-cover'
      />

      <div className='absolute inset-0 bg-black/70' />

      <div className='relative z-10 text-center px-6 max-w-3xl space-y-6'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white'>
          Ready to Take the Next Step?
        </h2>

        <p className='text-gray-300 text-base md:text-lg leading-relaxed'>
          At The Incubator Hub, we believe talent is everywhere — opportunity
          should be too. Send us a message today and let’s create pathways to
          skills, jobs, and innovation.
        </p>

        <button className='bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all'>
          Contact Our Team →
        </button>
      </div>
    </section>
  );
}
