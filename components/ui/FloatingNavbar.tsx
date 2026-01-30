"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useDevice } from "@/hooks/useDevice";
import {
  HomeIcon,
  BriefcaseIcon,
  CogIcon,
  FolderIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

export const FloatingNav = ({
  navItems,
  activeIndex,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  activeIndex: number;
  className?: string;
}) => {
  const { isMobile } = useDevice();
  const [visible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Icon mapping for navigation items
  const iconMap: { [key: string]: JSX.Element } = {
    "Home": <HomeIcon className={isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"} />,
    "Experience": <BriefcaseIcon className={isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"} />,
    "Skills": <CogIcon className={isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"} />,
    "Projects": <FolderIcon className={isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"} />,
    "Certifications": <AcademicCapIcon className={isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"} />,
    "Publications": <DocumentTextIcon className={isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"} />,
    "Contact": <EnvelopeIcon className={isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"} />
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        exit={{
          y: -100,
          opacity: 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto px-4 py-3 items-center justify-center",
          isMobile && "px-2 py-1.5 gap-1",
          className
        )}
        style={{
          zIndex: 999999,
          pointerEvents: 'auto',
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: `
            0 20px 40px 0 rgba(0, 0, 0, 0.3),
            inset 0 2px 0 0 rgba(255, 255, 255, 0.2),
            inset 0 -2px 0 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.1)
          `,
        }}
      >
        {/* Enhanced glass reflection overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
          }}
        />

        {/* Subtle animated shimmer - disabled on mobile for performance */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none opacity-30"
            animate={{
              background: [
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Navigation items */}
        <div 
          className={cn(
            "relative flex items-center space-x-1 md:space-x-2",
            isMobile && "space-x-0.5"
          )} 
          style={{ zIndex: 10, pointerEvents: 'auto' }}
        >
          {navItems.map((navItem: any, idx: number) => {
            const isActive = idx === activeIndex;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.button
                key={`link=${idx}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Navbar clicked:', navItem.name, navItem.link);
                  const target = document.querySelector(navItem.link);
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  } else {
                    console.warn('Target not found:', navItem.link);
                  }
                }}
                onMouseEnter={() => {
                  if (!isMobile) { // Disable hover effects on mobile
                    console.log('Mouse enter:', navItem.name);
                    setHoveredIndex(idx);
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    console.log('Mouse leave:', navItem.name);
                    setHoveredIndex(null);
                  }
                }}
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative group bg-transparent border-none outline-none cursor-pointer rounded-full transition-all duration-300 flex items-center",
                  isMobile 
                    ? "px-2 py-2 min-w-[44px] min-h-[44px] justify-center" // Mobile: 44px minimum tap target
                    : "px-2 md:px-4 py-2 md:py-2.5 gap-1 md:gap-2",
                  isActive
                    ? "text-white font-semibold shadow-lg"
                    : "text-white/70 hover:text-white/90"
                )}
                style={{
                  pointerEvents: 'auto',
                  zIndex: 20,
                  minHeight: isMobile ? '44px' : '36px', // Ensure 44px minimum on mobile
                  minWidth: isMobile ? '44px' : 'auto',
                }}
              >
                {/* Active/Hover background with glass effect */}
                <AnimatePresence>
                  {(isActive || (!isMobile && isHovered)) && (
                    <motion.div
                      layoutId={isActive ? "activeBackground" : "hoverBackground"}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: isActive
                          ? "rgba(255, 255, 255, 0.25)"
                          : "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        boxShadow: isActive
                          ? "0 8px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.1)"
                          : "0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                        border: isActive ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon with animation */}
                <motion.span
                  className={cn(
                    "relative flex-shrink-0",
                    isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5"
                  )}
                  animate={!isMobile ? {
                    rotate: isHovered ? [0, -5, 5, 0] : 0,
                    scale: isActive ? 1.1 : 1,
                  } : {
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{
                    rotate: { duration: 0.5, ease: "easeInOut" },
                    scale: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                >
                  {iconMap[navItem.name] || navItem.icon}
                </motion.span>

                {/* Text with animation - hidden on mobile, icon-only navigation */}
                {!isMobile && (
                  <motion.span
                    className="hidden md:inline-block relative text-sm font-body whitespace-nowrap"
                    animate={{
                      y: isHovered ? -1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    {navItem.name}
                  </motion.span>
                )}

                {/* Active indicator dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 rounded-full bg-white shadow-lg",
                        isMobile ? "-bottom-0.5 w-1 h-1" : "-bottom-1 w-1.5 h-1.5"
                      )}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Enhanced edge highlight */}
        <div
          className="absolute inset-x-0 top-0 h-[2px] rounded-t-full pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)",
          }}
        />

        {/* Bottom subtle glow */}
        <div
          className="absolute inset-x-0 bottom-0 h-[1px] rounded-b-full pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};