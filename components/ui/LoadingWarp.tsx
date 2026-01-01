// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial } from "@react-three/drei";

// // Star field component for loading
// const WarpStarField = ({ speed = 0, opacity = 1 }) => {
//   const ref = useRef();
//   const particlesRef = useRef();

//   // Generate stars once
//   useState(() => {
//     const positions = new Float32Array(5000 * 3);
//     for (let i = 0; i < 5000; i++) {
//       const i3 = i * 3;
//       const radius = Math.random() * 1.2;
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.acos(2 * Math.random() - 1);
      
//       positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
//       positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//       positions[i3 + 2] = radius * Math.cos(phi);
//     }
//     if (particlesRef.current) {
//       particlesRef.current = positions;
//     }
//   });

//   useFrame((state, delta) => {
//     if (ref.current) {
//       ref.current.rotation.x -= delta / 10;
//       ref.current.rotation.y -= delta / 15;
      
//       // Warp effect
//       ref.current.position.z += speed * delta * 2;
      
//       if (ref.current.position.z > 0.5) {
//         ref.current.position.z = -0.5;
//       }
//     }
//   });

//   const positions = particlesRef.current || new Float32Array(5000 * 3);

//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points
//         ref={ref}
//         positions={positions}
//         stride={3}
//         frustumCulled
//       >
//         <PointMaterial
//           transparent
//           color="#ffffff"
//           size={0.002 + speed * 0.001}
//           sizeAttenuation={true}
//           depthWrite={false}
//           opacity={opacity}
//         />
//       </Points>
//     </group>
//   );
// };

// const LoadingScreen = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [speed, setSpeed] = useState(0);
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     let mounted = true;
//     let currentProgress = 0;

//     const phases = [
//       { duration: 800, target: 20, speed: 0.5 },
//       { duration: 1200, target: 50, speed: 3 },
//       { duration: 1000, target: 80, speed: 5 },
//       { duration: 800, target: 95, speed: 2 },
//       { duration: 500, target: 100, speed: 0.3 }
//     ];

//     let phaseIndex = 0;

//     const runPhase = () => {
//       if (!mounted || phaseIndex >= phases.length) {
//         if (mounted) {
//           setTimeout(() => {
//             setFadeOut(true);
//             setTimeout(() => {
//               if (onComplete) onComplete();
//             }, 800);
//           }, 300);
//         }
//         return;
//       }

//       const phase = phases[phaseIndex];
//       const startProgress = currentProgress;
//       const diff = phase.target - startProgress;
//       const startTime = Date.now();

//       setSpeed(phase.speed);

//       const animate = () => {
//         if (!mounted) return;

//         const elapsed = Date.now() - startTime;
//         const t = Math.min(elapsed / phase.duration, 1);
//         const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        
//         currentProgress = startProgress + diff * eased;
//         setProgress(Math.floor(currentProgress));

//         if (t < 1) {
//           requestAnimationFrame(animate);
//         } else {
//           phaseIndex++;
//           runPhase();
//         }
//       };

//       animate();
//     };

//     runPhase();

//     return () => {
//       mounted = false;
//     };
//   }, [onComplete]);

//   const statusText = 
//     progress < 30 ? "INITIALIZING SYSTEMS" :
//     progress < 60 ? "ENTERING HYPERSPACE" :
//     progress < 90 ? "MAXIMUM VELOCITY" :
//     progress < 100 ? "APPROACHING DESTINATION" :
//     "ARRIVAL COMPLETE";

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-800"
//       style={{ opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? 'none' : 'auto' }}
//     >
//       {/* Star field */}
//       <div className="absolute inset-0">
//         <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
//           <WarpStarField speed={speed} opacity={fadeOut ? 0 : 1} />
//         </Canvas>
//       </div>

//       {/* Speed lines */}
//       <div 
//         className="absolute inset-0 overflow-hidden pointer-events-none"
//         style={{ opacity: Math.min(speed / 3, 1) * (fadeOut ? 0 : 1) }}
//       >
//         {Array.from({ length: 20 }).map((_, i) => (
//           <div
//             key={i}
//             className="absolute h-px"
//             style={{
//               top: `${(i * 5 + 10) % 100}%`,
//               left: '-100%',
//               width: '200%',
//               background: 'linear-gradient(to right, transparent, white, transparent)',
//               animation: `speedLine ${0.3 + Math.random() * 0.3}s linear infinite`,
//               animationDelay: `${Math.random() * 0.5}s`,
//               opacity: 0.3 + Math.random() * 0.3
//             }}
//           />
//         ))}
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center px-4">
//         <h1 
//           className="text-6xl md:text-8xl font-bold mb-8 tracking-wider transition-all duration-300"
//           style={{
//             background: 'linear-gradient(to right, #dc2626, #fb923c, #fbbf24)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//             transform: `scale(${1 + speed * 0.05})`,
//             filter: `blur(${speed * 0.3}px)`,
//           }}
//         >
//           GHANASHYAM
//         </h1>

//         <div className="w-64 md:w-96 mx-auto mb-4">
//           <div className="h-1 bg-white/20 rounded-full overflow-hidden">
//             <div
//               className="h-full rounded-full transition-all duration-300"
//               style={{ 
//                 width: `${progress}%`,
//                 background: 'linear-gradient(to right, #dc2626, #fb923c, #fbbf24)',
//                 boxShadow: '0 0 20px rgba(251, 146, 60, 0.8)'
//               }}
//             />
//           </div>
//         </div>

//         <div className="text-white/80 text-sm font-mono tracking-widest">
//           {progress}%
//         </div>

//         <div className="mt-6 text-white/60 text-xs tracking-[0.3em] uppercase">
//           {statusText}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes speedLine {
//           from { transform: translateX(-100%); }
//           to { transform: translateX(100%); }
//         }
//       `}</style>
//     </div>
//   );
// };"use client";

import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

const WarpStars = ({ speed }: { speed: number }) => {
  const ref = useRef<React.ElementRef<typeof Points>>(null);

  const [positions] = useState<Float32Array>(() => {
    const arr = random.inSphere(new Float32Array(5000), { radius: 1.5 });
    return new Float32Array(arr);
  });

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.z += speed * delta * 2;
    if (ref.current.position.z > 1) ref.current.position.z = -1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.003 + speed * 0.002}
        depthWrite={false}
      />
    </Points>
  );
};

const LoadingWarp = ({ onFinish }: { onFinish: () => void }) => {
  const [speed, setSpeed] = useState(0.05);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    let p = 0;

    const phases = [
      { t: 700, s: 0.3 },
      { t: 1200, s: 1.8 },
      { t: 900, s: 0.6 },
      { t: 600, s: 0.1 }
    ];

    let i = 0;

    const run = () => {
      if (i >= phases.length) {
        setFade(true);
        setTimeout(onFinish, 800);
        return;
      }

      const phase = phases[i];
      setSpeed(phase.s);

      const start = Date.now();
      const loop = () => {
        const t = Math.min((Date.now() - start) / phase.t, 1);
        p += (100 / phases.length) * t;
        setProgress(Math.min(100, Math.floor(p)));

        if (t < 1) requestAnimationFrame(loop);
        else {
          i++;
          run();
        }
      };

      loop();
    };

    run();
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700"
      style={{ opacity: fade ? 0 : 1 }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <WarpStars speed={speed} />
      </Canvas>

      <div className="absolute text-center">
        <h1
          className="text-7xl font-bold tracking-wide"
          style={{
            background:
              "linear-gradient(to right, #dc2626, #fb923c, #facc15)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: `scale(${1 + speed * 0.05})`,
            filter: `blur(${speed * 0.4}px)`
          }}
        >
          GHANASHYAM
        </h1>

        <div className="mt-6 w-72 mx-auto h-1 bg-white/20 rounded">
          <div
            className="h-full rounded bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-xs tracking-[0.4em] text-white/70">
          INITIALIZING
        </p>
      </div>
    </div>
  );
};

export default LoadingWarp;
