"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CERTIFICATIONS } from "@/constants/certifications";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function CertificationsMobile() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  // Show only first 3 certifications initially
  const visibleCertifications = showAll ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 3);
  const hasMore = CERTIFICATIONS.length > 3;

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full px-4 py-6 overflow-hidden">
      {/* Glass Heading */}
      <div className="relative mb-6 flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />
          <h2 className="relative text-[16px] font-semibold text-white px-4 py-2">
            Certifications
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        <AnimatePresence>
          {visibleCertifications.map((cert: any, index: number) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              {/* Header - Always visible */}
              <button
                onClick={() => toggleExpanded(cert.id)}
                className="w-full p-3 text-left flex items-center justify-between min-h-[44px] active:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Certification Logo */}
                  {cert.logo && (
                    <div className="w-8 h-8 flex-shrink-0 relative overflow-hidden rounded bg-white/10">
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-medium text-white pr-2 leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-[11px] text-white/60 mt-0.5">
                      {cert.issuer}
                    </p>
                    {cert.issueDate && (
                      <p className="text-[10px] text-white/50 mt-0.5">
                        Issued: {cert.issueDate}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-2">
                  {expandedId === cert.id ? (
                    <ChevronUpIcon className="w-4 h-4 text-white/60" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 text-white/60" />
                  )}
                </div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedId === cert.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 border-t border-white/10">
                      {/* Issue Date */}
                      {cert.issueDate && (
                        <div className="mt-2">
                          <p className="text-[11px] text-white/60">
                            Issued: {cert.issueDate}
                          </p>
                        </div>
                      )}

                      {/* Expiry Date */}
                      {cert.expiryDate && (
                        <div className="mt-1">
                          <p className="text-[11px] text-white/60">
                            Expires: {cert.expiryDate}
                          </p>
                        </div>
                      )}

                      {/* Description */}
                      {cert.description && (
                        <div className="mt-2">
                          <p className="text-[12px] text-white/70 leading-relaxed">
                            {cert.description}
                          </p>
                        </div>
                      )}

                      {/* Skills */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-[11px] font-medium text-white/80 mb-1">
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {cert.skills.slice(0, 6).map((skill: string) => (
                              <span 
                                key={skill}
                                className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white/50"
                              >
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 6 && (
                              <span className="text-[9px] text-white/40">
                                +{cert.skills.length - 6}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Credential Link */}
                      {cert.credentialUrl && (
                        <div className="mt-3">
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors min-w-[44px] min-h-[32px] flex items-center justify-center inline-flex"
                          >
                            View Credential
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* View More/Less Button */}
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