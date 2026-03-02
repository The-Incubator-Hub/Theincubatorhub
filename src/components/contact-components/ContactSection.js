"use client";
import { useState } from "react";

const DEFAULT_REACH_OUT_ITEMS = [
  "Program enquiries and applications",
  "Partnerships and sponsorships",
  "Community collaborations",
  "Training requests and institutional programs",
  "Media and speaking engagements",
];

const ContactSection = ({
  title,
  description,
  email,
  phone,
  addressLine1,
  addressLine2,
  socialMedia = {},
  reachOutTitle,
  reachOutItems = [],
  socialTitle,
  socialDescription,
  contactLabels = {},
  formLabels = {},
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const twitterUrl = socialMedia.twitter || socialMedia.X || socialMedia.x;
  const normalizedReachOutItems =
    Array.isArray(reachOutItems) && reachOutItems.length > 0
      ? reachOutItems
          .map((item) => (typeof item === "string" ? item : item?.text))
          .filter(Boolean)
      : DEFAULT_REACH_OUT_ITEMS;
  const inputFields = [
    {
      key: "name",
      label: formLabels.nameLabel || "Name",
      placeholder: formLabels.namePlaceholder || "Full name",
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: formLabels.emailLabel || "Email",
      placeholder: formLabels.emailPlaceholder || "Email address",
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: formLabels.phoneLabel || "Phone number",
      placeholder: formLabels.phonePlaceholder || "Phone number",
      type: "text",
      required: false,
    },
    {
      key: "subject",
      label: formLabels.subjectLabel || "Subject of Message",
      placeholder: formLabels.subjectPlaceholder || "Subject",
      type: "text",
      required: false,
    },
  ];

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: "error",
        message: "Name, email, and message are required.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          message: result?.error || "Unable to send message right now.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: result?.message || "Message sent successfully.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              {reachOutTitle || "What You Can Reach Out For"}
            </h3>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-gray-600'>
              {normalizedReachOutItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-8 border-t pt-10'>
            <div>
              <p className='text-xs tracking-widest uppercase text-gray-400 mb-1'>
                {contactLabels.emailLabel || "Email"}
              </p>
              <p className='text-gray-900 font-medium'>{email}</p>
            </div>

            <div>
              <p className='text-xs tracking-widest uppercase text-gray-400 mb-1'>
                {contactLabels.phoneLabel || "Phone"}
              </p>
              <p className='text-gray-900 font-medium'>{phone}</p>
            </div>

            <div>
              <p className='text-xs tracking-widest uppercase text-gray-400 mb-2'>
                {contactLabels.locationLabel || "Location"}
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
              {socialTitle || "Connect With Us"}
            </h3>

            <p className='text-gray-600 max-w-lg'>
              {socialDescription ||
                "Join our growing community and stay updated on programs, opportunities, and impact stories."}
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
              {twitterUrl && (
                <a
                  href={twitterUrl}
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
          <form className='space-y-7' onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <div key={field.key}>
                <label className='block text-white text-sm mb-2'>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.key}
                  value={formData[field.key]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  className='w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500'
                />
              </div>
            ))}

            <div>
              <label className='block text-white text-sm mb-2'>
                {formLabels.messageLabel || "Message"}
              </label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows='5'
                placeholder={
                  formLabels.messagePlaceholder || "Type your message here..."
                }
                className='w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none'
              />
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-all'
            >
              {isSubmitting
                ? formLabels.submittingButtonText || "Sending..."
                : formLabels.sendButtonText || "Send Message →"}
            </button>

            {status.message ? (
              <p
                className={`text-sm text-center ${
                  status.type === "success" ? "text-green-300" : "text-red-300"
                }`}
              >
                {status.message}
              </p>
            ) : (
              <p className='text-white/60 text-sm text-center'>
                {formLabels.defaultStatusMessage ||
                  "We typically respond within 24–48 hours."}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
