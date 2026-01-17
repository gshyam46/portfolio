// "use client";

// import React, { useState, useRef, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Preload } from "@react-three/drei";

// // @ts-ignore
// import * as random from "maath/random/dist/maath-random.esm";

// const StarBackground = (props: any) => {
//   const ref: any = useRef();
//   const [sphere] = useState(() =>
//     random.inSphere(new Float32Array(5000), { radius: 1.2 })
//   );

//   useFrame((state, delta) => {
//     ref.current.rotation.x -= delta / 10;
//     ref.current.rotation.y -= delta / 15;
//   })


//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points
//         ref={ref}
//         positions={sphere}
//         stride={3}
//         frustumCulled
//         {...props}
//       >
//         <PointMaterial
//           transparent
//           color="$fff"
//           size={0.002}
//           sizeAttenuation={true}
//           dethWrite={false}
//         />
//       </Points>
//     </group>
//   )
// };

// const StarsCanvas = () => (
//   <div className="w-full h-auto fixed inset-0 z-[20] pointer-events-none">
//     <Canvas camera={{ position: [0, 0, 1] }}>
//       <Suspense fallback={null}>
//         <StarBackground />
//       </Suspense>
//     </Canvas>
//   </div>
// )

// export default StarsCanvas;
"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

const Stars = ({ speed = 0.05 }: { speed?: number }) => {
  const ref = useRef<React.ElementRef<typeof Points>>(null);

  const [positions] = useState<Float32Array>(() => {
    const arr = random.inSphere(new Float32Array(6000), { radius: 1.4 });
    return new Float32Array(arr);
  });

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * speed;
    ref.current.rotation.x -= delta * speed * 0.6;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
    <div className="absolute inset-0 w-full h-full max-w-[100vw] max-h-[100vh]">
      <Canvas camera={{ position: [0, 0, 1] }} style={{ width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh' }}>
        <Stars />
      </Canvas>
    </div>
  </div>
);

export default StarsCanvas;
