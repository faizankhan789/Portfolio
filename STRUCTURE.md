# Portfolio Structure

## Directory Layout

```
Portfolio/
├── index.html              # Main HTML file
├── Resume.pdf              # Downloadable resume
├── README.md               # Project documentation
│
├── assets/                 # All static assets
│   ├── images/            # Profile and project images
│   │   └── img.png        # Profile photo (1.0MB)
│   │
│   └── favicons/          # Website icons
│       ├── favicon.ico    # Standard favicon (32x32)
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       └── apple-touch-icon.png (180x180)
│
├── css/                    # Stylesheets
│   └── styles.css         # Main stylesheet (29KB)
│
└── js/                     # JavaScript files
    └── script.js          # Main JavaScript (24KB)
```

## File Organization

### Root Files
- **index.html** - Single-page portfolio with all sections
- **Resume.pdf** - Professional resume (downloadable)
- **README.md** - Documentation and setup instructions

### Assets Folder
**Purpose**: Centralized location for all static media files

- `assets/images/` - Profile photos and project images
- `assets/favicons/` - Browser icons in multiple sizes
  - Includes circular profile photo favicon with transparent background
  - Optimized for different devices and screen sizes

### CSS Folder
**Purpose**: All stylesheet files
- `styles.css` - Complete styling including:
  - Custom CSS variables for theming
  - Responsive design (mobile-first)
  - Animations and transitions
  - Layout (Flexbox & Grid)

### JS Folder
**Purpose**: All JavaScript functionality
- `script.js` - Interactive features including:
  - Animated particle background
  - Custom 3-layer cursor
  - Smooth scroll navigation
  - Hamburger menu
  - Scroll animations

## Key Features

### Organized Structure
✓ Clean separation of concerns (HTML/CSS/JS)
✓ Logical folder hierarchy
✓ Easy to maintain and scale

### Optimized Assets
✓ Profile image in images folder
✓ Multiple favicon sizes for device compatibility
✓ Removed unnecessary large files (512x512 favicon)

### Proper Paths
✓ All links updated to reflect new structure
✓ CSS: `css/styles.css`
✓ JS: `js/script.js`
✓ Images: `assets/images/img.png`
✓ Favicons: `assets/favicons/[filename]`

## Total Size Breakdown

- **HTML**: ~56 KB
- **CSS**: ~30 KB
- **JavaScript**: ~24 KB
- **Resume PDF**: ~418 KB
- **Profile Image**: ~1.08 MB
- **Favicons**: ~58 KB (combined)

**Total**: ~1.64 MB (optimized for fast loading)

## Benefits of This Structure

1. **Professional Organization**
   - Industry-standard folder structure
   - Easy for other developers to navigate
   - Scalable for future additions

2. **Easy Maintenance**
   - All related files grouped together
   - Clear naming conventions
   - Logical file locations

3. **Fast Loading**
   - Optimized asset sizes
   - Removed unnecessary files
   - Efficient file organization

4. **Version Control Friendly**
   - Clean directory structure
   - Easy to track changes
   - Clear file purposes

## Deployment Ready

This structure is ready for deployment on:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

Simply upload all files maintaining the folder structure.
