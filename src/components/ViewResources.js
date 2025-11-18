'use client';

import Image from 'next/image';
import { Eye } from 'lucide-react';

export default function ViewResources() {
  const resourceCards = [
    {
      id: 1,
      title: 'Git&GitHub Mastery Guide',
      description: 'Master version control with Git and collaborate effectively using GitHub with this guide.',
      tags: ['Resume', 'Career', 'Templates'],
      label: 'Template Collection',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    },
    {
      id: 2,
      title: 'Tech Resume Templates',
      description: 'Discover our curated collection of tech resume templates designed specifically for tech professionals.',
      tags: ['Resume', 'Career', 'Templates'],
      label: 'Template Collection',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    },
    {
      id: 3,
      title: 'Tech Resume Templates',
      description: 'Discover our curated collection of tech resume templates designed specifically for tech professionals.',
      tags: ['Resume', 'Career', 'Templates'],
      label: 'Template Collection',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    },
    {
      id: 4,
      title: 'Tech Resume Templates',
      description: 'Discover our curated collection of tech resume templates designed specifically for tech professionals.',
      tags: ['Resume', 'Career', 'Templates'],
      label: 'Template Collection',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    },
    {
      id: 5,
      title: 'Tech Resume Templates',
      description: 'Discover our curated collection of tech resume templates designed specifically for tech professionals.',
      tags: ['Resume', 'Career', 'Templates'],
      label: 'Template Collection',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    },
    {
      id: 6,
      title: 'Tech Resume Templates',
      description: 'Discover our curated collection of tech resume templates designed specifically for tech professionals.',
      tags: ['Resume', 'Career', 'Templates'],
      label: 'Template Collection',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    },
  ];

  return (
    <div className="bg-gray-50 pt-8 pb-12 px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {resourceCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden w-full flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48 sm:h-52 lg:h-48 bg-gray-200 flex-shrink-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 flex-grow flex flex-col">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3 flex-grow">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {card.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 text-[10px] sm:text-xs rounded-full whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Label */}
                <p className="text-[10px] sm:text-xs text-gray-400 mb-3 sm:mb-4">
                  {card.label}
                </p>

                {/* Button */}
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 sm:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base flex-shrink-0">
                  <Eye className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">View Resources</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

