// "use client";

// import { useRef, useState, useEffect } from "react";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import { EXPERIENCES } from "@/constants/experience";
// import { useMotionValue, useSpring, useVelocity } from "framer-motion";

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

//   // Track scroll velocity for momentum-aware transitions
//   const scrollVelocity = useVelocity(scrollYProgress);
//   const smoothVelocity = useSpring(scrollVelocity, {
//     stiffness: 150,
//     damping: 30,
//   });

//   // Amplified scroll delta for immediate feedback
//   const rawScrollDelta = useMotionValue(0);
//   const amplified = useSpring(rawScrollDelta, {
//     stiffness: 160,
//     damping: 30,
//     mass: 0.6,
//   });

//   // Smooth progress with velocity-aware damping
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 280,
//     damping: 35,
//     mass: 0.5,
//   });

//   // Track inter-card progress (0-1 between cards)
//   const interCardProgress = useMotionValue(0);
//   const smoothInterCard = useSpring(interCardProgress, {
//     stiffness: 200,
//     damping: 35,
//     mass: 0.7,
//   });

//   // Velocity-aware damping for smooth return
//   const velocityFactor = useTransform(
//     smoothVelocity,
//     [-0.5, 0, 0.5],
//     [1.5, 1, 1.5]
//   );

//   // Enhanced wheel event with velocity-aware multiplier
//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     let lastWheelTime = Date.now();
//     let accumulatedDelta = 0;

//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();
      
//       const now = Date.now();
//       const timeDelta = now - lastWheelTime;
//       lastWheelTime = now;

//       // Calculate velocity-aware multiplier
//       // Fast scrolling = higher multiplier (up to 5x)
//       // Slow scrolling = lower multiplier (2x minimum)
//       const velocity = Math.abs(e.deltaY) / Math.max(timeDelta, 16);
//       const velocityMultiplier = Math.min(5, Math.max(2, 2 + velocity * 0.5));
      
//       accumulatedDelta += e.deltaY * velocityMultiplier;

//       // Throttle actual scroll updates
//       const scrollAmount = Math.sign(accumulatedDelta) * Math.min(Math.abs(accumulatedDelta), 120);
      
//       window.scrollBy({
//         top: scrollAmount,
//         behavior: "instant"
//       });

//       // Decay accumulated delta
//       accumulatedDelta *= 0.7;
//     };

//     section.addEventListener("wheel", handleWheel, { passive: false });
//     return () => section.removeEventListener("wheel", handleWheel);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = smoothProgress.on("change", (v) => {
//       const prevScroll = scrollYProgress.get();
//       const delta = v - prevScroll;

//       // Velocity-aware amplification with clamping
//       const velocity = Math.abs(scrollVelocity.get());
//       const dampingFactor = Math.min(1, 0.3 + velocity * 10);
//       rawScrollDelta.set(delta * 6 * dampingFactor);

//       // Calculate exact position including fractional part
//       const exactPosition = v * (total - 1);
//       const newIndex = Math.min(
//         total - 1,
//         Math.max(0, Math.round(exactPosition))
//       );

//       // Calculate progress between current and next card (0-1)
//       // Use velocity to prevent bypassing during fast scrolls
//       const fraction = exactPosition - Math.floor(exactPosition);
//       const clampedFraction = velocity > 0.02 
//         ? Math.min(fraction, 0.85) // Cap during fast scrolls
//         : fraction;
      
//       interCardProgress.set(clampedFraction);

//       if (newIndex !== currentIndex) {
//         setDirection(newIndex > currentIndex ? 1 : -1);
//         setCurrentIndex(newIndex);
//       }
//     });

//     return () => unsubscribe();
//   }, [rawScrollDelta, scrollYProgress, smoothProgress, currentIndex, total, interCardProgress, scrollVelocity]);

//   // Smooth, elastic transforms for the transitioning effect
//   const cardX = useTransform(
//     smoothInterCard, 
//     [0, 0.4, 0.6, 1], 
//     [0, -60, -40, 0]
//   );
  
//   const cardOpacity = useTransform(
//     smoothInterCard, 
//     [0, 0.25, 0.75, 1], 
//     [1, 0.85, 0.85, 1]
//   );
  
//   const cardScale = useTransform(
//     smoothInterCard, 
//     [0, 0.5, 1], 
//     [1, 0.97, 1]
//   );
  
//   const cardRotateY = useTransform(
//     smoothInterCard, 
//     [0, 0.4, 0.6, 1], 
//     [0, -2, -1.5, 0]
//   );

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 1000 : -1000,
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
//         duration: 0.65,
//         ease: [0.16, 1.0, 0.3, 1.0], // Elastic-out feel
//         opacity: { duration: 0.45, ease: "easeOut" },
//         scale: { duration: 0.55, ease: [0.16, 1.0, 0.3, 1.0] },
//       },
//     },

//     exit: (direction: number) => ({
//       x: direction > 0 ? -1000 : 1000,
//       opacity: 0,
//       scale: 0.9,
//       rotateY: direction > 0 ? -12 : 12,
//       transition: {
//         duration: 0.5,
//         ease: [0.7, 0, 0.84, 0], // Ease-in for exit
//         opacity: { duration: 0.35 },
//         scale: { duration: 0.45 },
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
//       <div className="sticky top-0 h-screen flex flex-col justify-center z-30">

//         {/* Experience Display */}
//         <div className="relative mt-8 w-[80vw] h-[80vh] mx-auto z-10 flex justify-center items-center">
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
//               <motion.div
//                 className="w-full h-full"
//                 style={{
//                   // Continuous micro-movements during scroll
//                   x: useTransform(
//                     amplified,
//                     [-60, 0, 60],
//                     [-25, 0, 25]
//                   ),
//                   rotateY: useTransform(
//                     amplified,
//                     [-60, 0, 60],
//                     [-4, 0, 4]
//                   ),
//                   // Inter-card transition effects with smooth elasticity
//                   translateX: cardX,
//                   opacity: cardOpacity,
//                   scale: cardScale,
//                   rotateZ: cardRotateY,
//                 }}
//               >
//                 <ExperienceCard exp={EXPERIENCES[currentIndex]} />
//               </motion.div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Progress Indicator */}
//         <div className="relative z-10 flex justify-center items-center gap-3 mt-12">
//           {EXPERIENCES.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 const targetScroll = (idx / (total - 1)) * (sectionRef.current?.scrollHeight || 0);
//                 window.scrollTo({
//                   top: targetScroll,
//                   behavior: "smooth"
//                 });
//               }}
//               className={`h-2 rounded-full transition-all duration-500 ${
//                 idx === currentIndex
//                   ? "w-12 bg-white shadow-lg shadow-white/50"
//                   : "w-2 bg-white/40 hover:bg-white/70"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Scroll Hint with smooth fade */}
//         <motion.div 
//           className="relative z-10 flex justify-center mt-8"
//           style={{
//             opacity: useTransform(smoothInterCard, [0, 0.2, 0.8, 1], [1, 0.5, 0.5, 1])
//           }}
//         >
//           <p className="text-white/70 text-base font-medium tracking-wide">
//             {currentIndex === 0 && "Scroll down to see more experiences"}
//             {currentIndex > 0 && currentIndex < total - 1 &&
//               `Experience ${currentIndex + 1} of ${total}`}
//             {currentIndex === total - 1 && "Scroll down to continue"}
//           </p>
//         </motion.div>

//         {/* Background Video */}
//         <div className="absolute top-[700px] left-0 w-full z-[0] overflow-hidden">
//           <video
//             autoPlay
//             muted
//             loop
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
//    Experience Card
// ======================== */
// function ExperienceCard({ exp }: any) {
//   return (
//     <div className="w-full h-full z-10">
//       <div className="flex flex-col h-full p-12 gap-8">
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
//         <div className="flex-1 flex flex-col gap-4">
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

// "use client";

// import { useRef, useState, useEffect } from "react";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import { EXPERIENCES } from "@/constants/experience";
// import { useMotionValue, useSpring, useVelocity } from "framer-motion";

// export default function Experience() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const total = EXPERIENCES.length;

//   // Scroll progress tied to section
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   // Velocity tracking to prevent bypass
//   const scrollVelocity = useVelocity(scrollYProgress);
//   const lastScrollTime = useRef(Date.now());

//   // Amplified scroll delta for immediate feedback
//   const rawScrollDelta = useMotionValue(0);
//   const amplified = useSpring(rawScrollDelta, {
//     stiffness: 180,
//     damping: 25,
//     mass: 0.5,
//   });

//   // Smooth progress with velocity dampening
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 280,
//     damping: 40, // Increased dampening for momentum control
//     mass: 0.7,
//   });

//   // Track inter-card progress (0-1 between cards)
//   const interCardProgress = useMotionValue(0);
//   const smoothInterCard = useSpring(interCardProgress, {
//     stiffness: 220,
//     damping: 35,
//   });

//   // Enhanced wheel event with velocity-aware multiplier
//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     let scrollTimeout: NodeJS.Timeout;
//     let velocity = 0;

//     const handleWheel = (e: WheelEvent) => {
//       const now = Date.now();
//       const timeDelta = now - lastScrollTime.current;
//       lastScrollTime.current = now;

//       // Calculate velocity (pixels per ms)
//       velocity = Math.abs(e.deltaY) / Math.max(timeDelta, 1);

//       // Adaptive multiplier based on velocity
//       // Fast scrolls get lower multiplier to prevent bypass
//       // Slow scrolls get higher multiplier for responsive feel
//       const baseMultiplier = 3.5;
//       const velocityFactor = Math.max(0.4, 1 - (velocity / 10));
//       const adaptiveMultiplier = baseMultiplier * velocityFactor;

//       const amplifiedDelta = e.deltaY * adaptiveMultiplier;
      
//       window.scrollBy({
//         top: amplifiedDelta,
//         behavior: "instant"
//       });

//       // Clear existing timeout
//       clearTimeout(scrollTimeout);
      
//       // Reset velocity after scrolling stops
//       scrollTimeout = setTimeout(() => {
//         velocity = 0;
//       }, 100);
//     };

//     section.addEventListener("wheel", handleWheel, { passive: false });
//     return () => {
//       section.removeEventListener("wheel", handleWheel);
//       clearTimeout(scrollTimeout);
//     };
//   }, []);

//   useEffect(() => {
//     const unsubscribe = smoothProgress.on("change", (v) => {
//       const prevScroll = scrollYProgress.get();
//       const delta = v - prevScroll;

//       // Amplify for visual feedback
//       rawScrollDelta.set(delta * 8);

//       // Calculate exact position including fractional part
//       const exactPosition = v * (total - 1);
//       const newIndex = Math.min(
//         total - 1,
//         Math.max(0, Math.round(exactPosition))
//       );

//       // Calculate progress between current and next card (0-1)
//       const fraction = exactPosition - Math.floor(exactPosition);
      
//       // Only update inter-card progress if not transitioning
//       if (!isTransitioning) {
//         interCardProgress.set(fraction);
//       }

//       if (newIndex !== currentIndex) {
//         setIsTransitioning(true);
//         setDirection(newIndex > currentIndex ? 1 : -1);
//         setCurrentIndex(newIndex);
        
//         // Reset transitioning state after animation
//         setTimeout(() => {
//           setIsTransitioning(false);
//         }, 600);
//       }
//     });

//     return () => unsubscribe();
//   }, [rawScrollDelta, scrollYProgress, smoothProgress, currentIndex, total, interCardProgress, isTransitioning]);

//   // Create transforms for the transitioning effect with smoother easing
//   const cardX = useTransform(smoothInterCard, [0, 0.5, 1], [0, -60, 0]);
//   const cardOpacity = useTransform(smoothInterCard, [0, 0.4, 0.6, 1], [1, 0.85, 0.85, 1]);
//   const cardScale = useTransform(smoothInterCard, [0, 0.5, 1], [1, 0.98, 1]);
//   const cardRotateY = useTransform(smoothInterCard, [0, 0.5, 1], [0, -2, 0]);

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 900 : -900,
//       opacity: 0,
//       scale: 0.92,
//       rotateY: direction > 0 ? 12 : -12,
//     }),

//     center: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//       rotateY: 0,
//       transition: {
//         duration: 0.6,
//         ease: [0.25, 0.46, 0.45, 0.94], // Smoother ease-out
//         opacity: { duration: 0.45, ease: "easeOut" },
//         scale: { duration: 0.45, ease: "easeOut" },
//       },
//     },

//     exit: (direction: number) => ({
//       x: direction > 0 ? -900 : 900,
//       opacity: 0,
//       scale: 0.92,
//       rotateY: direction > 0 ? -12 : 12,
//       transition: {
//         duration: 0.6,
//         ease: [0.55, 0.085, 0.68, 0.53], // Smoother ease-in
//         opacity: { duration: 0.45, ease: "easeIn" },
//         scale: { duration: 0.45, ease: "easeIn" },
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

//         {/* Experience Display */}
//         <div className="relative mt-4 md:mt-8 w-full md:w-[85vw] lg:w-[80vw] h-[85vh] md:h-[80vh] mx-auto z-10 flex justify-center items-center">
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
//                 // Apply continuous transforms during scroll
//                 x: useTransform(
//                   amplified,
//                   [-80, 80],
//                   [-30, 30]
//                 ),
//                 rotateY: useTransform(
//                   amplified,
//                   [-80, 80],
//                   [-4, 4]
//                 ),
//               }}
//             >
//               <motion.div
//                 className="w-full h-full"
//                 style={{
//                   // Inter-card transition effects
//                   x: cardX,
//                   opacity: cardOpacity,
//                   scale: cardScale,
//                   rotateY: cardRotateY,
//                 }}
//               >
//                 <ExperienceCard exp={EXPERIENCES[currentIndex]} />
//               </motion.div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Progress Indicator */}
//         <div className="relative z-10 flex justify-center items-center gap-2 md:gap-3 mt-6 md:mt-12">
//           {EXPERIENCES.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 const targetScroll = (idx / (total - 1)) * (sectionRef.current?.scrollHeight || 0);
//                 window.scrollTo({
//                   top: targetScroll,
//                   behavior: "smooth"
//                 });
//               }}
//               className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
//                 idx === currentIndex
//                   ? "w-8 md:w-12 bg-white shadow-lg shadow-white/50"
//                   : "w-1.5 md:w-2 bg-white/40 hover:bg-white/70"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Scroll Hint with fade effect */}
//         <motion.div 
//           className="relative z-10 flex justify-center mt-4 md:mt-8 px-4"
//           style={{
//             opacity: useTransform(smoothInterCard, [0, 0.3], [1, 0.4])
//           }}
//         >
//           <p className="text-white/70 text-sm md:text-base font-medium tracking-wide text-center">
//             {currentIndex === 0 && "Scroll down to see more experiences"}
//             {currentIndex > 0 && currentIndex < total - 1 &&
//               `Experience ${currentIndex + 1} of ${total}`}
//             {currentIndex === total - 1 && "Scroll down to continue"}
//           </p>
//         </motion.div>

//         {/* Background Video */}
//         <div className="absolute top-[500px] md:top-[700px] left-0 w-full z-[0] overflow-hidden">
//           <video
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
//    Experience Card
// ======================== */
// function ExperienceCard({ exp }: any) {
//   return (
//     <div className="w-full h-full z-10 overflow-y-auto md:overflow-y-visible">
//       <div className="flex flex-col h-full p-4 md:p-8 lg:p-12 gap-4 md:gap-6 lg:gap-8">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 pb-4 md:pb-6 border-b border-white/20">
//           {exp.logo && (
//             <div className="flex-shrink-0">
//               <Image
//                 src={exp.logo}
//                 alt={exp.company}
//                 width={60}
//                 height={60}
//                 className="rounded-xl shadow-lg md:w-20 md:h-20"
//               />
//             </div>
//           )}
//           <div className="flex-1">
//             <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-3 tracking-tight leading-tight">
//               {exp.company}
//             </h3>
//             <p className="text-lg md:text-xl lg:text-2xl text-white/95 font-medium">
//               {exp.role}
//             </p>
//           </div>
//         </div>

//         {/* Duration */}
//         <div className="flex items-center gap-2 md:gap-3">
//           <div className="w-1 md:w-1.5 h-6 md:h-8 bg-gradient-to-b from-white to-white/50 rounded-full" />
//           <p className="text-base md:text-lg lg:text-xl text-white/90 font-medium tracking-wide">
//             {exp.duration}
//           </p>
//         </div>

//         {/* Description Section */}
//         <div className="flex-1 flex flex-col gap-3 md:gap-4">
//           <h4 className="text-sm md:text-base lg:text-lg text-white/80 font-semibold uppercase tracking-wider mb-1 md:mb-2">
//             Key Achievements
//           </h4>
//           <ul className="space-y-2 md:space-y-3 lg:space-y-4">
//             {exp.description.map((d: string, i: number) => (
//               <li key={i} className="flex items-start gap-2 md:gap-4">
//                 <span className="flex-shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 mt-1.5 md:mt-2.5 rounded-full bg-white shadow-lg shadow-white/50" />
//                 <span className="text-sm md:text-lg lg:text-xl text-white/95 leading-relaxed font-normal">
//                   {d}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Technologies Section */}
//         <div className="pt-4 md:pt-6 border-t border-white/20">
//           <h4 className="text-sm md:text-base lg:text-lg text-white/80 font-semibold uppercase tracking-wider mb-2 md:mb-4">
//             Technologies
//           </h4>
//           <div className="flex flex-wrap gap-2 md:gap-3">
//             {exp.technologies.map((tech: string) => (
//               <span
//                 key={tech}
//                 className="px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-lg md:rounded-xl bg-white/15 text-xs md:text-sm lg:text-base text-white font-medium hover:bg-white/25 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20"
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