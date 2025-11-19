'use client'

import { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';

export default function PhotoVideoSection({
  title = "Learn, Grow and Succeed",
  description = "We are supporting nonprofits to scale creative, data-driven and measurable. Our road to 1000 nonprofits supported looks promising and exciting as we prepare to turn a chapter into impact and development.",
  filterButtons: propsFilterButtons = [],
  images: propsImages = [],
  videos: propsVideos = []
}) {
  const [activeTab, setActiveTab] = useState('images');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const itemsPerPage = 9;

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  const defaultImages = [
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

  const defaultVideos = [
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

  const defaultFilterButtons = [
    'ALL',
    'Digital Skills Africa',
    'Ladies in Tech Africa',
    'Future Civic Bootcamp',
    'Future Now',
    'SkillUp',
    'AI Now',
    'Vista Africa'
  ];

  const images = propsImages.length > 0 
    ? propsImages.map(img => img.src || img)
    : defaultImages;

  // Keep full video objects for videos to access videoUrl
  const videos = propsVideos.length > 0
    ? propsVideos.map(vid => ({
        thumbnail: vid.thumbnail || vid.src || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
        videoUrl: vid.videoUrl || null,
        alt: vid.alt || 'Video'
      }))
    : defaultVideos.map(vid => ({ thumbnail: vid, videoUrl: null, alt: 'Video' }));

  const filterButtons = propsFilterButtons.length > 0
    ? propsFilterButtons.map(btn => btn.name || btn)
    : defaultFilterButtons;

  const displayedMedia = activeTab === 'images' 
    ? images.map(img => ({ src: img, type: 'image' }))
    : videos.map(vid => ({ ...vid, type: 'video' }));

  // Calculate pagination
  const totalItems = displayedMedia.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = displayedMedia.slice(startIndex, endIndex);

  // Reset to page 1 when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Ensure currentPage doesn't exceed totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleVideoClick = (video) => {
    if (video.videoUrl) {
      setSelectedVideo(video);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of gallery section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    handlePageChange(totalPages);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis logic
      if (currentPage <= 3) {
        // Show first pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last pages
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

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
            {title}
          </h1>
          {description && (
            <p className="text-sm text-gray-600 max-w-3xl">
              {description}
            </p>
          )}
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
          {currentPageItems.map((media, index) => {
            const mediaSrc = media.src || media.thumbnail;
            const mediaAlt = media.alt || `Media ${startIndex + index + 1}`;
            const isVideo = media.type === 'video' || activeTab === 'videos';
            
            return (
              <div
                key={startIndex + index}
                onClick={() => isVideo && media.videoUrl && handleVideoClick(media)}
                className={`relative w-full h-121 bg-gray-200 rounded-lg overflow-hidden group ${
                  isVideo && media.videoUrl ? 'cursor-pointer' : ''
                }`}
              >
                <img
                  src={mediaSrc}
                  alt={mediaAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {isVideo && media.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Previous
            </button>
            
            {getPageNumbers().map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded font-medium text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Next
            </button>
            
            {currentPage < totalPages && (
              <button
                onClick={handleLast}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 font-medium"
                title="Go to last page"
              >
                ≫
              </button>
            )}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && selectedVideo.videoUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {(() => {
                const videoId = getYouTubeVideoId(selectedVideo.videoUrl);
                if (videoId) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedVideo.alt || "Video"}
                    />
                  );
                } else {
                  // Fallback for direct video URLs or other formats
                  return (
                    <video
                      src={selectedVideo.videoUrl}
                      controls
                      autoPlay
                      className="absolute top-0 left-0 w-full h-full"
                    >
                      Your browser does not support the video tag.
                    </video>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}