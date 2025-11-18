import React from 'react';

const TechGenerationHero = () => {
  const technologies = ['Python', 'UI/UX', 'Virtual Assistant', 'Cloud', 'React'];
  
  const stats = [
    { value: '25,000+', label: 'GRADUATES' },
    { value: '8', label: 'TECH PROGRAMS' },
    { value: '191', label: 'COUNTRIES REACHED' }
  ];

  return (
    <div className="bg-white min-h-screen py-12 px-4 mt-16 md:mt-18 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="relative">
            
            <div className="">
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Fund the Next<br />
                Tech <span className="relative inline-block">
                  <span className="relative bg-[#BBF7D0] z-10">Generation</span>
                </span>
              </h1>

              {/* Description */}
              <div  className='relative'>
                <div className="absolute left-0 top-0 w-1 h-14 bg-[#545050] mt-1"></div>
                <p className="pl-8 text-gray-600 text-base mb-8 max-w-lg leading-relaxed">
                  Support aspiring developers, data scientist, and tech enthusiast through 
                  comprehensive bootcamps and training programs that transforms careers.
                </p>
              </div>


              {/* Technology Tags */}
              <div className="flex flex-wrap gap-3 mb-12">
                {technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-5 py-2 border border-[#9CA3AF] bg-gray-100 text-[#4A4459] text-sm rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Image Circle */}
          <div className="relative flex justify-center items-center">
            {/* Main Circle */}
            <div className="relative">
              <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] rounded-full bg-gray-300 overflow-hidden border-4 border-white shadow-2xl">
                {/* Placeholder for image */}
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop"
                  alt="Students learning"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Students Impacted Badge */}
              <div className="absolute -bottom-3 justify-self-center items-center bg-white rounded-2xl shadow-xl px-6 py-4 border border-gray-100">
                <div className="text-xs text-gray-500 mb-1">Students Impacted</div>
                <div className="text-2xl font-bold text-gray-900">50,000+</div>
              </div>
            </div>

            {/* Decorative dots (optional) */}
            <div className="absolute -top-8 -left-8 opacity-20">
              <div className="grid grid-cols-3 gap-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-orange-400 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechGenerationHero;