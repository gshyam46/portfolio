"use client";

import { motion } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";
import GlassHeading from "./ui/GlassHeading";

export default function Contact() {
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <section className="relative w-full z-30">
      {/* Heading */}
      <div className="flex justify-center mb-8 sm:mb-10">
        {isMobile ? (
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />
            <h2 className="relative text-[16px] font-semibold text-white px-4 py-2">
              Reach Out
            </h2>
          </div>
        ) : (
          <GlassHeading
            text="Reach Out"
            width="w-[100%]"
            position="center"
            fontSize="2.2rem"
            height="h-[60px]"
          />
        )}
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          mx-auto glass-card rounded-3xl
          ${isMobile 
            ? "max-w-sm px-4 py-6" 
            : "max-w-3xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10"
          }
        `}
      >
        {/* Hero text constraint for mobile */}
        {isMobile && (
          <div className="mb-6 max-w-[90vw]">
            <p className="text-[13px] text-white/80 text-center leading-relaxed">
              Let's connect and discuss opportunities, collaborations, or just say hello!
            </p>
          </div>
        )}

        <form className="flex flex-col gap-6">
          {/* Name + Email */}
          <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 sm:gap-6"}`}>
            <Input label="Name" placeholder="Your name" isMobile={isMobile} />
            <Input label="Email" placeholder="you@example.com" isMobile={isMobile} />
          </div>

          {/* Subject */}
          <Input label="Subject" placeholder="What's this about?" isMobile={isMobile} />

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className={`${isMobile ? "text-[11px]" : "text-sm"} text-white/70`}>
              Message
            </label>
            <textarea
              rows={isMobile ? 4 : 5}
              placeholder="Write your message..."
              className={`
                w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40
                focus:outline-none focus:ring-2 focus:ring-white/20 resize-none
                ${isMobile 
                  ? "px-3 py-3 text-[13px]" 
                  : "px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
                }
              `}
            />
          </div>

          {/* Submit - View Resume Button */}
          <div className={`flex pt-3 sm:pt-4 ${isMobile ? "justify-center" : "justify-end"}`}>
            <button
              type="submit"
              className={`
                font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/15 
                rounded-md transition active:scale-95
                ${isMobile 
                  ? "px-6 py-3 text-[13px] min-w-[44px] min-h-[44px] flex items-center justify-center" 
                  : "px-5 sm:px-6 py-2 text-xs sm:text-sm"
                }
              `}
            >
              Send message
            </button>
          </div>

          {/* View Resume Button - Mobile optimized */}
          {isMobile && (
            <div className="flex justify-center pt-4 border-t border-white/10">
              <a
                href="/resume.pdf" // Update with actual resume path
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-[13px] font-medium text-white bg-white/15 hover:bg-white/25 rounded-xl transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                View Resume
              </a>
            </div>
          )}
        </form>
      </motion.div>
    </section>
  );
}

/* ------------------- */
/* Input Component     */
/* ------------------- */

function Input({
  label,
  placeholder,
  isMobile,
}: {
  label: string;
  placeholder: string;
  isMobile: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <label className={`${isMobile ? "text-[11px]" : "text-xs sm:text-sm"} text-white/70`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className={`
          w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40
          focus:outline-none focus:ring-2 focus:ring-white/20
          ${isMobile 
            ? "px-3 py-3 text-[13px] min-h-[44px]" 
            : "px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
          }
        `}
      />
    </div>
  );
}