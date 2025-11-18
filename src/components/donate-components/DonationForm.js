'use client'
import React, { useState } from 'react';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    frequency: 'one-time',
    currency: 'NGN',
    amount: '',
    customAmount: '',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    anonymous: false
  });

  const currencies = [
    { code: 'NGN', symbol: '₦', name: 'Naira' },
    { code: 'USD', symbol: '$', name: 'USD' },
    { code: 'EUR', symbol: '€', name: 'EUR' }
  ];

  const amounts = {
    NGN: ['10,000', '25,000', '50,000', '100,000', '250,000', '500,000'],
    USD: ['25', '50', '100', '250', '500', '1,000'],
    EUR: ['20', '45', '90', '225', '450', '900']
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = () => {
    console.log('Donation submitted:', formData);
    alert('Thank you for your donation!');
  };

  const FlagIcon = ({ code }) => {
    if (code === 'NGN') {
      return (
        <svg className="w-full h-full" viewBox="0 0 60 40">
          <rect width="60" height="40" fill="#fff"/>
          <rect width="60" height="13.33" fill="#008751"/>
          <rect y="26.67" width="60" height="13.33" fill="#008751"/>
        </svg>
      );
    }
    if (code === 'USD') {
      return (
        <svg className="w-full h-full" viewBox="0 0 60 40">
          <rect width="60" height="40" fill="#B22234"/>
          <rect y="3" width="60" height="3" fill="#fff"/>
          <rect y="9" width="60" height="3" fill="#fff"/>
          <rect y="15" width="60" height="3" fill="#fff"/>
          <rect y="21" width="60" height="3" fill="#fff"/>
          <rect y="27" width="60" height="3" fill="#fff"/>
          <rect y="33" width="60" height="3" fill="#fff"/>
          <rect width="24" height="21" fill="#3C3B6E"/>
        </svg>
      );
    }
    if (code === 'EUR') {
      return (
        <svg className="w-full h-full" viewBox="0 0 60 40">
          <rect width="60" height="40" fill="#003399"/>
          <circle cx="30" cy="20" r="6" fill="none" stroke="#FFCC00" strokeWidth="1"/>
          <circle cx="30" cy="14" r="1" fill="#FFCC00"/>
          <circle cx="33" cy="15" r="1" fill="#FFCC00"/>
          <circle cx="35" cy="17" r="1" fill="#FFCC00"/>
          <circle cx="36" cy="20" r="1" fill="#FFCC00"/>
          <circle cx="35" cy="23" r="1" fill="#FFCC00"/>
          <circle cx="33" cy="25" r="1" fill="#FFCC00"/>
          <circle cx="30" cy="26" r="1" fill="#FFCC00"/>
          <circle cx="27" cy="25" r="1" fill="#FFCC00"/>
          <circle cx="25" cy="23" r="1" fill="#FFCC00"/>
          <circle cx="24" cy="20" r="1" fill="#FFCC00"/>
          <circle cx="25" cy="17" r="1" fill="#FFCC00"/>
          <circle cx="27" cy="15" r="1" fill="#FFCC00"/>
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Support Tech Education
            </h2>
            <p className="text-gray-600 text-sm">
              Choose a specific program to support or contribute to our general scholarship fund
            </p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Donation Frequency
            </label>
            <div className="relative bg-[#E5E7EB] rounded-full p-1">
              <div className="grid grid-cols-2 relative">
                <button
                  onClick={() => setFormData({ ...formData, frequency: 'one-time' })}
                  className="relative z-10 py-3 px-4 rounded-full text-sm font-medium transition-colors"
                >
                  One-Time Donation
                </button>
                <button
                  onClick={() => setFormData({ ...formData, frequency: 'monthly' })}
                  className="relative z-10 py-3 px-4 rounded-full text-sm font-medium transition-colors"
                >
                  Monthly Support
                </button>
                <div 
                  className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-200 ease-in-out"
                  style={{
                    left: formData.frequency === 'one-time' ? '4px' : '50%',
                    right: formData.frequency === 'one-time' ? '50%' : '4px'
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Currencies
            </label>
            <div className="grid grid-cols-3 gap-3">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setFormData({ ...formData, currency: curr.code, amount: '' })}
                  className={`py-4 px-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    formData.currency === curr.code
                      ? 'border-[#000000] bg-[#E5E7EB]'
                      : 'border-[#9CA3AF] hover:border-[#000000] bg-white'
                  }`}
                >
                  <div className="w-10 h-7 rounded overflow-hidden flex-shrink-0">
                    <FlagIcon code={curr.code} />
                  </div>
                  <div className="text-left">
                    <div className="text-base font-semibold text-gray-900">{curr.symbol}</div>
                    <div className="text-xs text-gray-500">{curr.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Amount ({formData.currency})
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {amounts[formData.currency].map((amount, index) => (
                <button
                  key={index}
                  onClick={() => setFormData({ ...formData, amount, customAmount: '' })}
                  className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                    formData.amount === amount
                      ? 'border-orange-400 bg-orange-50 text-gray-900'
                      : 'border-[#9CA3AF] text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {currencies.find(c => c.code === formData.currency).symbol}{amount}
                </button>
              ))}
            </div>
            <input
              type="text"
              name="customAmount"
              value={formData.customAmount}
              onChange={(e) => setFormData({ ...formData, customAmount: e.target.value, amount: '' })}
              placeholder="Enter custom amount"
              className="w-full px-4 py-3 rounded-lg border border-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Donor Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">
                Message (Optional)*
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=""
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
                className="w-4 h-4 text-orange-400 rounded focus:ring-orange-400"
              />
              <label className="ml-2 text-sm text-gray-700">
                Make this donation anonymous
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Support Tech Training
            <svg 
                className="w-6 h-6 group-hover:rotate-12 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" 
                />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;