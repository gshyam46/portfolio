"use client";

interface GlassHeadingMobileProps {
  text: string;
  className?: string;
}

export default function GlassHeadingMobile({
  text,
  className = "",
}: GlassHeadingMobileProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />
        <h2 className="relative mobile-heading-lg text-white px-6 py-3 text-center">
          {text}
        </h2>
      </div>
    </div>
  );
}