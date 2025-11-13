'use client'
import React, { useState } from 'react';
import { Lightbulb, Target, Award } from 'lucide-react';

export default function LearningPathway() {
  const [activeTab, setActiveTab] = useState('pathway');

  const phases = [
    {
      id: 1,
      title: 'Phase 1: Virtual Learning',
      description: 'Master fundamentals through live sessions, interactive coding challenges, and peer collaboration in our virtual environment.',
      icon: Lightbulb,
      color: 'orange',
      side: 'left'
    },
    {
      id: 2,
      title: 'Phase 2: Physical Learning',
      description: 'Master fundamentals through live sessions, interactive coding challenges, and peer collaboration in our virtual environment.',
      icon: Lightbulb,
      color: 'yellow',
      side: 'right'
    },
    {
      id: 3,
      title: 'Phase 3: The Mentorship Phase',
      description: 'Master fundamentals through live sessions, interactive coding challenges, and peer collaboration in our virtual environment.',
      icon: Award,
      color: 'green',
      side: 'left'
    }
  ];

  const tabs = [
    { id: 'pathway', label: 'Learning Pathway' },
    { id: 'objectives', label: 'Objectives' },
    { id: 'outcomes', label: 'Expected Outcomes' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-300',
        icon: 'bg-orange-200',
        line: 'bg-orange-500'
      },
      yellow: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-300',
        icon: 'bg-yellow-200',
        line: 'bg-yellow-500'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-300',
        icon: 'bg-green-200',
        line: 'bg-green-500'
      }
    };
    return colors[color];
  };

  const getTabPosition = () => {
    switch(activeTab) {
      case 'pathway': return 'translate-x-0';
      case 'objectives': return 'translate-x-[220px]';
      case 'outcomes': return 'translate-x-[440px]';
      default: return 'translate-x-0';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-sm p-8">
        {/* Tabs with Slider */}
        <div className="relative inline-flex bg-gray-100 rounded-xl p-1 mb-12">
          {/* Sliding Background */}
          <div 
            className={`absolute top-1 left-1 w-[212px] h-[calc(100%-8px)] bg-green-600 rounded-lg transition-transform duration-300 ease-in-out ${getTabPosition()}`}
          ></div>
          
          {/* Tab Buttons */}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative z-10 px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-300 w-[220px] ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-[#16A34A] hover:text-[#16A34A]/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 via-yellow-500 to-green-500"></div>

          {/* Phases */}
          <div className="space-y-16">
            {phases.map((phase, index) => {
              const colors = getColorClasses(phase.color);
              const Icon = phase.icon;
              
              return (
                <div key={phase.id} className="relative">
                  {/* Timeline Dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${colors.line} border-4 border-white z-10`}></div>

                  {/* Content Card */}
                  <div className={`${
                    phase.side === 'left' 
                      ? 'mr-auto pr-8 md:pr-16' 
                      : 'ml-auto pl-8 md:pl-16'
                  } w-full md:w-1/2`}>
                    <div className={`${colors.bg} ${colors.border} border-l-4 rounded-lg p-6 shadow-sm`}>
                      <div className="items-start gap-4">

                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-lg text-center font-bold text-gray-900 ">
                            {phase.title}
                          </h3>
                            <div className={`${colors.icon} rounded-lg p-3 flex-shrink-0`}>
                                <Icon className="w-6 h-6 text-gray-700" />
                            </div>

                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {phase.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}