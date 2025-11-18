"use client"

import { useState } from "react"
import React from "react"

const faqData = [
  {
    id: 1,
    question: "Are there opportunities to work with schools or organizations?",
    answer: "We partner with schools, edtech organizations, and NGOs to offer real-world implementation opportunities for your projects.",
  },
  {
    id: 2,
    question: "How long is our program?",
    answer: "The program runs for 12 weeks, designed to fit alongside studies or work with flexible deadlines.",
  },
  {
    id: 3,
    question: "Can I participate if I’m currently a student or only after graduation?",
    answer: (
      <ul className="space-y-3 text-gray-600">
        <li className="flex gap-3">
          <span className="text-green-600 mt-1">•</span>
          <span>We welcome current students, recent graduates, early-career professionals, educators, and changemakers who are committed to learning and building in the education-technology space.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-green-600 mt-1">•</span>
          <span>We invite educators and community leaders who are passionate about digital education and social impact.</span>
        </li>
      </ul>
    ),
  },
  {
    id: 4,
    question: "Is there a cost or equity requirement?",
    answer: "No cost, no equity taken. The program is completely free and fully sponsored.",
  },
  {
    id: 5,
    question: "Will I earn credits or a certificate?",
    answer: "Yes! You’ll receive a verified certificate upon completion, and in some cases, university credit recommendations through our academic partners.",
  },
  {
    id: 6,
    question: "Are there any prerequisites or prior knowledge required?",
    answer: "Absolutely none. Whether you're a complete beginner or experienced builder, everyone starts from where they are.",
  },
  {
    id: 7,
    question: "How much time per week should I plan for the program?",
    answer: "Expect to dedicate 8–12 hours per week. It’s self-paced with live sessions, project work, and mentorship.",
  },
]

export default function FAQAccordion({ items = faqData }) {
  const [openId, setOpenId] = useState(null)

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const isOpen = openId === item.id

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? " bg-green-50 shadow-sm"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-6"
                aria-expanded={isOpen}
              >
                <span 
                  className="pr-4 text-[#565246]
"
                  style={{
                    fontFamily: 'var(--font-onest), Onest, sans-serif',
                    fontWeight: 700,
                    fontStyle: 'normal', 
                    fontSize: '20px',
                    lineHeight: '30px',
                    letterSpacing: '0px' 
                  }}
                >
                  {item.question}  
                </span>

                <span 
                  className={`flex-shrink-0 transition-transform duration-300 text-gray-400 cursor-pointer ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </span>
              </button> 

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-7 pt-2 text-base text-gray-600 leading-relaxed">
                  {typeof item.answer === "string" ? (
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex gap-3">
                        <span className="text-gray-600 mt-1">•</span>
                        <span>{item.answer}</span>
                      </li>
                    </ul>
                  ) : (
                    React.cloneElement(item.answer, {
                      children: React.Children.map(item.answer.props.children, (li) => {
                        // Extract the text content from the span
                        const textContent = li.props.children[1]?.props?.children || 
                                          (Array.isArray(li.props.children) ? li.props.children[1] : li.props.children);
                        return React.cloneElement(li, {
                          className: "flex gap-3",
                          children: (
                            <>
                              <span className="text-gray-600 mt-1">•</span>
                              <span>{textContent}</span>
                            </>
                          ),
                        });
                      }),
                    })
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}