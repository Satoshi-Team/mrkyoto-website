// Culture Page Manager for MrKyoto.com
// Handles cultural experiences, search, filtering, and interactive features

class CultureManager {
    constructor() {
        this.currentFilters = {
            category: 'all',
            era: 'all',
            priceRange: 'all',
            neighborhood: 'all',
            duration: 'all'
        };
        this.searchQuery = '';
        this.viewMode = 'grid';
        this.favorites = JSON.parse(localStorage.getItem('culture-favorites') || '[]');
        this.savedSearches = JSON.parse(localStorage.getItem('culture-saved-searches') || '[]');
        this.charts = {};
        this.analyticsData = {};
        this.liveDataInterval = null;
        this.lastUpdateTime = new Date();
        this.init();
    }

    init() {
        this.loadCultureData();
        this.setupEventListeners();
        this.calculateAnalytics();
        this.updateAnalyticsDashboard();
        this.renderCharts();
        this.startLiveDataStream();
        this.displayExperiences();
        this.displayCultureStats();
        this.displayFeaturedExperiences();
        this.displayTopRatedExperiences();
        this.setupSearchAndFilters();
    }

    loadCultureData() {
        // Load the culture data script if not already loaded
        if (typeof cultureData === 'undefined') {
            const script = document.createElement('script');
            script.src = '../js/culture-data.js';
            script.onload = () => {
                this.displayExperiences();
                this.displayCultureStats();
                this.displayFeaturedExperiences();
                this.displayTopRatedExperiences();
            };
            document.head.appendChild(script);
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('culture-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.displayExperiences();
            });
        }

        // Filter functionality
        const filterSelects = document.querySelectorAll('.culture-filter');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.currentFilters[e.target.name] = e.target.value;
                this.displayExperiences();
            });
        });
    }

    displayExperiences() {
        const experiencesContainer = document.getElementById('culture-listings');
        if (!experiencesContainer) return;

        const experiences = this.getFilteredExperiences();
        experiencesContainer.innerHTML = this.generateExperienceCards(experiences);
        this.updateExperienceCounters(experiences.length);
    }

    getFilteredExperiences() {
        if (!cultureData) return [];

        let experiences = cultureData.getAllExperiences();

        // Apply search filter
        if (this.searchQuery) {
            experiences = experiences.filter(exp =>
                exp.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                exp.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                exp.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                exp.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
            );
        }

        // Apply category filter
        if (this.currentFilters.category !== 'all') {
            experiences = experiences.filter(exp => exp.category === this.currentFilters.category);
        }

        // Apply price range filter
        if (this.currentFilters.priceRange !== 'all') {
            experiences = experiences.filter(exp => {
                const price = parseInt(exp.price.replace(/[^\d]/g, ''));
                switch (this.currentFilters.priceRange) {
                    case 'low': return price <= 5000;
                    case 'medium': return price > 5000 && price <= 10000;
                    case 'high': return price > 10000;
                    default: return true;
                }
            });
        }

        // Apply neighborhood filter
        if (this.currentFilters.neighborhood !== 'all') {
            experiences = experiences.filter(exp => exp.neighborhood === this.currentFilters.neighborhood);
        }

        // Apply duration filter
        if (this.currentFilters.duration !== 'all') {
            experiences = experiences.filter(exp => {
                const duration = cultureData.getDurationInHours(exp.duration);
                switch (this.currentFilters.duration) {
                    case 'short': return duration <= 2;
                    case 'medium': return duration > 2 && duration <= 4;
                    case 'long': return duration > 4;
                    default: return true;
                }
            });
        }

        return experiences;
    }

    generateExperienceCards(experiences) {
        if (experiences.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="text-4xl mb-4" role="img" aria-label="No experiences">🏯</div>
                    <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">No Experiences Found</h3>
                    <p class="text-sumi/70 dark:text-gray-300">Try adjusting your search criteria or filters.</p>
                </div>
            `;
        }

        return experiences.map(exp => this.generateExperienceCard(exp)).join('');
    }

    generateExperienceCard(exp) {
        const isFeatured = exp.featured;
        
        return `
            <div class="zen-card p-6 rounded-xl mb-6 hover:shadow-xl transition-all duration-300 ${isFeatured ? 'border-2 border-kurenai' : ''}" data-experience-id="${exp.id}">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Experience Image -->
                    <div class="lg:col-span-1">
                        <div class="relative overflow-hidden rounded-lg h-48 lg:h-full">
                            <img src="${exp.image}" alt="${exp.title}" 
                                 class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                 loading="lazy">
                            ${isFeatured ? `
                                <div class="absolute top-4 left-4">
                                    <span class="bg-kurenai text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Featured
                                    </span>
                                </div>
                            ` : ''}
                            <div class="absolute top-4 right-4">
                                <span class="bg-washi/90 text-sumi px-3 py-1 rounded-full text-sm font-semibold">
                                    ${exp.category}
                                </span>
                            </div>
                            <div class="absolute bottom-4 left-4">
                                <span class="bg-sumi/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    ${exp.duration}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Experience Details -->
                    <div class="lg:col-span-2">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="font-serif text-xl font-bold text-sumi dark:text-white mb-2">
                                    ${exp.title}
                                </h3>
                                <p class="text-sumi/70 dark:text-gray-300 mb-2">
                                    <span class="inline-block mr-4">📍 ${exp.location}</span>
                                    <span class="inline-block mr-4">⭐ ${exp.rating} (${exp.reviews} reviews)</span>
                                    <span class="inline-block">👥 ${exp.capacity}</span>
                                </p>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-kurenai mb-1">${exp.price}</div>
                                <div class="text-sm text-sumi/60 dark:text-gray-400">${exp.priceUSD}</div>
                            </div>
                        </div>
                        
                        <!-- Experience Description -->
                        <p class="text-sumi/70 dark:text-gray-300 mb-4">${exp.description}</p>
                        
                        <!-- Experience Highlights -->
                        <div class="mb-4">
                            <h4 class="font-semibold text-sumi dark:text-white mb-2">Highlights:</h4>
                            <div class="flex flex-wrap gap-2">
                                ${exp.highlights.slice(0, 3).map(highlight => 
                                    `<span class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-gray-300 px-2 py-1 rounded text-sm">${highlight}</span>`
                                ).join('')}
                                ${exp.highlights.length > 3 ? 
                                    `<span class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-gray-300 px-2 py-1 rounded text-sm">+${exp.highlights.length - 3} more</span>` : 
                                    ''
                                }
                            </div>
                        </div>
                        
                        <!-- Experience Info -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div class="text-center">
                                <div class="text-lg font-semibold text-sumi dark:text-white">${exp.duration}</div>
                                <div class="text-sm text-sumi/60 dark:text-gray-400">Duration</div>
                            </div>
                            <div class="text-center">
                                <div class="text-lg font-semibold text-sumi dark:text-white">${exp.capacity}</div>
                                <div class="text-sm text-sumi/60 dark:text-gray-400">Capacity</div>
                            </div>
                            <div class="text-center">
                                <div class="text-lg font-semibold text-sumi dark:text-white">${exp.languages.join(', ')}</div>
                                <div class="text-sm text-sumi/60 dark:text-gray-400">Languages</div>
                            </div>
                            <div class="text-center">
                                <div class="text-lg font-semibold text-sumi dark:text-white">${exp.seasonality}</div>
                                <div class="text-sm text-sumi/60 dark:text-gray-400">Seasonality</div>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex flex-col sm:flex-row gap-3">
                            <a href="${exp.bookingUrl}" target="_blank" rel="noopener noreferrer"
                               class="flex-1 bg-kurenai text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-kurenai/90 transition-colors focus-zen">
                                Book Experience
                            </a>
                            <button onclick="cultureManager.showExperienceModal('${exp.id}')"
                                    class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-washi/70 dark:hover:bg-gray-600/50 transition-colors focus-zen">
                                Learn More
                            </button>
                            <a href="tel:${exp.contact}" 
                               class="bg-sumi/10 dark:bg-gray-600/10 text-sumi dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-sumi/20 dark:hover:bg-gray-600/20 transition-colors focus-zen">
                                Call Provider
                            </a>
                        </div>
                        
                        <!-- Provider Info -->
                        <div class="mt-4 pt-4 border-t border-sumi/10 dark:border-gray-600/10">
                            <div class="flex items-center justify-between">
                                <div>
                                    <span class="text-sm text-sumi/60 dark:text-gray-400">Provider:</span>
                                    <a href="${exp.providerUrl}" target="_blank" rel="noopener noreferrer"
                                       class="text-sm font-semibold text-kurenai hover:underline ml-1">
                                        ${exp.provider}
                                    </a>
                                </div>
                                <div class="text-xs text-sumi/50 dark:text-gray-500">
                                    ID: ${exp.id}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateExperienceCounters(experienceCount) {
        const experienceCounter = document.getElementById('experience-counter');
        if (experienceCounter) experienceCounter.textContent = experienceCount;
    }

    displayCultureStats() {
        if (!cultureData) return;
        
        const stats = cultureData.getExperienceStats();
        const statsContainer = document.getElementById('culture-stats');
        
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-bold text-kurenai mb-2">${stats.totalExperiences}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Total Experiences</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-matcha mb-2">${stats.categories}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Experience Categories</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-kobicha mb-2">${stats.averageRating}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Average Rating</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-aiiro mb-2">${stats.featuredCount}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Featured Experiences</div>
                </div>
            </div>
        `;
    }

    displayFeaturedExperiences() {
        if (!cultureData) return;
        
        const featuredContainer = document.getElementById('featured-experiences');
        if (!featuredContainer) return;

        const featuredExperiences = cultureData.getFeaturedExperiences();

        featuredContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${featuredExperiences.map(exp => `
                    <div class="zen-card p-6 rounded-lg border-2 border-kurenai">
                        <div class="flex items-center mb-3">
                            <span class="bg-kurenai text-white px-2 py-1 rounded text-xs font-semibold mr-2">Featured</span>
                            <span class="text-sm text-sumi/60 dark:text-gray-400">${exp.category}</span>
                        </div>
                        <h3 class="font-serif text-lg font-bold text-sumi dark:text-white mb-3">${exp.title}</h3>
                        <p class="text-sumi/70 dark:text-gray-300 mb-4">${exp.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-sumi/60 dark:text-gray-400">${exp.price}</span>
                            <a href="${exp.bookingUrl}" target="_blank" rel="noopener noreferrer"
                               class="bg-kurenai text-white px-4 py-2 rounded text-sm font-semibold hover:bg-kurenai/90 transition-colors focus-zen">
                                Book Now
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    displayTopRatedExperiences() {
        if (!cultureData) return;
        
        const topRatedContainer = document.getElementById('top-rated-experiences');
        if (!topRatedContainer) return;

        const topRatedExperiences = cultureData.getTopRatedExperiences(3);

        topRatedContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${topRatedExperiences.map(exp => `
                    <div class="zen-card p-4 rounded-lg">
                        <img src="${exp.image}" alt="${exp.title}" 
                             class="w-full h-32 object-cover rounded mb-3">
                        <h4 class="font-semibold text-sumi dark:text-white mb-2">${exp.title}</h4>
                        <p class="text-sm text-sumi/70 dark:text-gray-300 mb-2">${exp.category}</p>
                        <div class="flex justify-between items-center text-xs text-sumi/60 dark:text-gray-400 mb-3">
                            <span>⭐ ${exp.rating} (${exp.reviews})</span>
                            <span>${exp.duration}</span>
                        </div>
                        <a href="${exp.bookingUrl}" target="_blank" rel="noopener noreferrer"
                           class="bg-kurenai text-white px-4 py-2 rounded text-sm font-semibold hover:bg-kurenai/90 transition-colors focus-zen inline-block">
                            Book Experience
                        </a>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupSearchAndFilters() {
        // Add search and filter UI if not present
        const mainContent = document.querySelector('main');
        if (!mainContent || document.getElementById('search-filters')) return;

        const searchFiltersHTML = `
            <div id="search-filters" class="zen-card p-6 rounded-2xl shadow-lg mb-8">
                <h3 class="font-serif text-xl font-bold text-sumi dark:text-white mb-4">Search & Filter Experiences</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div class="lg:col-span-2">
                        <label for="culture-search" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Search Experiences</label>
                        <input type="text" id="culture-search" placeholder="Search by title, category, or description..."
                               class="w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                    </div>
                    
                    <div>
                        <label for="category-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Category</label>
                        <select name="category" id="category-filter" class="culture-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                            <option value="all">All Categories</option>
                            <option value="Tea Culture">Tea Culture</option>
                            <option value="Traditional Dress">Traditional Dress</option>
                            <option value="Arts & Crafts">Arts & Crafts</option>
                            <option value="Spiritual Practice">Spiritual Practice</option>
                            <option value="Culinary Arts">Culinary Arts</option>
                            <option value="Nature & Gardens">Nature & Gardens</option>
                            <option value="Performing Arts">Performing Arts</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="price-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Price Range</label>
                        <select name="priceRange" id="price-filter" class="culture-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                            <option value="all">All Prices</option>
                            <option value="low">Under ¥5,000</option>
                            <option value="medium">¥5,000 - ¥10,000</option>
                            <option value="high">Over ¥10,000</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="neighborhood-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Area</label>
                        <select name="neighborhood" id="neighborhood-filter" class="culture-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                            <option value="all">All Areas</option>
                            <option value="Gion">Gion</option>
                            <option value="Nakagyo">Nakagyo</option>
                            <option value="Pontocho">Pontocho</option>
                            <option value="Ukyo">Ukyo</option>
                            <option value="Fushimi">Fushimi</option>
                            <option value="Multiple">Multiple</option>
                        </select>
                    </div>
                </div>
                
                <div class="flex justify-between items-center mt-4 pt-4 border-t border-sumi/10 dark:border-gray-600/10">
                    <div class="text-sm text-sumi/70 dark:text-gray-300">
                        Showing <span id="experience-counter">0</span> experiences
                    </div>
                    <button onclick="cultureManager.clearFilters()" 
                            class="text-sm text-kurenai hover:underline focus-zen">
                        Clear All Filters
                    </button>
                </div>
            </div>
        `;

        mainContent.insertAdjacentHTML('afterbegin', searchFiltersHTML);
        this.setupEventListeners();
    }

    clearFilters() {
        this.searchQuery = '';
        this.currentFilters = {
            category: 'all',
            priceRange: 'all',
            neighborhood: 'all',
            duration: 'all'
        };
        
        // Reset form elements
        const searchInput = document.getElementById('culture-search');
        if (searchInput) searchInput.value = '';
        
        const filterSelects = document.querySelectorAll('.culture-filter');
        filterSelects.forEach(select => {
            select.value = 'all';
        });
        
        this.displayExperiences();
    }

    showExperienceModal(experienceId) {
        if (!cultureData) return;
        
        const exp = cultureData.getExperienceById(experienceId);
        if (!exp) return;

        const relatedExperiences = cultureData.getRelatedExperiences(experienceId);

        const modalHTML = `
            <div id="experience-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="zen-card max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h2 class="font-serif text-2xl font-bold text-sumi dark:text-white">${exp.title}</h2>
                            <button onclick="cultureManager.closeExperienceModal()" 
                                    class="text-sumi/60 dark:text-gray-400 hover:text-sumi dark:hover:text-white text-2xl focus-zen">
                                ×
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div class="lg:col-span-2">
                                <img src="${exp.image}" alt="${exp.title}" 
                                     class="w-full h-64 object-cover rounded-lg mb-4">
                                
                                <div class="flex items-center justify-between mb-4 text-sm text-sumi/60 dark:text-gray-400">
                                    <div>
                                        <span>${exp.category}</span>
                                        <span class="mx-2">•</span>
                                        <span>${exp.duration}</span>
                                        <span class="mx-2">•</span>
                                        <span>${exp.capacity}</span>
                                    </div>
                                    <div>
                                        <span>⭐ ${exp.rating} (${exp.reviews} reviews)</span>
                                    </div>
                                </div>
                                
                                <div class="prose prose-sumi dark:prose-invert max-w-none mb-6">
                                    <p class="text-lg font-semibold mb-4">${exp.description}</p>
                                    <p>${exp.longDescription}</p>
                                </div>
                                
                                <div class="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <h4 class="font-semibold text-sumi dark:text-white mb-2">Highlights</h4>
                                        <ul class="text-sm text-sumi/70 dark:text-gray-300">
                                            ${exp.highlights.map(highlight => `<li>• ${highlight}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-sumi dark:text-white mb-2">Details</h4>
                                        <div class="text-sm text-sumi/70 dark:text-gray-300 space-y-1">
                                            <div><strong>Languages:</strong> ${exp.languages.join(', ')}</div>
                                            <div><strong>Seasonality:</strong> ${exp.seasonality}</div>
                                            <div><strong>Best Time:</strong> ${exp.bestTime}</div>
                                            <div><strong>Requirements:</strong> ${exp.requirements.join(', ')}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="flex gap-3">
                                    <a href="${exp.bookingUrl}" target="_blank" rel="noopener noreferrer"
                                       class="flex-1 bg-kurenai text-white px-4 py-2 rounded font-semibold text-center hover:bg-kurenai/90 transition-colors focus-zen">
                                        Book Experience
                                    </a>
                                    <a href="tel:${exp.contact}" 
                                       class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-white px-4 py-2 rounded font-semibold hover:bg-washi/70 dark:hover:bg-gray-600/50 transition-colors focus-zen">
                                        Call Provider
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="font-semibold text-sumi dark:text-white mb-4">Related Experiences</h3>
                                <div class="space-y-4">
                                    ${relatedExperiences.map(related => `
                                        <div class="p-3 bg-washi/30 dark:bg-gray-700/30 rounded">
                                            <h4 class="font-semibold text-sumi dark:text-white text-sm mb-2">${related.title}</h4>
                                            <p class="text-xs text-sumi/60 dark:text-gray-400 mb-2">${related.category} • ${related.price}</p>
                                            <a href="${related.bookingUrl}" target="_blank" rel="noopener noreferrer"
                                               class="text-xs text-kurenai hover:underline">Book Experience</a>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Close modal on backdrop click
        document.getElementById('experience-modal').addEventListener('click', (e) => {
            if (e.target.id === 'experience-modal') {
                this.closeExperienceModal();
            }
        });
    }

    closeExperienceModal() {
        const modal = document.getElementById('experience-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Analytics Methods
    calculateAnalytics() {
        console.log('📊 Calculating culture analytics...');
        
        if (!cultureData) return;
        
        const experiences = cultureData.getAllExperiences();
        
        this.analyticsData = {
            totalTraditions: experiences.length,
            artForms: experiences.filter(exp => exp.category === 'Arts & Crafts').length,
            ceremonies: experiences.filter(exp => exp.category === 'Ceremonies & Rituals').length,
            totalCategories: new Set(experiences.map(exp => exp.category)).size,
            historicalPeriods: new Set(experiences.map(exp => exp.era || 'Modern')).size,
            topCategory: this.getTopCategory(experiences),
            avgRating: this.calculateAverageRating(experiences),
            avgPrice: this.calculateAveragePrice(experiences)
        };
    }

    getTopCategory(experiences) {
        const categoryCounts = {};
        experiences.forEach(exp => {
            categoryCounts[exp.category] = (categoryCounts[exp.category] || 0) + 1;
        });
        
        return Object.entries(categoryCounts)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Cultural';
    }

    calculateAverageRating(experiences) {
        const ratings = experiences.map(exp => exp.rating).filter(r => r);
        return ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '0.0';
    }

    calculateAveragePrice(experiences) {
        const prices = experiences.map(exp => parseInt(exp.price.replace(/[^\d]/g, ''))).filter(p => p);
        return prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
    }

    updateAnalyticsDashboard() {
        console.log('📊 Updating culture analytics dashboard...');
        
        // Update hero stats
        const heroTotalTraditions = document.getElementById('hero-total-traditions');
        const heroArtForms = document.getElementById('hero-art-forms');
        const heroCategories = document.getElementById('hero-categories');
        
        if (heroTotalTraditions) heroTotalTraditions.textContent = this.analyticsData.totalTraditions || 0;
        if (heroArtForms) heroArtForms.textContent = this.analyticsData.artForms || 0;
        if (heroCategories) heroCategories.textContent = this.analyticsData.totalCategories || 0;
        
        // Update analytics cards
        const totalTraditions = document.getElementById('total-traditions');
        const artForms = document.getElementById('art-forms');
        const totalCategories = document.getElementById('total-categories');
        const historicalPeriods = document.getElementById('historical-periods');
        const topCategory = document.getElementById('top-category');
        
        if (totalTraditions) totalTraditions.textContent = this.analyticsData.totalTraditions || 0;
        if (artForms) artForms.textContent = this.analyticsData.artForms || 0;
        if (totalCategories) totalCategories.textContent = this.analyticsData.totalCategories || 0;
        if (historicalPeriods) historicalPeriods.textContent = this.analyticsData.historicalPeriods || 0;
        if (topCategory) topCategory.textContent = this.analyticsData.topCategory || 'Cultural';
        
        // Update counters
        const artsCount = document.getElementById('arts-count');
        const ceremoniesCount = document.getElementById('ceremonies-count');
        
        if (artsCount) artsCount.textContent = this.analyticsData.artForms || 0;
        if (ceremoniesCount) ceremoniesCount.textContent = this.analyticsData.ceremonies || 0;
    }

    renderCharts() {
        console.log('📊 Rendering culture charts...');
        
        this.renderCategoryChart();
        this.renderTimelineChart();
    }

    renderCategoryChart() {
        const ctx = document.getElementById('category-chart');
        if (!ctx) return;
        
        if (!cultureData) return;
        
        const experiences = cultureData.getAllExperiences();
        const categories = {};
        experiences.forEach(exp => {
            categories[exp.category] = (categories[exp.category] || 0) + 1;
        });
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: [
                        '#7C2D12', '#92400E', '#166534', '#1E3A8A',
                        '#991B1B', '#B45309', '#374151', '#B91C1C'
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
                            color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#0F0F0F',
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    }

    renderTimelineChart() {
        const ctx = document.getElementById('timeline-chart');
        if (!ctx) return;
        
        if (!cultureData) return;
        
        const experiences = cultureData.getAllExperiences();
        const eras = {};
        experiences.forEach(exp => {
            const era = exp.era || 'Modern';
            eras[era] = (eras[era] || 0) + 1;
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(eras),
                datasets: [{
                    label: 'Cultural Traditions',
                    data: Object.values(eras),
                    backgroundColor: '#7C2D12',
                    borderColor: '#7C2D12',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#0F0F0F'
                        }
                    },
                    x: {
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#0F0F0F'
                        }
                    }
                }
            }
        });
    }

    startLiveDataStream() {
        console.log('📊 Starting culture live data stream...');
        
        this.liveDataInterval = setInterval(() => {
            this.updateLiveData();
        }, 30000); // Update every 30 seconds
    }

    updateLiveData() {
        // Simulate cultural data updates
        if (cultureData) {
            const experiences = cultureData.getAllExperiences();
            const randomExperience = experiences[Math.floor(Math.random() * experiences.length)];
            
            // Update live indicators
            this.updateLiveIndicators();
            
            // Simulate new cultural discovery
            if (Math.random() < 0.1) { // 10% chance
                this.showNotification(`New cultural tradition discovered: ${randomExperience.title}`, 'info');
            }
        }
    }

    updateLiveIndicators() {
        const liveIndicator = document.getElementById('live-indicator');
        if (liveIndicator) {
            const timestamp = new Date().toLocaleTimeString();
            liveIndicator.innerHTML = `
                <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live Data - ${timestamp}</span>
                </div>
            `;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        notification.classList.add(bgColor, 'text-white');
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize culture manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cultureManager = new CultureManager();
}); 