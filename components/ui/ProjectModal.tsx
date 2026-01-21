"use client";

import { useEffect, useRef,useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="
          relative glass-card
          w-full md:max-w-4xl
          max-h-[92vh]
          rounded-t-2xl md:rounded-2xl
          overflow-hidden
        "
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="
            absolute top-3 right-3 z-20
            w-9 h-9 rounded-full
            bg-white/10 border border-white/20
            flex items-center justify-center
            text-white
            focus:outline-none focus:ring-2 focus:ring-white/40
          "
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[92vh] p-4 md:p-8 space-y-6">
          {/* Images */}
         {project.images?.length > 0 && (
  <>
    {/* Mobile */}
    <div className="md:hidden">
      <SwipeableImages images={project.images} />
    </div>

    {/* Desktop */}
    <div className="hidden md:grid grid-cols-2 gap-4">
      {project.images.map((src: string, i: number) => (
        <div key={i} className="rounded-lg overflow-hidden bg-white/10">
          <img
            src={src}
            alt={`${project.title} screenshot ${i + 1}`}
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  </>
)}


          {/* Title */}
          <h2 className="text-[20px] md:text-3xl font-semibold text-white">
            {project.title}
          </h2>

          {/* Summary */}
          {project.summary && (
            <p className="text-[13px] md:text-lg text-white/75 leading-relaxed">
              {project.summary}
            </p>
          )}

          {/* Description */}
          {project.description && (
            <div className="space-y-2">
              <h3 className="text-[14px] md:text-xl font-semibold text-white/90">
                About this project
              </h3>
              <p className="text-[13px] md:text-base text-white/70 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          {project.tech?.length > 0 && (
            <div>
              <h3 className="text-[14px] md:text-xl font-semibold text-white/90 mb-2">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech: string) => (
                  <span
                    key={tech}
                    className="
                      text-[11px] md:text-sm
                      px-3 py-1 rounded-lg
                      bg-white/10 border border-white/20
                      text-white/85
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.github || project.demo) && (
            <div className="flex gap-3 pt-4 border-t border-white/20">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex-1 text-center
                    text-[12px] md:text-sm
                    px-4 py-2 rounded-lg
                    bg-white/10 border border-white/20
                    text-white
                  "
                >
                  View Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex-1 text-center
                    text-[12px] md:text-sm
                    px-4 py-2 rounded-lg
                    bg-white/10 border border-white/20
                    text-white
                  "
                >
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
function SwipeableImages({ images }: { images: string[] }) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  const paginate = (dir: number) => {
    setIndex(([prev]) => {
      const next = prev + dir;
      if (next < 0 || next >= images.length) return [prev, 0];
      return [next, dir];
    });
  };

  return (
    <div className="relative w-full overflow-hidden touch-pan-y">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          custom={direction}
          initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction < 0 ? 80 : -80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 || info.velocity.x < -300) paginate(1);
            if (info.offset.x > 50 || info.velocity.x > 300) paginate(-1);
          }}
          className="w-full h-44 object-cover rounded-lg"
        />
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1 mt-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
