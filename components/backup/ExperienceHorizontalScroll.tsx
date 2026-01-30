
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useMotionValue, useSpring } from "framer-motion";


import Image from "next/image";
import { EXPERIENCES } from "@/constants/experience";


export default function Experience() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = EXPERIENCES.length;

  // Scroll progress tied to section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Enhanced scroll tracking with momentum
  const rawScrollDelta = useMotionValue(0);
  const amplified = useSpring(rawScrollDelta, {
    stiffness: 220,
    damping: 28,
    mass: 0.4,
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    mass: 0.6,
  });

  // Fractional progress for smooth transitions
  const fractionalProgress = useMotionValue(0);
  const smoothFractional = useSpring(fractionalProgress, {
    stiffness: 180,
    damping: 25,
    mass: 0.5,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const delta = v - scrollYProgress.get();
      rawScrollDelta.set(delta * 6);

      // Calculate fractional progress (0 to total-1)
      const fracProgress = v * (total - 1);
      fractionalProgress.set(fracProgress);

      const index = Math.min(
        total - 1,
        Math.max(0, Math.round(fracProgress))
      );

      if (index !== currentIndex) {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
      }
    });

    return () => unsubscribe();
  }, [rawScrollDelta, scrollYProgress, smoothProgress, currentIndex, total, fractionalProgress]);

  // Inter-card transition offset for smooth fade effect
  const transitionOffset = useTransform(
    smoothFractional,
    [0, total - 1],
    [0, 1]
  );



  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 900 : -900,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 12 : -12,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -900 : 900,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? -12 : 12,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    }),
  };

  return (
    
    <section
      ref={sectionRef}
       id="experience"
      className="relative w-full"
      style={{ height: `${EXPERIENCES.length * 100}vh` }}
    >
            <div id="experience" className="h-[1px]" />
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center z-30 px-4 md:px-0">
        {/* Experience Display with enhanced scroll feedback */}
        <div className="relative mt-4 md:mt-8 w-full md:w-[80vw] h-[70vh] md:h-[80vh] mx-auto z-10 flex justify-center items-center">
          {/* Scroll progress indicator - subtle background glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: useTransform(
                smoothFractional,
                [0, total - 1],
                [
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)"
                ]
              ),
            }}
          />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full flex justify-center items-center"
              style={{
                perspective: "2000px",
                x: amplified,
                rotateY: useTransform(amplified, [-60, 60], [-8, 8]),
              }}
            >
              <ExperienceCard 
                exp={EXPERIENCES[currentIndex]} 
                scrollProgress={smoothFractional}
                index={currentIndex}
                total={total}
              />
            </motion.div>
          </AnimatePresence>



        </div>

        {/* Progress Indicator */}
        <div className="relative z-10 flex justify-center items-center gap-2 md:gap-3 mt-3 md:mt-3">
          {EXPERIENCES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-8 md:w-12 bg-white shadow-lg shadow-white/50"
                  : "w-1.5 md:w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="relative z-10 flex justify-center mt-4 md:mt-8">
          <p className="text-white/70 text-sm md:text-base font-medium tracking-wide text-center px-4">
            {currentIndex === 0 && "Scroll down to see more experiences"}
            {currentIndex > 0 && currentIndex < total - 1 &&
              `Experience ${currentIndex + 1} of ${total}`}
            {currentIndex === total - 1 && "Scroll down to continue"}
          </p>
        </div>

         {/* Background Video */}
        <div className="absolute top-[500px] md:top-[700px] left-0 w-full z-[0] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="inset-0 w-full h-full object-cover scale-[1.3]"
            style={{
              filter:
                "brightness(0.75) sepia(1) hue-rotate(-10deg) saturate(6) contrast(1.3)",
            }}
          >
            <source src="/blackhole.webm" type="video/webm" />
          </video>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.99) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 55%)",
            }}
          />
        </div>
      </div>
    </section>
   
  );
}

function ExperienceCard({ exp, scrollProgress, index, total }: any) {
  // Horizontal parallax instead of vertical
  const cardX = useTransform(
    scrollProgress,
    [index - 0.3, index, index + 0.3],
    [-24, 0, 24] // left → center → right
  );

  // Keep visibility strong (no heavy fading)
  const cardOpacity = useTransform(
    scrollProgress,
    [index - 0.5, index - 0.2, index, index + 0.2, index + 0.5],
    [0.8, 0.9, 1, 0.9, 0.8]
  );

  return (
    <motion.div
      className="w-full h-full flex flex-col p-4 md:p-12 gap-4 md:gap-8 overflow-y-auto md:overflow-visible"
      style={{
        x: cardX,
        opacity: cardOpacity,
      }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 pb-4 md:pb-6 border-b border-white/20">
        {exp.logo && (
          <div className="flex-shrink-0">
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-12 h-12 md:w-20 md:h-20 rounded-xl shadow-lg"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight leading-tight">
            {exp.company}
          </h3>
          <p className="text-lg md:text-2xl text-white/95 font-medium">
            {exp.role}
          </p>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-3">
        <div className="w-1 md:w-1.5 h-6 md:h-8 bg-gradient-to-b from-white to-white/50 rounded-full" />
        <p className="text-base md:text-xl text-white/90 font-medium tracking-wide">
          {exp.duration}
        </p>
      </div>

      {/* Description Section */}
      <div className="flex-1 flex flex-col gap-3 md:gap-4">
        <h4 className="text-sm md:text-lg text-white/80 font-semibold uppercase tracking-wider mb-1 md:mb-2">
          Key Achievements
        </h4>
        <ul className="space-y-3 md:space-y-4">
          {exp.description.map((d: string, i: number) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 md:gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="flex-shrink-0 w-1.5 md:w-2 h-1.5 md:h-2 mt-2 md:mt-2.5 rounded-full bg-white shadow-lg shadow-white/50" />
              <span className="text-sm md:text-xl text-white/95 leading-relaxed font-normal">
                {d}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Technologies Section */}
      <div className="pt-4 md:pt-6 border-t border-white/20">
        <h4 className="text-sm md:text-lg text-white/80 font-semibold uppercase tracking-wider mb-3 md:mb-4">
          Technologies
        </h4>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {exp.technologies.map((tech: string, i: number) => (
            <motion.span
              key={tech}
              className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl bg-white/15 text-xs md:text-base text-white font-medium hover:bg-white/25 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}























// "use client";

// import { useRef, useState, useEffect } from "react";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import { useMotionValue, useSpring } from "framer-motion";
// import Image from "next/image";
// import { EXPERIENCES } from "@/constants/experience";
// export default function Experience() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const total = EXPERIENCES.length;

//   // Scroll progress tied to section
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   // Enhanced scroll tracking with momentum
//   const rawScrollDelta = useMotionValue(0);
//   const amplified = useSpring(rawScrollDelta, {
//     stiffness: 220,
//     damping: 28,
//     mass: 0.4,
//   });

//   // Smooth scroll progress
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 260,
//     damping: 30,
//     mass: 0.6,
//   });

//   // Fractional progress for smooth transitions
//   const fractionalProgress = useMotionValue(0);
//   const smoothFractional = useSpring(fractionalProgress, {
//     stiffness: 180,
//     damping: 25,
//     mass: 0.5,
//   });

//   useEffect(() => {
//     const unsubscribe = smoothProgress.on("change", (v) => {
//       const delta = v - scrollYProgress.get();
//       rawScrollDelta.set(delta * 6);

//       // Calculate fractional progress (0 to total-1)
//       const fracProgress = v * (total - 1);
//       fractionalProgress.set(fracProgress);

//       const index = Math.min(
//         total - 1,
//         Math.max(0, Math.round(fracProgress))
//       );

//       if (index !== currentIndex) {
//         setDirection(index > currentIndex ? 1 : -1);
//         setCurrentIndex(index);
//       }
//     });

//     return () => unsubscribe();
//   }, [rawScrollDelta, scrollYProgress, smoothProgress, currentIndex, total, fractionalProgress]);

//   // Calculate scroll direction and distance from current index
//   const scrollOffset = useTransform(smoothFractional, (progress) => {
//     const distanceFromIndex = progress - currentIndex;
//     return distanceFromIndex; // Negative = scrolling up, Positive = scrolling down
//   });

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 900 : -900,
//       opacity: 0,
//       scale: 0.9,
//       rotateY: direction > 0 ? 12 : -12,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//       rotateY: 0,
//       transition: {
//         duration: 0.45,
//         ease: [0.22, 1, 0.36, 1],
//         opacity: { duration: 0.35 },
//         scale: { duration: 0.35 },
//       },
//     },
//     exit: (direction: number) => ({
//       x: direction > 0 ? -900 : 900,
//       opacity: 0,
//       scale: 0.9,
//       rotateY: direction > 0 ? -12 : 12,
//       transition: {
//         duration: 0.45,
//         ease: [0.22, 1, 0.36, 1],
//         opacity: { duration: 0.35 },
//         scale: { duration: 0.35 },
//       },
//     }),
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full"
//       style={{ height: `${EXPERIENCES.length * 100}vh` }}
//     >
//       {/* Sticky viewport */}
//       <div className="sticky top-0 h-screen flex flex-col justify-center z-30 px-4 md:px-0">
//         {/* Experience Display with enhanced scroll feedback */}
//         <div className="relative mt-4 md:mt-8 w-full md:w-[80vw] h-[70vh] md:h-[80vh] mx-auto z-10 flex justify-center items-center">
//           {/* Scroll progress indicator - subtle background glow */}
//           <motion.div
//             className="absolute inset-0 rounded-3xl pointer-events-none"
//             style={{
//               background: useTransform(
//                 smoothFractional,
//                 [0, total - 1],
//                 [
//                   "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
//                   "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)"
//                 ]
//               ),
//             }}
//           />

//           <AnimatePresence initial={false} custom={direction} mode="wait">
//             <motion.div
//               key={currentIndex}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               className="w-full h-full flex justify-center items-center"
//               style={{
//                 perspective: "2000px",
//               }}
//             >
//               <ExperienceCard 
//                 exp={EXPERIENCES[currentIndex]} 
//                 scrollOffset={scrollOffset}
//                 smoothFractional={smoothFractional}
//                 index={currentIndex}
//                 total={total}
//               />
//             </motion.div>
//           </AnimatePresence>

//           {/* Scroll direction indicator */}
//           <motion.div
//             className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4 opacity-30"
//             style={{
//               y: useTransform(smoothFractional, 
//                 (v) => Math.sin(v * Math.PI * 4) * 10
//               ),
//             }}
//           >
//             <div className="w-1 h-16 bg-gradient-to-b from-transparent via-white to-transparent rounded-full" />
//           </motion.div>
//         </div>

//         {/* Progress Indicator */}
//         <div className="relative z-10 flex justify-center items-center gap-2 md:gap-3 mt-8 md:mt-12">
//           {EXPERIENCES.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 setDirection(idx > currentIndex ? 1 : -1);
//                 setCurrentIndex(idx);
//               }}
//               className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
//                 idx === currentIndex
//                   ? "w-8 md:w-12 bg-white shadow-lg shadow-white/50"
//                   : "w-1.5 md:w-2 bg-white/40 hover:bg-white/70"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Scroll Hint */}
//         <div className="relative z-10 flex justify-center mt-4 md:mt-8">
//           <p className="text-white/70 text-sm md:text-base font-medium tracking-wide text-center px-4">
//             {currentIndex === 0 && "Scroll down to see more experiences"}
//             {currentIndex > 0 && currentIndex < total - 1 &&
//               `Experience ${currentIndex + 1} of ${total}`}
//             {currentIndex === total - 1 && "Scroll down to continue"}
//           </p>
//         </div>

 
//          <div className="absolute top-[500px] md:top-[700px] left-0 w-full z-[0] overflow-hidden">
//            <video
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="inset-0 w-full h-full object-cover scale-[1.3]"
//             style={{
//               filter:
//                 "brightness(0.75) sepia(1) hue-rotate(-10deg) saturate(6) contrast(1.3)",
//             }}
//           >
//             <source src="/blackhole.webm" type="video/webm" />
//           </video>

//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               background:
//                 "linear-gradient(to top, rgba(0, 0, 0, 0.99) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 55%)",
//             }}
//           />
//         </div>
//       </div>
//     </section>
    
//   );
// }

// /* ========================
//    Enhanced Experience Card with Edge Fade & X Movement
// ======================== */
// function ExperienceCard({ exp, scrollOffset, smoothFractional, index, total }: any) {
//   // X direction movement based on scroll offset
//   // Positive offset = scrolling down (move right), Negative = scrolling up (move left)
//   const cardX = useTransform(scrollOffset, (offset: number) => {
//     // Only apply X movement when approaching transition (±0.3 from index)
//     const absOffset = Math.abs(offset);
//     if (absOffset < 0.15) return 0; // No movement when centered
//     if (absOffset > 0.45) return 0; // No movement when far
    
//     // Scale movement: 0 at center, up to 80px at edges
//     const movement = (absOffset - 0.15) / 0.3; // 0 to 1
//     const maxMovement = 80;
//     return offset > 0 ? movement * maxMovement : -movement * maxMovement;
//   });

//   // Edge fade effect - decrease opacity when about to transition
//   const cardOpacity = useTransform(scrollOffset, (offset: number) => {
//     const absOffset = Math.abs(offset);
    
//     if (absOffset < 0.15) return 1; // Full opacity when centered
//     if (absOffset > 0.45) return 0.3; // Faded when far
    
//     // Smooth fade between 0.15 and 0.45
//     const fadeProgress = (absOffset - 0.15) / 0.3; // 0 to 1
//     return 1 - (fadeProgress * 0.25); // Fade from 1.0 to 0.75
//   });

//   // Subtle scale for depth
//   const cardScale = useTransform(scrollOffset, (offset: number) => {
//     const absOffset = Math.abs(offset);
//     if (absOffset < 0.2) return 1;
//     const scaleAmount = Math.min((absOffset - 0.2) * 0.15, 0.03);
//     return 1 - scaleAmount;
//   });

//   return (
//     <motion.div
//       className="w-full h-full flex flex-col p-4 md:p-12 gap-4 md:gap-8 overflow-y-auto md:overflow-visible"
//       style={{
//         x: cardX,
//         opacity: cardOpacity,
//         scale: cardScale,
//       }}
//     >
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 pb-4 md:pb-6 border-b border-white/20">
//         {exp.logo && (
//           <div className="flex-shrink-0">
//             <img
//               src={exp.logo}
//               alt={exp.company}
//               className="w-12 h-12 md:w-20 md:h-20 rounded-xl shadow-lg"
//             />
//           </div>
//         )}
//         <div className="flex-1">
//           <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight leading-tight">
//             {exp.company}
//           </h3>
//           <p className="text-lg md:text-2xl text-white/95 font-medium">
//             {exp.role}
//           </p>
//         </div>
//       </div>

//       {/* Duration */}
//       <div className="flex items-center gap-3">
//         <div className="w-1 md:w-1.5 h-6 md:h-8 bg-gradient-to-b from-white to-white/50 rounded-full" />
//         <p className="text-base md:text-xl text-white/90 font-medium tracking-wide">
//           {exp.duration}
//         </p>
//       </div>

//       {/* Description Section */}
//       <div className="flex-1 flex flex-col gap-3 md:gap-4">
//         <h4 className="text-sm md:text-lg text-white/80 font-semibold uppercase tracking-wider mb-1 md:mb-2">
//           Key Achievements
//         </h4>
//         <ul className="space-y-3 md:space-y-4">
//           {exp.description.map((d: string, i: number) => (
//             <motion.li
//               key={i}
//               className="flex items-start gap-3 md:gap-4"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: i * 0.1 }}
//             >
//               <span className="flex-shrink-0 w-1.5 md:w-2 h-1.5 md:h-2 mt-2 md:mt-2.5 rounded-full bg-white shadow-lg shadow-white/50" />
//               <span className="text-sm md:text-xl text-white/95 leading-relaxed font-normal">
//                 {d}
//               </span>
//             </motion.li>
//           ))}
//         </ul>
//       </div>

//       {/* Technologies Section */}
//       <div className="pt-4 md:pt-6 border-t border-white/20">
//         <h4 className="text-sm md:text-lg text-white/80 font-semibold uppercase tracking-wider mb-3 md:mb-4">
//           Technologies
//         </h4>
//         <div className="flex flex-wrap gap-2 md:gap-3">
//           {exp.technologies.map((tech: string, i: number) => (
//             <motion.span
//               key={tech}
//               className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl bg-white/15 text-xs md:text-base text-white font-medium hover:bg-white/25 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: i * 0.05 }}
//             >
//               {tech}
//             </motion.span>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }
