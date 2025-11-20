"use client";

import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const programsDropdownRef = useRef(null);
  const mediaDropdownRef = useRef(null);

  // Mobile dropdown toggle handlers
  const toggleMobileProgramsDropdown = () => {
    setIsProgramsDropdownOpen(prev => !prev);
  };

  const toggleMobileMediaDropdown = () => {
    setIsMediaDropdownOpen(prev => !prev);
  };

  // Handle scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsProgramsDropdownOpen(false);
        setIsMediaDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open and reset dropdowns
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset dropdowns when menu closes
      setIsProgramsDropdownOpen(false);
      setIsMediaDropdownOpen(false);
    }
  }, [isMobileMenuOpen]);

  // Close dropdowns when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only apply click-outside logic on desktop (when mobile menu is closed)
      if (!isMobileMenuOpen) {
        if (programsDropdownRef.current && !programsDropdownRef.current.contains(event.target)) {
          setIsProgramsDropdownOpen(false);
        }
        if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(event.target)) {
          setIsMediaDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white h-16 md:h-20 transition-shadow duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-md'
      }`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          {/* Logo */}
          <div 
            className="cursor-pointer transition-transform duration-300 hover:scale-105 flex-shrink-0 active:scale-95 max-w-[180px] sm:max-w-[220px] md:max-w-[252px] h-auto"
            onClick={() => window.location.href = '/'}
            role="button"
            tabIndex="0"
            aria-label="Go to home page"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = '/';
              }
            }}
          >
            <img 
              src="/images/Iogo_incubator.png" 
              alt="Incubator Logo" 
              className="w-full h-auto object-contain"
              style={{ maxHeight: '26px' }}
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button 
            className="px-3 xl:px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => window.location.href = '/'}
          >
            <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
              Home
            </span>
          </button>
          
          <button 
            className="px-3 xl:px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => window.location.href = '/about'}
          >
            <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
              About
            </span>
          </button>
          
          <button 
            className="px-3 xl:px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => window.location.href = '/programs'}
          >
            <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
              Programs
            </span>
          </button>
          
          <button 
            className="px-3 xl:px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => window.location.href = '/blog'}
          >
            <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
              Blog
            </span>
          </button>
          
          <button 
            className="px-3 xl:px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => window.location.href = '/resources'}
          >
            <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
              Resources
            </span>
          </button>
          
          {/* Get Involved Dropdown */}
          <div className="relative" ref={programsDropdownRef}>
            <button 
              className={`px-2 xl:px-3 py-2.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 group ${
                isProgramsDropdownOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setIsProgramsDropdownOpen(!isProgramsDropdownOpen);
                setIsMediaDropdownOpen(false);
              }}
              aria-expanded={isProgramsDropdownOpen}
              aria-haspopup="true"
            >
              <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
                Get Involved
              </span>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-300 ease-in-out text-gray-700 group-hover:text-black ${
                  isProgramsDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                style={{ transformOrigin: 'center' }}
              >
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
              </svg>
            </button>
            
            {isProgramsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                <button 
                  className="w-full h-11 flex items-center px-4 hover:bg-green-50 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/getinvolved';
                    setIsProgramsDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs xl:text-sm text-gray-700 group-hover:text-gray-900 text-left transition-colors duration-150">
                    Get Involved
                  </span>
                </button>
                <button 
                  className="w-full h-11 flex items-center px-4 hover:bg-green-50 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/careers';
                    setIsProgramsDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs xl:text-sm text-gray-700 group-hover:text-gray-900 text-left transition-colors duration-150">
                    Careers
                  </span>
                </button>
                <button 
                  className="w-full h-11 flex items-center px-4 hover:bg-green-50 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/donate';
                    setIsProgramsDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs xl:text-sm text-gray-700 group-hover:text-gray-900 text-left transition-colors duration-150">
                    Donate
                  </span>
                </button>
              </div>
            )}
          </div>
          
          {/* Media Dropdown */}
          <div className="relative" ref={mediaDropdownRef}>
            <button 
              className={`px-2 xl:px-3 py-2.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 group ${
                isMediaDropdownOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setIsMediaDropdownOpen(!isMediaDropdownOpen);
                setIsProgramsDropdownOpen(false);
              }}
              aria-expanded={isMediaDropdownOpen}
              aria-haspopup="true"
            >
              <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
                Media
              </span>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-300 ease-in-out text-gray-700 group-hover:text-black ${
                  isMediaDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                style={{ transformOrigin: 'center' }}
              >
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
              </svg>
            </button>
            
            {isMediaDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                <button 
                  className="w-full h-11 flex items-center px-4 hover:bg-green-50 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/gallery';
                    setIsMediaDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs xl:text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                    Gallery
                  </span>
                </button>
                <button 
                  className="w-full h-11 flex items-center px-4 hover:bg-green-50 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/press';
                    setIsMediaDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs xl:text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                    Press
                  </span>
                </button>
                <button 
                  className="w-full h-11 flex items-center px-4 hover:bg-green-50 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/testimonies';
                    setIsMediaDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs xl:text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                    Testimonies
                  </span>
                </button>
              </div>
            )}
          </div>
          
          <button 
            className="px-3 xl:px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => window.location.href = '/teams'}
          >
            <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
              Teams
            </span>
          </button>
          
          <button 
            className="px-3 xl:px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => window.location.href = '/faqs'}
          >
            <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
              FAQs
            </span>
          </button>
          
          <button 
            className="px-3 xl:px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => window.location.href = '/contact'}
          >
            <span className="font-montserrat font-semibold text-xs xl:text-sm text-black whitespace-nowrap">
              Contact
            </span>
          </button>
          
          <button 
            className="px-4 xl:px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 active:bg-gray-950 transition-all duration-200 ml-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => window.location.href = '/donate'}
          >
            <span className="font-inter font-semibold text-xs xl:text-sm text-white whitespace-nowrap">
              Donate
            </span>
          </button>
          </div>
          
          {/* Mobile Menu Toggle - Improved Hamburger */}
          <button
            className="lg:hidden p-2 -mr-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span 
                className={`block h-0.5 w-full bg-gray-900 rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span 
                className={`block h-0.5 w-full bg-gray-900 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span 
                className={`block h-0.5 w-full bg-gray-900 rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 lg:hidden ${
          isMobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 md:top-20 right-0 bottom-0 w-full max-w-sm bg-white z-40 transform transition-all duration-300 ease-in-out lg:hidden overflow-y-auto shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col p-4 sm:p-6 space-y-1 min-h-full">
          {/* Home Link */}
          <button 
            className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 group"
            onClick={() => {
              window.location.href = '/';
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
              Home
            </span>
          </button>
          
          {/* Separator Line */}
          <div className="border-t border-gray-200 my-1"></div>
          
          {/* About Link */}
          <button 
            className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 group"
            onClick={() => {
              window.location.href = '/about';
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
              About
            </span>
          </button>
          
          {/* Programs Link */}
          <button 
            className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 group"
            onClick={() => {
              window.location.href = '/programs';
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
              Programs
            </span>
          </button>
          
          {/* Blog Link */}
          <button 
            className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 group"
            onClick={() => {
              window.location.href = '/blog';
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
              Blog
            </span>
          </button>
          
          {/* Resources Link */}
          <button 
            className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 group"
            onClick={() => {
              window.location.href = '/resources';
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
              Resources
            </span>
          </button>
          
          {/* Mobile Get Involved Dropdown */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <button 
              className={`w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg transition-colors duration-200 group ${
                isProgramsDropdownOpen ? 'bg-gray-100' : 'hover:bg-gray-100 active:bg-gray-200'
              }`}
              onClick={toggleMobileProgramsDropdown}
              aria-expanded={isProgramsDropdownOpen}
              type="button"
            >
              <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
                Get Involved
              </span>
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-300 ease-in-out text-gray-700 group-hover:text-gray-900 ${
                  isProgramsDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                style={{ transformOrigin: 'center' }}
              >
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
              </svg>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isProgramsDropdownOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <div className="pl-2 space-y-1">
                <button 
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-green-50 active:bg-green-100 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/getinvolved';
                    setIsMobileMenuOpen(false);
                    setIsProgramsDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                    Get Involved
                  </span>
                </button>
                <button 
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-green-50 active:bg-green-100 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/careers';
                    setIsMobileMenuOpen(false);
                    setIsProgramsDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                    Careers
                  </span>
                </button>
                <button 
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-green-50 active:bg-green-100 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/donate';
                    setIsMobileMenuOpen(false);
                    setIsProgramsDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                    Donate
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Media Dropdown */}
          <div className="border-t border-gray-200 pt-3 mt-2">
            <button 
              className={`w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg transition-colors duration-200 group ${
                isMediaDropdownOpen ? 'bg-gray-100' : 'hover:bg-gray-100 active:bg-gray-200'
              }`}
              onClick={toggleMobileMediaDropdown}
              aria-expanded={isMediaDropdownOpen}
              type="button"
            >
              <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
                Media
              </span>
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-300 ease-in-out text-gray-700 group-hover:text-gray-900 ${
                  isMediaDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                style={{ transformOrigin: 'center' }}
              >
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
              </svg>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMediaDropdownOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <div className="pl-2 space-y-1">
                <button 
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-green-50 active:bg-green-100 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/gallery';
                    setIsMobileMenuOpen(false);
                    setIsMediaDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                    Gallery
                  </span>
                </button>
                <button 
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-green-50 active:bg-green-100 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/press';
                    setIsMobileMenuOpen(false);
                    setIsMediaDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                    Press
                  </span>
                </button>
                <button 
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-green-50 active:bg-green-100 transition-colors duration-150 group"
                  onClick={() => {
                    window.location.href = '/testimonies';
                    setIsMobileMenuOpen(false);
                    setIsMediaDropdownOpen(false);
                  }}
                >
                  <span className="font-montserrat text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                    Testimonies
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Teams Link */}
          <button 
            className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 group border-t border-gray-200 mt-3 pt-5"
            onClick={() => {
              window.location.href = '/teams';
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
              Teams
            </span>
          </button>
          
          {/* FAQs Link */}
          <button 
            className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 group"
            onClick={() => {
              window.location.href = '/faqs';
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
              FAQs
            </span>
          </button>
          
          {/* Contact Link */}
          <button 
            className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 group"
            onClick={() => {
              window.location.href = '/contact';
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="font-montserrat font-semibold text-sm sm:text-base text-gray-900 group-hover:text-black">
              Contact
            </span>
          </button>
          
          {/* Donate Button */}
          <button 
            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg bg-gray-900 hover:bg-gray-800 active:bg-gray-950 transition-all duration-200 mt-4 sm:mt-6 shadow-sm hover:shadow-md"
            onClick={() => {
              window.location.href = '/donate';
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="font-inter font-semibold text-sm sm:text-base text-white">
              Donate
            </span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        /* Smooth scrollbar for mobile menu */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
}