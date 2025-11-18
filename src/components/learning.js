'use client';

import { Search, Folder, Cloud } from 'lucide-react';

// Custom icon components matching the exact designs
const CrossedWrenches = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* First wrench - top-left to bottom-right */}
    <path d="M4 8L10 14" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" />
    <circle cx="4" cy="8" r="3.5" fill="#6B7280" stroke="#9333EA" strokeWidth="2.5" />
    <circle cx="10" cy="14" r="3.5" fill="#6B7280" stroke="#9333EA" strokeWidth="2.5" />
    
    {/* Second wrench - top-right to bottom-left */}
    <path d="M28 8L22 14" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" />
    <circle cx="28" cy="8" r="3.5" fill="#6B7280" stroke="#9333EA" strokeWidth="2.5" />
    <circle cx="22" cy="14" r="3.5" fill="#6B7280" stroke="#9333EA" strokeWidth="2.5" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Briefcase body - reddish brown */}
    <rect x="5" y="11" width="22" height="15" rx="2" fill="#A16207" stroke="#7C3AED" strokeWidth="2.5" />
    <rect x="5" y="15" width="22" height="1" fill="#7C3AED" />
    {/* Handle */}
    <path d="M11 11C11 9.89543 11.8954 9 13 9H19C20.1046 9 21 9.89543 21 11" stroke="#7C3AED" strokeWidth="2.5" fill="none" />
    {/* Yellow clasp */}
    <path d="M13 15C13 16.1046 13.8954 17 15 17H17C18.1046 17 19 16.1046 19 15" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <ellipse cx="16" cy="19" rx="5" ry="2.5" fill="#F59E0B" />
  </svg>
);

const HandshakeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left hand - lighter yellowish-orange */}
    <path d="M8 20L12 16L14 18L10 22Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    <ellipse cx="10" cy="19" rx="2.5" ry="3.5" fill="#F59E0B" />
    <ellipse cx="12" cy="17" rx="2" ry="3" fill="#F59E0B" />
    
    {/* Right hand - darker medium-brown */}
    <path d="M24 12L20 16L18 14L22 10Z" fill="#A16207" stroke="#92400E" strokeWidth="1.5" />
    <ellipse cx="22" cy="13" rx="2.5" ry="3.5" fill="#A16207" />
    <ellipse cx="20" cy="15" rx="2" ry="3" fill="#A16207" />
    
    {/* Clasped area */}
    <ellipse cx="16" cy="16" rx="3" ry="2" fill="#D97706" />
  </svg>
);

const StackedBooks = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bottom book - Blue */}
    <rect x="4" y="20" width="18" height="8" rx="1" fill="#3B82F6" />
    <rect x="4" y="20" width="18" height="1" fill="#FFFFFF" />
    <rect x="4" y="20" width="1" height="8" fill="#1E40AF" />
    
    {/* Middle book - Orange */}
    <rect x="6" y="16" width="18" height="8" rx="1" fill="#F97316" />
    <rect x="6" y="16" width="18" height="1" fill="#FFFFFF" />
    <rect x="6" y="16" width="1" height="8" fill="#C2410C" />
    
    {/* Top book - Green */}
    <rect x="8" y="12" width="18" height="8" rx="1" fill="#10B981" />
    <rect x="8" y="12" width="18" height="1" fill="#FFFFFF" />
    <rect x="8" y="12" width="1" height="8" fill="#047857" />
  </svg>
);

const CloudFolder = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10C6 8.89543 6.89543 8 8 8H12L14 6H24C25.1046 6 26 6.89543 26 8V24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V10Z" fill="#2563EB" />
    <path d="M6 10C6 8.89543 6.89543 8 8 8H12L14 6H24C25.1046 6 26 6.89543 26 8V24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V10Z" stroke="#1E40AF" strokeWidth="1.5" />
    <path d="M16 14C17.5 14 18.5 15 19 16C20.5 16 22 17.5 22 19C22 20.5 20.5 22 19 22H13C11.5 22 10 20.5 10 19C10 17.5 11.5 16 13 16C13.5 15 14.5 14 16 14Z" fill="#FFFFFF" />
  </svg>
);

export default function LearningResources() {
  const resources = [
    {
      title: 'All Resources',
      description: 'View all available resources',
      icon: <CloudFolder />,
      bgColor: 'bg-green-50',
      textColor: 'text-gray-900',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      highlighted: true,
    },
    {
      title: 'Learning Materials',
      description: 'In-depth guides and study materials for every skill level.',
      icon: <StackedBooks />,
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
    },
    {
      title: 'Career Resources',
      description: 'Access resume templates and interview materials.',
      icon: <BriefcaseIcon />,
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
    },
    {
      title: 'Tools & Templates',
      description: 'All the essential tools and templates you need.',
      icon: <CrossedWrenches />,
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
    },
    {
      title: 'Community Resources',
      description: 'Engage with peers & explore our community resources.',
      icon: <HandshakeIcon />,
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
    },
    {
      title: 'All Resources',
      description: 'View all available resources',
      icon: <CloudFolder />,
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
    },
  ];

  return (
    <div className="bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header + Search – Now Tight & Beautiful */}
        <div className="text-center w-full">
          <h1
            className="mx-auto max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 px-4"
            style={{ fontFamily: 'var(--font-lexend), sans-serif' }}
          >
            Learning Resources
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-4">
            Access our comprehensive collection of learning materials, tools, templates, and resources to accelerate your tech journey and career development.
          </p>

          {/* Search Bar – Close to the text */}
          <div className="mx-auto mt-8 max-w-md w-full px-4">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm sm:text-base shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           hover:border-gray-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Resource Cards Grid – Fully Responsive */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 lg:gap-2 xl:gap-2 w-full justify-items-center">
          {resources.map((resource, index) => (
            <div
              key={index}
              className={`group relative border ${resource.borderColor} ${
                resource.highlighted ? resource.bgColor : 'bg-white'
              } shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-center w-full max-w-[199px] min-h-[126px] flex flex-col justify-between`}
              style={{
                borderRadius: '8px',
                borderWidth: '1px',
                paddingTop: '16px',
                paddingRight: 'clamp(12px, 2vw, 20px)',
                paddingBottom: '16px',
                paddingLeft: 'clamp(12px, 2vw, 20px)',
              }}
            >
              <div className="flex-shrink-0">
                <div
                  className={`inline-flex items-center justify-center p-2 sm:p-3 rounded-lg ${
                    resource.highlighted ? resource.iconBg : resource.iconBg
                  } mb-2 mx-auto`}
                >
                  <div className={resource.highlighted ? resource.iconColor : resource.iconColor}>
                    {resource.icon}
                  </div>
                </div>

                <h3 className={`font-bold ${resource.textColor} mb-1 text-xs sm:text-sm`} style={{ lineHeight: '1.2' }}>
                  {resource.title}
                </h3>
              </div>
              
              <p className="text-gray-600 text-[10px] sm:text-xs flex-shrink-0" style={{ lineHeight: '1.3' }}>
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}