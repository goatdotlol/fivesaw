# Fivesaw Website - Deployment Ready

A complete, production-ready pixel-themed Minecraft content creator website featuring the **SawClient** project.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (optional, for serving)
- No build process required - static files ready to deploy

###  Local Development
```bash
# Serve locally with Python
python3 -m http.server 8000

# Or with Node's http-server
npx http-server

# Then visit http://localhost:8000
```

### Deploy to Netlify
This site is configured for Netlify deployment:

1. **Via Git (Auto-Deploy)**
   ```bash
   git push origin main
   # Netlify automatically deploys on push
   ```

2. **Via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.
   ```

3. **Manual Deployment**
   - Connect repository to Netlify
   - Set build command: `(leave empty)`
   - Set publish directory: `.` (root)

### Deploy to GitHub Pages
```bash
# Push to gh-pages branch
git push origin main:gh-pages

# Enable GitHub Pages in repository settings
# Source: Deploy from a branch
# Branch: gh-pages
```

### Deploy to Vercel
```bash
vercel --prod
```

## 📁 Project Structure

```
fivesaw/
├── index.html                    # Main landing page
├── netlify.toml                  # Netlify configuration
├── public/
│   └── assets/
│       └── images/              # Optimized pixel art images
├── src/
│   ├── js/
│   │   ├── main.js             # Main site JavaScript
│   │   └── sawclient.js        # SawClient subsite JS
│   ├── styles/
│   │   ├── main.css            # Main site styles
│   │   └── sawclient.css       # SawClient styles
│   └── pages/
│       └── sawclient/
│           ├── index.html      # SawClient home
│           ├── features.html   # Features showcase
│           ├── download.html   # Download page
│           └── sandbox.html    # Voxel demo sandbox
├── README.md
├── DESIGN_SYSTEM.md
├── TECHNICAL_SPECS.md
└── AUDIT_REPORT.md
```

## 🎨 Features

### Main Site
- **Hero Section**: Pixel animation canvas with glitch text effect
- **Projects Showcase**: Featured SawClient project display
- **3D Demo**: Interactive Three.js voxel environment
- **Contact**: Social links to Discord and YouTube
- **Responsive Design**: Works seamlessly on mobile and desktop

### SawClient Subsite
- **Home**: Overview and key statistics
- **Features**: Detailed feature showcase with descriptions
- **Download**: Platform-specific installers with checksums
- **Sandbox**: Online voxel demo for practice and testing

## 🔧 Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, animations, GPU-accelerated effects
- **JavaScript (ES6+)**: Modular, performant code
- **Three.js**: 3D voxel rendering
- **Google Fonts**: Press Start 2P and Inter fonts

## ⚡ Performance Optimizations

- Lazy loading for images
- CSS minification
- JavaScript bundling (inline critical code)
- Canvas-based animations for smooth performance
- Intersection Observer for scroll animations
- Reduced motion support for accessibility

## 🎯 SEO & Metadata

- Comprehensive meta tags
- Open Graph support
- Structured data ready
- Mobile viewport optimization
- Fast loading times

## 📦 Asset Manifest

All assets are pixel-art themed:
- **fivesaw-avatar.png** (200×200): Site avatar
- **sawclient-banner.png** (300×400): SawClient logo
- **hero-floating-islands.png** (1600×900): Hero background
- **sawclient-hud.png** (800×600): HUD mockup
- **sawclient-terrain.png** (1200×800): Terrain background

## 🔐 Security

- No external dependencies except Three.js (CDN)
- No form submissions or data collection
- All assets self-hosted
- HTTPS redirects configured in netlify.toml
- Content Security Policy headers recommended

## 📝 Configuration

### Netlify (`netlify.toml`)
- Redirects: SPA redirect configured
- Headers: Security headers included
- Environment: Production optimization

### Custom Fonts
- Press Start 2P: Pixel display font
- Inter: Modern body font
- Both from Google Fonts CDN

## 🛠 Maintenance & Updates

### Adding New Projects
1. Create new section in `index.html`
2. Add styles to `src/styles/main.css`
3. Add JavaScript functionality if needed

### Updating SawClient Pages
- Edit files in `src/pages/sawclient/`
- All pages use shared CSS: `src/styles/sawclient.css`
- Update version numbers in download and home pages

### Image Updates
- Replace files in `public/assets/images/`
- Keep same filenames for cache busting
- Optimize images before uploading

## 📊 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: All modern browsers

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths (case-sensitive on Linux/Mac)
- Verify files exist in `public/assets/images/`
- Clear browser cache (Ctrl+Shift+Del)

### Three.js Demo Not Rendering
- Ensure WebGL is enabled in browser
- Check console for errors
- Try updating graphics drivers

### Fonts Not Loading
- Disable ad blocker
- Check browser console for errors
- Verify Google Fonts CDN is accessible

## 📞 Support

- Discord: https://discord.gg/fivesaw
- YouTube: https://youtube.com/@goatdotlol
- GitHub Issues: Create an issue for bugs/features

## 📄 License

© 2024 Fivesaw. Not affiliated with Mojang Studios or Microsoft.

---

**Version**: 1.5.2  
**Last Updated**: February 7, 2026  
**Status**: Production Ready ✅
