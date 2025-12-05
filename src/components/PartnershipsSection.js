'use client';

import Image from "next/image";

export default function PartnershipsSection() {
  return (
    <section className="bg-gray-50 pt-[64px]">
      <div className="max-w-[1440px] mx-auto px-20 py-8 grid lg:grid-cols-2 gap-[35px] items-center" style={{ minHeight: '676px' }}>
        {/* Left Text Column */}
        <div className="space-y-8" style={{ width: '626px', height: '439px', opacity: 1 }}>
          <p className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
            Partnerships
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Building the future of African tech education <span className="bg-green-400 px-2 py-1 rounded">together</span>
          </h1>

          <div className="text-gray-700 text-base md:text-lg">
            <p className="pl-6 border-l-4 border-gray-900 leading-relaxed">
              We collaborate with visionary organizations, industry leaders, and
              institutions who share our mission to transform lives through
              technology education across Africa.
            </p>
          </div>

          <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
            Become A Partner
          </button>
        </div>

        {/* Right Image Grid - Asymmetric Layout */}
        <div className="grid grid-cols-2 gap-4 auto-rows-[200px]">
          {/* Top Left - Business Meeting */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/business-meeting-professionals.jpg"
              alt="Business meeting with professionals"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right - Outdoor Team (Tall) */}
          <div className="rounded-2xl overflow-hidden shadow-lg row-span-2">
            <Image
              src="/professional-team-collaboration-mentoring.jpg"
              alt="Team standing together outdoors"
              width={400}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left - Team Collaboration */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/team-collaboration-working-together.jpg"
              alt="Team collaborating on project"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom - Handshake (Wide) */}
          <div className="rounded-2xl overflow-hidden shadow-lg col-span-2">
            <Image
              src="/handshake-partnership-agreement.jpg"
              alt="Professional partnership handshake"
              width={800}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
