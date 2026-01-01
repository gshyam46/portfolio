import Image from "next/image";
import ResumeModal from "./ui/ResumeModal";

const Hero = () => {
  return (
  <section
  id="about-me"
  className="w-full min-h-[720px] flex items-center"
>
  <div className="w-full flex items-center justify-between ml-10 px-10 lg:px-32">

    {/* LEFT CONTENT */}
    <div className="flex flex-col text-white max-w-xl gap-3">
      <p className="font-tech text-3xl">Hi I&apos;m,</p>

      <h1 className="text-7xl font-bold leading-tight">
        <span className="gold-gradient-text">GHANASHYAM</span>
      </h1>

      <h2 className="flex items-end gap-4 mt-6">
        <span className="font-body text-4xl">AI</span>
        <span className="font-body text-4xl">Software Engineer</span>
      </h2>

      <p className="font-tech text-gray-400 text-2xl mt-6 leading-relaxed">
        I design{" "}
        <span className="text-gray-300">
          intelligent software systems and architectures
        </span>.
      </p>

      <div className="mt-8">
        <ResumeModal />
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative flex justify-end items-center mr-10 w-full max-w-lg">

      {/* Glow */}
      <div className="absolute -inset-12 rounded-full
        bg-[radial-gradient(circle,rgba(255,180,80,0.35),transparent_70%)]
        blur-3xl opacity-80" />

      <div className="relative w-full max-w-md">
        <Image
          src="/shyam-art-nobg.png"
          alt="Ghanashyam"
          width={350}
          height={350}
          priority
          className="object-cover w-full h-auto"
        />

        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>

  </div>

  {/* Bottom line aligned with left */}
  <div className="absolute bottom-28  lg:left-36">
    <p className="font-tech text-gray-400 text-2xl max-w-3xl">
      Focused on AI systems, applied research, and scalable engineering.
    </p>
  </div>
</section>

  );
};

export default Hero;
