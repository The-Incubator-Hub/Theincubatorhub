// VideoPromo.jsx - A reusable Video Promo component using React (JSX) and Tailwind CSS
// Mimics the provided UI: bordered section with title, subtitle, and overlay play button on image
// Usage: <VideoPromo title="Experience Future Clan Future Camp through our lens" subtitle="Watch highlights of Future Camp through our lens" imageUrl="path/to/your/image.jpg" onPlay={() => console.log('Play video')} />

import React from 'react';

export default function VideoSection({ title, subtitle, imageUrl, onPlay = () => {} }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden max-w-4xl mx-auto">
      {/* Title and Subtitle */}
      <div className="bg-white p-6 border-b border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600">
          {subtitle}
        </p>
      </div>
      
      {/* Image with Play Overlay */}
      <div className="relative w-full h-96">
        <img
          src={imageUrl}
          alt="Future Camp highlights"
          className="w-full h-full object-cover"
        />
        <button
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity duration-200"
        >
          <svg
            className="w-16 h-16 text-white opacity-90"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
