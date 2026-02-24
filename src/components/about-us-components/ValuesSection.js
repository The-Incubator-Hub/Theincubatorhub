"use client";

import Image from "next/image";

const VisionSection = () => {
  const cards = [
    {
      title: "Our Mission",
      icon: "/icons/target-icon.png",
      content: (
        <>
          <p>
            To foster digital literacy and innovation by providing quality
            digital education, creating supportive environments, and driving
            sustainable development.
          </p>
          <p className='mt-3'>
            To equip participants with practical skills and build a strong
            network of tech professionals leading Africa’s technological
            transformation.
          </p>
        </>
      ),
    },
    {
      title: "Our Vision & Core Values",
      icon: "/icons/values-icon.png",
      content: (
        <>
          <p>
            Empowering individuals and communities through accessible,
            world-class tech education for maximum social impact.
          </p>

          <div className='mt-4 grid grid-cols-2 gap-2 text-sm font-medium text-[#065F46]'>
            <span>• Excellence</span>
            <span>• Compassion</span>
            <span>• Innovation</span>
            <span>• Integrity</span>
            <span className='col-span-2'>• Team Spirit</span>
          </div>
        </>
      ),
    },
    {
      title: "Our Objectives",
      icon: "/icons/scroll.png",
      content: (
        <>
          <p>Promote digital education across Africa.</p>
          <p className='mt-3'>
            Support UN Sustainable Development Goal 4 by ensuring inclusive and
            equitable quality education.
          </p>
          <p className='mt-3'>
            Create value-driven environments and impactful community
            initiatives.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className='bg-[#FFFBF2] py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-14 max-w-3xl mx-auto'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1F2937]'>
            Our Purpose & Direction
          </h2>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {cards.map((card, index) => (
            <div
              key={index}
              className='bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm hover:shadow-md transition duration-300 flex flex-col'
            >
              {/* Title + Icon */}
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-semibold text-[#065F46]'>
                  {card.title}
                </h3>
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={26}
                  height={26}
                />
              </div>

              {/* Content */}
              <div className='text-gray-600 text-sm leading-relaxed'>
                {card.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
