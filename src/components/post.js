'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Clock, Heart, ArrowRight, User } from 'lucide-react';

const defaultBlogPosts = [
  {
    id: 1,
    category: 'Success Stories',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    title: 'Success Stories: From Bootcamp to Tech Leadership',
    description:
      'Meet five graduates who transformed their careers through our intensive training programs.',
    author: 'Sarah Okafor',
    date: 'December 15, 2025',
    readTime: '5 mins',
    likes: 100,
    slug: 'future-of-tech-education',
  },
  {
    id: 2,
    category: 'Industry Inclusivity',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    title: 'Breaking Barriers: Women in Tech Africa Initiative Results',
    description:
      'Analyzing the impact of targeted programs in increasing female participation in technology careers.',
    author: 'Sarah Okafor',
    date: 'December 15, 2025',
    readTime: '5 mins',
    likes: 100,
    slug: 'future-of-tech-education',
  },
  {
    id: 3,
    category: 'Industry Insights',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    title: 'The Rise of Remote Work: Opportunities for African Tech Talent',
    description:
      'How global remote work trends are creating unprecedented opportunities for African developers.',
    author: 'Sarah Okafor',
    date: 'December 15, 2025',
    readTime: '5 mins',
    likes: 100,
    slug: 'future-of-tech-education',
  },
];

function normalizePost(post, index) {
  const id = Number(post?.id) || index + 1;
  const slug = typeof post?.slug === 'string' ? post.slug.trim() : '';
  const customHref = typeof post?.href === 'string' ? post.href.trim() : '';

  return {
    id,
    category: post?.category || 'Blog',
    image:
      post?.image ||
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    title: post?.title || 'Untitled Blog Post',
    description: post?.description || 'No description available.',
    author: post?.author || 'Incubator Team',
    date: post?.date || 'Recent',
    readTime: post?.readTime || '5 mins',
    likes: Number(post?.likes) || 0,
    href: customHref || (slug ? `/blogdetails/${slug}` : ''),
  };
}

const BlogPostsGrid = ({ title, description, posts = [] }) => {
  const blogPosts =
    Array.isArray(posts) && posts.length > 0
      ? posts.map((post, index) => normalizePost(post, index))
      : defaultBlogPosts.map((post, index) => normalizePost(post, index));

  const [likedPosts, setLikedPosts] = useState({});

  const handleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className='bg-white pt-12 pb-12 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            {title || 'Latest Blog Posts'}
          </h1>
          <p className='text-gray-600 text-lg'>
            {description ||
              'Watch the video highlight of future clan bootcamp 2024 through our lens'}
          </p>
        </div>

        <div className='stagger-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className='hover-lift bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300'
            >
              <div className='relative h-64 overflow-hidden'>
                <img
                  src={post.image}
                  alt={post.title}
                  loading='lazy'
                  decoding='async'
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute top-4 left-4'>
                  <span className='px-4 py-2 bg-white text-gray-800 text-sm font-medium rounded-full shadow-md'>
                    {post.category}
                  </span>
                </div>
              </div>

              <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-green-600 transition-colors cursor-pointer'>
                  {post.title}
                </h3>

                <p className='text-gray-600 text-sm mb-6 leading-relaxed'>
                  {post.description}
                </p>

                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
                    <User className='w-5 h-5 text-green-600' />
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-gray-900'>{post.author}</p>
                    <p className='text-xs text-gray-500'>{post.date}</p>
                  </div>
                </div>

                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                  <div className='flex items-center gap-4 text-gray-600 text-sm'>
                    <div className='flex items-center gap-1.5'>
                      <Clock className='w-4 h-4' />
                      <span>{post.readTime}</span>
                    </div>
                    <button
                      onClick={() => handleLike(post.id)}
                      className='btn-micro flex items-center gap-1.5 hover:text-red-500 transition-colors'
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedPosts[post.id] ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                      <span>{post.likes}</span>
                    </button>
                  </div>

                  {post.href ? (
                    <Link
                      href={post.href}
                      className='btn-micro flex items-center gap-2 text-gray-900 font-semibold text-sm hover:gap-3 transition-all group'
                    >
                      Learn More
                      <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </Link>
                  ) : (
                    <button className='btn-micro flex items-center gap-2 text-gray-900 font-semibold text-sm hover:gap-3 transition-all group'>
                      Learn More
                      <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostsGrid;
