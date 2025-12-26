"use client";

import React from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Roles from "./GlassHeading";

const HeroContent = () => {
  return (
    <div className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]">
      <div className="h-full w-full flex flex-col justify-center text-start">


        {/* Name with animated gradient */}
        <h1 className="mt-6 text-7xl font-bold text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300 animate-gradient-x">
            GHANASHYAM
          </span>
        </h1>

        <Roles text="AI SOFTWARE ENGINEER" />



        {/* Description */}
        <p className="text-lg text-white my-6 max-w-[600px]">
          I design and engineer AI-driven software systems, spanning full-stack development, system architecture, and applied AI research.
        </p>

      </div>
    </div>
  );
};

export default HeroContent;
