"use client";

import { useDevice } from "@/hooks/useDevice";
import SkillsMobile from "./mobile/SkillsMobile";
import SkillsDesktop from "./SkillsDesktop";

export default function Skills() {
  const { isDesktop, isTablet } = useDevice();

  // Device router pattern - explicit component routing
  if (isDesktop) {
    return <SkillsDesktop />;
  }
  
  if (isTablet) {
    // For tablet, use desktop component for now
    return <SkillsDesktop />;
  }
  
  return <SkillsMobile />;
}