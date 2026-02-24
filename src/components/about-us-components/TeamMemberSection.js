"use client";

import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const TeamMembersSection = () => {
  const teamMembers = [
    {
      name: "Olawale Olatujoye",
      role: "Senior Manager, The Incubator Hub",
      image: "/team/olawale.jpg",
      instagram: "#",
      linkedin: "#",
    },
    {
      name: "Ayeni Temidayo",
      role: "Programs Manager, The Incubator Hub",
      image: "/team/ayeni.jpg",
      instagram: "#",
      linkedin: "#",
    },
    {
      name: "Michelle Adudu",
      role: "Partnership Manager, The Incubator Hub",
      image: "/team/michelle.jpg",
      instagram: "#",
      linkedin: "#",
    },
    {
      name: "Zaccheaus Jame Toluwani",
      role: "Technical Support, The Incubator Hub",
      image: "/team/zaccheaus.jpg",
      instagram: "#",
      linkedin: "#",
    },
  ];

  return (
    <section className='bg-white py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16 max-w-3xl mx-auto'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6'>
            We Have An Expert Team
          </h2>
          <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
            Behind The Incubator Hub is a passionate team of professionals
            committed to nurturing talent, building opportunity, and shaping the
            next generation of innovators and leaders. Each member brings a
            unique blend of expertise, vision, and heart to the work we do.
          </p>
        </div>

        {/* Team Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
          {teamMembers.map((member, index) => (
            <div key={index} className='text-center group'>
              {/* Image */}
              <div className='relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm mb-6'>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className='object-cover group-hover:scale-105 transition duration-300'
                />
              </div>

              {/* Info */}
              <h3 className='text-lg font-semibold text-gray-900'>
                {member.name}
              </h3>
              <p className='text-sm text-gray-500 mb-4'>{member.role}</p>

              {/* Social Links */}
              <div className='flex justify-center gap-4'>
                <a
                  href={member.instagram}
                  className='text-gray-400 hover:text-green-600 transition'
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={member.linkedin}
                  className='text-gray-400 hover:text-green-600 transition'
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembersSection;
