import Image from "next/image";

export default function Header() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero_teams.jpg"
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
          Meet Our Amazing Team
        </h1>
        
        {/* Paragraph - Responsive with exact desktop specs */}
        <div className="mx-auto w-full" style={{ maxWidth: '578px' }}>
          {/* Desktop (lg+): Exact specifications */}
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
            <span className="block">Stay updated with the latest news, announcements, and milestones </span>
            <span className="block">from Incubator. Get insights into our programs, partnerships, and</span>
            <span className="block">impact across Africa</span>
          </p>
          
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
            Stay updated with the latest news, announcements, and milestones from Incubator. 
            Get insights into our programs, partnerships, and impact across Africa
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
            Stay updated with the latest news, announcements, and milestones from Incubator. 
            Get insights into our programs, partnerships, and impact across Africa
          </p>
        </div>
      </div>
    </section>
  );
}
