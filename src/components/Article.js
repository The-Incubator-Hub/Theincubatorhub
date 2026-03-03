'use client'; 
import React from 'react';  
import { User, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';

const paragraphStyle = {
  fontFamily: 'Onest, sans-serif',
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '16px',
  lineHeight: '150%',
  letterSpacing: '0px',
  color: '#000000',
  margin: 0,
  marginBottom: '16px'
};

const heading2Style = {
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
};

const heading3Style = {
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
};

const getNodeText = (node) => {
  if (!node || typeof node !== 'object') return '';
  if (typeof node.text === 'string') return node.text;
  if (Array.isArray(node.children)) {
    return node.children.map((child) => getNodeText(child)).join('');
  }
  return '';
};

const renderArticleContent = (content) => {
  if (!content) return null;

  if (typeof content === 'string') {
    return content
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph, index) => (
        <p key={`text-${index}`} style={paragraphStyle}>
          {paragraph}
        </p>
      ));
  }

  if (!content || typeof content !== 'object' || !Array.isArray(content.children)) {
    return null;
  }

  return content.children.map((block, index) => {
    if (!block || typeof block !== 'object') return null;

    if (block.type === 'h2') {
      return (
        <h2 key={`h2-${index}`} style={heading2Style}>
          {getNodeText(block)}
        </h2>
      );
    }

    if (block.type === 'h3') {
      return (
        <h3 key={`h3-${index}`} style={heading3Style}>
          {getNodeText(block)}
        </h3>
      );
    }

    if (block.type === 'ul') {
      return (
        <ul
          key={`ul-${index}`}
          className="list-none pl-0"
          style={{ margin: 0, padding: 0, marginBottom: '16px' }}
        >
          {(block.children || []).map((li, liIndex) => (
            <li
              key={`li-${index}-${liIndex}`}
              style={{
                ...paragraphStyle,
                paddingLeft: '20px',
                listStyle: 'disc',
              }}
            >
              {getNodeText(li)}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={`p-${index}`} style={paragraphStyle}>
        {getNodeText(block)}
      </p>
    );
  });
};

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
            {renderArticleContent(content)}
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
