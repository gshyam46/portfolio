
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GlassHeading from "./ui/GlassHeading";
import { EXPERIENCES } from "@/constants/experience";
import GlobeScene from "./ui/GlobeScene";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
 
  const [showAll, setShowAll] = useState(false);

  const visibleExperiences = EXPERIENCES.slice(0, 2);
  const extraExperiences = EXPERIENCES.slice(2);


const handleToggle = () => {
  if (showAll) {
    // Scroll smoothly BEFORE collapsing
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      setShowAll(false);
    }, 350); // sync with animation
  } else {
    setShowAll(true);
  }
};

  return (
    <section ref={containerRef} className="relative w-full mb-[-10] z-30">
      {/* Heading */}
      <div className="relative z-10 flex mt-36 pt-3 justify-center mb-16">
        <GlassHeading
          text="Professional Experience"
          width="w-[100%]"
          position="center"
          fontSize="2.2rem"
          height="h-[60px]"
        />
      </div>

      {/* EXPERIENCE LIST */}
      <div className="relative max-w-[80%] mx-auto z-10 flex flex-col gap-10">

        {/* Always visible */}
        {visibleExperiences.map((exp, idx) => {
          const isLeft = idx % 2 === 0;
          const isActive = true;

          return (
            <div
              key={exp.company}
              data-index={idx}
              className={`experience-card relative flex ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              <ExperienceCard exp={exp} isActive={isActive} />
            </div>
          );
        })}

        {/* Expandable section */}
        <AnimatePresence  mode="wait">
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: { duration: 0.5, ease: [0.22, 1, 0.36, 1],delay: 0.1  },
                  opacity: { duration: 0.4, delay: 0.1 },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  opacity: { duration: 0.5 },
                    height: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
                },
              }}
              className="flex flex-col gap-10 overflow-hidden"
            >
              {extraExperiences.map((exp, idx) => {
                const realIndex = idx + 2;
                const isLeft = realIndex % 2 === 0;

                return (
                  <motion.div
                    key={exp.company}
                    data-index={realIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      delay: idx * 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`experience-card relative flex ${
                      isLeft ? "justify-start" : "justify-end"
                    }`}
                  >
                    <ExperienceCard exp={exp} isActive={true} />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* VIEW MORE / LESS */}
      <div className="flex justify-center mt-16">
        <div className="flex items-center gap-6 w-full max-w-md">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/30" />

          <button
            onClick={handleToggle}
            className="relative z-30 px-6 py-2 text-sm text-white/60 hover:text-white bg-transparent hover:bg-white/5 rounded transition-all duration-300 font-medium tracking-wide active:scale-95"
          >
            {showAll ? "View less" : "View more"}
          </button>

          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/30" />
        </div>
      </div>
      <GlobeScene /> 
    </section>
  );
}

/* ========================
   Experience Card
======================== */
function ExperienceCard({ exp, isActive }: any) {
  return (
    <div
      className={`
        glass-container w-[85%] z-10
        transition-all duration-700 ease-out
        ${isActive ? "opacity-100 translate-y-0" : "opacity-60 translate-y-4"}
      `}
      style={{
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
      }}
    >
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-specular" />

      <div className="glass-content flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          {exp.logo && (
            <Image
              src={exp.logo}
              alt={exp.company}
              width={42}
              height={42}
              className="rounded-md"
            />
          )}
          <h3 className="text-2xl font-semibold text-white">
            {exp.company}
          </h3>
        </div>

        <p className="text-sl text-white/100">
          {exp.role} • {exp.duration}
        </p>

        <ul className="list-disc list-inside text-white/85 text-sm space-y-2">
          {exp.description.map((d: string, i: number) => (
            <li key={i}>{d}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-2">
          {exp.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-white/10 text-xs text-white hover:bg-white/15 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

