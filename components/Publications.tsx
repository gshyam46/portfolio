"use client";

import { useDevice } from "@/hooks/useDevice";
import PublicationsMobile from "./mobile/PublicationsMobile";
import PublicationsDesktop from "./PublicationsDesktop";

export default function Publications() {
  const { isDesktop, isTablet } = useDevice();

  // Device router pattern - explicit component routing
  if (isDesktop) {
    return <PublicationsDesktop />;
  }
  
  if (isTablet) {
    // For tablet, use desktop component for now
    return <PublicationsDesktop />;
  }
  
  return <PublicationsMobile />;
}
