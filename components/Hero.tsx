import React from "react";
import HeroContent from "./ui//HeroContent";
// import LiquidBlob from "./ui/LiquidBlob";


const Hero = () => {
  return (
    <section
      className="relative flex flex-col lg:flex-row items-center
      justify-between h-full w-full "
      id="about-me"
    >
      {/* Left: Text */}

     
      <HeroContent />
      {/* Right: Avatar + Consciousness Blob */}
      <div className="mt-20 lg:mt-0 flex justify-center w-full">
        {/* <LiquidBlob /> */}
      </div>
    </section>
  );
};

export default Hero;