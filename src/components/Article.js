'use client'; 
import React from 'react';  
import { User, Calendar, Clock } from 'lucide-react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Image from 'next/image';

const BlogArticleHeader = ({
  title = "The Future of Tech Education in Africa: Bridging the Digital Divide",
  category = "Education",
  featuredTag = "FEATURED",
  secondaryTag = "Education",
  featuredImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  author = "Sarah Okafor",
  publishDate = "2024-12-15T00:00:00.000Z",
  readTime = "5 mins",
  likes = 156,
  content,
  tags = []
}) => {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "December 15, 2024";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Custom components for TinaMarkdown
  const components = {
    p: (props) => <p style={{ 
      fontFamily: 'Onest, sans-serif',
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0px',
      color: '#000000',
      margin: 0,
      marginBottom: '16px'
    }} {...props} />,
    h2: (props) => <h2 style={{ 
      fontFamily: 'Onest, sans-serif',
      fontWeight: 700,
      fontStyle: 'normal',
      fontSize: '24px',
      lineHeight: '150%',
      letterSpacing: '0px',
      color: '#000000',
      margin: 0,
      marginTop: '24px',
      marginBottom: '16px'
    }} {...props} />,
    h3: (props) => <h3 style={{ 
      fontFamily: 'Onest, sans-serif',
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '18px',
      lineHeight: '150%',
      letterSpacing: '0px',
      color: '#000000',
      margin: 0,
      marginTop: '16px',
      marginBottom: '12px'
    }} {...props} />,
    ul: (props) => <ul className="list-none pl-0" style={{ margin: 0, padding: 0, marginBottom: '16px' }} {...props} />,
    li: (props) => <li style={{ 
      fontFamily: 'Onest, sans-serif',
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0px',
      color: '#000000',
      margin: 0,
      marginBottom: '8px',
      paddingLeft: '20px',
      listStyle: 'disc'
    }} {...props} />,
  };   
  return ( 
    <div className="min-h-screen bg-gray-50 pt-20">  
      {/* Main Container */} 
      <div className="max-w-[1280px] mx-auto py-12 px-6">  
        {/* Tags Section */}
        <div className="flex gap-3 mb-8"> 
          {featuredTag && (
            <span className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-full"> 
              {featuredTag}
            </span>
          )}
          {secondaryTag && (
            <span className="px-6 py-2.5 bg-gray-300 text-gray-800 text-sm font-semibold rounded-full">  
              {secondaryTag}
            </span>
          )}
        </div>   

        {/* Article Title */} 
        <h1     
            className="mb-8 max-w-full" 
            style ={{  
            fontFamily: 'Raleway, sans-serif',     
            fontWeight: 700,     
            fontSize: '48px',   
            lineHeight: '140%',      
            letterSpacing: '0px', 
            color: '#0C0D0D'  
          }}
        > 
        {title}
        </h1>   
        {/* Article Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-600">
          {/* Author */}
          {author && (
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-medium text-gray-800">{author}</span>
            </div>
          )}

          {/* Date */}
          {publishDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{formatDate(publishDate)}</span> 
            </div>
          )}

          {/* Reading Time */}
          {readTime && (
            <div className="flex items-center gap-2"> 
              <Clock className="w-5 h-5 text-gray-500" /> 
              <span>{readTime} read</span> 
            </div>
          )}
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="w-full overflow-hidden shadow-2xl rounded-lg">
            <Image
              src={featuredImage}
              alt={title}
              width={1200}
              height={575}
              className="w-full h-[575px] object-cover"
            />
          </div>
        )} 

      {/* Article Content Section */}
      {content && (
        <div 
          style={{
            width: '100%',
            maxWidth: '1280px',
            opacity: 1,
            transform: 'rotate(0deg)',
            marginTop: '48px',
            fontFamily: 'Onest, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '150%',
            color: '#000000',
            letterSpacing: '0px'
          }}
        >
          <div className="max-w-none">
            <TinaMarkdown components={components} content={content} />
          </div>
        </div>
      )}

      {/* Tags Section */}
      {tags && tags.length > 0 && (
        <>
          <h2 style={{ 
            fontFamily: 'Onest, sans-serif',
            fontWeight: 700,
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '150%',
            letterSpacing: '0px',
            color: '#000000',
            margin: 0,
            marginTop: '24px',
            marginBottom: '16px'
          }}>
            Tags
          </h2>

          <div className="flex flex-wrap gap-3" style={{ marginBottom: '24px' }}>
            {tags.map((tag, index) => (
              <button 
                key={index}
                className="px-5 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-full transition-colors duration-200 hover:bg-gray-700 hover:text-white"
              >
                {tag.name || tag}
              </button>
            ))}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

const Article = BlogArticleHeader;
export default Article;