export default function TestimonialCard({ testimonial, currentIndex, totalLength, onSelect }) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border-9 border-[#FFCC0033] relative">
      {/* Testimonial Text */}
      <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">{testimonial.text}</p>

      {/* Student Profile */}
      <div className="flex items-center gap-4 mb-6">
        {/* Avatar */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <span className="text-white font-bold text-lg">{testimonial.initials}</span>
        </div>

        {/* Student Info */}
        <div>
          <h4 className="text-black font-bold text-base md:text-lg">{testimonial.name}</h4>
          <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
        </div>
      </div>

      {/* Pagination Dots - Inside Card */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: totalLength }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}