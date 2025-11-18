import Image from "next/image";

export default function Header({ 
  title = "Meet Our Amazing Team",
  description = "Stay updated with the latest news, announcements, and milestones from Incubator. Get insights into our programs, partnerships, and impact across Africa",
  backgroundImage = "/images/hero_teams.jpg"
}) {
  // Split description into lines for desktop display
  const descriptionLines = description ? description.split('\n') : [];
  const firstLine = descriptionLines[0] || description;
  const remainingLines = descriptionLines.slice(1).join(' ');

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Team Hero Background"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
        {/* Heading - Responsive */}
        <h1 
          className="font-bold mb-4 sm:mb-6 md:mb-8 mx-auto text-balance"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.75rem)', // Responsive: 32px to 60px
            lineHeight: 'clamp(2.5rem, 6vw, 4.5rem)',
            maxWidth: '700px',
            width: '100%',
            opacity: 1,
            transform: 'rotate(0deg)'
          }}
        >
          {title}
        </h1>
        
        {/* Paragraph - Responsive with exact desktop specs */}
        <div className="mx-auto w-full" style={{ maxWidth: '578px' }}>
          {/* Desktop (lg+): Exact specifications */}
          {descriptionLines.length > 1 ? (
            <p 
              className="hidden lg:block mx-auto"
              style={{
                width: '100%',
                maxWidth: '578px',
                minHeight: '78px',
                opacity: 1,
                transform: 'rotate(0deg)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '26px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#F2F2F7'
              }}
            >
              {descriptionLines.map((line, index) => (
                <span key={index} className="block">{line}</span>
              ))}
            </p>
          ) : (
            <p 
              className="hidden lg:block mx-auto"
              style={{
                width: '100%',
                maxWidth: '578px',
                minHeight: '78px',
                opacity: 1,
                transform: 'rotate(0deg)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '26px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#F2F2F7'
              }}
            >
              {description}
            </p>
          )}
          
          {/* Tablet (md to lg): Slightly smaller */}
          <p 
            className="hidden md:block lg:hidden mx-auto px-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '17px',
              lineHeight: '25px',
              textAlign: 'center',
              color: '#F2F2F7',
              opacity: 1
            }}
          >
            {description}
          </p>
          
          {/* Mobile: Smaller, readable version */}
          <p 
            className="md:hidden px-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '22px',
              textAlign: 'center',
              color: '#F2F2F7',
              opacity: 1
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
