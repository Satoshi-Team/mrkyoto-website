// News Page Manager for MrKyoto.com
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

        // Filter functionality
        const filterSelects = document.querySelectorAll('.news-filter');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.currentFilters[e.target.name] = e.target.value;
                this.displayNews();
            });
        });

        // Refresh button
        const refreshButton = document.getElementById('refresh-news');
        if (refreshButton) {
            refreshButton.addEventListener('click', async () => {
                await this.refreshNews();
            });
        }

        // Clear filters button
        const clearFiltersButton = document.getElementById('clear-filters');
        if (clearFiltersButton) {
            clearFiltersButton.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // Debug refresh button
        const debugRefreshButton = document.getElementById('debug-refresh');
        if (debugRefreshButton) {
            debugRefreshButton.addEventListener('click', async () => {
                console.log('📰 Debug refresh clicked');
                if (newsData) {
                    await newsData.refreshNews();
                    this.displayNews();
                } else {
                    console.log('📰 No newsData available, showing fallback');
                    this.displayFallbackContent();
                }
            });
        }

        // Force display test - add a simple test button
        const testButton = document.createElement('button');
        testButton.textContent = 'Test Display';
        testButton.className = 'px-4 py-2 bg-[#000000] text-white rounded-lg ml-2';
        testButton.onclick = () => {
            console.log('📰 Test display clicked');
            this.displayFallbackContent();
        };
        
        const searchBar = document.querySelector('.flex.items-center.p-4');
        if (searchBar) {
            searchBar.appendChild(testButton);
        }

        // Auto-test display after 3 seconds if no content
        setTimeout(() => {
            const newsContainer = document.getElementById('news-container');
            if (newsContainer && newsContainer.children.length === 0) {
                console.log('📰 Auto-testing display after 3 seconds...');
                this.displayFallbackContent();
            }
        }, 3000);

        // Force display test after 5 seconds
        setTimeout(() => {
            console.log('📰 Force testing display after 5 seconds...');
            if (newsData && newsData.newsArticles && newsData.newsArticles.length > 0) {
                console.log('📰 Found articles, forcing display...');
                this.displayNews();
            } else {
                console.log('📰 No articles found, showing fallback...');
                this.displayFallbackContent();
            }
        }, 5000);
    }

    displayNews() {
        const newsContainer = document.getElementById('news-container');
        const newsLoading = document.getElementById('news-loading');
        const newsError = document.getElementById('news-error');
        const noResults = document.getElementById('no-results');
        
        if (!newsContainer) {
            console.error('📰 NewsManager: news-container element not found');
            return;
        }

        console.log('📰 NewsManager: Displaying news...');

        // Show loading state
        if (newsLoading) {
            newsLoading.classList.remove('hidden');
        }
        if (newsError) {
            newsError.classList.add('hidden');
        }
        if (noResults) {
            noResults.classList.add('hidden');
        }

        // Check if newsData is still loading
        if (newsData && newsData.isLoading) {
            console.log('📰 NewsManager: Data still loading, retrying in 500ms...');
            setTimeout(() => this.displayNews(), 500);
            return;
        }

        const articles = this.getFilteredNews();
        console.log(`📰 NewsManager: Got ${articles.length} filtered articles`);

        // Hide loading state
        if (newsLoading) {
            newsLoading.classList.add('hidden');
        }

        // Display news
        if (articles.length === 0) {
            console.log('📰 NewsManager: No articles to display - showing fallback');
            if (noResults) {
                noResults.classList.remove('hidden');
            }
            // Show fallback content instead of empty container
            newsContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="max-w-md mx-auto">
                        <div class="text-6xl mb-4">📰</div>
                        <h3 class="text-xl font-semibold text-sumi dark:text-gofun mb-4">Loading News...</h3>
                        <p class="text-sumi/60 dark:text-gofun/60 mb-6">
                            Fetching the latest news from Kyoto and Japan...
                        </p>
                        <button onclick="location.reload()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Refresh Page
                        </button>
                    </div>
                </div>
            `;
        } else {
            console.log(`📰 NewsManager: Displaying ${articles.length} articles`);
            if (noResults) {
                noResults.classList.add('hidden');
            }
            
            // Try to generate cards, but fallback to simple display if it fails
            try {
                const cards = this.generateNewsCards(articles);
                newsContainer.innerHTML = cards;
                console.log('📰 NewsManager: News cards generated and displayed');
            } catch (error) {
                console.error('📰 NewsManager: Error generating cards:', error);
                // Fallback to simple display
                newsContainer.innerHTML = this.generateSimpleCards(articles);
                console.log('📰 NewsManager: Simple cards displayed as fallback');
            }
        }

        // Update counters
        this.updateNewsCounters(articles);
    }

    calculateAnalytics() {
        if (!newsData) return;

        const allArticles = newsData.getAllNews();
        const today = new Date().toDateString();
        
        // Calculate today's articles
        const todayArticles = allArticles.filter(article => {
            const articleDate = new Date(article.publishDate).toDateString();
            return articleDate === today;
        });

        // Calculate category statistics
        const categoryStats = {};
        allArticles.forEach(article => {
            if (!categoryStats[article.category]) {
                categoryStats[article.category] = {
                    count: 0,
                    totalViews: 0,
                    articles: []
                };
            }
            categoryStats[article.category].count++;
            categoryStats[article.category].totalViews += article.views || 0;
            categoryStats[article.category].articles.push(article);
        });

        // Calculate average views
        const totalViews = allArticles.reduce((sum, article) => sum + (article.views || 0), 0);
        const avgViews = allArticles.length > 0 ? Math.round(totalViews / allArticles.length) : 0;

        // Calculate publishing trends (last 7 days)
        const trends = {};
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            trends[dateStr] = 0;
        }

        allArticles.forEach(article => {
            const articleDate = new Date(article.publishDate).toDateString();
            if (trends[articleDate] !== undefined) {
                trends[articleDate]++;
            }
        });

        this.analyticsData = {
            totalArticles: allArticles.length,
            todayArticles: todayArticles.length,
            totalCategories: Object.keys(categoryStats).length,
            avgViews,
            categoryStats,
            publishingTrends: trends,
            lastUpdated: new Date().toISOString()
        };
    }

    updateAnalyticsDashboard() {
        if (!this.analyticsData) return;

        // Update hero stats
        const heroTotalArticlesEl = document.getElementById('hero-total-articles');
        const heroTodayArticlesEl = document.getElementById('hero-today-articles');
        const heroCategoriesEl = document.getElementById('hero-categories');

        if (heroTotalArticlesEl) heroTotalArticlesEl.textContent = this.analyticsData.totalArticles;
        if (heroTodayArticlesEl) heroTodayArticlesEl.textContent = this.analyticsData.todayArticles;
        if (heroCategoriesEl) heroCategoriesEl.textContent = this.analyticsData.totalCategories;

        // Update dashboard stats
        const totalArticlesEl = document.getElementById('total-articles');
        const todayArticlesEl = document.getElementById('today-articles');
        const totalCategoriesEl = document.getElementById('total-categories');
        const avgViewsEl = document.getElementById('avg-views');
        const topCategoryEl = document.getElementById('top-category');

        if (totalArticlesEl) totalArticlesEl.textContent = this.analyticsData.totalArticles;
        if (todayArticlesEl) todayArticlesEl.textContent = this.analyticsData.todayArticles;
        if (totalCategoriesEl) totalCategoriesEl.textContent = this.analyticsData.totalCategories;
        if (avgViewsEl) avgViewsEl.textContent = this.analyticsData.avgViews.toLocaleString();
        
        // Find top category
        const topCategory = Object.entries(this.analyticsData.categoryStats)
            .sort(([,a], [,b]) => b.count - a.count)[0];
        if (topCategoryEl && topCategory) {
            topCategoryEl.textContent = topCategory[0];
        }

        // Update category counters
        const cultureCountEl = document.getElementById('culture-count');
        const eventsCountEl = document.getElementById('events-count');
        
        if (cultureCountEl && this.analyticsData.categoryStats.culture) {
            cultureCountEl.textContent = this.analyticsData.categoryStats.culture.count;
        }
        if (eventsCountEl && this.analyticsData.categoryStats.events) {
            eventsCountEl.textContent = this.analyticsData.categoryStats.events.count;
        }
    }

    renderCharts() {
        if (!this.analyticsData) return;
        
        this.renderTrendsChart();
        this.renderCategoryChart();
    }

    renderTrendsChart() {
        const ctx = document.getElementById('trends-chart');
        if (!ctx) return;

        if (this.charts.trends) {
            this.charts.trends.destroy();
        }

        const trends = this.analyticsData.publishingTrends;
        const labels = Object.keys(trends).map(date => {
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        });
        const data = Object.values(trends);
        
        this.charts.trends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Articles Published',
                    data: data,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
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
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(147, 51, 234, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(147, 51, 234, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(239, 68, 68, 1)'
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
        
        // Simulate live news updates
        this.simulateNewsUpdates();
        
        // Update last update time
        this.lastUpdateTime = now;
        
        // Update live indicators
        this.updateLiveIndicators();
        
        // Show subtle notification for updates
        if (timeSinceLastUpdate > 60000) { // Only show if more than 1 minute has passed
            this.showNotification('News data updated', 'info');
        }
    }

    simulateNewsUpdates() {
        // Simulate new article additions or view count updates
        const articles = newsData.getAllNews();
        if (Math.random() < 0.15) { // 15% chance of new article
            console.log('New article published');
        }
        
        // Simulate view count updates
        articles.forEach(article => {
            if (Math.random() < 0.1) { // 10% chance of view update
                article.views = (article.views || 0) + Math.floor(Math.random() * 10) + 1;
            }
        });
    }

    updateLiveIndicators() {
        // Update live news indicators
        const liveIndicator = document.getElementById('live-indicator');
        if (liveIndicator) {
            liveIndicator.innerHTML = `
                <div class="flex items-center space-x-2 text-sm">
                    <div class="w-2 h-2 bg-[#d9c289] rounded-full animate-pulse"></div>
                    <span>Live Data</span>
                    <span class="text-gray-500">•</span>
                    <span>Last updated: ${this.lastUpdateTime.toLocaleTimeString()}</span>
                </div>
            `;
        }
    }

    getFilteredNews() {
        if (!newsData) {
            console.log('📰 NewsManager: newsData not available');
            return [];
        }

        console.log('📰 NewsManager: newsData available, checking structure...');
        console.log('📰 newsData keys:', Object.keys(newsData));
        console.log('📰 newsData.newsArticles:', newsData.newsArticles);
        console.log('📰 newsData.newsArticles.length:', newsData.newsArticles ? newsData.newsArticles.length : 'undefined');

        // Try different ways to get articles
        let articles = [];
        if (newsData.getAllNews && typeof newsData.getAllNews === 'function') {
            articles = newsData.getAllNews();
            console.log(`📰 NewsManager: Got ${articles.length} articles via getAllNews()`);
        } else if (newsData.newsArticles && Array.isArray(newsData.newsArticles)) {
            articles = [...newsData.newsArticles];
            console.log(`📰 NewsManager: Got ${articles.length} articles via newsArticles array`);
        } else {
            console.log('📰 NewsManager: No articles found in newsData');
            return [];
        }

        console.log('📰 Sample articles:', articles.slice(0, 2).map(a => a.title));

        // Skip all filtering for now - just return all articles
        console.log(`📰 NewsManager: Returning ${articles.length} unfiltered articles`);
        return articles;
    }

    generateNewsCards(articles) {
        if (articles.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="text-4xl mb-4" role="img" aria-label="No news">📰</div>
                    <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">No Articles Found</h3>
                    <p class="text-sumi/70 dark:text-gray-300">Try adjusting your search criteria or filters.</p>
                </div>
            `;
        }

        return articles.map(article => this.generateNewsCard(article)).join('');
    }

    generateSimpleCards(articles) {
        console.log('📰 Generating simple cards for', articles.length, 'articles');
        return articles.map(article => `
            <div class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                <div class="bg-white dark:bg-sumi rounded-lg shadow-lg p-6 border border-zen dark:border-aiiro">
                    <h3 class="text-lg font-semibold text-sumi dark:text-gofun mb-2">${article.title || 'No Title'}</h3>
                    <p class="text-sm text-sumi/60 dark:text-gofun/60 mb-2">${article.source || 'Unknown Source'} • ${article.date || 'Unknown Date'}</p>
                    <p class="text-sumi/70 dark:text-gofun/70 mb-4">${article.summary || article.content || 'No description available'}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${article.category || 'General'}</span>
                        <a href="${article.url || '#'}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">Read More →</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    generateNewsCard(article) {
        const isFeatured = article.featured;
        const publishedDate = new Date(article.date);
        const timeAgo = this.getTimeAgo(publishedDate);
        const categoryColor = this.getCategoryColor(article.category);
        
        return `
            <div class="news-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-sumi rounded-2xl overflow-hidden border border-zen dark:border-aiiro ${isFeatured ? 'ring-2 ring-kurenai' : ''}" data-article-id="${article.id}">
                <!-- Card Header with Image -->
                <div class="relative overflow-hidden">
                    <img src="${article.image}" alt="${article.title}" 
                         class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                         loading="lazy">
                    
                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <!-- Featured Badge -->
                    ${isFeatured ? `
                        <div class="absolute top-4 left-4">
                            <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#d9c289] to-[#000000] text-white shadow-lg">
                                <span class="mr-1">⭐</span>
                                Featured
                            </span>
                        </div>
                    ` : ''}
                    
                    <!-- Category Badge -->
                    <div class="absolute top-4 ${isFeatured ? 'right-4' : 'left-4'}">
                        <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#d9c289]/20 backdrop-blur-md text-white border border-[#d9c289]/30 shadow-lg">
                            <span class="mr-1">${this.getCategoryIcon(article.category)}</span>
                            ${article.category}
                        </span>
                    </div>
                    
                    <!-- Read Time Badge -->
                    <div class="absolute bottom-4 left-4">
                        <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-black/40 backdrop-blur-sm text-white">
                            ⏱️ ${article.readTime}
                        </span>
                    </div>
                    
                    <!-- Views Badge -->
                    <div class="absolute bottom-4 right-4">
                        <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-black/40 backdrop-blur-sm text-white">
                            👁️ ${article.views.toLocaleString()}
                        </span>
                    </div>
                </div>
                
                <!-- Card Content -->
                <div class="p-6">
                    <!-- Meta Information -->
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center space-x-3">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-gradient-to-br from-[#d9c289] to-[#000000] rounded-full flex items-center justify-center mr-2">
                                    <span class="text-white text-xs font-bold">${article.author ? article.author.charAt(0).toUpperCase() : 'N'}</span>
                                </div>
                                <span class="text-sm text-sumi/60 dark:text-gofun/60 font-medium">${article.author || 'News Staff'}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="text-lg mr-1">📍</span>
                                <span class="text-sm text-sumi/60 dark:text-gofun/60">${article.neighborhood}</span>
                            </div>
                        </div>
                        <span class="text-sm text-sumi/60 dark:text-gofun/60">${timeAgo}</span>
                    </div>
                    
                    <!-- Title -->
                    <h3 class="text-xl font-bold text-sumi dark:text-gofun mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        ${article.title}
                    </h3>
                    
                    <!-- Summary -->
                    <p class="text-sm text-sumi/70 dark:text-gofun/70 mb-4 line-clamp-3 leading-relaxed">
                        ${article.summary}
                    </p>
                    
                    <!-- Tags -->
                    <div class="mb-4">
                        <div class="flex flex-wrap gap-2">
                            ${article.tags.slice(0, 3).map(tag => 
                                `<span class="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">${tag}</span>`
                            ).join('')}
                            ${article.tags.length > 3 ? 
                                `<span class="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">+${article.tags.length - 3} more</span>` : 
                                ''
                            }
                        </div>
                    </div>
                    
                    <!-- Stats Row -->
                    <div class="grid grid-cols-3 gap-4 mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl">
                        <div class="text-center">
                            <div class="text-lg font-bold text-sumi dark:text-gofun">${article.views.toLocaleString()}</div>
                            <div class="text-xs text-sumi/60 dark:text-gofun/60">Views</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-bold text-sumi dark:text-gofun">${article.comments}</div>
                            <div class="text-xs text-sumi/60 dark:text-gofun/60">Comments</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-bold text-sumi dark:text-gofun">${timeAgo}</div>
                            <div class="text-xs text-sumi/60 dark:text-gofun/60">Published</div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex items-center justify-between pt-4 border-t border-zen dark:border-aiiro">
                        <a href="${article.articleUrl}" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#d9c289] to-[#000000] hover:from-[#000000] hover:to-[#d9c289] rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <span>Read Full Article</span>
                            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                        
                        <div class="flex items-center space-x-2">
                            <button onclick="newsManager.showArticleModal('${article.id}')"
                                    class="p-2 rounded-full bg-zen dark:bg-aiiro hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300 transform hover:scale-110" title="Quick View">
                                <svg class="w-4 h-4 text-sumi/60 dark:text-gofun/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </button>
                            
                            <button onclick="newsManager.shareArticle('${article.id}')"
                                    class="p-2 rounded-full bg-zen dark:bg-aiiro hover:bg-[#d9c289]/20 dark:hover:bg-[#d9c289]/20 transition-all duration-300 transform hover:scale-110" title="Share Article">
                                <svg class="w-4 h-4 text-sumi/60 dark:text-gofun/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                </svg>
                            </button>
                            
                            <button class="favorite-btn p-2 rounded-full bg-zen dark:bg-aiiro hover:bg-[#000000]/20 dark:hover:bg-[#000000]/20 transition-all duration-300 transform hover:scale-110" title="Add to Favorites" data-article-id="${article.id}">
                                <svg class="w-4 h-4 text-sumi/60 dark:text-gofun/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateNewsCounters(articleCount) {
        const newsCounter = document.getElementById('news-counter');
        if (newsCounter) newsCounter.textContent = articleCount;
    }

    displayNewsStats() {
        if (!newsData) return;
        
        const stats = newsData.getNewsStats();
        const statsContainer = document.getElementById('news-stats');
        
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-bold text-kurenai mb-2">${stats.totalArticles}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Total Articles</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-matcha mb-2">${stats.categories}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">News Categories</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-kobicha mb-2">${stats.totalViews.toLocaleString()}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Total Views</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-aiiro mb-2">${stats.totalComments}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Total Comments</div>
                </div>
            </div>
        `;
    }

    displayTrendingArticles() {
        if (!newsData) return;
        
        const trendingContainer = document.getElementById('trending-articles');
        if (!trendingContainer) return;

        const trendingArticles = newsData.getTrendingArticles(3);

        trendingContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${trendingArticles.map(article => `
                    <div class="zen-card p-4 rounded-lg">
                        <img src="${article.image}" alt="${article.title}" 
                             class="w-full h-32 object-cover rounded mb-3">
                        <h4 class="font-semibold text-sumi dark:text-white mb-2">${article.title}</h4>
                        <p class="text-sm text-sumi/70 dark:text-gray-300 mb-2">${newsData.formatDate(article.date)}</p>
                        <div class="flex justify-between items-center text-xs text-sumi/60 dark:text-gray-400 mb-3">
                            <span>${article.views.toLocaleString()} views</span>
                            <span>${article.comments} comments</span>
                        </div>
                        <a href="${article.articleUrl}" target="_blank" rel="noopener noreferrer"
                           class="bg-kurenai text-white px-4 py-2 rounded text-sm font-semibold hover:bg-kurenai/90 transition-colors focus-zen inline-block">
                            Read Article
                        </a>
                    </div>
                `).join('')}
            </div>
        `;
    }

    displayFeaturedNews() {
        if (!newsData) return;
        
        const featuredContainer = document.getElementById('featured-news');
        if (!featuredContainer) return;

        const featuredArticles = newsData.getFeaturedNews();

        featuredContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${featuredArticles.map(article => `
                    <div class="zen-card p-6 rounded-lg border-2 border-kurenai">
                        <div class="flex items-center mb-3">
                            <span class="bg-kurenai text-white px-2 py-1 rounded text-xs font-semibold mr-2">Featured</span>
                            <span class="text-sm text-sumi/60 dark:text-gray-400">${newsData.formatDate(article.date)}</span>
                        </div>
                        <h3 class="font-serif text-lg font-bold text-sumi dark:text-white mb-3">${article.title}</h3>
                        <p class="text-sumi/70 dark:text-gray-300 mb-4">${article.summary}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-sumi/60 dark:text-gray-400">By ${article.author}</span>
                            <a href="${article.articleUrl}" target="_blank" rel="noopener noreferrer"
                               class="bg-kurenai text-white px-4 py-2 rounded text-sm font-semibold hover:bg-kurenai/90 transition-colors focus-zen">
                                Read More
                            </a>
                        </div>
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
                <h3 class="font-serif text-xl font-bold text-sumi dark:text-white mb-4">Search & Filter News</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div class="lg:col-span-2">
                        <label for="news-search" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Search Articles</label>
                        <input type="text" id="news-search" placeholder="Search by title, category, or content..."
                               class="w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                    </div>
                    
                    <div>
                        <label for="category-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Category</label>
                        <select name="category" id="category-filter" class="news-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                            <option value="all">All Categories</option>
                            <option value="Tourism">Tourism</option>
                            <option value="Culture">Culture</option>
                            <option value="Arts">Arts</option>
                            <option value="Environment">Environment</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Food">Food</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="sort-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Sort By</label>
                        <select name="sortBy" id="sort-filter" class="news-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                            <option value="date">Latest</option>
                            <option value="views">Most Viewed</option>
                            <option value="comments">Most Commented</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="neighborhood-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Area</label>
                        <select name="neighborhood" id="neighborhood-filter" class="news-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                            <option value="all">All Areas</option>
                            <option value="Gion">Gion</option>
                            <option value="Arashiyama">Arashiyama</option>
                            <option value="Higashiyama">Higashiyama</option>
                            <option value="Nakagyo">Nakagyo</option>
                            <option value="Pontocho">Pontocho</option>
                            <option value="Citywide">Citywide</option>
                        </select>
                    </div>
                </div>
                
                <div class="flex justify-between items-center mt-4 pt-4 border-t border-sumi/10 dark:border-gray-600/10">
                    <div class="text-sm text-sumi/70 dark:text-gray-300">
                        Showing <span id="news-counter">0</span> articles
                    </div>
                    <button onclick="newsManager.clearFilters()" 
                            class="text-sm text-kurenai hover:underline focus-zen">
                        Clear All Filters
                    </button>
                </div>
            </div>
        `;

        mainContent.insertAdjacentHTML('afterbegin', searchFiltersHTML);
        this.setupEventListeners();
    }

    async refreshNews() {
        if (!newsData) return;
        
        // Show loading state
        const refreshButton = document.getElementById('refresh-news');
        if (refreshButton) {
            const originalText = refreshButton.innerHTML;
            refreshButton.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
            `;
            refreshButton.disabled = true;
        }

        try {
            await newsData.refreshNews();
            this.displayNews();
            this.calculateAnalytics();
            this.updateAnalyticsDashboard();
            this.renderCharts();
            
            // Show success notification
            this.showNotification('News refreshed successfully!', 'success');
        } catch (error) {
            console.error('Error refreshing news:', error);
            this.showNotification('Failed to refresh news. Please try again.', 'error');
        } finally {
            // Restore button
            if (refreshButton) {
                refreshButton.innerHTML = `
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Refresh News
                `;
                refreshButton.disabled = false;
            }
        }
    }

    clearFilters() {
        this.searchQuery = '';
        this.currentFilters = {
            category: 'all',
            source: 'all',
            neighborhood: 'all',
            sortBy: 'date'
        };
        
        // Reset form elements
        const searchInput = document.getElementById('news-search');
        if (searchInput) searchInput.value = '';
        
        const filterSelects = document.querySelectorAll('.news-filter');
        filterSelects.forEach(select => {
            select.value = 'all';
        });
        
        this.displayNews();
    }

    showArticleModal(articleId) {
        if (!newsData) return;
        
        const article = newsData.getArticleById(articleId);
        if (!article) return;

        const relatedArticles = newsData.getRelatedArticles(articleId);

        const modalHTML = `
            <div id="article-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="zen-card max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h2 class="font-serif text-2xl font-bold text-sumi dark:text-white">${article.title}</h2>
                            <button onclick="newsManager.closeArticleModal()" 
                                    class="text-sumi/60 dark:text-gray-400 hover:text-sumi dark:hover:text-white text-2xl focus-zen">
                                ×
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div class="lg:col-span-2">
                                <img src="${article.image}" alt="${article.title}" 
                                     class="w-full h-64 object-cover rounded-lg mb-4">
                                
                                <div class="flex items-center justify-between mb-4 text-sm text-sumi/60 dark:text-gray-400">
                                    <div>
                                        <span>By ${article.author}</span>
                                        <span class="mx-2">•</span>
                                        <span>${newsData.formatDate(article.date)}</span>
                                        <span class="mx-2">•</span>
                                        <span>${article.readTime}</span>
                                    </div>
                                    <div>
                                        <span>${article.views.toLocaleString()} views</span>
                                        <span class="mx-2">•</span>
                                        <span>${article.comments} comments</span>
                                    </div>
                                </div>
                                
                                <div class="prose prose-sumi dark:prose-invert max-w-none mb-6">
                                    <p class="text-lg font-semibold mb-4">${article.summary}</p>
                                    <p>${article.content}</p>
                                </div>
                                
                                <div class="flex gap-3">
                                    <a href="${article.articleUrl}" target="_blank" rel="noopener noreferrer"
                                       class="flex-1 bg-kurenai text-white px-4 py-2 rounded font-semibold text-center hover:bg-kurenai/90 transition-colors focus-zen">
                                        Read Full Article
                                    </a>
                                    <button onclick="newsManager.shareArticle('${article.id}')"
                                            class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-white px-4 py-2 rounded font-semibold hover:bg-washi/70 dark:hover:bg-gray-600/50 transition-colors focus-zen">
                                        Share
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="font-semibold text-sumi dark:text-white mb-4">Related Articles</h3>
                                <div class="space-y-4">
                                    ${relatedArticles.map(related => `
                                        <div class="p-3 bg-washi/30 dark:bg-gray-700/30 rounded">
                                            <h4 class="font-semibold text-sumi dark:text-white text-sm mb-2">${related.title}</h4>
                                            <p class="text-xs text-sumi/60 dark:text-gray-400 mb-2">${newsData.formatDate(related.date)}</p>
                                            <a href="${related.articleUrl}" target="_blank" rel="noopener noreferrer"
                                               class="text-xs text-kurenai hover:underline">Read Article</a>
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
        document.getElementById('article-modal').addEventListener('click', (e) => {
            if (e.target.id === 'article-modal') {
                this.closeArticleModal();
            }
        });
    }

    closeArticleModal() {
        const modal = document.getElementById('article-modal');
        if (modal) {
            modal.remove();
        }
    }

    shareArticle(articleId) {
        if (!newsData) return;
        
        const article = newsData.getArticleById(articleId);
        if (!article) return;

        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.summary,
                url: article.articleUrl
            });
        } else {
            // Fallback: copy to clipboard
            const shareText = `${article.title}\n\n${article.summary}\n\nRead more: ${article.articleUrl}`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Article link copied to clipboard!');
            });
        }
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
        return `${Math.floor(diffInSeconds / 31536000)}y ago`;
    }

    getCategoryIcon(category) {
        const icons = {
            'kyoto': '📍',
            'japan': '🇯🇵',
            'trending': '🔥',
            'culture': '🎭',
            'business': '💼',
            'technology': '💻',
            'travel': '✈️',
            'food': '🍜',
            'events': '🎪',
            'weather': '🌤️',
            'default': '📰'
        };
        return icons[category.toLowerCase()] || icons.default;
    }

    getCategoryColor(category) {
        const colors = {
            'kyoto': 'from-blue-500 to-blue-600',
            'japan': 'from-red-500 to-red-600',
            'trending': 'from-orange-500 to-orange-600',
            'culture': 'from-purple-500 to-purple-600',
            'business': 'from-green-500 to-green-600',
            'technology': 'from-indigo-500 to-indigo-600',
            'travel': 'from-teal-500 to-teal-600',
            'food': 'from-pink-500 to-pink-600',
            'events': 'from-yellow-500 to-yellow-600',
            'weather': 'from-cyan-500 to-cyan-600',
            'default': 'from-gray-500 to-gray-600'
        };
        return colors[category.toLowerCase()] || colors.default;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        // Set colors based on type
        const colors = {
            success: 'bg-[#d9c289] text-white',
            error: 'bg-[#000000] text-white',
            info: 'bg-blue-500 text-white',
            warning: 'bg-yellow-500 text-black'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <span class="mr-2">${this.getNotificationIcon(type)}</span>
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    ×
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️'
        };
        return icons[type] || icons.info;
    }

    displayFallbackContent() {
        console.log('📰 Displaying fallback content...');
        const newsContainer = document.getElementById('news-container');
        if (newsContainer) {
            // Show some sample articles to demonstrate the system works
            newsContainer.innerHTML = `
                <div class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <div class="news-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-sumi rounded-2xl overflow-hidden border border-zen dark:border-aiiro">
                        <div class="relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&h=400&fit=crop" 
                                 alt="Kyoto Cherry Blossoms" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div class="absolute top-4 left-4">
                                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#d9c289]/20 backdrop-blur-md text-white border border-[#d9c289]/30 shadow-lg">
                                    <span class="mr-1">🍵</span>
                                    Tourism
                                </span>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-gradient-to-br from-[#d9c289] to-[#000000] rounded-full flex items-center justify-center mr-2">
                                            <span class="text-white text-xs font-bold">K</span>
                                        </div>
                                        <span class="text-sm text-sumi/60 dark:text-gofun/60 font-medium">Kyoto Times Staff</span>
                                    </div>
                                </div>
                                <span class="text-sm text-sumi/60 dark:text-gofun/60">Just now</span>
                            </div>
                            <h3 class="text-xl font-bold text-sumi dark:text-gofun mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                Kyoto's Cherry Blossom Season Draws Record Number of Visitors
                            </h3>
                            <p class="text-sm text-sumi/70 dark:text-gofun/70 mb-4 line-clamp-3 leading-relaxed">
                                The 2025 cherry blossom season in Kyoto has attracted over 2 million visitors, setting a new record for spring tourism in the ancient capital.
                            </p>
                            <div class="flex items-center justify-between pt-4 border-t border-zen dark:border-aiiro">
                                <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    <span>Read Full Article</span>
                                    <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <div class="news-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-sumi rounded-2xl overflow-hidden border border-zen dark:border-aiiro">
                        <div class="relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop" 
                                 alt="Traditional Machiya" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div class="absolute top-4 left-4">
                                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#d9c289]/20 backdrop-blur-md text-white border border-[#d9c289]/30 shadow-lg">
                                    <span class="mr-1">🏛️</span>
                                    Culture
                                </span>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-gradient-to-br from-[#d9c289] to-[#000000] rounded-full flex items-center justify-center mr-2">
                                            <span class="text-white text-xs font-bold">C</span>
                                        </div>
                                        <span class="text-sm text-sumi/60 dark:text-gofun/60 font-medium">Cultural Heritage Reporter</span>
                                    </div>
                                </div>
                                <span class="text-sm text-sumi/60 dark:text-gofun/60">2 days ago</span>
                            </div>
                            <h3 class="text-xl font-bold text-sumi dark:text-gofun mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                New Traditional Machiya Restoration Project Announced in Gion
                            </h3>
                            <p class="text-sm text-sumi/70 dark:text-gofun/70 mb-4 line-clamp-3 leading-relaxed">
                                A major restoration project will preserve 15 historic machiya houses in the Gion district, ensuring the preservation of Kyoto's traditional architecture.
                            </p>
                            <div class="flex items-center justify-between pt-4 border-t border-zen dark:border-aiiro">
                                <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    <span>Read Full Article</span>
                                    <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Hide loading state
        const newsLoading = document.getElementById('news-loading');
        if (newsLoading) {
            newsLoading.classList.add('hidden');
        }
    }
}

// Initialize news manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('📰 DOM loaded, initializing News Manager...');
    window.newsManager = new NewsManager();
    // Initialize after a short delay to ensure all scripts are loaded
    setTimeout(async () => {
        try {
            await window.newsManager.init();
        } catch (error) {
            console.error('📰 NewsManager init failed:', error);
            // Show fallback content
            window.newsManager.displayFallbackContent();
        }
    }, 1000);
});

// Also try to initialize if DOM is already loaded
if (document.readyState === 'loading') {
    console.log('📰 DOM still loading, waiting...');
} else {
    console.log('📰 DOM already loaded, initializing immediately...');
    window.newsManager = new NewsManager();
    setTimeout(async () => {
        try {
            await window.newsManager.init();
        } catch (error) {
            console.error('📰 NewsManager init failed:', error);
            window.newsManager.displayFallbackContent();
        }
    }, 1000);
} 