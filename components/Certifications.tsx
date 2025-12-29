
"use client";

import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { CERTIFICATIONS } from "@/constants/certifications";
import CertificationCard from "./ui/CertificationCard";
import GlassHeading from "./ui/GlassHeading";

const INITIAL_COUNT = 4;


export default function Certifications() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isCollapsing, setIsCollapsing] = useState(false);

  const prevCountRef = useRef(INITIAL_COUNT);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = () => {
    setIsCollapsing(false);
    setVisibleCount((prev) => {
      prevCountRef.current = prev;
      return  CERTIFICATIONS.length;
    });
  };

  const handleViewLess = () => {
    setIsCollapsing(true);

    // Smooth scroll back to section top
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    prevCountRef.current = INITIAL_COUNT;
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] pt-20"
    >
      <div className="flex justify-center mb-10">
        <GlassHeading
          text="Certifications"
          width="w-[100%]"
          position="center"
          fontSize="2.2rem"
          height="h-[60px]"
        />
      </div>

      <div className="flex flex-col gap-10">
        <AnimatePresence mode="popLayout">
          {CERTIFICATIONS.slice(0, visibleCount).map((cert, index) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              index={index}
              animateIn={index >= prevCountRef.current}
              isCollapsing={isCollapsing}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 ">
        <div className="flex items-center gap-6 w-full max-w-md">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/30" />

          {visibleCount < CERTIFICATIONS.length ? (
            <button
              onClick={handleLoadMore}
               className="relative z-30 pointer-events-auto px-6 py-2 text-sm text-white/60 hover:text-white bg-transparent hover:bg-white/5 rounded transition-all duration-300 font-medium tracking-wide cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
             
            >
              View more
            </button>
          ) : (
            <button
              onClick={handleViewLess}
               className="relative z-30 pointer-events-auto px-6 py-2 text-sm text-white/60 hover:text-white bg-transparent hover:bg-white/5 rounded transition-all duration-300 font-medium tracking-wide cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
             
            >
              View less
            </button>
          )}

          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/30" />
        </div>
      </div>
    </section>
  );
}

