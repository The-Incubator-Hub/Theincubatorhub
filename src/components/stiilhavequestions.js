"use client"

import Link from "next/link"
import { Cpu, Database, Package, Mail, Bookmark } from 'lucide-react'

function StillHaveQuestions({
  title = "Still have questions?",
  description = "We are a passionate, creative, and results-driven team of digital marketing specialists, strategists, designers, and technologists — all working together to help brands grow in the digital world.",
  cards: propsCards = []
}) {
  const defaultCards = [
    {
      icon: "Cpu",
      iconColor: "orange-600",
      title: "Free Consultation",
      description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna.",
      buttonText: "Reach Out",
      buttonIcon: "Mail",
      buttonLink: "/contact"
    },
    {
      icon: "Database",
      iconColor: "green-600",
      title: "Read Our Press Releases",
      description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna.",
      buttonText: "Read News",
      buttonIcon: "Bookmark",
      buttonLink: "/press"
    },
    {
      icon: "Package",
      iconColor: "blue-600",
      title: "Read Our Blog Post",
      description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna.",
      buttonText: "Read Article",
      buttonIcon: "Bookmark",
      buttonLink: "/blog"
    }
  ]

  const cards = propsCards.length > 0 ? propsCards : defaultCards

  const iconMap = {
    Cpu,
    Database,
    Package,
    Mail,
    Bookmark
  }

  const iconColorMap = {
    "orange-600": "text-orange-600",
    "green-600": "text-green-600",
    "blue-600": "text-blue-600",
    "red-600": "text-red-600",
    "purple-600": "text-purple-600",
    "yellow-600": "text-yellow-600"
  }

  return (
    <section className="pt-20 pb-20 bg-gray-50 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 
          className="text-gray-900 mb-6 mx-auto"
          style={{
            width: '470px',
            minHeight: '67px',
            fontFamily: 'var(--font-raleway), Raleway, sans-serif',
            fontWeight: 700,
            fontStyle: 'normal',
            fontSize: '48px',
            lineHeight: '140%',
            letterSpacing: '0px',
            textAlign: 'center', 
            opacity: 1
          }}
        >
          {title}
        </h2>
        {description && (
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-16">
            {description}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Cpu
            const ButtonIconComponent = iconMap[card.buttonIcon] || Mail
            
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-8 text-center">
                <div className="w-16 h-16 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent className={`w-9 h-9 ${iconColorMap[card.iconColor] || "text-gray-600"}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h3>
                {card.description && (
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {card.description}
                  </p>
                )}
                {card.buttonText && (
                  card.buttonLink ? (
                    <Link 
                      href={card.buttonLink}
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full justify-center"
                    >
                      <ButtonIconComponent className="w-5 h-5" />
                      {card.buttonText}
                    </Link>
                  ) : (
                    <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                      <ButtonIconComponent className="w-5 h-5" />
                      {card.buttonText}
                    </button>
                  )
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StillHaveQuestions