"use client";

import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1D1B20] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div
              className="w-[220px] h-[32px] cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <img
                src="/images/Iogo_incubator.png"
                alt="Incubator Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-base leading-relaxed text-gray-400">
              We empower the next generation of African tech leaders through
              hands-on training, mentorship, and innovation-driven programs.
              Join us as we shape the future of work across the continent.
            </p>

            <button
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
              onClick={() => window.location.href = "/linktree"}
            >
              Linktree
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/getinvolved" className="hover:text-white">Get Involved</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/teams" className="hover:text-white">Our Team</a></li>
              <li><a href="/gallery" className="hover:text-white">Gallery</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/resources" className="hover:text-white">Resources</a></li>
              <li><a href="/faqs" className="hover:text-white">FAQs</a></li>
              <li><a href="/testimonies" className="hover:text-white">Testimonials</a></li>
              <li><a href="/press" className="hover:text-white">Press Release</a></li>
              <li><a href="/careers" className="hover:text-white">Careers</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold mb-6">Policies</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/terms" className="hover:text-white">T&amp;C</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2026 – Incubator. All rights reserved.
          </p>

          {/* Social Icons (Horizontal — Modern Standard) */}
          <div className="flex gap-5">
            <a href="#" className="text-gray-400 hover:text-green-500 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500 transition">
              <Instagram size={20} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}