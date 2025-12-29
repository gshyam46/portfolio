// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { EXPERIENCES } from "@/constants/experience";
// import GlassHeading from "./ui/GlassHeading";
// export default function Experience() {
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const [activeIndex, setActiveIndex] = useState(0);

//     useEffect(() => {
//         const cards = document.querySelectorAll(".experience-card");

//         const observer = new IntersectionObserver(
//             entries => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         setActiveIndex(Number(entry.target.getAttribute("data-index")));
//                     }
//                 });
//             },
//             { threshold: 0.4 }
//         );

//         cards.forEach(card => observer.observe(card));
//         return () => observer.disconnect();
//     }, []);

//     return (
//         <section
//             ref={containerRef}
//             className="relative w-full"
//         >
//             {/* =========================
//         GLASS HEADING
//       ========================= */}
//             <div className="relative z-10 flex mt-36 justify-center mb-16">
//                 <GlassHeading
//                     text="Professional Experience"
//                     width="w-[100%]"
//                     position="center"
//                     fontSize="2.2rem"
//                       height="h-[60px]"
//                 />


//             </div>

           

//             {/* =========================
//         TIMELINE
//       ========================= */}
//             <div className="relative max-w-7xl mx-auto z-10">
//                 {/* Curved center line
//                 <svg
//                     className="absolute left-1/2 top-0 h-full w-[200px] -translate-x-1/2 z-0"
//                     viewBox="0 0 200 1000"
//                     preserveAspectRatio="none"
//                 >
//                     <path
//                         d="M100 0 Q50 100 100 200 Q150 300 100 400 Q50 500 100 600 Q150 700 100 800 Q50 900 100 1000"
//                         stroke="rgba(255,255,255,0.4)"
//                         strokeWidth="4"
//                         fill="none"
//                     />
//                 </svg> */}

//                 <div className="flex flex-col gap-20">
//                     {EXPERIENCES.map((exp, idx) => {
//                         const isLeft = idx % 2 === 0;
//                         const isActive = idx === activeIndex;

//                         return (
//                             <div
//                                 key={exp.company}
//                                 data-index={idx}
//                                 className={`experience-card relative flex ${isLeft ? "justify-start" : "justify-end"
//                                     }`}
//                             >
//                                 {/* DOT */}
//                                 {/* <div
//                                     className={`absolute left-1/2 -translate-x-1/2 top-[48px] z-10
//                                         w-5 h-5 rounded-full transition-all duration-500
//                                         ${isActive
//                                             ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]"
//                                             : "bg-white/40"
//                                         }`}
//                                 /> */}

//                                 {/* CARD */}
//                                 <div
//                                     className={`
//                                         glass-container w-[75%] z-10
//                                         transition-all duration-700 ease-out
//                                         ${isActive
//                                             ? "opacity-100 translate-y-0"
//                                             : "opacity-70 translate-y-4"}
//                                     `}
//                                     style={{ borderRadius: '12px' }}
//                                 >
//                                     <div className="glass-filter" />
//                                     <div className="glass-overlay" />
//                                     <div className="glass-specular" />

//                                     <div className="glass-content flex flex-col gap-4">
//                                         <div className="flex items-center gap-3">
//                                             {exp.logo && (
//                                                 <Image
//                                                     src={exp.logo}
//                                                     alt={exp.company}
//                                                     width={42}
//                                                     height={42}
//                                                     className="rounded-md"
//                                                 />
//                                             )}
//                                             <h3 className="text-xl font-semibold text-white">
//                                                 {exp.company}
//                                             </h3>
//                                         </div>

//                                         <p className="text-sm text-white/70">
//                                             {exp.role} • {exp.duration}
//                                         </p>

//                                         <ul className="list-disc list-inside text-white/85 text-sm space-y-2">
//                                             {exp.description.map((d, i) => (
//                                                 <li key={i}>{d}</li>
//                                             ))}
//                                         </ul>

//                                         <div className="flex flex-wrap gap-2 pt-2">
//                                             {exp.technologies.map(tech => (
//                                                 <span
//                                                     key={tech}
//                                                     className="px-3 py-1 rounded-full bg-white/10 text-xs text-white"
//                                                 >
//                                                     {tech}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GlassHeading from "./ui/GlassHeading";
import { EXPERIENCES } from "@/constants/experience";
import GlobeScene from "./ui/GlobeScene";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visibleExperiences = EXPERIENCES.slice(0, 2);
  const extraExperiences = EXPERIENCES.slice(2);

  useEffect(() => {
    const cards = document.querySelectorAll(".experience-card");


    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { threshold: 0.4 }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);
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
      <div className="relative z-10 flex mt-36 justify-center mb-16">
        <GlassHeading
          text="Professional Experience"
          width="w-[100%]"
          position="center"
          fontSize="2.2rem"
          height="h-[60px]"
        />
      </div>

      {/* EXPERIENCE LIST */}
      <div className="relative max-w-7xl mx-auto z-10 flex flex-col gap-20">

        {/* Always visible */}
        {visibleExperiences.map((exp, idx) => {
          const isLeft = idx % 2 === 0;
          const isActive = idx === activeIndex;

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
              className="flex flex-col gap-20 overflow-hidden"
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
        glass-container w-[75%] z-10
        transition-all duration-700 ease-out
        ${isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-4"}
      `}
      style={{ borderRadius: "12px" }}
    >
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-specular" />

      <div className="glass-content flex flex-col gap-4">
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
          <h3 className="text-xl font-semibold text-white">
            {exp.company}
          </h3>
        </div>

        <p className="text-sm text-white/70">
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
              className="px-3 py-1 rounded-full bg-white/10 text-xs text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
