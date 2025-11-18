import Image from 'next/image';
import Link from 'next/link';

export default function JoinUs({ 
  title = "Want to Join This Amazing Team?",
  description = "We're always looking for talented individuals who share our passion for education and technology. Ready to make an impact?",
  ctaText = "View Open Positions",
  ctaLink = "/careers",
  backgroundImage = "/images/joinus.jpg"
}) {
  return (
    <section className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden bg-white  ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Team collaboration"
          fill
          className="object-cover"
          quality={100}
          priority
          unoptimized={true}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 max-w-4xl sm:whitespace-nowrap">
          <span className="inline text-white">{title}</span>
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-3xl leading-relaxed">
          {description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < description.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>

        {/* CTA Button */}
        <Link
          href={ctaLink}
          className="group inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span className="text-base sm:text-lg">{ctaText}</span>
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}