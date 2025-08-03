# MrKyoto.com Deployment Guide

## Overview

This guide covers the deployment of MrKyoto.com to GitHub and Netlify with English-only pages and all widgets functioning perfectly.

## 🏗️ Build System

### English-Only Deployment

The build system has been optimized to include only English root pages:

- `index.html` - Homepage with weather widget and translation manager
- `activities/index.html` - Activities page with activities widget
- `events/index.html` - Events page with events widget  
- `news/index.html` - News page with news widget
- `real-estate/index.html` - Real estate page with real estate widget
- `live-from-kyoto/index.html` - Live Kyoto page with live widget
- `privacy/index.html` - Privacy policy
- `terms/index.html` - Terms of service

### Widget Verification

The build system automatically verifies all widgets:

- ✅ Weather Widget
- ✅ Live Kyoto Widget  
- ✅ Real Estate Widget
- ✅ News Widget
- ✅ Events Widget
- ✅ Activities Widget
- ✅ Translation Manager
- ✅ Theme Manager

## 🚀 Deployment Process

### Prerequisites

1. Node.js 16+ installed
2. Git repository initialized
3. Netlify account connected to GitHub

### Quick Deployment

```bash
# Build and deploy in one command
npm run deploy:build
```

### Step-by-Step Deployment

```bash
# 1. Build the project
npm run build

# 2. Verify the build
npm run verify

# 3. Deploy to GitHub and Netlify
npm run deploy
```

## 📁 Build Output

The build creates a `dist/` directory with:

```
dist/
├── index.html                 # Homepage
├── activities/
│   └── index.html            # Activities page
├── events/
│   └── index.html            # Events page
├── news/
│   └── index.html            # News page
├── real-estate/
│   └── index.html            # Real estate page
├── live-from-kyoto/
│   └── index.html            # Live Kyoto page
├── privacy/
│   └── index.html            # Privacy policy
├── terms/
│   └── index.html            # Terms of service
├── css/
│   └── styles.css            # Styles
├── js/
│   ├── main.js              # Main JavaScript
│   ├── weather-service.js    # Weather widget
│   ├── live-kyoto-widget.js # Live widget
│   └── ...                  # Other widgets
├── images/                   # Images
├── components/               # Components
├── _redirects               # Netlify redirects
├── _headers                 # Netlify headers
└── build-report.json        # Build report
```

## 🔧 Configuration Files

### Netlify Configuration

The build automatically creates:

- `_redirects` - URL redirects for clean URLs
- `_headers` - Security and caching headers

### Build Report

Each build generates a `build-report.json` with:

- Build statistics
- Widget verification results
- File list with sizes
- Error tracking

## 🎯 Widget Functionality

### Weather Widget
- Real-time weather data for Kyoto
- Automatic updates
- Responsive design

### Live Kyoto Widget
- Live streaming integration
- Real-time updates
- Interactive features

### Real Estate Widget
- Property listings
- Search functionality
- Contact forms

### News Widget
- Latest Kyoto news
- Category filtering
- Search functionality

### Events Widget
- Upcoming events
- Calendar integration
- Registration forms

### Activities Widget
- Tourist activities
- Booking integration
- Reviews and ratings

### Translation Manager
- Multi-language support
- Language switching
- Persistent preferences

### Theme Manager
- Dark/light mode
- Theme persistence
- Accessibility features

## 🔍 Verification

### Build Verification

The build system checks:

1. All required files exist
2. Widget JavaScript is included
3. CSS and assets are optimized
4. Netlify configuration is correct

### Widget Verification

Each widget is verified by checking for:

- JavaScript inclusion
- CSS styling
- HTML structure
- Functionality markers

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version and dependencies
2. **Widgets not working**: Verify JavaScript files are included
3. **Deployment fails**: Check Git repository and Netlify connection
4. **Missing files**: Ensure all required files exist in source

### Debug Commands

```bash
# Check build output
ls -la dist/

# Verify widgets
grep -r "weather-service" dist/

# Check Netlify config
cat dist/_redirects
cat dist/_headers

# View build report
cat dist/build-report.json
```

## 📊 Monitoring

### Build Reports

- `build-report.json` - Build statistics and widget verification
- `deployment-report.json` - Deployment process tracking

### Netlify Dashboard

Monitor deployment at:
- Build status
- Deploy previews
- Function logs
- Analytics

## 🔄 Continuous Deployment

### GitHub Integration

1. Connect Netlify to GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Enable automatic deployments

### Environment Variables

Set in Netlify dashboard:
- `NODE_VERSION`: 18
- `NPM_VERSION`: 9
- `NODE_ENV`: production

## 📈 Performance

### Optimizations

- CSS minification
- HTML optimization
- Asset compression
- Caching headers
- Service worker

### Performance Monitoring

- Lighthouse scores
- Core Web Vitals
- Page load times
- Widget response times

## 🔒 Security

### Security Headers

- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

### Caching Strategy

- Static assets: 1 year cache
- Service worker: No cache
- HTML files: Browser cache
- API responses: Short cache

## 📞 Support

For deployment issues:

1. Check build logs in Netlify
2. Review build reports
3. Verify widget functionality
4. Test all pages manually

## 🎉 Success Criteria

Deployment is successful when:

- ✅ All English pages load correctly
- ✅ All widgets function properly
- ✅ Netlify deployment completes
- ✅ No build errors
- ✅ All redirects work
- ✅ Security headers are applied
- ✅ Performance scores are good

---

**Last Updated**: August 2024  
**Version**: 2.0.0  
**Deployment Type**: English-only with full widget functionality 