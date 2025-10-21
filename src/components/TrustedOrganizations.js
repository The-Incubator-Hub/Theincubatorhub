"use client"

export default function TrustedOrganizations() {
  const organizations = [
    { name: "YouTube", logo: "📺" },
    { name: "Slack", logo: "💬" },
    { name: "Amazon", logo: "🛍️" },
    { name: "Microsoft", logo: "🪟" },
    { name: "Lenovo", logo: "💻" },
    { name: "Netflix", logo: "🎬" },
    { name: "Google", logo: "🔍" },
    { name: "Dribbble", logo: "🎨" },
  ]

  return (
    <div className="bg-white px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Container with dotted border */}
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 md:p-12">
          {/* Top blue accent line */}
          <div className="h-1 bg-blue-500 rounded-full mb-8 md:mb-12"></div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 text-balance">
            We're working with 20 trusted Organization
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg mb-10 md:mb-14 max-w-2xl leading-relaxed">
            Believe me, these trusted clients have been with us for a long time. We have a strong relationship with
            them.
          </p>

          {/* Organizations Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {organizations.map((org, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 md:p-8 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-4xl md:text-5xl mb-3">{org.logo}</div>
                <p className="text-gray-700 font-semibold text-sm md:text-base text-center">{org.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
