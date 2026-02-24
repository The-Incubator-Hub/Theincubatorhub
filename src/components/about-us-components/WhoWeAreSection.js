"use client";

import Image from "next/image";

export function WhoWeAreSection() {
  return (
    <section className='mb-10 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center'>
          {/* Image Section */}
          <div className='relative flex flex-col items-center md:items-start order-2 md:order-none'>
            <div className='relative w-full max-w-lg h-80 md:h-[31.25rem] overflow-hidden shadow-xl border-y-12 border-[#FFFCF1]'>
              <Image
                src='/professional-team-collaboration-mentoring.jpg'
                alt='Incubator team collaboration'
                fill
                className='object-cover'
              />
            </div>

            {/* Students Badge */}
            <div className='absolute flex flex-col items-center justify-center top-2 right-0 md:top-4 md:-right-4 bg-white text-[#1C2D49] px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-semibold shadow-lg border border-gray-200'>
              <div className='font-bold text-xs md:text-sm'>
                Students Enrolled
              </div>
              <div className='text-sm md:text-lg font-bold'>185,034+</div>
            </div>

            {/* Reviews Badge */}
            <div className='absolute flex flex-col items-center justify-center w-32 md:w-40 h-16 md:h-20 bottom-0 left-2 md:-bottom-4 md:left-4 gap-1 bg-white rounded-xl shadow-sm px-2 md:px-4 py-2 border border-gray-100'>
              <div className='text-sm md:text-lg font-bold text-[#1C2D49]'>
                19,000+
              </div>
              <div className='text-xs text-gray-500'>Reviews</div>
            </div>
          </div>

          {/* Content Section */}
          <div className='flex flex-col justify-center space-y-6 md:space-y-8'>
            <h2 className='text-xl md:text-2xl font-semibold text-[#1F2937] tracking-wide'>
              Who We Are
            </h2>

            <div className='space-y-4 text-gray-600 text-sm md:text-base leading-relaxed'>
              <p>
                The Incubator Hub is a pan-African tech training and innovation
                organization committed to equipping young people with in-demand
                digital skills, practical experience, and leadership capacity.
              </p>

              <p>
                We go beyond theory — combining hands-on learning, mentorship,
                collaboration, and real-world projects to prepare our learners
                for the future of work. Our programs are designed to be
                inclusive, accessible, and impact-driven, ensuring that talent
                across Africa can thrive in the global digital economy.
              </p>

              <p>
                We believe in the potential of Africa's young minds and are
                committed to providing the tools, resources, and opportunities
                needed for them to thrive in the global tech landscape. Our
                programs cater to everyone, from beginners to advanced tech
                professionals, and are designed to create long-lasting impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
