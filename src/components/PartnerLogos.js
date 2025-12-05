'use client';

import Image from "next/image";

export default function PartnerLogos() {
  const partners = [
    {
      name: "Windows",
      logo: "/windows.png",
      description: "Business communication and collaboration platform develop talent, and drive digital innovation across Africa and beyond."
    },
    {
      name: "AI Now",
      logo: "/ainow.png",
      description: "Partner with us to transform education, develop talent, and drive digital innovation across Africa and beyond."
    },
    {
      name: "Microsoft",
      logo: "/microsoft.png",
      description: "Cloud computing and enterprise software solutions develop talent, and drive digital innovation across Africa and beyond."
    },
    {
      name: "FG Nigeria",
      logo: "/fg-nigeria.png",
      description: "Global Business communication and collaboration pechnical roles talent, and drive digital innovation across Africa and beyond."
    },
    {
      name: "Google",
      logo: "/google.png",
      description: "Search technology and digital advertising platforms, Google and drive digital innovation across Africa and beyond."
    },
    {
      name: "Amazon Web Services",
      logo: "/aws.png",
      description: "Business communication and collaboration platform develop talent, and drive digital innovation across Africa and beyond."
    },
    {
      name: "GitHub",
      logo: "/github.png",
      description: "Partner with us to transform education, develop talent, and drive digital innovation across Africa and beyond."
    },
    {
      name: "Slack",
      logo: "/slack.png",
      description: "Cloud computing and enterprise software solutions develop talent, and drive digital innovation across Africa and beyond."
    },
    {
      name: "Avv Brand",
      logo: "/avv-brand.png",
      description: "Global Business communication and collaboration pechnical roles talent, and drive digital innovation across Africa and beyond."
    }
  ];

  return (
    <section className="bg-white py-16 md:py-20 px-6 lg:px-20">
      <div className="mx-auto" style={{ maxWidth: '1280px', opacity: 1 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" style={{ gap: '32px', minHeight: '604px' }}>
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300" 
              style={{ 
                width: '242px', 
                height: '286px',
                opacity: 1,
                borderRadius: '8px',
                paddingTop: '8px',
                paddingRight: '16px',
                paddingBottom: '8px',
                paddingLeft: '16px'
              }}
            >
              {/* Logo Image */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3" style={{ height: '152px', borderRadius: '8px' }}>
                <div className="relative w-full h-full p-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <p 
                  className="text-gray-600" 
                  style={{
                    fontFamily: 'var(--font-onest), Onest, sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '130%',
                    letterSpacing: '0px',
                    verticalAlign: 'middle'
                  }}
                >
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

