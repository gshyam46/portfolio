"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/constants/certifications";

const INITIAL_COUNT = 4;

export default function CertificationsMobile() {
  const [showAll, setShowAll] = useState(false);

  const visibleCertifications = showAll
    ? CERTIFICATIONS
    : CERTIFICATIONS.slice(0, INITIAL_COUNT);

  const hasMore = CERTIFICATIONS.length > INITIAL_COUNT;

  return (
    <section className="w-full px-4 py-6 mt-10 overflow-hidden">
      {/* Glass Heading */}
      <div className="mb-6 flex justify-center">
        <div className="w-[80%] rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <h2 className="text-center text-[16px] font-semibold text-white px-4 py-2">
            CERTIFICATIONS
          </h2>
        </div>
      </div>

      {/* Certifications List */}
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        {visibleCertifications.map((cert: any, index: number) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            {/* Header */}
            <div className="flex items-start gap-3">
              {cert.logo && (
                <div className="w-8 h-8 flex-shrink-0 rounded bg-white/10 overflow-hidden">
                  <img
                    src={cert.logo}
                    alt={cert.issuer}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-medium text-white leading-tight">
                  {cert.name}
                </h3>
                <p className="text-[11px] text-white/60">
                  {cert.issuer}
                </p>
                {cert.issueDate && (
                  <p className="text-[10px] text-white/50 mt-0.5">
                    Issued: {cert.issueDate}
                  </p>
                )}
              </div>
            </div>

            {/* Description — ALWAYS VISIBLE */}
            {cert.description && (
              <p className="mt-3 text-[12px] text-white/70 leading-relaxed line-clamp-3">
                {cert.description}
              </p>
            )}

            {/* Skills — ALWAYS VISIBLE (LIMITED) */}
            {cert.skills && cert.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {cert.skills.slice(0, 4).map((skill: string) => (
                  <span
                    key={skill}
                    className="text-[9px] uppercase tracking-wide px-2 py-0.5 rounded bg-white/10 text-white/50"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 4 && (
                  <span className="text-[9px] text-white/40">
                    +{cert.skills.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Credential Link — ALWAYS VISIBLE */}
            {cert.credentialUrl && (
              <div className="mt-3">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-[11px] px-3 py-2 rounded-lg bg-white/10 text-white/80 min-h-[32px]"
                >
                  View Credential
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* View More / Less */}
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 text-[12px] text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300 min-w-[44px] min-h-[44px]"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </section>
  );
}
