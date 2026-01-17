"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import GlassHeading from "./ui/GlassHeading";
import ProjectMotionCard from "./ui/ProjectMotionCard";
import ProjectCard from "./ui/ProjectCard";
import { PROJECTS } from "@/constants/projects";
import { ProjectModal } from "./ui/ProjectModal";

export default function ProjectsDesktop() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [showAll, setShowAll] = useState(false);
    const [activeProject, setActiveProject] = useState<any>(null);
    const lastFocusedRef = useRef<HTMLDivElement | null>(null);

    const openProject = (project: any, el?: HTMLDivElement | null) => {
        if (el) lastFocusedRef.current = el;
        setActiveProject(project);
    };

    const closeProject = () => {
        setActiveProject(null);
    };

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const progress = useTransform(scrollYProgress, [0.2, 0.45], [0, 1], {
        clamp: true,
    });

    const inView = useInView(sectionRef, { once: false, amount: 0.1 });

    // Deck logic
    const mainCards = PROJECTS.slice(0, 3);
    const extraCards = PROJECTS.slice(3);

    // Calculate deck positions
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
        <section ref={sectionRef} className="relative w-full z-30">
            <div className="flex w-full mt-16 sm:mt-20 md:mt-32 justify-center mb-5">
                <GlassHeading
                    text="Projects"
                    width="w-[100%]"
                    position="center"
                    fontSize="2.2rem"
                    height="h-[60px]"
                />
            </div>

            {/* MAIN 3 PROJECTS */}
            <div className="relative min-h-[400px] sm:min-h-[480px] md:min-h-[560px] w-full flex justify-center px-4 sm:px-0">
                {mainCards.map((project, i) => (
                    <ProjectMotionCard
                        key={project.id}
                        project={project}
                        index={i}
                        progress={progress}
                        deck={deck}
                        grid={grid}
                        inView={inView}
                        onClick={() => openProject(project)}
                    />
                ))}
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
                        className="w-full px-4 sm:px-6"
                    >
                        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
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
                                    <ProjectCard
                                        project={project}
                                        onClick={(e: any) => openProject(project, e.currentTarget)}
                                        onReadMore={() => openProject(project)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* GLOBAL MODAL FOR ALL PROJECTS */}
            <AnimatePresence>
                {activeProject && (
                    <ProjectModal
                        project={activeProject}
                        onClose={closeProject}
                        previousFocusRef={lastFocusedRef}
                    />
                )}
            </AnimatePresence>

            {/* VIEW MORE BUTTON */}

            <div className=" relative flex justify-center mt-8 sm:mt-12 ">
                <div className="flex items-center gap-4 sm:gap-6 w-full max-w-md px-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/30 z-30" />
                    <button
                        onClick={handleToggle}
                        className="px-4 sm:px-6 py-2 text-xs sm:text-sm text-white/60 hover:text-white
                     bg-transparent hover:bg-white/5 rounded
                     transition-all duration-300"
                    >
                        {showAll ? "View less" : "View more"}
                    </button>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/30 z-30" />
                </div>
            </div>
        </section>
    );
}
