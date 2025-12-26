"use client";

import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

export default function GlobeScene() {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = globeRef.current;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;

    const CLOUDS_IMG_URL = "/clouds.png";

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, texture => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * 1.01, 75, 75),
        new THREE.MeshPhongMaterial({
          map: texture,
          transparent: true,
          opacity: 0.8,
        })
      );

      globe.scene().add(clouds);
    });
  }, []);

  return (
    <div className="w-full h-full">
      <Globe
        ref={globeRef}
        globeImageUrl="/earth.jpg"
        bumpImageUrl="/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
      />
    </div>
  );
}
