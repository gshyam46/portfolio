"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/constants/projects";
import { ProjectModal } from "../ui/ProjectModal";

const INITIAL_COUNT = 3;

export default function ProjectsMobile() {
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const lastFocusedRef = useRef<HTMLDivElement | null>(null);

  const visibleProjects = showAll
    ? PROJECTS
    : PROJECTS.slice(0, INITIAL_COUNT);

  const hasMore = PROJECTS.length > INITIAL_COUNT;

  const openProject = (project: any, el?: HTMLDivElement | null) => {
    if (el) lastFocusedRef.current = el;
    setActiveProject(project);
  };

  const closeProject = () => {
    setActiveProject(null);
  };

  return (
    <section className="w-full mt-20 px-4 py-6 overflow-hidden">
      {/* Heading */}
      <div className="mb-6 flex justify-center">
        <div className="w-[80%] rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <h2 className="text-center text-[16px] font-semibold text-white px-4 py-2">
            PROJECTS
          </h2>
        </div>
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-5 max-w-sm mx-auto">
        {visibleProjects.map((project: any, index: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
            onClick={(e) => openProject(project, e.currentTarget as HTMLDivElement)}
            className="
              bg-white/5 border border-white/10 rounded-xl p-4
              cursor-pointer
              active:scale-[0.98]
              transition-transform
            "
          >
            {/* Header */}
            <div className="flex items-start gap-3">
              {project.images?.[0] && (
                <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-white/10 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-medium text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-[12px] text-white/60 leading-relaxed line-clamp-2 mt-1">
                  {project.summary}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            {project.tech && (
              <div className="mt-3 flex flex-wrap gap-1">
                {project.tech.slice(0, 4).map((tech: string) => (
                  <span
                    key={tech}
                    className="text-[9px] uppercase tracking-wide px-2 py-0.5 rounded bg-white/10 text-white/50"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-[9px] text-white/40">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Subtle affordance */}
            <p className="mt-3 text-[10px] text-white/40 tracking-wide uppercase">
              Tap to view details
            </p>
          </motion.div>
        ))}
      </div>

      {/* View More / Less */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 text-[12px] text-white/70 hover:text-white
              bg-white/5 hover:bg-white/10 rounded-xl
              border border-white/10
              transition-all
              min-w-[44px] min-h-[44px]"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}

      {/* Project Modal (Shared with Desktop) */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={closeProject}
            previousFocusRef={lastFocusedRef}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
