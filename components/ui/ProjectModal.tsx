"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function ProjectModal({ project, onClose, previousFocusRef }: any) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const prevFocus = previousFocusRef?.current; // ✅ cache ref safely

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
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="glass-container p-6 max-w-4xl w-full max-h-[80vh]"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {project.images?.length > 0 && (
          <div className="flex gap-3 overflow-x-auto mb-4">
            {project.images.map((src: string, i: number) => (
              <Image
                key={i}
                src={src}
                alt={`${project.title} ${i + 1}`}
                width={280}
                height={160}
                className="rounded-md"
              />
            ))}
          </div>
        )}

        <h2 className="text-2xl text-white mb-2">{project.title}</h2>

        <p className="text-white/70 mb-4">{project.description}</p>

        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="text-white/70 focus:ring-2 focus:ring-white/30 rounded"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
