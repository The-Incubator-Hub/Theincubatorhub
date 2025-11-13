import React from 'react';
import { Heart, ThumbsUp, Users, ArrowRight, Check } from 'lucide-react';

export default function GetInvolvedSection() {
  const opportunities = [
    {
      id: 1,
      title: 'Become a Volunteer',
      description: 'Volunteer with us in various roles - from mentoring student. Find your perfect fit.',
      icon: Heart,
      iconBg: 'bg-orange-500',
      achievements: [
        'Assisting startups and professionals',
        'Lend hands-on workshops, masterclasses',
        'Support career development and job placement',
        'Lead workshops on cutting-edge technologies'
      ]
    },
    {
      id: 2,
      title: 'Partner With Us',
      description: 'Collaborate with us to create meaningful opportunities for our graduates.',
      icon: ThumbsUp,
      iconBg: 'bg-blue-500',
      achievements: [
        'Offer internships and entry-level positions',
        'Host networking events and career fairs',
        'Access top tier tech and skilled techies',
        'Build your company\'s talent brand with us in Africa'
      ]
    },
    {
      id: 3,
      title: 'Become A Sponsor',
      description: 'Your sponsorship directly transforms lives by removing financial barriers to quality tech education.',
      icon: Users,
      iconBg: 'bg-pink-500',
      achievements: [
        'Fund scholarships for aspiring students',
        'Sponsor essential equipment and learning resources',
        'Create named scholarships or program initiatives',
        'Receive detailed impact reports and recognition'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-7xl w-full py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ways To Get Involved
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every contribution matters. Find the perfect way to make an impact based on your skills, resources, and passion.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => {
            const Icon = opportunity.icon;
            
            return (
              <div
                key={opportunity.id}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col hover:shadow-xl transition-shadow"
              >
                {/* Icon */}
                <div className={`${opportunity.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {opportunity.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {opportunity.description}
                </p>

                {/* What you will achieve */}
                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">
                    What you will achieve
                  </h4>
                  <ul className="space-y-2">
                    {opportunity.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-[#15803D] flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Commitment */}
                <div className="bg-[#E5E7EB] rounded-md p-3 mb-6">
                  <p className="text-xs text-[#374151]">
                    <span className="font-semibold">Commitment:</span> Flexible - 2-4 hours per week
                  </p>
                </div>

                {/* Apply Button */}
                <button className="w-full bg-[#090909] text-white py-3.5 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors group">
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}