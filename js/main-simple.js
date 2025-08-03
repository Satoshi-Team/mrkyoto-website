// Simplified MrKyoto App - Focus on Property Loading
class MrKyotoApp {
    constructor() {
        console.log('🚀 MrKyotoApp constructor called');
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        console.log('🔧 MrKyotoApp init() called');
        this.setupThemeToggle();
        this.setupRealEstateData();
        
        // Listen for language changes to re-render property cards
        window.addEventListener('languageChanged', (event) => {
            console.log('🔄 Language changed, re-rendering property cards...');
            setTimeout(() => {
                this.displayHomepageProperties();
            }, 100);
        });
        
        console.log('✅ MrKyotoApp init() completed');
    }

    setupThemeToggle() {
        console.log('🌙 Setting up theme toggle...');
        
        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            this.currentTheme = 'dark';
            console.log('🌙 Initialized dark mode');
        } else {
            document.documentElement.classList.remove('dark');
            this.currentTheme = 'light';
            console.log('☀️ Initialized light mode');
        }

        // Setup theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            console.log('✅ Theme toggle found, adding event listener');
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🌙 Theme toggle clicked!');
                this.toggleTheme();
            });
        } else {
            console.error('❌ Theme toggle not found');
        }
    }

    toggleTheme() {
        const html = document.documentElement;
        const isDark = html.classList.contains('dark');
        
        if (isDark) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            this.currentTheme = 'light';
            console.log('☀️ Switched to light mode');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            this.currentTheme = 'dark';
            console.log('🌙 Switched to dark mode');
        }
    }

    setupRealEstateData() {
        console.log('🚀 setupRealEstateData called');
        
        // Check if realEstateData is available immediately
        if (typeof realEstateData !== 'undefined') {
            console.log('✅ realEstateData is available immediately');
            console.log('🔍 realEstateData methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(realEstateData)));
            console.log('🔍 Sale properties count:', realEstateData.getPropertiesForSale().length);
            console.log('🔍 Rent properties count:', realEstateData.getPropertiesForRent().length);
            this.displayHomepageProperties();
        } else {
            console.log('⏳ realEstateData not available yet, waiting...');
            // Wait a bit and try again
            setTimeout(() => {
                console.log('🔄 Retrying setupRealEstateData...');
                if (typeof realEstateData !== 'undefined') {
                    console.log('✅ realEstateData is now available');
                    this.displayHomepageProperties();
                } else {
                    console.log('❌ realEstateData still not available after timeout');
                }
            }, 1000);
        }
    }

    displayHomepageProperties() {
        console.log('🔍 Checking for homepage properties...');
        console.log('🔍 Current URL:', window.location.href);
        console.log('🔍 Is homepage:', window.location.pathname === '/' || window.location.pathname === '/index.html');
        
        // Check if we're on the homepage and real estate data is available
        if (typeof realEstateData !== 'undefined') {
            console.log('✅ Real estate data is available');
            console.log('🔍 realEstateData object:', realEstateData);
            
            // Try multiple possible container selectors
            let featuredContainer = document.querySelector('#properties-grid');
            console.log('🔍 #properties-grid found:', !!featuredContainer);
            
            if (!featuredContainer) {
                featuredContainer = document.querySelector('#featured-properties .grid');
                console.log('🔍 #featured-properties .grid found:', !!featuredContainer);
            }
            if (!featuredContainer) {
                featuredContainer = document.querySelector('#featured-properties');
                console.log('🔍 #featured-properties found:', !!featuredContainer);
            }
            
            if (featuredContainer) {
                console.log('✅ Found featured properties container:', featuredContainer);
                console.log('🔍 Container classes:', featuredContainer.className);
                console.log('🔍 Container computed style:', window.getComputedStyle(featuredContainer).display);
                console.log('🔍 Container innerHTML before:', featuredContainer.innerHTML.substring(0, 100));
                
                // Get all properties for sale and rent
                const saleProperties = realEstateData.getPropertiesForSale();
                const rentProperties = realEstateData.getPropertiesForRent();
                const featuredProperties = [...saleProperties, ...rentProperties];
                
                console.log(`📊 Found ${featuredProperties.length} featured properties`);
                console.log('🔍 Sale properties:', saleProperties.length);
                console.log('🔍 Rent properties:', rentProperties.length);
                console.log('🔍 First property:', featuredProperties[0]);
                
                if (featuredProperties.length > 0) {
                    console.log('🎨 Rendering property cards...');
                    const propertyCards = featuredProperties.map(property => 
                        this.createPropertyCard(property)
                    );
                    console.log('🔍 Generated property cards:', propertyCards.length);
                    console.log('🔍 First card HTML:', propertyCards[0]);
                    
                                                    featuredContainer.innerHTML = propertyCards.join('');
                                console.log('✅ Property cards rendered successfully');
                                console.log('🔍 Container innerHTML after:', featuredContainer.innerHTML.substring(0, 100));

                                // Update featured and premium counts
                                const featuredCountElement = document.getElementById('featured-count');
                                const premiumCountElement = document.getElementById('premium-count');
                                
                                if (featuredCountElement) {
                                    featuredCountElement.textContent = featuredProperties.length;
                                    console.log('✅ Updated featured count:', featuredProperties.length);
                                }
                                
                                if (premiumCountElement) {
                                    // Count premium properties (those with high walk scores or luxury features)
                                    const premiumProperties = featuredProperties.filter(property => 
                                        parseInt(property.walkScore) >= 90 || 
                                        property.features.some(feature => 
                                            feature.toLowerCase().includes('luxury') || 
                                            feature.toLowerCase().includes('premium') ||
                                            feature.toLowerCase().includes('hot spring')
                                        )
                                    );
                                    premiumCountElement.textContent = premiumProperties.length;
                                    console.log('✅ Updated premium count:', premiumProperties.length);
                                }

                                // Force grid display after rendering
                                setTimeout(() => {
                                    featuredContainer.style.display = 'grid';
                                    console.log('🔧 Forced grid display');
                                }, 100);
                } else {
                    console.log('⚠️  No properties found, showing fallback message');
                    featuredContainer.innerHTML = `
                        <div class="col-span-1 md:col-span-2 text-center py-8">
                            <div class="text-4xl mb-4" role="img" aria-label="No properties">🏠</div>
                            <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">Properties Coming Soon</h3>
                            <p class="text-sumi/70 dark:text-gray-300">We're updating our property listings. Please check back soon!</p>
                        </div>
                    `;
                }
            } else {
                console.log('❌ Featured properties container not found');
                console.log('🔍 Available containers:', document.querySelectorAll('[id*="property"]'));
                console.log('🔍 All containers with "grid" class:', document.querySelectorAll('.grid'));
            }
        } else {
            console.log('❌ Real estate data not available');
            console.log('🔍 typeof realEstateData:', typeof realEstateData);
            console.log('🔍 window.realEstateData:', window.realEstateData);
        }
    }

    createPropertyCard(property) {
        // Validate property data (temporarily disabled for debugging)
        // if (!this.validatePropertyData(property)) {
        //     console.warn('⚠️ Invalid property data:', property.id);
        //     return '';
        // }
        
        const isRental = property.type?.toLowerCase().includes('rent') || property.id.includes('rent');
        const isVerified = true; // Temporarily set to true
        
        // Get translations if available
        const getTranslation = (key, fallback) => {
            if (window.translationManager) {
                const translation = window.translationManager.getTranslation(key);
                return translation || fallback;
            }
            return fallback;
        };
        
        const viewDetailsText = getTranslation('property.viewDetails', 'View Details');
        const contactText = getTranslation('property.contact', 'Contact');
        const bedText = getTranslation('property.bed', 'Bed');
        const bathText = getTranslation('property.bath', 'Bath');
        const sqftText = getTranslation('property.sqft', 'sqft');
        const forSaleText = getTranslation('property.forSale', 'For Sale');
        const forRentText = getTranslation('property.forRent', 'For Rent');
        const verifiedText = getTranslation('property.verified', 'Verified');
        const walkText = getTranslation('property.walk', 'Walk');
        const featuresText = getTranslation('property.features', 'Features');
        const moreText = getTranslation('property.more', 'more');
        
        return `
            <div class="zen-card border border-red-300 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col" data-property-id="${property.id}">
                <!-- Property Image -->
                <div class="relative overflow-hidden rounded-t-lg h-40 sm:h-44 md:h-48 lg:h-52">
                    <img src="${property.image}" alt="${property.title}" 
                         class="w-full h-full object-cover"
                         loading="lazy">
                    <div class="absolute top-3 left-3 bg-[#000000] text-white px-2 py-1 rounded text-xs font-bold" style="color: white !important;">
                        ${isRental ? forRentText : forSaleText}
                    </div>
                    <div class="absolute top-3 right-3 bg-[#d9c289] text-white px-2 py-1 rounded text-xs font-bold">
                        ${property.walkScore} ${walkText}
                    </div>
                    ${isVerified ? `<span class="absolute bottom-3 right-3 bg-[#d9c289] text-white px-2 py-1 rounded text-xs font-bold">${verifiedText}</span>` : ''}
                </div>
                
                <!-- Property Content -->
                <div class="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
                    <!-- Header -->
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1 min-w-0">
                                                    <h3 class="font-serif text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
                            ${property.title}
                        </h3>
                                                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">
                            <span class="inline-block mr-2">📍 ${property.location}</span>
                            <span class="inline-block">🏘️ ${property.neighborhood}</span>
                        </p>
                                                    <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <span class="truncate">Listed by: ${property.agency}</span>
                            <span>•</span>
                            <span class="truncate">ID: ${property.id}</span>
                        </div>
                        </div>
                                            <div class="text-right ml-2">
                        <div class="text-base sm:text-lg lg:text-xl font-bold text-red-600">${property.price}</div>
                        <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${property.priceUSD}</div>
                    </div>
                    </div>
                    
                                                    <!-- Property Stats -->
                                <div class="grid grid-cols-3 gap-1 sm:gap-2 mb-3 sm:mb-4">
                                    <div class="text-center p-1 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                        <div class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">${property.bedrooms}</div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">${bedText}</div>
                                    </div>
                                    <div class="text-center p-1 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                        <div class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">${property.bathrooms}</div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">${bathText}</div>
                                    </div>
                                    <div class="text-center p-1 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                        <div class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">${property.size}</div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">${sqftText}</div>
                                    </div>
                                </div>
                    
                    <!-- Features -->
                    <div class="mb-3 sm:mb-4">
                        <h4 class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">${featuresText}:</h4>
                        <div class="flex flex-wrap gap-1">
                            ${property.features.slice(0, 2).map(feature => 
                                `<span class="bg-[#d9c289]/20 dark:bg-[#d9c289]/30 text-[#d9c289] dark:text-[#d9c289] text-xs px-1.5 py-0.5 rounded">${feature}</span>`
                            ).join('')}
                            ${property.features.length > 2 ? 
                                `<span class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-1.5 py-0.5 rounded">+${property.features.length - 2} ${moreText}</span>` : 
                                ''
                            }
                        </div>
                    </div>
                    
                    <!-- Property Actions -->
                    <div class="flex gap-1 sm:gap-2 mt-auto">
                        <a href="/real-estate/#property-${property.id}" 
                           class="flex-1 bg-[#000000] text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-semibold hover:bg-[#000000]/80 transition-colors text-center" style="color: white !important;">
                            ${viewDetailsText}
                        </a>
                        <a href="tel:${property.contact}" 
                           class="flex-1 bg-[#d9c289] text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-semibold hover:bg-[#d9c289]/80 transition-colors text-center">
                            ${contactText}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOMContentLoaded - Initializing MrKyotoApp...');
    
    try {
        // Initialize theme manager
        if (typeof ThemeLanguageManager !== 'undefined') {
            window.themeLanguageManager = new ThemeLanguageManager();
            console.log('✅ ThemeLanguageManager initialized successfully');
        } else {
            console.warn('⚠️ ThemeLanguageManager not available');
        }
        
        // Initialize mobile menu
        if (typeof initializeMobileMenu !== 'undefined') {
            initializeMobileMenu();
            console.log('✅ Mobile menu initialized successfully');
        } else {
            console.warn('⚠️ initializeMobileMenu not available');
        }
        
        window.mrKyotoApp = new MrKyotoApp();
        console.log('✅ MrKyotoApp initialized successfully');
        
        // Force display of homepage properties after a short delay
        setTimeout(() => {
            console.log('🔄 Force checking homepage properties...');
            if (window.mrKyotoApp && typeof realEstateData !== 'undefined') {
                window.mrKyotoApp.displayHomepageProperties();
            }
        }, 500);
        
        // Additional fallback for properties display
        setTimeout(() => {
            console.log('🔄 Final fallback for homepage properties...');
            if (window.mrKyotoApp) {
                window.mrKyotoApp.displayHomepageProperties();
            }
        }, 2000);
        
    } catch (error) {
        console.error('❌ Failed to initialize MrKyotoApp:', error);
    }
});

// Global test function for debugging
window.testProperties = function() {
    console.log('🧪 Global test function called');
    console.log('🔍 realEstateData available:', typeof realEstateData !== 'undefined');
    if (typeof realEstateData !== 'undefined') {
        console.log('🔍 Sale properties:', realEstateData.getPropertiesForSale().length);
        console.log('🔍 Rent properties:', realEstateData.getPropertiesForRent().length);
        console.log('🔍 First property:', realEstateData.getPropertiesForSale()[0]);
    }
    console.log('🔍 mrKyotoApp available:', !!window.mrKyotoApp);
    if (window.mrKyotoApp) {
        window.mrKyotoApp.displayHomepageProperties();
    }
}; 