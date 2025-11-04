import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ResumeCTA = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div 
          className="relative overflow-hidden"
          style={{
            width: '1280px',
            height: '421px',
            borderRadius: '16px',
            borderWidth: '2px',
            borderStyle: 'dashed',
            borderColor: 'white',
            opacity: 1,
            transform: 'rotate(0deg)',
            paddingTop: '95px', 
            paddingRight: '156px',
            paddingBottom: '95px',
            paddingLeft: '156px',
            gap: '10px',
            strokeDasharray: '10, 10'
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/images/joinus.jpg" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0" style={{ background: '#000000D9' }} />

          {/* Content */}
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Headline */}
            <h2 
              className="font-semibold text-gray-50 mb-4 sm:mb-6 md:mb-8"
              style={{
                width: '650px',
                height: '44px',
                opacity: 1,
                transform: 'rotate(0deg)',
                fontWeight: 600,
                fontSize: '40px',
                lineHeight: '44px',
                letterSpacing: '0',
                textAlign: 'center'
              }}
            >
              Don't see the Perfect Role?
            </h2>

            {/* Subheading */}
            <p 
              className="text-gray-50 mb-8 sm:mb-10 md:mb-12"
              style={{
                width: '680px',
                height: '78px',
                opacity: 1,
                transform: 'rotate(0deg)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '26px',
                letterSpacing: '0%',
                textAlign: 'center'
              }}
            >
              We're always looking for talented individuals who share our passion for education and technology. Send us your resume and let's start a conversation.
            </p>

            {/* CTA Button */}
            <Link
              href="/submit-resume"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              style={{
                width: '272px',
                height: '48px',
                borderRadius: '7px',
                opacity: 1,
                transform: 'rotate(0deg)',
                paddingLeft: '32px',
                paddingRight: '32px',
                gap: '12px'
              }}
            >
              <span 
                className="text-gray-900 capitalize flex-shrink-0"
                style={{
                  opacity: 1,
                  transform: 'rotate(0deg)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  lineHeight: '48px',
                  letterSpacing: '0%',
                  textTransform: 'capitalize'
                }}
              >
                Send Us Your Resume
              </span>
              <img 
                src="/images/ArrowRight.png"
                alt="Arrow Right"
                className="transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
                style={{
                  width: '24px',
                  height: '24px',
                  opacity: 1,
                  transform: 'rotate(0deg)'
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeCTA;