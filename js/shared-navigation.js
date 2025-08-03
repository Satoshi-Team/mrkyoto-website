// Shared Navigation Component for MrKyoto
// This ensures consistent navigation across all pages

function createSharedNavigation(currentPage = 'home') {
    const pages = {
        home: { url: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        realEstate: { url: '/real-estate.html', label: 'Real Estate', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        events: { url: '/events.html', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        buyHouse: { url: '/pages/buy-house-kyoto/', label: 'Buy House', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M8 5V3a2 2 0 012-2h4a2 2 0 012 2v2' },
        rentHouse: { url: '/pages/rent-house-kyoto/', label: 'Rent House', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' }
    };

    function createNavLink(pageKey, isActive = false) {
        const page = pages[pageKey];
        const activeClass = isActive ? 'bg-kyoto-plum text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:text-kyoto-plum dark:hover:text-golden-sunrise hover:bg-gray-100 dark:hover:bg-gray-800';
        
        return `
            <a href="${page.url}" class="px-4 py-2 ${activeClass} transition-colors rounded-lg font-medium">
                <span class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${page.icon}"></path>
                    </svg>
                    <span>${page.label}</span>
                </span>
            </a>
        `;
    }

    function createMobileNavLink(pageKey, isActive = false) {
        const page = pages[pageKey];
        const activeClass = isActive ? 'bg-kyoto-plum text-white' : 'text-gray-700 dark:text-gray-300 hover:text-kyoto-plum dark:hover:text-golden-sunrise hover:bg-gray-100 dark:hover:bg-gray-800';
        
        return `
            <a href="${page.url}" class="flex items-center space-x-3 px-3 py-3 ${activeClass} rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${page.icon}"></path>
                </svg>
                <span>${page.label}</span>
            </a>
        `;
    }

    return `
        <!-- Enhanced Navigation -->
        <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <a href="/" class="flex items-center space-x-2 group">
                            <div class="relative">
                                <svg class="w-8 h-8 text-kyoto-plum group-hover:text-deep-crimson transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                                </svg>
                                <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            </div>
                            <span class="font-serif text-xl font-bold text-ink-black dark:text-white group-hover:text-kyoto-plum transition-colors">MrKyoto</span>
                        </a>
                    </div>
                    
                    <!-- Desktop Navigation -->
                    <div class="hidden lg:flex items-center space-x-1">
                        ${createNavLink('home', currentPage === 'home')}
                        ${createNavLink('realEstate', currentPage === 'realEstate')}
                        ${createNavLink('events', currentPage === 'events')}
                        ${createNavLink('buyHouse', currentPage === 'buyHouse')}
                        ${createNavLink('rentHouse', currentPage === 'rentHouse')}
                    </div>
                    
                    <!-- Right side actions -->
                    <div class="hidden md:flex items-center space-x-4">
                        <!-- Search button -->
                        <button class="p-2 text-gray-700 dark:text-gray-300 hover:text-kyoto-plum dark:hover:text-golden-sunrise transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                        

                        
                        <!-- Dark mode toggle -->
                        <button class="p-2 text-gray-700 dark:text-gray-300 hover:text-kyoto-plum dark:hover:text-golden-sunrise transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Mobile menu button -->
                    <div class="lg:hidden">
                        <button id="mobile-menu-button" class="p-2 text-gray-700 dark:text-gray-300 hover:text-kyoto-plum dark:hover:text-golden-sunrise transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Enhanced Mobile Navigation -->
            <div id="mobile-menu" class="hidden lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
                <div class="px-4 py-4 space-y-2">
                    ${createMobileNavLink('home', currentPage === 'home')}
                    ${createMobileNavLink('realEstate', currentPage === 'realEstate')}
                    ${createMobileNavLink('events', currentPage === 'events')}
                    ${createMobileNavLink('buyHouse', currentPage === 'buyHouse')}
                    ${createMobileNavLink('rentHouse', currentPage === 'rentHouse')}
                    
                    <!-- Mobile action buttons -->
                    <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex space-x-2">
                            <button class="flex-1 p-2 text-gray-700 dark:text-gray-300 hover:text-kyoto-plum dark:hover:text-golden-sunrise transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                            <button class="flex-1 p-2 text-gray-700 dark:text-gray-300 hover:text-kyoto-plum dark:hover:text-golden-sunrise transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                            <button class="flex-1 p-2 text-gray-700 dark:text-gray-300 hover:text-kyoto-plum dark:hover:text-golden-sunrise transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
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
    module.exports = { createSharedNavigation, initializeMobileMenu };
} 