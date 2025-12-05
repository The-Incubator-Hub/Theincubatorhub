"use client"

import { useTina } from "tinacms/dist/react"
import Image from "next/image"
import { Layers, Book, Heart, TrendingUp, Users, Award, Briefcase, Target } from 'lucide-react'

// Icon mapping
const iconMap = {
  Layers,
  Book,
  Heart,
  TrendingUp,
  Users,
  Award,
  Briefcase,
  Target
}

export default function PartnershipsClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const partnershipsData = data?.partnerships || {}
  const heroData = partnershipsData.heroSection || {}
  const benefitsData = partnershipsData.benefits || {}
  const partnersData = partnershipsData.partners || {}
  const teamIntroData = partnershipsData.teamIntro || {}

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 pt-[64px]">
        <div className="max-w-[1440px] mx-auto px-20 py-8 grid lg:grid-cols-2 gap-[35px] items-center" style={{ minHeight: '676px' }}>
          {/* Left Text Column */}
          <div className="space-y-8" style={{ width: '626px', height: '439px', opacity: 1 }}>
            {heroData.tagline && (
              <p className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
                {heroData.tagline}
              </p>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {heroData.title && heroData.highlightedWord ? (
                <>
                  {heroData.title.split(heroData.highlightedWord)[0]}
                  <span className="bg-green-400 px-2 py-1 rounded">{heroData.highlightedWord}</span>
                  {heroData.title.split(heroData.highlightedWord)[1]}
                </>
              ) : (
                heroData.title || "Building the future of African tech education together"
              )}
            </h1>

            {heroData.description && (
              <div className="text-gray-700 text-base md:text-lg">
                <p className="pl-6 border-l-4 border-gray-900 leading-relaxed">
                  {heroData.description}
                </p>
              </div>
            )}

            {heroData.ctaButtonText && (
              <button 
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
                onClick={() => window.location.href = heroData.ctaButtonLink || '/contact'}
              >
                {heroData.ctaButtonText}
              </button>
            )}
          </div>

          {/* Right Image Grid - Asymmetric Layout */}
          <div className="grid grid-cols-2 gap-4 auto-rows-[200px]">
            {heroData.images && heroData.images.length >= 4 && (
              <>
                {/* Top Left - Business Meeting */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={heroData.images[0]?.src || "/business-meeting-professionals.jpg"}
                    alt={heroData.images[0]?.alt || "Business meeting"}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Top Right - Outdoor Team (Tall) */}
                <div className="rounded-2xl overflow-hidden shadow-lg row-span-2">
                  <Image
                    src={heroData.images[1]?.src || "/professional-team-collaboration-mentoring.jpg"}
                    alt={heroData.images[1]?.alt || "Team collaboration"}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom Left - Team Collaboration */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={heroData.images[2]?.src || "/team-collaboration-working-together.jpg"}
                    alt={heroData.images[2]?.alt || "Team working together"}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom - Handshake (Wide) */}
                <div className="rounded-2xl overflow-hidden shadow-lg col-span-2">
                  <Image
                    src={heroData.images[3]?.src || "/handshake-partnership-agreement.jpg"}
                    alt={heroData.images[3]?.alt || "Partnership handshake"}
                    width={800}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Team Intro Section (First Instance) */}
      {teamIntroData.title && (
        <section className="bg-white py-12 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {teamIntroData.title}
            </h2>
            {teamIntroData.description && (
              <p className="text-gray-600 text-lg">
                {teamIntroData.description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Partnership Benefits Section */}
      {benefitsData.benefits && benefitsData.benefits.length > 0 && (
        <section className="bg-white py-[10px] px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefitsData.benefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon] || Layers
                return (
                  <div key={index} className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                    {/* Icon */}
                    <div className={`mb-4 ${benefit.iconColor || 'text-gray-700'}`}>
                      <IconComponent className="w-10 h-10" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Intro Section (Second Instance) */}
      {teamIntroData.title && (
        <section className="bg-white py-12 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {teamIntroData.title}
            </h2>
            {teamIntroData.description && (
              <p className="text-gray-600 text-lg">
                {teamIntroData.description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Partner Logos Section */}
      {partnersData.partners && partnersData.partners.length > 0 && (
        <section className="bg-white py-16 md:py-20 px-6 lg:px-20">
          <div className="mx-auto" style={{ maxWidth: '1280px', opacity: 1 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" style={{ gap: '32px', minHeight: '604px' }}>
              {partnersData.partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300" 
                  style={{ 
                    width: '242px', 
                    height: '286px',
                    opacity: 1,
                    borderRadius: '8px',
                    paddingTop: '8px',
                    paddingRight: '16px',
                    paddingBottom: '8px',
                    paddingLeft: '16px'
                  }}
                >
                  {/* Logo Image */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3" style={{ height: '152px', borderRadius: '8px' }}>
                    <div className="relative w-full h-full p-4">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {partner.name}
                    </h3>
                    <p 
                      className="text-gray-600" 
                      style={{
                        fontFamily: 'var(--font-onest), Onest, sans-serif',
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '130%',
                        letterSpacing: '0px',
                        verticalAlign: 'middle'
                      }}
                    >
                      {partner.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

