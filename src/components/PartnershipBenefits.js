'use client';

import { Layers, Book, Heart, TrendingUp } from 'lucide-react';

export default function PartnershipBenefits() {
  const benefits = [
    {
      icon: <Layers className="w-10 h-10" style={{ color: '#F249C8' }} />,
      iconColor: "",
      title: "Access To Top Talent",
      description: "Get first access to our graduates - skilled developers, data analyst, designers, and tech professionals ready to join your team."
    },
    {
      icon: <Book className="w-10 h-10" />,
      iconColor: "text-green-600",
      title: "Custom Training Programs",
      description: "Work with us to design specialized training programs that meet your organization's specific needs and requirements."
    },
    {
      icon: <Heart className="w-10 h-10" />,
      iconColor: "text-red-700",
      title: "Social Impact",
      description: "Make a meaningful difference by supporting the next generation of African tech leaders and entrepreneurs."
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      iconColor: "text-purple-700",
      title: "Brand Visibility",
      description: "Showcase your brand to thousands of aspiring tech professionals across Africa through our programs and events."
    }
  ];

  return (
    <section className="bg-white py-[10px] px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
              {/* Icon */}
              <div className={`mb-4 ${benefit.iconColor}`}>
                {benefit.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

