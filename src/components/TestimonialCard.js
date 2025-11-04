export default function TestimonialCard({ testimonial }) {
    return (
      <div className="bg-yellow-50 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-yellow-200">
        {/* Testimonial Text */}
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">{testimonial.text}</p>
  
        {/* Student Profile */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">{testimonial.initials}</span>
          </div>
  
          {/* Student Info */}
          <div>
            <h4 className="text-black font-bold text-base md:text-lg">{testimonial.name}</h4>
            <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
          </div>
        </div>
      </div>
    )
  }
  