"use client";

import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  width: number;
}

export const useDevice = (): DeviceInfo => {
  // Default to mobile-first for SSR compatibility
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isDesktop: false,
    isTablet: false,
    isMobile: true,
    width: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateDeviceInfo = () => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      
      setDeviceInfo({
        isDesktop: width >= 1280,
        isTablet: width >= 768 && width < 1280,
        isMobile: width < 768,
        width,
      });
    };

    // Initial check
    updateDeviceInfo();

    // Debounced resize handler to prevent excessive updates
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, 100);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', updateDeviceInfo);
      clearTimeout(timeoutId);
    };
  }, []);

  // Return mobile-first defaults during SSR
  if (!mounted) {
    return {
      isDesktop: false,
      isTablet: false,
      isMobile: true,
      width: 0,
    };
  }

  return deviceInfo;
};