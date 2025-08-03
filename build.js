#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Build configuration for English-only deployment
const config = {
  sourceDir: '.',
  distDir: 'dist',
  copyPatterns: [
    // Core English pages
    'index.html',
    'activities/index.html',
    'events/index.html',
    'news/index.html',
    'real-estate/index.html',
    'live-from-kyoto/index.html',
    'privacy/index.html',
    'terms/index.html',
    
    // Japanese pages
    'ja/**/*',
    
    // Test files
    'test-language-switcher.html',
    'simple-language-test.html',
    
    // Essential assets
    'css/**/*',
    'js/**/*',
    'images/**/*',
    'components/**/*',
    
    // Core files
    '*.xml',
    '*.txt',
    '*.svg',
    'favicon.svg',
    'sw.js',
    'robots.txt',
    'sitemap.xml',
    'site.webmanifest',
    'apple-touch-icon.png',
    'favicon-96x96.png',
    'favicon.ico',
    'web-app-manifest-192x192.png',
    'web-app-manifest-512x512.png'
  ],
  excludePatterns: [
    'node_modules/**/*',
    'dist/**/*',
    '.git/**/*',
    '*.md',
    'build.js',
    'package.json',
    'package-lock.json',
    '.gitignore',
    '.cursorrules',
    'test-website.js',
    'CHANGELOG.md',
    'API_ENHANCEMENTS.md',
    'PROJECT_SUMMARY.md',
    'DEPLOYMENT.md',
    'COLOR_IMPROVEMENTS.md',
    'README.md',
    'DEPLOYMENT_GUIDE.md',
    'netlify.toml',
    'backups/**/*',
    
    // Exclude non-English language directories (except Japanese)
    'de/**/*',
    'es/**/*',
    'fr/**/*',
    'zh/**/*',
    
    // Exclude test and debug files (except specific test files)
    'debug-*.html',
    'minimal-*.html',
    'direct-*.html',
    'automated-*.html',
    'diagnose-*.html',
    'verify-*.html',
    'validate-*.html',
    'quick-*.html',
    'search-*.html',
    'force-*.html',
    'clear-*.html',
    'working-*.html',
    
    // Exclude development scripts
    '*.js',
    '!build.js',
    '!sw.js',
    'extract-*.js',
    'correct-*.js',
    'fetch-*.js',
    'manual-*.js',
    'test-*.js',
    'build-*.js'
  ]
};

class MrKyotoBuilder {
  constructor() {
    this.stats = {
      filesCopied: 0,
      filesOptimized: 0,
      totalSize: 0,
      errors: [],
      widgets: []
    };
  }

  async build() {
    console.log('🏯 Building MrKyoto.com for GitHub/Netlify deployment...\n');
    
    try {
      // Clean dist directory
      await this.cleanDist();
      
      // Copy files
      await this.copyFiles();
      
      // Verify widgets and functionality
      await this.verifyWidgets();
      
      // Optimize assets
      await this.optimizeAssets();
      
      // Create Netlify configuration
      await this.createNetlifyConfig();
      
      // Generate build report
      await this.generateBuildReport();
      
      console.log('\n✅ Build completed successfully!');
      console.log(`📁 Output directory: ${config.distDir}/`);
      console.log(`📊 Files processed: ${this.stats.filesCopied}`);
      console.log(`🔧 Files optimized: ${this.stats.filesOptimized}`);
      console.log(`📦 Total size: ${this.formatBytes(this.stats.totalSize)}`);
      console.log(`🎯 Widgets verified: ${this.stats.widgets.length}`);
      
      if (this.stats.errors.length > 0) {
        console.log(`⚠️  ${this.stats.errors.length} warnings encountered`);
      }
      
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  async cleanDist() {
    console.log('🧹 Cleaning dist directory...');
    await fs.remove(config.distDir);
    await fs.ensureDir(config.distDir);
  }

  async copyFiles() {
    console.log('📋 Copying English root pages and assets...');
    
    for (const pattern of config.copyPatterns) {
      const files = glob.sync(pattern, { 
        cwd: config.sourceDir,
        ignore: config.excludePatterns,
        nodir: true
      });
      
      for (const file of files) {
        const sourcePath = path.join(config.sourceDir, file);
        const destPath = path.join(config.distDir, file);
        
        try {
          await fs.ensureDir(path.dirname(destPath));
          await fs.copy(sourcePath, destPath);
          this.stats.filesCopied++;
          
          // Calculate file size
          const stats = await fs.stat(sourcePath);
          this.stats.totalSize += stats.size;
          
        } catch (error) {
          this.stats.errors.push(`Failed to copy ${file}: ${error.message}`);
        }
      }
    }
    
    // Ensure all required directories exist
    await this.ensureDirectories();
  }

  async ensureDirectories() {
    console.log('📁 Ensuring required directories exist...');
    
    const requiredDirs = [
      'css',
      'js',
      'images',
      'components',
      'activities',
      'events',
      'news',
      'real-estate',
      'live-from-kyoto',
      'privacy',
      'terms'
    ];
    
    for (const dir of requiredDirs) {
      await fs.ensureDir(path.join(config.distDir, dir));
    }
  }

  async verifyWidgets() {
    console.log('🎯 Verifying widgets and functionality...');
    
    const widgetChecks = [
      { name: 'Real Estate Widget', file: 'index.html', check: 'real-estate-data' },
      { name: 'Activities Widget', file: 'index.html', check: 'activities-data' },
      { name: 'Events Widget', file: 'index.html', check: 'events-data' },
      { name: 'News Widget', file: 'index.html', check: 'news-data' },
      { name: 'Culture Widget', file: 'index.html', check: 'culture-data' },
      { name: 'Main App', file: 'index.html', check: 'main-simple' },
      { name: 'Live Kyoto Widget', file: 'live-from-kyoto/index.html', check: 'live-kyoto-widget' },
      { name: 'Weather Widget', file: 'live-from-kyoto/index.html', check: 'weather-service' },
      { name: 'Real Estate Widget', file: 'real-estate/index.html', check: 'real-estate-data' },
      { name: 'News Widget', file: 'news/index.html', check: 'news-data' },
      { name: 'Events Widget', file: 'events/index.html', check: 'events-data' },
      { name: 'Activities Widget', file: 'activities/index.html', check: 'activities-data' }
    ];
    
    for (const widget of widgetChecks) {
      try {
        const filePath = path.join(config.distDir, widget.file);
        if (await fs.pathExists(filePath)) {
          const content = await fs.readFile(filePath, 'utf8');
          if (content.includes(widget.check)) {
            this.stats.widgets.push(widget.name);
            console.log(`✅ ${widget.name} verified`);
          } else {
            this.stats.errors.push(`Widget check failed: ${widget.name}`);
            console.log(`⚠️  ${widget.name} check failed`);
          }
        } else {
          this.stats.errors.push(`File not found: ${widget.file}`);
          console.log(`❌ File not found: ${widget.file}`);
        }
      } catch (error) {
        this.stats.errors.push(`Error checking ${widget.name}: ${error.message}`);
      }
    }
  }

  async optimizeAssets() {
    console.log('⚡ Optimizing assets...');
    
    // Basic CSS optimization (remove comments and extra whitespace)
    const cssFiles = glob.sync('css/**/*.css', { cwd: config.distDir });
    for (const cssFile of cssFiles) {
      try {
        const filePath = path.join(config.distDir, cssFile);
        const content = await fs.readFile(filePath, 'utf8');
        const optimized = this.optimizeCSS(content);
        await fs.writeFile(filePath, optimized);
        this.stats.filesOptimized++;
      } catch (error) {
        this.stats.errors.push(`Failed to optimize ${cssFile}: ${error.message}`);
      }
    }
    
    // Skip JavaScript optimization to preserve functionality
    console.log('⚠️  Skipping JavaScript optimization to preserve widget functionality');
    
    // Basic HTML optimization (remove comments and extra whitespace)
    const htmlFiles = glob.sync('**/*.html', { cwd: config.distDir });
    for (const htmlFile of htmlFiles) {
      try {
        const filePath = path.join(config.distDir, htmlFile);
        const content = await fs.readFile(filePath, 'utf8');
        const optimized = this.optimizeHTML(content);
        await fs.writeFile(filePath, optimized);
        this.stats.filesOptimized++;
      } catch (error) {
        this.stats.errors.push(`Failed to optimize ${htmlFile}: ${error.message}`);
      }
    }
  }

  optimizeCSS(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*{\s*/g, '{') // Remove spaces around braces
      .replace(/\s*}\s*/g, '}') // Remove spaces around braces
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .replace(/\s*,\s*/g, ',') // Remove spaces around commas
      .trim();
  }

  optimizeHTML(html) {
    // Skip optimization for files with important JavaScript to preserve functionality
    if (html.includes('displayHomepageProperties') || 
        html.includes('realEstateData') ||
        html.includes('weather-service') ||
        html.includes('live-kyoto-widget')) {
      console.log('⚠️  Skipping HTML optimization for JavaScript-heavy file');
      return html;
    }
    
    return html
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .trim();
  }

  async createNetlifyConfig() {
    console.log('🌐 Creating Netlify configuration...');
    
    // Create _redirects file
    const redirects = [
      '# Redirect old .html files to clean URLs',
      '/index.html / 301',
      '/real-estate.html /real-estate/ 301',
      '/events.html /events/ 301',
      '/news.html /news/ 301',
      '/activities.html /activities/ 301',
      '/live-from-kyoto.html /live-from-kyoto/ 301',
      '/privacy.html /privacy/ 301',
      '/terms.html /terms/ 301',
      '',
      '# Handle trailing slashes',
      '/real-estate /real-estate/ 301',
      '/events /events/ 301',
      '/news /news/ 301',
      '/activities /activities/ 301',
      '/live-from-kyoto /live-from-kyoto/ 301',
      '',
      '# SPA fallback',
      '/* /index.html 200'
    ].join('\n');
    
    await fs.writeFile(path.join(config.distDir, '_redirects'), redirects);
    
    // Create _headers file
    const headers = [
      '# Security headers',
      '/*',
      '  X-Frame-Options: DENY',
      '  X-XSS-Protection: 1; mode=block',
      '  X-Content-Type-Options: nosniff',
      '  Referrer-Policy: strict-origin-when-cross-origin',
      '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
      '',
      '# Cache static assets',
      '/css/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
      '/js/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
      '/images/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
      '*.svg',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
      '# Service worker should not be cached',
      '/sw.js',
      '  Cache-Control: no-cache'
    ].join('\n');
    
    await fs.writeFile(path.join(config.distDir, '_headers'), headers);
  }

  async generateBuildReport() {
    console.log('📊 Generating build report...');
    
    const report = {
      buildTime: new Date().toISOString(),
      version: '2.0.0',
      deployment: 'English-only',
      stats: this.stats,
      files: await this.getFileList(),
      errors: this.stats.errors,
      widgets: this.stats.widgets
    };
    
    await fs.writeJson(path.join(config.distDir, 'build-report.json'), report, { spaces: 2 });
  }

  async getFileList() {
    const files = glob.sync('**/*', { 
      cwd: config.distDir, 
      nodir: true,
      ignore: ['build-report.json']
    });
    
    const fileList = [];
    for (const file of files) {
      const filePath = path.join(config.distDir, file);
      const stats = await fs.stat(filePath);
      fileList.push({
        path: file,
        size: stats.size,
        modified: stats.mtime.toISOString()
      });
    }
    
    return fileList.sort((a, b) => a.path.localeCompare(b.path));
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Run the build
if (require.main === module) {
  const builder = new MrKyotoBuilder();
  builder.build().catch(console.error);
}

module.exports = MrKyotoBuilder; 