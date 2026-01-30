# Design Document: Mobile-First Refactor

## Overview

This design document outlines the technical architecture for implementing a comprehensive mobile-first refactor of the Next.js portfolio while preserving the desktop experience. The solution uses explicit device detection and component routing to deliver native experiences across desktop, tablet, and mobile devices.

## Architecture

### Device Detection System

The core architecture centers around a custom `useDevice` hook that provides reliable device detection:

```typescript
interface DeviceInfo {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  width: number;
}

const useDevice = (): DeviceInfo => {
  // Implementation with window resize listeners and SSR handling
}
```

**Breakpoint Strategy:**
- Desktop: ≥ 1280px
- Tablet: ≥ 768px and < 1280px  
- Mobile: < 768px

### Component Architecture

The system implements explicit component routing rather than CSS-only responsive design:

```
components/
├── Experience/
│   ├── Experience.tsx           // Device router
│   ├── ExperienceDesktop.tsx    // Existing desktop code (preserved)
│   ├── ExperienceTablet.tsx     // Hybrid experience
│   └── ExperienceMobile.tsx     // New mobile experience
├── Projects/
│   ├── Projects.tsx             // Device router
│   ├── ProjectsDesktop.tsx      // Existing code (preserved)
│   └── ProjectsMobile.tsx       // New mobile component
└── [other sections follow same pattern]
```

**Device Router Pattern:**
```typescript
const Experience = () => {
  const { isDesktop, isTablet, isMobile } = useDevice();
  
  if (isDesktop) return <ExperienceDesktop />;
  if (isTablet) return <ExperienceTablet />;
  return <ExperienceMobile />;
};
```

## Components and Interfaces

### Core Interfaces

```typescript
interface MobileMotionConfig {
  duration: number;
  easing: string;
  transform: {
    x?: number;
    y?: number;
    scale?: number;
    opacity?: [number, number];
  };
}

interface SwipeNavigationProps {
  items: any[];
  currentIndex: number;
  onSwipe: (direction: 'left' | 'right') => void;
  renderItem: (item: any, index: number) => React.ReactNode;
}

interface ResponsiveSpacing {
  mobile: string;
  tablet: string;
  desktop: string;
}
```

### Mobile Experience Components

**ExperienceMobile Component:**
- Single card display with swipe navigation
- Progress dots for secondary navigation
- State-driven transitions (no scroll hijacking)
- Touch-optimized interaction zones

**ProjectsMobile Component:**
- Maximum 3 visible project cards
- "View More" button for additional projects
- Smaller thumbnails and truncated descriptions
- Simplified animation system

**SkillsMobile Component:**
- Smaller skill icons in grid layout
- Blackhole video background (contained within viewport)
- Glass heading with mobile-appropriate typography
- Compact spacing and padding

### Navigation System

**FloatingNavbar Mobile:**
- Fixed width, centered positioning
- Icon-only navigation acceptable
- Touch-friendly tap targets (minimum 44px)
- No hover effects on touch devices

## Data Models

### Device Context Model

```typescript
interface DeviceContext {
  device: DeviceInfo;
  motionConfig: MobileMotionConfig;
  spacingConfig: ResponsiveSpacing;
  isReducedMotion: boolean;
}
```

### Animation Configuration Model

```typescript
interface AnimationVariants {
  desktop: MotionVariant;
  tablet: MotionVariant;
  mobile: MotionVariant;
}

interface MotionVariant {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit?: Record<string, any>;
  transition: {
    duration: number;
    ease: string;
  };
}
```

### Swipe Navigation State Model

```typescript
interface SwipeState {
  currentIndex: number;
  isTransitioning: boolean;
  direction: 'left' | 'right' | null;
  touchStart: { x: number; y: number } | null;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to eliminate redundancy:

- Device detection properties (2.2, 2.3, 2.4) can be combined into a comprehensive device detection property
- Animation timing properties (1.2, 3.5, 5.3, 8.2, 8.3) can be consolidated into device-specific animation properties
- Typography properties (3.3, 6.2, 6.3) can be combined into a mobile typography consistency property
- Layout constraint properties (4.2, 4.3, 6.1, 6.4, 6.5) can be consolidated into mobile layout optimization properties

### Core Properties

**Property 1: Desktop Experience Preservation**
*For any* desktop screen width (≥ 1280px), the rendered layout, animations, and computed CSS values should remain identical to the original implementation
**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

**Property 2: Device Detection Accuracy**
*For any* screen width, the useDevice hook should return the correct device type (isDesktop for ≥1280px, isTablet for 768-1279px, isMobile for <768px)
**Validates: Requirements 2.2, 2.3, 2.4**

**Property 3: Component Routing Consistency**
*For any* device type detected, the Device_Router should render the corresponding experience component (Desktop, Tablet, or Mobile)
**Validates: Requirements 2.5, 3.1**

**Property 4: Mobile Animation Constraints**
*For any* mobile animation, the duration should be ≤ 0.35s and use only subtle transforms (opacity, scale ≤ 1.04, x/y ≤ 40px)
**Validates: Requirements 3.5, 5.3**

**Property 5: Horizontal Overflow Prevention**
*For any* mobile component, no element should exceed 100vw width or create horizontal scrolling
**Validates: Requirements 4.2, 4.3**

**Property 6: Mobile Navigation Behavior**
*For any* Experience section interaction on mobile, only one card should be visible at a time with swipe-based navigation
**Validates: Requirements 3.2, 5.1, 5.2**

**Property 7: Mobile Typography Consistency**
*For any* mobile text element, font sizes should use fixed values (body: 13-14px, headings: 18-22px) without clamp() functions
**Validates: Requirements 3.3, 6.2, 6.3**

**Property 8: Touch Accessibility**
*For any* interactive element on mobile, the tap target should be minimum 44px and hover effects should be disabled
**Validates: Requirements 7.2, 7.4, 9.3**

**Property 9: Tablet Animation Scaling**
*For any* tablet animation, the motion distance should be scaled between mobile and desktop values (e.g., x: ±60px, duration: 0.45s)
**Validates: Requirements 8.2, 8.3, 8.5**

**Property 10: Reduced Motion Compliance**
*For any* user with reduced motion preferences, animations should be limited to fade-only transitions without transforms
**Validates: Requirements 9.2**

**Property 11: Mobile Layout Optimization**
*For any* mobile section (Projects, Skills, Footer), components should use compact layouts with appropriate sizing and spacing
**Validates: Requirements 6.1, 6.4, 6.5, 10.4, 10.5**

**Property 12: Scroll Behavior Preservation**
*For any* device type, vertical scrolling should remain native without hijacking or scroll traps
**Validates: Requirements 4.5, 8.1, 8.4**

<function_calls>
<invoke name="prework">
<parameter name="featureName">mobile-first-refactor

## Error Handling

### Device Detection Fallbacks

**SSR Compatibility:**
- Default to mobile-first rendering during server-side rendering
- Hydrate with correct device detection on client-side
- Handle window resize events gracefully with debouncing

**Viewport Edge Cases:**
- Handle orientation changes on mobile devices
- Manage zoom level changes that affect breakpoint detection
- Provide fallback for unsupported screen sizes

### Animation Error Handling

**Motion Preference Detection:**
- Gracefully handle missing `prefers-reduced-motion` support
- Provide fallback animations when Framer Motion fails
- Handle animation interruption during device rotation

**Touch Interaction Failures:**
- Fallback to button navigation when swipe gestures fail
- Handle touch event conflicts with native browser gestures
- Provide keyboard navigation alternatives

### Component Rendering Failures

**Lazy Loading Fallbacks:**
- Handle component loading failures gracefully
- Provide skeleton screens during component loading
- Implement error boundaries for device-specific components

**StarCanvas Containment:**
- Disable StarCanvas if viewport containment fails
- Provide static background alternative
- Handle WebGL context loss gracefully

## Testing Strategy

### Dual Testing Approach

The testing strategy combines unit tests for specific examples and edge cases with property-based tests for universal correctness validation.

**Unit Tests:**
- Device detection edge cases (exactly at breakpoints)
- Component rendering with specific viewport sizes
- Animation timing verification with fixed parameters
- Touch interaction simulation with specific gesture patterns
- Error boundary behavior with component failures

**Property-Based Tests:**
- Device detection across random viewport widths (minimum 100 iterations)
- Animation constraint validation across random motion parameters
- Layout constraint verification across random content sizes
- Typography consistency across random text content
- Touch target accessibility across random component configurations

### Property-Based Testing Configuration

**Testing Framework:** Jest with @fast-check/jest for property-based testing
**Minimum Iterations:** 100 per property test
**Test Tagging Format:** `Feature: mobile-first-refactor, Property {number}: {property_text}`

**Example Property Test Structure:**
```typescript
describe('Mobile-First Refactor Properties', () => {
  test('Property 1: Desktop Experience Preservation', () => {
    fc.assert(fc.property(
      fc.integer({ min: 1280, max: 3840 }), // Desktop widths
      (width) => {
        // Test desktop experience preservation
        // Feature: mobile-first-refactor, Property 1: Desktop Experience Preservation
      }
    ), { numRuns: 100 });
  });
});
```

### Integration Testing

**Cross-Device Validation:**
- Test component routing across all device types
- Verify animation consistency between device transitions
- Validate scroll behavior preservation across breakpoints

**Performance Testing:**
- Monitor bundle size impact of device-specific components
- Validate animation performance on lower-end devices
- Test memory usage during device orientation changes

**Accessibility Testing:**
- Verify touch target sizes across all interactive elements
- Test reduced motion preference handling
- Validate keyboard navigation alternatives

### Visual Regression Testing

**Desktop Preservation:**
- Capture baseline screenshots of desktop experience
- Compare post-refactor desktop rendering pixel-by-pixel
- Validate computed CSS values match original implementation

**Mobile Optimization:**
- Verify mobile layouts meet design specifications
- Test typography scaling and truncation behavior
- Validate component sizing and spacing consistency