
"use client";

import { useDevice } from "@/hooks/useDevice";
import CertificationsMobile from "./mobile/CertificationsMobile";
import CertificationsDesktop from "./CertificationsDesktop";

export default function Certifications() {
  const { isDesktop, isTablet } = useDevice();

  // Device router pattern - explicit component routing
  if (isDesktop) {
    return <CertificationsDesktop />;
  }
  
  if (isTablet) {
    // For tablet, use desktop component for now
    return <CertificationsDesktop />;
  }
  
  return <CertificationsMobile />;
}