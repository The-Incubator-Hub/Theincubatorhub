export default function TeamIntro({ 
  title = "We Have An Expert Team",
  description = "We are a passionate, creative, and results-driven team of digital marketing specialists, strategists, designers, and technologists — all working together to help brands grow in the digital world."
}) {
  return (
    <section className="w-full bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-10 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-6 sm:mb-8 leading-tight">
          {title}
        </h2>
        
        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-center text-gray-600 leading-relaxed max-w-4xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
