import Image from "next/image";

export default function HeaderCareer({
  title = "About Us",
  description = "",
  backgroundImage = "/team-collaboration-working-together.jpg",
}) {
  const lines = description?.split("\n") || [];
  const subtitle = lines[0];
  const rest = lines.slice(1);

  return (
    <section className='relative w-full h-[400px] md:h-[440px] flex items-center justify-center overflow-hidden'>
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt='Page Hero Background'
          fill
          priority
          className='object-cover object-center'
        />
      ) : (
        <div className='absolute inset-0 bg-black' />
      )}

      <div className='absolute inset-0 bg-black/60' />

      <div className='relative z-10 text-center text-white px-6 max-w-3xl mx-auto'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold mb-4'>
          {title}
        </h1>

        {subtitle && (
          <p className='text-lg md:text-xl font-medium text-gray-200 mb-4'>
            {subtitle}
          </p>
        )}

        <div className='text-sm md:text-base text-gray-300 leading-relaxed space-y-2 max-w-2xl mx-auto'>
          {rest.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
