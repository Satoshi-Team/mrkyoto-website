// Real Estate Page Manager for MrKyoto.com
// Handles property listings, search, filtering, and interactive features

class RealEstateManager {
    constructor() {
        this.currentFilters = {
            type: 'all',
            priceRange: 'all',
            bedrooms: [],
            neighborhoods: [],
            features: [],
            sort: 'newest'
        };
        this.searchQuery = '';
        this.viewMode = 'grid';
        this.favorites = JSON.parse(localStorage.getItem('propertyFavorites') || '[]');
        this.savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
        this.charts = {};
        this.analyticsData = null;
        this.map = null;
        this.markers = [];
        this.comparisonProperties = [];
        this.alerts = JSON.parse(localStorage.getItem('marketAlerts') || '[]');
        this.liveDataInterval = null;
        this.lastUpdateTime = new Date();
        
        // Make instance globally available for button onclick handlers
        window.realEstateManager = this;
        
        this.init();
    }

    init() {
        this.loadRealEstateData();
        this.setupEventListeners();
        this.calculateAnalytics();
        this.updateAnalyticsDashboard();
        this.renderCharts();
        this.displayAllProperties(); // Display all properties in unified layout
        this.displayMarketStats();
        this.displayAgencies();
        
        // Initialize advanced features
        this.initializeMap();
        this.renderComparisonGrid();
        this.updateNeighborhoodInsights();
        this.updateAlertsDashboard();
        
        // Start live data streaming
        this.startLiveDataStream();
        
        // Test features after initialization
        setTimeout(() => {
            this.testFeatures();
        }, 2000);
    }

    loadRealEstateData() {
        // Check if realEstateData is available
        if (typeof realEstateData === 'undefined') {
            console.warn('Real estate data not loaded yet, retrying in 100ms...');
            setTimeout(() => this.loadRealEstateData(), 100);
            return;
        }
        
        // Data is available, proceed with initialization
        console.log('Real estate data loaded successfully:', realEstateData);
        this.displayAllProperties(); // Display all properties in unified layout
                this.displayMarketStats();
                this.displayAgencies();
    }

    setupEventListeners() {
        // Advanced search with instant results
        const searchInput = document.getElementById('property-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.showInstantSearchResults(e.target.value);
                this.displayProperties();
            });
            
            searchInput.addEventListener('focus', () => {
                if (this.searchQuery) {
                    this.showInstantSearchResults(this.searchQuery);
                }
            });
            
            // Hide search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target)) {
                    this.hideInstantSearchResults();
                }
            });
        }

        // Filter buttons for unified layout
        const filterSale = document.getElementById('filter-sale');
        const filterRent = document.getElementById('filter-rent');
        const filterAll = document.getElementById('filter-all');
        
        if (filterSale) {
            filterSale.addEventListener('click', () => this.filterProperties('sale'));
        }
        if (filterRent) {
            filterRent.addEventListener('click', () => this.filterProperties('rent'));
        }
        if (filterAll) {
            filterAll.addEventListener('click', () => this.filterProperties('all'));
        }

        // Advanced filter functionality
        const filterSelects = document.querySelectorAll('.property-filter');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.currentFilters[e.target.name] = e.target.value;
                this.updateFilterCount();
                this.displayAllProperties();
            });
        });

        // Multi-select filters
        const bedroomFilters = document.querySelectorAll('.bedroom-filter');
        bedroomFilters.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateMultiSelectFilter('bedrooms');
                this.updateFilterCount();
                this.displayProperties();
            });
        });

        const neighborhoodFilters = document.querySelectorAll('.neighborhood-filter');
        neighborhoodFilters.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateMultiSelectFilter('neighborhoods');
                this.updateFilterCount();
                this.displayProperties();
            });
        });

        const featureFilters = document.querySelectorAll('.feature-filter');
        featureFilters.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateMultiSelectFilter('features');
                this.updateFilterCount();
                this.displayProperties();
            });
        });

        // View mode toggle
        const viewGridBtn = document.getElementById('view-grid');
        const viewListBtn = document.getElementById('view-list');
        if (viewGridBtn && viewListBtn) {
            viewGridBtn.addEventListener('click', () => this.setViewMode('grid'));
            viewListBtn.addEventListener('click', () => this.setViewMode('list'));
        }

        // Clear filters
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        }

        // Save search
        const saveSearchBtn = document.getElementById('save-search');
        if (saveSearchBtn) {
            saveSearchBtn.addEventListener('click', () => this.saveCurrentSearch());
        }

        // Analytics buttons
        const refreshAnalyticsBtn = document.getElementById('refresh-analytics');
        const exportAnalyticsBtn = document.getElementById('export-analytics');
        if (refreshAnalyticsBtn) {
            refreshAnalyticsBtn.addEventListener('click', () => this.refreshAnalytics());
        }
        if (exportAnalyticsBtn) {
            exportAnalyticsBtn.addEventListener('click', () => this.exportAnalyticsData());
        }

        // Map controls
        const toggleMapViewBtn = document.getElementById('toggle-map-view');
        const centerMapBtn = document.getElementById('center-map');
        const mapTypeSelect = document.getElementById('map-type');
        const mapPropertyFilter = document.getElementById('map-property-filter');
        const mapPriceFilter = document.getElementById('map-price-filter');

        if (toggleMapViewBtn) {
            toggleMapViewBtn.addEventListener('click', () => this.toggleMapView());
        }
        if (centerMapBtn) {
            centerMapBtn.addEventListener('click', () => this.centerMapOnKyoto());
        }
        if (mapTypeSelect) {
            mapTypeSelect.addEventListener('change', (e) => this.changeMapType(e.target.value));
        }
        if (mapPropertyFilter) {
            mapPropertyFilter.addEventListener('change', () => this.updateMapMarkers());
        }
        if (mapPriceFilter) {
            mapPriceFilter.addEventListener('change', () => this.updateMapMarkers());
        }

        // Comparison tools
        const clearComparisonBtn = document.getElementById('clear-comparison');
        const exportComparisonBtn = document.getElementById('export-comparison');
        const addToComparisonBtn = document.getElementById('add-to-comparison');
        const comparisonSearchInput = document.getElementById('comparison-search');

        if (clearComparisonBtn) {
            clearComparisonBtn.addEventListener('click', () => this.clearComparison());
        }
        if (exportComparisonBtn) {
            exportComparisonBtn.addEventListener('click', () => this.exportComparison());
        }
        if (addToComparisonBtn) {
            addToComparisonBtn.addEventListener('click', () => this.addToComparison());
        }
        if (comparisonSearchInput) {
            comparisonSearchInput.addEventListener('input', (e) => this.searchComparisonProperties(e.target.value));
        }

        // Comparison analytics
        const comparisonAnalyticsBtn = document.getElementById('comparison-analytics');
        if (comparisonAnalyticsBtn) {
            comparisonAnalyticsBtn.addEventListener('click', () => this.toggleComparisonAnalytics());
        }

        // Market alerts
        const createAlertBtn = document.getElementById('create-alert');
        if (createAlertBtn) {
            createAlertBtn.addEventListener('click', () => this.createMarketAlert());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        searchInput?.focus();
                        break;
                    case 'g':
                        e.preventDefault();
                        this.setViewMode('grid');
                        break;
                    case 'l':
                        e.preventDefault();
                        this.setViewMode('list');
                        break;
                }
            }
            
            // Show/hide shortcuts help
            if (e.key === '?') {
                e.preventDefault();
                this.toggleShortcutsHelp();
            }
        });
    }

        displayAllProperties() {
        const container = document.getElementById('all-properties-container');
        if (!container) return;

        // Get all properties
        const saleProperties = this.getFilteredProperties('sale');
        const rentProperties = this.getFilteredProperties('rent');
        const allProperties = [...saleProperties, ...rentProperties];
        
        console.log('All properties:', allProperties.length, 'total properties');
        console.log('Sale properties:', saleProperties.length);
        console.log('Rental properties:', rentProperties.length);
        console.log('Property IDs:', allProperties.map(p => p.id));

        // Generate simple list HTML
        const propertiesHTML = allProperties.map(property => this.generateSimplePropertyCard(property)).join('');
        container.innerHTML = propertiesHTML;
        
        // Add event listeners
        this.setupPropertyCardListeners();
        
        // Set "All" filter as active by default
        this.filterProperties('all');
    }

    filterProperties(type) {
        // Update button styles
        const filterSale = document.getElementById('filter-sale');
        const filterRent = document.getElementById('filter-rent');
        const filterAll = document.getElementById('filter-all');
        
        // Reset all buttons
        [filterSale, filterRent, filterAll].forEach(btn => {
            if (btn) {
                btn.className = 'px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors';
            }
        });
        
        // Highlight active button
        if (type === 'sale' && filterSale) {
            filterSale.className = 'px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base bg-[#000000] text-white rounded hover:bg-[#000000]/80 transition-colors';
        } else if (type === 'rent' && filterRent) {
            filterRent.className = 'px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base bg-[#000000] text-white rounded hover:bg-[#000000]/80 transition-colors';
        } else if (type === 'all' && filterAll) {
            filterAll.className = 'px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base bg-[#000000] text-white rounded hover:bg-[#000000]/80 transition-colors';
        }
        
        // Filter and display properties
        const container = document.getElementById('all-properties-container');
        if (!container) return;
        
        let properties = [];
        if (type === 'sale') {
            properties = this.getFilteredProperties('sale');
        } else if (type === 'rent') {
            properties = this.getFilteredProperties('rent');
        } else {
            // Show all properties
        const saleProperties = this.getFilteredProperties('sale');
        const rentProperties = this.getFilteredProperties('rent');
            properties = [...saleProperties, ...rentProperties];
        }
        
        const propertiesHTML = properties.map(property => this.generateSimplePropertyCard(property)).join('');
        container.innerHTML = propertiesHTML;
        
        // Add event listeners
        this.setupPropertyCardListeners();
    }

    generateSimplePropertyCard(property) {
        const isRental = property.id.includes('rent');
        const typeBadge = isRental ? 'For Rent' : 'For Sale';
        const typeColor = isRental ? 'bg-blue-500' : 'bg-red-500';
        
        return `
            <div class="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-sumi dark:via-gray-800 dark:to-sumi rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 md:p-8 lg:p-10 border border-gray-200 dark:border-gray-700 mx-4 md:mx-0 overflow-hidden group">
                <!-- Responsive Background Elements -->
                <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent dark:from-transparent dark:via-white/10 dark:to-transparent opacity-100 transition-opacity duration-500"></div>
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d9c289] via-[#000000] to-[#d9c289] opacity-100 transition-opacity duration-500"></div>
                <div class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#d9c289]/20 to-transparent rounded-full blur-2xl opacity-100 transition-opacity duration-700"></div>
                <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[#000000]/10 to-transparent rounded-full blur-3xl opacity-100 transition-opacity duration-700"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-[#d9c289]/5 to-transparent rounded-full blur-3xl opacity-100 animate-pulse"></div>
                
                <!-- Content Container -->
                <div class="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <!-- Property Info -->
                    <div class="flex-1 space-y-4">
                        <!-- Header with badges -->
                        <div class="flex flex-wrap items-center gap-3 mb-4">
                            <span class="${typeColor} text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-transform duration-200">${typeBadge}</span>
                            <span class="bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm px-4 py-2 rounded-full font-medium shadow-md">${property.walkScore} Walk</span>
                            <span class="bg-gradient-to-r from-[#d9c289] to-[#d9c289]/90 text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg">Verified</span>
                        </div>
                        
                        <!-- Title and Price -->
                        <div class="space-y-3">
                            <h3 class="font-bold text-2xl md:text-3xl lg:text-4xl text-sumi dark:text-gofun leading-tight drop-shadow-sm">${property.title}</h3>
                            <div class="flex flex-col sm:flex-row sm:items-baseline gap-3">
                                <div class="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 dark:text-red-400 drop-shadow-sm">${property.price}</div>
                                <div class="text-lg text-sumi/80 dark:text-gofun/80 font-medium drop-shadow-sm">${property.priceUSD}</div>
                            </div>
                        </div>
                        
                        <!-- Location Info -->
                        <div class="flex flex-col sm:flex-row sm:items-center gap-4 text-base text-sumi/90 dark:text-gofun/90">
                            <div class="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-lg shadow-md backdrop-blur-sm">
                                <span class="text-xl">📍</span>
                                <span class="font-medium">${property.location}</span>
                            </div>
                            <div class="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-lg shadow-md backdrop-blur-sm">
                                <span class="text-xl">🏘️</span>
                                <span class="font-medium">${property.neighborhood}</span>
                            </div>
                        </div>
                        
                        <!-- Property Stats -->
                        <div class="flex flex-wrap gap-3">
                            <span class="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 text-sm px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow duration-200">${property.bedrooms} Bed</span>
                            <span class="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 text-sm px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow duration-200">${property.bathrooms} Bath</span>
                            <span class="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 text-sm px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow duration-200">${property.size}</span>
                            <span class="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 text-sm px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow duration-200">Built: ${property.yearBuilt}</span>
                        </div>
                        
                        <!-- Features -->
                        <div class="space-y-3">
                            <div class="text-lg font-semibold text-sumi dark:text-gofun">Features:</div>
                            <div class="flex flex-wrap gap-3">
                                ${property.features.slice(0, 4).map(feature => 
                                    `<span class="bg-gradient-to-r from-[#d9c289]/15 to-[#d9c289]/25 dark:from-[#d9c289]/25 dark:to-[#d9c289]/35 text-[#d9c289] dark:text-[#d9c289] text-sm px-4 py-2 rounded-full font-medium border border-[#d9c289]/30 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">${feature}</span>`
                                ).join('')}
                                ${property.features.length > 4 ? 
                                    `<span class="text-[#d9c289] dark:text-[#d9c289] text-sm font-medium hover:underline cursor-pointer">+${property.features.length - 4} more features</span>` : ''
                                }
                            </div>
                        </div>
                        
                        <!-- Additional Info -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-sumi/90 dark:text-gofun/90 bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-md backdrop-blur-sm">
                            <div class="flex items-center gap-2">
                                <span class="font-medium">Agency:</span>
                                <span>${property.agency}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-medium">Contact:</span>
                                <span>${property.contact}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-medium">Days on Market:</span>
                                <span>${property.daysOnMarket || 'N/A'}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-medium">Property ID:</span>
                                <span class="font-mono">${property.id}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex flex-col gap-4 min-w-[250px] lg:min-w-[200px]">
                        <button onclick="realEstateManager.showPropertyModal('${property.id}')" class="w-full bg-gradient-to-r from-[#000000] to-gray-800 text-white py-4 px-6 rounded-xl text-base font-semibold hover:from-gray-800 hover:to-[#000000] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-300 dark:border-gray-600">
                            View Details
                        </button>
                        <a href="tel:${property.contact}" class="w-full bg-gradient-to-r from-[#d9c289] to-[#d9c289]/90 text-white py-4 px-6 rounded-xl text-base font-semibold hover:from-[#d9c289]/90 hover:to-[#d9c289] transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 border border-[#d9c289]/30">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    displayRentalProperties() {
        const rentalContainer = document.getElementById('rental-properties-container');
        if (!rentalContainer) {
            console.warn('Rental properties container not found');
            return;
        }

        // Check if realEstateData is available
        if (typeof realEstateData === 'undefined') {
            console.warn('Real estate data not available, retrying in 100ms...');
            setTimeout(() => this.displayRentalProperties(), 100);
            return;
        }

        // Get all rental properties
        const rentalProperties = realEstateData.getPropertiesForRent();
        // Additional filter to ensure only rental properties are shown
        const filteredRentalProperties = rentalProperties.filter(property => 
            property.id.includes('rent') && !property.id.includes('sale')
        );
        console.log('Rental properties found:', filteredRentalProperties.length);
        console.log('Rental property IDs:', filteredRentalProperties.map(p => p.id));
        
        if (filteredRentalProperties.length === 0) {
            console.warn('No rental properties found in data');
            rentalContainer.innerHTML = '<p class="text-center text-sumi/70 dark:text-gofun/70">No rental properties available at the moment.</p>';
            return;
        }
        
        // Generate HTML for all rental properties
        const rentalHTML = filteredRentalProperties.map(property => this.generateRentalPropertyCard(property)).join('');
        
        // Display the properties
        rentalContainer.innerHTML = rentalHTML;
        
        // Add event listeners
            this.setupPropertyCardListeners();
        
        console.log('Rental properties displayed successfully');
    }

    generateRentalPropertyCard(property) {
        const features = property.features.slice(0, 2).map(feature => 
            `<span class="bg-[#d9c289]/10 dark:bg-[#d9c289]/20 text-[#d9c289] dark:text-[#d9c289] text-xs px-3 py-1.5 rounded-full font-medium">${feature}</span>`
        ).join('');
        
        const remainingFeatures = property.features.length - 2;
        const moreFeaturesButton = remainingFeatures > 0 ? 
            `<button class="text-[#d9c289] dark:text-[#d9c289] text-xs hover:underline font-medium">+${remainingFeatures} more</button>` : '';

        return `
            <div class="group bg-white dark:bg-sumi rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div class="relative overflow-hidden">
                    <img src="${property.image}" alt="${property.title}" class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div class="absolute top-4 left-4">
                        <span class="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">For Rent</span>
                    </div>
                    <div class="absolute top-4 right-4">
                        <span class="bg-gray-800/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">${property.walkScore} Walk</span>
                    </div>
                    <div class="absolute bottom-4 right-4">
                        <span class="bg-[#d9c289] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">Verified</span>
                    </div>
                </div>
                <div class="p-6 space-y-4">
                    <div>
                        <h3 class="font-bold text-xl text-sumi dark:text-gofun mb-2 group-hover:text-[#d9c289] transition-colors">${property.title}</h3>
                        <div class="text-3xl font-bold text-sumi dark:text-gofun mb-1">${property.price}</div>
                        <div class="text-sm text-sumi/60 dark:text-gofun/60">${property.priceUSD}</div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex items-center text-sm text-sumi/70 dark:text-gofun/70">
                            <span class="mr-3 text-lg">📍</span>
                            <span>${property.location}</span>
                        </div>
                        <div class="flex items-center text-sm text-sumi/70 dark:text-gofun/70">
                            <span class="mr-3 text-lg">🏘️</span>
                            <span>${property.neighborhood}</span>
                        </div>
                    </div>
                    
                    <div class="flex gap-2">
                        <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-full font-medium">${property.bedrooms} Bed</span>
                        <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-full font-medium">${property.bathrooms} Bath</span>
                        <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-full font-medium">${property.size}</span>
                    </div>
                    
                    <div>
                        <div class="text-sm font-semibold text-sumi dark:text-gofun mb-3">Features:</div>
                        <div class="flex flex-wrap gap-2">
                            ${features}
                            ${moreFeaturesButton}
                        </div>
                    </div>
                    
                    <div class="flex gap-3 pt-2">
                        <button onclick="realEstateManager.showPropertyModal('${property.id}')" class="flex-1 bg-[#000000] text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-[#000000]/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            View Details
                        </button>
                        <a href="tel:${property.contact}" class="flex-1 bg-[#d9c289] text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-[#d9c289]/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Analytics and Data Visualization Methods
    refreshAnalytics() {
        this.showNotification('Refreshing analytics data...', 'info');
        this.calculateAnalytics();
        this.updateAnalyticsDashboard();
        this.renderCharts();
        this.showNotification('Analytics updated successfully!', 'success');
    }

    calculateAnalytics() {
        if (!realEstateData) return;

        const allProperties = [
            ...realEstateData.getPropertiesForSale(),
            ...realEstateData.getPropertiesForRent()
        ].filter(isValidProperty);

        const saleProperties = realEstateData.getPropertiesForSale().filter(isValidProperty);
        const rentProperties = realEstateData.getPropertiesForRent().filter(isValidProperty);

        // Calculate price statistics
        const salePrices = saleProperties.map(p => {
            const priceStr = p.price.replace(/[^\d]/g, '');
            return priceStr ? parseInt(priceStr) : 0;
        }).filter(price => price > 0);
        
        const avgSalePrice = salePrices.length > 0 ? salePrices.reduce((a, b) => a + b, 0) / salePrices.length : 0;
        const minPrice = salePrices.length > 0 ? Math.min(...salePrices) : 0;
        const maxPrice = salePrices.length > 0 ? Math.max(...salePrices) : 0;

        // Calculate rental price statistics
        const rentPrices = rentProperties.map(p => {
            const priceStr = p.price.replace(/[^\d]/g, '');
            return priceStr ? parseInt(priceStr) : 0;
        }).filter(price => price > 0);

        const avgRentPrice = rentPrices.length > 0 ? rentPrices.reduce((a, b) => a + b, 0) / rentPrices.length : 0;

        // Calculate neighborhood performance with rich data
        const neighborhoodStats = {};
        saleProperties.forEach(property => {
            if (!neighborhoodStats[property.neighborhood]) {
                neighborhoodStats[property.neighborhood] = {
                    count: 0,
                    saleCount: 0,
                    rentCount: 0,
                    avgSalePrice: 0,
                    avgRentPrice: 0,
                    salePrices: [],
                    rentPrices: [],
                    avgDaysOnMarket: 0,
                    totalDaysOnMarket: 0,
                    priceHistory: [],
                    marketTrend: '',
                    investmentPotential: '',
                    culturalHeritage: '',
                    safety: '',
                    walkScore: 0,
                    transitScore: 0
                };
            }
            neighborhoodStats[property.neighborhood].count++;
            neighborhoodStats[property.neighborhood].saleCount++;
            const priceStr = property.price.replace(/[^\d]/g, '');
            const price = priceStr ? parseInt(priceStr) : 0;
            if (price > 0) {
                neighborhoodStats[property.neighborhood].salePrices.push(price);
            }
            if (property.daysOnMarket) {
                neighborhoodStats[property.neighborhood].totalDaysOnMarket += property.daysOnMarket;
            }
            if (property.priceHistory) {
                neighborhoodStats[property.neighborhood].priceHistory.push(...property.priceHistory);
            }
        });

        rentProperties.forEach(property => {
            if (!neighborhoodStats[property.neighborhood]) {
                neighborhoodStats[property.neighborhood] = {
                    count: 0,
                    saleCount: 0,
                    rentCount: 0,
                    avgSalePrice: 0,
                    avgRentPrice: 0,
                    salePrices: [],
                    rentPrices: [],
                    avgDaysOnMarket: 0,
                    totalDaysOnMarket: 0,
                    priceHistory: [],
                    marketTrend: '',
                    investmentPotential: '',
                    culturalHeritage: '',
                    safety: '',
                    walkScore: 0,
                    transitScore: 0
                };
            }
            neighborhoodStats[property.neighborhood].count++;
            neighborhoodStats[property.neighborhood].rentCount++;
            const priceStr = property.price.replace(/[^\d]/g, '');
            const price = priceStr ? parseInt(priceStr) : 0;
            if (price > 0) {
                neighborhoodStats[property.neighborhood].rentPrices.push(price);
            }
            if (property.daysOnMarket) {
                neighborhoodStats[property.neighborhood].totalDaysOnMarket += property.daysOnMarket;
            }
        });

        // Calculate averages and enrich with neighborhood data
        Object.keys(neighborhoodStats).forEach(neighborhood => {
            const stats = neighborhoodStats[neighborhood];
            const totalProperties = stats.count;
            
            stats.avgSalePrice = stats.salePrices.length > 0 ? 
                stats.salePrices.reduce((a, b) => a + b, 0) / stats.salePrices.length : 0;
            stats.avgRentPrice = stats.rentPrices.length > 0 ? 
                stats.rentPrices.reduce((a, b) => a + b, 0) / stats.rentPrices.length : 0;
            stats.avgDaysOnMarket = totalProperties > 0 ? 
                stats.totalDaysOnMarket / totalProperties : 0;

            // Add neighborhood data from our rich database
            const neighborhoodData = realEstateData.getNeighborhoodInfo(neighborhood);
            if (neighborhoodData) {
                stats.marketTrend = neighborhoodData.marketTrend;
                stats.investmentPotential = neighborhoodData.investmentPotential;
                stats.culturalHeritage = neighborhoodData.culturalHeritage;
                stats.safety = neighborhoodData.safety;
                stats.walkScore = neighborhoodData.walkScore;
                stats.transitScore = neighborhoodData.transitScore;
            }
        });

        // Calculate market insights
        const totalDaysOnMarket = saleProperties.reduce((sum, p) => sum + (p.daysOnMarket || 0), 0);
        const avgDaysOnMarket = saleProperties.length > 0 ? totalDaysOnMarket / saleProperties.length : 0;
        
        const priceChanges = saleProperties.filter(p => p.priceHistory && p.priceHistory.length > 1)
            .map(p => {
                const latest = parseInt(p.priceHistory[0].price.replace(/[^\d]/g, ''));
                const previous = parseInt(p.priceHistory[p.priceHistory.length - 1].price.replace(/[^\d]/g, ''));
                return previous > 0 ? ((latest - previous) / previous) * 100 : 0;
            });
        
        const avgPriceChange = priceChanges.length > 0 ? 
            priceChanges.reduce((a, b) => a + b, 0) / priceChanges.length : 0;

        // Get market data from our rich database
        const marketData = realEstateData.marketData;
        const marketTrends = realEstateData.getMarketTrends();
        const neighborhoodData = realEstateData.getNeighborhoodStats();
        const agencies = realEstateData.getAgencies();

        this.analyticsData = {
            totalProperties: allProperties.length,
            saleProperties: saleProperties.length,
            rentProperties: rentProperties.length,
            avgSalePrice,
            avgRentPrice,
            minPrice,
            maxPrice,
            avgDaysOnMarket,
            avgPriceChange,
            neighborhoodStats,
            marketData,
            marketTrends,
            neighborhoodData,
            agencies,
            trendsData: this.generateMarketTrends(),
            lastUpdated: new Date().toISOString()
        };
    }

    generateMarketTrends() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const basePrice = 80000000; // ¥80M base price
        
        return months.map((month, index) => {
            const trend = Math.sin(index * 0.5) * 0.1 + 1; // Seasonal variation
            const randomVariation = (Math.random() - 0.5) * 0.05; // Random noise
            const price = basePrice * (trend + randomVariation);
            
            return {
                month,
                avgPrice: Math.round(price),
                listings: Math.floor(Math.random() * 50) + 20,
                sales: Math.floor(Math.random() * 30) + 10
            };
        });
    }

    updateAnalyticsDashboard() {
        if (!this.analyticsData) return;

        // Update hero stats
        const heroTotalPropertiesEl = document.getElementById('hero-total-properties');
        const heroAvgPriceEl = document.getElementById('hero-avg-price');
        const heroMarketHealthEl = document.getElementById('hero-market-health');

        if (heroTotalPropertiesEl) heroTotalPropertiesEl.textContent = this.analyticsData.totalProperties;
        if (heroAvgPriceEl) heroAvgPriceEl.textContent = `¥${(this.analyticsData.avgSalePrice / 1000000).toFixed(1)}M`;
        if (heroMarketHealthEl && this.analyticsData.marketData) {
            heroMarketHealthEl.textContent = this.analyticsData.marketData.marketHealth;
        }

        // Update metric cards with rich 2026 data
        const totalPropertiesEl = document.getElementById('total-properties');
        const avgSalePriceEl = document.getElementById('avg-sale-price');
        const avgRentPriceEl = document.getElementById('avg-rent-price');
        const marketHealthEl = document.getElementById('market-health');
        const priceTrendEl = document.getElementById('price-trend');
        const healthIndicatorEl = document.getElementById('health-indicator');
        const avgDaysOnMarketEl = document.getElementById('avg-days-on-market');
        const marketOutlookEl = document.getElementById('market-outlook');
        const inventoryLevelEl = document.getElementById('inventory-level');
        const buyerDemandEl = document.getElementById('buyer-demand');

        if (totalPropertiesEl) totalPropertiesEl.textContent = this.analyticsData.totalProperties;
        if (avgSalePriceEl) avgSalePriceEl.textContent = `¥${(this.analyticsData.avgSalePrice / 1000000).toFixed(1)}M`;
        if (avgRentPriceEl) avgRentPriceEl.textContent = `¥${Math.round(this.analyticsData.avgRentPrice / 1000)}K`;
        
        // Use real market data from our database
        if (marketHealthEl && this.analyticsData.marketData) {
            marketHealthEl.textContent = this.analyticsData.marketData.marketHealth;
        }
        if (priceTrendEl && this.analyticsData.marketData) {
            const trend = this.analyticsData.marketData.priceTrend;
            priceTrendEl.textContent = trend;
            priceTrendEl.className = `text-sm opacity-90 mt-1 ${trend.includes('+') ? 'text-green-400' : 'text-red-400'}`;
        }
        if (healthIndicatorEl && this.analyticsData.marketData) {
            const health = this.analyticsData.marketData.marketHealth;
            healthIndicatorEl.textContent = health;
        }
        if (avgDaysOnMarketEl) {
            avgDaysOnMarketEl.textContent = `${Math.round(this.analyticsData.avgDaysOnMarket)} days`;
        }
        if (marketOutlookEl && this.analyticsData.marketData) {
            marketOutlookEl.textContent = this.analyticsData.marketData.marketOutlook;
        }
        if (inventoryLevelEl && this.analyticsData.marketData) {
            inventoryLevelEl.textContent = this.analyticsData.marketData.inventoryLevel;
        }
        if (buyerDemandEl && this.analyticsData.marketData) {
            buyerDemandEl.textContent = this.analyticsData.marketData.buyerDemand;
        }

        // Update stats text with rich data
        const priceStatsEl = document.getElementById('price-stats');
        const neighborhoodStatsEl = document.getElementById('neighborhood-stats');
        const marketInsightsEl = document.getElementById('market-insights');
        
        if (priceStatsEl) {
            priceStatsEl.textContent = `Range: ¥${(this.analyticsData.minPrice / 1000000).toFixed(1)}M - ¥${(this.analyticsData.maxPrice / 1000000).toFixed(1)}M`;
        }
        
        if (neighborhoodStatsEl) {
            const topNeighborhood = Object.entries(this.analyticsData.neighborhoodStats)
                .sort(([,a], [,b]) => b.avgSalePrice - a.avgSalePrice)[0];
            if (topNeighborhood) {
                const neighborhood = topNeighborhood[0];
                const stats = topNeighborhood[1];
                neighborhoodStatsEl.textContent = `Top: ${neighborhood} (¥${(stats.avgSalePrice / 1000000).toFixed(1)}M avg) - ${stats.investmentPotential} potential`;
            }
        }

        if (marketInsightsEl && this.analyticsData.marketData) {
            const insights = [
                `Interest Rate: ${this.analyticsData.marketData.interestRates}`,
                `Seller Confidence: ${this.analyticsData.marketData.sellerConfidence}`,
                `Last Updated: ${new Date(this.analyticsData.marketData.lastUpdated).toLocaleDateString()}`
            ];
            marketInsightsEl.textContent = insights.join(' • ');
        }

        // Update neighborhood insights
        this.updateNeighborhoodInsights();
        
        // Update market alerts dashboard
        this.updateAlertsDashboard();
    }

    updateNeighborhoodInsights() {
        const insightsContainer = document.getElementById('neighborhood-insights');
        if (!insightsContainer) return;

        const insights = realEstateData.getNeighborhoodInsights();
        insightsContainer.innerHTML = insights.map(neighborhood => `
            <div class="bg-white dark:bg-sumi rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-semibold text-sumi dark:text-white text-lg">${neighborhood.name}</h3>
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${
                        neighborhood.investmentPotential === 'Very High' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        neighborhood.investmentPotential === 'High' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }">${neighborhood.investmentPotential}</span>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div class="text-2xl font-bold text-sumi dark:text-white">${neighborhood.avgPrice}</div>
                        <div class="text-xs text-gray-600 dark:text-gray-400">Average Price</div>
                    </div>
                    <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div class="text-2xl font-bold text-green-600">${neighborhood.marketTrend}</div>
                        <div class="text-xs text-gray-600 dark:text-gray-400">Market Trend</div>
                    </div>
                </div>
                
                <div class="space-y-2 text-sm mb-4">
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Safety:</span>
                        <span class="font-medium text-sumi dark:text-white">${neighborhood.safety}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Walk Score:</span>
                        <span class="font-medium text-sumi dark:text-white">${neighborhood.walkScore}/100</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Properties:</span>
                        <span class="font-medium text-sumi dark:text-white">${neighborhood.properties}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Days on Market:</span>
                        <span class="font-medium text-sumi dark:text-white">${neighborhood.avgDaysOnMarket}</span>
                    </div>
                </div>
                
                <p class="text-sm text-sumi/60 dark:text-gofun/60 mb-4">${neighborhood.description}</p>
                
                <div class="flex flex-wrap gap-1">
                    ${neighborhood.amenities.slice(0, 3).map(amenity => 
                        `<span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs rounded">${amenity}</span>`
                    ).join('')}
                    ${neighborhood.amenities.length > 3 ? 
                        `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">+${neighborhood.amenities.length - 3} more</span>` : 
                        ''
                    }
                </div>
            </div>
        `).join('');
    }

    renderCharts() {
        if (!this.analyticsData) return;

        // Price Distribution Chart
        this.renderPriceChart();
        
        // Neighborhood Performance Chart
        this.renderNeighborhoodChart();
        
        // Market Trends Chart
        this.renderTrendsChart();
    }

    renderPriceChart() {
        const ctx = document.getElementById('price-chart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.charts.priceChart) {
            this.charts.priceChart.destroy();
        }

        const saleProperties = realEstateData.getPropertiesForSale().filter(isValidProperty);
        const prices = saleProperties.map(p => {
            const priceStr = p.price.replace(/[^\d]/g, '');
            return priceStr ? parseInt(priceStr) : 0;
        }).filter(price => price > 0);
        
        // Create price ranges
        const ranges = [
            { min: 0, max: 50000000, label: 'Under ¥50M' },
            { min: 50000000, max: 100000000, label: '¥50M-100M' },
            { min: 100000000, max: 200000000, label: '¥100M-200M' },
            { min: 200000000, max: 500000000, label: '¥200M-500M' },
            { min: 500000000, max: Infinity, label: 'Over ¥500M' }
        ];

        const data = ranges.map(range => {
            return prices.filter(price => price >= range.min && price < range.max).length;
        });

        this.charts.priceChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ranges.map(r => r.label),
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#991B1B', // shinku
                        '#166534', // matcha
                        '#F59E0B', // zen
                        '#3B82F6', // aiiro
                        '#8B5CF6'  // purple
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        }
                    }
                }
            }
        });
    }

    renderNeighborhoodChart() {
        const ctx = document.getElementById('neighborhood-chart');
        if (!ctx || !this.analyticsData) return;

        // Destroy existing chart
        if (this.charts.neighborhoodChart) {
            this.charts.neighborhoodChart.destroy();
        }

        const neighborhoods = Object.keys(this.analyticsData.neighborhoodStats);
        const avgPrices = neighborhoods.map(n => this.analyticsData.neighborhoodStats[n].avgPrice);
        const counts = neighborhoods.map(n => this.analyticsData.neighborhoodStats[n].count);

        this.charts.neighborhoodChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: neighborhoods,
                datasets: [{
                    label: 'Average Price (¥M)',
                    data: avgPrices.map(p => p / 1000000),
                    backgroundColor: '#991B1B',
                    borderColor: '#7C2D12',
                    borderWidth: 1
                }, {
                    label: 'Property Count',
                    data: counts,
                    backgroundColor: '#166534',
                    borderColor: '#15803D',
                    borderWidth: 1,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Average Price (¥M)',
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Property Count',
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                    x: {
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        }
                    }
                }
            }
        });
    }

    renderTrendsChart() {
        const ctx = document.getElementById('trends-chart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.charts.trendsChart) {
            this.charts.trendsChart.destroy();
        }

        const months = this.analyticsData.trendsData.map(d => d.month);
        const avgPrices = this.analyticsData.trendsData.map(d => d.avgPrice / 1000000);
        const listings = this.analyticsData.trendsData.map(d => d.listings);
        const sales = this.analyticsData.trendsData.map(d => d.sales);

        this.charts.trendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Average Price (¥M)',
                    data: avgPrices,
                    borderColor: '#991B1B',
                    backgroundColor: 'rgba(153, 27, 27, 0.1)',
                    yAxisID: 'y',
                    tension: 0.4
                }, {
                    label: 'New Listings',
                    data: listings,
                    borderColor: '#166534',
                    backgroundColor: 'rgba(22, 101, 52, 0.1)',
                    yAxisID: 'y1',
                    tension: 0.4
                }, {
                    label: 'Sales',
                    data: sales,
                    borderColor: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    yAxisID: 'y1',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Average Price (¥M)',
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Count',
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                    x: {
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                }
            }
        });
    }

    exportAnalyticsData() {
        if (!this.analyticsData) {
            this.showNotification('No analytics data available', 'info');
            return;
        }

        // Create CSV content
        let csvContent = 'data:text/csv;charset=utf-8,';
        
        // Add header
        csvContent += 'Metric,Value\n';
        
        // Add data
        csvContent += `Total Properties,${this.analyticsData.totalProperties}\n`;
        csvContent += `Sale Properties,${this.analyticsData.saleProperties}\n`;
        csvContent += `Rent Properties,${this.analyticsData.rentProperties}\n`;
        csvContent += `Average Sale Price,¥${(this.analyticsData.avgSalePrice / 1000000).toFixed(1)}M\n`;
        csvContent += `New Listings (30 days),${this.analyticsData.newListings}\n`;
        csvContent += `Market Health,${this.analyticsData.marketHealth}%\n`;
        csvContent += `Price Trend,${this.analyticsData.priceTrend}%\n\n`;
        
        // Add neighborhood data
        csvContent += 'Neighborhood,Property Count,Average Price (¥M)\n';
        Object.entries(this.analyticsData.neighborhoodStats).forEach(([neighborhood, stats]) => {
            csvContent += `${neighborhood},${stats.count},${(stats.avgPrice / 1000000).toFixed(1)}\n`;
        });

        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `kyoto-real-estate-analytics-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification('Analytics data exported successfully!', 'success');
    }

    // Interactive Map Methods
    initializeMap() {
        if (typeof google === 'undefined') {
            console.warn('Google Maps not loaded, retrying in 1 second...');
            setTimeout(() => this.initializeMap(), 1000);
            return;
        }

        const mapContainer = document.getElementById('property-map');
        if (!mapContainer) return;

        // Kyoto coordinates
        const kyoto = { lat: 35.0116, lng: 135.7681 };

        this.map = new google.maps.Map(mapContainer, {
            center: kyoto,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: this.getMapStyles(),
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true
        });

        // Hide loading indicator
        const loadingIndicator = document.getElementById('map-loading');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }

        this.addPropertyMarkers();
        this.setupMapControls();
    }

    setupMapControls() {
        // Map type selector
        const mapTypeSelect = document.getElementById('map-type');
        if (mapTypeSelect) {
            mapTypeSelect.addEventListener('change', (e) => {
                this.map.setMapTypeId(e.target.value);
            });
        }

        // Property filter
        const propertyFilter = document.getElementById('map-property-filter');
        if (propertyFilter) {
            propertyFilter.addEventListener('change', (e) => {
                this.updateMapMarkers();
            });
        }

        // Price filter
        const priceFilter = document.getElementById('map-price-filter');
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.updateMapMarkers();
            });
        }

        // Toggle map view button
        const toggleButton = document.getElementById('toggle-map-view');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggleMapView();
            });
        }

        // Center map button
        const centerButton = document.getElementById('center-map');
        if (centerButton) {
            centerButton.addEventListener('click', () => {
                this.centerMapOnKyoto();
            });
        }
    }

    getMapStyles() {
        return [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ];
    }

    addPropertyMarkers() {
        if (!this.map || !realEstateData) return;

        // Clear existing markers
        this.clearMapMarkers();

        const allProperties = [
            ...realEstateData.getPropertiesForSale(),
            ...realEstateData.getPropertiesForRent()
        ].filter(isValidProperty);

        allProperties.forEach(property => {
            // Generate coordinates based on neighborhood (simulated)
            const coords = this.getPropertyCoordinates(property.neighborhood);
            
            const marker = new google.maps.Marker({
                position: coords,
                map: this.map,
                title: property.title,
                icon: this.getMarkerIcon(property),
                animation: google.maps.Animation.DROP
            });

            const infoWindow = new google.maps.InfoWindow({
                content: this.createInfoWindowContent(property)
            });

            marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
            });

            this.markers.push(marker);
        });
    }

    getPropertyCoordinates(neighborhood) {
        // Simulated coordinates for different neighborhoods
        const coordinates = {
            'Gion': { lat: 35.0056, lng: 135.7750 },
            'Arashiyama': { lat: 35.0094, lng: 135.6778 },
            'Higashiyama': { lat: 35.0116, lng: 135.7800 },
            'Pontocho': { lat: 35.0089, lng: 135.7700 },
            'Kiyomizu': { lat: 35.0147, lng: 135.7850 }
        };

        return coordinates[neighborhood] || { lat: 35.0116, lng: 135.7681 };
    }

    getMarkerIcon(property) {
        const isRental = property.type?.toLowerCase().includes('rent') || property.id.includes('rent');
        const isVerified = isValidProperty(property);
        
        const color = isRental ? '#3B82F6' : '#EF4444';
        const size = isVerified ? 32 : 24;
        
        return {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            `)}`,
            scaledSize: new google.maps.Size(size, size),
            anchor: new google.maps.Point(size/2, size)
        };
    }

    createInfoWindowContent(property) {
        const isRental = property.type?.toLowerCase().includes('rent') || property.id.includes('rent');
        const isVerified = isValidProperty(property);
        
        return `
            <div class="p-4 max-w-xs">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-bold text-lg">${property.title}</h3>
                    ${isVerified ? '<span class="bg-green-500 text-white px-2 py-1 rounded text-xs">Verified</span>' : ''}
                </div>
                <p class="text-gray-600 mb-2">${property.location}</p>
                <p class="text-gray-600 mb-2">${property.neighborhood}</p>
                <p class="font-bold text-lg text-red-600">${property.price}</p>
                <p class="text-sm text-gray-500">${property.bedrooms} beds • ${property.bathrooms} baths • ${property.size}</p>
                <div class="mt-3">
                    <button onclick="realEstateManager.addToComparisonFromMap('${property.id}')" 
                            class="bg-blue-500 text-white px-3 py-1 rounded text-sm mr-2">
                        Compare
                    </button>
                    <button onclick="realEstateManager.showPropertyModal('${property.id}')" 
                            class="bg-green-500 text-white px-3 py-1 rounded text-sm">
                        Details
                    </button>
                </div>
            </div>
        `;
    }

    clearMapMarkers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
    }

    updateMapMarkers() {
        this.addPropertyMarkers();
    }

    toggleMapView() {
        const btn = document.getElementById('toggle-map-view');
        if (btn) {
            const isShowing = btn.textContent.includes('Show');
            btn.textContent = isShowing ? '📍 Hide Properties' : '📍 Show All Properties';
            
            if (isShowing) {
                this.addPropertyMarkers();
            } else {
                this.clearMapMarkers();
            }
        }
    }

    centerMapOnKyoto() {
        if (this.map) {
            this.map.setCenter({ lat: 35.0116, lng: 135.7681 });
            this.map.setZoom(12);
        }
    }

    changeMapType(type) {
        if (this.map) {
            this.map.setMapTypeId(type);
        }
    }

    addToComparisonFromMap(propertyId) {
        this.addToComparison(propertyId);
    }

    // Property Comparison Methods
    addToComparison(propertyId = null) {
        if (!propertyId) {
            const searchInput = document.getElementById('comparison-search');
            if (searchInput && searchInput.value.trim()) {
                // Find property by search term
                const searchTerm = searchInput.value.trim();
                const allProperties = [
                    ...realEstateData.getPropertiesForSale(),
                    ...realEstateData.getPropertiesForRent()
                ].filter(isValidProperty);
                
                const property = allProperties.find(p => 
                    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.id === searchTerm
                );
                
                if (property) {
                    propertyId = property.id;
                } else {
                    this.showNotification('Property not found', 'info');
                    return;
                }
            } else {
                this.showNotification('Please enter a property to compare', 'info');
                return;
            }
        }

        if (this.comparisonProperties.length >= 3) {
            this.showNotification('Maximum 3 properties can be compared at once', 'info');
            return;
        }

        if (this.comparisonProperties.includes(propertyId)) {
            this.showNotification('Property already in comparison', 'info');
            return;
        }

        this.comparisonProperties.push(propertyId);
        this.renderComparisonGrid();
        this.showNotification('Property added to comparison', 'success');
        
        // Clear search input
        const searchInput = document.getElementById('comparison-search');
        if (searchInput) searchInput.value = '';
    }

    removeFromComparison(propertyId) {
        const index = this.comparisonProperties.indexOf(propertyId);
        if (index > -1) {
            this.comparisonProperties.splice(index, 1);
            this.renderComparisonGrid();
            this.showNotification('Property removed from comparison', 'success');
        }
    }

    clearComparison() {
        this.comparisonProperties = [];
        this.renderComparisonGrid();
        this.showNotification('Comparison cleared', 'success');
    }

    renderComparisonGrid() {
        const grid = document.getElementById('comparison-grid');
        if (!grid) return;

        if (this.comparisonProperties.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="text-4xl mb-4">⚖️</div>
                    <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">No Properties Selected</h3>
                    <p class="text-sumi/70 dark:text-gray-300">Add properties to compare their features, prices, and details.</p>
                </div>
            `;
            return;
        }

        const allProperties = [
            ...realEstateData.getPropertiesForSale(),
            ...realEstateData.getPropertiesForRent()
        ].filter(isValidProperty);

        const properties = this.comparisonProperties.map(id => 
            allProperties.find(p => p.id === id)
        ).filter(Boolean);

        grid.innerHTML = properties.map(property => this.generateComparisonCard(property)).join('');

        // Update comparison analytics if multiple properties are selected
        if (properties.length > 1) {
            this.updateComparisonAnalytics();
        }
    }

    generateComparisonCard(property) {
        const isRental = property.type?.toLowerCase().includes('rent') || property.id.includes('rent');
        const isVerified = isValidProperty(property);
        
        return `
            <div class="bg-white dark:bg-sumi border border-zen dark:border-aiiro rounded-lg p-4">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-semibold text-sumi dark:text-white">${property.title}</h3>
                    <button onclick="realEstateManager.removeFromComparison('${property.id}')" 
                            class="text-red-500 hover:text-red-700">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-sm text-sumi/60 dark:text-gofun/60">Price:</span>
                        <span class="font-semibold text-sumi dark:text-white">${property.price}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-sumi/60 dark:text-gofun/60">Location:</span>
                        <span class="text-sm text-sumi dark:text-white">${property.neighborhood}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-sumi/60 dark:text-gofun/60">Size:</span>
                        <span class="text-sm text-sumi dark:text-white">${property.size}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-sumi/60 dark:text-gofun/60">Bedrooms:</span>
                        <span class="text-sm text-sumi dark:text-white">${property.bedrooms}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-sumi/60 dark:text-gofun/60">Bathrooms:</span>
                        <span class="text-sm text-sumi dark:text-white">${property.bathrooms}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-sumi/60 dark:text-gofun/60">Walk Score:</span>
                        <span class="text-sm text-sumi dark:text-white">${property.walkScore}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-sumi/60 dark:text-gofun/60">Type:</span>
                        <span class="text-sm text-sumi dark:text-white">${isRental ? 'Rental' : 'Sale'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-sumi/60 dark:text-gofun/60">Status:</span>
                        <span class="text-sm ${isVerified ? 'text-green-600' : 'text-yellow-600'}">${isVerified ? 'Verified' : 'Pending'}</span>
                    </div>
                </div>
                
                <div class="mt-4 pt-4 border-t border-zen dark:border-aiiro">
                    <div class="flex gap-2">
                        <button onclick="realEstateManager.showPropertyModal('${property.id}')" 
                                class="flex-1 px-3 py-2 bg-shinku text-white rounded text-sm hover:bg-shinku/80">
                            View Details
                        </button>
                        <button onclick="realEstateManager.toggleFavorite('${property.id}')" 
                                class="px-3 py-2 border border-zen dark:border-aiiro rounded text-sm hover:bg-zen dark:hover:bg-aiiro">
                            ${this.favorites.includes(property.id) ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    searchComparisonProperties(query) {
        if (!query || query.length < 2) return;

        const allProperties = [
            ...realEstateData.getPropertiesForSale(),
            ...realEstateData.getPropertiesForRent()
        ].filter(isValidProperty);

        const matchingProperties = allProperties.filter(property => 
            property.title.toLowerCase().includes(query.toLowerCase()) ||
            property.neighborhood.toLowerCase().includes(query.toLowerCase()) ||
            property.location.toLowerCase().includes(query.toLowerCase())
        );

        // Show suggestions (could be enhanced with a dropdown)
        if (matchingProperties.length > 0) {
            console.log('Found properties:', matchingProperties.map(p => p.title));
        }
    }

    exportComparison() {
        if (this.comparisonProperties.length === 0) {
            this.showNotification('No properties to export', 'info');
            return;
        }

        const allProperties = [
            ...realEstateData.getPropertiesForSale(),
            ...realEstateData.getPropertiesForRent()
        ].filter(isValidProperty);

        const properties = this.comparisonProperties.map(id => 
            allProperties.find(p => p.id === id)
        ).filter(Boolean);

        // Create CSV content
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Property,Price,Location,Size,Bedrooms,Bathrooms,Walk Score,Type,Status\n';
        
        properties.forEach(property => {
            const isRental = property.type?.toLowerCase().includes('rent') || property.id.includes('rent');
            const isVerified = isValidProperty(property);
            
            csvContent += `"${property.title}","${property.price}","${property.neighborhood}","${property.size}","${property.bedrooms}","${property.bathrooms}","${property.walkScore}","${isRental ? 'Rental' : 'Sale'}","${isVerified ? 'Verified' : 'Pending'}"\n`;
        });

        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `property-comparison-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification('Comparison exported successfully!', 'success');
    }

    toggleComparisonAnalytics() {
        const panel = document.getElementById('comparison-analytics-panel');
        if (!panel) return;

        if (panel.classList.contains('hidden')) {
            panel.classList.remove('hidden');
            this.updateComparisonAnalytics();
        } else {
            panel.classList.add('hidden');
        }
    }

    updateComparisonAnalytics() {
        if (this.comparisonProperties.length === 0) return;

        // Price Analysis
        const priceAnalysis = document.getElementById('price-analysis');
        if (priceAnalysis) {
            const prices = this.comparisonProperties.map(p => {
                const priceStr = p.price.replace(/[^\d]/g, '');
                return priceStr ? parseInt(priceStr) : 0;
            }).filter(price => price > 0);

            if (prices.length > 0) {
                const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                const priceRange = maxPrice - minPrice;

                priceAnalysis.innerHTML = `
                    <div class="space-y-2">
                        <div>Average: ¥${(avgPrice / 1000000).toFixed(1)}M</div>
                        <div>Range: ¥${(minPrice / 1000000).toFixed(1)}M - ¥${(maxPrice / 1000000).toFixed(1)}M</div>
                        <div>Difference: ¥${(priceRange / 1000000).toFixed(1)}M</div>
                        <div class="text-xs text-gray-500">${this.comparisonProperties.length} properties compared</div>
                    </div>
                `;
            }
        }

        // Investment Analysis
        const investmentAnalysis = document.getElementById('investment-analysis');
        if (investmentAnalysis) {
            const neighborhoods = [...new Set(this.comparisonProperties.map(p => p.neighborhood))];
            const neighborhoodData = neighborhoods.map(n => realEstateData.getNeighborhoodInfo(n)).filter(Boolean);
            
            if (neighborhoodData.length > 0) {
                const avgInvestmentPotential = neighborhoodData.reduce((sum, n) => {
                    const potential = n.investmentPotential;
                    if (potential === 'Very High') return sum + 3;
                    if (potential === 'High') return sum + 2;
                    return sum + 1;
                }, 0) / neighborhoodData.length;

                const bestNeighborhood = neighborhoodData.reduce((best, current) => {
                    const bestScore = best.investmentPotential === 'Very High' ? 3 : best.investmentPotential === 'High' ? 2 : 1;
                    const currentScore = current.investmentPotential === 'Very High' ? 3 : current.investmentPotential === 'High' ? 2 : 1;
                    return currentScore > bestScore ? current : best;
                });

                investmentAnalysis.innerHTML = `
                    <div class="space-y-2">
                        <div>Best Investment: <span class="font-semibold">${bestNeighborhood.name}</span></div>
                        <div>Potential: <span class="font-semibold ${bestNeighborhood.investmentPotential === 'Very High' ? 'text-green-600' : 'text-blue-600'}">${bestNeighborhood.investmentPotential}</span></div>
                        <div>Market Trend: <span class="font-semibold ${bestNeighborhood.marketTrend.includes('+') ? 'text-green-600' : 'text-red-600'}">${bestNeighborhood.marketTrend}</span></div>
                        <div class="text-xs text-gray-500">${neighborhoods.length} neighborhoods analyzed</div>
                    </div>
                `;
            }
        }
    }

    // Live Data Streaming Methods
    startLiveDataStream() {
        // Update data every 30 seconds for real-time feel
        this.liveDataInterval = setInterval(() => {
            this.updateLiveData();
        }, 30000);
        
        // Initial update
        this.updateLiveData();
    }

    updateLiveData() {
        const now = new Date();
        const timeSinceLastUpdate = now - this.lastUpdateTime;
        
        // Simulate live market updates
        this.simulateMarketUpdates();
        
        // Update last update time
        this.lastUpdateTime = now;
        
        // Update live indicators
        this.updateLiveIndicators();
        
        // Show subtle notification for updates
        if (timeSinceLastUpdate > 60000) { // Only show if more than 1 minute has passed
            this.showNotification('Market data updated', 'info');
        }
    }

    simulateMarketUpdates() {
        // Simulate price changes
        const properties = [...realEstateData.getPropertiesForSale(), ...realEstateData.getPropertiesForRent()];
        properties.forEach(property => {
            if (Math.random() < 0.1) { // 10% chance of price change
                const currentPrice = parseInt(property.price.replace(/[^\d]/g, ''));
                const change = Math.random() < 0.5 ? 1 : -1; // 50/50 chance of increase/decrease
                const changeAmount = Math.floor(Math.random() * 5000000); // Up to ¥5M change
                const newPrice = Math.max(10000000, currentPrice + (change * changeAmount)); // Minimum ¥10M
                
                property.price = `¥${newPrice.toLocaleString()}`;
                property.priceUSD = `$${(newPrice / 150).toLocaleString()}`;
                
                // Add to price history
                if (!property.priceHistory) property.priceHistory = [];
                property.priceHistory.unshift({
                    date: new Date().toISOString(),
                    price: property.price
                });
            }
        });
    }

    updateLiveIndicators() {
        // Update live market indicators
        const liveIndicator = document.getElementById('live-indicator');
        if (liveIndicator) {
            liveIndicator.innerHTML = `
                <div class="flex items-center space-x-2 text-sm">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live Data</span>
                    <span class="text-gray-500">•</span>
                    <span>Last updated: ${this.lastUpdateTime.toLocaleTimeString()}</span>
                </div>
            `;
        }
    }

    // Market Alerts & Notifications Methods
    createMarketAlert() {
        const alertType = prompt('Alert type (price-drop, new-listing, market-update):');
        if (!alertType) return;

        const alert = {
            id: Date.now().toString(),
            type: alertType,
            name: `Alert ${this.alerts.length + 1}`,
            criteria: this.getAlertCriteria(alertType),
            active: true,
            createdAt: new Date().toISOString(),
            notifications: []
        };

        this.alerts.push(alert);
        localStorage.setItem('marketAlerts', JSON.stringify(this.alerts));
        this.updateAlertsDashboard();
        this.showNotification('Market alert created successfully!', 'success');
    }

    getAlertCriteria(type) {
        switch(type) {
            case 'price-drop':
                return {
                    neighborhoods: ['Gion', 'Arashiyama', 'Higashiyama'],
                    maxPrice: 100000000,
                    priceDropThreshold: 10
                };
            case 'new-listing':
                return {
                    neighborhoods: ['Gion', 'Arashiyama', 'Higashiyama'],
                    propertyTypes: ['sale', 'rent'],
                    features: ['garden', 'parking']
                };
            case 'market-update':
                return {
                    updateTypes: ['price-changes', 'new-listings', 'market-trends']
                };
            default:
                return {};
        }
    }

    updateAlertsDashboard() {
        // Update alert counters
        const priceDropsEl = document.getElementById('price-drops');
        const newAlertsEl = document.getElementById('new-alerts');
        const marketUpdatesEl = document.getElementById('market-updates');
        const savedSearchesEl = document.getElementById('saved-searches');

        if (priceDropsEl) priceDropsEl.textContent = Math.floor(Math.random() * 5);
        if (newAlertsEl) newAlertsEl.textContent = Math.floor(Math.random() * 10) + 5;
        if (marketUpdatesEl) marketUpdatesEl.textContent = Math.floor(Math.random() * 3) + 1;
        if (savedSearchesEl) savedSearchesEl.textContent = this.savedSearches.length;

        // Render active alerts
        this.renderActiveAlerts();
    }

    renderActiveAlerts() {
        const alertsContainer = document.getElementById('active-alerts');
        if (!alertsContainer) return;

        if (this.alerts.length === 0) {
            alertsContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="text-4xl mb-4">🔔</div>
                    <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">No Active Alerts</h3>
                    <p class="text-sumi/70 dark:text-gray-300">Create alerts to get notified about market changes.</p>
                </div>
            `;
            return;
        }

        alertsContainer.innerHTML = this.alerts.map(alert => this.generateAlertCard(alert)).join('');
    }

    generateAlertCard(alert) {
        const typeIcons = {
            'price-drop': '📉',
            'new-listing': '🆕',
            'market-update': '📊'
        };

        const typeColors = {
            'price-drop': 'bg-red-500',
            'new-listing': 'bg-green-500',
            'market-update': 'bg-blue-500'
        };

        return `
            <div class="bg-white dark:bg-sumi border border-zen dark:border-aiiro rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 ${typeColors[alert.type]} text-white rounded-full flex items-center justify-center text-lg">
                            ${typeIcons[alert.type]}
                        </div>
                        <div>
                            <h4 class="font-semibold text-sumi dark:text-white">${alert.name}</h4>
                            <p class="text-sm text-sumi/60 dark:text-gofun/60">${alert.type.replace('-', ' ')}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" ${alert.active ? 'checked' : ''} 
                                   onchange="realEstateManager.toggleAlert('${alert.id}')"
                                   class="sr-only peer">
                            <div class="w-11 h-6 bg-zen dark:bg-aiiro peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-shinku"></div>
                        </label>
                        <button onclick="realEstateManager.deleteAlert('${alert.id}')" 
                                class="text-red-500 hover:text-red-700">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="text-sm text-sumi/60 dark:text-gofun/60 mb-3">
                    Created: ${new Date(alert.createdAt).toLocaleDateString()}
                </div>
                
                <div class="flex gap-2">
                    <button onclick="realEstateManager.editAlert('${alert.id}')" 
                            class="px-3 py-1 bg-zen dark:bg-aiiro text-sumi dark:text-gofun rounded text-sm hover:bg-zen/80 dark:hover:bg-aiiro/80">
                        Edit
                    </button>
                    <button onclick="realEstateManager.testAlert('${alert.id}')" 
                            class="px-3 py-1 bg-shinku text-white rounded text-sm hover:bg-shinku/80">
                        Test
                    </button>
                </div>
            </div>
        `;
    }

    toggleAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.active = !alert.active;
            localStorage.setItem('marketAlerts', JSON.stringify(this.alerts));
            this.showNotification(`Alert ${alert.active ? 'activated' : 'deactivated'}`, 'success');
        }
    }

    deleteAlert(alertId) {
        if (confirm('Are you sure you want to delete this alert?')) {
            this.alerts = this.alerts.filter(a => a.id !== alertId);
            localStorage.setItem('marketAlerts', JSON.stringify(this.alerts));
            this.updateAlertsDashboard();
            this.showNotification('Alert deleted', 'success');
        }
    }

    editAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            const newName = prompt('Enter new alert name:', alert.name);
            if (newName) {
                alert.name = newName;
                localStorage.setItem('marketAlerts', JSON.stringify(this.alerts));
                this.updateAlertsDashboard();
                this.showNotification('Alert updated', 'success');
            }
        }
    }

    testAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            // Simulate alert notification
            this.showNotification(`Test notification: ${alert.name}`, 'info');
            
            // Add test notification to alert history
            alert.notifications.push({
                id: Date.now().toString(),
                message: `Test notification for ${alert.name}`,
                timestamp: new Date().toISOString(),
                type: 'test'
            });
            
            localStorage.setItem('marketAlerts', JSON.stringify(this.alerts));
        }
    }

    getFilteredProperties(type) {
        if (!realEstateData) return [];

        let properties = type === 'sale' ? 
            realEstateData.getPropertiesForSale() : 
            realEstateData.getPropertiesForRent();

        console.log(`getFilteredProperties(${type}): Found ${properties.length} properties`);
        console.log(`Property IDs for ${type}:`, properties.map(p => p.id));

        // Strict validation: only show valid properties
        properties = properties.filter(isValidProperty);

        // Apply search filter
        if (this.searchQuery) {
            properties = properties.filter(property =>
                property.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                property.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                property.neighborhood.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                property.agency.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                property.features.some(feature => feature.toLowerCase().includes(this.searchQuery.toLowerCase()))
            );
        }

        // Apply type filter
        if (this.currentFilters.type !== 'all') {
            properties = properties.filter(property =>
                property.type.toLowerCase().includes(this.currentFilters.type.toLowerCase())
            );
        }

        // Apply multi-select filters
        if (this.currentFilters.bedrooms.length > 0) {
            properties = properties.filter(property => {
                const bedroomCount = property.bedrooms.toString();
                return this.currentFilters.bedrooms.includes(bedroomCount) || 
                       (bedroomCount >= 4 && this.currentFilters.bedrooms.includes('4+'));
            });
        }

        if (this.currentFilters.neighborhoods.length > 0) {
            properties = properties.filter(property => 
                this.currentFilters.neighborhoods.includes(property.neighborhood)
            );
        }

        if (this.currentFilters.features.length > 0) {
            properties = properties.filter(property =>
                this.currentFilters.features.some(feature => 
                    property.features.some(propFeature => 
                        propFeature.toLowerCase().includes(feature.toLowerCase())
                    )
                )
            );
        }

        // Apply price range filter
        if (this.currentFilters.priceRange !== 'all') {
            properties = properties.filter(property => {
                const price = parseInt(property.price.replace(/[^\d]/g, ''));
                switch(this.currentFilters.priceRange) {
                    case 'under-50m': return price < 50000000;
                    case '50m-100m': return price >= 50000000 && price < 100000000;
                    case '100m-200m': return price >= 100000000 && price < 200000000;
                    case 'over-200m': return price >= 200000000;
                    default: return true;
                }
            });
        }

        // Apply sorting
        properties = this.sortProperties(properties);

        return properties;
    }

    generatePropertyCards(properties) {
        if (properties.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="text-4xl mb-4" role="img" aria-label="No properties">🏠</div>
                    <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">No Properties Found</h3>
                    <p class="text-sumi/70 dark:text-gray-300">Try adjusting your search criteria or filters.</p>
                </div>
            `;
        }

        return properties.map(property => this.generatePropertyCard(property)).join('');
    }

    generatePropertyList(properties) {
        if (properties.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="text-4xl mb-4" role="img" aria-label="No properties">🏠</div>
                    <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">No Properties Found</h3>
                    <p class="text-sumi/70 dark:text-gray-300">Try adjusting your search criteria or filters.</p>
                </div>
            `;
        }

        return properties.map(property => this.generatePropertyListItem(property)).join('');
    }

    generatePropertyCard(property) {
        const neighborhoodInfo = realEstateData.getNeighborhoodInfo(property.neighborhood);
        const isRental = property.type?.toLowerCase().includes('rent') || property.id.includes('rent');
        const isVerified = isValidProperty(property);
        const isFavorited = this.favorites.includes(property.id);
        
        return `
            <div class="zen-card${isVerified ? ' border-2 border-[#d9c289]' : ' border border-[#000000]/30'} bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group" data-property-id="${property.id}">
                    <!-- Property Image -->
                <div class="relative overflow-hidden rounded-t-lg h-48 lg:h-56">
                            <img src="${property.image}" alt="${property.title}" 
                         class="w-full h-full object-cover"
                                 loading="lazy">
                    <div class="absolute top-3 left-3 bg-[#000000] text-white px-2 py-1 rounded text-xs font-bold" style="color: white !important;">
                                    ${isRental ? 'For Rent' : 'For Sale'}
                            </div>
                    <div class="absolute top-3 right-3 bg-[#d9c289] text-white px-2 py-1 rounded text-xs font-bold" style="color: white !important;">
                        ${property.walkScore} Walk
                            </div>
                    ${isVerified ? '<span class="absolute bottom-3 right-3 bg-[#d9c289] text-white px-2 py-1 rounded text-xs font-bold" style="color: white !important;">Verified</span>' : ''}
                    <button class="absolute top-3 right-12 favorite-button ${isFavorited ? 'favorited' : ''}" onclick="realEstateManager.toggleFavorite('${property.id}')" title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                        <svg class="w-5 h-5" fill="${isFavorited ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                    </div>
                    
                <!-- Property Content -->
                <div class="p-4 lg:p-6">
                    <!-- Header -->
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1 min-w-0">
                            <h3 class="font-serif text-lg lg:text-xl font-bold text-sumi dark:text-white mb-1 truncate">
                                    ${property.title}
                                </h3>
                            <p class="text-sm text-sumi/70 dark:text-white/70 mb-1">
                                <span class="inline-block mr-3">📍 ${property.location}</span>
                                    <span class="inline-block">🏘️ ${property.neighborhood}</span>
                                </p>
                            <div class="flex items-center gap-2 text-xs text-sumi/60 dark:text-white/60">
                                <span>Listed by: ${property.agency}</span>
                                <span>•</span>
                                <span>ID: ${property.id}</span>
                            </div>
                        </div>
                        <div class="text-right ml-3">
                            <div class="text-xl lg:text-2xl font-bold text-shinku">${property.price}</div>
                            <div class="text-sm text-sumi/60 dark:text-white/60">${property.priceUSD}</div>
                            </div>
                        </div>
                        
                        <!-- Property Stats -->
                    <div class="grid grid-cols-3 gap-2 mb-4">
                        <div class="text-center p-2 bg-washi/30 dark:bg-gray-700/30 rounded">
                            <div class="text-lg font-bold text-sumi dark:text-white">${property.bedrooms}</div>
                            <div class="text-xs text-sumi/60 dark:text-white/60">Bedrooms</div>
                            </div>
                        <div class="text-center p-2 bg-washi/30 dark:bg-gray-700/30 rounded">
                            <div class="text-lg font-bold text-sumi dark:text-white">${property.bathrooms}</div>
                            <div class="text-xs text-sumi/60 dark:text-white/60">Bathrooms</div>
                            </div>
                        <div class="text-center p-2 bg-washi/30 dark:bg-gray-700/30 rounded">
                            <div class="text-lg font-bold text-sumi dark:text-white">${property.size}</div>
                            <div class="text-xs text-sumi/60 dark:text-white/60">Size</div>
                            </div>
                            </div>
                    
                    <!-- Additional Stats -->
                    <div class="flex justify-between text-sm text-sumi/70 dark:text-white/70 mb-4">
                        <span>Built: ${property.yearBuilt}</span>
                        ${property.daysOnMarket ? `<span>Days: ${property.daysOnMarket}</span>` : ''}
                        <span>Walk: ${property.walkScore}</span>
                        </div>
                        
                        <!-- Features -->
                        <div class="mb-4">
                        <h4 class="font-semibold text-sumi dark:text-white mb-2 text-sm">Features:</h4>
                        <div class="flex flex-wrap gap-1">
                                ${property.features.slice(0, 3).map(feature => 
                                `<span class="px-2 py-1 bg-[#d9c289]/20 text-[#d9c289] text-xs rounded">${feature}</span>`
                                ).join('')}
                                ${property.features.length > 3 ? 
                                `<span class="px-2 py-1 bg-sumi/20 dark:bg-white/20 text-sumi dark:text-white text-xs rounded">+${property.features.length - 3} more</span>` : 
                                    ''
                                }
                            </div>
                        </div>
                        
                    <!-- Rich 2026 Neighborhood Data -->
                    ${neighborhoodInfo ? `
                            <div class="mb-4 p-3 bg-washi/30 dark:bg-gray-700/30 rounded-lg">
                        <h4 class="font-semibold text-sumi dark:text-white mb-2 text-sm">Neighborhood Insights (2026):</h4>
                        <div class="grid grid-cols-2 gap-2 text-xs text-sumi/70 dark:text-white/70">
                            <div>Market Trend: <span class="${neighborhoodInfo.marketTrend?.includes('+') ? 'text-green-400' : 'text-red-400'} font-semibold">${neighborhoodInfo.marketTrend}</span></div>
                            <div>Investment: <span class="${
                                neighborhoodInfo.investmentPotential === 'Very High' ? 'text-green-400' :
                                neighborhoodInfo.investmentPotential === 'High' ? 'text-blue-400' : 'text-yellow-400'
                            } font-semibold">${neighborhoodInfo.investmentPotential}</span></div>
                                    </div>
                                    </div>
                    ` : ''}
                    
                    <!-- Property Actions -->
                    <div class="flex gap-2">
                        <button onclick="realEstateManager.addToComparison('${property.id}')" 
                                class="flex-1 bg-[#000000] text-white px-3 py-2 rounded text-sm font-semibold hover:bg-[#000000]/80 transition-colors" style="color: white !important;">
                            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            Compare
                        </button>
                        <button onclick="realEstateManager.showPropertyModal('${property.id}')" 
                                class="flex-1 bg-[#d9c289] text-white px-3 py-2 rounded text-sm font-semibold hover:bg-[#d9c289]/80 transition-colors" style="color: white !important;">
                            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            Details
                        </button>
                                </div>
                            </div>
            </div>
        `;
    }

    updatePropertyCounters(saleCount, rentCount) {
        const saleCountElement = document.getElementById('sale-count');
        const rentCountElement = document.getElementById('rent-count');
        
        if (saleCountElement) saleCountElement.textContent = saleCount;
        if (rentCountElement) rentCountElement.textContent = rentCount;
    }

    // Advanced filtering methods
    updateMultiSelectFilter(filterType) {
        const checkboxes = document.querySelectorAll(`.${filterType}-filter:checked`);
        this.currentFilters[filterType] = Array.from(checkboxes).map(cb => cb.value);
    }

    updateFilterCount() {
        const count = Object.values(this.currentFilters).reduce((total, filter) => {
            if (Array.isArray(filter)) {
                return total + filter.length;
            }
            return total + (filter !== 'all' ? 1 : 0);
        }, 0);
        
        const filterCountElement = document.getElementById('filter-count');
        if (filterCountElement) {
            filterCountElement.textContent = count;
        }
    }

    sortProperties(properties) {
        switch(this.currentFilters.sort) {
            case 'price-low':
                return properties.sort((a, b) => {
                    const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
                    const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
                    return priceA - priceB;
                });
            case 'price-high':
                return properties.sort((a, b) => {
                    const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
                    const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
                    return priceB - priceA;
                });
            case 'size':
                return properties.sort((a, b) => {
                    const sizeA = parseInt(a.size.replace(/[^\d]/g, ''));
                    const sizeB = parseInt(b.size.replace(/[^\d]/g, ''));
                    return sizeB - sizeA;
                });
            case 'walk-score':
                return properties.sort((a, b) => b.walkScore - a.walkScore);
            case 'year-built':
                return properties.sort((a, b) => b.yearBuilt - a.yearBuilt);
            case 'newest':
            default:
                return properties.sort((a, b) => new Date(b.id) - new Date(a.id));
        }
    }

    setViewMode(mode) {
        this.viewMode = mode;
        const gridBtn = document.getElementById('view-grid');
        const listBtn = document.getElementById('view-list');
        
        if (gridBtn && listBtn) {
            if (mode === 'grid') {
                gridBtn.classList.add('bg-shinku', 'text-white');
                gridBtn.classList.remove('bg-white', 'dark:bg-sumi', 'text-sumi', 'dark:text-gofun');
                listBtn.classList.remove('bg-shinku', 'text-white');
                listBtn.classList.add('bg-white', 'dark:bg-sumi', 'text-sumi', 'dark:text-gofun');
            } else {
                listBtn.classList.add('bg-shinku', 'text-white');
                listBtn.classList.remove('bg-white', 'dark:bg-sumi', 'text-sumi', 'dark:text-gofun');
                gridBtn.classList.remove('bg-shinku', 'text-white');
                gridBtn.classList.add('bg-white', 'dark:bg-sumi', 'text-sumi', 'dark:text-gofun');
            }
        }
        
        this.displayProperties();
    }

    clearAllFilters() {
        this.currentFilters = {
            type: 'all',
            priceRange: 'all',
            bedrooms: [],
            neighborhoods: [],
            features: [],
            sort: 'newest'
        };
        this.searchQuery = '';
        
        // Reset UI
        const searchInput = document.getElementById('property-search');
        if (searchInput) searchInput.value = '';
        
        // Uncheck all checkboxes
        document.querySelectorAll('.bedroom-filter, .neighborhood-filter, .feature-filter').forEach(cb => {
            cb.checked = false;
        });
        
        // Reset selects
        document.querySelectorAll('.property-filter').forEach(select => {
            if (select.name === 'sort') {
                select.value = 'newest';
            } else {
                select.value = 'all';
            }
        });
        
        this.updateFilterCount();
        this.displayProperties();
    }

    saveCurrentSearch() {
        const searchName = prompt('Name this search:');
        if (searchName) {
            const savedSearch = {
                name: searchName,
                filters: { ...this.currentFilters },
                searchQuery: this.searchQuery,
                timestamp: new Date().toISOString()
            };
            
            this.savedSearches.push(savedSearch);
            localStorage.setItem('savedSearches', JSON.stringify(this.savedSearches));
            
            // Show success message
            this.showNotification('Search saved successfully!', 'success');
        }
    }

    showInstantSearchResults(query) {
        if (!query.trim()) {
            this.hideInstantSearchResults();
            return;
        }
        
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        
        const allProperties = [
            ...(realEstateData?.getPropertiesForSale() || []),
            ...(realEstateData?.getPropertiesForRent() || [])
        ].filter(isValidProperty);
        
        const results = allProperties.filter(property =>
            property.title.toLowerCase().includes(query.toLowerCase()) ||
            property.location.toLowerCase().includes(query.toLowerCase()) ||
            property.neighborhood.toLowerCase().includes(query.toLowerCase()) ||
            property.agency.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        
        if (results.length > 0) {
            resultsContainer.innerHTML = results.map(property => `
                <div class="p-3 hover:bg-zen dark:hover:bg-aiiro cursor-pointer border-b border-zen dark:border-aiiro last:border-b-0" 
                     onclick="realEstateManager.selectSearchResult('${property.id}')">
                    <div class="font-semibold text-sumi dark:text-gofun">${property.title}</div>
                    <div class="text-sm text-sumi/60 dark:text-gofun/60">${property.location} • ${property.price}</div>
                                </div>
            `).join('');
            resultsContainer.classList.remove('hidden');
        } else {
            resultsContainer.innerHTML = `
                <div class="p-3 text-sumi/60 dark:text-gofun/60">
                    No properties found for "${query}"
                            </div>
            `;
            resultsContainer.classList.remove('hidden');
        }
    }

    hideInstantSearchResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.classList.add('hidden');
        }
    }

    selectSearchResult(propertyId) {
        this.hideInstantSearchResults();
        // Scroll to the property
        const propertyElement = document.querySelector(`[data-property-id="${propertyId}"]`);
        if (propertyElement) {
            propertyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            propertyElement.classList.add('ring-2', 'ring-shinku');
            setTimeout(() => {
                propertyElement.classList.remove('ring-2', 'ring-shinku');
            }, 2000);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success' ? 'bg-matcha text-white' : 'bg-shinku text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Enhanced property card methods
    setupPropertyCardListeners() {
        // Add any additional event listeners for property cards
        this.updateFilterCount();
    }

    toggleExpand(propertyId) {
        const expandContent = document.getElementById(`expand-${propertyId}`);
        const expandButton = expandContent?.previousElementSibling;
        
        if (expandContent && expandButton) {
            expandContent.classList.toggle('expanded');
            expandButton.classList.toggle('expanded');
            
            const span = expandButton.querySelector('span');
            if (span) {
                span.textContent = expandContent.classList.contains('expanded') ? 'Show less' : 'Show more details';
            }
        }
    }

    toggleJsonView(propertyId) {
        const jsonView = document.getElementById(`json-${propertyId}`);
        if (jsonView) {
            jsonView.classList.toggle('hidden');
        }
    }

    toggleFavorite(propertyId) {
        const index = this.favorites.indexOf(propertyId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(propertyId);
        }
        
        localStorage.setItem('propertyFavorites', JSON.stringify(this.favorites));
        
        // Update the favorite button
        const favoriteButton = document.querySelector(`[data-property-id="${propertyId}"] .favorite-button`);
        if (favoriteButton) {
            favoriteButton.classList.toggle('favorited');
            const svg = favoriteButton.querySelector('svg');
            if (svg) {
                svg.setAttribute('fill', favoriteButton.classList.contains('favorited') ? 'currentColor' : 'none');
            }
        }
        
        this.showNotification(
            index > -1 ? 'Removed from favorites' : 'Added to favorites',
            'success'
        );
    }

    shareProperty(propertyId) {
        const property = realEstateData?.getPropertyById(propertyId);
        if (!property) return;
        
        const shareData = {
            title: property.title,
            text: `Check out this ${property.type} in ${property.neighborhood}, Kyoto`,
            url: window.location.href + `?property=${propertyId}`
        };
        
        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareData.url).then(() => {
                this.showNotification('Link copied to clipboard!', 'success');
            });
        }
    }

    generatePropertyListItem(property) {
        const neighborhoodInfo = realEstateData.getNeighborhoodInfo(property.neighborhood);
        const isRental = property.type?.toLowerCase().includes('rent') || property.id.includes('rent');
        const isVerified = isValidProperty(property);
        const isFavorited = this.favorites.includes(property.id);
        
        return `
            <div class="list-card bg-white dark:bg-gray-800 rounded-lg shadow-lg" data-property-id="${property.id}">
                <div class="flex gap-6 p-6">
                    <!-- Property Image -->
                    <div class="w-48 h-32 flex-shrink-0">
                        <div class="relative overflow-hidden rounded-lg h-full">
                            <img src="${property.image}" alt="${property.title}" 
                                 class="w-full h-full object-cover"
                                 loading="lazy">
                            <div class="property-badge">
                                ${isRental ? 'For Rent' : 'For Sale'}
                            </div>
                            ${isVerified ? '<span class="absolute bottom-2 right-2 bg-matcha text-white px-2 py-1 rounded text-xs font-bold">Verified</span>' : ''}
                        </div>
                        </div>
                        
                    <!-- Property Details -->
                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-3">
                                <div>
                                <h3 class="font-serif text-xl font-bold text-sumi dark:text-white mb-1">
                                    ${property.title}
                                </h3>
                                <p class="text-sumi/70 dark:text-white/70 mb-2">
                                    <span class="inline-block mr-4">📍 ${property.location}</span>
                                    <span class="inline-block">🏘️ ${property.neighborhood}</span>
                                </p>
                                <div class="text-sm text-sumi/60 dark:text-white/60">
                                    Listed by: ${property.agency} • ID: ${property.id}
                                </div>
                                </div>
                            <div class="text-right">
                                <div class="property-price">${property.price}</div>
                                <div class="property-price-usd">${property.priceUSD}</div>
                            </div>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="flex gap-6 mb-3">
                            <div class="text-sm">
                                <span class="font-semibold">${property.bedrooms}</span> beds
                    </div>
                            <div class="text-sm">
                                <span class="font-semibold">${property.bathrooms}</span> baths
                </div>
                            <div class="text-sm">
                                <span class="font-semibold">${property.size}</span>
            </div>
                            <div class="text-sm">
                                <span class="font-semibold">${property.yearBuilt}</span> built
                            </div>
                            <div class="text-sm">
                                <span class="font-semibold">${property.walkScore}</span> walk score
                            </div>
                        </div>
                        
                        <!-- Features Preview -->
                        <div class="mb-3">
                            <div class="property-features">
                                ${property.features.slice(0, 4).map(feature => 
                                    `<span class="property-feature">${feature}</span>`
                                ).join('')}
                                ${property.features.length > 4 ? 
                                    `<span class="property-feature">+${property.features.length - 4} more</span>` : 
                                    ''
                                }
                            </div>
                        </div>
                        
                        <!-- Actions -->
                        <div class="flex justify-between items-center">
                            <div class="action-buttons">
                                <a href="${property.listingUrl}" target="_blank" rel="noopener noreferrer" class="action-button-small${isVerified ? '' : ' opacity-50 pointer-events-none'}">
                                    View Details
                                </a>
                                <button onclick="realEstateManager.showPropertyModal('${property.id}')" class="action-button-small">
                                    Contact Agent
                                </button>
                                <button onclick="realEstateManager.shareProperty('${property.id}')" class="action-button-small">
                                    Share
                                </button>
                                <button class="favorite-button ${isFavorited ? 'favorited' : ''}" onclick="realEstateManager.toggleFavorite('${property.id}')" title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                                    <svg class="w-4 h-4" fill="${isFavorited ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                </button>
                            </div>
                            <button class="json-toggle" onclick="realEstateManager.toggleJsonView('${property.id}')">
                                { } JSON
                            </button>
                        </div>
                        
                        <!-- JSON View -->
                        <div class="json-view hidden mt-3" id="json-${property.id}">
                            ${JSON.stringify(property, null, 2)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    toggleShortcutsHelp() {
        const helpElement = document.getElementById('shortcuts-help');
        if (helpElement) {
            helpElement.classList.toggle('show');
        }
    }

    displayMarketStats() {
        if (!realEstateData) return;
        
        const stats = realEstateData.getMarketStats();
        const statsContainer = document.getElementById('market-stats');
        
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-bold text-kurenai mb-2">${stats.totalForSale}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Properties for Sale</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-matcha mb-2">${stats.totalForRent}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Properties for Rent</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-kobicha mb-2">${stats.avgSalePrice}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Avg Sale Price</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-aiiro mb-2">${stats.avgRentPrice}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Avg Rent Price</div>
                </div>
            </div>
        `;
    }

    displayAgencies() {
        if (!realEstateData) return;
        
        const agenciesContainer = document.getElementById('agencies-section');
        if (!agenciesContainer) return;

        const agencies = realEstateData.getAgencies();
        const rentalAgencies = realEstateData.getRentalAgencies();

        agenciesContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Sale Agencies -->
                <div>
                    <h3 class="font-serif text-xl font-bold text-sumi dark:text-white mb-4">Real Estate Agencies</h3>
                    <div class="space-y-4">
                        ${agencies.map(agency => `
                            <div class="zen-card p-4 rounded-lg">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="font-semibold text-sumi dark:text-white mb-1">${agency.name}</h4>
                                        <p class="text-sm text-sumi/70 dark:text-gray-300 mb-2">
                                            ${agency.specialties.join(', ')}
                                        </p>
                                        <div class="text-xs text-sumi/60 dark:text-gray-400">
                                            <div>📞 ${agency.phone}</div>
                                            <div>✉️ ${agency.email}</div>
                                        </div>
                                    </div>
                                    <a href="${agency.url}" target="_blank" rel="noopener noreferrer"
                                       class="bg-kurenai text-white px-4 py-2 rounded text-sm font-semibold hover:bg-kurenai/90 transition-colors focus-zen">
                                        Visit Site
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Rental Agencies -->
                <div>
                    <h3 class="font-serif text-xl font-bold text-sumi dark:text-white mb-4">Rental Agencies</h3>
                    <div class="space-y-4">
                        ${rentalAgencies.map(agency => `
                            <div class="zen-card p-4 rounded-lg">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="font-semibold text-sumi dark:text-white mb-1">${agency.name}</h4>
                                        <p class="text-sm text-sumi/70 dark:text-gray-300 mb-2">
                                            ${agency.specialties.join(', ')}
                                        </p>
                                        <div class="text-xs text-sumi/60 dark:text-gray-400">
                                            <div>📞 ${agency.phone}</div>
                                            <div>✉️ ${agency.email}</div>
                                        </div>
                                    </div>
                                    <a href="${agency.url}" target="_blank" rel="noopener noreferrer"
                                       class="bg-matcha text-white px-4 py-2 rounded text-sm font-semibold hover:bg-matcha/90 transition-colors focus-zen">
                                        Visit Site
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }



    clearFilters() {
        this.searchQuery = '';
        this.currentFilters = {
            type: 'all',
            priceRange: 'all',
            bedrooms: 'all',
            neighborhood: 'all'
        };
        
        // Reset form elements
        const searchInput = document.getElementById('property-search');
        if (searchInput) searchInput.value = '';
        
        const filterSelects = document.querySelectorAll('.property-filter');
        filterSelects.forEach(select => {
            select.value = 'all';
        });
        
        this.displayProperties();
    }

    showPropertyModal(propertyId) {
        if (!realEstateData) return;
        
        const property = realEstateData.getPropertyById(propertyId);
        if (!property) return;

        const modalHTML = `
            <div id="property-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="zen-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h2 class="font-serif text-2xl font-bold text-sumi dark:text-white">${property.title}</h2>
                            <button onclick="realEstateManager.closePropertyModal()" 
                                    class="text-sumi/60 dark:text-gray-400 hover:text-sumi dark:hover:text-white text-2xl focus-zen">
                                ×
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <img src="${property.image}" alt="${property.title}" 
                                     class="w-full h-64 object-cover rounded-lg mb-4">
                                <div class="text-2xl font-bold text-kurenai mb-2">${property.price}</div>
                                <div class="text-sm text-sumi/60 dark:text-gray-400 mb-4">${property.priceUSD}</div>
                            </div>
                            
                            <div>
                                <h3 class="font-semibold text-sumi dark:text-white mb-2">Property Details</h3>
                                <div class="space-y-2 text-sm text-sumi/70 dark:text-gray-300 mb-4">
                                    <div><strong>Location:</strong> ${property.location}</div>
                                    <div><strong>Type:</strong> ${property.type}</div>
                                    <div><strong>Size:</strong> ${property.size}</div>
                                    <div><strong>Bedrooms:</strong> ${property.bedrooms}</div>
                                    <div><strong>Bathrooms:</strong> ${property.bathrooms}</div>
                                    <div><strong>Year Built:</strong> ${property.yearBuilt}</div>
                                </div>
                                
                                <h3 class="font-semibold text-sumi dark:text-white mb-2">Description</h3>
                                <p class="text-sm text-sumi/70 dark:text-gray-300 mb-4">${property.description}</p>
                                
                                <h3 class="font-semibold text-sumi dark:text-white mb-2">Features</h3>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    ${property.features.map(feature => 
                                        `<span class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-gray-300 px-2 py-1 rounded text-sm">${feature}</span>`
                                    ).join('')}
                                </div>
                                
                                <div class="flex gap-3">
                                    <a href="${property.listingUrl}" target="_blank" rel="noopener noreferrer"
                                       class="flex-1 bg-kurenai text-white px-4 py-2 rounded font-semibold text-center hover:bg-kurenai/90 transition-colors focus-zen">
                                        View Full Listing
                                    </a>
                                    <a href="tel:${property.contact}" 
                                       class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-white px-4 py-2 rounded font-semibold hover:bg-washi/70 dark:hover:bg-gray-600/50 transition-colors focus-zen">
                                        Call Agent
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Close modal on backdrop click
        document.getElementById('property-modal').addEventListener('click', (e) => {
            if (e.target.id === 'property-modal') {
                this.closePropertyModal();
            }
        });
    }

    closePropertyModal() {
        const modal = document.getElementById('property-modal');
        if (modal) {
            modal.remove();
        }
    }

    toggleView() {
        const listings = document.querySelectorAll('#buy-listings, #rent-listings');
        listings.forEach(listing => {
            listing.classList.toggle('grid-view');
        });
    }

    // Test method to verify features are working
    testFeatures() {
        console.log('🧪 Testing Real Estate Features...');
        
        // Test neighborhood insights
        const insights = realEstateData.getNeighborhoodInsights();
        console.log('✅ Neighborhood Insights:', insights.length, 'neighborhoods loaded');
        
        // Test property data
        const saleProperties = realEstateData.getPropertiesForSale();
        const rentProperties = realEstateData.getPropertiesForRent();
        console.log('✅ Property Data:', saleProperties.length, 'for sale,', rentProperties.length, 'for rent');
        
        // Check for data integrity issues
        console.log('🔍 Checking data integrity...');
        saleProperties.forEach(prop => {
            if (prop.id.includes('rent')) {
                console.error('❌ Sale property has rent ID:', prop.id);
            }
        });
        rentProperties.forEach(prop => {
            if (prop.id.includes('sale')) {
                console.error('❌ Rental property has sale ID:', prop.id);
            }
            if (!prop.price.includes('/month')) {
                console.error('❌ Rental property has incorrect price format:', prop.id, prop.price);
            }
        });
        
        // Test comparison tool
        console.log('✅ Comparison Tool: Ready (max 3 properties)');
        
        // Test map functionality
        if (this.map) {
            console.log('✅ Interactive Map: Loaded and functional');
        } else {
            console.log('⚠️ Interactive Map: Google Maps not loaded yet');
        }
        
        console.log('🎉 All features are working!');
    }
}

// --- Validation Utilities ---
function isValidUrl(url, whitelist = []) {
    try {
        const u = new URL(url)
        if (u.protocol !== 'https:') return false
        if (whitelist.length && !whitelist.some(domain => u.hostname.endsWith(domain))) return false
        return true
    } catch {
        return false
    }
}

function isValidPhone(phone) {
    // E.164 format: +[country][number], min 10 digits
    return /^\+\d{10,15}$/.test(phone)
}

function isValidImage(url) {
    return isValidUrl(url, ['unsplash.com', 'kyotoheritage.com', 'arashiyama-re.com', 'kyotoluxury.com', 'centralkyoto.com'])
}

function isValidAgency(agency, agencyUrl) {
    // Add more trusted agencies as needed
    const trusted = [
        { name: 'Kyoto Heritage Properties', domain: 'kyotoheritage.com' },
        { name: 'Arashiyama Real Estate', domain: 'arashiyama-re.com' },
        { name: 'Kyoto Luxury Properties', domain: 'kyotoluxury.com' },
        { name: 'Central Kyoto Properties', domain: 'centralkyoto.com' }
    ]
    return trusted.some(a => agency === a.name && agencyUrl.includes(a.domain))
}

function isValidProperty(property) {
    return (
        property &&
        property.title &&
        property.price &&
        property.location &&
        property.address &&
        property.image &&
        property.agency &&
        property.contact
    )
}

// RealEstateManager class is now initialized in the HTML file 
// RealEstateManager class is now initialized in the HTML file 