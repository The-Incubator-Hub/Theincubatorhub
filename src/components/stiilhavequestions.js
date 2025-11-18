"use client"

import { Cpu, Database, Package, Mail, Bookmark } from 'lucide-react'

function StillHaveQuestions() {
  return (
    <section className="pt-20 pb-20 bg-gray-50 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 
          className="text-gray-900 mb-6 mx-auto"
          style={{
            width: '470px',
            minHeight: '67px',
            fontFamily: 'var(--font-raleway), Raleway, sans-serif',
            fontWeight: 700,
            fontStyle: 'normal',
            fontSize: '48px',
            lineHeight: '140%',
            letterSpacing: '0px',
            textAlign: 'center', 
            opacity: 1
          }}
        >
          Still have questions?
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-16">
          We are a passionate, creative, and results-driven team of digital marketing specialists, 
          strategists, designers, and technologists — all working together to help brands grow in 
          the digital world.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Consultation */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-8 text-center">
            <div className="w-16 h-16 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Cpu className="w-9 h-9 text-orange-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Consultation</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna.
            </p>
            <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              <Mail className="w-5 h-5" />
              Reach Out
            </button>
          </div>

          {/* Press Releases */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-8 text-center">
            <div className="w-16 h-16 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Database className="w-9 h-9 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Read Our Press Releases</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna.
            </p>
            <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              <Bookmark className="w-5 h-5" />
              Read News
            </button>
          </div>

          {/* Blog Post */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-8 text-center">
            <div className="w-16 h-16 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-9 h-9 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Read Our Blog Post</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna.
            </p>
            <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              <Bookmark className="w-5 h-5" />
              Read Article
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StillHaveQuestions