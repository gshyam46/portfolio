"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function ProjectModal({ project, onClose, previousFocusRef }: any) {
  if (!project) return null;

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalId = `project-modal-${project.id}`;
  const titleId = `project-title-${project.id}`;

  useEffect(() => {
    // Focus the close button when modal opens
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      // Basic tab trap
      if (e.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll(`#${modalId} button, #${modalId} a, #${modalId} [tabindex]`))
          .filter((el: any) => !el.hasAttribute('disabled'));
        if (focusable.length === 0) return;
        const idx = focusable.indexOf(document.activeElement as Element);
        if (e.shiftKey && idx === 0) {
          (focusable[focusable.length - 1] as HTMLElement).focus();
          e.preventDefault();
        } else if (!e.shiftKey && idx === focusable.length - 1) {
          (focusable[0] as HTMLElement).focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      // restore focus
      try {
        previousFocusRef?.current?.focus();
      } catch (e) {
        // ignore
      }
    };
  }, [onClose, previousFocusRef, modalId]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      id={modalId}
    >
      <motion.div
        className="glass-container p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Images gallery (scrollable horizontally) */}
        {project.images && project.images.length > 0 && (
          <div className="w-full overflow-x-auto mb-4">
            <div className="flex gap-3 w-max pb-2">
              {project.images.map((src: string, idx: number) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="w-[280px] h-[160px] object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}

        <h2 id={titleId} className="text-2xl text-white mb-2">{project.title}</h2>

        <div className="flex gap-2 flex-wrap text-xs text-white/60 mb-4">
          {project.tech.map((t: string) => (
            <span key={t} className="px-2 py-1 bg-white/5 rounded-md">{t}</span>
          ))}
        </div>

        <div className="overflow-auto max-h-[40vh] mb-4">
          <p className="text-white/70 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            Visit Website
          </a>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="ml-4 text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
            aria-label="Close project dialog"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
