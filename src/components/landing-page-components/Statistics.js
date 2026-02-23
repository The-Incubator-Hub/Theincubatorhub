"use client";

export default function Statistics() {
  const stats = [
    {
      number: "185,034+",
      label: "Direct Beneficiaries",
    },
    {
      number: "16+",
      label: "Strategic Partners",
    },
    {
      number: "132+",
      label: "Countries Reached",
    },
    {
      number: "250+",
      label: "African Cities Impacted",
    },
  ];

  return (
    <div className='bg-[#141414] px-4 py-16 md:py-24'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-normal text-white text-center mb-12 md:mb-16'>
          Platform Impact Metrics
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='flex flex-col items-center justify-center py-8 md:py-12 px-4 md:border-r border-[#C7C7CC] last:md:border-r-0'
            >
              <p className='text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 md:mb-4'>
                {stat.number}
              </p>
              <p className='text-white text-sm md:text-base font-medium tracking-wide text-center'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
