import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Jerome Bell",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "This guy is true professional and very experienced in migration and server configuration. He was able to complete my order in time and as per agreed scope. Highly recommend!",
  },
  {
    name: "Kristin Watson",
    company: "Netflix",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Less than 24h turn around. Easy communication. Did exactly as offered, all around a perfect experience.",
  },
  {
    name: "Annette Black",
    company: "Whatsapp",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    text: "Gollo is one of the BEST web designers I've ever worked with professionally. I'm a repeat customer who continues to work with Zakir because of his talent, great customer service, and attention to detail.",
  },
  {
    name: "Jacob Jones",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    text: "Amazing attention to detail and very prompt delivery. Truly exceeded expectations.",
  },
  {
    name: "Cameron Williamson",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    text: "Incredible to work with, very professional and delivers top-quality work every time.",
  },
  {
    name: "Courtney Henry",
    company: "Facebook",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    text: "Great service, good communication, and the project came out even better than expected!",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  return (
    <section className="relative bg-[#F9FAFB] py-16 px-4 md:px-8 overflow-hidden">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
        What Our Student Say
      </h2>

      {/* Slider Wrapper */}
      <div className="max-w-6xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            const startIndex = slideIndex * cardsPerSlide;
            const slideTestimonials = testimonials.slice(
              startIndex,
              startIndex + cardsPerSlide
            );

            return (
              <div
                key={slideIndex}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-shrink-0 w-full px-4"
              >
                {slideTestimonials.map((t, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 border-2 border-gray-300 bg-white p-2 rounded-full hover:text-white hover:bg-[#111827] transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 border-2 border-gray-300 bg-white p-2 rounded-full hover:text-white hover:bg-[#111827] transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-[#111827]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
