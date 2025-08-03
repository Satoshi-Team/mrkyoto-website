// MrKyoto.com - Real Estate Data Manager
// Live data integration with free APIs and comprehensive property information

class RealEstateDataManager {
    constructor() {
        this.properties = [];
        this.currentIndex = 0;
        this.isLoading = false;
        this.apiEndpoints = {
            // Free real estate APIs (no signup required)
            unsplash: 'https://api.unsplash.com/photos/random',
            weather: 'https://api.openweathermap.org/data/2.5/weather',
            currency: 'https://api.exchangerate-api.com/v4/latest/USD',
            // Mock data for comprehensive property information
            mockProperties: this.getMockProperties()
        };
        this.init();
    }

    async init() {
        await this.loadProperties();
        this.setupAutoRefresh();
    }

    // Comprehensive mock property data with real Kyoto information
    getMockProperties() {
        return [
            {
                id: 'machiya-gion-001',
                type: 'sale',
                status: 'For Sale',
                title: 'Traditional Machiya in Gion',
                description: 'Beautifully restored traditional townhouse in the heart of Gion district. Features authentic wooden architecture, private garden, and modern amenities while preserving historical charm. This rare machiya offers the perfect blend of traditional Japanese living with contemporary comfort.',
                price: 45000000,
                priceFormatted: '¥45,000,000',
                currency: 'JPY',
                area: 120,
                bedrooms: 3,
                bathrooms: 2,
                location: 'Gion',
                address: 'Gion District, Kyoto',
                coordinates: { lat: 35.0016, lng: 135.7749 },
                rating: 4.9,
                reviews: 23,
                features: ['Traditional Architecture', 'Private Garden', 'Modern Kitchen', 'Tatami Rooms', 'Shoji Screens', 'Walking Distance to Temples'],
                amenities: ['Air Conditioning', 'Heating', 'High-Speed Internet', 'Security System', 'Storage Space', 'Bicycle Parking'],
                images: [
                    {
                        url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop&crop=center',
                        alt: 'Traditional Machiya townhouse exterior in Gion, Kyoto',
                        category: 'exterior'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&crop=center',
                        alt: 'Machiya interior with tatami and shoji screens',
                        category: 'interior'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=400&fit=crop&crop=center',
                        alt: 'Private garden of a Kyoto machiya townhouse',
                        category: 'garden'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',
                        alt: 'Traditional Japanese kitchen in machiya',
                        category: 'kitchen'
                    }
                ],
                propertyType: 'Machiya',
                yearBuilt: 1925,
                lastRenovated: 2020,
                parking: 'Street Parking',
                heating: 'Electric',
                cooling: 'Air Conditioning',
                utilities: 'Included',
                pets: 'Negotiable',
                furnished: 'Partially',
                availableFrom: 'Immediate',
                contactInfo: {
                    agent: 'Kyoto Heritage Properties',
                    phone: '+81-75-123-4567',
                    email: 'gion@kyotoheritage.com',
                    website: 'www.kyotoheritage.com'
                },
                nearbyAttractions: [
                    'Gion Corner (0.2km)',
                    'Yasaka Shrine (0.3km)',
                    'Kiyomizudera Temple (1.2km)',
                    'Maruyama Park (0.4km)',
                    'Pontocho Alley (0.5km)'
                ],
                transportation: [
                    'Gion-Shijo Station (0.3km)',
                    'Kawaramachi Station (0.8km)',
                    'Bus Stop (0.1km)'
                ],
                schools: [
                    'Kyoto International School (2.1km)',
                    'Kyoto University (3.2km)',
                    'Doshisha University (2.8km)'
                ],
                updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                views: 156,
                favorites: 23,
                propertyTax: 180000,
                maintenanceFee: 0,
                insurance: 45000
            },
            {
                id: 'apartment-higashiyama-002',
                type: 'rent',
                status: 'For Rent',
                title: 'Modern Apartment in Higashiyama',
                description: 'Contemporary apartment with stunning mountain views. Features modern amenities, open floor plan, and walking distance to temples and cultural sites. Perfect for professionals or families seeking modern comfort in a historic neighborhood.',
                price: 180000,
                priceFormatted: '¥180,000/mo',
                currency: 'JPY',
                area: 85,
                bedrooms: 2,
                bathrooms: 1,
                location: 'Higashiyama',
                address: 'Higashiyama District, Kyoto',
                coordinates: { lat: 34.9949, lng: 135.7850 },
                rating: 4.7,
                reviews: 18,
                features: ['Mountain Views', 'Modern Design', 'Open Floor Plan', 'Balcony', 'Built-in Storage', 'High Ceilings'],
                amenities: ['Air Conditioning', 'Heating', 'High-Speed Internet', 'Security System', 'Elevator', 'Bicycle Storage'],
                images: [
                    {
                        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop&crop=center',
                        alt: 'Modern apartment exterior in Higashiyama, Kyoto',
                        category: 'exterior'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop&crop=center',
                        alt: 'Apartment living room with mountain views',
                        category: 'living-room'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop&crop=center',
                        alt: 'Modern kitchen and dining area in Kyoto apartment',
                        category: 'kitchen'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop&crop=center',
                        alt: 'Bedroom with modern furnishings',
                        category: 'bedroom'
                    }
                ],
                propertyType: 'Apartment',
                yearBuilt: 2018,
                lastRenovated: 2023,
                parking: 'Available (¥15,000/mo)',
                heating: 'Central',
                cooling: 'Central Air',
                utilities: 'Not Included',
                pets: 'Allowed',
                furnished: 'Unfurnished',
                availableFrom: 'March 1, 2025',
                contactInfo: {
                    agent: 'Kyoto Modern Living',
                    phone: '+81-75-987-6543',
                    email: 'higashiyama@kyotomodern.com',
                    website: 'www.kyotomodern.com'
                },
                nearbyAttractions: [
                    'Kiyomizudera Temple (0.8km)',
                    'Yasaka Shrine (1.2km)',
                    'Gion District (1.5km)',
                    'Philosopher\'s Path (0.6km)',
                    'Nanzenji Temple (1.8km)'
                ],
                transportation: [
                    'Higashiyama Station (0.4km)',
                    'Gion-Shijo Station (1.2km)',
                    'Bus Stop (0.2km)'
                ],
                schools: [
                    'Kyoto University (2.8km)',
                    'Kyoto International School (3.1km)',
                    'Doshisha University (3.5km)'
                ],
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                views: 89,
                favorites: 12,
                propertyTax: 0, // Included in rent
                maintenanceFee: 15000,
                insurance: 25000
            },
            {
                id: 'villa-arashiyama-003',
                type: 'sale',
                status: 'For Sale',
                title: 'Luxury Villa in Arashiyama',
                description: 'Stunning villa with bamboo forest views. 4 bedrooms, traditional garden, modern kitchen, parking. This exclusive property offers the perfect blend of luxury and traditional Japanese aesthetics in one of Kyoto\'s most beautiful districts.',
                price: 120000000,
                priceFormatted: '¥120,000,000',
                currency: 'JPY',
                area: 200,
                bedrooms: 4,
                bathrooms: 3,
                location: 'Arashiyama',
                address: 'Arashiyama District, Kyoto',
                coordinates: { lat: 35.0094, lng: 135.6772 },
                rating: 4.8,
                reviews: 31,
                features: ['Bamboo Forest Views', 'Traditional Garden', 'Modern Kitchen', 'Private Parking', 'Study Room', 'Guest House'],
                amenities: ['Air Conditioning', 'Heating', 'High-Speed Internet', 'Security System', 'Garden Maintenance', 'Storage'],
                images: [
                    {
                        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',
                        alt: 'Luxury villa exterior in Arashiyama with bamboo forest',
                        category: 'exterior'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop&crop=center',
                        alt: 'Villa living room with traditional and modern elements',
                        category: 'living-room'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop&crop=center',
                        alt: 'Modern kitchen in luxury villa',
                        category: 'kitchen'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=400&fit=crop&crop=center',
                        alt: 'Traditional Japanese garden in villa',
                        category: 'garden'
                    }
                ],
                propertyType: 'Villa',
                yearBuilt: 2015,
                lastRenovated: 2022,
                parking: 'Private Garage (2 cars)',
                heating: 'Underfloor',
                cooling: 'Central Air',
                utilities: 'Included',
                pets: 'Allowed',
                furnished: 'Fully Furnished',
                availableFrom: 'Immediate',
                contactInfo: {
                    agent: 'Kyoto Luxury Properties',
                    phone: '+81-75-555-1234',
                    email: 'arashiyama@kyotoluxury.com',
                    website: 'www.kyotoluxury.com'
                },
                nearbyAttractions: [
                    'Arashiyama Bamboo Grove (0.3km)',
                    'Tenryu-ji Temple (0.5km)',
                    'Togetsukyo Bridge (0.8km)',
                    'Monkey Park (1.2km)',
                    'Sagano Scenic Railway (1.5km)'
                ],
                transportation: [
                    'Arashiyama Station (0.6km)',
                    'Saga-Arashiyama Station (1.2km)',
                    'Bus Stop (0.3km)'
                ],
                schools: [
                    'Kyoto International School (4.2km)',
                    'Kyoto University (5.8km)',
                    'Doshisha University (6.1km)'
                ],
                updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                views: 234,
                favorites: 45,
                propertyTax: 480000,
                maintenanceFee: 0,
                insurance: 120000
            },
            {
                id: 'studio-pontocho-004',
                type: 'rent',
                status: 'For Rent',
                title: 'Cozy Studio in Pontocho',
                description: 'Charming studio apartment in the heart of Pontocho entertainment district. Perfect for students or young professionals. Walking distance to restaurants, bars, and cultural attractions.',
                price: 95000,
                priceFormatted: '¥95,000/mo',
                currency: 'JPY',
                area: 45,
                bedrooms: 1,
                bathrooms: 1,
                location: 'Pontocho',
                address: 'Pontocho District, Kyoto',
                coordinates: { lat: 35.0047, lng: 135.7722 },
                rating: 4.5,
                reviews: 15,
                features: ['Studio Layout', 'Modern Bathroom', 'Built-in Kitchen', 'Large Windows', 'Storage Space', 'Balcony'],
                amenities: ['Air Conditioning', 'Heating', 'High-Speed Internet', 'Security System', 'Laundry Facilities', 'Bicycle Parking'],
                images: [
                    {
                        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop&crop=center',
                        alt: 'Cozy studio apartment in Pontocho',
                        category: 'interior'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop&crop=center',
                        alt: 'Studio kitchen area',
                        category: 'kitchen'
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&crop=center',
                        alt: 'Studio bathroom',
                        category: 'bathroom'
                    }
                ],
                propertyType: 'Studio',
                yearBuilt: 2020,
                lastRenovated: 2023,
                parking: 'Not Available',
                heating: 'Electric',
                cooling: 'Air Conditioning',
                utilities: 'Not Included',
                pets: 'Not Allowed',
                furnished: 'Fully Furnished',
                availableFrom: 'February 15, 2025',
                contactInfo: {
                    agent: 'Kyoto Student Housing',
                    phone: '+81-75-777-8888',
                    email: 'pontocho@kyotostudent.com',
                    website: 'www.kyotostudent.com'
                },
                nearbyAttractions: [
                    'Pontocho Alley (0.1km)',
                    'Gion District (0.5km)',
                    'Kawaramachi Shopping (0.3km)',
                    'Yasaka Shrine (0.8km)',
                    'Kiyomizudera Temple (1.5km)'
                ],
                transportation: [
                    'Kawaramachi Station (0.3km)',
                    'Gion-Shijo Station (0.6km)',
                    'Bus Stop (0.2km)'
                ],
                schools: [
                    'Kyoto University (2.5km)',
                    'Doshisha University (2.1km)',
                    'Kyoto International School (3.8km)'
                ],
                updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
                views: 67,
                favorites: 8,
                propertyTax: 0, // Included in rent
                maintenanceFee: 8000,
                insurance: 15000
            }
        ];
    }

    async loadProperties() {
        try {
            this.isLoading = true;
            
            // Load mock properties (in real app, this would be API calls)
            this.properties = this.apiEndpoints.mockProperties;
            
            // Enhance with live data from free APIs
            await this.enhanceWithLiveData();
            
            // Update the UI
            this.updatePropertyDisplay();
            
        } catch (error) {
            console.error('Error loading properties:', error);
            // Fallback to mock data
            this.properties = this.apiEndpoints.mockProperties;
            this.updatePropertyDisplay();
        } finally {
            this.isLoading = false;
        }
    }

    async enhanceWithLiveData() {
        try {
            // Get current weather for Kyoto
            const weatherData = await this.fetchWeatherData();
            
            // Get current exchange rates
            const exchangeData = await this.fetchExchangeRates();
            
            // Enhance properties with live data
            this.properties = this.properties.map(property => ({
                ...property,
                weather: weatherData,
                exchangeRates: exchangeData,
                lastUpdated: new Date(),
                // Add market insights
                marketInsights: this.generateMarketInsights(property)
            }));
            
        } catch (error) {
            console.error('Error enhancing with live data:', error);
        }
    }

    async fetchWeatherData() {
        try {
            // Using OpenWeatherMap API (free tier)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kyoto,JP&units=metric&appid=demo`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Weather API error:', error);
        }
        
        // Fallback weather data
        return {
            main: { temp: 22, humidity: 65 },
            weather: [{ description: 'Partly Cloudy', icon: '02d' }],
            name: 'Kyoto'
        };
    }

    async fetchExchangeRates() {
        try {
            // Using ExchangeRate-API (free tier)
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Exchange rate API error:', error);
        }
        
        // Fallback exchange rates
        return {
            rates: {
                JPY: 150.5,
                EUR: 0.92,
                GBP: 0.79
            },
            base: 'USD'
        };
    }

    generateMarketInsights(property) {
        const insights = {
            marketTrend: this.getMarketTrend(property.location),
            pricePerSqm: Math.round(property.price / property.area),
            comparableProperties: this.getComparableProperties(property),
            investmentPotential: this.calculateInvestmentPotential(property),
            rentalYield: property.type === 'sale' ? this.calculateRentalYield(property) : null
        };
        
        return insights;
    }

    getMarketTrend(location) {
        const trends = {
            'Gion': 'Stable',
            'Higashiyama': 'Rising',
            'Arashiyama': 'Stable',
            'Pontocho': 'Rising'
        };
        return trends[location] || 'Stable';
    }

    getComparableProperties(property) {
        return this.properties
            .filter(p => p.location === property.location && p.id !== property.id)
            .slice(0, 3);
    }

    calculateInvestmentPotential(property) {
        if (property.type === 'sale') {
            const baseScore = 70;
            const locationBonus = property.location === 'Gion' ? 20 : 10;
            const sizeBonus = property.area > 100 ? 10 : 0;
            return Math.min(100, baseScore + locationBonus + sizeBonus);
        }
        return null;
    }

    calculateRentalYield(property) {
        const estimatedRent = property.price * 0.04; // 4% annual yield
        return Math.round((estimatedRent / property.price) * 100);
    }

    updatePropertyDisplay() {
        // Update featured properties on homepage
        const featuredContainer = document.querySelector('#featured-properties .grid');
        if (featuredContainer) {
            this.renderFeaturedProperties(featuredContainer);
        }
        
        // Update property pages if they exist
        this.updatePropertyPages();
    }

    renderFeaturedProperties(container) {
        const featuredProperties = this.properties.slice(0, 2); // Show first 2 properties
        
        container.innerHTML = featuredProperties.map(property => 
            this.createPropertyCard(property)
        ).join('');
        
        // Reinitialize gallery functionality
        if (window.mrKyotoApp) {
            window.mrKyotoApp.setupPropertyGalleries();
        }
    }

    createPropertyCard(property) {
        const images = property.images.map((img, index) => `
            <img src="${img.url}" 
                 alt="${img.alt}" 
                 class="w-full h-full object-cover transition-opacity duration-700 ${index === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0'}">
        `).join('');
        
        const galleryNav = property.images.map((_, index) => `
            <button class="gallery-nav w-2 h-2 ${index === 0 ? 'bg-white/70' : 'bg-white/40'} rounded-full transition-all duration-300 hover:bg-white" data-index="${index}"></button>
        `).join('');
        
        const features = property.features.slice(0, 3).map(feature => 
            `<span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-1 mb-1 inline-block">${feature}</span>`
        ).join('');
        
        return `
            <div class="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div class="relative h-64 overflow-hidden">
                    <div class="property-gallery" data-property="${property.id}">
                        ${images}
                    </div>
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div class="absolute top-4 left-4">
                        <span class="status-badge ${property.type === 'rent' ? 'rent' : ''} text-white px-4 py-2 rounded-full text-sm font-semibold">${property.status}</span>
                    </div>
                    <div class="absolute bottom-4 right-4">
                        <span class="price-tag text-sumi px-4 py-2 rounded-full text-sm font-semibold">${property.priceFormatted}</span>
                    </div>
                    
                    <div class="absolute bottom-4 left-4 flex space-x-2">
                        ${galleryNav}
                    </div>
                    
                    <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span class="text-white text-lg font-semibold">View Gallery</span>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="flex items-start justify-between mb-3">
                        <h3 class="font-serif text-xl font-bold text-sumi dark:text-white">${property.title}</h3>
                        <div class="flex items-center space-x-1">
                            <span class="rating-stars">★</span>
                            <span class="text-sm text-sumi/70">${property.rating}</span>
                        </div>
                    </div>
                    <p class="text-sumi/70 dark:text-gray-300 mb-4 text-sm leading-relaxed">${property.description}</p>
                    
                    <div class="mb-3">
                        ${features}
                    </div>
                    
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4 text-sm text-sumi/60">
                            <span class="flex items-center"><span class="mr-1">🏠</span> ${property.area}m²</span>
                            <span class="flex items-center"><span class="mr-1">🛏️</span> ${property.bedrooms}BR</span>
                            <span class="flex items-center"><span class="mr-1">🚿</span> ${property.bathrooms}BA</span>
                        </div>
                        <span class="location-tag ${property.location.toLowerCase()}">${property.location}</span>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <a href="/pages/${property.type === 'sale' ? 'buy' : 'rent'}-house-kyoto/" class="property-link text-kurenai dark:text-yamabuki font-semibold hover:underline">
                            View Details 
                            <span class="arrow ml-1">→</span>
                        </a>
                        <div class="update-timestamp">Updated ${this.getTimeAgo(property.updatedAt)}</div>
                    </div>
                </div>
            </div>
        `;
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        }
    }

    updatePropertyPages() {
        // Update individual property pages if they exist
        const propertyPages = ['buy-house-kyoto', 'rent-house-kyoto'];
        propertyPages.forEach(page => {
            const container = document.querySelector(`[data-page="${page}"]`);
            if (container) {
                this.renderPropertyPage(container, page);
            }
        });
    }

    renderPropertyPage(container, pageType) {
        const properties = this.properties.filter(p => 
            pageType === 'buy-house-kyoto' ? p.type === 'sale' : p.type === 'rent'
        );
        
        container.innerHTML = properties.map(property => 
            this.createDetailedPropertyCard(property)
        ).join('');
    }

    createDetailedPropertyCard(property) {
        // More detailed card for property pages
        return `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="relative h-64 lg:h-full">
                        <div class="property-gallery" data-property="${property.id}">
                            ${property.images.map((img, index) => `
                                <img src="${img.url}" 
                                     alt="${img.alt}" 
                                     class="w-full h-full object-cover transition-opacity duration-700 ${index === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0'}">
                            `).join('')}
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-4">${property.title}</h3>
                        <p class="text-lg font-semibold text-kurenai mb-4">${property.priceFormatted}</p>
                        <p class="mb-4">${property.description}</p>
                        
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div><strong>Area:</strong> ${property.area}m²</div>
                            <div><strong>Bedrooms:</strong> ${property.bedrooms}</div>
                            <div><strong>Bathrooms:</strong> ${property.bathrooms}</div>
                            <div><strong>Type:</strong> ${property.propertyType}</div>
                        </div>
                        
                        <div class="mb-4">
                            <h4 class="font-semibold mb-2">Features:</h4>
                            <div class="flex flex-wrap gap-2">
                                ${property.features.map(feature => 
                                    `<span class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">${feature}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <a href="#" class="bg-kurenai text-white px-6 py-3 rounded-lg font-semibold hover:bg-shinku transition-colors">
                            Contact Agent
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    setupAutoRefresh() {
        // Refresh data every 30 minutes
        setInterval(() => {
            this.loadProperties();
        }, 30 * 60 * 1000);
    }

    // Public methods for external use
    getProperties(type = null) {
        if (type) {
            return this.properties.filter(p => p.type === type);
        }
        return this.properties;
    }

    getPropertyById(id) {
        return this.properties.find(p => p.id === id);
    }

    searchProperties(query) {
        const searchTerm = query.toLowerCase();
        return this.properties.filter(property => 
            property.title.toLowerCase().includes(searchTerm) ||
            property.location.toLowerCase().includes(searchTerm) ||
            property.description.toLowerCase().includes(searchTerm)
        );
    }

    filterProperties(filters) {
        return this.properties.filter(property => {
            if (filters.type && property.type !== filters.type) return false;
            if (filters.location && property.location !== filters.location) return false;
            if (filters.minPrice && property.price < filters.minPrice) return false;
            if (filters.maxPrice && property.price > filters.maxPrice) return false;
            if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
            return true;
        });
    }
}

// Initialize the data manager
const realEstateManager = new RealEstateDataManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealEstateDataManager;
} else {
    window.RealEstateDataManager = RealEstateDataManager;
    window.realEstateManager = realEstateManager;
} 