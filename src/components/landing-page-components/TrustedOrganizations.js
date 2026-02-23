"use client";
import Image from "next/image";

export default function TrustedOrganizations() {
  const organizations = [
    { name: "AMG (Africa Missions Global)", logo: "/amg.png" },
    { name: "Utiva", logo: "/utiva.png" },
    { name: "Prime Startups", logo: "/primestartups.png" },
    { name: "Blakskill", logo: "/blakskill.png" },
    { name: "Microsoft", logo: "/microsoft.png" },
    { name: "Google", logo: "/google.png" },
    { name: "DSN", logo: "/dsn.png" },
    { name: "NVIDIA", logo: "/nvidia.png" },
    { name: "DataCamp", logo: "/datacamp.png" },
    { name: "AfriLabs", logo: "/afrilabs.png" },
    { name: "TEDxMowe", logo: "/tedxmowe.png" },
    { name: "Dare Adeboye Foundation", logo: "/dare-adeboye.png" },
    { name: "NYSC", logo: "/nysc.png" },
    { name: "BLANCHE", logo: "/blanche.png" },
    { name: "Lagos Startup Week (LSW)", logo: "/lsw.png" },
    { name: "Wentors", logo: "/wentors.png" },
  ];

  return (
    <section className='bg-white px-4 py-16'>
      <div className='max-w-7xl mx-auto'>
        <div className='max-w-2xl mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#061C3D] mb-4'>
            Trusted by Forward-Thinking Organizations
          </h2>

          <p className='text-[#42526B] text-base md:text-lg leading-relaxed'>
            We collaborate with institutions, companies, and ecosystem partners
            who believe in building sustainable digital talent across Africa.
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center'>
          {organizations.map((org, index) => (
            <div
              key={index}
              className='flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105'
            >
              <Image
                src={org.logo}
                alt={org.name}
                width={120}
                height={60}
                className='object-contain'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
