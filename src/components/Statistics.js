"use client"

export default function Statistics() {
  const statistics = [
    {
      number: "1700+",
      label: "DIRECT BENEFICIARIES",
    },
    {
      number: "23+",
      label: "PARTNERS",
    },
    {
      number: "183+",
      label: "COUNTRIES REACHED",
    },
    {
      number: "31+",
      label: "AFRICA CITIES REACHED",
    },
  ]

  return (
    <div className="bg-gray-900 px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">


        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 md:mb-16 text-balance">
          Why choose Our Platform
        </h2>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-8 md:py-12 px-4 border-r border-gray-700 last:border-r-0"
            >
              {/* Number */}
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">{stat.number}</p>
              {/* Label */}
              <p className="text-gray-400 text-sm md:text-base font-semibold tracking-wide text-center">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
