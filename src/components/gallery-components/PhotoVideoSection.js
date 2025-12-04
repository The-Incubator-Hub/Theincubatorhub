import { useState } from 'react';
import { Play } from 'lucide-react';

export default function PhotoVideoSection() {
  const [activeTab, setActiveTab] = useState('images');
  const [currentPage, setCurrentPage] = useState(1);

  const images = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop'
  ];

  const videos = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop'
  ];

  const filterButtons = [
    'ALL',
    'Digital Skills Africa',
    'Ladies in Tech Africa',
    'Future Civic Bootcamp',
    'Future Now',
    'SkillUp',
    'AI Now',
    'Vista Africa'
  ];

  const displayedMedia = activeTab === 'images' ? images : videos;

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('images')}
                className={`text-sm font-medium ${
                  activeTab === 'images' ? 'text-[#15803D]' : 'text-gray-400'
                }`}
              >
                Images
              </button>
              <span className="text-black">|</span>
              <button
                onClick={() => setActiveTab('videos')}
                className={`text-sm font-medium ${
                  activeTab === 'videos' ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                Videos
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Learn, Grow and Succeed
          </h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            We are supporting nonprofits to scale creative, data-driven and measurable. Our road to
            1000 nonprofits supported looks promising and exciting as we prepare to turn a chapter
            into impact and development.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterButtons.map((button, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-md  text-sm font-medium transition-colors ${
                index === 0
                  ? 'bg-[#DCFCE7] text-[#14532D] hover:bg-[#DCFCE7] border border-[#4ADE80]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-[#B2B2B2'
              }`}
            >
              {button}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {displayedMedia.map((media, index) => (
            <div
              key={index}
              className="relative w-full h-121 bg-gray-200 rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={media}
                alt={`Media ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {activeTab === 'videos' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
            Previous
          </button>
          <button className="w-8 h-8 rounded bg-yellow-400 text-gray-900 font-medium text-sm">
            1
          </button>
          <button className="w-8 h-8 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium text-sm">
            2
          </button>
          <button className="w-8 h-8 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium text-sm">
            3
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
            Next
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
            ≫
          </button>
        </div>
      </div>
    </div>
  );
}