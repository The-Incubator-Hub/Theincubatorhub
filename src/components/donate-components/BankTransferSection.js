"use client";

import { Building2, Copy, CreditCard, Lightbulb, User } from "lucide-react";
import { useMemo, useState } from "react";

export default function BankTransferSection({
  title = "Bank Transfer Details",
  description = "Complete your support with a direct bank transfer",
  nairaAccount = {},
  usdAccount = {},
}) {
  const [activeTab, setActiveTab] = useState("naira");
  const [copiedField, setCopiedField] = useState("");

  const accountDetails = useMemo(() => {
    const defaultNairaAccount = {
      title: "Nigerian Naira Account",
      description: "For local Nigeria transfer and local donations",
      bankName: "Access Bank",
      accountName: "The Incubator Hub",
      accountNumber: "0124738619",
    };

    const defaultUsdAccount = {
      title: "US Dollar Account",
      description: "For international transfers and USD donations",
      bankName: "Chase Bank",
      accountName: "The Incubator Hub",
      accountNumber: "9876543210",
    };

    return {
      naira: { ...defaultNairaAccount, ...(nairaAccount || {}) },
      usd: { ...defaultUsdAccount, ...(usdAccount || {}) },
    };
  }, [nairaAccount, usdAccount]);

  const currentAccount = accountDetails?.[activeTab] || accountDetails.naira;

  const copyWithFallback = async (text) => {
    const value = String(text ?? "");

    // Try modern clipboard API
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch (_) {}

    // Fallback: execCommand
    try {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch (_) {
      return false;
    }
  };

  const copyToClipboard = async (text, fieldKey) => {
    const ok = await copyWithFallback(text);
    if (!ok) return;

    setCopiedField(fieldKey);
    window.clearTimeout(window.__copyTimer);
    window.__copyTimer = window.setTimeout(() => setCopiedField(""), 2000);
  };

  const TabButton = ({ id, value, label }) => {
    const isActive = activeTab === value;
    return (
      <button
        id={id}
        type='button'
        role='tab'
        aria-selected={isActive}
        aria-controls={`${id}-panel`}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActiveTab(value)}
        className={`relative z-10 py-3 px-4 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
          isActive ? "text-gray-900" : "text-gray-600"
        }`}
      >
        {label}
      </button>
    );
  };

  const DetailRow = ({ icon: Icon, label, value, copyKey }) => (
    <div className='flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors'>
      <div className='flex items-center gap-3'>
        <Icon className='w-5 h-5 text-gray-400' />
        <div>
          <p className='text-xs text-gray-500 mb-1'>{label}</p>
          <p className='font-semibold text-gray-900 break-all'>
            {value || "-"}
          </p>
        </div>
      </div>

      <button
        type='button'
        onClick={() => copyToClipboard(value, copyKey)}
        className='p-2 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500'
        aria-label={`Copy ${label.toLowerCase()}`}
      >
        <Copy className='w-5 h-5 text-gray-600' />
      </button>
    </div>
  );

  const copiedLabel =
    copiedField === "bank"
      ? "Bank name"
      : copiedField === "account"
      ? "Account name"
      : copiedField === "number"
      ? "Account number"
      : "";

  return (
    <section className='w-full py-12 md:py-16 bg-gray-50'>
      <div className='mx-auto w-full max-w-3xl px-4'>
        <div className='rounded-2xl bg-white shadow-lg border border-gray-100 p-6 md:p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
              {title}
            </h2>
            {description ? (
              <p className='text-gray-500 text-sm md:text-base'>
                {description}
              </p>
            ) : null}
          </div>

          {/* Tabs */}
          <div
            role='tablist'
            aria-label='Bank transfer accounts'
            className='relative bg-gray-200 rounded-md p-1 mb-8'
          >
            <div className='grid grid-cols-2 relative isolate'>
              {/* Slider indicator behind buttons */}
              <div
                aria-hidden='true'
                className='absolute top-1 bottom-1 left-1 right-1/2 bg-white rounded-md shadow-sm transition-all duration-200 ease-in-out z-0'
                style={{
                  left: activeTab === "naira" ? "4px" : "50%",
                  right: activeTab === "naira" ? "50%" : "4px",
                }}
              />

              <TabButton
                id='naira-tab'
                value='naira'
                label='NG Naira Account'
              />
              <TabButton id='usd-tab' value='usd' label='US USD Account' />
            </div>
          </div>

          {/* Content */}
          <div
            id={`${activeTab}-panel`}
            role='tabpanel'
            aria-labelledby={activeTab === "naira" ? "naira-tab" : "usd-tab"}
          >
            <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-1'>
              {currentAccount.title}
            </h3>
            <p className='text-sm text-gray-500 mb-6'>
              {currentAccount.description}
            </p>

            {/* Bank Details */}
            <div className='space-y-3 mb-6'>
              <DetailRow
                icon={Building2}
                label='Bank Name'
                value={currentAccount.bankName}
                copyKey='bank'
              />
              <DetailRow
                icon={User}
                label='Account Name'
                value={currentAccount.accountName}
                copyKey='account'
              />
              <DetailRow
                icon={CreditCard}
                label='Account Number'
                value={currentAccount.accountNumber}
                copyKey='number'
              />
            </div>

            {/* Instructions */}
            <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
              <div className='flex gap-3'>
                <Lightbulb className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
                <div>
                  <h4 className='font-semibold text-green-900 mb-3'>
                    Transfer Instructions:
                  </h4>
                  <ul className='space-y-2 text-sm text-green-800'>
                    <li className='flex gap-2'>
                      <span className='text-green-600'>•</span>
                      <span>Click any detail above to copy to clipboard</span>
                    </li>
                    <li className='flex gap-2'>
                      <span className='text-green-600'>•</span>
                      <span>
                        Include <strong>“TECH EDUCATION DONATION”</strong> in
                        the transfer reference
                      </span>
                    </li>
                    <li className='flex gap-2'>
                      <span className='text-green-600'>•</span>
                      <span>
                        Receipt and program updates will be sent via email
                      </span>
                    </li>
                    <li className='flex gap-2'>
                      <span className='text-green-600'>•</span>
                      <span>
                        All donations support our verified tech programs
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Copy Feedback */}
            {copiedField ? (
              <div className='mt-4 text-center'>
                <p className='text-sm text-green-600 font-medium'>
                  ✓ {copiedLabel} copied!
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
