"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { Icon } from "@iconify/react";

export default function ResumeModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          relative overflow-hidden px-8 py-3 rounded-full
          text-white font-medium tracking-wide
          bg-white/10 backdrop-blur-md
          border border-white/20
          hover:border-white/40
          transition-all duration-300
          group mt-5
        "
      >
        <span className="relative z-10 text-sl">View Resume </span>
        <Icon icon="mdi:arrow-right" className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 group-hover:translate-x-1 transition-transform" />

        <span
          className="
            absolute inset-0 
            bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30
            opacity-0 group-hover:opacity-100
            blur-xl transition duration-500
          "
        />
      </button>

      {/* MODAL */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-[95%] max-w-5xl h-[90vh] bg-black/60 border border-white/10 rounded-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                    <p className="  text-white tracking-wide">
                      Resume Preview
                    </p>

                    <div className="flex items-center gap-4">
                      <a
                        href="/GHANASHYAM_G.pdf"
                        download
                        className="text-white/80 hover:text-white transition"
                      ><Download size={18} />
                      </a>

                      <button
                        onClick={() => setOpen(false)}
                        className="text-white/80 hover:text-white transition"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* PDF VIEW */}
                  <iframe
                    src="/GHANASHYAM_G.pdf"
                    className="w-full h-full"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
