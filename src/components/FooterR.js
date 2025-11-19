"use client";

import Link from "next/link";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1D1B20] text-gray-300">
      <div className="max-w-[1434px] mx-auto px-6 pt-[95px] pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Section: Logo, Description & CTA */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-6">
              {/* Logo */}
              <div
                className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
                style={{ width: "313px", height: "32px", opacity: 1, transform: "rotate(0deg)" }}
                onClick={() => (window.location.href = "/")}
                role="button"
                tabIndex={0}
                aria-label="Go to home page"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.location.href = "/";
                  }
                }}
              >
                <img
                  src="/images/Iogo_incubator.png"
                  alt="Incubator Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-[16px] leading-relaxed">
                We empower the next generation of tech leaders! Our 
                <br />hands-on training programs cover everything from 
                <br />coding to cybersecurity, ensuring you gain the skills 
                <br />needed to thrive in today's digital landscape. Join us 
                <br />and unlock your potential.
              </p>
            <button 
              className="w-[172px] h-[44px] opacity-100 flex items-center justify-center gap-[5px] rounded-[10px] bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-100 ease-in-out"
              onClick={() => window.location.href = "/donate"}
            >
              Download Brochure
            </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">QUICK LINKS</h3>
            <ul className="space-y-5 text-sm text-[#838E9E]">
              {['About', 'Get Involved', 'Contact Us', 'Our Partners', 'Our Team', 'Gallery'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">RESOURCES</h3>
            <ul className="space-y-5 text-sm text-[#838E9E]">
              {['Blogs', 'FAQs', 'Testimonials', 'Careers', 'Press Release', 'Resources'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">POLICIES</h3>
            <ul className="space-y-5 text-sm text-[#838E9E]">
              {['Terms & Conditions', 'Privacy Policy', 'Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:col-span-2 flex flex-col items-start space-y-3">
            <a
              href="#"
              className="flex items-center gap-3 bg-[#FFFFFF14] px-4 py-2 rounded-lg transition-colors w-full"
              style={{ width: "130px", height: "44px", borderRadius: "5px", gap: "10px", padding: "12px", opacity: 1, transform: "rotate(0deg)" }}
            >
              <Facebook size={20} color="white" fill="white" style={{ width: "20px", height: "20px", opacity: 1, transform: "rotate(0deg)" }} className="text-white" />
              <div className="w-px h-4 bg-[#FFFFFF14]"></div>
              <span className="text-sm text-[14px]">Facebook</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-[#FFFFFF14] px-4 py-2 rounded-lg transition-colors w-full"
              style={{ width: "121px", height: "44px", borderRadius: "5px", gap: "10px", padding: "12px", opacity: 1, transform: "rotate(0deg)" }}
            >
              <Linkedin size={20} color="white" fill="white" style={{ width: "20px", height: "20px", opacity: 1, transform: "rotate(0deg)" }} className="text-white" />
              <div className="w-px h-4 bg-[#FFFFFF14]"></div>
              <span className="text-sm text-[14px]">LinkedIn</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-[#FFFFFF14] px-4 py-2 rounded-lg w-full"
              style={{ width: "112px", height: "44px", borderRadius: "5px", gap: "10px", padding: "12px", opacity: 1, transform: "rotate(0deg)" }}
            >
              <Twitter size={20} color="white" fill="white" style={{ width: "20px", height: "20px", opacity: 1, transform: "rotate(0deg)" }} className="text-white" />
              <div className="w-px h-4 bg-[#FFFFFF14]"></div>
              <span className="text-sm text-[14px]">X</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-[#FFFFFF14] px-4 py-2 rounded-lg transition-colors w-full"
              style={{ width: "130px", height: "44px", borderRadius: "5px", gap: "10px", padding: "12px", opacity: 1, transform: "rotate(0deg)" }}
            >
              <Instagram size={20} className="text-white" />
              <div className="w-px h-4 bg-[#FFFFFF14]"></div>
              <span className="text-sm text-[14px]">Instagram</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr 
          className="my-8"
          style={{
            width: '1320px',
            height: '0px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#374151',
            opacity: 1,
            transform: 'rotate(-0deg)'
          }}
        />

        {/* Copyright */}
        <div className="text-center text-sm text-[#FFFFFF]">
          <p>© 2025 – Incubator</p>
        </div>
      </div>
    </footer>
  );
}