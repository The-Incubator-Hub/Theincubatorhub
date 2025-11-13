'use client'
import { useState } from 'react';
import { Copy, Building2, User, CreditCard, Lightbulb } from 'lucide-react';

export default function BankTransferSection() {
  const [activeTab, setActiveTab] = useState('naira');
  const [copiedField, setCopiedField] = useState('');

  const accountDetails = {
    naira: {
      title: 'Nigerian Naira Account',
      description: 'For local Nigeria transfer and local donations',
      bankName: 'Access Bank',
      accountName: 'The Incubator Hub',
      accountNumber: '0124738619',
    },
    usd: {
      title: 'US Dollar Account',
      description: 'For international transfers and USD donations',
      bankName: 'Chase Bank',
      accountName: 'The Incubator Hub',
      accountNumber: '9876543210',
    },
  };

  const currentAccount = accountDetails[activeTab];

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bank Transfer Details
          </h1>
          <p className="text-gray-500 text-sm">
            complete your support with a direct bank transfer
          </p>
        </div>

        {/* Tabs */}
        <div className="relative bg-[#E5E7EB] rounded-md p-1">
            <div className="grid grid-cols-2 relative">
                <button
                    onClick={() => setActiveTab('naira')}
                    className="relative z-10 py-3 px-4 rounded-md text-sm font-medium transition-colors"
                >
                    NG Naira Account
                </button>
                <button
                    onClick={() => setActiveTab('usd')}
                    className="relative z-10 py-3 px-4 rounded-md text-sm font-medium transition-colors"
                >
                    US USD Account
                </button>
                <div 
                    className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-200 ease-in-out"
                    style={{
                    left: activeTab === 'naira' ? '4px' : '50%',
                    right: activeTab === 'naira' ? '50%' : '4px'
                    }}
                ></div>
            </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {currentAccount.title}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {currentAccount.description}
          </p>

          {/* Bank Details */}
          <div className="space-y-3 mb-6">
            {/* Bank Name */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bank Name</p>
                  <p className="font-semibold text-gray-900">{currentAccount.bankName}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(currentAccount.bankName, 'bank')}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Account Name */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Name</p>
                  <p className="font-semibold text-gray-900">{currentAccount.accountName}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(currentAccount.accountName, 'account')}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Account Number */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Number</p>
                  <p className="font-semibold text-gray-900">{currentAccount.accountNumber}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(currentAccount.accountNumber, 'number')}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-3">
                  Transfer Instructions:
                </h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Click any details above to copy to clipboard</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Include "TECH EDUCATION DONATION" in transfer reference</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Receipt and program updates will be sent via email</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>All donations support our verified tech training programs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copy Feedback */}
          {copiedField && (
            <div className="mt-4 text-center">
              <p className="text-sm text-green-600 font-medium">
                ✓ Copied to clipboard!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}