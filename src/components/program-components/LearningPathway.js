'use client';
import React, { useState } from 'react';
import { Lightbulb, Target, Award, CheckCircle, Briefcase, Users, Rocket } from 'lucide-react';

export default function LearningPathway() {
  const [activeTab, setActiveTab] = useState('pathway');

  const phases = [
    {
      id: 1,
      title: 'Phase 1: Virtual Learning',
      description: 'Master fundamentals through live sessions, interactive coding challenges, and peer collaboration in our virtual environment.',
      icon: Lightbulb,
      color: 'orange',
    },
    {
      id: 2,
      title: 'Phase 2: Physical Learning',
      description: 'Hands-on in-person training with industry experts, real-world projects, and collaborative workshops.',
      icon: Target,
      color: 'yellow',
    },
    {
      id: 3,
      title: 'Phase 3: The Mentorship Phase',
      description: 'One-on-one guidance from senior professionals, portfolio building, interview prep, and job placement support.',
      icon: Award,
      color: 'green',
    }
  ];

  const objectives = [
    'Build strong technical foundations in your chosen track',
    'Develop problem-solving and critical thinking skills',
    'Learn industry-standard tools and best practices',
    'Complete real-world projects for your portfolio',
    'Gain confidence through consistent practice and feedback'
  ];

  const outcomes = [
    { icon: Briefcase, text: '90%+ job placement rate within 6 months' },
    { icon: Rocket, text: 'Average salary increase of 150–300%' },
    { icon: Users, text: 'Join a network of 1,000+ successful alumni' },
    { icon: CheckCircle, text: 'Industry-recognized certificate upon completion' }
  ];

  const getColorClasses = (color) => {
    const map = {
      orange: { dot: 'bg-orange-500', iconBg: 'bg-orange-200', iconText: 'text-orange-800' },
      yellow: { dot: 'bg-yellow-500', iconBg: 'bg-yellow-200', iconText: 'text-yellow-800' },
      green:  { dot: 'bg-green-600',  iconBg: 'bg-green-200',  iconText: 'text-green-800' }
    };
    return map[color];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">

            {/* Fixed Tabs - No more syntax error */}
            <div className="mb-10 sm:mb-14">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {[
                  { id: 'pathway', label: 'Learning Pathway', icon: Rocket },
                  { id: 'objectives', label: 'Objectives', icon: Target },
                  { id: 'outcomes', label: 'Expected Outcomes', icon: Award }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={
                        // ← Fixed: Everything in one string (or use clsx for longer ones)
                        isActive
                          ? 'relative group overflow-hidden rounded-2xl px-6 py-5 font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                          : 'relative group overflow-hidden rounded-2xl px-6 py-5 font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                        <span>{tab.label}</span>
                      </div>

                      {/* Shine effect */}
                      {isActive && (
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shine_1.5s_infinite]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rest of your content stays exactly the same */}
            <div className="min-h-[500px]">
              {activeTab === 'pathway' && (
                <div className="relative">
                  <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-orange-400 via-yellow-400 to-green-500 rounded-full hidden sm:block" />
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-yellow-400 to-green-500 rounded-full sm:hidden" />

                  <div className="space-y-12 sm:space-y-20">
                    {phases.map((phase, index) => {
                      const colors = getColorClasses(phase.color);
                      const Icon = phase.icon;
                      const isLeft = index % 2 === 0;

                      return (
                        <div key={phase.id} className="relative flex items-center">
                          <div className={`absolute left-8 sm:left-1/2 w-5 h-5 rounded-full ${colors.dot} border-4 border-white shadow-lg -translate-x-1/2 z-20`} />

                          <div className={`w-full sm:w-1/2 ${isLeft ? 'sm:pr-12 lg:pr-20' : 'sm:pl-12 lg:pl-20 sm:ml-auto'}`}>
                            <div className={`ml-16 sm:ml-0 bg-gradient-to-br from-white to-gray-50 border-l-4 ${
                              phase.color === 'orange' ? 'border-orange-400' :
                              phase.color === 'yellow' ? 'border-yellow-400' : 'border-green-500'
                            } rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow`}>
                              <div className="flex items-start gap-4">
                                <div className={`${colors.iconBg} ${colors.iconText} rounded-xl p-3 flex-shrink-0`}>
                                  <Icon className="w-8 h-8" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                                  <p className="text-gray-600 leading-relaxed">{phase.description}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {isLeft && <div className="hidden sm:block w-1/2" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'objectives' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-lg text-gray-800 font-medium">{obj}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'outcomes' && (
                <div className="space-y-8 max-w-4xl mx-auto">
                  {outcomes.map((outcome, i) => {
                    const Icon = outcome.icon;
                    return (
                      <div key={i} className="flex items-center gap-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
                          <Icon className="w-12 h-12" />
                        </div>
                        <p className="text-xl sm:text-2xl font-bold">{outcome.text}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}