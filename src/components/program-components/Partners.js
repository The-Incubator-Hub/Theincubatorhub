

import React from 'react';

export default function Partners({
  title = "Our Future Clan Bootcamp Partners",
  partners: propsPartners = []
}) {
  const defaultPartners = [
    { name: 'YouTube', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg' },
    { name: 'Slack', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_Icon_2021.svg' },
    { name: 'Amazon', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Microsoft', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  ];

  const partners = propsPartners.length > 0
    ? propsPartners
    : defaultPartners;

  return (
    <div className="overflow-hidden max-w-6xl my-16 mx-auto p-4 flex items-center justify-between bg-white">
      <h2 className="text-3xl md:text-4xl w-md font-bold text-[#061C3D]">
        {title}
      </h2>
      <div className="flex items-center gap-6">
        {partners.map((partner, index) => (
          <img
            key={index}
            src={partner.logoUrl}
            alt={partner.name}
            className="h-8 object-contain"
          />
        ))}
      </div>
    </div>
  );
};
