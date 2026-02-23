"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import BootcampCard from "./BootcampCard";

export default function BootcampsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bootcamps = [
    {
      id: 1,
      title: "AI NOW Bootcamp",
      heading: "Master Artificial Intelligence & Future-Ready Skills",
      description:
        "AI NOW equips learners with practical knowledge in Python, data analysis, machine learning, and emerging AI tools. Through hands-on projects and real-world applications, participants gain the confidence to build intelligent solutions and thrive in the AI-driven economy.",
      badge: "AI NOW",
      badgeColor: "bg-purple-600",
      cardBg: "bg-gradient-to-br from-purple-600 to-purple-800",
      headingHighlight: "text-yellow-400",
      image: "/ainow.png",
      duration: "12 Weeks",
      format: "Hybrid (Online & Physical)",
      graduates: "Growing Alumni Network",
      courses: "AI, Python, ML, Data Analysis",
      cta: "Learn More",
    },
    {
      id: 2,
      title: "Digital SkillUp Africa (DSA)",
      heading: "Build Job-Ready Digital Skills in 3 Months",
      description:
        "Digital SkillUp Africa provides structured, beginner-friendly pathways into tech through project-based learning, mentorship, and hackathons. Designed for aspiring tech professionals, DSA helps learners transition confidently into high-demand digital careers.",
      badge: "DSA",
      badgeColor: "bg-green-600",
      cardBg: "bg-gradient-to-br from-green-600 to-green-800",
      headingHighlight: "text-white",
      image: "/dsa.png",
      duration: "3 Months",
      format: "Online",
      graduates: "350,000+ Graduates",
      courses: "Multiple Digital Tracks",
      cta: "Learn More",
    },
    {
      id: 3,
      title: "Future Clan Bootcamp",
      heading: "Design, Product & Innovation Mastery",
      description:
        "Future Clan Bootcamp focuses on UI/UX design, product thinking, and user-centered innovation. Learners work on real-world projects that mirror professional environments, building portfolios that open doors to global opportunities.",
      badge: "FUTURE CLAN",
      badgeColor: "bg-blue-600",
      cardBg: "bg-gradient-to-br from-blue-600 to-blue-800",
      headingHighlight: "text-yellow-300",
      image: "/futureclan.png",
      duration: "Flexible Cohorts",
      format: "Hybrid",
      graduates: "Growing Alumni Network",
      courses: "UI/UX, Product Design",
      cta: "Learn More",
    },
    {
      id: 4,
      title: "Ladies in Tech Africa",
      heading: "Empowering Women in Technology",
      description:
        "Ladies in Tech Africa is dedicated to increasing female representation in technology. Through inclusive training, mentorship, and leadership development, the program empowers women to build sustainable and impactful tech careers.",
      badge: "LITA",
      badgeColor: "bg-pink-500",
      cardBg: "bg-gradient-to-br from-pink-400 to-pink-600",
      headingHighlight: "text-pink-800",
      image: "/lita.png",
      duration: "Cohort-Based",
      format: "Hybrid",
      graduates: "Women Across Africa",
      courses: "Digital & Emerging Tech Skills",
      cta: "Learn More",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bootcamps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + bootcamps.length) % bootcamps.length);
  };

  const current = bootcamps[currentIndex];
  const next = bootcamps[(currentIndex + 1) % bootcamps.length];

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 mb-15'>
      <div className='max-w-7xl w-full'>
        <div className='relative inline-block mb-12 md:mb-16'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-medium text-black px-6 py-4 pr-12'>
            Our Bootcamps
          </h2>
          <div className='absolute bottom-0 left-0 right-0 h-1 bg-[#15803D]'></div>
          <div className='absolute right-3 -bottom-3 h-11 w-1 bg-[#15803D]'></div>
        </div>

        <div className='relative flex items-center justify-center'>
          <button
            onClick={prevSlide}
            className='hidden md:flex absolute -left-16 lg:-left-20 z-10 bg-white border-2 border-gray-300 rounded-full p-3 hover:bg-gray-100'
          >
            <ChevronLeft className='w-6 h-6 text-black' />
          </button>

          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
            <BootcampCard bootcamp={current} />
            <div className='hidden md:block'>
              <BootcampCard bootcamp={next} />
            </div>
          </div>

          <button
            onClick={nextSlide}
            className='hidden md:flex absolute -right-16 lg:-right-20 z-10 bg-white border-2 border-gray-300 rounded-full p-3 hover:bg-gray-100'
          >
            <ChevronRight className='w-6 h-6 text-black' />
          </button>
        </div>
      </div>
    </div>
  );
}
