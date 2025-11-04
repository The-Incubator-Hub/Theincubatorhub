'use client';
import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';

const BlogArticleHeader = () => { 
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Main Container */}
      <div className="w-full py-12" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        {/* Tags Section */}
        <div className="flex gap-3 mb-8">
          <span className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-full">
            FEATURED
          </span>
          <span className="px-6 py-2.5 bg-gray-300 text-gray-800 text-sm font-semibold rounded-full">
            Education
          </span>
        </div>

        {/* Article Title */}
        <h1 
          className="mb-8"
          style={{
            width: '1280px',
            height: '134px',
            opacity: 1,
            transform: 'rotate(0deg)',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '140%',
            letterSpacing: '0px',
            color: '#0C0D0D'
          }}
        >
          The Future of Tech Education in Africa: Bridging the Digital Divide
        </h1>

        {/* Article Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-600">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-medium text-gray-800">Sarah Okafor</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>December 15, 2024</span>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>5 mins read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="Team meeting discussing tech education"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Article Content Section (Optional - for demonstration) */}
        <div className="mt-12 w-full">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              As Africa continues to experience rapid technological growth, the importance of quality tech education cannot be overstated. The continent stands at a pivotal moment where digital literacy and technical skills are becoming essential for economic participation and advancement.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our comprehensive analysis reveals the strategies needed to bridge the digital divide and create pathways for the next generation of African tech leaders. From innovative bootcamp programs to community-driven initiatives, the landscape of tech education in Africa is rapidly evolving.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              The Current Landscape
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Despite significant challenges, African nations are making remarkable strides in technology adoption and innovation. The rise of tech hubs, coding academies, and startup ecosystems across major cities demonstrates the continent's commitment to building a robust digital economy.
            </p>

            {/* Add more content sections as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticleHeader;