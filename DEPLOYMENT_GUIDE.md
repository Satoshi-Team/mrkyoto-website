# MrKyoto.com - Netlify Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git repository set up
- Netlify account

---

## 📦 Local Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

This will:
- Clean the `dist/` directory
- Copy all necessary files
- Minify CSS, JavaScript, and HTML
- Create Netlify configuration files
- Generate a build report

### 3. Preview Build
```bash
# Serve the dist folder locally
cd dist
python3 -m http.server 8000
```

Visit `http://localhost:8000` to preview your build.

---

## 🌐 Netlify Deployment

### Option 1: Manual Deployment (Recommended for testing)

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Upload to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Drag and drop the `dist/` folder to the deployment area
   - Your site will be live in seconds!

### Option 2: Git-based Deployment (Recommended for production)

1. **Push to Git:**
   ```bash
   git add .
   git commit -m "Build for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Deploy!

---

## ⚙️ Build Configuration

### Build Script Details
The build process includes:

- **File copying:** All HTML, CSS, JS, images, and assets
- **Asset optimization:** Minification of CSS, JS, and HTML
- **Netlify config:** Automatic generation of redirects and headers
- **Build report:** Detailed statistics and file listing

### Build Output Structure
```
dist/
├── index.html                 # Homepage
├── real-estate/              # Real estate section
├── events/                   # Events section
├── news/                     # News section
├── culture/                  # Culture section
├── activities/               # Activities section
├── privacy-policy/           # Privacy policy
├── terms-of-service/         # Terms of service
├── css/                      # Stylesheets
├── js/                       # JavaScript files
├── images/                   # Images (if any)
├── favicon.svg              # Site favicon
├── sw.js                    # Service worker
├── robots.txt               # SEO robots file
├── sitemap.xml              # SEO sitemap
├── _redirects               # Netlify redirects
├── _headers                 # Netlify headers
└── build-report.json        # Build statistics
```

---

## 🔧 Netlify Configuration

### Automatic Redirects
The build process creates redirects for:
- Old `.html` files → Clean URLs
- Missing trailing slashes → Proper URLs
- SPA fallback for client-side routing

### Security Headers
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

### Caching Strategy
- **Static assets:** 1 year cache with immutable flag
- **Service worker:** No cache for updates
- **HTML files:** Standard cache behavior

---

## 📊 Build Statistics

After each build, check `dist/build-report.json` for:
- Files processed and minified
- Total build size
- Build time and version
- Any errors or warnings

### Example Build Report
```json
{
  "buildTime": "2025-07-17T08:51:11.000Z",
  "version": "2.0.0",
  "stats": {
    "filesCopied": 45,
    "filesMinified": 12,
    "totalSize": 245760,
    "errors": []
  }
}
```

---

## 🔍 Quality Assurance

### Pre-deployment Checklist
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Images and assets load
- [ ] JavaScript functionality works
- [ ] CSS styling is correct
- [ ] Mobile responsiveness
- [ ] SEO meta tags present
- [ ] Service worker registered

### Performance Testing
```bash
# Run Lighthouse audit
npm run test
```

### Manual Testing
1. **Homepage:** Check all sections and CTAs
2. **Real Estate:** Verify property listings and search
3. **Events:** Test event filtering and details
4. **News:** Check article display and search
5. **Culture:** Verify cultural experiences
6. **Activities:** Test activity booking links
7. **Legal pages:** Privacy policy and terms

---

## 🚨 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Check Node.js version
node --version  # Should be 18+

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Missing Files
- Ensure all files are in the correct directories
- Check file permissions
- Verify file paths in HTML files

#### Redirect Issues
- Check `_redirects` file in dist folder
- Verify redirect syntax
- Test redirects locally

#### Performance Issues
- Check file sizes in build report
- Optimize images if needed
- Review minification results

### Debug Commands
```bash
# Check build output
ls -la dist/

# Verify file sizes
du -sh dist/*

# Test local server
cd dist && python3 -m http.server 8000

# Check for broken links
npm run test
```

---

## 🔄 Continuous Deployment

### GitHub Integration
1. Connect your GitHub repository to Netlify
2. Enable automatic deployments
3. Set up branch deployments for testing
4. Configure preview deployments for pull requests

### Environment Variables
Set in Netlify dashboard:
- `NODE_ENV`: production
- `SITE_URL`: https://mrkyoto.com

### Custom Domain
1. Add custom domain in Netlify
2. Configure DNS records
3. Enable HTTPS (automatic with Netlify)
4. Set up redirects for www subdomain

---

## 📈 Monitoring & Analytics

### Netlify Analytics
- Page views and unique visitors
- Performance metrics
- Error tracking
- Form submissions

### Google Analytics
- User behavior tracking
- Conversion goals
- Real-time data
- Custom events

### Performance Monitoring
- Core Web Vitals
- Lighthouse scores
- Page load times
- User experience metrics

---

## 🔒 Security Best Practices

### Content Security Policy
Consider adding CSP headers for additional security:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.openweathermap.org;
```

### HTTPS Enforcement
- Automatic with Netlify
- HSTS headers included
- Secure cookie settings

### Form Protection
- CSRF protection
- Rate limiting
- Input validation
- Spam protection

---

## 📝 Maintenance

### Regular Updates
- Update dependencies monthly
- Review security headers quarterly
- Monitor performance metrics
- Update content regularly

### Backup Strategy
- Git repository as primary backup
- Netlify provides automatic backups
- Consider additional cloud storage

### Rollback Plan
- Keep previous deployments in Netlify
- Use Git tags for releases
- Document deployment procedures

---

## 🎯 Success Metrics

### Performance Targets
- **Lighthouse Score:** 90+ in all categories
- **Page Load Time:** < 3 seconds
- **Core Web Vitals:** Pass all metrics
- **Mobile Performance:** Optimized for mobile

### SEO Targets
- **PageSpeed Insights:** 90+ mobile and desktop
- **Search Console:** No critical issues
- **Sitemap:** Properly indexed
- **Meta Tags:** Complete and accurate

### User Experience
- **Navigation:** Intuitive and fast
- **Content:** Engaging and informative
- **Functionality:** All features working
- **Accessibility:** WCAG AA compliant

---

*Last updated: July 2025*
*Version: 2.0 - Netlify Deployment Ready* 