
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { EXPERIENCES } from "@/constants/experience";



// export default function Experience() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const isScrollingRef = useRef(false);
//   const lastScrollTimeRef = useRef(0);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleWheel = (e: WheelEvent) => {
//       const now = Date.now();
      
//       // Throttle scroll events - increased for smoother feel
//       if (now - lastScrollTimeRef.current < 1000) {
//         e.preventDefault();
//         return;
//       }

//       const rect = container.getBoundingClientRect();
//       const isInView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;

//       if (!isInView) return;

//       if (isScrollingRef.current) {
//         e.preventDefault();
//         return;
//       }

//       // Scrolling down
//       if (e.deltaY > 0) {
//         if (currentIndex < EXPERIENCES.length - 1) {
//           e.preventDefault();
//           isScrollingRef.current = true;
//           lastScrollTimeRef.current = now;
//           setDirection(1);
//           setCurrentIndex(prev => prev + 1);
//           setTimeout(() => {
//             isScrollingRef.current = false;
//           }, 1000);
//         }
//       }
//       // Scrolling up
//       else if (e.deltaY < 0) {
//         if (currentIndex > 0) {
//           e.preventDefault();
//           isScrollingRef.current = true;
//           lastScrollTimeRef.current = now;
//           setDirection(-1);
//           setCurrentIndex(prev => prev - 1);
//           setTimeout(() => {
//             isScrollingRef.current = false;
//           }, 1000);
//         }
//       }
//     };

//     container.addEventListener("wheel", handleWheel, { passive: false });

//     return () => {
//       container.removeEventListener("wheel", handleWheel);
//     };
//   }, [currentIndex]);

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 1200 : -1200,
//       opacity: 0,
//       scale: 0.85,
//       rotateY: direction > 0 ? 15 : -15
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//       rotateY: 0,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.46, 0.45, 0.94],
//         opacity: { duration: 0.6 },
//         scale: { duration: 0.6 }
//       }
//     },
//     exit: (direction: number) => ({
//       x: direction > 0 ? -1200 : 1200,
//       opacity: 0,
//       scale: 0.85,
//       rotateY: direction > 0 ? -15 : 15,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.46, 0.45, 0.94],
//         opacity: { duration: 0.6 },
//         scale: { duration: 0.6 }
//       }
//     })
//   };

//   return (
//     <section ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-center py-20 z-30">
//       {/* Heading */}
//       {/* <div className="relative z-10 flex justify-center mb-12">
//         <GlassHeading
//           text="Roles and Responsibilities"
//           width="w-[100%]"
//           position="center"
//           fontSize="2.2rem"
//           height="h-[60px]"
//         />
//       </div> */}

//       {/* Experience Display */}
//       <div className="relative mt-8 w-[80vw] h-[80vh] mx-auto z-10 flex justify-center items-center">
//         <AnimatePresence initial={false} custom={direction} mode="wait">
//           <motion.div
//             key={currentIndex}
//             custom={direction}
//             variants={slideVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             className="w-full h-full flex justify-center items-center"
//             style={{ perspective: "2000px" }}
//           >
//             <ExperienceCard exp={EXPERIENCES[currentIndex]} />
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Progress Indicator */}
//       <div className="relative z-10 flex justify-center items-center gap-3 mt-12">
//         {EXPERIENCES.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => {
//               setDirection(idx > currentIndex ? 1 : -1);
//               setCurrentIndex(idx);
//             }}
//             className={`h-2 rounded-full transition-all duration-500 ${
//               idx === currentIndex 
//                 ? "w-12 bg-white shadow-lg shadow-white/50" 
//                 : "w-2 bg-white/40 hover:bg-white/70"
//             }`}
//             aria-label={`Go to experience ${idx + 1}`}
//           />
//         ))}
//       </div>

//       {/* Scroll Hint */}
//       <div className="relative z-10 flex justify-center mt-8">
//         <p className="text-white/70 text-base font-medium tracking-wide">
//           {currentIndex === 0 && "Scroll down to see more experiences"}
//           {currentIndex > 0 && currentIndex < EXPERIENCES.length - 1 && 
//             `Experience ${currentIndex + 1} of ${EXPERIENCES.length}`}
//           {currentIndex === EXPERIENCES.length - 1 && "Scroll down to continue"}
//         </p>
//       </div>

//       {/* Background Video */}
//       <div className="absolute mt-28 top-[700px] left-0 w-full z-[0] overflow-hidden">
//         <video
//           autoPlay
//           muted
//           loop
//           className="inset-0 w-full h-full object-cover scale-[1.3]"
//           style={{
//             filter: "brightness(0.75) sepia(1) hue-rotate(-10deg) saturate(6) contrast(1.3)",
//           }}
//         >
//           <source src="/blackhole.webm" type="video/webm" />
//         </video>
//         {/* Gradient Overlay */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               "linear-gradient(to top, rgba(0, 0, 0, 0.99) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 55%)",
//           }}
//         />
//       </div>
//     </section>
//   );
// }

// /* ========================
//    Experience Card
// ======================== */
// function ExperienceCard({ exp }: any) {
//   return (
//     <div
//       className=" w-full h-full z-10"
//       // className="glass-container w-full h-full z-10"
//       // style={{
//       //   borderRadius: "20px",
//       //   background: "rgba(255, 255, 255, 0.1)",
//       //   backdropFilter: "blur(24px)",
//       //   border: "1px solid rgba(255, 255, 255, 0.6)",
//       //   boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 255, 255, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.05)",
//       // }}
//     >
//       {/* <div className="glass-filter" />
//       <div className="glass-overlay" />
//       <div className="glass-specular" /> */}

//       {/* <div className="glass-content flex flex-col h-full p-12 gap-8"> */}
//       <div className=" flex flex-col h-full p-12 gap-8">
//         {/* Header Section */}
//         <div className="flex items-center gap-6 pb-6 border-b border-white/20">
//           {exp.logo && (
//             <div className="flex-shrink-0">
//               <Image
//                 src={exp.logo}
//                 alt={exp.company}
//                 width={80}
//                 height={80}
//                 className="rounded-xl shadow-lg"
//               />
//             </div>
//           )}
//           <div className="flex-1">
//             <h3 className="text-5xl font-bold text-white mb-3 tracking-tight leading-tight">
//               {exp.company}
//             </h3>
//             <p className="text-2xl text-white/95 font-medium">
//               {exp.role}
//             </p>
//           </div>
//         </div>

//         {/* Duration */}
//         <div className="flex items-center gap-3">
//           <div className="w-1.5 h-8 bg-gradient-to-b from-white to-white/50 rounded-full" />
//           <p className="text-xl text-white/90 font-medium tracking-wide">
//             {exp.duration}
//           </p>
//         </div>

//         {/* Description Section */}
//         <div className="flex-1 flex flex-col gap-4 ">
//           <h4 className="text-lg text-white/80 font-semibold uppercase tracking-wider mb-2">
//             Key Achievements
//           </h4>
//           <ul className="space-y-4">
//             {exp.description.map((d: string, i: number) => (
//               <li key={i} className="flex items-start gap-4">
//                 <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-white shadow-lg shadow-white/50" />
//                 <span className="text-xl text-white/95 leading-relaxed font-normal">
//                   {d}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Technologies Section */}
//         <div className="pt-6 border-t border-white/20">
//           <h4 className="text-lg text-white/80 font-semibold uppercase tracking-wider mb-4">
//             Technologies
//           </h4>
//           <div className="flex flex-wrap gap-3">
//             {exp.technologies.map((tech: string) => (
//               <span
//                 key={tech}
//                 className="px-5 py-2.5 rounded-xl bg-white/15 text-base text-white font-medium hover:bg-white/25 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { EXPERIENCES } from "@/constants/experience";
import { useMotionValue, useSpring } from "framer-motion";

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

  const rawScrollDelta = useMotionValue(0);

// Amplify movement
const amplified = useSpring(rawScrollDelta, {
  stiffness: 220,
  damping: 28,
  mass: 0.4,
});

  /**
   * Map vertical scroll → index
   * This keeps your animation logic unchanged
   */
  const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 260,
  damping: 30,
  mass: 0.6,
});
useEffect(() => {
  const unsubscribe = smoothProgress.on("change", (v) => {
    const delta = v - scrollYProgress.get();

    // Amplify scroll input
    rawScrollDelta.set(delta * 6); // 🔥 multiplier

    const index = Math.min(
      total - 1,
      Math.max(0, Math.round(v * (total - 1)))
    );

    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    }
  });

  return () => unsubscribe();
}, [smoothProgress, currentIndex, total]);




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
      duration: 0.45,   // ⬅ faster
      ease: [0.22, 1, 0.36, 1], // snappier
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
  className="relative w-full"
  style={{ height: `${EXPERIENCES.length * 100}vh` }}
>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center z-30">

        {/* Experience Display */}
        <div className="relative mt-8 w-[80vw] h-[80vh] mx-auto z-10 flex justify-center items-center">
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
              <ExperienceCard exp={EXPERIENCES[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className="relative z-10 flex justify-center items-center gap-3 mt-12">
          {EXPERIENCES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-12 bg-white shadow-lg shadow-white/50"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="relative z-10 flex justify-center mt-8">
          <p className="text-white/70 text-base font-medium tracking-wide">
            {currentIndex === 0 && "Scroll down to see more experiences"}
            {currentIndex > 0 && currentIndex < total - 1 &&
              `Experience ${currentIndex + 1} of ${total}`}
            {currentIndex === total - 1 && "Scroll down to continue"}
          </p>
        </div>

        {/* Background Video (UNCHANGED) */}
        <div className="absolute mt-28 top-[700px] left-0 w-full z-[0] overflow-hidden">
          <video
            autoPlay
            muted
            loop
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

/* ========================
   Experience Card
======================== */
function ExperienceCard({ exp }: any) {
  return (
    <div
      className=" w-full h-full z-10"
      // className="glass-container w-full h-full z-10"
      // style={{
      //   borderRadius: "20px",
      //   background: "rgba(255, 255, 255, 0.1)",
      //   backdropFilter: "blur(24px)",
      //   border: "1px solid rgba(255, 255, 255, 0.6)",
      //   boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 255, 255, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.05)",
      // }}
    >
      {/* <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-specular" /> */}

      {/* <div className="glass-content flex flex-col h-full p-12 gap-8"> */}
      <div className=" flex flex-col h-full p-12 gap-8">
        {/* Header Section */}
        <div className="flex items-center gap-6 pb-6 border-b border-white/20">
          {exp.logo && (
            <div className="flex-shrink-0">
              <Image
                src={exp.logo}
                alt={exp.company}
                width={80}
                height={80}
                className="rounded-xl shadow-lg"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-5xl font-bold text-white mb-3 tracking-tight leading-tight">
              {exp.company}
            </h3>
            <p className="text-2xl text-white/95 font-medium">
              {exp.role}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-gradient-to-b from-white to-white/50 rounded-full" />
          <p className="text-xl text-white/90 font-medium tracking-wide">
            {exp.duration}
          </p>
        </div>

        {/* Description Section */}
        <div className="flex-1 flex flex-col gap-4 ">
          <h4 className="text-lg text-white/80 font-semibold uppercase tracking-wider mb-2">
            Key Achievements
          </h4>
          <ul className="space-y-4">
            {exp.description.map((d: string, i: number) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-white shadow-lg shadow-white/50" />
                <span className="text-xl text-white/95 leading-relaxed font-normal">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Section */}
        <div className="pt-6 border-t border-white/20">
          <h4 className="text-lg text-white/80 font-semibold uppercase tracking-wider mb-4">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-3">
            {exp.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-xl bg-white/15 text-base text-white font-medium hover:bg-white/25 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


