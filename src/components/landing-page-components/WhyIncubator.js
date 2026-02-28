"use client";
import { Check } from "lucide-react";
import Image from "next/image";

export default function WhyIncubator() {
  const features = [
    {
      number: "01",
      title: "Promoting Digital Education",
      description:
        "We deliver practical, job-ready tech training across multiple disciplines led by certified, industry-experienced facilitators who understand today’s global tech demands. Our programs are built to move learners from learning to doing.",
    },
    {
      number: "02",
      title: "Building Collaborative Communities",
      description:
        "Learning thrives in the community. We have earned the trust of learners, partners, and funders by fostering strong peer-to-peer learning, mentorship, and long-term support networks that extend beyond the classroom.",
    },
    {
      number: "03",
      title: "Real-World Project Experience",
      description:
        "Our bootcamps are designed around real industry challenges. Learners work on hands-on projects that mirror professional environments, supported by scalable infrastructure including physical hubs, online platforms, and regional partners.",
    },
    {
      number: "04",
      title: "Driving Innovation, Leadership & Inclusion",
      description:
        "We empower problem-solvers, creators, and future leaders with a strong focus on women, youths, and underserved communities to innovate, lead, and shape Africa’s tech future through inclusive and impact-driven programs.",
    },
  ];

  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-4 py-12 md:py-0'>
      <div className='max-w-7xl w-full'>
        {/* Heading */}
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight'>
            Why The Incubator Hub?
          </h2>

          <div className='mt-4 md:mt-16 max-w-sm w-full md:w-auto'>
            <p className='text-gray-700 text-sm md:text-base leading-relaxed'>
              The Incubator Hub exists to close the digital skills gap and
              unlock opportunities for Africa’s youth through intentional
              learning, inclusive access, and future-focused innovation.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mt-12'>
          {/* Left Features */}
          <div className='flex flex-col space-y-6'>
            {features.map((feature, index) => (
              <div key={index} className='flex gap-4 items-start'>
                <div className='relative w-16 flex gap-2'>
                  <div className='text-gray-300 text-2xl md:text-3xl'>
                    {feature.number}
                  </div>
                  <div className='bg-black rounded-full p-2 absolute top-0 right-0'>
                    <Check className='w-3 h-3 text-white' />
                  </div>
                </div>

                <div className='flex-1 pt-1'>
                  <h3 className='text-lg md:text-xl font-bold text-black mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Visual */}
          <div className='flex flex-col items-center justify-center'>
            <div className='relative border border-[#8E8E93] rounded-full w-64 md:w-140 h-64 md:h-140 flex items-center justify-center'>
              <div className='relative w-32 md:w-56 md:h-56 lg:w-136 lg:h-136 rounded-full bg-[#D9D9D9] overflow-hidden border-4 border-white shadow-lg'>
                <Image
                  src='/avatar.jpg'
                  alt='Incubator member'
                  fill
                  className='object-cover'
                />
              </div>

              <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white text-black px-6 py-3 rounded-lg shadow-lg font-bold'>
                <p className='text-center text-xs text-[#47566D]'>
                  Students Impacted
                </p>
                <p className='text-center text-xl md:text-2xl text-[#1C2D49]'>
                  185,034+
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
