# DESIGN SYSTEM & ASSET SPECIFICATIONS

## 1. PIXEL ART COLOR PALETTE

### Primary Colors

#### Cyan (#00d4aa)
**Usage:** Primary CTAs, main highlights, active states, focus indicators
```css
--pixel-cyan: #00d4aa;
RGB: 0, 212, 170
HSL: 162°, 100%, 41%
```
- Primary buttons
- Active navigation links
- Focus borders
- Section headers
- Hover states

#### Cyan Dark (#00a884)
**Usage:** Borders, secondary accents, button shadows
```css
--pixel-cyan-dark: #00a884;
RGB: 0, 168, 132
HSL: 162°, 100%, 33%
```
- Border colors
- Box shadows (dark)
- Hover darken effect
- Inactive states

#### Cyan Light (#4de8c8)
**Usage:** Lighter accents, additional hover states
```css
--pixel-cyan-light: #4de8c8;
RGB: 77, 232, 200
HSL: 164°, 79%, 60%
```
- Light hover states
- Text shadows
- Glow effects
- Secondary highlights

### Background Colors

#### Primary Dark (#050508)
**Usage:** Main page background
```css
--pixel-darker: #050508;
RGB: 5, 5, 8
HSL: 240°, 23%, 2.5%
```
- Page background
- Dark panels
- Overlay backgrounds

#### Secondary Dark (#0a0a12)
**Usage:** Alternate sections, secondary backgrounds
```css
--pixel-dark: #0a0a12;
RGB: 10, 10, 18
HSL: 240°, 28%, 5.5%
```
- Alternate section backgrounds
- Card backgrounds
- Gradients

#### Gray (#1a1a2e)
**Usage:** Card backgrounds, panels
```css
--pixel-gray: #1a1a2e;
RGB: 26, 26, 46
HSL: 240°, 28%, 14%
```
- Card backgrounds
- Panel backgrounds
- Section backgrounds

#### Gray Light (#2d2d44)
**Usage:** Hover states, borders, lighter cards
```css
--pixel-gray-light: #2d2d44;
RGB: 45, 45, 68
HSL: 240°, 20%, 22%
```
- Hover state backgrounds
- Border colors
- Nested card backgrounds

### Accent Colors

#### Gold (#ffd93d)
**Usage:** Special highlights, warnings, emphasis
```css
--pixel-gold: #ffd93d;
RGB: 255, 217, 61
HSL: 45°, 100%, 62%
```
- "Featured" badges
- Warning messages
- Special callouts
- Emphasis text

#### Red (#ff6b6b)
**Usage:** Error states, warnings, danger actions
```css
--pixel-red: #ff6b6b;
RGB: 255, 107, 107
HSL: 0°, 100%, 71%
```
- Error messages
- Warning states
- Destructive actions
- Alert indicators

### Text Colors

#### Primary Text (#e8e8f0)
**Usage:** Main body text, headings
```css
--pixel-white: #e8e8f0;
RGB: 232, 232, 240
HSL: 240°, 27%, 93%
```
- Headings
- Body text
- Primary labels

#### Secondary Text (70% opacity)
```css
rgba(232, 232, 240, 0.7)
```
- Secondary descriptions
- Placeholder text
- Date/time stamps

#### Tertiary Text (50% opacity)
```css
rgba(232, 232, 240, 0.5)
```
- Disabled text
- Hints
- Metadata

### Semantic Colors

```css
/* Success */
--success: #4ade80;
RGB: 74, 222, 128
HSL: 132°, 65%, 58%

/* Info/Primary */
--info: #00d4aa;  /* Cyan */

/* Warning */
--warning: #ffd93d;  /* Gold */

/* Error */
--error: #ff6b6b;  /* Red */
```

---

## 2. TYPOGRAPHY SYSTEM

### Font Stack

```css
:root {
  --font-pixel: 'Press Start 2P', cursive;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               sans-serif;
  --font-mono: 'Monaco', 'Courier New', monospace;
}
```

### Type Hierarchy

```
┌─────────────────────────────────────────────────────┐
│ H1 - clamp(1.5rem, 4vw, 2.5rem)   ← Main headings  │
├─────────────────────────────────────────────────────┤
│ H2 - clamp(1.2rem, 3vw, 2rem)     ← Section titles  │
├─────────────────────────────────────────────────────┤
│ H3 - clamp(1rem, 2vw, 1.5rem)     ← Subsections    │
├─────────────────────────────────────────────────────┤
│ Body - 1rem (16px)                ← Default text    │
├─────────────────────────────────────────────────────┤
│ Small - 0.875rem (14px)           ← Metadata       │
├─────────────────────────────────────────────────────┤
│ Tiny - 0.75rem (12px)             ← Labels, hints  │
└─────────────────────────────────────────────────────┘
```

### Heading Specifications

```css
h1 {
  font-family: var(--font-pixel);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 400;  /* Press Start 2P only has 400 */
  line-height: 1.2;
  letter-spacing: 0.05em;
  color: var(--pixel-cyan);
  text-shadow: 0 0 20px rgba(0, 212, 170, 0.5);
  margin-bottom: 1rem;
}

h2 {
  font-family: var(--font-pixel);
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.03em;
  color: var(--pixel-white);
  margin-bottom: 0.75rem;
}

h3 {
  font-family: var(--font-pixel);
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 400;
  line-height: 1.3;
  color: var(--pixel-white);
  margin-bottom: 0.5rem;
}

body {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  color: var(--pixel-white);
}

small {
  font-size: 0.875rem;
  color: rgba(232, 232, 240, 0.6);
}
```

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 3. SPACING & LAYOUT SYSTEM

### Base Unit
```
1 unit = 8px
spacing scale: 0.5, 1, 1.5, 2, 3, 4, 6, 8 units
```

### Spacing Scale

```css
/* Padding/Margin */
--space-xs: 0.5rem;    /* 4px  */
--space-sm: 0.75rem;   /* 6px  */
--space-md: 1rem;      /* 8px  */
--space-lg: 1.5rem;    /* 12px */
--space-xl: 2rem;      /* 16px */
--space-2xl: 3rem;     /* 24px */
--space-3xl: 4rem;     /* 32px */
--space-4xl: 6rem;     /* 48px */
```

### Common Spacing Patterns

```css
/* Content container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;  /* .grid__pad on desktop, 1rem on mobile */
}

/* Section spacing */
section {
  padding: 6rem 2rem;  /* Vertical: 48px, Horizontal: 16px */
}

@media (max-width: 768px) {
  section {
    padding: 3rem 1rem;
  }
}

/* Card padding */
.card {
  padding: 2rem;  /* 16px on all sides */
}

/* Gap between items */
.grid {
  display: grid;
  gap: 2rem;  /* 16px between items */
}

/* Flex spacing */
.flex {
  display: flex;
  gap: 1rem;  /* 8px between flex items */
}
```

### Layout Grid

```css
/* Desktop */
@media (min-width: 1200px) {
  .grid-6-col {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .grid-4-col {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .grid-3-col {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .grid-2-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Tablet */
@media (max-width: 1199px) and (min-width: 768px) {
  .grid-6-col,
  .grid-4-col {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-3-col {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .grid-2-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 767px) {
  .grid-6-col,
  .grid-4-col,
  .grid-3-col,
  .grid-2-col {
    grid-template-columns: 1fr;
  }
}
```

---

## 4. COMPONENT SPECIFICATIONS

### Buttons

```css
/* Primary Button */
.btn.primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: var(--pixel-cyan);
  color: var(--pixel-darker);
  font-family: var(--font-pixel);
  font-size: 0.6rem;  /* Smaller for pixel font */
  font-weight: 400;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow:
    -3px 0 0 0 var(--pixel-cyan-dark),
    3px 0 0 0 var(--pixel-cyan-dark),
    0 -3px 0 0 var(--pixel-cyan-dark),
    0 3px 0 0 var(--pixel-cyan-dark);
}

.btn.primary:hover {
  background: var(--pixel-cyan-light);
  transform: translateY(-2px);
}

.btn.primary:active {
  transform: translateY(1px);
}

/* Secondary Button */
.btn.secondary {
  background: transparent;
  color: var(--pixel-cyan);
  border: 2px solid var(--pixel-cyan);
}

.btn.secondary:hover {
  background: var(--pixel-cyan);
  color: var(--pixel-darker);
}

/* Tertiary Button */
.btn.tertiary {
  background: transparent;
  color: var(--pixel-white);
  border: 2px solid var(--pixel-gray-light);
}

.btn.tertiary:hover {
  border-color: var(--pixel-cyan);
  color: var(--pixel-cyan);
}
```

### Cards

```css
.card {
  background: var(--pixel-gray);
  border: 2px solid var(--pixel-gray-light);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--pixel-cyan);
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 212, 170, 0.2);
}

.card.featured {
  border-color: var(--pixel-cyan);
  background: linear-gradient(135deg, 
    rgba(0, 212, 170, 0.05) 0%, 
    transparent 100%);
}
```

### Form Elements

```css
input,
textarea,
select {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 0.75rem 1rem;
  background: var(--pixel-darker);
  color: var(--pixel-white);
  border: 2px solid var(--pixel-gray-light);
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--pixel-cyan);
  box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
}

input::placeholder {
  color: rgba(232, 232, 240, 0.5);
}
```

---

## 5. ASSET REQUIREMENTS

### Image Assets

```
Directory: public/assets/images/

Logo & Branding:
  - fivesaw-avatar.png (200×200px) - Profile avatar
  - fivesaw-logo.png (NOT YET) - Brand mark
  - sawclient-banner.png (400×600px) - Product banner

Feature Screenshots:
  - sawclient-hud.png (1920×1080px) - HUD showcase
  - sawclient-terrain.png (1920×1080px) - Terrain demo
  - sawclient-gameplay.png (1920×1080px) - Gameplay

Unused (candidate for removal):
  - hero-floating-islands.png
  - hero-palm-island.png
  - hero-sunset-mountains.png

Gallery Images: (to be created)
  - sawclient-shot-01.png
  - sawclient-shot-02.png
  - sawclient-shot-03.png
  - etc...

Recommended WebP versions:
  - *.webp (for modern browsers)
  - Keep PNG as fallback
```

### Icon Set

```
Required SVGs (inline or as files):

Navigation:
  ✓ Menu/Hamburger
  ✓ Close (X)
  ✓ Chevron/Arrow

Social:
  ✓ Discord
  ✓ YouTube
  ← GitHub (missing)
  ← Twitter/X (missing)
  ← Twitch (if applicable)

Feature Icons:
  ✓ FPS Display (monitor)
  ✓ CPS Display (clock)
  ✓ Input Recorder (record button)
  ✓ ClickGUI (settings)

Navigation/Status:
  ✓ Download
  ✓ External link
  ✓ Check/Success
  ✓ Alert/Warning
  ✓ Settings/Gear
```

### Animation Guidelines

```css
/* Smooth animations */
--transition-fast: 0.15s ease;     /* Quick interactions */
--transition-normal: 0.3s ease;    /* Standard actions */
--transition-slow: 0.5s ease;      /* Large movements */

/* Easing functions */
easing-in: cubic-bezier(0.4, 0, 1, 1)
easing-out: cubic-bezier(0, 0, 0.2, 1)
easing-in-out: cubic-bezier(0.4, 0, 0.2, 1)

/* Use transform for performance */
transform: translateY(-2px);
transform: scale(1.05);
transform: rotate(45deg);

/* Avoid animating: */
/* ✗ width, height, top, left */
/* ✗ border, padding, margin */
/* ✓ transform, opacity, filter */
```

---

## 6. RESPONSIVE BREAKPOINTS

```css
/* Mobile First */

/* Large phones: 480px and up */
@media (min-width: 480px) { }

/* Tablets: 768px and up */
@media (min-width: 768px) { }

/* Small laptops: 1024px and up */
@media (min-width: 1024px) { }

/* Desktops: 1200px and up */
@media (min-width: 1200px) { }

/* Large desktops: 1400px and up */
@media (min-width: 1400px) { }

/* Landscape orientation */
@media (orientation: landscape) and (max-height: 750px) { }
```

### Proposed Component Responsive Adjustments

```css
/* Example: Hero Section */

/* Mobile */
.hero {
  padding: 2rem 1rem;
  min-height: 100vh;
}

.hero-title {
  font-size: 1.5rem;
}

/* Tablet */
@media (min-width: 768px) {
  .hero {
    padding: 4rem 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero {
    padding: 6rem 4rem;
    display: flex;
    gap: 4rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
}
```

---

## 7. ACCESSIBILITY SPECIFICATIONS

### Color Contrast

```
WCAG AA Standards:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio

Current implementation:
- Cyan (#00d4aa) on Dark (#050508): 11:1 ✓
- White (#e8e8f0) on Dark (#050508): 16:1 ✓
- Gold (#ffd93d) on Dark (#050508): 6.4:1 ✓
```

### Focus States

```css
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid var(--pixel-cyan);
  outline-offset: 2px;
}

/* Or use box-shadow for outline-style effect */
:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.5);
  outline: none;
}
```

### Motion Preferences

```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 8. DARK MODE (Future Enhancement)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --pixel-darker: #050508;
    --pixel-dark: #0a0a12;
    /* Colors already optimized for dark */
  }
}

/* Optional: Add light mode support */
:root[data-theme="light"] {
  --pixel-darker: #fafafa;
  --pixel-white: #1a1a1a;
  --pixel-cyan: #0099cc;
  /* ... adjust all colors */
}
```

---

## 9. ASSET CREATION GUIDELINES

### Logo Variants
```
fivesaw-logo-mark.svg      - Just symbol (30×30 to 200×200 px)
fivesaw-logo-horizontal.svg - Logo + text, wide (300×80 px)
fivesaw-logo-vertical.svg  - Logo + text, stacked (100×200 px)
fivesaw-logo-white.svg     - High contrast version
fivesaw-logo-cyan.svg      - Cyan variant
```

### Image Specifications

```
Screenshots (gameplay, UI):
  Format: PNG or WebP
  Resolution: 1920×1080px (FHD)
  Size: < 500KB per image
  Color Profile: sRGB
  
Thumbnails:
  Size: 400×300px (4:3 ratio)
  Format: WebP (fallback PNG)
  
Banner Images:
  Size: 1600×400px (4:1 ratio)
  Format: WebP (fallback PNG)
  Max Size: 300KB

Favicon:
  Size: 32×32px (and 192×192px for PWA)
  Format: ICO + PNG
```

---

## 10. IMPLEMENTATION CHECKLIST

### Phase 1: Design System Documentation
- [x] Color palette defined
- [x] Typography system specified
- [x] Spacing system documented
- [x] Component specifications created
- [ ] Component library built
- [ ] Design tokens exported

### Phase 2: Asset Creation
- [ ] Create missing icon set
- [ ] Generate WebP versions
- [ ] Create gallery images
- [ ] Remove unused assets
- [ ] Optimize all images
- [ ] Create logo variants

### Phase 3: Responsive Implementation
- [ ] Test all breakpoints
- [ ] Mobile navigation fixes
- [ ] Tablet layout adjustments
- [ ] Touch gesture support
- [ ] Viewport meta tag optimization

### Phase 4: Accessibility Audit
- [ ] Color contrast verification
- [ ] Focus state testing
- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] Motion preference compliance

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-07  
**Maintainer:** Design System Team
