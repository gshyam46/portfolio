"use client";

import { useDevice } from "@/hooks/useDevice";
import FooterMobile from "./mobile/FooterMobile";
import FooterDesktop from "./FooterDesktop";

const Footer = () => {
  const { isDesktop, isTablet } = useDevice();

  // Device router pattern - explicit component routing
  if (isDesktop) {
    return <FooterDesktop />;
  }
  
if (isTablet) {
    // For tablet, use desktop component for now
    return <FooterDesktop />;
  }
  
  return <FooterMobile />;
};

export default Footer;