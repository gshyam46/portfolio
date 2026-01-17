"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function ProjectModal({ project, onClose, previousFocusRef }: any) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const prevFocus = previousFocusRef?.current;

    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      prevFocus?.focus();
    };
  }, [project, onClose, previousFocusRef]);

  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"  // CHANGE z-50 to z-[100]
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="relative glass-card w-full max-w-5xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button - Top Right */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                     border border-white/20 flex items-center justify-center transition-all duration-300 
                     hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="glass-content overflow-y-auto max-h-[90vh] p-6 md:p-8">
          {/* Project Images */}
          {project.images?.length > 0 && (
            <div className="flex gap-4 overflow-x-auto mb-6 pb-2">
              {project.images?.length > 0 && (
                <div className="mb-6">  {/* REMOVE flex gap-4 overflow-x-auto */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((src: string, i: number) => (
                      <div key={i} className="rounded-lg overflow-hidden">
                        <img
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Project Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {project.title}
          </h2>

          {/* Project Summary */}
          {project.summary && (
            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              {project.summary}
            </p>
          )}

          {/* Project Description */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-semibold text-white/90 mb-3">
              About This Project
            </h3>
            <p className="text-white/70 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          {project.tech && project.tech.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white/90 mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                             text-white/90 text-sm font-medium hover:bg-white/15 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.github || project.demo) && (
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/20">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 
                           border border-white/20 text-white font-medium 
                           transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 
                           border border-white/20 text-white font-medium 
                           transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
