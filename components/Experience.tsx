"use client";

import { useDevice } from "@/hooks/useDevice";
import ExperienceMobile from "./mobile/ExperienceMobile";
import ExperienceDesktop from "./ExperienceDesktop";
import ExperienceTablet from "./ExperienceTablet";

export default function Experience() {
    const { isDesktop, isTablet } = useDevice();

    // Device router pattern - explicit component routing
    if (isDesktop) {
        return <ExperienceDesktop />;
    }
    
    if (isTablet) {
        return <ExperienceTablet />;
    }
    
    return <ExperienceMobile />;
}