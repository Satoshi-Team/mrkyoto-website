#!/usr/bin/env node

/**
 * MrKyoto Build Verifier
 * Comprehensive verification script to check all build steps and identify issues
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

class BuildVerifier {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.successes = [];
        this.baseUrl = 'http://localhost:8000';
        this.pages = [
            '/',
            '/activities/',
            '/real-estate/',
            '/events/',
            '/news/',
            '/culture/'
        ];
        this.jsFiles = [
            '/js/activities-data.js',
            '/js/activities-manager.js',
            '/js/real-estate-data.js',
            '/js/real-estate-manager.js',
            '/js/events-data.js',
            '/js/events-manager.js',
            '/js/news-data.js',
            '/js/news-manager.js',
            '/js/culture-data.js',
            '/js/culture-manager.js',
            '/js/shared-header.js',
            '/js/shared-navigation.js',
            '/js/shared-footer.js'
        ];
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = {
            'error': '❌',
            'warning': '⚠️',
            'success': '✅',
            'info': 'ℹ️'
        }[type];
        console.log(`${prefix} [${timestamp}] ${message}`);
    }

    async checkFileExists(filePath) {
        return new Promise((resolve) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                resolve(!err);
            });
        });
    }

    async checkHttpResponse(url) {
        return new Promise((resolve) => {
            const req = http.get(`${this.baseUrl}${url}`, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        contentType: res.headers['content-type'],
                        data: data,
                        url: url
                    });
                });
            });
            req.on('error', (err) => {
                resolve({
                    statusCode: 0,
                    error: err.message,
                    url: url
                });
            });
            req.setTimeout(5000, () => {
                req.destroy();
                resolve({
                    statusCode: 0,
                    error: 'Timeout',
                    url: url
                });
            });
        });
    }

    async verifyFileStructure() {
        this.log('Verifying file structure...', 'info');
        
        const requiredFiles = [
            'index.html',
            'activities/index.html',
            'real-estate/index.html',
            'events/index.html',
            'news/index.html',
            'culture/index.html',
            'js/activities-data.js',
            'js/activities-manager.js',
            'js/real-estate-data.js',
            'js/real-estate-manager.js',
            'js/events-data.js',
            'js/events-manager.js',
            'js/news-data.js',
            'js/news-manager.js',
            'js/culture-data.js',
            'js/culture-manager.js',
            'js/shared-header.js',
            'js/shared-navigation.js',
            'js/shared-footer.js',
            'favicon.svg'
        ];

        for (const file of requiredFiles) {
            const exists = await this.checkFileExists(file);
            if (exists) {
                this.successes.push(`File exists: ${file}`);
            } else {
                this.issues.push(`Missing file: ${file}`);
            }
        }
    }

    async verifyHtmlContent() {
        this.log('Verifying HTML content...', 'info');
        
        const htmlFiles = [
            'index.html',
            'activities/index.html',
            'real-estate/index.html',
            'events/index.html',
            'news/index.html',
            'culture/index.html'
        ];

        for (const file of htmlFiles) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                // Check for required elements
                const checks = [
                    { name: 'DOCTYPE declaration', pattern: /<!DOCTYPE html>/i },
                    { name: 'HTML lang attribute', pattern: /<html[^>]*lang=/i },
                    { name: 'Meta viewport', pattern: /<meta[^>]*viewport[^>]*>/i },
                    { name: 'Title tag', pattern: /<title>/i },
                    { name: 'Body tag', pattern: /<body[^>]*>/i },
                    { name: 'Tailwind CSS', pattern: /tailwindcss\.com/i },
                    { name: 'Tailwind config', pattern: /tailwind\.config/i },
                    { name: 'Custom CSS', pattern: /<style>/i },
                    { name: 'Header element', pattern: /<header[^>]*>/i },
                    { name: 'Main content', pattern: /<main[^>]*>/i },
                    { name: 'Footer element', pattern: /<footer[^>]*>/i },
                    { name: 'JavaScript files', pattern: /<script[^>]*src=/i }
                ];

                for (const check of checks) {
                    if (check.pattern.test(content)) {
                        this.successes.push(`${file}: ${check.name} found`);
                    } else {
                        this.issues.push(`${file}: Missing ${check.name}`);
                    }
                }

                // Check for emojis in navigation
                const emojiPattern = /[🏠🎯🎉📰🎭]/;
                if (emojiPattern.test(content)) {
                    this.warnings.push(`${file}: Contains emojis in navigation (should be removed)`);
                }

                // Check for relative paths in script tags
                const relativePathPattern = /src="\.\.\/js\//;
                if (relativePathPattern.test(content)) {
                    this.issues.push(`${file}: Contains relative paths in script tags (should be absolute)`);
                }

                // Check for proper color scheme
                const colorPattern = /'washi': '#F8F6F0'/;
                if (colorPattern.test(content)) {
                    this.successes.push(`${file}: Uses correct color scheme`);
                } else {
                    this.warnings.push(`${file}: May not be using the correct color scheme`);
                }

            } catch (err) {
                this.issues.push(`Error reading ${file}: ${err.message}`);
            }
        }
    }

    async verifyJavaScriptFiles() {
        this.log('Verifying JavaScript files...', 'info');
        
        const jsFiles = [
            'js/activities-data.js',
            'js/activities-manager.js',
            'js/real-estate-data.js',
            'js/real-estate-manager.js',
            'js/events-data.js',
            'js/events-manager.js',
            'js/news-data.js',
            'js/news-manager.js',
            'js/culture-data.js',
            'js/culture-manager.js',
            'js/shared-header.js',
            'js/shared-navigation.js',
            'js/shared-footer.js'
        ];

        for (const file of jsFiles) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                // Check file size
                const size = content.length;
                if (size > 0) {
                    this.successes.push(`${file}: Valid JavaScript file (${size} bytes)`);
                } else {
                    this.issues.push(`${file}: Empty file`);
                }

                // Check for basic JavaScript syntax
                if (content.includes('function') || content.includes('const') || content.includes('let') || content.includes('var')) {
                    this.successes.push(`${file}: Contains JavaScript code`);
                } else {
                    this.warnings.push(`${file}: May not contain valid JavaScript`);
                }

            } catch (err) {
                this.issues.push(`Error reading ${file}: ${err.message}`);
            }
        }
    }

    async verifyHttpResponses() {
        this.log('Verifying HTTP responses...', 'info');
        
        // Check if server is running
        const serverCheck = await this.checkHttpResponse('/');
        if (serverCheck.statusCode === 0) {
            this.issues.push('Server is not running on localhost:8000');
            return;
        }

        this.successes.push('Server is running on localhost:8000');

        // Check all pages
        for (const page of this.pages) {
            const response = await this.checkHttpResponse(page);
            
            if (response.statusCode === 200) {
                this.successes.push(`${page}: Returns 200 OK`);
                
                // Check if page has content
                if (response.data && response.data.length > 1000) {
                    this.successes.push(`${page}: Has substantial content`);
                } else {
                    this.warnings.push(`${page}: May have minimal content`);
                }

                // Check for common issues in HTML
                if (response.data.includes('blank') || response.data.includes('white screen')) {
                    this.issues.push(`${page}: Contains references to blank/white screen issues`);
                }

            } else if (response.statusCode === 404) {
                this.issues.push(`${page}: Returns 404 Not Found`);
            } else {
                this.issues.push(`${page}: Returns ${response.statusCode} - ${response.error || 'Unknown error'}`);
            }
        }

        // Check JavaScript files
        for (const jsFile of this.jsFiles) {
            const response = await this.checkHttpResponse(jsFile);
            
            if (response.statusCode === 200) {
                this.successes.push(`${jsFile}: Returns 200 OK`);
            } else {
                this.issues.push(`${jsFile}: Returns ${response.statusCode} - ${response.error || 'Not found'}`);
            }
        }
    }

    async verifyColorScheme() {
        this.log('Verifying color scheme consistency...', 'info');
        
        const htmlFiles = [
            'index.html',
            'activities/index.html',
            'real-estate/index.html',
            'events/index.html',
            'news/index.html',
            'culture/index.html'
        ];

        const expectedColors = [
            "'washi': '#F8F6F0'",
            "'sumi': '#0F0F0F'",
            "'sakura': '#FDF2F8'",
            "'matcha': '#166534'",
            "'kobicha': '#7C2D12'",
            "'aiiro': '#374151'",
            "'shinku': '#991B1B'",
            "'kincha': '#B45309'",
            "'gofun': '#FEFEFE'",
            "'ink-black': '#0F0F0F'",
            "'zen': '#E5E7EB'"
        ];

        for (const file of htmlFiles) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                let colorMatches = 0;
                
                for (const color of expectedColors) {
                    if (content.includes(color)) {
                        colorMatches++;
                    }
                }

                if (colorMatches >= expectedColors.length * 0.8) {
                    this.successes.push(`${file}: Color scheme is consistent`);
                } else {
                    this.warnings.push(`${file}: Color scheme may be inconsistent (${colorMatches}/${expectedColors.length} colors found)`);
                }

            } catch (err) {
                this.issues.push(`Error checking colors in ${file}: ${err.message}`);
            }
        }
    }

    async verifyNavigation() {
        this.log('Verifying navigation consistency...', 'info');
        
        const htmlFiles = [
            'index.html',
            'activities/index.html',
            'real-estate/index.html',
            'events/index.html',
            'news/index.html',
            'culture/index.html'
        ];

        const expectedNavItems = [
            'Home',
            'Activities',
            'Real Estate',
            'Events',
            'News',
            'Culture'
        ];

        for (const file of htmlFiles) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                let navMatches = 0;
                
                for (const navItem of expectedNavItems) {
                    if (content.includes(`>${navItem}<`)) {
                        navMatches++;
                    }
                }

                if (navMatches >= expectedNavItems.length) {
                    this.successes.push(`${file}: Navigation is complete`);
                } else {
                    this.warnings.push(`${file}: Navigation may be incomplete (${navMatches}/${expectedNavItems.length} items found)`);
                }

                // Check for emojis
                if (content.includes('🏠') || content.includes('🎯') || content.includes('🎉') || content.includes('📰') || content.includes('🎭')) {
                    this.issues.push(`${file}: Contains emojis in navigation (should be removed)`);
                }

            } catch (err) {
                this.issues.push(`Error checking navigation in ${file}: ${err.message}`);
            }
        }
    }

    async runAllChecks() {
        this.log('Starting comprehensive build verification...', 'info');
        this.log('==========================================', 'info');

        await this.verifyFileStructure();
        await this.verifyHtmlContent();
        await this.verifyJavaScriptFiles();
        await this.verifyHttpResponses();
        await this.verifyColorScheme();
        await this.verifyNavigation();

        this.log('==========================================', 'info');
        this.log('Build verification complete!', 'info');
        this.log('==========================================', 'info');

        // Print summary
        this.log(`✅ Successes: ${this.successes.length}`, 'success');
        this.log(`⚠️  Warnings: ${this.warnings.length}`, 'warning');
        this.log(`❌ Issues: ${this.issues.length}`, 'error');

        if (this.successes.length > 0) {
            this.log('\n✅ SUCCESSES:', 'success');
            this.successes.forEach(success => this.log(`  ${success}`, 'success'));
        }

        if (this.warnings.length > 0) {
            this.log('\n⚠️  WARNINGS:', 'warning');
            this.warnings.forEach(warning => this.log(`  ${warning}`, 'warning'));
        }

        if (this.issues.length > 0) {
            this.log('\n❌ ISSUES TO FIX:', 'error');
            this.issues.forEach(issue => this.log(`  ${issue}`, 'error'));
        }

        // Provide recommendations
        if (this.issues.length > 0) {
            this.log('\n🔧 RECOMMENDATIONS:', 'info');
            this.log('1. Start the Python HTTP server: python3 -m http.server 8000', 'info');
            this.log('2. Fix any missing files or broken links', 'info');
            this.log('3. Remove emojis from navigation if present', 'info');
            this.log('4. Ensure all script paths are absolute (/js/...)', 'info');
            this.log('5. Verify color scheme consistency across all pages', 'info');
        }

        return {
            successes: this.successes.length,
            warnings: this.warnings.length,
            issues: this.issues.length,
            details: {
                successes: this.successes,
                warnings: this.warnings,
                issues: this.issues
            }
        };
    }
}

// Run the verification
async function main() {
    const verifier = new BuildVerifier();
    const results = await verifier.runAllChecks();
    
    // Exit with appropriate code
    if (results.issues > 0) {
        process.exit(1);
    } else if (results.warnings > 0) {
        process.exit(2);
    } else {
        process.exit(0);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = BuildVerifier; 