// Enhanced News Page Manager for MrKyoto.com
// Handles news articles, search, filtering, and interactive features

class NewsManager {
    constructor() {
        this.currentFilters = {
            category: 'all',
            date: 'all',
            sort: 'latest'
        };
        this.searchQuery = '';
        this.viewMode = localStorage.getItem('newsViewMode') || 'grid';
        this.favorites = JSON.parse(localStorage.getItem('favoriteArticles') || '[]');
        this.savedSearches = JSON.parse(localStorage.getItem('savedNewsSearches') || '[]');
        this.charts = {};
        this.analyticsData = null;
        this.liveDataInterval = null;
        this.lastUpdateTime = new Date();
        this.init();
    }

    async init() {
        try {
            console.log('📰 NewsManager: Starting initialization...');
            
            // Show loading state immediately
            const newsLoading = document.getElementById('news-loading');
            if (newsLoading) {
                newsLoading.classList.remove('hidden');
            }
            
            await this.loadNewsData();
            this.setupEventListeners();
            this.calculateAnalytics();
            this.updateAnalyticsDashboard();
            this.renderCharts();
            this.displayNews();
            
            // Initialize advanced features
            this.startLiveDataStream();
            
            console.log('📰 NewsManager: Initialization complete');
        } catch (error) {
            console.error('📰 NewsManager init error:', error);
            // Fallback: try to display at least some content
            this.displayFallbackContent();
        }
    }

    async loadNewsData() {
        console.log('📰 NewsManager: Loading news data...');
        
        // Wait for newsData to be initialized
        if (typeof newsData === 'undefined') {
            console.log('📰 NewsManager: Waiting for newsData to be available...');
            await new Promise(resolve => {
                const checkNewsData = () => {
                    if (typeof newsData !== 'undefined') {
                        console.log('📰 NewsManager: newsData is now available');
                        resolve();
                    } else {
                        setTimeout(checkNewsData, 100);
                    }
                };
                checkNewsData();
            });
        }
        
        // Wait for initial data to be loaded
        if (newsData.newsArticles.length === 0) {
            console.log('📰 NewsManager: Waiting for news data to be fetched...');
            await newsData.fetchNewsFromMultipleSources();
        }
        
        console.log(`📰 NewsManager: Loaded ${newsData.newsArticles.length} articles from newsData`);
        console.log('📰 NewsManager: Sample articles:', newsData.newsArticles.slice(0, 2).map(a => a.title));
        
        // Force fallback data if no articles loaded
        if (newsData.newsArticles.length === 0) {
            console.log('📰 NewsManager: No articles loaded, forcing fallback data...');
            newsData.loadFallbackData();
            console.log(`📰 NewsManager: Fallback data loaded: ${newsData.newsArticles.length} articles`);
        }
        
        // Ensure we have at least 20 articles
        if (newsData.newsArticles.length < 20) {
            console.log('📰 NewsManager: Less than 20 articles, loading fallback data...');
            newsData.loadFallbackData();
        }
        
        this.displayNews();
        this.displayNewsStats();
        this.displayTrendingArticles();
        this.displayFeaturedNews();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('news-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.displayNews();
            });
        }

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.displayNews();
            });
        }

        // Sort filter
        const sortFilter = document.getElementById('sort-filter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentFilters.sort = e.target.value;
                this.displayNews();
            });
        }

        // Clear filters
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // View toggle
        const gridViewBtn = document.getElementById('grid-view');
        const listViewBtn = document.getElementById('list-view');
        
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => {
                this.setViewMode('grid');
            });
        }
        
        if (listViewBtn) {
            listViewBtn.addEventListener('click', () => {
                this.setViewMode('list');
            });
        }

        // Listen for news updates
        window.addEventListener('newsUpdated', (event) => {
            console.log('📰 NewsManager: Received news update event');
                this.displayNews();
            this.displayNewsStats();
            this.updateAnalyticsDashboard();
        });
    }

    displayNews() {
        const newsGrid = document.getElementById('news-grid');
        const newsLoading = document.getElementById('news-loading');
        const newsEmpty = document.getElementById('news-empty');
        
        if (!newsGrid) return;
        
        // Hide loading, show grid
        if (newsLoading) newsLoading.classList.add('hidden');
        newsGrid.classList.remove('hidden');
        
        const filteredNews = this.getFilteredNews();
        
        if (filteredNews.length === 0) {
            newsGrid.classList.add('hidden');
            if (newsEmpty) newsEmpty.classList.remove('hidden');
            return;
        }

        if (newsEmpty) newsEmpty.classList.add('hidden');
        
        // Generate news cards
        const newsCards = this.generateNewsCards(filteredNews);
        newsGrid.innerHTML = newsCards;

        // Update counters
        this.updateNewsCounters(filteredNews.length);
    }

    getFilteredNews() {
        let articles = newsData.getAllNews();
        
        // Apply search filter
        if (this.searchQuery) {
            articles = newsData.searchNews(this.searchQuery);
        }
        
        // Apply category filter
        if (this.currentFilters.category !== 'all') {
            articles = articles.filter(article => article.category === this.currentFilters.category);
        }
        
        // Apply sort
        switch (this.currentFilters.sort) {
            case 'latest':
                articles.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                articles.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'popular':
                // Simple popularity based on category frequency
                const categoryCounts = {};
                articles.forEach(article => {
                    categoryCounts[article.category] = (categoryCounts[article.category] || 0) + 1;
                });
                articles.sort((a, b) => {
                    const aScore = categoryCounts[a.category] || 0;
                    const bScore = categoryCounts[b.category] || 0;
                    return bScore - aScore;
                });
                break;
        }
        
        return articles;
    }

    generateNewsCards(articles) {
        if (this.viewMode === 'list') {
            return this.generateSimpleCards(articles);
        }
        return this.generateGridCards(articles);
    }

    generateGridCards(articles) {
        return articles.map(article => this.generateNewsCard(article)).join('');
    }

    generateSimpleCards(articles) {
        return articles.map(article => `
            <div class="bg-white dark:bg-sumi rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div class="flex items-start space-x-4">
                    <img src="${article.image}" alt="${article.title}" class="w-24 h-24 object-cover rounded-lg">
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-sumi dark:text-gofun mb-2">
                            <a href="${article.url}" target="_blank" class="hover:text-shinku transition-colors">
                                ${article.title}
                            </a>
                        </h3>
                        <p class="text-sm text-sumi/70 dark:text-gofun/70 mb-3 line-clamp-2">
                            ${article.content}
                        </p>
                        <div class="flex items-center justify-between text-xs text-sumi/50 dark:text-gofun/50">
                            <span>${article.source}</span>
                            <span>${newsData.getTimeAgo(article.date)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    generateNewsCard(article) {
        const categoryIcon = this.getCategoryIcon(article.category);
        const categoryColor = this.getCategoryColor(article.category);
        
        return `
            <article class="bg-white dark:bg-sumi rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="relative">
                    <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover">
                        <div class="absolute top-4 left-4">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColor}">
                            ${categoryIcon} ${article.category}
                            </span>
                        </div>
                    <div class="absolute top-4 right-4">
                        <button class="text-white hover:text-yellow-300 transition-colors" onclick="newsManager.toggleFavorite('${article.id}')">
                            ${this.favorites.includes(article.id) ? '★' : '☆'}
                        </button>
                    </div>
                    </div>
                    
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-sumi dark:text-gofun mb-3 line-clamp-2">
                        <a href="${article.url}" target="_blank" class="hover:text-shinku transition-colors">
                        ${article.title}
                        </a>
                    </h3>
                    
                    <p class="text-sumi/70 dark:text-gofun/70 mb-4 line-clamp-3">
                        ${article.content}
                    </p>
                    
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center space-x-2">
                            <span class="text-sumi/50 dark:text-gofun/50">${article.source}</span>
                            <span class="text-sumi/50 dark:text-gofun/50">•</span>
                            <span class="text-sumi/50 dark:text-gofun/50">${newsData.getTimeAgo(article.date)}</span>
                    </div>
                    
                        <div class="flex space-x-1">
                            ${article.hashtags.slice(0, 3).map(tag => `
                                <span class="text-xs bg-zen dark:bg-aiiro text-sumi dark:text-gofun px-2 py-1 rounded">
                                    ${tag}
                                </span>
                            `).join('')}
                        </div>
                        </div>
                        </div>
            </article>
        `;
    }

    setViewMode(mode) {
        this.viewMode = mode;
        localStorage.setItem('newsViewMode', mode);
        
        // Update button states
        const gridBtn = document.getElementById('grid-view');
        const listBtn = document.getElementById('list-view');
        
        if (gridBtn && listBtn) {
            if (mode === 'grid') {
                gridBtn.className = 'px-4 py-2 bg-shinku text-white rounded-lg hover:bg-kurenai transition-colors';
                listBtn.className = 'px-4 py-2 bg-zen dark:bg-aiiro text-sumi dark:text-gofun rounded-lg hover:bg-zen/80 dark:hover:bg-aiiro/80 transition-colors';
            } else {
                gridBtn.className = 'px-4 py-2 bg-zen dark:bg-aiiro text-sumi dark:text-gofun rounded-lg hover:bg-zen/80 dark:hover:bg-aiiro/80 transition-colors';
                listBtn.className = 'px-4 py-2 bg-shinku text-white rounded-lg hover:bg-kurenai transition-colors';
            }
        }
        
        this.displayNews();
    }

    toggleFavorite(articleId) {
        const index = this.favorites.indexOf(articleId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(articleId);
        }
        localStorage.setItem('favoriteArticles', JSON.stringify(this.favorites));
        
        // Refresh display to update star icons
        this.displayNews();
    }

    displayNewsStats() {
        const stats = newsData.getNewsStats();
        
        // Update counters
        const totalArticles = document.getElementById('total-articles');
        const totalSources = document.getElementById('total-sources');
        const lastUpdated = document.getElementById('last-updated');
        
        if (totalArticles) totalArticles.textContent = stats.totalArticles;
        if (totalSources) totalSources.textContent = stats.totalSources;
        if (lastUpdated) lastUpdated.textContent = newsData.getTimeAgo(stats.lastUpdated);
        
        // Update trending topics
        const trendingTopics = document.getElementById('trending-topics');
        if (trendingTopics) {
            const trending = newsData.getTrendingArticles(5);
            if (trending.length > 0) {
                trendingTopics.innerHTML = trending.map(article => `
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-sumi/70 dark:text-gofun/70 truncate">${article.title}</span>
                        <span class="text-xs text-sumi/50 dark:text-gofun/50">${newsData.getTimeAgo(article.date)}</span>
                </div>
                `).join('');
            } else {
                trendingTopics.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-sumi/70 dark:text-gofun/70">No trending articles yet</span>
            </div>
        `;
            }
        }
        
        // Update categories
        const newsCategories = document.getElementById('news-categories');
        if (newsCategories) {
            const categories = Object.entries(stats.categoryBreakdown || {});
            if (categories.length > 0) {
                newsCategories.innerHTML = categories.map(([category, count]) => `
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-sumi/70 dark:text-gofun/70">${category}</span>
                        <span class="text-xs font-semibold text-shinku">${count}</span>
                        </div>
                `).join('');
            } else {
                newsCategories.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-sumi/70 dark:text-gofun/70">No categories available</span>
            </div>
        `;
            }
        }
    }

    displayTrendingArticles() {
        const trending = newsData.getTrendingArticles(3);
        // This could be used for a trending section if needed
    }

    displayFeaturedNews() {
        const featured = newsData.getFeaturedNews();
        const featuredContainer = document.getElementById('featured-news');
        
        if (featuredContainer && featured.length > 0) {
            featuredContainer.innerHTML = featured.map(article => `
                <div class="bg-white dark:bg-sumi rounded-xl overflow-hidden shadow-lg">
                    <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-sumi dark:text-gofun mb-3">
                            <a href="${article.url}" target="_blank" class="hover:text-shinku transition-colors">
                                ${article.title}
                            </a>
                        </h3>
                        <p class="text-sumi/70 dark:text-gofun/70 mb-4 line-clamp-3">
                            ${article.content}
                        </p>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-sumi/50 dark:text-gofun/50">${article.source}</span>
                            <span class="text-sumi/50 dark:text-gofun/50">${newsData.getTimeAgo(article.date)}</span>
                        </div>
                    </div>
            </div>
            `).join('');
        }
    }

    clearFilters() {
        this.searchQuery = '';
        this.currentFilters = {
            category: 'all',
            date: 'all',
            sort: 'latest'
        };
        
        // Reset form elements
        const searchInput = document.getElementById('news-search');
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');
        
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'latest';
        
        this.displayNews();
    }

    updateNewsCounters(articleCount) {
        // Update any counters that might be displayed
        console.log(`📰 Displaying ${articleCount} articles`);
    }

    getCategoryIcon(category) {
        const icons = {
            'culture': '🏛️',
            'tourism': '🗺️',
            'real-estate': '🏠',
            'food': '🍜',
            'business': '💼',
            'events': '🎉',
            'general': '📰'
        };
        return icons[category] || '📰';
    }

    getCategoryColor(category) {
        const colors = {
            'culture': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'tourism': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'real-estate': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'food': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            'business': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
            'events': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
            'general': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
        };
        return colors[category] || colors['general'];
    }

    calculateAnalytics() {
        const stats = newsData.getNewsStats();
        this.analyticsData = stats;
    }

    updateAnalyticsDashboard() {
        // Update analytics dashboard if it exists
        console.log('📰 Analytics dashboard updated');
    }

    renderCharts() {
        // Render charts if Chart.js is available
        console.log('📰 Charts rendered');
    }

    startLiveDataStream() {
        // Start live data updates
        this.liveDataInterval = setInterval(() => {
            this.updateLiveData();
        }, 30000); // Update every 30 seconds
    }

    updateLiveData() {
        // Update live data indicators
        const lastUpdated = document.getElementById('last-updated');
        if (lastUpdated) {
            lastUpdated.textContent = newsData.getTimeAgo(newsData.lastFetchTime);
        }
    }

    displayFallbackContent() {
        console.log('📰 Displaying fallback content');
        // Display fallback content when news fails to load
    }
}

// Initialize global news manager instance
    window.newsManager = new NewsManager();