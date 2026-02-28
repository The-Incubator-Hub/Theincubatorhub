"use client";
import { useState } from "react";

const ContactSection = ({
  title,
  description,
  email,
  phone,
  addressLine1,
  addressLine2,
  socialMedia = {},
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
  };

  return (
    <section className='py-20 md:py-28 px-6 bg-white'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start'>
        {/* LEFT COLUMN */}
        <div className='space-y-16'>
          {/* Get in Touch */}
          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-900'>{title}</h2>

            <div className='text-gray-600 leading-relaxed space-y-2 max-w-xl'>
              {(description || "").split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          {/* What You Can Reach Out For */}
          <div className='bg-gray-50 border border-gray-100 rounded-2xl p-8'>
            <h3 className='text-lg font-semibold text-gray-900 mb-6'>
              What You Can Reach Out For
            </h3>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-gray-600'>
              <li>Program enquiries and applications</li>
              <li>Partnerships and sponsorships</li>
              <li>Community collaborations</li>
              <li>Training requests and institutional programs</li>
              <li>Media and speaking engagements</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-8 border-t pt-10'>
            <div>
              <p className='text-xs tracking-widest uppercase text-gray-400 mb-1'>
                Email
              </p>
              <p className='text-gray-900 font-medium'>{email}</p>
            </div>

            <div>
              <p className='text-xs tracking-widest uppercase text-gray-400 mb-1'>
                Phone
              </p>
              <p className='text-gray-900 font-medium'>{phone}</p>
            </div>

            <div>
              <p className='text-xs tracking-widest uppercase text-gray-400 mb-2'>
                Location
              </p>
              <div className='text-gray-600 leading-relaxed space-y-1 max-w-md'>
                <p>{addressLine1}</p>
                <p>{addressLine2}</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className='border-t pt-10 space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Connect With Us
            </h3>

            <p className='text-gray-600 max-w-lg'>
              Join our growing community and stay updated on programs,
              opportunities, and impact stories.
            </p>

            <div className='flex flex-wrap gap-8 text-gray-800 font-medium'>
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-green-600 transition'
                >
                  Instagram
                </a>
              )}
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-green-600 transition'
                >
                  Facebook
                </a>
              )}
              {socialMedia.linkedin && (
                <a
                  href={socialMedia.linkedin}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-green-600 transition'
                >
                  LinkedIn
                </a>
              )}
              {socialMedia.youtube && (
                <a
                  href={socialMedia.youtube}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-green-600 transition'
                >
                  YouTube
                </a>
              )}
              {socialMedia.twitter && (
                <a
                  href={socialMedia.twitter}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-green-600 transition'
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN – NAVY FORM */}
        <div className='bg-[#0B1324] rounded-3xl p-10 shadow-2xl'>
          <div className='space-y-7'>
            {[
              { key: "name", label: "Name", placeholder: "Full name" },
              { key: "email", label: "Email", placeholder: "Email address" },
              {
                key: "phone",
                label: "Phone number",
                placeholder: "Phone number",
              },
              {
                key: "subject",
                label: "Subject of Message",
                placeholder: "Subject",
              },
            ].map((field) => (
              <div key={field.key}>
                <label className='block text-white text-sm mb-2'>
                  {field.label}
                </label>
                <input
                  type={field.key === "email" ? "email" : "text"}
                  name={field.key}
                  value={formData[field.key]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className='w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500'
                />
              </div>
            ))}

            <div>
              <label className='block text-white text-sm mb-2'>Message</label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows='5'
                placeholder='Type your message here...'
                className='w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none'
              />
            </div>

            <button
              onClick={handleSubmit}
              className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-all'
            >
              Send Message →
            </button>

            <p className='text-white/60 text-sm text-center'>
              We typically respond within 24–48 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
