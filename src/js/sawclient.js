/**
 * SAWCLIENT - JavaScript
 * Hero canvas animation with pixel blocks
 */

// ========================================
// HERO CANVAS - PIXEL BLOCKS ANIMATION
// ========================================

function initSawClientHero() {
  const canvas = document.getElementById('sc-hero-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  let isVisible = true;
  
  // Resize canvas
  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  resize();
  window.addEventListener('resize', debounce(resize, 200));
  
  // Pixel block class
  class PixelBlock {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.size = 8 + Math.random() * 16;
      this.speed = 0.3 + Math.random() * 0.5;
      this.color = Math.random() > 0.5 ? '#00d4aa' : '#00a884';
      this.opacity = 0.1 + Math.random() * 0.3;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }
    
    update() {
      this.y -= this.speed;
      this.rotation += this.rotationSpeed;
      
      if (this.y < -this.size * 2) {
        this.reset();
      }
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      
      // Add inner highlight
      ctx.fillStyle = '#4de8c8';
      ctx.globalAlpha = this.opacity * 0.5;
      ctx.fillRect(-this.size / 4, -this.size / 4, this.size / 2, this.size / 2);
      
      ctx.restore();
    }
  }
  
  // Create blocks
  const blocks = Array(30).fill(null).map(() => new PixelBlock());
  
  // Background gradient
  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#050508');
    gradient.addColorStop(0.5, '#0a0a1a');
    gradient.addColorStop(1, '#0a0a12');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // Animation loop
  let frameCount = 0;
  function animate() {
    if (!isVisible) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    
    // Render every 2nd frame for 30fps
    frameCount++;
    if (frameCount % 2 !== 0) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    
    drawBackground();
    
    blocks.forEach(block => {
      block.update();
      block.draw();
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Visibility check
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  
  observer.observe(canvas);
  
  animate();
}

// Debounce utility
function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

// ========================================
// NAVIGATION SCROLL EFFECT
// ========================================

function initNavScroll() {
  const navbar = document.querySelector('.sc-navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.style.background = 'rgba(5, 5, 8, 0.98)';
    } else {
      navbar.style.background = 'rgba(5, 5, 8, 0.95)';
    }
    
    lastScroll = currentScroll;
  });
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initSawClientHero();
  initNavScroll();
});
