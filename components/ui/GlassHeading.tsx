"use client";

interface GlassRoleProps {
  text: string;
  width?: string;
  height?: string;
  fontSize?: string;
  position?: "left" | "center" | "right";
  className?: string;
}

export default function GlassRole({
  text,
  width = "max-w-[820px]",
  height = "h-[120px]",
  fontSize = "3rem",
  position = "center",
  className = "",
}: GlassRoleProps) {
  const positionClass =
    position === "left"
      ? "items-start text-left"
      : position === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <div className={`container container--inline mt-8 ${className}`}>
      <div
        className={`
          glass-container
          glass-container--rounded
          glass-container--large
          ${width}
          ${height}
        `}
      >
        {/* Liquid distortion */}
        <div className="glass-filter" />
        <div className="glass-overlay" />
        <div className="glass-specular" />

        {/* CONTENT */}
        <div
          className={`
            glass-content
            flex
            items-center
            justify-center
            ${positionClass}
            h-full
            w-full
          `}
        >
          <h1
            className="player__legend__title"
            style={{
              fontSize,
              lineHeight: "1.1",
              letterSpacing: "0.04em",
            }}
          >
            {text}
          </h1>
        </div>
      </div>

      {/* SVG filter */}
      <svg style={{ display: "none" }}>
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
}
