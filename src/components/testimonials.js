"use client"

import React, { useState } from "react"
import Image from "next/image"

const categories = [
  "ALL",
  "Digital Skillup Africa",
  "Ladies In Tech Africa",
  "SkillUp",
  "Future Clan Bootcamp",
  "AI Now",
]

const testimonials = [
  {
    id: 1,
    name: "Lila Johnson",
    role: "Product Designer",
    category: "Digital Skillup Africa",
    quote:
      '"This coding bootcamp has completely changed my career trajectory! I keep returning for the expert instructors, the welcoming community, and the practical learning experiences that have helped me land my dream job."',
    image: "/woman-product-designer.jpg",
  },
  {
    id: 2,
    name: "Marcus Lee",
    role: "Digital Marketing Director",
    category: "Ladies In Tech Africa",
    quote:
      "\"I can't recommend this bootcamp enough! As a first-time student, I'm blown away by the fantastic teachers, the friendly atmosphere, and the real-world projects that have significantly improved my skills and job prospects.\"",
    image: "/man-marketing-director.jpg",
  },
  {
    id: 3,
    name: "Sarah White",
    role: "User Experience Designer",
    category: "SkillUp",
    quote:
      '"This bootcamp is truly remarkable! As a returning learner, I value the exceptional instructors, the supportive environment, and the engaging lessons that have kept me motivated and helped me switch careers successfully."',
    image: "/woman-ux-designer.jpg",
  },
  {
    id: 4,
    name: "Mia Davis",
    role: "iOS App Developer",
    category: "Future Clan Bootcamp",
    quote:
      '"I\'ve had an incredible experience at this bootcamp! As a returning attendee, I appreciate the outstanding instructors, the welcoming community, and the practical learning that has kept me engaged and ready for a new role."',
    image: "/woman-app-developer.jpg",
  },
  {
    id: 5,
    name: "Sophie Turner",
    role: "Content Marketing Specialist",
    category: "AI Now",
    quote:
      '"Having attended several bootcamps, this one stands out! As a new participant, I appreciate the expert instructors, the encouraging community, and the immersive learning style that has equipped me for a new role in tech."',
    image: "/woman-marketing-specialist.jpg",
  },
  {
    id: 6,
    name: "Ethan Wright",
    role: "Business Intelligence Analyst",
    category: "Digital Skillup Africa",
    quote:
      '"This bootcamp has been one of my best experiences! As a returning student, I love the fantastic instructors, the supportive community, and the hands-on learning that has inspired me to pursue a new career path."',
    image: "/man-business-analyst.jpg",
  },
  {
    id: 7,
    name: "Oliver Brown",
    role: "Virtual Assistant",
    category: "Ladies In Tech Africa",
    quote:
      '"This bootcamp has exceeded my expectations! As a new student, I cherish the knowledgeable instructors, the friendly community, and the hands-on approach that has truly enhanced my skills and job opportunities."',
    image: "/man-virtual-assistant.jpg",
  },
  {
    id: 8,
    name: "Noah Wilson",
    role: "Software Developer",
    category: "SkillUp",
    quote:
      '"This bootcamp is fantastic! As a first-time student, I love the exceptional instructors, the supportive community, and the hands-on learning that has significantly boosted my skills and employability."',
    image: "/man-software-developer.jpg",
  },
  {
    id: 9,
    name: "Chloe Smith",
    role: "Cloud Solutions Architect",
    category: "Future Clan Bootcamp",
    quote:
      '"I absolutely love this bootcamp! As a first-time attendee, I find the instructors outstanding, the community welcoming, and the practical learning incredibly effective in helping me secure a job in the field."',
    image: "/woman-cloud-architect.jpg",
  },
]

function Testimonials() {
  const [activeCategory, setActiveCategory] = useState("ALL")

  // Filter testimonials based on active category
  const filteredTestimonials = activeCategory === "ALL" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory)

  return (
    <main className="min-h-screen bg-white pt-4 pb-12 px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
       

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12 w-full">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-green-500 text-white border-2 border-green-500"
                    : "bg-white text-gray-900 border-2 border-gray-300 hover:bg-green-700 hover:text-white hover:border-green-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow w-full flex flex-col"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 flex-shrink-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base break-words">{testimonial.quote}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No testimonials found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Testimonials
