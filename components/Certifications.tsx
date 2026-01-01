"use client";

import { useRef } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import CertificationCard from "./ui/CertificationCard";
import GlassHeading from "./ui/GlassHeading";
import { CERTIFICATIONS } from "@/constants/certifications";

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Amplify scroll movement
  const amplified = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[120vh] py-24"
    >
      {/* Heading */}
      <div className="flex justify-center mb-14">
        <GlassHeading
          text="Certifications"
          width="w-[100%]"
          position="center"
          fontSize="2.2rem"
          height="h-[60px]"
        />
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-14">
        {CERTIFICATIONS.map((cert, i) => {
          // Each card animates slightly differently
          const y = useTransform(
            amplified,
            [0, 1],
            [40 + i * 10, -20 - i * 10]
          );

          const opacity = useTransform(
            amplified,
            [0.05, 0.25],
            [0, 1]
          );

          return (
            <CertificationCard
              key={cert.id}
              cert={cert}
              style={{
                y,
                opacity,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
