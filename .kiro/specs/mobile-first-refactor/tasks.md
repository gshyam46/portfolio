# Implementation Plan: Mobile-First Refactor

## Overview

This implementation plan breaks down the mobile-first refactor into discrete coding tasks that build incrementally. Each task focuses on specific components while preserving the desktop experience and adding mobile optimization. The approach prioritizes core functionality first, followed by comprehensive testing and refinement.

## Tasks

- [x] 1. Set up device detection system and global mobile fixes
  - Create useDevice hook with SSR-safe implementation
  - Add global overflow-x: hidden to prevent horizontal scrolling
  - Implement useReducedMotion hook for accessibility
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.1, 9.1_

- [ ]* 1.1 Write property test for device detection accuracy
  - **Property 2: Device Detection Accuracy**
  - **Validates: Requirements 2.2, 2.3, 2.4**

- [x] 2. Create Experience section mobile components
  - [x] 2.1 Create ExperienceMobile component with swipe navigation
    - Implement single card display with touch gestures
    - Add progress dots for secondary navigation
    - Use state-driven transitions (no scroll hijacking)
    - _Requirements: 3.2, 5.1, 5.2, 5.4_

  - [x] 2.2 Create ExperienceTablet component with hybrid approach
    - Implement reduced motion distances (x: ±60px)
    - Use 0.45s animation duration for smoother transitions
    - Maintain normal vertical scrolling
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 2.3 Update Experience.tsx with device routing
    - Implement device router pattern
    - Preserve existing ExperienceDesktop component unchanged
    - _Requirements: 2.5, 3.1_

- [ ]* 2.4 Write property test for mobile navigation behavior
  - **Property 6: Mobile Navigation Behavior**
  - **Validates: Requirements 3.2, 5.1, 5.2**

- [ ]* 2.5 Write property test for component routing consistency
  - **Property 3: Component Routing Consistency**
  - **Validates: Requirements 2.5, 3.1**

- [x] 3. Implement mobile Projects section
  - [x] 3.1 Create ProjectsMobile component
    - Display maximum 3 visible project cards
    - Add "View More" button functionality
    - Implement smaller thumbnails and truncated descriptions
    - Use simplified animations (no complex transforms)
    - _Requirements: 6.1, 10.2_

  - [x] 3.2 Update Projects.tsx with device routing
    - Preserve existing ProjectsDesktop component
    - Route to appropriate component based on device
    - _Requirements: 2.5_

- [ ]* 3.3 Write property test for mobile layout optimization
  - **Property 11: Mobile Layout Optimization**
  - **Validates: Requirements 6.1, 10.2**

- [x] 4. Fix StarCanvas and implement mobile Skills section
  - [x] 4.1 Fix StarCanvas horizontal overflow issues
    - Contain StarCanvas within 100vw on all devices
    - Implement fallback if containment fails
    - Ensure desktop behavior remains unchanged
    - _Requirements: 4.2, 4.4_

  - [x] 4.2 Create SkillsMobile component
    - Add Glass_Heading component for mobile
    - Display blackhole video background above skills content
    - Implement smaller skill icons in compact grid layout
    - Use mobile-appropriate spacing and typography
    - _Requirements: 6.3, 6.4, 10.3, 10.4_

  - [x] 4.3 Update Skills.tsx with device routing
    - Preserve existing desktop Skills component
    - Route to mobile component on mobile devices
    - _Requirements: 2.5_

- [ ]* 4.4 Write property test for horizontal overflow prevention
  - **Property 5: Horizontal Overflow Prevention**
  - **Validates: Requirements 4.2, 4.3**

- [ ] 5. Checkpoint - Test core mobile functionality
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement mobile typography and spacing system
  - [x] 6.1 Create responsive spacing utilities
    - Implement clamp() functions that resolve to same desktop values
    - Create mobile-specific fixed spacing values
    - Update global CSS with responsive spacing system
    - _Requirements: 1.3, 1.5_

  - [x] 6.2 Implement mobile typography system
    - Create fixed mobile font sizes (body: 13-14px, headings: 18-22px)
    - Update Glass_Heading component for mobile scaling
    - Implement text truncation patterns for mobile
    - _Requirements: 3.3, 6.2, 6.3_

- [ ]* 6.3 Write property test for mobile typography consistency
  - **Property 7: Mobile Typography Consistency**
  - **Validates: Requirements 3.3, 6.2, 6.3**

- [x] 7. Implement mobile Publications and Certifications
  - [x] 7.1 Create mobile Publications component
    - Use smaller fonts and aggressive text truncation
    - Implement compact card layout
    - Add Glass_Heading for consistency
    - _Requirements: 6.2, 10.4_

  - [x] 7.2 Create mobile Certifications component
    - Use compact layout with smaller fonts
    - Implement accordion or collapsible pattern
    - Reduce vertical spacing for mobile
    - _Requirements: 6.2, 10.4_

  - [x] 7.3 Update Publications.tsx and Certifications.tsx with device routing
    - Preserve existing desktop components
    - Route to mobile components on mobile devices
    - _Requirements: 2.5_

- [x] 8. Implement mobile navigation and UI elements
  - [x] 8.1 Update FloatingNavbar for mobile
    - Implement fixed-width, centered positioning
    - Ensure minimum 44px tap targets
    - Disable hover effects on touch devices
    - _Requirements: 7.1, 7.2, 7.4_

  - [x] 8.2 Update Contact section for mobile
    - Ensure "View Resume" button is fully usable on mobile
    - Implement appropriate sizing and touch targets
    - Constrain hero text with max-width: 90vw
    - _Requirements: 7.3_

  - [x] 8.3 Create mobile Footer component
    - Implement compact, content-only layout
    - Remove large vertical padding
    - Use mobile-appropriate font sizes and spacing
    - _Requirements: 6.5_

- [ ]* 8.4 Write property test for touch accessibility
  - **Property 8: Touch Accessibility**
  - **Validates: Requirements 7.2, 7.4, 9.3**

- [ ] 9. Implement mobile animation system
  - [ ] 9.1 Create mobile motion configuration
    - Define mobile animation constraints (≤0.35s duration)
    - Implement subtle transforms (opacity, scale ≤1.04, x/y ≤40px)
    - Create easeOut timing functions for mobile
    - _Requirements: 3.5, 5.3_

  - [ ] 9.2 Implement reduced motion support
    - Update all animations to respect reduced motion preferences
    - Provide fade-only alternatives when reduced motion is enabled
    - Ensure accessibility compliance
    - _Requirements: 9.2_

  - [ ] 9.3 Update tablet animation scaling
    - Implement intermediate motion values for tablet (x: ±60px, 0.45s duration)
    - Scale animations appropriately between mobile and desktop
    - _Requirements: 8.2, 8.3, 8.5_

- [ ]* 9.4 Write property test for mobile animation constraints
  - **Property 4: Mobile Animation Constraints**
  - **Validates: Requirements 3.5, 5.3**

- [ ]* 9.5 Write property test for tablet animation scaling
  - **Property 9: Tablet Animation Scaling**
  - **Validates: Requirements 8.2, 8.3, 8.5**

- [ ]* 9.6 Write property test for reduced motion compliance
  - **Property 10: Reduced Motion Compliance**
  - **Validates: Requirements 9.2**

- [ ] 10. Final integration and testing
  - [ ] 10.1 Implement scroll behavior preservation
    - Ensure vertical scrolling remains native across all devices
    - Remove any scroll hijacking or scroll traps
    - Test scroll behavior on all device types
    - _Requirements: 4.5, 8.1, 8.4_

  - [ ] 10.2 Validate desktop experience preservation
    - Run comprehensive comparison tests
    - Ensure pixel-identical desktop appearance
    - Verify animation timing and behavior unchanged
    - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [ ]* 10.3 Write property test for desktop experience preservation
  - **Property 1: Desktop Experience Preservation**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

- [ ]* 10.4 Write property test for scroll behavior preservation
  - **Property 12: Scroll Behavior Preservation**
  - **Validates: Requirements 4.5, 8.1, 8.4**

- [ ] 11. Final checkpoint - Comprehensive testing
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Desktop components must remain completely unchanged
- Mobile components should be implemented as separate files, not conditional logic
- Property tests validate universal correctness properties across random inputs
- Unit tests validate specific examples and edge cases
- All animations must respect reduced motion preferences
- Touch targets must be minimum 44px on mobile devices