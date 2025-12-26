"use client";

interface GlassRoleProps {
    text: string;
    width?: string;
    fontSize?: string;
    position?: "left" | "center" | "right";
    className?: string;
}

export default function GlassRole({
    text,
    width = "max-w-[720px]",
    fontSize = "text-5xl",
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
        <div className={`container container--inline  mt-8 ${className}`}>
            <div
                className={`
          glass-container 
          glass-container--rounded 
          glass-container--large
          ${width}
        `}
            >
                {/* Liquid distortion layer */}
                <div className="glass-filter" />

                {/* Frosted overlay */}
                <div className="glass-overlay" />

                {/* Specular highlights */}
                <div className="glass-specular" />

                {/* Content */}
                <div
                    className={`glass-content glass-content--inline flex ${positionClass}`}
                >
                    <div className="player">
                        <div className="player__thumb">
                            <div className="player__legend">
                                <h1
                                    className={`
                    player__legend__title
                    ${fontSize}
                  `}
                                >
                                    {text}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SVG Liquid Distortion Filter */}
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
