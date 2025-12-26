"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EXPERIENCES } from "@/constants/experience";
import GlassHeading from "./ui/GlassHeading";
export default function Experience() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const cards = document.querySelectorAll(".experience-card");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveIndex(Number(entry.target.getAttribute("data-index")));
                    }
                });
            },
            { threshold: 0.4 }
        );

        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-10 overflow-hidden"
        >
            {/* =========================
        GLASS HEADING
      ========================= */}
            <div className="relative z-10 flex justify-center mb-16">
                <GlassHeading
                    text="Professional Experience"
                    width="w-[90%]"
                    position="center"
                    fontSize="1rem"
                />
            </div>

            {/* ========================= BACKGROUND VIDEO========================= */}
            <video
                autoPlay
                muted
                loop
                className="scale-[1.3] rotate-180 absolute mt-10 top-[-410px] left-0 z-[0] object-cover"
                style={{
                    filter:
                        "brightness(0.75) sepia(1) hue-rotate(-10deg) saturate(6) contrast(1.3)",
                    clipPath: "inset(100px 0 0 0)", // Cut the top part
                }}
            >
                <source src="/blackhole.webm" type="video/webm" />
            </video>

            {/* =========================
        TIMELINE
      ========================= */}
            <div className="relative max-w-7xl mx-auto z-10">
                {/* Curved center line */}
                <svg
                    className="absolute left-1/2 top-0 h-full w-[200px] -translate-x-1/2 z-0"
                    viewBox="0 0 200 1000"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M100 0 Q50 100 100 200 Q150 300 100 400 Q50 500 100 600 Q150 700 100 800 Q50 900 100 1000"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="4"
                        fill="none"
                    />
                </svg>

                <div className="flex flex-col gap-20">
                    {EXPERIENCES.map((exp, idx) => {
                        const isLeft = idx % 2 === 0;
                        const isActive = idx === activeIndex;

                        return (
                            <div
                                key={exp.company}
                                data-index={idx}
                                className={`experience-card relative flex ${isLeft ? "justify-start" : "justify-end"
                                    }`}
                            >
                                {/* DOT */}
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 top-[48px] z-10
                                        w-5 h-5 rounded-full transition-all duration-500
                                        ${isActive
                                            ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                                            : "bg-white/40"
                                        }`}
                                />

                                {/* CARD */}
                                <div
                                    className={`
                                        glass-container w-[45%] z-10
                                        transition-all duration-700 ease-out
                                        ${isActive
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-70 translate-y-4"}
                                    `}
                                    style={{ borderRadius: '12px' }}
                                >
                                    <div className="glass-filter" />
                                    <div className="glass-overlay" />
                                    <div className="glass-specular" />

                                    <div className="glass-content flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            {exp.logo && (
                                                <Image
                                                    src={exp.logo}
                                                    alt={exp.company}
                                                    width={42}
                                                    height={42}
                                                    className="rounded-md"
                                                />
                                            )}
                                            <h3 className="text-xl font-semibold text-white">
                                                {exp.company}
                                            </h3>
                                        </div>

                                        <p className="text-sm text-white/70">
                                            {exp.role} • {exp.duration}
                                        </p>

                                        <ul className="list-disc list-inside text-white/85 text-sm space-y-2">
                                            {exp.description.map((d, i) => (
                                                <li key={i}>{d}</li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {exp.technologies.map(tech => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 rounded-full bg-white/10 text-xs text-white"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
