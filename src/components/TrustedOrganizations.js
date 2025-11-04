"use client"
import Image from 'next/image'

export default function TrustedOrganizations() {
  const organizations = [
    { name: "YouTube", logo: "/youtube.png" },
    { name: "Slack", logo: "/slack.png" },
    { name: "Amazon", logo: "/amazon.png" },
    { name: "Microsoft", logo: "/microsoft.png" },
    { name: "Lenovo", logo: "/lenovo.png" },
    { name: "Netflix", logo: "/netflix.png" },
    { name: "Google", logo: "/google.png" },
    { name: "Dribbble", logo: "/dribble.png" },
  ]

  return (
    <div className="bg-white px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto justify-between">
        {/* Container with dotted border */}
        <div className=" flex justify-between">
          <div className="w-md ">
            {/* Heading */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#061C3D] mb-6 text-balance">
              We're working with 20 trusted Organization
            </h2>

            {/* Description */}
            <p className="text-[#42526B] text-base md:text-lg mb-10 md:mb-14 max-w-2xl leading-relaxed">
              Believe me, these trusted clients have been with us for a long time. We have a strong relationship with
              them.
            </p>
          </div>

          {/* Organizations Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {organizations.map((org, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 md:p-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-4xl md:text-5xl mb-3"><Image src={org.logo} alt={org.name} width={100} height={100} /></div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
