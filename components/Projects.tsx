"use client";

import { useIsMobile } from "@/utils/useIsMobile";
import ProjectsMobile from "./mobile/ProjectsMobile";
import ProjectsDesktop from "./ProjectsDesktop";

export default function Projects() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ProjectsMobile />;
  }

  return <ProjectsDesktop />;
}
