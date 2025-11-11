import React from 'react';

const TeamMembersSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jenny Wilson",
      role: "CEO & Founder of Gilio",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bgColor: "bg-amber-800"
    },
    {
      id: 2,
      name: "Jenny Wilson",
      role: "CEO & Founder of Gilio",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bgColor: "bg-sky-400"
    },
    {
      id: 3,
      name: "Jenny Wilson",
      role: "CEO & Founder of Gilio",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bgColor: "bg-gray-700"
    },
    {
      id: 4,
      name: "Jenny Wilson",
      role: "CEO & Founder of Gilio",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      bgColor: "bg-gray-600"
    },
    {
      id: 5,
      name: "Jenny Wilson",
      role: "CEO & Founder of Gilio",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bgColor: "bg-white"
    },
    {
      id: 6,
      name: "Jenny Wilson",
      role: "CEO & Founder of Gilio",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      bgColor: "bg-amber-700"
    },
    {
      id: 7,
      name: "Jenny Wilson",
      role: "CEO & Founder of Gilio",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
      bgColor: "bg-pink-200"
    },
    {
      id: 8,
      name: "Jenny Wilson",
      role: "CEO & Founder of Gilio",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bgColor: "bg-sky-500"
    }
  ];

  return (
    <div className="bg-orange-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Say to our incredible<br />team members.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-600 text-sm leading-relaxed">
              Praesent sagittis eros in convallis rutrum. Donec auctor nibh justo. Vestibulum tincidunt, libero sit.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className={`${member.bgColor} rounded-2xl overflow-hidden mb-4 aspect-[3/4] relative`}>
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Member Info */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembersSection;