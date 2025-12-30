"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import GlassHeading from "./ui/GlassHeading";
import PublicationCard from "./ui/PublicationCard";

import { PUBLICATIONS } from "@/constants/publications";

export default function Publications() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    margin: "-30% 0px -30% 0px",
    once: true,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
    >
       
      
      {/* Heading */}
      <div className="flex justify-center mb-14">
        <GlassHeading
          text="Publications"
          width="w-[100%]"
          position="center"
          fontSize="2.2rem"
          height="h-[60px]"
        />
      </div>

      {/* Publication Card */}
      <div className="flex justify-center">
        <PublicationCard
          publication={PUBLICATIONS[0]}
          animate={inView}
        />
      </div>
    </section>
  );
}
