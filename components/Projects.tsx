"use client";

import { useDevice } from "@/hooks/useDevice";
import ProjectsMobile from "./mobile/ProjectsMobile";
import ProjectsDesktop from "./ProjectsDesktop";

export default function Projects() {
  const { isDesktop, isTablet } = useDevice();

  // Device router pattern - explicit component routing
  if (isDesktop) {
    return <ProjectsDesktop />;
  }
  
  if (isTablet) {
    // For tablet, use desktop component for now
    return <ProjectsDesktop />;
  }
  
  return <ProjectsMobile />;
}
