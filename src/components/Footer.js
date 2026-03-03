"use client";

import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-[#1D1B20] text-gray-300'>
      <div className='max-w-7xl mx-auto px-6 py-20'>
        {/* Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          {/* Brand Column */}
          <div className='space-y-6'>
            <Link
              href='/'
              className='block w-[220px] h-[32px] cursor-pointer'
              aria-label='Go to home page'
            >
              <Image
                src='/images/Iogo_incubator.png'
                alt='Incubator Logo'
                width={220}
                height={32}
                className='w-full h-full object-contain'
              />
            </Link>

            <p className='text-base leading-relaxed text-gray-400'>
              We empower the next generation of African tech leaders through
              hands-on training, mentorship, and innovation-driven programs.
              Join us as we shape the future of work across the continent.
            </p>

            {/* Linktree Button (external, functional) */}
            <a
              href='https://linktr.ee/theincubatorng'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition'
            >
              Linktree
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white font-semibold mb-6'>Quick Links</h3>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li>
                <Link href='/about' className='hover:text-white'>
                  About
                </Link>
              </li>
              <li>
                <Link href='/getinvolved' className='hover:text-white'>
                  Get Involved
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:text-white'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href='/teams' className='hover:text-white'>
                  Our Team
                </Link>
              </li>
              <li>
                <Link href='/gallery' className='hover:text-white'>
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-white font-semibold mb-6'>Resources</h3>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li>
                <Link href='/resources' className='hover:text-white'>
                  Resources
                </Link>
              </li>
              <li>
                <Link href='/faqs' className='hover:text-white'>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href='/testimonies' className='hover:text-white'>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href='/press' className='hover:text-white'>
                  Press Release
                </Link>
              </li>
              <li>
                <Link href='/careers' className='hover:text-white'>
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className='text-white font-semibold mb-6'>Policies</h3>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li>
                <Link href='/terms' className='hover:text-white'>
                  T&amp;C
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='hover:text-white'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* Copyright */}
          <p className='text-sm text-gray-500'>
            © 2026 – The Incubator Hub. All rights reserved.
          </p>

          {/* Social Icons (functional + X + YouTube added) */}
          <div className='flex gap-5'>
            <a
              href='https://web.facebook.com/theincubatorng'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Facebook'
              className='text-gray-400 hover:text-green-500 transition'
            >
              <Facebook size={20} />
            </a>

            <a
              href='https://ng.linkedin.com/company/theincubatorng'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
              className='text-gray-400 hover:text-green-500 transition'
            >
              <Linkedin size={20} />
            </a>

            <a
              href='https://x.com/theincubator_ng'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='X'
              className='text-gray-400 hover:text-green-500 transition'
            >
              <X size={20} />
            </a>

            <a
              href='https://www.instagram.com/theincubatornigeria'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
              className='text-gray-400 hover:text-green-500 transition'
            >
              <Instagram size={20} />
            </a>

            <a
              href='https://youtube.com/@theincubatorhub'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='YouTube'
              className='text-gray-400 hover:text-green-500 transition'
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
