"use client";
import { useState } from "react";
import { SKILL_CATEGORIES } from "@/constants/skills";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsMobile() {
  const filteredSkills = SKILL_CATEGORIES.filter(s => s.id !== "all");
  const [active, setActive] = useState(filteredSkills[0]?.id || "frontend");
  const current = filteredSkills.find(s => s.id === active)!;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.25,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative w-full px-4 py-6 flex flex-col items-center overflow-hidden">
      
      {/* Background Video - positioned above skills content as per requirements */}
      <div className="absolute top-0 left-0 w-full h-[300px] z-[0] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-[1.2]"
          style={{
            filter: "brightness(0.4) sepia(1) hue-rotate(-10deg) saturate(4) contrast(1.2)",
          }}
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.95) 100%)",
          }}
        />
      </div>

      {/* Glass Heading */}
      <div className="relative mb-6 z-10 mt-32">
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />
          <h2 className="relative text-[16px] font-semibold text-white px-4 py-2 text-center">
            Skills & Technologies
          </h2>
        </div>
      </div>

      {/* Category Selector - Mobile optimized */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-wrap justify-center gap-2 mb-6 relative z-10 max-w-sm"
      >
        {filteredSkills.map(cat => (
          <motion.button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px]
            backdrop-blur-xl border transition-all duration-300 cursor-pointer min-w-[44px] min-h-[44px]
            ${active === cat.id
                ? "bg-white/20 border-white/60 shadow-lg text-white"
                : "bg-white/5 border-white/30 text-white/80"}`}
          >
            <Icon icon={cat.icon} className="text-sm" />
            <span className="font-medium">{cat.title}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid - Mobile optimized with smaller icons */}
      <div className="w-full max-w-sm relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-3 gap-3 justify-items-center"
          >
            {current.skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group relative w-full max-w-[90px] rounded-xl p-3
                  backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5
                  border border-white/20 active:scale-95
                  shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="relative flex flex-col items-center gap-1">
                  {/* Much smaller icons for mobile */}
                  <Icon 
                    icon={skill.icon} 
                    className="text-lg opacity-90 transition-opacity" 
                  />
                  <span className="text-[9px] font-medium text-center leading-tight text-white/90 line-clamp-2">
                    {skill.name}
                  </span>
                  {skill.level && (
                    <span className="text-[7px] px-1 py-0.5 rounded-full bg-white/15 backdrop-blur-sm
                      border border-white/20 font-medium text-white/70">
                      {skill.level}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}