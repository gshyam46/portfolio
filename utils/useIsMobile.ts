import { useState, useEffect } from 'react';

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 767px)').matches);
        };

        // Check on mount
        checkMobile();

        // Add listener
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    return isMobile;
};
