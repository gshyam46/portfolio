"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PUBLICATIONS } from "@/constants/publications";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useDevice } from "@/hooks/useDevice";

export default function PublicationsMobile() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
const { isDesktop, isTablet, isMobile } = useDevice();

  return (
    <section className="w-full px-4 py-6 overflow-hidden">
      {/* Glass Heading */}
      <div className="relative mb-6 flex justify-center">
        <div className="relative  w-[80%]">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />
          <h2 className="relative text-center text-[16px] font-semibold text-white px-4 py-2">
            PUBLICATIONS
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        {PUBLICATIONS.map((publication: any, index: number) => (
          <motion.div
            key={publication.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
          >
            {/* Header - Always visible */}
            <button
              onClick={() => toggleExpanded(publication.id)}
              className="w-full p-3 text-left flex items-center justify-between min-h-[44px] active:bg-white/5 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-medium text-white pr-2 leading-tight mb-1">
                  {publication.title}
                </h3>
                <p className="text-[11px] text-white/60 mb-1">
                  {publication.journal} • {publication.year}
                </p>
                {/* Show a bit of abstract text
                {publication.abstract && (
                 <p className="text-[11px] text-white/60  leading-relaxed">

                    {publication.abstract}
                  </p>
                )} */}
              </div>
              
              {/* <div className="flex-shrink-0 ml-2">
                {expandedId === publication.id ? (
                  <ChevronUpIcon className="w-4 h-4 text-white/60" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 text-white/60" />
                )}
              </div> */}
            </button>
<AnimatePresence>
             
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 border-t border-white/10">
                    {/* Abstract */}
                    {(isDesktop || isTablet) && publication.abstract && (
  <div className="mt-2">
    <h4 className="text-[11px] font-medium text-white/80 mb-1">
      Abstract
    </h4>
    <p className="text-[12px] text-white/70 leading-relaxed">
      {publication.abstract}
    </p>
  </div>
)}

{isMobile && publication.mobileAbstract && (
  <div className="mt-2 flex flex-col gap-2">
    {publication.mobileAbstract.map((line: string, idx: number) => {
      const isBullet = line.trim().startsWith("•");

      return (
        <p
          key={idx}
          className={
            isBullet
              ? "text-[11px] text-white/60 leading-snug pl-3 relative"
              : "text-[12px] text-white/70 leading-relaxed"
          }
        >
          {isBullet && (
            <span className="absolute left-0 text-white/40">•</span>
          )}
          {isBullet ? line.replace(/^•\s*/, "") : line}
        </p>
      );
    })}
  </div>
)}



                    {/* Authors */}
                    {publication.authors && (
                      <div className="mt-2">
                        <h4 className="text-[11px] font-medium text-white/80 mb-1">
                          Authors
                        </h4>
                        <p className="text-[11px] text-white/60">
                          {publication.authors.join(", ")}
                        </p>
                      </div>
                    )}

                    {/* Keywords */}
                    {publication.keywords && (
                      <div className="mt-2">
                        <h4 className="text-[11px] font-medium text-white/80 mb-1">
                          Keywords
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {publication.keywords.slice(0, 6).map((keyword: string) => (
                            <span 
                              key={keyword}
                              className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white/50"
                            >
                              {keyword}
                            </span>
                          ))}
                          {publication.keywords.length > 6 && (
                            <span className="text-[9px] text-white/40">
                              +{publication.keywords.length - 6}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    {(publication.doi || publication.url) && (
                      <div className="mt-3 flex gap-2">
                        {publication.doi && (
                          <a
                            href={`https://doi.org/${publication.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors min-w-[44px] min-h-[32px] flex items-center justify-center"
                          >
                            DOI
                          </a>
                        )}
                        {publication.url && (
                          <a
                            href={publication.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors min-w-[44px] min-h-[32px] flex items-center justify-center"
                          >
                            View
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              
            </AnimatePresence>
            {/* Expandable Content */}
            
          </motion.div>
        ))}
      </div>
    </section>
  );
}