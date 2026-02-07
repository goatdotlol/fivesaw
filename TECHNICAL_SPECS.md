# TECHNICAL SPECIFICATIONS & ARCHITECTURE GUIDE

## Overview
This document provides detailed technical specifications for implementing missing features and improvements to the Fivesaw website.

---

## 1. MISSING PAGES DETAILED SPECIFICATIONS

### 1.1 Mods Directory System

#### File Structure
```
src/pages/mods/
├── index.html              # Mods listing/directory
├── [mod-slug].html         # Individual mod pages (generated)
└── styles.css              # Mods-specific styles
```

#### Database Structure (JSON for static site)
```
/data/mods.json
{
  "mods": [
    {
      "id": "sawclient-v1",
      "name": "SawClient",
      "slug": "sawclient",
      "description": "Professional Minecraft client for PvP",
      "longDescription": "...",
      "category": "client",
      "tags": ["performance", "hud", "fps-counter"],
      "downloads": 52000,
      "rating": 4.8,
      "version": "1.5.2",
      "lastUpdated": "2026-02-15",
      "compatibility": ["1.8.9", "1.19", "1.20.x"],
      "images": [
        "sawclient-banner.png",
        "sawclient-hud.png",
        "sawclient-terrain.png"
      ],
      "downloadUrl": "/downloads/sawclient-1.5.2.jar",
      "sourceUrl": "https://github.com/fivesaw/sawclient",
      "readme": "Features: FPS counter, CPS display..."
    }
  ],
  "categories": [
    {
      "id": "client",
      "name": "Clients",
      "description": "Modified game clients",
      "count": 1
    }
  ]
}
```

#### HTML Template Structure
```html
<!-- Mods Directory Template -->
<section class="mods-grid">
  <div class="mods-header">
    <h1>Mods & Tools</h1>
    <div class="mods-controls">
      <input type="search" placeholder="Search mods..." class="mods-search">
      <select class="mods-filter">
        <option>All Categories</option>
      </select>
      <select class="mods-sort">
        <option>Most Downloaded</option>
        <option>Newest</option>
        <option>Top Rated</option>
      </select>
    </div>
  </div>
  
  <div class="mods-container">
    <!-- Mod cards populated by JavaScript -->
    <article class="mod-card">
      <img src="..." alt="...">
      <h3>...</h3>
      <p class="description">...</p>
      <div class="mod-stats">
        <span class="downloads">📥 50K</span>
        <span class="rating">⭐ 4.8</span>
      </div>
      <a href="/mods/mod-slug.html" class="mod-link">Learn More</a>
    </article>
  </div>
</section>

<!-- Individual Mod Page Template -->
<article class="mod-detail">
  <img class="mod-hero" src="..." alt="...">
  <nav class="mod-nav">
    <h1>Mod Name</h1>
    <div class="mod-meta">
      <span class="version">v1.5.2</span>
      <span class="date">Feb 15, 2026</span>
      <span class="rating">⭐ 4.8 (1200 votes)</span>
    </div>
  </nav>
  
  <div class="mod-content">
    <section class="mod-info">...</section>
    <section class="mod-features">...</section>
    <section class="mod-compatibility">...</section>
    <section class="mod-installation">...</section>
  </div>
  
  <aside class="mod-sidebar">
    <a href="..." class="btn primary">Download (v1.5.2)</a>
    <div class="mod-details">
      <p><strong>Downloads:</strong> 50,000</p>
      <p><strong>Rating:</strong> 4.8/5</p>
      <p><strong>Latest Version:</strong> 1.5.2</p>
    </div>
  </aside>
</article>
```

#### JavaScript Implementation
```javascript
// Load and render mods
async function loadMods() {
  const response = await fetch('/data/mods.json');
  const { mods, categories } = await response.json();
  
  renderModCards(mods);
  renderFilters(categories);
  initSearch(mods);
  initSorting(mods);
}

function renderModCards(mods) {
  const container = document.querySelector('.mods-container');
  container.innerHTML = mods.map(mod => `
    <article class="mod-card">
      <div class="mod-image">
        <img src="public/assets/images/${mod.images[0]}" 
             alt="${mod.name}" loading="lazy">
      </div>
      <h3>${mod.name}</h3>
      <p class="mod-description">${mod.description}</p>
      <div class="mod-tags">
        ${mod.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="mod-stats">
        <span class="stat">📥 ${formatNumber(mod.downloads)}</span>
        <span class="stat">⭐ ${mod.rating}</span>
      </div>
      <a href="/src/pages/mods/${mod.slug}.html" class="btn secondary">
        Learn More
      </a>
    </article>
  `).join('');
}

// Search functionality
function initSearch(mods) {
  const searchInput = document.querySelector('.mods-search');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = mods.filter(mod => 
      mod.name.toLowerCase().includes(query) ||
      mod.description.toLowerCase().includes(query) ||
      mod.tags.some(tag => tag.includes(query))
    );
    renderModCards(filtered);
  });
}
```

---

### 1.2 Documentation Site

#### File Structure
```
src/pages/docs/
├── index.html              # Docs landing page
├── getting-started.html
├── installation/
│   ├── windows.html
│   ├── macos.html
│   └── linux.html
├── features/
│   ├── fps-counter.html
│   ├── cps-display.html
│   ├── input-recorder.html
│   └── clickgui.html
├── api/
│   ├── overview.html
│   ├── events.html
│   ├── modules.html
│   └── examples.html
├── faq.html
├── changelog.html
└── styles/
    └── docs.css
```

#### Key Components

**Sidebar Navigation:**
```html
<aside class="docs-sidebar">
  <nav class="docs-toc">
    <ul>
      <li><a href="#getting-started">Getting Started</a></li>
      <li><a href="#installation">Installation</a>
        <ul>
          <li><a href="#install-windows">Windows</a></li>
          <li><a href="#install-macos">macOS</a></li>
          <li><a href="#install-linux">Linux</a></li>
        </ul>
      </li>
      <li><a href="#features">Features</a></li>
      <li><a href="#api">API Documentation</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
  </nav>
</aside>

<main class="docs-content">
  <article>
    <h1>Getting Started</h1>
    <!-- Content here -->
    
    <div class="code-block">
      <pre><code class="language-bash">
# Installation command
./install.sh
      </code></pre>
    </div>
  </article>
  
  <nav class="docs-pagination">
    <a href="..." class="prev">← Previous</a>
    <a href="..." class="next">Next →</a>
  </nav>
</main>
```

**Styling for Docs:**
```css
.docs-sidebar {
  position: sticky;
  top: 80px;
  width: 250px;
  height: calc(100vh - 80px);
  overflow-y: auto;
}

.docs-content {
  flex: 1;
  max-width: 800px;
}

.code-block {
  background: #1a1a2e;
  border-left: 4px solid #00d4aa;
  padding: 1rem;
  overflow-x: auto;
}

code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
}
```

---

### 1.3 Gallery Page

#### File Structure
```
src/pages/gallery/
├── index.html
├── styles.css
└── gallery.js
```

#### Implementation
```html
<section class="gallery-section">
  <div class="gallery-header">
    <h1>Gallery</h1>
    <div class="gallery-filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="screenshots">Screenshots</button>
      <button class="filter-btn" data-filter="videos">Videos</button>
      <button class="filter-btn" data-filter="community">Community Art</button>
    </div>
  </div>
  
  <div class="gallery-grid">
    <!-- Items loaded dynamically -->
  </div>
</section>

<!-- Lightbox Modal -->
<div class="gallery-lightbox" hidden>
  <button class="close-btn" aria-label="Close">×</button>
  <div class="lightbox-container">
    <button class="nav prev" aria-label="Previous">❮</button>
    <img class="lightbox-image" src="" alt="">
    <button class="nav next" aria-label="Next">❯</button>
    <p class="lightbox-caption"></p>
  </div>
</div>
```

**Gallery CSS (Masonry):**
```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  border: 2px solid var(--pixel-gray-light);
  transition: transform 0.3s, border-color 0.3s;
}

.gallery-item:hover {
  border-color: var(--pixel-cyan);
  transform: scale(1.02);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**Gallery Data:**
```json
{
  "items": [
    {
      "id": "shot-001",
      "title": "SawClient HUD Demo",
      "category": "screenshots",
      "image": "sawclient-hud.png",
      "width": 1920,
      "height": 1080,
      "credits": "Fivesaw"
    },
    {
      "id": "vid-001",
      "title": "Gameplay Showcase",
      "category": "videos",
      "youtubeId": "dQw4w9WgXcQ",
      "thumbnail": "video-thumb.jpg",
      "credits": "Fivesaw"
    }
  ]
}
```

---

### 1.4 Roadmap Page

#### HTML Structure
```html
<section class="roadmap-section">
  <h1 class="pixel-font">Development Roadmap</h1>
  <p class="subtitle">What's coming next</p>
  
  <div class="roadmap-timeline">
    <!-- Q1 2026 -->
    <div class="roadmap-phase">
      <h2 class="phase-title">🚀 Q1 2026</h2>
      
      <div class="features-column completed">
        <h3>Completed ✓</h3>
        <div class="feature-list">
          <div class="feature">
            <span class="status completed">✓</span>
            <div>
              <h4>v1.5.2 Release</h4>
              <p>Bug fixes and optimization</p>
              <small>Released Feb 2026</small>
            </div>
          </div>
        </div>
      </div>
      
      <div class="features-column in-progress">
        <h3>In Progress 🔄</h3>
        <div class="feature-list">
          <div class="feature">
            <div class="progress-bar" style="width: 70%"></div>
            <div>
              <h4>Documentation</h4>
              <p>Complete API docs and tutorials</p>
              <small>70% complete</small>
            </div>
          </div>
        </div>
      </div>
      
      <div class="features-column planned">
        <h3>Planned 📋</h3>
        <div class="feature-list">
          <div class="feature">
            <h4>v1.6.0 Features</h4>
            <p>New GUI customization options</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Q2 2026 -->
    <div class="roadmap-phase">
      <!-- Similar structure -->
    </div>
  </div>
  
  <section class="roadmap-notes">
    <h2>Notes</h2>
    <p>Timeline subject to change. Features prioritized by community feedback.</p>
  </section>
</section>
```

**Roadmap Styling:**
```css
.roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 3rem;
}

.roadmap-phase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: var(--pixel-gray);
  border-radius: 12px;
  border-left: 4px solid var(--pixel-cyan);
}

.features-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature {
  padding: 1rem;
  background: var(--pixel-darker);
  border-radius: 8px;
  border: 1px solid var(--pixel-gray-light);
}

.progress-bar {
  height: 4px;
  background: var(--pixel-cyan);
  border-radius: 2px;
  margin-bottom: 0.5rem;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.status.completed {
  background: #4ade80;
  color: white;
}

.status.in-progress {
  background: #ffd93d;
  color: #050508;
}

.status.planned {
  background: var(--pixel-gray-light);
  color: var(--pixel-white);
}
```

---

## 2. THREE.JS OPTIMIZATION GUIDE

### 2.1 Current Implementation Issues

**Problem: Individual Mesh Objects**
```javascript
// ❌ INEFFICIENT: 400+ individual meshes
for (let x = -8; x <= 8; x++) {
  for (let z = -8; z <= 8; z++) {
    for (let y = -2; y <= 3; y++) {
      const block = new THREE.Mesh(blockGeometry, material);
      block.position.set(x, y, z);
      terrainGroup.add(block);  // ← 400 draw calls
    }
  }
}
```

**Result:** 
- 400 draw calls per frame
- Poor performance on mobile
- Visible framerate drops with rotation

### 2.2 Solution: InstancedMesh

```javascript
// ✅ EFFICIENT: Single draw call with instancing
const instanceCount = 400;
const instancedMesh = new THREE.InstancedMesh(
  blockGeometry,
  material,
  instanceCount
);

let instanceIndex = 0;
const matrix = new THREE.Matrix4();

for (let x = -8; x <= 8; x++) {
  for (let z = -8; z <= 8; z++) {
    for (let y = -2; y <= 3; y++) {
      matrix.setPosition(x, y, z);
      instancedMesh.setMatrixAt(instanceIndex, matrix);
      instanceIndex++;
    }
  }
}

instancedMesh.instanceMatrix.needsUpdate = true;
scene.add(instancedMesh);
```

**Benefits:**
- ~400 → 1 draw call (400x improvement)
- 60+ FPS vs 30 FPS on mid-range devices
- Better mobile performance

### 2.3 Shadow Mapping Fix

**Current Problem:**
```javascript
// ❌ Shadows enabled but not configured
block.castShadow = true;
block.receiveShadow = true;
// Missing: shadow map on light
```

**Solution:**
```javascript
// Option A: Add proper shadows
const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.castShadow = true;
light.shadow.camera.left = -20;
light.shadow.camera.right = 20;
light.shadow.camera.top = 20;
light.shadow.camera.bottom = -20;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
scene.add(light);

// Option B: Remove shadows (faster)
// block.castShadow = false;
// block.receiveShadow = false;
```

### 2.4 Camera Controls Enhancement

```javascript
// Add inertial rotation (smooth deceleration)
class CameraController {
  constructor(camera, canvas) {
    this.camera = camera;
    this.velocity = { theta: 0, phi: 0 };
    this.friction = 0.95;
    
    canvas.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.lastX;
        const deltaY = e.clientY - this.lastY;
        
        this.velocity.theta = -deltaX * 0.01;
        this.velocity.phi = -deltaY * 0.01;
        
        this.lastX = e.clientX;
        this.lastY = e.clientY;
      }
    });
  }
  
  update() {
    this.angle.theta += this.velocity.theta;
    this.angle.phi += this.velocity.phi;
    
    this.velocity.theta *= this.friction;
    this.velocity.phi *= this.friction;
    
    // Update camera position
    this.updatePosition();
  }
}
```

---

## 3. RESPONSIVE DESIGN FIXES

### 3.1 Sawclient Navigation Mobile Fix

**Current Issue:**
```css
/* ❌ Problem: Nav menu doesn't wrap on small screens */
.sc-nav-menu {
  display: flex;
  gap: 2rem;
}
```

**Solution:**
```css
/* ✅ Add mobile responsive behavior */
.sc-nav-menu {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .sc-nav-menu {
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--sc-gray-light);
  }
  
  .sc-nav-menu a {
    font-size: 0.8rem;
    padding: 0.75rem 0;
  }
  
  .sc-nav-container {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .sc-nav-logo {
    display: none; /* Hide logo on very small screens */
  }
  
  .sc-nav-menu {
    width: 100%;
  }
}
```

### 3.2 Hero Canvas Mobile Performance

```javascript
// Reduce particle count on mobile
function initHeroCanvas() {
  const isMobile = window.innerWidth < 768;
  const cloudCount = isMobile ? 4 : 8;
  const starCount = isMobile ? 25 : 50;
  
  const clouds = Array(cloudCount).fill(null).map(() => new PixelCloud());
  const stars = Array(starCount).fill(null).map(() => new Star());
}
```

---

## 4. PERFORMANCE OPTIMIZATION CHECKLIST

### 4.1 Image Optimization
```bash
# Convert PNG to WebP
for file in public/assets/images/*.png; do
  cwebp "$file" -o "${file%.png}.webp"
done

# Create srcset for responsive images
<img src="image.webp" 
     srcset="image-small.webp 480w, image.webp 1024w"
     sizes="(max-width: 480px) 100vw, 1024px"
     alt="...">
```

### 4.2 CSS Minification
```bash
# Current: 42KB unminified
# Target: 32KB minified

# Tools: cssnano, csso
csso src/styles/main.css -o src/styles/main.min.css
csso src/styles/sawclient.css -o src/styles/sawclient.min.css
```

### 4.3 Lazy Loading Three.js
```javascript
// Only load Three.js if demo section visible
const demoSection = document.getElementById('demo');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = initThreeDemo;
    document.body.appendChild(script);
    observer.unobserve(demoSection);
  }
});

observer.observe(demoSection);
```

---

## 5. NETLIFY DEPLOYMENT OPTIMIZATION

### 5.1 Updated netlify.toml

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NODE_ENV = "production"

# Performance optimizations
[[headers]]
  for = "/"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Cache-Control = "public, max-age=3600"
    Content-Security-Policy = "default-src 'self' https:; script-src 'self' cdnjs.cloudflare.com https://cdn.jsdelivr.net; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' fonts.googleapis.com;"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.{png,jpg,jpeg,webp,svg,gif}"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Font caching
[[headers]]
  for = "*.{woff,woff2}"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Redirects
[[redirects]]
  from = "/sawclient/*"
  to = "/src/pages/sawclient/:splat"
  status = 200

[[redirects]]
  from = "/mods/*"
  to = "/src/pages/mods/:splat"
  status = 200
  
[[redirects]]
  from = "/docs/*"
  to = "/src/pages/docs/:splat"
  status = 200

[[redirects]]
  from = "/gallery/*"
  to = "/src/pages/gallery/:splat"
  status = 200
```

---

## 6. IMPLEMENTATION TIMELINE

### Week 1: Critical Fixes
- [ ] Fix copyright years (30 min)
- [ ] Implement download button functionality (1 hour)
- [ ] Remove unused assets (30 min)
- [ ] Fix Three.js shadows (1 hour)

### Week 2: Performance
- [ ] Implement InstancedMesh (2 hours)
- [ ] Image optimization to WebP (1 hour)
- [ ] CSS minification (30 min)
- [ ] Mobile nav fixes (1 hour)
- [ ] Lighthouse testing (1 hour)

### Week 3-4: Major Features
- [ ] Build Mods Directory (6 hours)
- [ ] Create Documentation site (8 hours)
- [ ] Gallery page (4 hours)
- [ ] Roadmap page (3 hours)

### Week 5-6: Advanced Features
- [ ] Enhanced voxel demo with interaction (12 hours)
- [ ] Testing and QA (4 hours)
- [ ] Deployment and monitoring (2 hours)

---

## 7. SUCCESS METRICS

```
Lighthouse Score: 88 → 95+
First Paint: ~1.5s → <1.2s
LCP: ~2.0s → <1.8s
Three.js FPS: 30 → 60+
Mobile FPS: 15-20 → 45+
Bundle Size: < 150KB
CLS: 0.05 (maintain)
```

---

End of Technical Specifications
