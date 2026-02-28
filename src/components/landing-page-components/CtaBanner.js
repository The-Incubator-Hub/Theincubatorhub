"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTABanner({
  title = "Ready to Take the Next Step?",
  description = "At The Incubator Hub, we believe talent is everywhere — opportunity should be too. Send us a message today and let’s create pathways to skills, jobs, and innovation.",
  buttonText = "Contact Our Team →",
  buttonLink = "/contact",
  backgroundImage = "/team-collaboration-working-together.jpg",
}) {
  return (
    <section className='relative w-full h-[420px] flex items-center justify-center overflow-hidden'>
      <Image
        src={backgroundImage}
        alt='CTA background'
        fill
        className='object-cover'
      />
      <div className='absolute inset-0 bg-black/70' />

      <div className='relative z-10 text-center px-6 max-w-3xl space-y-6'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white'>
          {title}
        </h2>

        <p className='text-gray-300 text-base md:text-lg leading-relaxed'>
          {description}
        </p>

        <Link
          href={buttonLink}
          className='inline-flex bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all'
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
