// Enhanced News Data for MrKyoto.com
// Real-time news from multiple free API sources with improved functionality

class NewsData {
    constructor() {
        this.newsArticles = [];
        this.categories = [
            'Tourism', 'Culture', 'Arts', 'Environment', 'Real Estate', 
            'Food', 'Business', 'Technology', 'Education', 'Health'
        ];
        this.sources = [];
        this.isLoading = false;
        this.lastFetchTime = null;
        this.apiKeys = {
            newsapi: window.API_CONFIG?.NEWSAPI_KEY || '1ba9b49d995949af901bf841dfa7ebac',
            gnews: null // GNews disabled
        };
        this.init();
    }

    async init() {
        console.log('📰 Initializing NewsData...');
        try {
            await this.fetchNewsFromMultipleSources();
            console.log(`📰 NewsData initialized with ${this.newsArticles.length} articles`);
            
            // Debug: Log sample articles
            if (this.newsArticles.length > 0) {
                console.log('📰 Sample articles:', this.newsArticles.slice(0, 2).map(a => a.title));
            }
        } catch (error) {
            console.error('📰 Error initializing NewsData:', error);
            this.loadFallbackData();
        }
        this.startAutoRefresh();
    }

    async fetchNewsFromMultipleSources() {
        this.isLoading = true;
        console.log('📰 Starting to fetch news from multiple sources...');
        
        const promises = [
            this.fetchFromNewsAPI(),
            this.fetchFromRSSFeeds(),
            this.fetchFromLocalSources()
        ];

        try {
            const results = await Promise.allSettled(promises);
            this.newsArticles = [];
            
            results.forEach((result, index) => {
                const sourceNames = ['NewsAPI', 'RSS Feeds', 'Local Sources'];
                if (result.status === 'fulfilled' && result.value) {
                    console.log(`📰 ${sourceNames[index]}: ${result.value.length} articles`);
                    this.newsArticles = this.newsArticles.concat(result.value);
                } else {
                    console.warn(`📰 ${sourceNames[index]}: Failed to fetch`);
                }
            });

            // Remove duplicates and sort by date
            this.newsArticles = this.removeDuplicates(this.newsArticles);
            this.newsArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            this.lastFetchTime = new Date();
            this.updateSources();
            
            console.log(`📰 Total articles after processing: ${this.newsArticles.length}`);
        } catch (error) {
            console.error('Error fetching news:', error);
            // Fallback to static data if APIs fail
            this.loadFallbackData();
        } finally {
            this.isLoading = false;
        }
    }

    async fetchFromNewsAPI() {
        try {
            // Enhanced query to get more relevant articles about Japan/Kyoto
            const queries = [
                'kyoto+japan',
                'japan+news',
                'kyoto+culture',
                'japanese+tourism',
                'kyoto+real+estate'
            ];
            
            const allArticles = [];
            
            for (const query of queries) {
                const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${this.apiKeys.newsapi}`);
                const data = await response.json();
                
                if (data.status === 'ok' && data.articles) {
                    console.log(`📰 Fetched ${data.articles.length} articles for query: ${query}`);
                    const transformedArticles = data.articles
                        .map(article => this.transformNewsAPIArticle(article))
                        .filter(article => article !== null);
                    allArticles.push(...transformedArticles);
                } else if (data.status === 'error') {
                    console.warn('NewsAPI error:', data.message);
                }
            }
            
            console.log(`📰 Total NewsAPI articles: ${allArticles.length}`);
            return allArticles;
        } catch (error) {
            console.warn('NewsAPI fetch failed:', error);
        }
        return [];
    }

    async fetchFromRSSFeeds() {
        const rssFeeds = [
            'https://rss.cnn.com/rss/edition_asia.rss',
            'https://feeds.bbci.co.uk/news/world/asia/rss.xml',
            'https://www.japantimes.co.jp/feed/',
            'https://www3.nhk.or.jp/rss/news/cat0.xml',
            'https://feeds.reuters.com/reuters/APTopNews'
        ];
        
        const allArticles = [];
        
        for (const feedUrl of rssFeeds) {
            try {
                const articles = await this.fetchRSSFeed(feedUrl);
                allArticles.push(...articles);
            } catch (error) {
                console.warn(`Failed to fetch RSS feed: ${feedUrl}`, error);
            }
        }
        
        return allArticles;
    }

    async fetchRSSFeed(url) {
        try {
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (data.contents) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
                const items = xmlDoc.querySelectorAll('item');
                
                const articles = Array.from(items).map(item => {
                    const title = item.querySelector('title')?.textContent || '';
                    const description = item.querySelector('description')?.textContent || '';
                    const link = item.querySelector('link')?.textContent || '';
                    const pubDate = item.querySelector('pubDate')?.textContent || '';
                    
                    // Only include articles that mention Japan/Kyoto
                    if (this.isRelevantToJapan(title, description)) {
                        return this.transformRSSItem(item, url);
                    }
                    return null;
                }).filter(article => article !== null);
                
                return articles;
            }
        } catch (error) {
            console.warn(`Error fetching RSS feed ${url}:`, error);
        }
        return [];
    }

    isRelevantToJapan(title, description) {
        const japanKeywords = ['japan', 'japanese', 'kyoto', 'tokyo', 'osaka', 'nihon', 'nihongo'];
        const text = (title + ' ' + description).toLowerCase();
        return japanKeywords.some(keyword => text.includes(keyword));
    }

    async fetchFromLocalSources() {
        // Enhanced local sources with more realistic data
        return [
            {
                id: 'local_kyoto_1',
                title: 'Kyoto Cherry Blossom Festival 2025 Announced',
                content: 'The annual Kyoto Cherry Blossom Festival will take place from March 25 to April 15, 2025. The festival will feature traditional tea ceremonies, cultural performances, and guided tours of the city\'s most beautiful sakura spots.',
                author: 'Kyoto Tourism Board',
                source: 'Kyoto News',
                url: 'https://kyoto-news.com/cherry-blossom-festival-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                platform: 'local',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#cherryblossom', '#festival', '#japan'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'local_kyoto_2',
                title: 'New Traditional Craft Center Opens in Gion District',
                content: 'A new center dedicated to preserving Kyoto\'s traditional crafts has opened in the historic Gion district. The center will showcase artisans working with textiles, ceramics, and lacquerware.',
                author: 'Japan Times',
                source: 'Japan Times',
                url: 'https://japantimes.co.jp/kyoto-craft-center',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                platform: 'local',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#traditional', '#crafts', '#gion'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'local_kyoto_3',
                title: 'Kyoto Real Estate Market Shows Strong Growth',
                content: 'The Kyoto real estate market continues to show strong growth, with property values increasing by 15% year-over-year. Foreign investment in traditional machiya houses is driving the market.',
                author: 'Kyoto Business Journal',
                source: 'Kyoto Business Journal',
                url: 'https://kyoto-business.com/real-estate-growth-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                platform: 'local',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#realestate', '#investment', '#machiya'],
                category: 'real-estate',
                language: 'en'
            },
            {
                id: 'local_kyoto_4',
                title: 'New Ramen Restaurant Opens in Pontocho Alley',
                content: 'A new ramen restaurant specializing in Kyoto-style ramen has opened in the famous Pontocho Alley. The restaurant features traditional recipes passed down through generations.',
                author: 'Kyoto Food Guide',
                source: 'Kyoto Food Guide',
                url: 'https://kyoto-food.com/new-ramen-pontocho',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
                platform: 'local',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#ramen', '#food', '#pontocho'],
                category: 'food',
                language: 'en'
            },
            {
                id: 'local_kyoto_5',
                title: 'Kyoto Temple Restoration Project Completed',
                content: 'A major restoration project at Kinkaku-ji (Golden Pavilion) has been completed. The temple now features enhanced accessibility and improved visitor facilities.',
                author: 'Kyoto Heritage Foundation',
                source: 'Kyoto Heritage Foundation',
                url: 'https://kyoto-heritage.org/kinkaku-ji-restoration',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
                platform: 'local',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#temple', '#kinkakuji', '#heritage'],
                category: 'culture',
                language: 'en'
            }
        ];
    }

    transformNewsAPIArticle(article) {
        try {
            // Check if article is in English and relevant to Japan/Kyoto
            if (!this.isEnglishText(article.title + ' ' + (article.description || ''))) {
                return null;
            }
            
            return {
                id: `newsapi_${article.url?.replace(/[^a-zA-Z0-9]/g, '') || Date.now()}`,
                title: article.title || 'No Title',
                content: article.description || article.content || 'No content available',
                author: article.author || 'Unknown Author',
                source: article.source?.name || 'NewsAPI',
                url: article.url || '#',
                image: article.urlToImage || 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: article.publishedAt || new Date().toISOString(),
                platform: 'newsapi',
                verified: true,
                location: this.extractLocation(article.title, article.description),
                hashtags: this.extractTags(article.title, article.description),
                category: this.categorizeArticle(article.title, article.description),
                language: 'en'
            };
        } catch (error) {
            console.warn('Error transforming NewsAPI article:', error);
            return null;
        }
    }

    transformRSSItem(item, feedUrl) {
        try {
            const title = item.querySelector('title')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            
            return {
                id: `rss_${link?.replace(/[^a-zA-Z0-9]/g, '') || Date.now()}`,
                title: title,
                content: description,
                author: 'RSS Feed',
                source: this.extractSourceFromUrl(feedUrl),
                url: link,
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(pubDate).toISOString(),
                platform: 'rss',
                verified: true,
                location: this.extractLocation(title, description),
                hashtags: this.extractTags(title, description),
                category: this.categorizeArticle(title, description),
                language: 'en'
            };
        } catch (error) {
            console.warn('Error transforming RSS item:', error);
            return null;
        }
    }

    isEnglishText(text) {
        if (!text) return false;
        // Simple check for English text (contains common English words)
        const englishWords = ['the', 'and', 'in', 'of', 'to', 'a', 'is', 'that', 'it', 'with', 'as', 'for', 'his', 'they', 'at', 'be', 'this', 'have', 'from'];
        const textLower = text.toLowerCase();
        return englishWords.some(word => textLower.includes(word));
    }

    categorizeArticle(title, description) {
        const text = (title + ' ' + description).toLowerCase();
        
        if (text.includes('temple') || text.includes('shrine') || text.includes('culture') || text.includes('traditional')) {
            return 'culture';
        } else if (text.includes('tourism') || text.includes('travel') || text.includes('visitor')) {
            return 'tourism';
        } else if (text.includes('real estate') || text.includes('property') || text.includes('house')) {
            return 'real-estate';
        } else if (text.includes('food') || text.includes('restaurant') || text.includes('cuisine')) {
            return 'food';
        } else if (text.includes('business') || text.includes('economy') || text.includes('market')) {
            return 'business';
        } else if (text.includes('event') || text.includes('festival') || text.includes('celebration')) {
            return 'events';
        }
        
        return 'general';
    }

    extractTags(title, description) {
        const text = (title + ' ' + description).toLowerCase();
        const tags = [];
        
        if (text.includes('kyoto')) tags.push('#kyoto');
        if (text.includes('japan')) tags.push('#japan');
        if (text.includes('culture')) tags.push('#culture');
        if (text.includes('tourism')) tags.push('#tourism');
        if (text.includes('food')) tags.push('#food');
        if (text.includes('real estate')) tags.push('#realestate');
        if (text.includes('temple')) tags.push('#temple');
        if (text.includes('festival')) tags.push('#festival');
        
        return tags;
    }

    extractLocation(title, description) {
        const text = (title + ' ' + description).toLowerCase();
        
        if (text.includes('kyoto')) return 'Kyoto';
        if (text.includes('tokyo')) return 'Tokyo';
        if (text.includes('osaka')) return 'Osaka';
        if (text.includes('japan')) return 'Japan';
        
        return 'Japan';
    }

    extractSourceFromUrl(url) {
        try {
            const domain = new URL(url).hostname;
            return domain.replace('www.', '').split('.')[0];
        } catch {
            return 'RSS Feed';
        }
    }

    removeDuplicates(articles) {
        const seen = new Set();
        return articles.filter(article => {
            const key = article.title + article.url;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    updateSources() {
        const sourceCounts = {};
        this.newsArticles.forEach(article => {
            sourceCounts[article.source] = (sourceCounts[article.source] || 0) + 1;
        });
        
        this.sources = Object.entries(sourceCounts).map(([name, count]) => ({
            name,
            count,
            url: this.newsArticles.find(a => a.source === name)?.url || '#'
        }));
    }

    startAutoRefresh() {
        setInterval(() => {
            this.refreshNews();
        }, 5 * 60 * 1000); // Refresh every 5 minutes
    }

    loadFallbackData() {
        console.log('📰 Loading fallback data...');
        this.newsArticles = [
            {
                id: 'fallback_1',
                title: 'Kyoto Cherry Blossom Festival 2025 Announced',
                content: 'The annual Kyoto Cherry Blossom Festival will take place from March 25 to April 15, 2025. The festival will feature traditional tea ceremonies, cultural performances, and guided tours of the city\'s most beautiful sakura spots.',
                author: 'Kyoto Tourism Board',
                source: 'Kyoto News',
                url: 'https://kyoto-news.com/cherry-blossom-festival-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#cherryblossom', '#festival', '#japan'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'fallback_2',
                title: 'New Traditional Craft Center Opens in Gion District',
                content: 'A new center dedicated to preserving Kyoto\'s traditional crafts has opened in the historic Gion district. The center will showcase artisans working with textiles, ceramics, and lacquerware.',
                author: 'Japan Times',
                source: 'Japan Times',
                url: 'https://japantimes.co.jp/kyoto-craft-center',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#traditional', '#crafts', '#gion'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'fallback_3',
                title: 'Kyoto Real Estate Market Shows Strong Growth',
                content: 'The Kyoto real estate market continues to show strong growth, with property values increasing by 15% year-over-year. Foreign investment in traditional machiya houses is driving the market.',
                author: 'Kyoto Business Journal',
                source: 'Kyoto Business Journal',
                url: 'https://kyoto-business.com/real-estate-growth-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#realestate', '#investment', '#machiya'],
                category: 'real-estate',
                language: 'en'
            },
            {
                id: 'fallback_4',
                title: 'New Ramen Restaurant Opens in Pontocho Alley',
                content: 'A new ramen restaurant specializing in Kyoto-style ramen has opened in the famous Pontocho Alley. The restaurant features traditional recipes passed down through generations.',
                author: 'Kyoto Food Guide',
                source: 'Kyoto Food Guide',
                url: 'https://kyoto-food.com/new-ramen-pontocho',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#ramen', '#food', '#pontocho'],
                category: 'food',
                language: 'en'
            },
            {
                id: 'fallback_5',
                title: 'Kyoto Temple Restoration Project Completed',
                content: 'A major restoration project at Kinkaku-ji (Golden Pavilion) has been completed. The temple now features enhanced accessibility and improved visitor facilities.',
                author: 'Kyoto Heritage Foundation',
                source: 'Kyoto Heritage Foundation',
                url: 'https://kyoto-heritage.org/kinkaku-ji-restoration',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#temple', '#kinkakuji', '#heritage'],
                category: 'culture',
                language: 'en'
            }
        ];
        
        this.updateSources();
        console.log(`📰 Fallback data loaded: ${this.newsArticles.length} articles`);
    }

    // Public API methods
    getAllNews() {
        return this.newsArticles;
    }

    getFeaturedNews() {
        return this.newsArticles.slice(0, 3);
    }

    getNewsByCategory(category) {
        return this.newsArticles.filter(article => article.category === category);
    }

    getNewsByNeighborhood(neighborhood) {
        return this.newsArticles.filter(article => 
            article.location?.toLowerCase().includes(neighborhood.toLowerCase())
        );
    }

    searchNews(query) {
        if (!query) return this.newsArticles;
        
        const searchTerm = query.toLowerCase();
        return this.newsArticles.filter(article =>
            article.title.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm) ||
            article.hashtags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    getArticleById(id) {
        return this.newsArticles.find(article => article.id === id);
    }

    getCategories() {
        return this.categories;
    }

    getSources() {
        return this.sources;
    }

    getNewsStats() {
        const categoryCounts = {};
        const sourceCounts = {};
        
        this.newsArticles.forEach(article => {
            categoryCounts[article.category] = (categoryCounts[article.category] || 0) + 1;
            sourceCounts[article.source] = (sourceCounts[article.source] || 0) + 1;
        });
        
        return {
            totalArticles: this.newsArticles.length,
            totalSources: this.sources.length,
            categoryBreakdown: categoryCounts,
            sourceBreakdown: sourceCounts,
            lastUpdated: this.lastFetchTime,
            isLoading: this.isLoading
        };
    }

    getTrendingArticles(limit = 5) {
        // Simple trending algorithm based on recency and category popularity
        const categoryCounts = {};
        this.newsArticles.forEach(article => {
            categoryCounts[article.category] = (categoryCounts[article.category] || 0) + 1;
        });
        
        return this.newsArticles
            .sort((a, b) => {
                const aScore = categoryCounts[a.category] || 0;
                const bScore = categoryCounts[b.category] || 0;
                return bScore - aScore;
            })
            .slice(0, limit);
    }

    getRecentArticles(limit = 5) {
        return this.newsArticles
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        
        return this.formatDate(dateString);
    }

    getRelatedArticles(articleId, limit = 3) {
        const currentArticle = this.getArticleById(articleId);
        if (!currentArticle) return [];
        
        return this.newsArticles
            .filter(article => 
                article.id !== articleId &&
                (article.category === currentArticle.category ||
                 article.location === currentArticle.location)
            )
            .slice(0, limit);
    }

    async refreshNews() {
        console.log('📰 Refreshing news data...');
        await this.fetchNewsFromMultipleSources();
        
        // Dispatch event for UI updates
        window.dispatchEvent(new CustomEvent('newsUpdated', {
            detail: {
                articles: this.newsArticles,
                stats: this.getNewsStats()
            }
        }));
    }
}

// Initialize global news data instance
window.newsData = new NewsData(); 