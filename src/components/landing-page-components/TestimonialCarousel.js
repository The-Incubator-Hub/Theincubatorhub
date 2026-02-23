"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TestimonialCard from "./TestimonialCard"

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      text: "The knowledge and skills acquired from the Digital BootCamp 2015 training helped broaden my horizon and enhanced my creative abilities. I have been able to use the skills I learnt from the training to transform brands and organisations.",
      name: "Emmanuel Omoyeni",
      role: "Video Editor / Product Manager, Digital BootCamp 2015",
      initials: "EO",
    },
    {
      id: 2,
      text: "Transitioning from graphic design to UI/UX was a natural progression for me, and the UI/UX course offered by the Future Clan Bootcamp was the perfect stepping stone. The instructors' expertise and the hands-on projects provided me with a deep understanding of user-centric design principles. This course opened up exciting new opportunities in my career as a Product Designer and Creative Director.",
      name: "Victory Mokuolu",
      role: "UI/UX Designer & Trainer, Future Clan Bootcamp 2021",
      initials: "VM",
    },
    {
      id: 3,
      text: "I joined The Incubator Hub with no tech background, just the desire to learn. Through DSA, I built real-world projects, gained confidence, and secured an internship. It showed me that determination can make fear, finances, or background take a back seat. I didn’t spend a dime — just data!",
      name: "Bisola Ogunsina",
      role: "Digital SkillUp Africa (DSA) 2025",
      initials: "BO",
    },
    {
      id: 4,
      text: "AI NOW helped me rebuild my confidence and direction. I learned Python, data analysis, and machine learning, built real-world projects, and started freelancing. The training showed me that with the right mindset and support, growth in tech is possible.",
      name: "Famojuro Mathew",
      role: "AI NOW Bootcamp 2025",
      initials: "FM",
    },
    {
      id: 5,
      text: "AI NOW opened my eyes to artificial intelligence. I learned how large language models work, how to write effective prompts, and how to build simple AI solutions. The training boosted my confidence and showed me it’s never too late to learn something new.",
      name: "Shakiru Ekundayo Bakare",
      role: "AI NOW Bootcamp 2025",
      initials: "SB",
    },
    {
      id: 6,
      text: "DSA helped me close the knowledge gap and turn ideas into real projects. The assignments and hackathon pushed me to build real-world solutions, and I gained confidence in my tech journey. The mentorship and practical training made all the difference.",
      name: "Hunsa S. Samuel",
      role: "Digital SkillUp Africa (DSA) 2025",
      initials: "HS",
    },
    {
      id: 7,
      text: "The Incubator Hub gave me what Google and YouTube couldn’t — structure, mentorship, and hands-on experience. Through DSA, I learned Virtual Assistance and GenAI, built projects, and secured an internship. Now I actually know where I’m going in tech.",
      name: "Kehinde Ololade Lawal",
      role: "Digital SkillUp Africa (DSA) 2025",
      initials: "KL",
    },
    {
      id: 8,
      text: "AI NOW taught me how to build real AI projects and that perfection is overrated. I built the ScoreLaship Hub AI Assistant to solve a real student problem, and I learned that consistency beats waiting till you’re ready.",
      name: "Usman Abubakar Buba",
      role: "AI NOW Bootcamp 2025",
      initials: "UB",
    },
    {
      id: 9,
      text: "I wasn’t financially equipped to learn tech, but Incubator Hub made it possible. The program’s strategic organization and accommodating tutors made learning enjoyable. I gained skills in ETL, pivot tables, and data visualization, and learned to overcome fear.",
      name: "Aworo Nwamaka",
      role: "AI NOW Bootcamp 2025",
      initials: "AN",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleSelect = (idx) => {
    setCurrentIndex(idx)
  }

  const current = testimonials[currentIndex]

  return (
    <div className="min-h-screen bg-[#FFFEF0] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8">
            What Our Students Are Saying
          </h2>

          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>

        <TestimonialCard
          testimonial={current}
          currentIndex={currentIndex}
          totalLength={testimonials.length}
          onSelect={handleSelect}
        />
      </div>
    </div>
  )
}