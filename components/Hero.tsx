import Image from "next/image";
import ResumeModal from "./ui/ResumeModal";
import { useDevice } from "@/hooks/useDevice";

const Hero = () => {
  const { isMobile } = useDevice();
  
  return (
    <section
      id="about-me"
      className={`
        hero-section w-full min-h-screen flex items-center px-4 sm:px-6 md:px-8
        ${isMobile ? "pt-20 pb-8" : ""}
      `}
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-0 lg:ml-10 lg:px-10 lg:px-32">

        {/* LEFT CONTENT */}
        <div className="hero-content flex flex-col text-white max-w-xl gap-2 sm:gap-3 text-center lg:text-left">
          <p className="font-tech text-[14px] xs:text-[16px] sm:text-2xl md:text-3xl">Hi I&apos;m,</p>

          <h1 className="hero-title text-[22px] xs:text-[26px] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight break-words max-w-[90vw] text-center lg:text-left mx-auto lg:mx-0">
            <span className="gold-gradient-text whitespace-normal">GHANASHYAM</span>
          </h1>

          <h2 className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-4 mt-1 sm:mt-2 lg:mt-6">
            <span className="hero-subtitle font-body text-[14px] xs:text-[16px] sm:text-xl lg:text-3xl xl:text-4xl text-gray-300">AI Software Engineer</span>
          </h2>

          <p className="hero-description font-tech text-gray-400 text-[11px] xs:text-[12px] sm:text-lg md:text-xl lg:text-2xl mt-2 sm:mt-4 lg:mt-6 leading-relaxed max-w-[90vw] mx-auto lg:mx-0">
            I design{" "}
            <span className="text-gray-300">
              intelligent software systems and architectures
            </span>.
          </p>

          <div className="mt-3 sm:mt-6 lg:mt-8">
            <ResumeModal />
          </div>
         
          <div className="mt-3 sm:mt-6 lg:mt-8">
            <p className="font-tech text-gray-400 text-[10px] xs:text-[11px] sm:text-lg md:text-xl lg:text-2xl max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
              Focused on AI systems, applied research, and scalable engineering.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center lg:justify-end items-center w-full max-w-xs sm:max-w-sm lg:max-w-lg lg:mr-10">

          {/* Glow */}
          <div className="absolute -inset-2 xs:-inset-3 sm:-inset-8 lg:-inset-12 rounded-full
            bg-[radial-gradient(circle,rgba(255,180,80,0.35),transparent_70%)]
            blur-3xl opacity-80" />

          <div
            className="
              hero-image relative w-[70%] xs:w-[75%] sm:w-[80%]
              [mask-image:linear-gradient(to_top,transparent,black_40%)]
              [-webkit-mask-image:linear-gradient(to_top,transparent,black_40%)]
            "
          >
            <Image
              src="/shyam-art-nobg.png"
              alt="Ghanashyam"
              width={350}
              height={350}
              priority
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

      </div>
    </section>
  );
};


export default Hero;
