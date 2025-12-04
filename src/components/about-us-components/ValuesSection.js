import React from 'react';
import Image from 'next/image';

const ValuesSection = () => {
  const cards = [
    {
      title: "Our Vision",
      icon: (
        <Image src="/icons/scroll.png" alt="Mission" width={24} height={24} />
      ),
      description: "We launched Paleovalley with the belief that every ingredient is an opportunity to improve your health. We launched Paleovalley with the belief that every ingredient is an opportunity to improve your health."
    },
    {
      title: "Our Mission",
      icon: (
        <Image src="/icons/target-icon.png" alt="Mission" width={24} height={24} />
      ),
      description: "We launched Paleovalley with the belief that every ingredient is an opportunity to improve your health. We launched Paleovalley with the belief that every ingredient is an opportunity to improve your health."
    },
    {
      title: "Our Values",
      icon: (
        <Image src="/icons/values-icon.png" alt="Mission" width={24} height={24} />
      ),
      description: "We launched Paleovalley with the belief that every ingredient is an opportunity to improve your health. We launched Paleovalley with the belief that every ingredient is an opportunity to improve your health."
    }
  ];

  return (
    <div className="bg-orange-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              We Stick Closely To<br />Our Values
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 text-base leading-relaxed">
              At Paleovalley, our mission is to help people reclaim vibrant health. We provide 
              products that prioritize nutrient density in an industry that prioritizes everything 
              else. We believe that every dietary choice and every added ingredient is a 
              powerful opportunity to love and care for onese
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="bg-green-40 w-sm border border-[#BBF7D0] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8"
            >

              {/* Title and Icon */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-normal text-teal-700">
                  {card.title}
                </h3>
                <div className="text-gray-900">
                  {card.icon}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;