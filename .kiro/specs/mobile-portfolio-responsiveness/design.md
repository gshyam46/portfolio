# Design Document

## Overview

This design outlines the implementation of comprehensive mobile and tablet responsiveness for a Next.js + React + Framer Motion portfolio website. The core principle is preserving the existing desktop experience pixel-perfectly while creating optimized mobile and tablet experiences through device-specific component architectures.

The solution employs a device-routing strategy where separate component implementations handle different screen sizes, avoiding CSS-only responsive approaches that could compromise the desktop experience. Each device category (desktop ≥1280px, tablet 768-1279px, mobile <768px) receives tailored motion systems, layouts, and interaction patterns.

## Architecture

### Device Detection System

The architecture centers around a custom `useDevice` hook that provides reliable device detection:

```typescript
interface DeviceState {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  width: number;
}

const useDevice = (): DeviceState => {
  // Implementation with window resize listeners
  // Desktop: ≥ 1280px
  // Tablet: ≥ 768px and < 1280px  
  // Mobile: < 768px
}
```

### Component Architecture Pattern

Each major section follows a consistent architecture pattern:

```
components/
├── Experience/
│   ├── Experience.tsx           // Device router
│   ├── Experience.desktop.tsx   // Existing desktop logic (unchanged)
│   ├── Experience.tablet.tsx    // Hybrid tablet experience
│   └── Experience.mobile.tsx    // Touch-optimized mobile experience
├── Projects/
│   ├── Projects.tsx
│   ├── Projects.desktop.tsx
│   ├── Projects.tablet.tsx
│   └── Projects.mobile.tsx
└── [Other sections follow same pattern]
```

### Device Router Implementation

Each section's main component acts as a device router:

```typescript
export default function Experience() {
  const { isDesktop, isTablet, isMobile } = useDevice();
  
  if (isDesktop) return <ExperienceDesktop />;
  if (isTablet) return <ExperienceTablet />;
  return <ExperienceMobile />;
}
```

## Components and Interfaces

### Core Hook Interface

```typescript
// hooks/useDevice.ts
export interface DeviceState {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  width: number;
  height: number;
}

export const useDevice = (): DeviceState;
```

### Responsive Spacing System

```typescript
// utils/responsive.ts
export interface ResponsiveSpacing {
  mobile: string;
  tablet: string;
  desktop: string;
}

export const createResponsiveSpacing = (
  mobile: number,
  tablet: number,
  desktop: number
): string => {
  return `clamp(${mobile}px, ${(tablet/768)*100}vw, ${desktop}px)`;
};

// Typography scaling
export const responsiveText = {
  body: "clamp(0.95rem, 3vw, 1.05rem)",
  heading: "clamp(1.3rem, 6vw, 2.2rem)",
  hero: "clamp(2rem, 8vw, 4rem)"
};
```

### Motion System Interfaces

```typescript
// types/motion.ts
export interface MotionVariants {
  desktop: Variants;
  tablet: Variants;
  mobile: Variants;
}

export interface DeviceMotionConfig {
  duration: number;
  ease: string | number[];
  stiffness?: number;
  damping?: number;
}

export const motionConfigs: Record<string, DeviceMotionConfig> = {
  desktop: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  tablet: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  mobile: { duration: 0.3, ease: "easeOut" }
};
```

### Gesture Navigation Interface

```typescript
// components/mobile/GestureNavigation.ts
export interface GestureNavigationProps {
  items: any[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  renderItem: (item: any, index: number) => React.ReactNode;
}

export interface SwipeConfig {
  threshold: number;
  velocity: number;
  resistance: number;
}
```

## Data Models

### Device Breakpoints

```typescript
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1280,
  desktop: 1280
} as const;

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
```

### Component State Models

```typescript
// Mobile Experience State
export interface MobileExperienceState {
  currentIndex: number;
  isTransitioning: boolean;
  swipeDirection: 'left' | 'right' | null;
  touchStart: { x: number; y: number } | null;
}

// Desktop Experience State (preserved)
export interface DesktopExperienceState {
  currentIndex: number;
  direction: number;
  scrollProgress: MotionValue<number>;
  // ... existing desktop state
}
```

### Content Adaptation Models

```typescript
export interface ContentAdaptation {
  desktop: {
    itemsPerView: number;
    truncateLength?: number;
    showAllFeatures: boolean;
  };
  tablet: {
    itemsPerView: number;
    truncateLength?: number;
    showAllFeatures: boolean;
  };
  mobile: {
    itemsPerView: number;
    truncateLength: number;
    showAllFeatures: boolean;
  };
}

// Example for Projects section
export const projectsConfig: ContentAdaptation = {
  desktop: { itemsPerView: 3, showAllFeatures: true },
  tablet: { itemsPerView: 2, showAllFeatures: true },
  mobile: { itemsPerView: 1, truncateLength: 100, showAllFeatures: false }
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

After analyzing the acceptance criteria, I've identified the following testable properties that will ensure the mobile responsiveness implementation meets all requirements:

### Desktop Experience Preservation Properties

**Property 1: Desktop Layout Preservation**
*For any* desktop viewport (≥ 1280px), all element positions and dimensions should remain identical to the original implementation
**Validates: Requirements 1.1, 1.4**

**Property 2: Desktop Animation Consistency**
*For any* desktop animation trigger, the motion system should use the exact original timing, easing, and transform values
**Validates: Requirements 1.2**

**Property 3: Desktop Scroll Behavior Preservation**
*For any* desktop scroll interaction, the scroll mathematics and resulting transformations should produce identical results to the original implementation
**Validates: Requirements 1.3**

**Property 4: Responsive Spacing Desktop Resolution**
*For any* clamp() function at desktop breakpoints, the resolved pixel value should match the original static value
**Validates: Requirements 1.5**

### Device Detection Properties

**Property 5: Device Hook Interface Consistency**
*For any* call to useDevice hook, it should return an object with isDesktop, isTablet, and isMobile boolean properties
**Validates: Requirements 2.1**

**Property 6: Breakpoint Logic Accuracy**
*For any* screen width, the device detection should correctly set exactly one device type to true based on the defined breakpoints (mobile <768px, tablet 768-1279px, desktop ≥1280px)
**Validates: Requirements 2.2, 2.3, 2.4**

### Mobile Experience Properties

**Property 7: Mobile Component Separation**
*For any* mobile section, it should render from a separate component file and display different content structure than desktop
**Validates: Requirements 3.1**

**Property 8: Mobile Single Card Display**
*For any* mobile experience section, only one card should be visible at a time
**Validates: Requirements 3.2**

**Property 9: Mobile Gesture Navigation**
*For any* swipe gesture on mobile, it should trigger a card transition with the correct direction
**Validates: Requirements 3.3**

**Property 10: Mobile Progress Indicators**
*For any* mobile card section, progress dots should be rendered and functional for navigation
**Validates: Requirements 3.4**

### Mobile Motion System Properties

**Property 11: Mobile Entry Animation**
*For any* first card entering view on mobile, it should animate with opacity 0→1, scale 0.96→1, y 12→0 over 0.35s with easeOut timing
**Validates: Requirements 4.1**

**Property 12: Mobile Card Transitions**
*For any* mobile card transition, it should animate x ±40px and opacity 0→1 over 0.3s with easeOut timing
**Validates: Requirements 4.2**

**Property 13: Mobile Animation Constraints**
*For any* mobile animation, it should not include exit animations, parallax effects, or scroll-hijacking mechanisms
**Validates: Requirements 4.3, 4.4, 4.5**

### Tablet Experience Properties

**Property 14: Tablet Navigation Behavior**
*For any* tablet experience, it should use standard vertical scroll navigation without scroll hijacking
**Validates: Requirements 5.1, 5.4**

**Property 15: Tablet Motion Parameters**
*For any* tablet animation, it should use reduced motion distances (x: ±60px, duration: 0.45s) while preserving horizontal transitions
**Validates: Requirements 5.2, 5.3**

### Responsive Spacing Properties

**Property 16: Static Value Conversion**
*For any* static margin/padding value in the original code, it should be converted to a clamp() function using viewport-aware units
**Validates: Requirements 6.1, 6.2**

**Property 17: Typography Scaling**
*For any* text element, it should use clamp() for font-size to ensure responsive scaling
**Validates: Requirements 6.3**

**Property 18: Content Width Constraints**
*For any* content container, it should respect the device-appropriate width constraints (mobile: 34ch, desktop: 60ch)
**Validates: Requirements 6.4**

### Accessibility and Touch Optimization Properties

**Property 19: Touch Target Sizing**
*For any* interactive element on mobile, it should have a minimum tap target size of 44px
**Validates: Requirements 7.1**

**Property 20: Reduced Motion Support**
*For any* animation when reduced motion is preferred, it should disable transforms and use fade-only animations
**Validates: Requirements 7.2**

**Property 21: Touch Device Optimization**
*For any* touch device, hover effects should be disabled and gestures should not conflict with native browser gestures
**Validates: Requirements 7.3, 7.4**

### Content Adaptation Properties

**Property 22: Mobile Content Optimization**
*For any* mobile card, it should use smaller fonts, truncated content, and display fewer items than desktop
**Validates: Requirements 8.1, 8.2**

**Property 23: Mobile Layout Constraints**
*For any* mobile layout element (star canvas, footer, buttons), it should be constrained to prevent overflow and maintain appropriate sizing
**Validates: Requirements 8.3, 8.4, 8.5**

### Performance and Quality Properties

**Property 24: Animation Performance**
*For any* running animation, it should maintain 60fps performance across all device types
**Validates: Requirements 9.2**

**Property 25: Loading Performance**
*For any* mobile experience load, it should complete within 3 seconds under 3G network conditions
**Validates: Requirements 9.3**

**Property 26: Code Quality Standards**
*For any* component file, it should be production-ready without TODO comments, placeholders, or incomplete implementations
**Validates: Requirements 9.4**

### Architecture Properties

**Property 27: Component File Structure**
*For any* experience section, it should have separate .desktop.tsx, .mobile.tsx, and .tablet.tsx files with proper device routing
**Validates: Requirements 10.1, 10.2**

**Property 28: Code Documentation and Separation**
*For any* device-specific component, it should include explanatory comments and maintain clear separation from other device implementations
**Validates: Requirements 10.3, 10.4, 10.5**

<function_calls>
<invoke name="prework">
<parameter name="featureName">mobile-portfolio-responsiveness

## Error Handling

### Device Detection Fallbacks

The system implements graceful degradation when device detection fails:

```typescript
const useDevice = (): DeviceState => {
  const [deviceState, setDeviceState] = useState<DeviceState>({
    isDesktop: true, // Default to desktop for safety
    isTablet: false,
    isMobile: false,
    width: 1280, // Safe default
    height: 720
  });

  useEffect(() => {
    const handleResize = () => {
      try {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        setDeviceState({
          isDesktop: width >= BREAKPOINTS.desktop,
          isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.desktop,
          isMobile: width < BREAKPOINTS.mobile,
          width,
          height
        });
      } catch (error) {
        console.warn('Device detection failed, using desktop fallback');
        // Maintain desktop default
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceState;
};
```

### Animation Error Handling

Motion components include error boundaries and fallback states:

```typescript
const SafeMotionComponent = ({ children, fallback, ...motionProps }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback || <div className="motion-fallback">{children}</div>;
  }

  return (
    <motion.div
      {...motionProps}
      onAnimationComplete={() => setHasError(false)}
      onError={() => setHasError(true)}
    >
      {children}
    </motion.div>
  );
};
```

### Touch Event Error Handling

Gesture navigation includes comprehensive error handling:

```typescript
const handleTouchStart = (e: TouchEvent) => {
  try {
    const touch = e.touches[0];
    if (!touch) return;
    
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  } catch (error) {
    console.warn('Touch start failed:', error);
    // Continue without gesture tracking
  }
};

const handleTouchEnd = (e: TouchEvent) => {
  try {
    if (!touchStart) return;
    
    const touch = e.changedTouches[0];
    if (!touch) return;
    
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    // Validate gesture before processing
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (Math.abs(deltaY) > Math.abs(deltaX)) return; // Vertical scroll
    
    onSwipe(deltaX > 0 ? 'right' : 'left');
  } catch (error) {
    console.warn('Touch end failed:', error);
  } finally {
    setTouchStart(null);
  }
};
```

### Performance Monitoring

The system includes performance monitoring and degradation:

```typescript
const usePerformanceMonitor = () => {
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        if (fps < 30) {
          setPerformanceMode('low');
        } else if (fps < 50) {
          setPerformanceMode('medium');
        } else {
          setPerformanceMode('high');
        }
      }
      
      requestAnimationFrame(checkPerformance);
    };

    requestAnimationFrame(checkPerformance);
  }, []);

  return performanceMode;
};
```

## Testing Strategy

### Dual Testing Approach

The implementation requires both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests:**
- Specific device breakpoint scenarios
- Component rendering with different device states
- Animation trigger conditions
- Touch gesture edge cases
- Error boundary behaviors

**Property-Based Tests:**
- Device detection across random viewport sizes
- Animation consistency across multiple triggers
- Responsive spacing calculations with various inputs
- Touch gesture recognition with random coordinates
- Performance characteristics under different loads

### Testing Framework Configuration

The project uses Jest with React Testing Library for unit tests and fast-check for property-based testing:

```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx)',
    '**/*.(test|spec).(ts|tsx)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};

// Property-based test configuration
const propertyTestConfig = {
  numRuns: 100, // Minimum iterations per property
  timeout: 5000,
  verbose: true
};
```

### Test Categories

**Device Detection Tests:**
- Unit tests for specific breakpoint values
- Property tests for random viewport dimensions
- Edge case tests for window resize events

**Animation Tests:**
- Unit tests for specific animation sequences
- Property tests for animation consistency across devices
- Performance tests for frame rate maintenance

**Responsive Layout Tests:**
- Unit tests for specific spacing calculations
- Property tests for clamp() function behavior
- Visual regression tests for layout preservation

**Accessibility Tests:**
- Unit tests for reduced motion preferences
- Property tests for touch target sizing
- Keyboard navigation functionality tests

**Performance Tests:**
- Load time measurements under simulated network conditions
- Animation performance monitoring
- Memory usage tracking during device switches

Each property-based test must be tagged with the format: **Feature: mobile-portfolio-responsiveness, Property {number}: {property_text}** to ensure traceability to the design document properties.