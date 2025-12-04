// BootcampGallery.jsx - A reusable Bootcamp Gallery component using React (JSX) and Tailwind CSS
// Mimics the provided UI: bordered section with title, subtitle, and horizontal row of 4 images with navigation arrows
// Usage: <BootcampGallery title="Future Clan Bootcamp Gallery" subtitle="Watch video highlights of future clan bootcamp 2024 through our lens" images={[{ src: 'path/to/img1.jpg', alt: 'Image 1' }, ...]} onPrev={() => console.log('Previous')} onNext={() => console.log('Next')} />
'use client'
import React from 'react';

export default function GalleryPreview({ title, subtitle, images = [], onPrev = () => {}, onNext = () => {} }) {
  return (
    <div className="overflow-hidden max-w-6xl mx-auto">
      {/* Header with Title and Subtitle */}
      <div className="bg-white p-6 justify-center items-center ">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-center">
          {subtitle}
        </p>
      </div>
      
      {/* Image Gallery Row */}
      <div className="relative bg-white p-4">
        {/* Left Arrow */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Images Row */}
        <div className="flex justify-center gap-4 px-20">
          {images.map((image, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <img
                src={image.src}
                alt={image.alt}
                className="w-48 h-48 object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Right Arrow */}
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
