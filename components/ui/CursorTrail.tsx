"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices / coarse pointers
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch) return;

    setEnabled(true);

    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    let rafId: number;

    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.09;
      current.current.y += (mouse.current.y - current.current.y) * 0.09;

      if (mainRef.current) {
        mainRef.current.style.transform = `translate(${current.current.x - 12}px, ${
          current.current.y - 12
        }px)`;
      }

      trailRefs.current.forEach((dot, i) => {
        const delay = (i + 1) * 0.05;
        const x = current.current.x - delay * 60;
        const y = current.current.y - delay * 60;
        dot.style.transform = `translate(${x}px, ${y}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 🚫 Do not render anything on mobile
  if (!enabled) return null;

  return (
    <>
      {/* Main Cursor */}
      <div ref={mainRef} className="fixed z-[9999] pointer-events-none">
        <div className="w-6 h-6 rounded-full border border-white" />
        <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-md" />
      </div>

      {/* Trails */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="fixed z-[9998] pointer-events-none w-4 h-4 rounded-full bg-yellow-400/20 blur-md"
          style={{ opacity: 1 - i * 0.2 }}
        />
      ))}
    </>
  );
}
