

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Award } from "lucide-react";
import Image from "next/image";

export default function CertificationCard({
  cert,
  index,
  animateIn,
  isCollapsing,
}: {
  cert: any;
  index: number;
  animateIn: boolean;
  isCollapsing: boolean;
}) {
  const [error, setError] = useState(false);
  return (
    <motion.div
      initial={
        animateIn
          ? { opacity: 0, y: 40 }
          : false
      }
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: isCollapsing ? 40 : -20, // 🔥 collapse downward
      }}
      transition={{
        duration: 0.45,
        delay: animateIn ? index * 0.08 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass-card w-[90%] mx-auto px-6 py-4 rounded-2xl grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-3 items-start"
    >


      {error ? (
        <div className="row-span-2 w-12 h-12 flex items-center justify-center bg-white/10 rounded-md">
          <Award className="text-white/50" size={24} />
        </div>
      ) : (
        <Image
          src={cert.image}
          alt={cert.title}
          width={48}
          height={48}
          className="row-span-2 w-12 h-12 object-contain rounded-md"
          onError={() => setError(true)}
        />
      )}

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-white text-base font-semibold truncate">
            {cert.title}
          </h3>
          <span className="text-white/90 text-sm truncate">
            {cert.provider}
          </span>
          <span className="text-white/50 text-sm truncate">
            {cert.timestamp}
          </span>
        </div>
      </div>

      <a
        href={cert.link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition"
      >
        View <ArrowUpRight size={14} />
      </a>

      <p className="col-span-2 text-white/75 text-sm leading-relaxed">
        {cert.description}
      </p>

      <div className="col-span-3 flex flex-wrap gap-2">
        {cert.skills.map((skill: string) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
