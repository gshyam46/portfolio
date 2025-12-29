

"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import GlassHeading from "./ui/GlassHeading";
import ProjectCard from "./ui/ProjectCard";
import { PROJECTS } from "@/constants/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(true);

  const inView = useInView(sectionRef, {
    margin: "-25% 0px -80% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.2, 0.45], [0, 1], {
    clamp: true,
  });

  const SPRING = { stiffness: 140, damping: 26 };

  const cardW = 550;
  const cardH = 280;
  const gap = 50;

  const deck = [
    [-120, -20],
    [0, 0],
    [120, -20],
  ];

  const grid = [
    [-cardW - gap, 0],
    [0, 0],
    [cardW + gap, 0],
  ];

  const mainCards = PROJECTS.slice(0, 3);
  const extraCards = PROJECTS.slice(3);
const handleToggle = () => {
  if (showAll) {
    // Scroll smoothly BEFORE collapsing
    sectionRef.current?.scrollIntoView({
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
    <section ref={sectionRef} className="relative w-full">
      {/* Heading */}
      <div className="flex w-full justify-center mt-24 mb-5">
        <GlassHeading
          text="Projects"
          width="w-[100%]"
          position="center"
          fontSize="2.2rem"
          height="h-[60px]"
        />
      </div>

      {/* MAIN DECK (3 cards only) */}
      <div className="relative h-[360px] w-full flex justify-center">
        {mainCards.map((project, i) => {
          const x = useSpring(
            useTransform(progress, [0, 1], [deck[i][0], grid[i][0]]),
            SPRING
          );

          const y = useSpring(
            useTransform(progress, [0, 1], [deck[i][1], grid[i][1]]),
            SPRING
          );

          const scale = useSpring(
            useTransform(progress, [0, 0.3], [0.94, 1]),
            SPRING
          );

          const rotate = useSpring(
            useTransform(progress, [0, 1], [(i - 1) * 6, 0]),
            SPRING
          );

          const entryY = useSpring(inView ? 0 : 30, {
            stiffness: 120,
            damping: 20,
          });

          return (
            <motion.div
              key={project.id}
              style={{
                x,
                y,
                scale,
                rotate,
                translateY: entryY,
                zIndex: 10 - Math.abs(i - 1),
              }}
              className="absolute top-0 -translate-x-1/2"
            >
              <ProjectCard project={project} />
            </motion.div>
          );
        })}
      </div>

      {/* EXTRA PROJECTS (SMOOTH COLLAPSE) */}
      <AnimatePresence mode="wait">
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto",
              transition: {
                height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.4, delay: 0.1 }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                opacity: { duration: 0.5, delay: 0.1 },
                height: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
              }
            }}
            className="w-full px-6 overflow-hidden"
          >
            <div className="w-[95%] ml-12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 ">
              {extraCards.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: showAll ? i * 0.08 : 0,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEW MORE BUTTON
      <div className="flex justify-center mt-12 ">
        <div className="flex items-center gap-6 w-full max-w-md">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/30" />
          <button
            onClick={ handleToggle}
            className="relative z-30 pointer-events-auto px-6 py-2 text-sm text-white/60 hover:text-white bg-transparent hover:bg-white/5 rounded transition-all duration-300 font-medium tracking-wide cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            {showAll ? "View less" : "View more"}
          </button>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/30" />
        </div>
      </div> */}
    </section>
  );
}