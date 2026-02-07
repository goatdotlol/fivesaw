/**
 * FIVESAW - Main JavaScript
 * Optimized for performance with RAF and lazy loading
 */

// ========================================
// PERFORMANCE UTILITIES
// ========================================

const raf = requestAnimationFrame;
const caf = cancelAnimationFrame;

// Throttle function for scroll events
function throttle(fn, wait) {
  let lastTime = 0;
  return function(...args) {
    const now = performance.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// Debounce for resize events
function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

// ========================================
// LOADING SCREEN
// ========================================

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 500);
  }
}

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, 100));
  
  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
  
  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// ========================================
// HERO CANVAS - PIXEL SKY ANIMATION
// ========================================

function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  let isVisible = true;
  
  // Resize canvas
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener('resize', debounce(resize, 200));
  
  // Pixel cloud class
  class PixelCloud {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * (canvas.height * 0.5);
      this.width = 60 + Math.random() * 80;
      this.height = 30 + Math.random() * 30;
      this.speed = 0.2 + Math.random() * 0.3;
      this.opacity = 0.1 + Math.random() * 0.2;
      this.pixels = this.generatePixels();
    }
    
    generatePixels() {
      const pixels = [];
      const pixelSize = 8;
      const cols = Math.floor(this.width / pixelSize);
      const rows = Math.floor(this.height / pixelSize);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Create cloud shape using noise-like pattern
          const distFromCenter = Math.sqrt(
            Math.pow(i - cols / 2, 2) + Math.pow(j - rows / 2, 2)
          );
          const maxDist = Math.sqrt(Math.pow(cols / 2, 2) + Math.pow(rows / 2, 2));
          
          if (Math.random() > distFromCenter / maxDist * 0.7) {
            pixels.push({ x: i * pixelSize, y: j * pixelSize });
          }
        }
      }
      
      return pixels;
    }
    
    update() {
      this.x += this.speed;
      
      if (this.x > canvas.width + this.width) {
        this.x = -this.width;
        this.y = Math.random() * (canvas.height * 0.5);
      }
    }
    
    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      
      this.pixels.forEach(pixel => {
        ctx.fillRect(this.x + pixel.x, this.y + pixel.y, 8, 8);
      });
    }
  }
  
  // Star class
  class Star {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * (canvas.height * 0.6);
      this.size = Math.random() > 0.9 ? 3 : 2;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.twinkleSpeed = 0.01 + Math.random() * 0.02;
      this.twinklePhase = Math.random() * Math.PI * 2;
    }
    
    update(time) {
      this.twinklePhase += this.twinkleSpeed;
    }
    
    draw(time) {
      const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * twinkle})`;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }
  
  // Create clouds and stars
  const clouds = Array(8).fill(null).map(() => new PixelCloud());
  const stars = Array(50).fill(null).map(() => new Star());
  
  // Gradient background
  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.4, '#1a1a3e');
    gradient.addColorStop(0.7, '#2a2a5e');
    gradient.addColorStop(1, '#0a0a12');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // Animation loop
  let frameCount = 0;
  function animate(time) {
    if (!isVisible) {
      animationId = raf(animate);
      return;
    }
    
    // Render every 2nd frame for performance (30fps)
    frameCount++;
    if (frameCount % 2 !== 0) {
      animationId = raf(animate);
      return;
    }
    
    drawBackground();
    
    // Draw stars
    stars.forEach(star => {
      star.update(time);
      star.draw(time);
    });
    
    // Draw clouds
    clouds.forEach(cloud => {
      cloud.update();
      cloud.draw();
    });
    
    animationId = raf(animate);
  }
  
  // Visibility check
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  
  observer.observe(canvas);
  
  animate(0);
}

// ========================================
// THREE.JS 3D DEMO
// ========================================

function initThreeDemo() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a12);
  scene.fog = new THREE.Fog(0x0a0a12, 10, 50);
  
  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(8, 6, 8);
  camera.lookAt(0, 0, 0);
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false, // Disable for performance
    powerPreference: 'high-performance'
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0x00d4aa, 0.8);
  directionalLight.position.set(10, 20, 10);
  scene.add(directionalLight);
  
  // Materials
  const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x4ade80 });
  const dirtMaterial = new THREE.MeshLambertMaterial({ color: 0x8b5a2b });
  const stoneMaterial = new THREE.MeshLambertMaterial({ color: 0x6b7280 });
  const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x5c4033 });
  const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
  const waterMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x00d4aa,
    transparent: true,
    opacity: 0.7
  });
  
  // Block geometry (reused)
  const blockGeometry = new THREE.BoxGeometry(1, 1, 1);
  
  // Create voxel terrain
  const terrainGroup = new THREE.Group();
  scene.add(terrainGroup);
  
  // Generate terrain
  const terrainSize = 8;
  const blocks = [];
  
  for (let x = -terrainSize; x <= terrainSize; x++) {
    for (let z = -terrainSize; z <= terrainSize; z++) {
      // Height based on distance from center
      const dist = Math.sqrt(x * x + z * z);
      const height = Math.max(0, Math.floor(3 - dist * 0.3));
      
      for (let y = -2; y <= height; y++) {
        let material;
        
        if (y === height && height >= 0) {
          material = grassMaterial;
        } else if (y >= height - 2) {
          material = dirtMaterial;
        } else {
          material = stoneMaterial;
        }
        
        const block = new THREE.Mesh(blockGeometry, material);
        block.position.set(x, y, z);
        block.castShadow = true;
        block.receiveShadow = true;
        terrainGroup.add(block);
        blocks.push(block);
      }
    }
  }
  
  // Add a simple tree
  function createTree(x, z) {
    const treeGroup = new THREE.Group();
    
    // Trunk
    for (let y = 0; y < 4; y++) {
      const trunk = new THREE.Mesh(blockGeometry, woodMaterial);
      trunk.position.set(x, y + 1, z);
      treeGroup.add(trunk);
    }
    
    // Leaves
    for (let lx = -2; lx <= 2; lx++) {
      for (let ly = 0; ly <= 2; ly++) {
        for (let lz = -2; lz <= 2; lz++) {
          if (Math.abs(lx) + Math.abs(ly) + Math.abs(lz) <= 3) {
            const leaf = new THREE.Mesh(blockGeometry, leafMaterial);
            leaf.position.set(x + lx, ly + 4, z + lz);
            treeGroup.add(leaf);
          }
        }
      }
    }
    
    return treeGroup;
  }
  
  // Add trees
  terrainGroup.add(createTree(-4, -4));
  terrainGroup.add(createTree(5, 3));
  terrainGroup.add(createTree(-3, 5));
  
  // Add floating islands
  const islandGroup = new THREE.Group();
  scene.add(islandGroup);
  
  function createFloatingIsland(x, y, z, size) {
    const island = new THREE.Group();
    
    for (let ix = -size; ix <= size; ix++) {
      for (let iy = -1; iy <= 1; iy++) {
        for (let iz = -size; iz <= size; iz++) {
          if (Math.random() > 0.3) {
            const material = iy === 1 ? grassMaterial : stoneMaterial;
            const block = new THREE.Mesh(blockGeometry, material);
            block.position.set(ix, iy, iz);
            island.add(block);
          }
        }
      }
    }
    
    island.position.set(x, y, z);
    return island;
  }
  
  const island1 = createFloatingIsland(-8, 8, -8, 2);
  const island2 = createFloatingIsland(10, 6, -5, 1);
  islandGroup.add(island1);
  islandGroup.add(island2);
  
  // Mouse controls
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let cameraAngle = { theta: Math.PI / 4, phi: Math.PI / 3 };
  let cameraRadius = 15;
  
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });
  
  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    
    cameraAngle.theta -= deltaX * 0.01;
    cameraAngle.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraAngle.phi - deltaY * 0.01));
    
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });
  
  canvas.addEventListener('mouseup', () => isDragging = false);
  canvas.addEventListener('mouseleave', () => isDragging = false);
  
  // Touch controls
  canvas.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  });
  
  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;
    
    cameraAngle.theta -= deltaX * 0.01;
    cameraAngle.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraAngle.phi - deltaY * 0.01));
    
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  });
  
  canvas.addEventListener('touchend', () => isDragging = false);
  
  // Zoom with scroll
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    cameraRadius = Math.max(5, Math.min(30, cameraRadius + e.deltaY * 0.01));
  });
  
  // Resize handler
  window.addEventListener('resize', debounce(() => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }, 200));
  
  // Animation loop
  let isVisible = true;
  let frameCount = 0;
  
  function animate() {
    if (!isVisible) {
      raf(animate);
      return;
    }
    
    frameCount++;
    
    // Update camera position
    camera.position.x = cameraRadius * Math.sin(cameraAngle.phi) * Math.cos(cameraAngle.theta);
    camera.position.y = cameraRadius * Math.cos(cameraAngle.phi);
    camera.position.z = cameraRadius * Math.sin(cameraAngle.phi) * Math.sin(cameraAngle.theta);
    camera.lookAt(0, 0, 0);
    
    // Animate floating islands (every 2nd frame)
    if (frameCount % 2 === 0) {
      const time = Date.now() * 0.001;
      island1.position.y = 8 + Math.sin(time) * 0.5;
      island1.rotation.y = time * 0.1;
      island2.position.y = 6 + Math.sin(time * 0.8 + 1) * 0.3;
    }
    
    renderer.render(scene, camera);
    raf(animate);
  }
  
  // Visibility check
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  
  observer.observe(canvas);
  
  animate();
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.project-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add visible class style
  const style = document.createElement('style');
  style.textContent = `
    .project-card.visible,
    .section-header.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after content loads
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 500);
  });
  
  // Initialize components
  initNavigation();
  initHeroCanvas();
  initThreeDemo();
  initScrollAnimations();
});

// Export for module usage
export { initNavigation, initHeroCanvas, initThreeDemo };
