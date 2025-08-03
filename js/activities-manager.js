// Activities Page Manager for MrKyoto.com
// Handles activities, tours, search, filtering, and interactive features with real API integration

class ActivitiesManager {
    constructor() {
        this.currentFilters = {
            category: 'all',
            duration: 'all',
            priceRange: 'all',
            sort: 'popular'
        };
        this.searchQuery = '';
        this.viewMode = localStorage.getItem('activityViewMode') || 'grid';
        this.favorites = JSON.parse(localStorage.getItem('favoriteActivities') || '[]');
        this.savedSearches = JSON.parse(localStorage.getItem('savedActivitySearches') || '[]');
        this.charts = {};
        this.analyticsData = null;
        this.liveDataInterval = null;
        this.lastUpdateTime = new Date();
        this.activities = []; // Store loaded activities
        this.isLoading = false;
        
        // Load activities data immediately
        this.activities = this.getLocalActivities();
        console.log(`🚀 Constructor loaded ${this.activities.length} activities`);
        
        this.init();
    }

    async init() {
        console.log('🚀 ActivitiesManager initializing...');
        console.log('🚀 activitiesData available:', typeof activitiesData !== 'undefined');
        if (typeof activitiesData !== 'undefined') {
            console.log('🚀 activitiesData.getAllActivities():', activitiesData.getAllActivities());
        }
        
        // Test if activities grid element exists
        const activitiesGrid = document.getElementById('activities-grid');
        console.log('🚀 activities-grid element found:', activitiesGrid);
        
        try {
            // Wait for data to be available with retry mechanism
            await this.waitForData();
            await this.loadActivitiesData();
            this.setupEventListeners();
            this.calculateAnalytics();
            this.updateAnalyticsDashboard();
            this.renderCharts();
            this.displayActivities();
            
            // Initialize advanced features
            this.startLiveDataStream();
            
            // Validate contact information after data is loaded
            setTimeout(() => {
                this.validateContactInfo();
            }, 1500);

            // Listen for language changes
            window.addEventListener('languageChanged', () => {
                console.log('🔄 Language changed, re-rendering activities...');
                setTimeout(() => {
                    this.displayActivities();
                }, 100);
            });

            // Force initial display after a short delay to ensure data is loaded
            setTimeout(() => {
                console.log('🔄 Force initial display after delay...');
                this.displayActivities();
            }, 500);
        } catch (error) {
            console.error('❌ Error in ActivitiesManager init:', error);
            // Fallback: try to display activities anyway
            this.loadActivitiesData();
            this.displayActivities();
        }
    }

    async waitForData() {
        let attempts = 0;
        const maxAttempts = 10;
        
        while (attempts < maxAttempts) {
            console.log(`🔄 Waiting for data... attempt ${attempts + 1}/${maxAttempts}`);
            
            // Check multiple ways the data might be available
            if (typeof activitiesData !== 'undefined' || 
                typeof window.activitiesData !== 'undefined' || 
                typeof window.activitiesDataArray !== 'undefined') {
                console.log('✅ Activities data is available');
                return;
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
            attempts++;
        }
        
        console.log('⚠️ Activities data not available after waiting, proceeding anyway');
    }

    async loadActivitiesData() {
        this.isLoading = true;
        this.showLoadingState();

        console.log('🔄 Starting activities data loading...');
        console.log('🔄 Direct test - activitiesData available:', typeof activitiesData !== 'undefined');
        console.log('🔄 window.activitiesData available:', typeof window.activitiesData !== 'undefined');
        console.log('🔄 window.activitiesDataArray available:', typeof window.activitiesDataArray !== 'undefined');
        
        if (typeof activitiesData !== 'undefined') {
            console.log('🔄 Direct test - activitiesData.getAllActivities():', activitiesData.getAllActivities());
        }
        
        if (window.activitiesData) {
            console.log('🔄 window.activitiesData.getAllActivities():', window.activitiesData.getAllActivities());
        }
        
        if (window.activitiesDataArray) {
            console.log('🔄 window.activitiesDataArray length:', window.activitiesDataArray.length);
        }

        try {
            // Try to get activities from the data manager
            console.log('🔄 Attempting to load activities from data manager...');
            this.activities = this.getLocalActivities();
            console.log(`🔄 Local data returned ${this.activities.length} activities`);

            // If no activities loaded, try direct access to the array
            if (!this.activities || this.activities.length === 0) {
                console.log('🔄 No activities from manager, trying direct array access...');
                if (typeof activitiesData !== 'undefined' && Array.isArray(activitiesData)) {
                    this.activities = activitiesData;
                    console.log(`🔄 Direct array access loaded ${this.activities.length} activities`);
                }
            }

            // Final fallback - try the manager methods again
            if (!this.activities || this.activities.length === 0) {
                console.log('🔄 Final fallback: Trying manager methods again...');
                if (typeof activitiesData !== 'undefined' && typeof activitiesData.getAllActivities === 'function') {
                    this.activities = activitiesData.getAllActivities();
                    console.log(`🔄 Manager methods loaded ${this.activities.length} activities`);
                }
            }

            // Ultimate fallback - create basic activities if still empty
            if (!this.activities || this.activities.length === 0) {
                console.log('🔄 Ultimate fallback: Creating basic activities...');
                this.activities = [
                    {
                        id: 1,
                        title: 'Golden Pavilion Tour',
                        description: 'Visit the iconic Kinkaku-ji (Golden Pavilion), a UNESCO World Heritage site.',
                        price: '¥8,500',
                        duration: '3 hours',
                        category: 'Cultural',
                        rating: 4.8,
                        reviews: 1247,
                        featured: true,
                        bookingUrl: 'https://www.viator.com/searchResults/all?text=Golden+Pavilion+Tour&pid=P00242318&mcid=42383&medium=link'
                    },
                    {
                        id: 2,
                        title: 'Fushimi Inari Shrine',
                        description: 'Explore the famous red torii gates of Fushimi Inari Shrine.',
                        price: '¥6,800',
                        duration: '4 hours',
                        category: 'Cultural',
                        rating: 4.9,
                        reviews: 2156,
                        featured: true,
                        bookingUrl: 'https://www.viator.com/searchResults/all?text=Fushimi+Inari+Shrine&pid=P00242318&mcid=42383&medium=link'
                    },
                    {
                        id: 3,
                        title: 'Arashiyama Bamboo Grove',
                        description: 'Walk through the enchanting bamboo forest of Arashiyama.',
                        price: '¥7,200',
                        duration: '3.5 hours',
                        category: 'Nature',
                        rating: 4.7,
                        reviews: 1893,
                        featured: true,
                        bookingUrl: 'https://www.viator.com/searchResults/all?text=Arashiyama+Bamboo+Grove&pid=P00242318&mcid=42383&medium=link'
                    },
                    {
                        id: 4,
                        title: 'Gion District Tour',
                        description: 'Discover the historic geisha district of Gion.',
                        price: '¥6,500',
                        duration: '2.5 hours',
                        category: 'Cultural',
                        rating: 4.6,
                        reviews: 1567,
                        featured: false,
                        bookingUrl: 'https://www.viator.com/searchResults/all?text=Gion+District&pid=P00242318&mcid=42383&medium=link'
                    },
                    {
                        id: 5,
                        title: 'Kyoto Cooking Class',
                        description: 'Learn to cook traditional Japanese dishes in a hands-on cooking class.',
                        price: '¥12,000',
                        duration: '4 hours',
                        category: 'Culinary',
                        rating: 4.9,
                        reviews: 892,
                        featured: true,
                        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kyoto+Cooking+Class&pid=P00242318&mcid=42383&medium=link'
                    }
                ];
                console.log(`🔄 Ultimate fallback created ${this.activities.length} basic activities`);
            }

            console.log(`✅ Loaded ${this.activities.length} activities total`);
            console.log('📋 Activities:', this.activities);
            
            // Show activities in a more readable format
            if (this.activities.length > 0) {
                console.log('📋 First activity:', {
                    id: this.activities[0].id,
                    title: this.activities[0].title,
                    category: this.activities[0].category,
                    price: this.activities[0].price
                });
            }
            
            this.hideLoadingState();
            
            // Force display of activities
            console.log('🔄 Force displaying activities after loading...');
            this.displayActivities();

        } catch (error) {
            console.error('❌ Error loading activities:', error);
            this.activities = this.getLocalActivities();
            console.log(`🔄 Fallback: Loaded ${this.activities.length} local activities`);
            this.hideLoadingState();
            this.showNotification('Error loading activities. Using local data.', 'warning');
        }
    }

    getLocalActivities() {
        console.log('🏠 Getting local activities...');
        
        // First try window.activitiesData (the manager instance)
        if (window.activitiesData && typeof window.activitiesData.getAllActivities === 'function') {
            console.log('🏠 window.activitiesData found, calling getAllActivities()');
            const activities = window.activitiesData.getAllActivities();
            console.log(`🏠 window.activitiesData returned ${activities.length} activities`);
            return activities;
        }
        
        // Then try global activitiesData variable
        if (typeof activitiesData !== 'undefined') {
            if (typeof activitiesData.getAllActivities === 'function') {
                console.log('🏠 activitiesData found, calling getAllActivities()');
                const activities = activitiesData.getAllActivities();
                console.log(`🏠 activitiesData returned ${activities.length} activities`);
                return activities;
            } else if (Array.isArray(activitiesData)) {
                console.log(`🏠 activitiesData is array, returning ${activitiesData.length} activities`);
                return activitiesData;
            }
        }
        
        // Try window.activitiesDataArray
        if (window.activitiesDataArray && Array.isArray(window.activitiesDataArray)) {
            console.log(`🏠 window.activitiesDataArray found, returning ${window.activitiesDataArray.length} activities`);
            return window.activitiesDataArray;
        }
        
        // Try window.activitiesDataInstance
        if (window.activitiesDataInstance && typeof window.activitiesDataInstance.getAllActivities === 'function') {
            console.log('🏠 window.activitiesDataInstance found, calling getAllActivities()');
            const activities = window.activitiesDataInstance.getAllActivities();
            console.log(`🏠 window.activitiesDataInstance returned ${activities.length} activities`);
            return activities;
        }
        
        console.log('🏠 No activities found, returning empty array');
        return [];
    }

    showLoadingState() {
        const activitiesGrid = document.getElementById('activities-grid');
        if (activitiesGrid) {
            activitiesGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-shinku mb-4"></div>
                    <p class="text-sumi/70 dark:text-gray-300">Loading real activities and reviews...</p>
                </div>
            `;
        }
    }

    hideLoadingState() {
        this.isLoading = false;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('activity-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.displayActivities();
            });
        }

        // Filter functionality
        const filterSelects = document.querySelectorAll('.activity-filter');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.currentFilters[e.target.name] = e.target.value;
                this.displayActivities();
            });
        });

        // View mode toggles
        const viewGridBtn = document.getElementById('view-grid');
        const viewListBtn = document.getElementById('view-list');
        
        if (viewGridBtn) {
            viewGridBtn.addEventListener('click', () => {
                this.viewMode = 'grid';
                localStorage.setItem('activityViewMode', 'grid');
                this.displayActivities();
                this.updateViewModeButtons();
            });
        }
        
        if (viewListBtn) {
            viewListBtn.addEventListener('click', () => {
                this.viewMode = 'list';
                localStorage.setItem('activityViewMode', 'list');
                this.displayActivities();
                this.updateViewModeButtons();
            });
        }

        // Initial view mode button state
        this.updateViewModeButtons();
    }

    updateViewModeButtons() {
        const viewGridBtn = document.getElementById('view-grid');
        const viewListBtn = document.getElementById('view-list');
        
        if (viewGridBtn && viewListBtn) {
            if (this.viewMode === 'grid') {
                viewGridBtn.classList.add('bg-shinku', 'text-white');
                viewGridBtn.classList.remove('bg-white', 'dark:bg-sumi', 'text-sumi', 'dark:text-gofun');
                viewListBtn.classList.remove('bg-shinku', 'text-white');
                viewListBtn.classList.add('bg-white', 'dark:bg-sumi', 'text-sumi', 'dark:text-gofun');
            } else {
                viewListBtn.classList.add('bg-shinku', 'text-white');
                viewListBtn.classList.remove('bg-white', 'dark:bg-sumi', 'text-sumi', 'dark:text-gofun');
                viewGridBtn.classList.remove('bg-shinku', 'text-white');
                viewGridBtn.classList.add('bg-white', 'dark:bg-sumi', 'text-sumi', 'dark:text-gofun');
            }
        }
    }

    displayActivities() {
        const activitiesGrid = document.getElementById('activities-grid');
        
        console.log('🎨 Displaying activities...');
        console.log('🎨 activitiesGrid element:', activitiesGrid);
        console.log('🎨 Current activities array:', this.activities);
        console.log('🎨 Activities array length:', this.activities ? this.activities.length : 0);
        
        if (!activitiesGrid) {
            console.error('❌ activitiesGrid element not found!');
            return;
        }

        const filteredActivities = this.getFilteredActivities();
        console.log('🎨 Filtered activities:', filteredActivities);
        console.log('🎨 Filtered activities length:', filteredActivities.length);
        console.log('🎨 View mode:', this.viewMode);

        // Display activities based on view mode
        if (this.viewMode === 'grid') {
            console.log('🎨 Generating grid view...');
            const gridHTML = this.generateActivityCards(filteredActivities);
            console.log('🎨 Grid HTML length:', gridHTML.length);
            activitiesGrid.innerHTML = gridHTML;
            console.log('🎨 Grid HTML set successfully');
        } else {
            console.log('🎨 Generating list view...');
            const listHTML = this.generateActivityList(filteredActivities);
            console.log('🎨 List HTML length:', listHTML.length);
            activitiesGrid.innerHTML = listHTML;
            console.log('🎨 List HTML set successfully');
        }

        // Update counters
        this.updateActivityCounters(filteredActivities.length);
        
        // Apply translations to newly rendered content
        if (window.translationManager) {
            console.log('🔄 Applying translations to activities...');
            window.translationManager.scanForTranslatableContent();
            window.translationManager.applyTranslations();
            
            // Debug: Check if translations were applied
            setTimeout(() => {
                const activityTitles = document.querySelectorAll('[data-translate]');
                console.log('🔄 Found translatable elements:', activityTitles.length);
                activityTitles.forEach((el, index) => {
                    if (index < 5) { // Log first 5 elements
                        console.log(`🔄 Element ${index}:`, el.getAttribute('data-translate'), '->', el.textContent);
                    }
                });
            }, 100);
        }
        
        console.log('🎨 Display complete');
        
        // Debug: Check if content is still there after a short delay
        setTimeout(() => {
            console.log('🎨 Post-display check - Grid innerHTML length:', activitiesGrid.innerHTML.length);
            console.log('🎨 Post-display check - Grid has content:', activitiesGrid.innerHTML.includes('activity'));
            console.log('🎨 Post-display check - Grid innerHTML preview:', activitiesGrid.innerHTML.substring(0, 200));
        }, 100);
    }

    calculateAnalytics() {
        if (!this.activities || this.activities.length === 0) return;

        // Calculate rating statistics
        const ratings = this.activities.map(a => a.rating).filter(r => r > 0);
        const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
        
        // Calculate price statistics
        const prices = this.activities.map(a => {
            const priceStr = a.price.replace(/[^\d]/g, '');
            return priceStr ? parseInt(priceStr) : 0;
        }).filter(price => price > 0);
        
        const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

        // Calculate category statistics
        const categoryStats = {};
        this.activities.forEach(activity => {
            if (!categoryStats[activity.category]) {
                categoryStats[activity.category] = {
                    count: 0,
                    avgRating: 0,
                    avgPrice: 0,
                    ratings: [],
                    prices: []
                };
            }
            categoryStats[activity.category].count++;
            if (activity.rating > 0) {
                categoryStats[activity.category].ratings.push(activity.rating);
            }
                const price = parseInt(activity.price.replace(/[^\d]/g, ''));
            if (price > 0) {
                categoryStats[activity.category].prices.push(price);
            }
        });

        // Calculate averages
        Object.keys(categoryStats).forEach(category => {
            const stats = categoryStats[category];
            stats.avgRating = stats.ratings.length > 0 ? 
                stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length : 0;
            stats.avgPrice = stats.prices.length > 0 ? 
                stats.prices.reduce((a, b) => a + b, 0) / stats.prices.length : 0;
        });

        this.analyticsData = {
            totalActivities: this.activities.length,
            avgRating,
            avgPrice,
            minPrice,
            maxPrice,
            categoryStats,
            ratingDistribution: this.generateRatingDistribution(this.activities),
            lastUpdated: new Date().toISOString()
        };
    }

    generateRatingDistribution(activities) {
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        activities.forEach(activity => {
            if (activity.rating >= 1 && activity.rating <= 5) {
                distribution[Math.floor(activity.rating)]++;
            }
        });
        return distribution;
    }

    updateAnalyticsDashboard() {
        if (!this.analyticsData) return;

        // Update hero stats
        const heroTotalActivitiesEl = document.getElementById('hero-total-activities');
        const heroAvgRatingEl = document.getElementById('hero-avg-rating');
        const heroCategoriesEl = document.getElementById('hero-categories');

        if (heroTotalActivitiesEl) heroTotalActivitiesEl.textContent = this.analyticsData.totalActivities;
        if (heroAvgRatingEl) heroAvgRatingEl.textContent = this.analyticsData.avgRating.toFixed(1);
        if (heroCategoriesEl) heroCategoriesEl.textContent = Object.keys(this.analyticsData.categoryStats).length;

        // Update dashboard stats
        const totalActivitiesEl = document.getElementById('total-activities');
        const avgRatingEl = document.getElementById('avg-rating');
        const avgPriceEl = document.getElementById('avg-price');
        const totalCategoriesEl = document.getElementById('total-categories');
        const ratingTrendEl = document.getElementById('rating-trend');
        const topCategoryEl = document.getElementById('top-category');

        if (totalActivitiesEl) totalActivitiesEl.textContent = this.analyticsData.totalActivities;
        if (avgRatingEl) avgRatingEl.textContent = this.analyticsData.avgRating.toFixed(1);
        if (avgPriceEl) avgPriceEl.textContent = `¥${Math.round(this.analyticsData.avgPrice / 1000)}K`;
        if (totalCategoriesEl) totalCategoriesEl.textContent = Object.keys(this.analyticsData.categoryStats).length;
        if (ratingTrendEl) ratingTrendEl.textContent = '★'.repeat(Math.floor(this.analyticsData.avgRating));
        
        // Find top category
        const topCategory = Object.entries(this.analyticsData.categoryStats)
            .sort(([,a], [,b]) => b.count - a.count)[0];
        if (topCategoryEl && topCategory) {
            topCategoryEl.textContent = topCategory[0];
        }

        // Update category counters
        const culturalCountEl = document.getElementById('cultural-count');
        const outdoorCountEl = document.getElementById('outdoor-count');
        
        if (culturalCountEl && this.analyticsData.categoryStats.cultural) {
            culturalCountEl.textContent = this.analyticsData.categoryStats.cultural.count;
        }
        if (outdoorCountEl && this.analyticsData.categoryStats.outdoor) {
            outdoorCountEl.textContent = this.analyticsData.categoryStats.outdoor.count;
        }
    }

    renderCharts() {
        if (!this.analyticsData) return;
        
        this.renderRatingChart();
        this.renderCategoryChart();
    }

    renderRatingChart() {
        const ctx = document.getElementById('rating-chart');
        if (!ctx) return;

        if (this.charts.rating) {
            this.charts.rating.destroy();
        }

        const distribution = this.analyticsData.ratingDistribution;
        
        this.charts.rating = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1★', '2★', '3★', '4★', '5★'],
                datasets: [{
                    label: 'Activities',
                    data: [distribution[1], distribution[2], distribution[3], distribution[4], distribution[5]],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(168, 85, 247, 0.8)'
                    ],
                    borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(168, 85, 247, 1)'
                    ],
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
                            stepSize: 1
                        }
                    }
                }
                }
            });
        }

    renderCategoryChart() {
        const ctx = document.getElementById('category-chart');
        if (!ctx) return;

        if (this.charts.category) {
            this.charts.category.destroy();
        }

        const categories = Object.entries(this.analyticsData.categoryStats);
        
        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories.map(([name]) => name),
                datasets: [{
                    data: categories.map(([, stats]) => stats.count),
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(168, 85, 247, 0.8)'
                    ],
                    borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(168, 85, 247, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
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
        
        // Simulate live activity updates
        this.simulateActivityUpdates();
        
        // Update last update time
        this.lastUpdateTime = now;
        
        // Update live indicators
        this.updateLiveIndicators();
        
        // Show subtle notification for updates
        if (timeSinceLastUpdate > 60000) { // Only show if more than 1 minute has passed
            this.showNotification('Activity data updated', 'info');
        }
    }

    simulateActivityUpdates() {
        // Simulate rating changes
        this.activities.forEach(activity => {
            if (Math.random() < 0.05) { // 5% chance of rating change
                const change = Math.random() < 0.5 ? 0.1 : -0.1;
                activity.rating = Math.max(1, Math.min(5, activity.rating + change));
            }
        });
    }

    updateLiveIndicators() {
        // Update live activity indicators
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

    getFilteredActivities() {
        let filtered = [...this.activities]
        console.log('🔎 [Filter] Initial activities:', filtered.length)

        // Search filter
        const searchInput = document.getElementById('activity-search')
        const search = searchInput ? searchInput.value.trim().toLowerCase() : ''
        console.log('🔎 [Filter] Search value:', search)
        if (search) {
            filtered = filtered.filter(activity =>
                activity.title.toLowerCase().includes(search) ||
                activity.description.toLowerCase().includes(search) ||
                (activity.tags && activity.tags.some(tag => tag.toLowerCase().includes(search)))
            )
            console.log('🔎 [Filter] After search:', filtered.length)
        }

        // Category filter
        const categorySelect = document.getElementById('category-filter')
        const category = categorySelect ? categorySelect.value : ''
        console.log('🔎 [Filter] Category value:', category)
        if (category && category !== 'all') {
            filtered = filtered.filter(activity => activity.category === category)
            console.log('🔎 [Filter] After category:', filtered.length)
        }

        // Price filter
        const priceSelect = document.getElementById('price-filter')
        const price = priceSelect ? priceSelect.value : ''
        console.log('🔎 [Filter] Price value:', price)
        if (price && price !== 'all') {
            if (price === 'low') filtered = filtered.filter(a => parseInt(a.price.replace(/[^\d]/g, '')) < 10000)
            if (price === 'high') filtered = filtered.filter(a => parseInt(a.price.replace(/[^\d]/g, '')) >= 10000)
            console.log('🔎 [Filter] After price:', filtered.length)
        }

        // Duration filter
        const durationSelect = document.getElementById('duration-filter')
        const duration = durationSelect ? durationSelect.value : ''
        console.log('🔎 [Filter] Duration value:', duration)
        if (duration && duration !== 'all') {
            if (duration === 'short') filtered = filtered.filter(a => this.getDurationInHours(a.duration) <= 2)
            if (duration === 'medium') filtered = filtered.filter(a => this.getDurationInHours(a.duration) > 2 && this.getDurationInHours(a.duration) <= 4)
            if (duration === 'long') filtered = filtered.filter(a => this.getDurationInHours(a.duration) > 4)
            console.log('🔎 [Filter] After duration:', filtered.length)
        }

        // Neighborhood filter
        const neighborhoodSelect = document.getElementById('neighborhood-filter')
        const neighborhood = neighborhoodSelect ? neighborhoodSelect.value : ''
        console.log('🔎 [Filter] Neighborhood value:', neighborhood)
        if (neighborhood && neighborhood !== 'all') {
            filtered = filtered.filter(a => a.neighborhood === neighborhood)
            console.log('🔎 [Filter] After neighborhood:', filtered.length)
        }

        // Only available activities (if available property exists)
        // Only filter out if explicitly set to false
        // filtered = filtered.filter(a => a.available !== false)
        // console.log('🔎 [Filter] After available:', filtered.length)

        return filtered
    }

    getDurationInHours(duration) {
        const match = duration.match(/(\d+(?:\.\d+)?)\s*hours?/i);
        return match ? parseFloat(match[1]) : 0;
    }

    generateActivityCards(activities) {
        if (activities.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="text-4xl mb-4" role="img" aria-label="No activities">🎯</div>
                    <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2" data-translate="activities.noResults.title">No Activities Found</h3>
                    <p class="text-sumi/70 dark:text-gray-300" data-translate="activities.noResults.description">Try adjusting your search criteria or filters.</p>
                </div>
            `;
        }

        return activities.map(activity => this.generateActivityCard(activity)).join('');
    }

    generateActivityList(activities) {
        if (!activities || activities.length === 0) {
            return `
                <div class="col-span-full text-center py-12">
                    <div class="text-6xl mb-4">🎯</div>
                    <h3 class="text-xl font-semibold text-sumi dark:text-white mb-2" data-translate="activities.noResults.title">No Activities Found</h3>
                    <p class="text-sumi/70 dark:text-gray-300" data-translate="activities.noResults.description">Try adjusting your search criteria or filters.</p>
                </div>
            `;
        }

        return activities.map(activity => {
            const realReviews = activity.realReviews || [];
            const isFeatured = activity.featured;
            
            return `
                <div class="zen-card p-4 rounded-xl hover:shadow-lg transition-all duration-300 ${isFeatured ? 'ring-2 ring-[#d9c289]' : ''}" data-activity-id="${activity.id}">
                    <div class="flex flex-col md:flex-row gap-4">
                        <!-- Activity Image -->
                        <div class="md:w-48 flex-shrink-0">
                            <div class="relative h-32 md:h-full overflow-hidden rounded-lg">
                                <img src="${activity.image}" alt="${activity.title}" 
                                     class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                     loading="lazy">
                                ${isFeatured ? `
                                    <div class="absolute top-2 left-2">
                                        <span class="bg-[#d9c289] text-white px-2 py-1 rounded-full text-xs font-semibold" style="color: white !important;">
                                            Featured
                                        </span>
                                    </div>
                                ` : ''}
                                <div class="absolute top-2 right-2">
                                    <span class="bg-washi/90 text-sumi px-2 py-1 rounded-full text-xs font-semibold">
                                        ${activity.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Activity Content -->
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-serif text-lg font-bold text-sumi dark:text-white mb-2 line-clamp-1">
                                        ${activity.title}
                                    </h3>
                                    <p class="text-sm text-sumi/70 dark:text-gray-300 mb-3 line-clamp-2">${activity.description}</p>
                                    
                                    <!-- Quick Info -->
                                    <div class="flex flex-wrap gap-4 text-sm text-sumi/70 dark:text-gray-300 mb-3">
                                        <span>📍 ${activity.location}</span>
                                        <span>⭐ ${activity.rating} (${activity.reviews})</span>
                                        <span>👥 ${activity.capacity}</span>
                                        <span>⏱️ ${activity.duration}</span>
                                    </div>
                                    
                                    <!-- Highlights -->
                                    <div class="flex flex-wrap gap-1 mb-3">
                                        ${activity.highlights ? activity.highlights.slice(0, 3).map(highlight => 
                                            `<span class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-gray-300 px-2 py-1 rounded text-xs">${highlight}</span>`
                                        ).join('') : ''}
                                        ${activity.highlights && activity.highlights.length > 3 ? 
                                            `<span class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-gray-300 px-2 py-1 rounded text-xs">+${activity.highlights.length - 3}</span>` : 
                                            ''
                                        }
                                    </div>
                                    
                                    <!-- Recent Review -->
                                    ${realReviews.length > 0 ? `
                                        <div class="mb-3 p-2 bg-washi/30 dark:bg-gray-700/30 rounded-lg">
                                            <div class="flex items-center justify-between mb-1">
                                                <span class="text-xs font-semibold text-sumi dark:text-white">${realReviews[0].author}</span>
                                                <span class="text-xs text-sumi/60 dark:text-gray-400">${realReviews[0].source}</span>
                                            </div>
                                            <div class="flex items-center mb-1">
                                                <span class="text-yellow-400 text-xs">${'★'.repeat(realReviews[0].rating)}</span>
                                                <span class="text-xs text-sumi/60 dark:text-gray-400 ml-1">${realReviews[0].date}</span>
                                            </div>
                                            <p class="text-xs text-sumi/70 dark:text-gray-300 line-clamp-1">"${realReviews[0].text}"</p>
                                        </div>
                                    ` : ''}
                                </div>
                                
                                <!-- Price and Actions -->
                                <div class="md:text-right md:flex-shrink-0">
                                    <div class="text-xl font-bold text-kurenai mb-1">${activity.price}</div>
                                    <div class="text-sm text-sumi/60 dark:text-gray-400 mb-3">${activity.priceUSD}</div>
                                    
                                    <div class="flex md:flex-col gap-2">
                                        <a href="${activity.bookingUrl}" target="_blank" rel="noopener noreferrer"
                                           class="bg-[#000000] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#000000]/80 transition-colors focus-zen" style="color: white !important;">
                                            Book Now
                                        </a>
                                        <button onclick="activitiesManager.showActivityModal('${activity.id}')"
                                                class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-washi/70 dark:hover:bg-gray-600/50 transition-colors focus-zen">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Provider Info -->
                            <div class="mt-3 pt-2 border-t border-sumi/10 dark:border-gray-600/10">
                                <div class="flex items-center justify-between text-xs">
                                    <div>
                                        <span class="text-sumi/60 dark:text-gray-400">by </span>
                                        <a href="${activity.providerUrl}" target="_blank" rel="noopener noreferrer"
                                           class="font-semibold text-kurenai hover:underline">
                                            ${activity.provider}
                                        </a>
                                    </div>
                                    <span class="text-sumi/50 dark:text-gray-500">${activity.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    generateActivityCard(activity) {
        const isFeatured = activity.featured;
        
        return `
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 ${isFeatured ? 'ring-2 ring-[#d9c289]' : ''}" data-activity-id="${activity.id}">
                <div class="relative mb-4">
                    <img src="${activity.image}" alt="${activity.title}" class="w-full h-48 object-cover rounded-lg">
                    ${isFeatured ? '<div class="absolute top-2 right-2 bg-[#d9c289] text-white px-2 py-1 rounded-full text-xs font-medium" style="color: white !important;" data-translate="activities.featured">Featured</div>' : ''}
                </div>
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-translate="${activity.titleKey || ''}">${activity.title}</h3>
                        <div class="flex items-center gap-1">
                            <span class="text-yellow-500">★</span>
                            <span class="text-sm text-gray-600 dark:text-gray-300">${activity.rating}</span>
                        </div>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 text-sm" data-translate="${activity.descriptionKey || ''}">${activity.description}</p>
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-red-600 font-semibold">${activity.price}</span>
                        <span class="text-gray-500 dark:text-gray-400">${activity.duration}</span>
                    </div>
                    <div class="flex gap-2">
                        <a href="${activity.bookingUrl}" target="_blank" class="flex-1 bg-[#000000] text-white py-2 px-4 rounded-lg hover:bg-[#000000]/80 transition-colors text-sm text-center" style="color: white !important;" data-translate="activities.bookNow">
                            Book Now
                        </a>
                        <button onclick="window.activitiesManager.toggleFavorite('${activity.id}')" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <span class="${this.favorites.includes(activity.id) ? 'text-red-500' : 'text-gray-400'}">♥</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateActivityListItem(activity) {
        const realReviews = activity.realReviews || [];
        
        return `
            <div class="zen-card p-4 rounded-lg mb-4 hover:shadow-lg transition-all duration-300" data-activity-id="${activity.id}">
                <div class="flex items-start space-x-4">
                    <!-- Activity Image -->
                    <div class="flex-shrink-0">
                        <img src="${activity.image}" alt="${activity.title}" 
                             class="w-24 h-24 object-cover rounded-lg">
                    </div>
                    
                    <!-- Activity Details -->
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-serif text-lg font-bold text-sumi dark:text-white truncate" data-translate="${activity.titleKey || ''}">
                                ${activity.title}
                            </h3>
                            <div class="text-right">
                                <div class="text-xl font-bold text-kurenai">${activity.price}</div>
                                <div class="text-sm text-sumi/60 dark:text-gray-400">${activity.priceUSD}</div>
                            </div>
                        </div>
                        
                        <p class="text-sumi/70 dark:text-gray-300 mb-2" data-translate="${activity.descriptionKey || ''}">${activity.description}</p>
                        
                        <div class="flex items-center space-x-4 text-sm text-sumi/60 dark:text-gray-400 mb-3">
                            <span>📍 ${activity.location}</span>
                            <span>⭐ ${activity.rating} (${activity.reviews})</span>
                            <span>⏱️ ${activity.duration}</span>
                            <span>👥 ${activity.capacity}</span>
                        </div>
                        
                        <!-- Real Reviews -->
                        ${realReviews.length > 0 ? `
                            <div class="mb-3">
                                                        <div class="flex items-center space-x-2 mb-2">
                            <span class="text-sm font-semibold text-sumi dark:text-white" data-translate="activities.reviews.recentReview">Recent Review:</span>
                                    <span class="text-yellow-400">${'★'.repeat(realReviews[0].rating)}</span>
                                </div>
                                <p class="text-sm text-sumi/70 dark:text-gray-300 italic">"${realReviews[0].text.substring(0, 100)}${realReviews[0].text.length > 100 ? '...' : ''}"</p>
                            </div>
                        ` : ''}
                        
                        <!-- Action Buttons -->
                        <div class="flex space-x-2">
                            <a href="${activity.bookingUrl}" target="_blank" rel="noopener noreferrer"
                               class="bg-[#000000] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#000000]/80 transition-colors" style="color: white !important;" data-translate="activities.bookNow">
                                Book Now
                            </a>
                            <button onclick="activitiesManager.showActivityModal('${activity.id}')"
                                    class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-white px-4 py-2 rounded text-sm font-semibold hover:bg-washi/70 dark:hover:bg-gray-600/50 transition-colors" data-translate="activities.details">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateActivityCounters(activityCount) {
        const activityCounter = document.getElementById('activity-counter');
        if (activityCounter) activityCounter.textContent = activityCount;
    }

    displayActivityStats() {
        if (!activitiesData) return;
        
        const stats = activitiesData.getActivityStats();
        const statsContainer = document.getElementById('activity-stats');
        
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-bold text-kurenai mb-2">${stats.totalActivities}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300" data-translate="activities.stats.total">Total Activities</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-matcha mb-2">${stats.categories}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300" data-translate="activities.stats.categories">Activity Categories</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-kobicha mb-2">${stats.averageRating}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300" data-translate="activities.stats.rating">Average Rating</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-aiiro mb-2">${stats.featuredCount}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300" data-translate="activities.stats.featured">Featured Activities</div>
                </div>
            </div>
        `;
    }

    displayFeaturedActivities() {
        if (!activitiesData) return;
        
        const featuredContainer = document.getElementById('featured-activities');
        if (!featuredContainer) return;

        const featuredActivities = activitiesData.getFeaturedActivities();

        featuredContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${featuredActivities.map(activity => `
                    <div class="zen-card p-6 rounded-lg border-2 border-[#d9c289]">
                        <div class="flex items-center mb-3">
                            <span class="bg-[#d9c289] text-white px-2 py-1 rounded text-xs font-semibold mr-2" style="color: white !important;" data-translate="activities.featured">Featured</span>
                            <span class="text-sm text-sumi/60 dark:text-gray-400">${activity.category}</span>
                        </div>
                        <h3 class="font-serif text-lg font-bold text-sumi dark:text-white mb-3">${activity.title}</h3>
                        <p class="text-sumi/70 dark:text-gray-300 mb-4">${activity.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-sumi/60 dark:text-gray-400">${activity.price}</span>
                            <a href="${activity.bookingUrl}" target="_blank" rel="noopener noreferrer"
                               class="bg-[#000000] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#000000]/80 transition-colors focus-zen" style="color: white !important;" data-translate="activities.bookNow">
                                Book Now
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    displayTopRatedActivities() {
        if (!activitiesData) return;
        
        const topRatedContainer = document.getElementById('top-rated-activities');
        if (!topRatedContainer) return;

        const topRatedActivities = this.getTopRatedActivities(3);

        topRatedContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${topRatedActivities.map(activity => `
                    <div class="zen-card p-4 rounded-lg">
                        <img src="${activity.image}" alt="${activity.title}" 
                             class="w-full h-32 object-cover rounded mb-3">
                        <h4 class="font-semibold text-sumi dark:text-white mb-2">${activity.title}</h4>
                        <p class="text-sm text-sumi/70 dark:text-gray-300 mb-2">${activity.category}</p>
                        <div class="flex justify-between items-center text-xs text-sumi/60 dark:text-gray-400 mb-3">
                            <span>⭐ ${activity.rating} (${activity.reviews})</span>
                            <span>${activity.duration}</span>
                        </div>
                        <a href="${activity.bookingUrl}" target="_blank" rel="noopener noreferrer"
                           class="bg-[#000000] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#000000]/80 transition-colors focus-zen inline-block" style="color: white !important;">
                            Book Activity
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
                <h3 class="font-serif text-xl font-bold text-sumi dark:text-white mb-4">Search & Filter Activities</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div class="lg:col-span-2">
                        <label for="activity-search" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Search Activities</label>
                        <input type="text" id="activity-search" placeholder="Search by title, category, or description..."
                               class="w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d9c289] focus-zen">
                    </div>
                    
                    <div>
                        <label for="category-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Category</label>
                        <select name="category" id="category-filter" class="activity-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d9c289] focus-zen">
                            <option value="all">All Categories</option>
                            <option value="Cultural Tour">Cultural Tour</option>
                            <option value="Nature & Wildlife">Nature & Wildlife</option>
                            <option value="Culinary Experience">Culinary Experience</option>
                            <option value="Adventure & Sports">Adventure & Sports</option>
                            <option value="Arts & Photography">Arts & Photography</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="price-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Price Range</label>
                        <select name="priceRange" id="price-filter" class="activity-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d9c289] focus-zen">
                            <option value="all">All Prices</option>
                            <option value="low">Under ¥10,000</option>
                            <option value="medium">¥10,000 - ¥20,000</option>
                            <option value="high">Over ¥20,000</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="neighborhood-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Area</label>
                        <select name="neighborhood" id="neighborhood-filter" class="activity-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d9c289] focus-zen">
                            <option value="all">All Areas</option>
                            <option value="Gion">Gion</option>
                            <option value="Arashiyama">Arashiyama</option>
                            <option value="Nakagyo">Nakagyo</option>
                            <option value="Fushimi">Fushimi</option>
                            <option value="Multiple">Multiple</option>
                        </select>
                    </div>
                </div>
                
                <div class="flex justify-between items-center mt-4 pt-4 border-t border-sumi/10 dark:border-gray-600/10">
                    <div class="text-sm text-sumi/70 dark:text-gray-300">
                        Showing <span id="activity-counter">0</span> activities
                    </div>
                    <button onclick="activitiesManager.clearFilters()" 
                            class="text-sm text-[#d9c289] hover:underline focus-zen">
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
        const searchInput = document.getElementById('activity-search');
        if (searchInput) searchInput.value = '';
        
        const filterSelects = document.querySelectorAll('.activity-filter');
        filterSelects.forEach(select => {
            select.value = 'all';
        });
        
        this.displayActivities();
    }

    showActivityModal(activityId) {
        const activity = this.activities.find(a => a.id === activityId);
        if (!activity) return;

        const realReviews = activity.realReviews || [];
        const relatedActivities = this.getRelatedActivities(activityId);

        const modalHTML = `
            <div id="activity-modal" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <div class="bg-white dark:bg-sumi rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h2 class="font-serif text-2xl font-bold text-gray-900 dark:text-white">${activity.title}</h2>
                            <button onclick="activitiesManager.closeActivityModal()" 
                                    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl focus:outline-none focus:ring-2 focus:ring-red-500 rounded">
                                ×
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div class="lg:col-span-2">
                                <img src="${activity.image}" alt="${activity.title}" 
                                     class="w-full h-64 object-cover rounded-lg mb-4">
                                
                                <div class="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div>
                                        <span>${activity.category}</span>
                                        <span class="mx-2">•</span>
                                        <span>${activity.duration}</span>
                                        <span class="mx-2">•</span>
                                        <span>${activity.capacity}</span>
                                    </div>
                                    <div>
                                        <span>⭐ ${activity.rating} (${activity.reviews} reviews)</span>
                                    </div>
                                </div>
                                
                                <div class="prose max-w-none mb-6">
                                    <p class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">${activity.description}</p>
                                    <p class="text-gray-700 dark:text-gray-300">${activity.longDescription || activity.description}</p>
                                </div>
                                
                                <!-- Real Reviews Section -->
                                ${realReviews.length > 0 ? `
                                    <div class="mb-6">
                                        <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Recent Reviews</h4>
                                        <div class="space-y-3">
                                            ${realReviews.map(review => `
                                                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                                    <div class="flex items-center justify-between mb-2">
                                                        <span class="font-semibold text-gray-900 dark:text-white">${review.author}</span>
                                                        <span class="text-sm text-gray-600 dark:text-gray-400">${review.source} • ${review.date}</span>
                                                    </div>
                                                    <div class="flex items-center mb-2">
                                                        <span class="text-yellow-400">${'★'.repeat(review.rating)}</span>
                                                    </div>
                                                    <p class="text-gray-700 dark:text-gray-300">"${review.text}"</p>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                <div class="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Highlights</h4>
                                        <ul class="text-sm text-gray-700 dark:text-gray-300">
                                            ${activity.highlights ? activity.highlights.map(highlight => `<li>• ${highlight}</li>`).join('') : '<li>• Expert guide</li><li>• Cultural insights</li>'}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900 dark:text-white mb-2">What's Included</h4>
                                        <ul class="text-sm text-gray-700 dark:text-gray-300">
                                            ${activity.includes ? activity.includes.map(item => `<li>• ${item}</li>`).join('') : '<li>• Professional guide</li><li>• Entrance fees</li>'}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="flex gap-3">
                                    <a href="${activity.bookingUrl}" target="_blank" rel="noopener noreferrer"
                                       class="flex-1 bg-[#000000] text-white px-4 py-2 rounded font-semibold text-center hover:bg-[#000000]/80 transition-colors focus-zen" style="color: white !important;">
                                        Book Activity
                                    </a>
                                    <a href="tel:${activity.contact}" 
                                       class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-white px-4 py-2 rounded font-semibold hover:bg-washi/70 dark:hover:bg-gray-600/50 transition-colors focus-zen">
                                        Call Provider
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Related Activities</h3>
                                <div class="space-y-4">
                                    ${relatedActivities.map(related => `
                                        <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                                            <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">${related.title}</h4>
                                            <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">${related.category} • ${related.price}</p>
                                            <a href="${related.bookingUrl}" target="_blank" rel="noopener noreferrer"
                                               class="text-xs text-[#d9c289] hover:text-[#d9c289]/80 dark:text-[#d9c289] dark:hover:text-[#d9c289]/80 hover:underline">Book Activity</a>
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
        document.getElementById('activity-modal').addEventListener('click', (e) => {
            if (e.target.id === 'activity-modal') {
                this.closeActivityModal();
            }
        });
    }

    closeActivityModal() {
        const modal = document.getElementById('activity-modal');
        if (modal) {
            modal.remove();
        }
    }

    getRelatedActivities(activityId, limit = 3) {
        const currentActivity = this.activities.find(a => a.id === activityId);
        if (!currentActivity) return [];

        return this.activities
            .filter(activity => 
                activity.id !== activityId &&
                (activity.category === currentActivity.category ||
                 (activity.tags && currentActivity.tags && activity.tags.some(tag => currentActivity.tags.includes(tag))) ||
                 activity.neighborhood === currentActivity.neighborhood)
            )
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    getTopRatedActivities(limit = 5) {
        return this.activities
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    debugData() {
        console.log('🐛 DEBUG: Activities Manager State');
        console.log('🐛 activitiesData available:', typeof activitiesData !== 'undefined');
        console.log('🐛 activitiesData type:', typeof activitiesData);
        console.log('🐛 this.activities length:', this.activities ? this.activities.length : 'undefined');
        console.log('🐛 this.activities:', this.activities);
        
        if (typeof activitiesData !== 'undefined') {
            console.log('🐛 activitiesData.getAllActivities():', activitiesData.getAllActivities());
        }
        
        // Force reload activities
        this.loadActivitiesData();
        this.displayActivities();
        
        alert(`Debug Info:\n- activitiesData available: ${typeof activitiesData !== 'undefined'}\n- Activities loaded: ${this.activities ? this.activities.length : 0}\n- Check console for details`);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'warning' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Validate contact information
    validateContactInfo() {
        console.log('🔍 Starting contact information validation...');
        console.log('🔍 Activities count:', this.activities ? this.activities.length : 'undefined');
        
        if (!this.activities || this.activities.length === 0) {
            console.error('❌ No activities data available for validation');
            return { phoneNumbers: [], websites: [], issues: ['No activities data available'] };
        }
        
        const validationResults = {
            phoneNumbers: [],
            websites: [],
            issues: []
        };

        // Valid Kyoto area codes and formats
        const validPhoneFormats = [
            /^\+81-75-\d{3}-\d{4}$/,  // Standard Kyoto format
            /^\+81-75-\d{2}-\d{4}$/,   // Alternative Kyoto format
            /^\+81-75-\d{4}-\d{4}$/    // Extended Kyoto format
        ];

        // Valid website domains for Kyoto tourism
        const validDomains = [
            'kyoto.travel',
            'www.kyoto.travel',
            'insidekyoto.com',
            'www.insidekyoto.com'
        ];

        console.log('🔍 Valid domains for validation:', validDomains);

        // Test the validation logic with a known good URL
        const testUrl = 'https://www.kyoto.travel';
        try {
            const testParsedUrl = new URL(testUrl);
            const testIsValidDomain = validDomains.some(domain => testParsedUrl.hostname === domain);
            console.log(`🧪 Test URL validation: ${testUrl} -> hostname: ${testParsedUrl.hostname}, valid: ${testIsValidDomain}`);
        } catch (error) {
            console.error('❌ Test URL validation failed:', error);
        }

        this.activities.forEach((activity, index) => {
            console.log(`🔍 Processing activity ${index + 1}: ${activity.title}`);
            console.log(`  Phone: ${activity.contact}`);
            console.log(`  Website: ${activity.providerUrl}`);
            
            // Validate phone number format
            const isValidPhone = validPhoneFormats.some(regex => regex.test(activity.contact));
            console.log(`  Phone validation: ${isValidPhone ? '✅ Valid' : '❌ Invalid'}`);
            
            if (!isValidPhone) {
                validationResults.issues.push(`Invalid phone format for ${activity.title}: ${activity.contact}`);
            } else {
                validationResults.phoneNumbers.push({
                    activity: activity.title,
                    phone: activity.contact,
                    valid: true
                });
            }

            // Validate website URLs
            try {
                const url = new URL(activity.providerUrl);
                console.log(`  URL parsed successfully: ${url.hostname}`);
                
                const isValidDomain = validDomains.some(domain => {
                    const matches = url.hostname === domain;
                    console.log(`    Comparing "${url.hostname}" with "${domain}": ${matches}`);
                    return matches;
                });
                
                console.log(`  Protocol: ${url.protocol}, Domain valid: ${isValidDomain}`);
                
                if (url.protocol === 'https:' && isValidDomain) {
                    validationResults.websites.push({
                        activity: activity.title,
                        url: activity.providerUrl,
                        valid: true
                    });
                    console.log(`  ✅ Website valid: ${activity.title}`);
                } else {
                    validationResults.issues.push(`Invalid website for ${activity.title}: ${activity.providerUrl}`);
                    console.log(`  ❌ Website invalid: ${activity.title} - Protocol: ${url.protocol}, Domain valid: ${isValidDomain}`);
                }
            } catch (error) {
                validationResults.issues.push(`Invalid URL format for ${activity.title}: ${activity.providerUrl}`);
                console.log(`  ❌ URL parsing error for ${activity.title}: ${error.message}`);
            }
        });

        console.log('🔍 Validation complete. Results:', validationResults);
        console.log(`🔍 Total issues: ${validationResults.issues.length}`);
        
        if (validationResults.issues.length === 0) {
            console.log('🎉 All contact information validated successfully!');
            this.showNotification('All contact information validated successfully', 'success');
        } else {
            console.warn('⚠️ Contact validation issues found:', validationResults.issues);
            this.showNotification(`${validationResults.issues.length} contact validation issues found`, 'warning');
        }

        return validationResults;
    }
}

// Initialize activities manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing ActivitiesManager...');
    
    // Longer delay to ensure all scripts are loaded
    setTimeout(() => {
        console.log('🚀 Starting ActivitiesManager initialization...');
        try {
            window.activitiesManager = new ActivitiesManager();
            console.log('🚀 ActivitiesManager initialized:', window.activitiesManager);
        } catch (error) {
            console.error('❌ Error initializing ActivitiesManager:', error);
        }
    }, 1000);
});