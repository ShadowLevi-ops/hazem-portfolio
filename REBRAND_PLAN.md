# Portfolio Rebranding Plan - Amouge-Inspired Professional Design

## Overview

This document outlines the planned changes to transform the portfolio website into a more professional, luxury-inspired design similar to Amouge's aesthetic.

## Design Philosophy

- **Elegant & Sophisticated**: Move away from playful gradients to refined, minimalist design
- **Luxury Typography**: Introduce sophisticated serif fonts for headings
- **Refined Dark Color Palette**: Rich, sophisticated dark tones with muted gold accents (keeping dark theme)
- **Generous Whitespace**: More breathing room for content
- **Professional Messaging**: Update copy to be more business-focused

---

## Changes to Implement

### 1. Typography Enhancement

**Current**: Constantia (sans-serif) for all text
**New**:

- **Headings**: Playfair Display (elegant serif) or similar luxury serif font
- **Body**: Keep clean sans-serif (Inter or system font) for readability
- **Font weights**: Use lighter weights (300-400) for elegance

**Files to modify**:

- `tailwind.config.ts` - Add Google Fonts import
- `src/app/layout.tsx` - Import and configure fonts
- `src/app/globals.css` - Add font family variables

---

### 2. Color Palette Refinement

**Current**: Bright gradients (purple, pink, blue)
**New**:

- **Primary**: Rich dark brown/charcoal tones (oklch(0.25 0.02 30))
- **Accents**: Muted gold/amber accents (oklch(0.65 0.08 75))
- **Background**: Warm off-white (light) / Deep charcoal (dark)
- **Text**: High contrast but softer than current

**Files to modify**:

- `src/app/globals.css` - Update color variables in :root and .dark

---

### 3. Hero Section Redesign

**Current**:

- Playful tagline: "Commercial Grade Vertical Films That Just Works"
- Casual subtitle: "I also made this website from scratch, so yeah."
- Colorful gradient backgrounds
- Stats with icons

**New**:

- **Professional tagline**: "Crafting Visual Narratives Through Photography & Videography"
- **Elegant subtitle**: "Professional visual storytelling for brands and creatives"
- **Subtle background**: Minimal, elegant patterns or solid colors
- **Refined stats**: More sophisticated presentation

**Files to modify**:

- `src/components/animated-hero.tsx` - Complete redesign

---

### 4. Portfolio Section Enhancement

**Current**:

- Gradient text on "My Work" heading
- Colorful filter buttons

**New**:

- **Elegant heading**: Serif font, subtle underline or divider
- **Refined filters**: Minimalist buttons with subtle hover effects
- **Better spacing**: More generous padding and margins

**Files to modify**:

- `src/app/page.tsx` - Update section heading
- `src/components/portfolio-filter.tsx` - Refine button styles

---

### 5. WhatsApp Button Refinement

**Current**: Bright primary color button
**New**:

- More subtle, elegant styling
- Better positioning and sizing
- Professional hover effects

**Files to modify**:

- `src/app/page.tsx` - Update WhatsApp button styling

---

### 6. Overall Layout Improvements

- **Increased spacing**: More padding between sections
- **Refined borders**: Subtle, thin borders instead of heavy shadows
- **Typography hierarchy**: Clear distinction between heading levels
- **Reduced animations**: More subtle, elegant transitions

**Files to modify**:

- `src/components/vertical-carousel.tsx` - Refine card styling
- `src/app/globals.css` - Update global styles

---

### 7. Footer Enhancement

**Current**: Simple copyright text
**New**:

- More professional footer with additional information
- Better typography and spacing

**Files to modify**:

- `src/components/layout/Layout.tsx` - Enhance footer

---

## Technical Implementation Notes

1. **Google Fonts**: Will add Playfair Display via Next.js font optimization
2. **Color System**: Maintain OKLCH color system for better color accuracy
3. **Responsive Design**: All changes will maintain mobile responsiveness
4. **Accessibility**: All changes will maintain WCAG compliance
5. **Performance**: No impact on performance, may improve with optimized fonts

---

## Files That Will Be Modified

1. `tailwind.config.ts` - Font configuration
2. `src/app/layout.tsx` - Font imports
3. `src/app/globals.css` - Color palette and typography
4. `src/components/animated-hero.tsx` - Hero redesign
5. `src/app/page.tsx` - Section headings and WhatsApp button
6. `src/components/portfolio-filter.tsx` - Filter button styling
7. `src/components/vertical-carousel.tsx` - Card styling refinement
8. `src/components/layout/Layout.tsx` - Footer enhancement

---

## Expected Visual Changes

### Before → After

- **Colors**: Bright gradients → Muted, sophisticated tones
- **Typography**: Single font → Elegant serif + clean sans-serif
- **Spacing**: Compact → Generous whitespace
- **Tone**: Playful → Professional & elegant
- **Animations**: Bold → Subtle and refined

---

## Notes

- All existing functionality will be preserved
- No breaking changes to component APIs
- All accessibility features maintained
- Mobile responsiveness preserved
- Performance optimizations maintained
