"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
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
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  // Icon mapping for navigation items
  const iconMap: { [key: string]: JSX.Element } = {
    "Home": <HomeIcon className="w-4 h-4" />,
    "Experience": <BriefcaseIcon className="w-4 h-4" />,
    "Skills": <CogIcon className="w-4 h-4" />,
    "Projects": <FolderIcon className="w-4 h-4" />,
    "Certifications": <AcademicCapIcon className="w-4 h-4" />,
    "Publications": <DocumentTextIcon className="w-4 h-4" />,
    "Contact": <EnvelopeIcon className="w-4 h-4" />
  };

  // useMotionValueEvent(scrollYProgress, "change", (current) => {
  //   if (typeof current === "number") {
  //     const direction = current - scrollYProgress.getPrevious()!;
  //     setLastScrollTime(Date.now());

  //     if (scrollYProgress.get() < 0.05) {
  //       setVisible(true);
  //       setScrollDirection(null);
  //     } else {
  //       if (direction < 0) {
  //         // Scrolling up - show immediately
  //         setVisible(true);
  //         setScrollDirection('up');
  //       } else if (direction > 0) {
  //         // Scrolling down - hide immediately
  //         setVisible(false);
  //         setScrollDirection('down');
  //       }
  //     }
  //   }
  // });

  // // Auto-show navbar after scroll stops
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (Date.now() - lastScrollTime > 1000) { // 1 second after scroll stops
  //       setVisible(true);
  //     }
  //   }, 100);

  //   return () => clearInterval(timer);
  // }, [lastScrollTime]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = navItems.map(item =>
      document.querySelector(item.link)
    );

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = navItems.findIndex(
              item => item.link === `#${entry.target.id}`
            );
            if (index !== -1) {
              console.log('Section in view:', entry.target.id, 'index:', index);
              setActiveIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    sections.forEach(section => {
      if (section) {
        console.log('Observing section:', section.id);
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [navItems]);

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
          className
        )}
        style={{
          zIndex: 9999,
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

        {/* Subtle animated shimmer */}
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

        {/* Navigation items */}
        <div className="relative flex items-center space-x-2" style={{ zIndex: 10, pointerEvents: 'auto' }}>
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
                  console.log('Mouse enter:', navItem.name);
                  setHoveredIndex(idx);
                }}
                onMouseLeave={() => {
                  console.log('Mouse leave:', navItem.name);
                  setHoveredIndex(null);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative group bg-transparent border-none outline-none cursor-pointer px-4 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2",
                  isActive
                    ? "text-white font-semibold shadow-lg"
                    : "text-white/70 hover:text-white/90"
                )}
                style={{
                  pointerEvents: 'auto',
                  zIndex: 20,
                  minHeight: '40px'
                }}
              >
                {/* Active/Hover background with glass effect */}
                <AnimatePresence>
                  {(isActive || isHovered) && (
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
                  className="relative flex-shrink-0"
                  animate={{
                    rotate: isHovered ? [0, -5, 5, 0] : 0,
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{
                    rotate: { duration: 0.5, ease: "easeInOut" },
                    scale: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                >
                  {iconMap[navItem.name] || navItem.icon}
                </motion.span>

                {/* Text with animation */}
                <motion.span
                  className="relative text-sm font-medium whitespace-nowrap"
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

                {/* Active indicator dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
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