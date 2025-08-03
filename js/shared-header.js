// Shared Header Component for MrKyoto
// This ensures consistent navigation across all pages

function createSharedHeader(currentPage = 'home') {
    const pages = {
        home: { url: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        activities: { url: '/activities/', label: 'Activities', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        realEstate: { url: '/real-estate/', label: 'Real Estate', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        events: { url: '/events/', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        news: { url: '/news/', label: 'News', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        liveFromKyoto: { url: '/live-from-kyoto/', label: 'Live from Kyoto', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' }
    };

    function createNavLink(pageKey, isActive = false) {
        const page = pages[pageKey];
        const activeClass = isActive ? 'bg-shinku text-white shadow-md' : 'text-sumi dark:text-gofun hover:text-shinku dark:hover:text-gofun hover:bg-zen dark:hover:bg-aiiro';
        
        return `
            <a href="${page.url}" class="nav-link-desktop ${activeClass}">
                <span class="nav-text">${page.label}</span>
            </a>
        `;
    }

    function createMobileNavLink(pageKey, isActive = false) {
        const page = pages[pageKey];
        const activeClass = isActive ? 'bg-shinku text-white' : 'text-sumi dark:text-gofun hover:text-shinku dark:hover:text-gofun hover:bg-zen dark:hover:bg-aiiro';
        
        return `
            <a href="${page.url}" class="mobile-nav-link ${activeClass}">
                <span class="mobile-nav-text">${page.label}</span>
                <span class="mobile-nav-arrow">→</span>
            </a>
        `;
    }

    return `
        <!-- Header -->
        <header id="header" class="bg-white/95 backdrop-blur-sm dark:bg-sumi/95 border-b border-zen dark:border-aiiro shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <a href="/" class="flex items-center space-x-2 group">
                            <div class="w-8 h-8 bg-gradient-to-br from-shinku to-kobicha rounded-lg flex items-center justify-center">
                                <img src="/images/mrkyoto-logo.png" alt="MrKyoto Logo" width="32" height="32" class="rounded-lg">
                            </div>
                            <span class="text-xl font-serif font-semibold text-ink-black dark:text-gofun group-hover:text-shinku transition-colors">MrKyoto</span>
                        </a>
                    </div>
                    
                    <!-- Desktop Navigation -->
                    <nav class="hidden lg:flex items-center space-x-1">
                        ${createNavLink('home', currentPage === 'home')}
                        ${createNavLink('activities', currentPage === 'activities')}
                        ${createNavLink('realEstate', currentPage === 'realEstate')}
                        ${createNavLink('events', currentPage === 'events')}
                        ${createNavLink('news', currentPage === 'news')}
                        ${createNavLink('liveFromKyoto', currentPage === 'liveFromKyoto')}
                    </nav>
                    
                    <!-- Right side actions -->
                    <div class="hidden md:flex items-center space-x-2">
                        <!-- Language selector -->
                        <div class="relative">
                            <button id="language-toggle" class="action-button" data-tooltip="Language">
                                <span class="flag">🇯🇵</span>
                            </button>
                            <div id="language-dropdown" class="language-dropdown">
                                <div class="dropdown-content">
                                    <a href="#" class="dropdown-item" data-lang="en">
                                        <span class="flag">🇺🇸</span>
                                        <span>English</span>
                                    </a>
                                    <a href="#" class="dropdown-item" data-lang="ja">
                                        <span class="flag">🇯🇵</span>
                                        <span>日本語</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Dark mode toggle -->
                        <button id="theme-toggle" class="action-button" data-tooltip="Toggle theme">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Mobile menu button -->
                    <button id="mobile-menu-button" class="lg:hidden action-button">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- Mobile menu -->
            <div id="mobile-menu" class="lg:hidden hidden bg-white dark:bg-sumi border-t border-zen dark:border-aiiro">
                <div class="px-4 py-6 space-y-4">
                    <!-- Mobile navigation -->
                    <nav class="space-y-2">
                        ${createMobileNavLink('home', currentPage === 'home')}
                        ${createMobileNavLink('activities', currentPage === 'activities')}
                        ${createMobileNavLink('realEstate', currentPage === 'realEstate')}
                        ${createMobileNavLink('events', currentPage === 'events')}
                        ${createMobileNavLink('news', currentPage === 'news')}
                        ${createMobileNavLink('liveFromKyoto', currentPage === 'liveFromKyoto')}
                    </nav>
                    
                    <!-- Contact link -->
                    <a href="mailto:hello@mrkyoto.com" class="contact-link">
                        <span class="contact-icon">✉️</span>
                        <span class="contact-text">Contact Us</span>
                        <span class="contact-arrow">→</span>
                    </a>
                </div>
            </div>
        </header>
    `;
}

// Shared mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate the hamburger icon
            const icon = mobileMenuButton.querySelector('svg');
            if (icon) {
                icon.style.transform = mobileMenu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(90deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('svg');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSharedHeader, initializeMobileMenu };
} 