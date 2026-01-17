"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useMotionValue, useSpring } from "framer-motion";
import { EXPERIENCES } from "@/constants/experience";


export default function Experience() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const total = EXPERIENCES.length;
    const [dragStart, setDragStart] = useState(0);

    // Scroll progress tied to section for subtle animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 260,
        damping: 30,
        mass: 0.6,
    });

    const handleNext = () => {
        if (currentIndex < total - 1) {
            setDirection(1);
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleDragEnd = (e: any, info: any) => {
        const threshold = 50;
        if (info.offset.x > threshold) {
            handlePrev();
        } else if (info.offset.x < -threshold) {
            handleNext();
        }
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Subtle floating animation
    const floatY = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        [0, -10, 0]
    );

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative w-full min-h-screen"
        >
            <div className="relative top-0 h-screen flex flex-col justify-center z-30 px-4 md:px-0">
                {/* Experience Display */}
                <div className="relative mt-4 md:mt-8 w-full md:w-[80vw] h-[70vh] md:h-[80vh] mx-auto z-10 flex justify-center items-center">

                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`absolute left-0 md:-left-12 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100`}
                        aria-label="Previous experience"
                    >
                        <svg
                            className="w-6 h-6 md:w-8 md:h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === total - 1}
                        className={`absolute right-0 md:-right-12 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100`}
                        aria-label="Next experience"
                    >
                        <svg
                            className="w-6 h-6 md:w-8 md:h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    {/* Cards Container */}
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            className="w-full h-full flex justify-center items-center cursor-grab active:cursor-grabbing"
                            style={{ y: floatY }}
                        >
                            <ExperienceCard
                                exp={EXPERIENCES[currentIndex]}
                                scrollProgress={smoothProgress}
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
                            className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${idx === currentIndex
                                ? "w-8 md:w-12 bg-white shadow-lg shadow-white/50"
                                : "w-1.5 md:w-2 bg-white/40 hover:bg-white/70"
                                }`}
                        />
                    ))}
                </div>

                {/* Navigation Hint */}
                <div className="relative z-10 flex justify-center mt-4 md:mt-8">
                    <p className="text-white/70 text-sm md:text-base font-medium tracking-wide text-center px-4">
                        {currentIndex === 0 && "Swipe or click arrows to navigate"}
                        {currentIndex > 0 && currentIndex < total - 1 &&
                            `Experience ${currentIndex + 1} of ${total}`}
                        {currentIndex === total - 1 && "Last experience"}
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

function ExperienceCard({ exp, scrollProgress }: any) {
    return (
        <motion.div
            className="w-full h-full flex flex-col p-4 md:p-12 gap-4 md:gap-8 overflow-y-auto md:overflow-visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
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