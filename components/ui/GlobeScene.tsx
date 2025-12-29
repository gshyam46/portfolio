// "use client";

// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// export default function GlobeScene() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const animationFrameRef = useRef<number>();

//   useEffect(() => {
//     if (!containerRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       containerRef.current.clientWidth / containerRef.current.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 3;

//     const renderer = new THREE.WebGLRenderer({ 
//       antialias: true, 
//       alpha: true 
//     });
//     renderer.setSize(
//       containerRef.current.clientWidth,
//       containerRef.current.clientHeight
//     );
//     renderer.setPixelRatio(window.devicePixelRatio);
//     containerRef.current.appendChild(renderer.domElement);

//     // Lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 3, 5);
//     scene.add(directionalLight);

//     // Earth sphere
//     const geometry = new THREE.SphereGeometry(1, 64, 64);
    
//     const textureLoader = new THREE.TextureLoader();
    
//     // Load earth texture
//     const earthTexture = textureLoader.load("/earth-blue-marble.jpg");
//     const bumpTexture = textureLoader.load("/earth-topology.png");
    
//     const earthMaterial = new THREE.MeshPhongMaterial({
//       map: earthTexture,
//       bumpMap: bumpTexture,
//       bumpScale: 0.05,
//       specular: new THREE.Color(0x333333),
//       shininess: 5,
//     });

//     const earthMesh = new THREE.Mesh(geometry, earthMaterial);
//     scene.add(earthMesh);

//     // Clouds layer
//     const cloudGeometry = new THREE.SphereGeometry(1.01, 64, 64);
//     const cloudTexture = textureLoader.load("/clouds.png");
    
//     const cloudMaterial = new THREE.MeshPhongMaterial({
//       map: cloudTexture,
//       transparent: true,
//       opacity: 0.8,
//       depthWrite: false,
//     });

//     const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
//     scene.add(cloudMesh);

//     // Atmosphere glow
//     const atmosphereGeometry = new THREE.SphereGeometry(1.15, 64, 64);
//     const atmosphereMaterial = new THREE.ShaderMaterial({
//       vertexShader: `
//         varying vec3 vNormal;
//         void main() {
//           vNormal = normalize(normalMatrix * normal);
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         varying vec3 vNormal;
//         void main() {
//           float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
//           gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
//         }
//       `,
//       blending: THREE.AdditiveBlending,
//       side: THREE.BackSide,
//       transparent: true,
//     });

//     const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
//     scene.add(atmosphereMesh);

//     // Animation
//     let rotation = 0;
//     const animate = () => {
//       rotation += 0.0015;
//       earthMesh.rotation.y = rotation;
//       cloudMesh.rotation.y = rotation * 1.05;
      
//       renderer.render(scene, camera);
//       animationFrameRef.current = requestAnimationFrame(animate);
//     };
//     animate();

//     // Handle resize
//     const handleResize = () => {
//       if (!containerRef.current) return;
      
//       camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(
//         containerRef.current.clientWidth,
//         containerRef.current.clientHeight
//       );
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//       if (containerRef.current && renderer.domElement) {
//         containerRef.current.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//       geometry.dispose();
//       earthMaterial.dispose();
//       cloudGeometry.dispose();
//       cloudMaterial.dispose();
//       atmosphereGeometry.dispose();
//       atmosphereMaterial.dispose();
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-screen overflow-hidden ">
//       {/* Globe Container - Clipped at bottom */}
//       <div
//         ref={containerRef}
//         className="absolute inset-0"
//         style={{
//           clipPath: "inset(0 0 40% 0)",
//         }}
//       />

//       {/* Fade gradient at bottom edge */}
//       <div
//         className="absolute left-0 right-0 pointer-events-none z-10"
//         style={{
//           top: "60%",
//           height: "100px",
//           background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))",
//         }}
//       />

//       {/* Bottom section for other content */}
//       <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-b from-slate-900/50 to-slate-950 backdrop-blur-sm z-20">
//         <div className="flex items-center justify-center h-full">
//           <div className="text-center space-y-4">
//             <h2 className="text-4xl font-bold text-white">Your Content Here</h2>
//             <p className="text-white/70 text-lg">
//               This section is below the globe
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function GlobeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // OrbitControls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Earth sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    const textureLoader = new THREE.TextureLoader();
    
    // Load earth texture
    const earthTexture = textureLoader.load("/earth-blue-marble.jpg");
    const bumpTexture = textureLoader.load("/earth-topology.png");
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.05,
      specular: new THREE.Color(0x333333),
      shininess: 5,
    });

    const earthMesh = new THREE.Mesh(geometry, earthMaterial);
    scene.add(earthMesh);

    // Clouds layer
    const cloudGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudTexture = textureLoader.load("/clouds.png");
    
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.15, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });

    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // Animation
    const animate = () => {
      controls.update(); // Update controls for damping and auto-rotate
      
      // Slight cloud rotation for realism
      cloudMesh.rotation.y += 0.0002;
      
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      controls.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      earthMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[50vh] top-[450px]">
      {/* Globe Container - Clipped at bottom */}
      <div
      ref={containerRef}
      className="absolute inset-0"
      style={{
        filter:
        "brightness(1.2) saturate(1.15) contrast(1.1) blur(0px) drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))",
        top: 0,
        scale: "2.1",
        clipPath: "inset(0 0 60% 0)",
      }}
      />
    </div>
  );
}