import React from "react";
import HeroContent from "./ui//HeroContent";
// import LiquidBlob from "./ui/LiquidBlob";


const Hero = () => {
  return (
    <section
      className="relative flex flex-col lg:flex-row
      w-full min-h-[720px]"
      id="about-me"
    >
      {/* Left: Text */}

     
      <HeroContent />
      {/* Right: Avatar + Consciousness Blob */}
      <div className="mt-20 lg:mt-0 flex justify-center w-full">
        {/* <LiquidBlob /> */}
      </div>
       {/* ========================= BACKGROUND VIDEO========================= */}
            <video
              autoPlay
              muted
              loop
              className="scale-[1.3] absolute top-[360px] left-0 z-[0] object-cover"
              style={{
                filter:
                  "brightness(0.75) sepia(1) hue-rotate(-10deg) saturate(6) contrast(1.3)",
                              }}
            >
              <source src="/blackhole.webm" type="video/webm" />
            </video>
    </section>
  );
};

export default Hero;