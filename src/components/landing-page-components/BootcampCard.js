"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";

export default function BootcampCard({ bootcamp }) {
  return (
    <div
      className={`${bootcamp.cardBg} rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col`}
    >
      {/* Card Header */}
      <div className='relative h-48 sm:h-56 md:h-64 lg:h-80'>
        <div className='absolute inset-0'>
          <Image
            src={bootcamp.image || "/placeholder.svg"}
            alt={bootcamp.title}
            fill
            className='object-cover object-top'
          />
        </div>

        <div className='absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs md:text-sm font-bold'>
          {bootcamp.badge}
        </div>
      </div>

      {/* Body */}
      <div className='bg-gray-50 p-6 flex-1 flex flex-col'>
        {/* Top Badges */}
        <div className='flex flex-wrap gap-3 mb-6'>
          {bootcamp.closesDate && (
            <div className='bg-black text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              Closes {bootcamp.closesDate}
            </div>
          )}

          <div className='bg-pink-100 text-[#B3261E] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2'>
            <Tag className='w-4 h-4' />
            Limited Spots
          </div>
        </div>

        {/* Title */}
        <h4 className='text-xl md:text-2xl font-bold text-black mb-3'>
          {bootcamp.title}
        </h4>

        {/* Description */}
        <p className='text-gray-600 text-sm md:text-base leading-relaxed mb-6'>
          {bootcamp.description}
        </p>

        {/* Details Grid */}
        <div className='grid grid-cols-2 gap-6 mb-6 border-b border-gray-200 pb-6'>
          <div>
            <p className='text-gray-500 text-xs font-semibold uppercase mb-2'>
              Duration
            </p>
            <p className='text-black font-bold'>{bootcamp.duration}</p>
          </div>

          <div>
            <p className='text-gray-500 text-xs font-semibold uppercase mb-2'>
              Format
            </p>
            <p className='text-black font-bold'>{bootcamp.format}</p>
          </div>

          {bootcamp.courses && (
            <div>
              <p className='text-gray-500 text-xs font-semibold uppercase mb-2'>
                Courses
              </p>
              <p className='text-black font-bold'>{bootcamp.courses}</p>
            </div>
          )}

          {bootcamp.graduates && (
            <div>
              <p className='text-gray-500 text-xs font-semibold uppercase mb-2'>
                Graduates
              </p>
              <p className='text-black font-bold'>{bootcamp.graduates}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 mt-auto'>
          <Button className='bg-black hover:bg-gray-900 text-white px-6 py-3 text-sm md:text-base font-semibold rounded-lg transition-colors'>
            Apply Now →
          </Button>

          <Button
            variant='ghost'
            className='text-black hover:bg-gray-200 px-6 py-3 text-sm md:text-base font-semibold rounded-lg transition-colors'
          >
            {bootcamp.cta || "Learn More"}
          </Button>
        </div>
      </div>
    </div>
  );
}
