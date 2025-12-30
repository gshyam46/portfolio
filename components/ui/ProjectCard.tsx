"use client";

import { motion } from "framer-motion";

export default function ProjectCard({
  project,
  active,
  onClick,
  onReadMore,
}: any) {
  return (
    <motion.div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onReadMore?.();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={active ? "true" : "false"}
      whileHover={{ scale: 1.03, y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative glass-card  cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
      style={{
        width: "550px",
        height: "500px",
        zIndex: active ? 10 : 1,
      }}
    >
      {/* Glass layers */}


      <div className="glass-specular" />

      {/* Content */}
      <div className="glass-content flex flex-col justify-between h-full">
        {/* Title + Summary */}
        <div>
          <h3 className="text-white text-lg font-semibold tracking-wide">
            {project.title}
          </h3>

          <p className="text-white/70 text-sm mt-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-end gap-5 justify-between mt-4">
          <div className="flex flex-wrap gap-5 text-xs text-white/70">
            {project.tech.map((t: string) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onReadMore?.();
            }}
            className="
              px-3 py-1
              rounded-md
              bg-white/10
              hover:bg-white/20
              border border-white/20
              text-white text-xs
              transition
              focus:outline-none focus:ring-2 focus:ring-white/30
            "
          >
            Read more
          </button>
        </div>
      </div>
    </motion.div>
  );
}
