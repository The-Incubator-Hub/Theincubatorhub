"use client";

import Link from "next/link";

export default function VolunteersSection({
  title = "Our Volunteers",
  description = `We have successfully onboarded over 100 dedicated volunteers spread across all six geopolitical zones of Nigeria. These remarkable individuals have generously contributed their time and expertise to support our various training programs.

Their dedication is evident in their consistent support for our training programs, which has led to increased participation and improved outcomes for beneficiaries. Their passion and expertise have been invaluable assets to The Incubator Hub, and we are excited to see the continued growth of our volunteer network.`,
  buttonText = "Join Us →",
  buttonLink = "/getinvolved",
}) {
  return (
    <section className='bg-white py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
        <div className='lg:col-span-7'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
            {title}
          </h2>
          <div className='mt-5 space-y-4 text-gray-600 leading-relaxed'>
            {description.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className='mt-8'>
            <Link
              href={buttonLink}
              className='inline-flex items-center justify-center rounded-lg bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3 transition-colors'
            >
              {buttonText}
            </Link>
          </div>
        </div>

        <div className='lg:col-span-5'>
          <div className='rounded-2xl border bg-gray-50 p-6'>
            <p className='text-sm uppercase tracking-wider text-gray-500 mb-2'>
              Volunteer Impact
            </p>
            <p className='text-4xl font-bold text-gray-900'>100+</p>
            <p className='text-gray-600 mt-2'>
              Dedicated volunteers across Nigeria’s six geopolitical zones.
            </p>

            <div className='mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700'>
              <div className='rounded-lg bg-white p-3 border'>Mentorship</div>
              <div className='rounded-lg bg-white p-3 border'>
                Training Support
              </div>
              <div className='rounded-lg bg-white p-3 border'>
                Community Outreach
              </div>
              <div className='rounded-lg bg-white p-3 border'>
                Program Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
