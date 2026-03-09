import Image from "next/image";

export default function Header({ 
  title = "Meet Our Amazing Team",
  description = "Stay updated with the latest news, announcements, and milestones from Incubator. Get insights into our programs, partnerships, and impact across Africa",
  backgroundImage = "/incubator-media/incubator-15.webp"
}) {
  // Split description into lines for desktop display
  const descriptionLines = description ? description.split('\n') : [];
  const firstLine = descriptionLines[0] || description;
  const remainingLines = descriptionLines.slice(1).join(' ');

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Team Hero Background"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
        {/* Heading - Responsive */}
        <h1 className="font-bold mb-4 sm:mb-6 md:mb-8 mx-auto max-w-[700px] w-full text-balance text-[clamp(2rem,5vw,3.75rem)] leading-[clamp(2.5rem,6vw,4.5rem)]">
          {title}
        </h1>

        {/* Paragraph - Responsive */}
        <div className="mx-auto w-full max-w-[578px]">
          {/* Desktop (lg+) */}
          <p className="hidden lg:block font-sans font-normal text-[18px] leading-[26px] text-center text-[#F2F2F7] min-h-[78px]">
            {descriptionLines.length > 1
              ? descriptionLines.map((line, index) => (
                  <span key={index} className="block">{line}</span>
                ))
              : description}
          </p>

          {/* Tablet (md to lg) */}
          <p className="hidden md:block lg:hidden font-sans font-normal text-[17px] leading-[25px] text-center text-[#F2F2F7] px-4">
            {description}
          </p>

          {/* Mobile */}
          <p className="md:hidden font-sans font-normal text-[15px] leading-[22px] text-center text-[#F2F2F7] px-2">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
