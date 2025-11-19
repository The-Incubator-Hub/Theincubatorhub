import Image from "next/image";

export default function HeaderCareer({ 
  title = "Build Your Career, Change Lives",
  description = "Join a mission-driven team where your skills create lasting impact on Africa's tech future. We're looking for passionate individuals who want to make a difference.",
  backgroundImage = "/images/hero_teams.jpg"
}) {
  // Split description into lines for desktop display
  const descriptionLines = description ? description.split('\n') : [];
  const hasMultipleLines = descriptionLines.length > 1;

  return (
    <div className="relative w-full mt-18 h-91 flex items-center justify-center overflow-hidden">  
    
        <div className="w-full">  
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
                className="font-bold mb-4 sm:mb-6 md:mb-8 mx-auto lg:whitespace-nowrap"  
                style={{
                    fontSize: 'clamp(2rem, 5vw, 3.75rem)', //
                    lineHeight: 'clamp(2.5rem, 6vw, 4.5rem)',
                    width: '100%', 
                    opacity: 1, 
                    transform: 'rotate(0deg)'  
                }} 
                > 
                {title}
                </h1> 
                
                {/* Paragraph - Responsive with exact desktop specs */}
                <div className="mx-auto w-full" style={{ maxWidth: '686px' }}> 
                {/* Desktop (lg+): Exact specifications */}
                {hasMultipleLines ? (
                  <p 
                    className="hidden lg:block mx-auto" 
                    style={{ 
                    width: '686px',  
                    height: '78px', 
                    opacity: 1, 
                    transform: 'rotate(0deg)', 
                    fontFamily: 'Inter, sans-serif',  
                    fontWeight: 400,  
                    fontSize: '18px',  
                    lineHeight: '26px', 
                    letterSpacing: '0%', 
                    textAlign: 'center', 
                    verticalAlign: 'middle', 
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
                    width: '686px',  
                    minHeight: '78px', 
                    opacity: 1, 
                    transform: 'rotate(0deg)', 
                    fontFamily: 'Inter, sans-serif',  
                    fontWeight: 400,  
                    fontSize: '18px',  
                    lineHeight: '26px', 
                    letterSpacing: '0%', 
                    textAlign: 'center', 
                    verticalAlign: 'middle', 
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
        </div>
      {/* Background Image */}

    </div>
  );
}
