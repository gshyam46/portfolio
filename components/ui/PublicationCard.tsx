"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function PublicationCard({
  publication,
  animate,
}: {
  publication: any;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        glass-card
        w-[82%]
        px-8
        py-8
        rounded-3xl
        flex
        flex-col
        gap-6
      "
    >
      {/* Title */}
      <h3 className="text-white text-xl font-semibold leading-tight">
        {publication.title}
      </h3>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-white/70">
        <span>{publication.publisher}</span>
        <span>•</span>
        <span>{publication.year}</span>
      </div>

<div className="text-white/80 text-sm leading-relaxed space-y-2">
  {publication.abstract.map((point: string, index: number) => {
    const [title, rest] = point.split(": ");

    return (
      <p key={index} className="flex gap-2">
        <span className="text-white/60">•</span>
        <span>
          <span className="font-medium text-white">
            {rest ? `${title}: ` : ""}
          </span>
          {rest ?? title}
        </span>
      </p>
    );
  })}
</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {publication.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action */}
      <a
        href={publication.link}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition mt-2"
      >
        View Publication <ExternalLink size={14} />
      </a>
    </motion.div>
  );
}
