"use client";

import { Button } from "@/components/ui/button";
import PressReleaseCard from "./PressReleaseCard";
import Link from "next/link";

export default function PressReleases() {
  const releases = [
    {
      id: 1,
      image: "/incubator-media/incubator-18.webp",
      category: "Press Release",
      title:
        "Digital SkillUp Africa Expands Access to Tech Training Across Africa",
      description:
        "Through inclusive digital programs and structured mentorship, Digital SkillUp Africa continues to unlock opportunities for thousands of aspiring tech professionals across the continent.",
      date: "25 December 2025",
    },
    {
      id: 2,
      image: "/incubator-media/incubator-19.webp",
      category: "Program Launch",
      title: "AI NOW Bootcamp Equips Youth with Future-Ready AI Skills",
      description:
        "AI NOW empowers learners with hands-on training in artificial intelligence, data analysis, and machine learning — preparing Africa’s youth for the future of work.",
      date: "7 August 2025",
    },
    {
      id: 3,
      image: "/incubator-media/incubator-20.webp",
      category: "Milestone",
      title: "Ladies in Tech Africa Strengthens Female Representation in Tech",
      description:
        "Ladies in Tech Africa continues to drive inclusion by equipping women with in-demand digital skills, mentorship, and leadership opportunities across Africa.",
      date: "12 December 2025",
    },
  ];

  return (
    <section className='py-16 md:py-24 px-4 md:px-8 bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4'>
            Latest News & Press Releases
          </h2>

          <p className='text-gray-600 text-base md:text-lg max-w-2xl mx-auto'>
            Stay updated on our programs, partnerships, milestones, and impact
            stories across Africa.
          </p>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12'>
          {releases.map((release) => (
            <PressReleaseCard key={release.id} release={release} />
          ))}
        </div>

        {/* CTA */}
        <div className='flex justify-center'>
          <Button
            asChild
            className='bg-black hover:bg-gray-900 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors'
          >
            <Link href='/press'>View All Press Releases →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
