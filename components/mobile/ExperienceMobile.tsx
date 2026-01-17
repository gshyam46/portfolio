import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { EXPERIENCES } from "@/constants/experience";

export default function ExperienceMobile() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const next = () => {
        if (currentIndex < EXPERIENCES.length - 1) {
            setDirection(1);
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Handle swipe gestures
    const handleDragEnd = (_: any, info: PanInfo) => {
        const threshold = 50;
        const velocity = info.velocity.x;
        const offset = info.offset.x;

        // Swipe right (previous)
        if (offset > threshold || velocity > 500) {
            prev();
        }
        // Swipe left (next)  
        else if (offset < -threshold || velocity < -500) {
            next();
        }
    };

    // Mobile animation variants - subtle motion as per requirements
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 40 : -40,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -40 : 40,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        }),
    };

    const currentExp = EXPERIENCES[currentIndex];

    return (
        <section className="w-full px-4 py-12 flex flex-col items-center bg-black/20 touch-pan-y overflow-hidden">
            {/* Glass Heading */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />
                <h2 className="relative text-[16px] font-semibold text-white px-4 py-2">
                    Experience
                </h2>
            </div>

            <div className="relative w-full max-w-sm min-h-[400px]">
                <AnimatePresence mode="wait" custom={direction}>
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
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 cursor-grab active:cursor-grabbing"
                    >
                        <div>
                            <h3 className="text-[18px] font-bold text-white mb-1">{currentExp.role}</h3>
                            <div className="text-[14px] text-purple-300 font-medium mb-1">{currentExp.company}</div>
                            <div className="text-[12px] text-white/50">{currentExp.duration}</div>
                        </div>

                        <div className="h-[1px] bg-white/10 w-full" />

                        <ul className="flex flex-col gap-2">
                            {currentExp.description.map((desc: string, i: number) => (
                                <li key={i} className="text-[13px] text-white/70 leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-purple-400">
                                    {desc}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {currentExp.technologies.map((skill: string) => (
                                <span key={skill} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/10 text-white/60">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6 w-full px-2">
                    <button
                        onClick={prev}
                        disabled={currentIndex === 0}
                        className={`p-3 rounded-full border border-white/20 bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                            currentIndex === 0 ? 'opacity-30' : 'active:bg-white/20'
                        }`}
                        aria-label="Previous experience"
                    >
                        <ChevronLeftIcon className="w-5 h-5 text-white" />
                    </button>

                    {/* Progress dots */}
                    <div className="flex gap-1.5">
                        {EXPERIENCES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${
                                    idx === currentIndex ? 'w-3 h-3' : 'w-1.5 h-1.5'
                                }`}
                                aria-label={`Go to experience ${idx + 1}`}
                            >
                                <div
                                    className={`rounded-full transition-all ${
                                        idx === currentIndex ? 'bg-purple-400 w-3 h-1.5' : 'bg-white/20 w-1.5 h-1.5'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={next}
                        disabled={currentIndex === EXPERIENCES.length - 1}
                        className={`p-3 rounded-full border border-white/20 bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                            currentIndex === EXPERIENCES.length - 1 ? 'opacity-30' : 'active:bg-white/20'
                        }`}
                        aria-label="Next experience"
                    >
                        <ChevronRightIcon className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Swipe hint */}
                <div className="text-center mt-4">
                    <p className="text-[12px] text-white/50">
                        Swipe or tap arrows to navigate
                    </p>
                </div>
            </div>
        </section>
    );
}
