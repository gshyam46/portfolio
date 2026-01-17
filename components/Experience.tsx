"use client";

import { useIsMobile } from "@/utils/useIsMobile";
import ExperienceMobile from "./mobile/ExperienceMobile";
import ExperienceDesktop from "./ExperienceDesktop";

export default function Experience() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <ExperienceMobile />;
    }

    return <ExperienceDesktop />;
}