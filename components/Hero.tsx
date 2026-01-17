import Image from "next/image";
import ResumeModal from "./ui/ResumeModal";

const Hero = () => {
  return (
    <section
      id="about-me"
      className="w-full min-h-screen flex items-center px-4 sm:px-6 md:px-8"
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 lg:ml-10 lg:px-10 lg:px-32">

        {/* LEFT CONTENT */}
        <div className="flex flex-col text-white max-w-xl gap-3 text-center lg:text-left">
          <p className="font-tech text-xl sm:text-2xl md:text-3xl">Hi I&apos;m,</p>

          <h1 className="text-[28px] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight break-words max-w-[90vw] text-center lg:text-left mx-auto lg:mx-0">
            <span className="gold-gradient-text whitespace-normal">GHANASHYAM</span>
          </h1>

          <h2 className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-4 mt-2 sm:mt-6">
            <span className="font-body text-[16px] sm:text-3xl md:text-4xl text-gray-300">AI</span>
            <span className="font-body text-[16px] sm:text-3xl md:text-4xl text-gray-300">Software Engineer</span>
          </h2>

          <p className="font-tech text-gray-400 text-[13px] sm:text-lg md:text-xl lg:text-2xl mt-4 sm:mt-6 leading-relaxed max-w-[90vw] mx-auto lg:mx-0">
            I design{" "}
            <span className="text-gray-300">
              intelligent software systems and architectures
            </span>.
          </p>

          <div className="mt-6 sm:mt-8">
            <ResumeModal />
          </div>
          <div className="absolute bottom-16 sm:bottom-20 md:bottom-28 left-4 sm:left-8 md:left-16 lg:left-36 right-4 sm:right-8 md:right-16">
        <p className="font-tech text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl text-center lg:text-left">
          Focused on AI systems, applied research, and scalable engineering.
        </p>
      </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center lg:justify-end items-center w-full max-w-xs sm:max-w-sm lg:max-w-lg lg:mr-10">

          {/* Glow */}
          <div className="absolute -inset-4 sm:-inset-8 lg:-inset-12 rounded-full
        bg-[radial-gradient(circle,rgba(255,180,80,0.35),transparent_70%)]
        blur-3xl opacity-80" />

          <div className="relative w-full max-w-[180px] sm:max-w-[250px] md:max-w-md">
            <Image
              src="/shyam-art-nobg.png"
              alt="Ghanashyam"
              width={350}
              height={350}
              priority
              className="object-cover w-full h-auto"
            />

            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 sm:h-24 lg:h-36 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>
        </div>

      </div>

      {/* Bottom line aligned with left */}
      
    </section>

  );
};

export default Hero;
