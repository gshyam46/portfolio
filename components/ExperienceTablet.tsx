"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { EXPERIENCES } from "@/constants/experience";

export default function ExperienceTablet() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const total = EXPERIENCES.length;

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

    // Tablet-specific animation variants - reduced motion distances
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 60 : -60, // Reduced from desktop's 1000px
            opacity: 0,
            scale: 0.98, // Subtle scale
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.45, // Tablet-specific duration
                ease: [0.22, 1, 0.36, 1],
            },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -60 : 60, // Reduced from desktop's 1000px
            opacity: 0,
            scale: 0.98,
            transition: {
                duration: 0.45, // Tablet-specific duration
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Subtle floating animation
    const floatY = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        [0, -5, 0] // Reduced from desktop's -10
    );

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative w-full min-h-screen"
        >
            <div className="relative top-0 h-screen flex flex-col justify-center z-30 px-6">
                {/* Glass Heading */}
                <div className="relative mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />
                        <h2 className="relative text-3xl font-semibold text-white px-8 py-4">
                            Experience
                        </h2>
                    </div>
                </div>

                {/* Experience Display */}
                <div className="relative mt-4 w-full h-[70vh] mx-auto z-10 flex justify-center items-center">

                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`absolute left-4 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[44px] min-h-[44px]`}
                        aria-label="Previous experience"
                    >
                        <svg
                            className="w-7 h-7 text-white"
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
                        className={`absolute right-4 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[44px] min-h-[44px]`}
                        aria-label="Next experience"
                    >
                        <svg
                            className="w-7 h-7 text-white"
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
                            className="w-full h-full flex justify-center items-center cursor-grab active:cursor-grabbing px-20"
                            style={{ y: floatY }}
                        >
                            <ExperienceCardTablet
                                exp={EXPERIENCES[currentIndex]}
                                scrollProgress={smoothProgress}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Indicator */}
                <div className="relative z-10 flex justify-center items-center gap-3 mt-6">
                    {EXPERIENCES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-2 rounded-full transition-all duration-500 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                                idx === currentIndex
                                    ? "w-10 bg-white shadow-lg shadow-white/50"
                                    : "w-2 bg-white/40 hover:bg-white/70"
                            }`}
                        >
                            <div className={`h-2 rounded-full ${
                                idx === currentIndex
                                    ? "w-10 bg-white shadow-lg shadow-white/50"
                                    : "w-2 bg-white/40"
                            }`} />
                        </button>
                    ))}
                </div>

                {/* Navigation Hint */}
                <div className="relative z-10 flex justify-center mt-6">
                    <p className="text-white/70 text-base font-medium tracking-wide text-center px-4">
                        {currentIndex === 0 && "Swipe or click arrows to navigate"}
                        {currentIndex > 0 && currentIndex < total - 1 &&
                            `Experience ${currentIndex + 1} of ${total}`}
                        {currentIndex === total - 1 && "Last experience"}
                    </p>
                </div>

                {/* Background Video */}
                <div className="absolute top-[600px] left-0 w-full z-[0] overflow-hidden">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="inset-0 w-full h-full object-cover scale-[1.2]"
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

function ExperienceCardTablet({ exp, scrollProgress }: any) {
    return (
        <motion.div
            className="w-full h-full flex flex-col p-8 gap-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header Section */}
            <div className="flex flex-row items-center gap-6 pb-6 border-b border-white/20">
                {exp.logo && (
                    <div className="flex-shrink-0">
                        <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-16 h-16 rounded-xl shadow-lg"
                        />
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight leading-tight">
                        {exp.company}
                    </h3>
                    <p className="text-xl text-white/95 font-medium">
                        {exp.role}
                    </p>
                </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-7 bg-gradient-to-b from-white to-white/50 rounded-full" />
                <p className="text-lg text-white/90 font-medium tracking-wide">
                    {exp.duration}
                </p>
            </div>

            {/* Description Section */}
            <div className="flex-1 flex flex-col gap-4">
                <h4 className="text-base text-white/80 font-semibold uppercase tracking-wider mb-2">
                    Key Achievements
                </h4>
                <ul className="space-y-3">
                    {exp.description.map((d: string, i: number) => (
                        <motion.li
                            key={i}
                            className="flex items-start gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-white shadow-lg shadow-white/50" />
                            <span className="text-base text-white/95 leading-relaxed font-normal">
                                {d}
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Technologies Section */}
            <div className="pt-6 border-t border-white/20">
                <h4 className="text-base text-white/80 font-semibold uppercase tracking-wider mb-4">
                    Technologies
                </h4>
                <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech: string, i: number) => (
                        <motion.span
                            key={tech}
                            className="px-4 py-2 rounded-xl bg-white/15 text-sm text-white font-medium hover:bg-white/25 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20"
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