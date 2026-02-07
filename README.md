# Fivesaw - Creator Portfolio

A pixel-perfect portfolio website for Fivesaw, featuring the SawClient Minecraft client project.

## Features

- **Animated Hero Section**: Canvas-based pixel sky with drifting clouds and twinkling stars
- **Three.js 3D Demo**: Interactive voxel environment with floating islands
- **SawClient Sub-site**: Complete product website with download and features pages
- **Performance Optimized**: RAF animations, lazy loading, intersection observers
- **Responsive Design**: Works on all screen sizes

## Project Structure

```
fivesaw-site/
├── index.html                    # Main landing page
├── netlify.toml                  # Netlify deployment config
├── README.md                     # This file
├── public/
│   └── assets/
│       └── images/               # Generated pixel art assets
├── src/
│   ├── js/
│   │   ├── main.js              # Main site JavaScript
│   │   └── sawclient.js         # SawClient sub-site JavaScript
│   ├── styles/
│   │   ├── main.css             # Main site styles
│   │   └── sawclient.css        # SawClient sub-site styles
│   └── pages/
│       └── sawclient/
│           ├── index.html       # SawClient home
│           ├── features.html    # SawClient features
│           └── download.html    # SawClient download
```

## Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Build settings are auto-configured via `netlify.toml`
3. Deploy!

### Manual Deploy

Simply drag and drop the entire folder to Netlify's deploy UI.

## Performance Features

- **requestAnimationFrame**: All animations use RAF for smooth 60fps
- **Intersection Observer**: Animations pause when not visible
- **Debounced Resize**: Canvas resize handlers are debounced
- **Lazy Loading**: Images use native lazy loading
- **Reduced Motion**: Respects `prefers-reduced-motion`

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Three.js (loaded from CDN)
- Google Fonts (Press Start 2P, Inter)

## Creator Info

- **Name**: Fivesaw
- **Discord**: fivesaw
- **YouTube**: @goatdotlol

## License

MIT License - See LICENSE file for details.

Not affiliated with Mojang Studios or Microsoft.
