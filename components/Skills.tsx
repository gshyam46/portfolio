"use client";
import { useState } from "react";
import { SKILL_CATEGORIES } from "@/constants/skills";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Skills() {
  const filteredSkills = SKILL_CATEGORIES.filter(s => s.id !== "all");
  const [active, setActive] = useState(filteredSkills[0]?.id || "frontend");
  const current = filteredSkills.find(s => s.id === active)!;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col justify-center items-center py-12 px-4 z-30">
      {/* Category Selector */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-wrap justify-center text-gray-300 gap-3 mb-12 relative z-30"
      >
        {filteredSkills.map(cat => (
          <motion.button
            key={cat.id}
            onClick={() => {
              console.log('Button clicked:', cat.id);
              setActive(cat.id);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl
              backdrop-blur-xl border transition-all duration-300 cursor-pointer
              ${active === cat.id
                ? "bg-white/20 border-white/80 shadow-lg text-white shadow-white/10"
                : "bg-white/5 border-white/40 hover:bg-white/10 hover:border-white/20"}`}
          >
            <Icon icon={cat.icon} className="text-xl" />
            <span className="font-medium">{cat.title}</span>
            {active === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid Container */}
      <div className="w-full max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-6  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-gray-300 justify-items-center"
          >
            {current.skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                className="group relative w-full max-w-[140px] rounded-2xl p-5
                  backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5
                  border border-white/20 hover:border-white/40
                  shadow-lg hover:shadow-2xl hover:shadow-white/10
                  transition-all duration-300 cursor-pointer text-gray-300"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 
                  group-hover:from-white/5 group-hover:to-white/20 text-white transition-all duration-500" />

                <div className="relative flex flex-col items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon icon={skill.icon} className="text-4xl opacity-90 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <span className="text-sm font-medium text-center leading-tight">{skill.name}</span>
                  {skill.level && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 + 0.3 }}
                      className="text-[10px] px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm
                        border border-white/20 font-medium"
                    >
                      {skill.level}
                    </motion.span>
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