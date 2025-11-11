'use client';

import React, { useState } from 'react';
import { Search, Calendar, Clock, Heart, Bookmark, Share2 } from 'lucide-react';

const PressReleaseCard = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(156);

  const filters = ['ALL', 'Success Stories', 'Community', 'Education', 'Industry Insight', 'Technology'];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="bg-white p-6">
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search press release..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{
                fontWeight: 700,
                fontSize: '14px',
                color: '#000000'
              }}
            />
            <style jsx>{`
              input::placeholder { 
                width: 324px;
                height: 18px;
                opacity: 1;
                font-family: Onest, sans-serif;
                font-weight: 600;
                font-size: 14px;
                line-height: 130%;
                letter-spacing: 0px; 
                color: #B3B3B3; 
              }
            `}</style> 
          </div> 

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-green-400 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article Card */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-64 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team meeting"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Tags */}
              <div className="flex gap-3 mb-6">
                <span className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-full">
                  FEATURED
                </span>
                <span className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full">
                  Education
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                The Future of Tech Education in Africa: Bridging the Digital Divide
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                As Africa continues to experience rapid technological growth, the importance of quality tech education cannot be overstated. Our comprehensive analysis reveals the strategies needed to bridge the digital divide.
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>December 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>5 mins read</span>
                </div>
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  <span>{likesCount} likes</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-3 px-8 py-4 bg-black group-hover:bg-green-500 text-white rounded-lg font-semibold transition-all duration-300">
                  <Bookmark className="w-5 h-5" />
                  Read Full Article
                </button>
                <button className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseCard;