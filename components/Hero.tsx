import React from "react";
// import HeroContent from "./ui//HeroContent";
// import LiquidBlob from "./ui/LiquidBlob";
import Image from "next/image";
import ResumeModal from "./ui/ResumeModal";

const Hero = () => {
  return (
    <section
      className="w-full"
      id="about-me"
    >

      {/* Left: Text */}
      <div className="relative  min-h-[720px] flex flex-col lg:flex-row w-full">

        <div className="flex flex-row items-center justify-center pl-32 mt-10 w-full z-[20]">
       
      <div className="h-full w-full flex flex-col justify-center text-start">

 <p className=" mt-6 font-tech text-3xl text-white my-6 ">
          Hi I'm
        </p>
        {/* Name with animated gradient */}
        <h1 className=" text-7xl font-bold text-white flex flex-row">

          <span className="font-heading bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300 animate-gradient-x">
            GHANASHYAM 
          </span>
        </h1>
        {/* <Roles text="AI SOFTWARE ENGINEER" 
                    fontSize="2rem"
                      height="h-[60px]"/> */}
                      <ResumeModal/>
      </div>
    </div>
        <div className="flex flex-row  mt-16 w-full z-[20] ">
          <h1 className=" flex mt-16 pt-10 text-white ">

            <span className="font-body pr-5 pt-1 text-6xl">
              AI
            </span>
            <span className="font-cursive  text-7xl">
              Software Engineer
            </span>
          </h1>
        </div>
        {/* Right: Avatar + Consciousness Blob */}
        <div className="mt-20 lg:mt-0 flex justify-center w-full items-center justify-between z-[20]">
          {/* <hero photo /> */}
          {/* <LiquidBlob /> */}
        {/* <div className="relative w-80 h-80 flex items-center justify-center">
             
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <Image
          src="/shyam.jpg"
          alt="Ghanashyam"
          width={320}
          height={320}
          className="rounded-full object-cover object-bottom"
              />
            </div>
          
        </div> */}
        </div>
      </div>
      {/* Description */}
      <p className="font-tech text-2xl text-white text-center my-6 px-16 leading-relaxed">
        I design and engineer{" "}
        <span className="text-purple-400 font-semibold">
          AI-driven software systems and architectures
        </span>.
        <br />
        <span className="block mt-3 text-white/80">
          With a strong inclination toward{" "}
          <span className="text-purple-400 font-semibold">AI research</span>,{" "}
          <span className="text-purple-400 font-semibold">system intelligence</span>, and{" "}
          <span className="text-purple-400 font-semibold">scalable problem-solving</span>.
          <br />
        </span>
        I strive for {" "}
        <span className="text-purple-400 font-semibold">knowledge </span>,{" "}
        and {" "}
        <span className="text-purple-400 font-semibold">growth </span>.{" "}
      </p>

    </section>
  );
};

export default Hero;