"use client";

import Image from "next/image";
import Link from "next/link";

export default function JoinUs({
  title = "Want to Join This Amazing Team?",
  description = "We're always looking for talented individuals who share our passion for education and technology. Ready to make an impact?",
  ctaText = "View Open Positions",
  ctaLink = "/careers",
  backgroundImage = "/images/joinus.jpg",
}) {
  return (
    <section className='relative w-full h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden'>
      {/* Background */}
      <Image
        src={backgroundImage}
        alt='Join The Incubator Hub Team'
        fill
        className='object-cover'
        priority
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Content */}
      <div className='relative z-10 flex items-center justify-center h-full px-6'>
        <div className='max-w-4xl text-center space-y-6'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight'>
            {title}
          </h2>

          <p className='text-base md:text-lg text-white/90 leading-relaxed'>
            {description}
          </p>

          <Link
            href={ctaLink}
            className='inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition duration-300'
          >
            {ctaText}
            <svg
              className='w-5 h-5 transition-transform group-hover:translate-x-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
