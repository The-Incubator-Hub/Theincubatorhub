import React from 'react';

export default function ProgramHeader() {
  const programs = [
    'Data Analysis',
    'Product Design',
    'Virtual Assistant',
    'Web Development'
  ];

  const stats = [
    { value: '1,000+', label: 'GRADUATES' },
    { value: '3 months', label: 'TRAINING DURATION' },
    { value: '8', label: 'TECH PROGRAMS' }
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">
      <div className="max-w-6xl w-full   p-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className='bg-white rounded-2xl p-2'> 
            {/* Left Side - Images */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop"
                    alt="Team meeting"
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop"
                    alt="Collaborative work"
                    className="w-full h-full object-cover"
                    />
                </div>
                </div>
                <div className="">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop"
                    alt="Mentorship session"
                    className="w-full h-full object-cover"
                    />
                </div>
                </div>
            </div>
          </div>


          {/* Right Side - Content */}
          <div className="flex flex-col ">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6 leading-tight">
              A Bootcamp Of Excellence
            </h1>
            
            <div className="border-l-4 border-[#545050] pl-4 mb-8">
              <p className="text-[#4B5563] text-base leading-relaxed">
                Support aspiring developers, data scientist, and tech enthusiast through 
                comprehensive bootcamps and training programs that transforms careers.
              </p>
            </div>

            {/* Program Tags */}
            <div className="flex flex-wrap gap-3 mb-12">
              {programs.map((program, index) => (
                <span
                  key={index}
                  className="px-2 py-2 bg-[#E5E7EB] border border-[#9CA3AF] text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {program}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center justify-center items-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-semibold place-self-center text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium place-self-center tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}