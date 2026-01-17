import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/constants/projects";

export default function ProjectsMobile() {
    const [showAll, setShowAll] = useState(false);
    
    // Show only 3 projects initially as per requirements
    const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);
    const hasMore = PROJECTS.length > 3;

    return (
        <section className="w-full px-4 py-6 overflow-hidden">
            {/* Glass Heading */}
            <div className="relative mb-6 flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />
                    <h2 className="relative text-[16px] font-semibold text-white px-4 py-2">
                        Projects
                    </h2>
                </div>
            </div>

            <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <AnimatePresence>
                    {visibleProjects.map((project: any, index: number) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 active:scale-95 transition-transform"
                        >
                            {/* Project Header */}
                            <div className="flex gap-3 mb-3">
                                {project.images?.[0] && (
                                    <div className="w-16 h-16 flex-shrink-0 relative overflow-hidden rounded-lg bg-white/10">
                                        <img
                                            src={project.images[0]}
                                            alt={project.title}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col justify-center min-w-0 flex-1">
                                    <h3 className="text-[14px] font-semibold text-white mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-[12px] text-white/60 line-clamp-2 leading-relaxed">
                                        {project.summary}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Technologies */}
                            {project.technologies && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {project.technologies.slice(0, 4).map((tech: string) => (
                                        <span 
                                            key={tech} 
                                            className="text-[9px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/10 text-white/60 border border-white/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span className="text-[9px] text-white/40 px-2 py-1">
                                            +{project.technologies.length - 4} more
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Links */}
                            {(project.liveUrl || project.githubUrl) && (
                                <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[11px] px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors min-w-[44px] min-h-[32px] flex items-center justify-center"
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[11px] px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors min-w-[44px] min-h-[32px] flex items-center justify-center"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* View More Button */}
                {hasMore && (
                    <motion.div 
                        className="flex justify-center mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-3 text-[12px] text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        >
                            {showAll ? "View Less" : "View More"}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
