"use client";

import React, { useState } from "react";
import { Search, Clock, Share2, ArrowRight, User, Calendar } from "lucide-react";

const NewsSection = ({
  searchPlaceholder = "Search press release...",
  categories: propsCategories = [],
  featuredPost: propsFeaturedPost = null,
  latestNewsTitle = "Latest News Reports",
  latestNewsDescription = "Watch the video highlight of future clan bootcamp 2024 through our lens",
  newsPosts: propsNewsPosts = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const defaultCategories = [
    "ALL",
    "Program Launch",
    "Partnerships",
    "Fundings",
    "Achievements",
    "Technology",
  ];

  const defaultFeaturedPost = {
    title: "Incubator Launches Revolutionary Future Clan Bootcamp Program",
    description:
      "Today, Incubator proudly announces the launch of the Future Clan Bootcamp, an innovative 3-month intensive training program designed to bridge the digital skills gap across Africa. The program will focus on high-demand technologies including web development, data analysis, cybersecurity, and digital marketing.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    date: "December 15, 2024",
    readTime: "5 mins read",
    category: ["FEATURED", "Program Launch"],
    readFullStoryLink: "#"
  };

  const defaultNewsPosts = [
    {
      id: 1,
      category: "Fundings",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      title: "Digital SkillUp Africa Initiative Receives $4M Funding",
      description:
        "The initiative is set to expand its reach to 10 African countries, training thousands of youth in digital careers.",
      date: "December 15, 2024",
      learnMoreLink: "#"
    },
    {
      id: 2,
      category: "Program Launch",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      title: "Digital SkillUp Africa Commences with AI Tech Webinar",
      description:
        "The first batch begins with an intensive AI bootcamp aimed at preparing participants for global tech opportunities.",
      date: "January 8, 2025",
      learnMoreLink: "#"
    },
    {
      id: 3,
      category: "Achievements",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      title: "Ladies in Tech Africa Celebrates 1000+ Female Graduates",
      description:
        "Over 1000 women across Africa have completed the program and transitioned into tech roles.",
      date: "December 12, 2024",
      learnMoreLink: "#"
    },
    {
      id: 4,
      category: "Achievements",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
      title: "500+ Graduates Successfully Placed in Tech Roles",
      description:
        "Graduates from the bootcamp have secured roles in leading African and international tech companies.",
      date: "September 1, 2024",
      learnMoreLink: "#"
    },
    {
      id: 5,
      category: "Partnerships",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      title: "New Partnership Expands Bootcamp Opportunities Across Africa",
      description:
        "The collaboration brings new sponsors and internship opportunities for graduates.",
      date: "March 1, 2025",
      learnMoreLink: "#"
    },
    {
      id: 6,
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      title: "New Virtual Learning Platform Launched with AI Integration",
      description:
        "An AI-powered personal learning assistant has been launched to improve student outcomes.",
      date: "February 14, 2025",
      learnMoreLink: "#"
    },
  ];

  const categories = propsCategories.length > 0
    ? propsCategories.map(cat => cat.name || cat)
    : defaultCategories;

  const featuredPost = propsFeaturedPost
    ? {
        title: propsFeaturedPost.title || defaultFeaturedPost.title,
        description: propsFeaturedPost.description || defaultFeaturedPost.description,
        image: propsFeaturedPost.image || defaultFeaturedPost.image,
        date: propsFeaturedPost.date || defaultFeaturedPost.date,
        readTime: propsFeaturedPost.readTime || defaultFeaturedPost.readTime,
        category: propsFeaturedPost.category?.map(c => c.tag || c) || defaultFeaturedPost.category,
        readFullStoryLink: propsFeaturedPost.readFullStoryLink || defaultFeaturedPost.readFullStoryLink
      }
    : defaultFeaturedPost;

  const newsPosts = propsNewsPosts.length > 0
    ? propsNewsPosts.map((post, index) => ({
        id: index + 1,
        category: post.category,
        image: post.image,
        title: post.title,
        description: post.description,
        date: post.date,
        learnMoreLink: post.learnMoreLink || "#"
      }))
    : defaultNewsPosts;

  const filteredPosts = newsPosts.filter(
    (post) =>
      (selectedCategory === "ALL" ||
        post.category === selectedCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* ----------------------------- SEARCH + FILTER ----------------------------- */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-[#B3B3B3] border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium border rounded-md transition ${
                  selectedCategory === cat
                    ? "bg-green-100 text-green-700 border-green-400"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ----------------------------- FEATURED POST ----------------------------- */}
        <div className="relative h-[400px] md:h-[420px] lg:h-[450px] rounded-2xl overflow-hidden mb-16">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/92"></div>

          <div className="absolute inset-0 flex flex-col p-6 md:p-10 ">
            <div className="flex flex-wrap gap-2 mb-3">
              {featuredPost.category.map((cat) => (
                <span
                  key={cat}
                  className={`px-5 py-2 text-xs font-semibold rounded-full ${
                    cat === "FEATURED"
                      ? "bg-black text-white"
                      : "bg-white/90 text-gray-800"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>

            <h2 className="text-2xl text-[#0C0D0D] md:text-3xl font-bold mb-3 leading-snug">
              {featuredPost.title}
            </h2>
            <p className="text-[#6A7D91] text-sm md:text-base max-w-3xl mb-4">
              {featuredPost.description}
            </p>

            <div className="flex items-center gap-4 text-[#6D7280] text-sm mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{featuredPost.date}</span>
              </div>
              <Clock className="w-4 h-4" />
              <span>{featuredPost.readTime}</span>
            </div>

            <div className="flex flex-wrap mt-4 gap-3">
              {featuredPost.readFullStoryLink ? (
                <a
                  href={featuredPost.readFullStoryLink}
                  target={featuredPost.readFullStoryLink.startsWith('http') ? '_blank' : undefined}
                  rel={featuredPost.readFullStoryLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-black hover:bg-gray-900 text-white px-5 py-2 rounded-md font-medium flex items-center gap-2 transition"
                >
                  <ArrowRight className="w-4 h-4" />
                  Read Full Story
                </a>
              ) : (
                <button className="bg-black hover:bg-gray-900 text-white px-5 py-2 rounded-md font-medium flex items-center gap-2 transition">
                  <ArrowRight className="w-4 h-4" />
                  Read Full Story
                </button>
              )}

              <button className="bg-white/90 hover:bg-white border-2 border-[#9CA3AF] text-gray-800 px-5 py-2 rounded-md font-medium flex items-center gap-2 transition">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>

        {/* ----------------------------- LATEST NEWS GRID ----------------------------- */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {latestNewsTitle}
          </h2>
          {latestNewsDescription && (
            <p className="text-gray-600 mb-10">
              {latestNewsDescription}
            </p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block mb-2 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight hover:text-green-600 cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    {post.learnMoreLink ? (
                      <a
                        href={post.learnMoreLink}
                        target={post.learnMoreLink.startsWith('http') ? '_blank' : undefined}
                        rel={post.learnMoreLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all group"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <button className="flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all group">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
