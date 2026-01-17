import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// TODO: Import this from constants once available, temporarily mocking or props
// Assuming Experience component passes data or we import it.
// Checking Experience.tsx for data source... it seems to take no props and probably has internal data or import.
// I will check Experience.tsx to see where data comes from. 
// For now, I'll assume I need to export data from somewhere or import it.
// Let's assume there is a constants/experience.ts or similar. 
// I will start by just scaffolding the UI and import path, assuming "EXPERIENCE" constant.

// Temporarily importing interface or defining it
interface ExperienceData {
    company: string;
    role: string;
    period: string;
    description: string[];
    skills: string[];
}

import { EXPERIENCES } from "@/constants/experience";

export default function ExperienceMobile() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        if (currentIndex < EXPERIENCES.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentExp = EXPERIENCES[currentIndex];

    return (
        <section className="w-full px-4 py-12 flex flex-col items-center bg-black/20 touch-pan-y">
            <h2 className="text-[20px] font-semibold text-white mb-6">Experience</h2>

            <div className="relative w-full max-w-sm min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
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
                        className={`p-2 rounded-full border border-white/20 bg-white/5 transition-colors ${currentIndex === 0 ? 'opacity-30' : 'active:bg-white/20'}`}
                    >
                        <ChevronLeftIcon className="w-5 h-5 text-white" />
                    </button>

                    <div className="flex gap-1.5">
                        {EXPERIENCES.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-purple-400 w-3' : 'bg-white/20'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        disabled={currentIndex === EXPERIENCES.length - 1}
                        className={`p-2 rounded-full border border-white/20 bg-white/5 transition-colors ${currentIndex === EXPERIENCES.length - 1 ? 'opacity-30' : 'active:bg-white/20'}`}
                    >
                        <ChevronRightIcon className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </section>
    );
}
