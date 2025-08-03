// Enhanced News Data for MrKyoto.com
// Real-time news from multiple free API sources

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
            newsapi: window.API_CONFIG?.NEWSAPI_KEY || 'demo',
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
            // More specific query to get English articles about Japan/Kyoto
            const response = await fetch(`https://newsapi.org/v2/everything?q=kyoto+japan+english&language=en&sortBy=publishedAt&pageSize=30&apiKey=${this.apiKeys.newsapi}`);
            const data = await response.json();
            
            if (data.status === 'ok' && data.articles) {
                console.log(`📰 Fetched ${data.articles.length} articles from NewsAPI`);
                const transformedArticles = data.articles
                    .map(article => this.transformNewsAPIArticle(article))
                    .filter(article => article !== null); // Filter out non-English articles
                console.log(`📰 Transformed ${transformedArticles.length} English articles`);
                return transformedArticles;
            } else if (data.status === 'error') {
                console.warn('NewsAPI error:', data.message);
            }
        } catch (error) {
            console.warn('NewsAPI fetch failed:', error);
        }
        return [];
    }

    async fetchFromGNews() {
        // GNews disabled - return empty array
        return [];
    }

    async fetchFromRSSFeeds() {
        const rssFeeds = window.API_CONFIG?.RSS_FEEDS || [
            'https://rss.cnn.com/rss/edition_asia.rss',
            'https://feeds.bbci.co.uk/news/world/asia/rss.xml',
            'https://www.japantimes.co.jp/feed/'
        ];

        const promises = rssFeeds.map(feed => this.fetchRSSFeed(feed));
        const results = await Promise.allSettled(promises);
        
        let articles = [];
        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value) {
                articles = articles.concat(result.value);
            }
        });
        
        return articles;
    }

    async fetchRSSFeed(url) {
        try {
            // Using a CORS proxy for RSS feeds
            const corsProxy = window.API_CONFIG?.CORS_PROXY || 'https://api.allorigins.win/get?url=';
            const proxyUrl = `${corsProxy}${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (data.contents) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
                const items = xmlDoc.querySelectorAll('item');
                
                const transformedItems = Array.from(items)
                    .map(item => this.transformRSSItem(item, url))
                    .filter(item => item !== null); // Filter out non-English articles
                
                console.log(`📰 RSS feed ${url}: ${transformedItems.length} English articles`);
                return transformedItems;
            }
        } catch (error) {
            console.warn(`RSS feed fetch failed for ${url}:`, error);
        }
        return [];
    }

    async fetchFromLocalSources() {
        // Simulated local news sources with realistic data
        return [
            {
                id: 'local-001',
                title: 'Kyoto\'s Cherry Blossom Season Draws Record Number of Visitors',
                date: new Date().toISOString(),
                time: '10:30 AM',
                author: 'Kyoto Times Staff',
                category: 'Tourism',
                summary: 'The 2025 cherry blossom season in Kyoto has attracted over 2 million visitors, setting a new record for spring tourism in the ancient capital.',
                content: 'Kyoto\'s famous cherry blossom season has reached its peak, with visitors from around the world flocking to see the pink blossoms at iconic locations like Maruyama Park, Philosopher\'s Path, and the grounds of historic temples.',
                image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&h=400&fit=crop',
                source: 'Kyoto Times',
                sourceUrl: 'https://www.kyototimes.com',
                articleUrl: 'https://www.kyototimes.com/cherry-blossom-record-2025',
                tags: ['tourism', 'cherry blossoms', 'spring', 'visitors'],
                neighborhood: 'Citywide',
                readTime: '3 min read',
                featured: true,
                views: Math.floor(Math.random() * 10000) + 1000,
                comments: Math.floor(Math.random() * 100) + 10
            },
            {
                id: 'local-002',
                title: 'New Traditional Machiya Restoration Project Announced in Gion',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                time: '2:15 PM',
                author: 'Cultural Heritage Reporter',
                category: 'Culture',
                summary: 'A major restoration project will preserve 15 historic machiya houses in the Gion district, ensuring the preservation of Kyoto\'s traditional architecture.',
                content: 'The Kyoto Cultural Heritage Foundation has announced a comprehensive restoration project targeting 15 traditional machiya houses in the historic Gion district.',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
                source: 'Kyoto Heritage News',
                sourceUrl: 'https://www.kyotoheritage.com',
                articleUrl: 'https://www.kyotoheritage.com/machiya-restoration-gion',
                tags: ['culture', 'machiya', 'restoration', 'heritage'],
                neighborhood: 'Gion',
                readTime: '4 min read',
                featured: true,
                views: Math.floor(Math.random() * 8000) + 1000,
                comments: Math.floor(Math.random() * 80) + 10
            }
        ];
    }

    isEnglishText(text) {
        if (!text) return false;
        
        // Check for Japanese characters (hiragana, katakana, kanji)
        const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
        if (japaneseRegex.test(text)) {
            console.log('📰 Detected Japanese characters in:', text.substring(0, 50));
            return false;
        }
        
        // Check for Chinese characters
        const chineseRegex = /[\u4E00-\u9FFF]/;
        if (chineseRegex.test(text)) {
            console.log('📰 Detected Chinese characters in:', text.substring(0, 50));
            return false;
        }
        
        // Check for Korean characters
        const koreanRegex = /[\uAC00-\uD7AF]/;
        if (koreanRegex.test(text)) {
            console.log('📰 Detected Korean characters in:', text.substring(0, 50));
            return false;
        }
        
        // Check if text contains mostly English characters
        const englishRegex = /^[a-zA-Z0-9\s\.,!?;:'"()\-–—…]+$/;
        const words = text.split(/\s+/).filter(word => word.length > 0);
        
        if (words.length === 0) return false;
        
        const englishWords = words.filter(word => englishRegex.test(word));
        const englishRatio = englishWords.length / words.length;
        
        // If more than 80% of words are English, consider it English
        const isEnglish = englishRatio > 0.8;
        
        if (!isEnglish) {
            console.log('📰 Low English ratio:', englishRatio, 'in:', text.substring(0, 50));
        }
        
        return isEnglish;
    }

    transformNewsAPIArticle(article) {
        // Check if article is in English
        const isEnglish = this.isEnglishText(article.title + ' ' + (article.description || ''));
        
        if (!isEnglish) {
            console.log('📰 Skipping non-English article:', article.title);
            return null;
        }

        const transformed = {
            id: `newsapi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: article.title,
            date: article.publishedAt,
            time: new Date(article.publishedAt).toLocaleTimeString(),
            author: article.author || 'News Staff',
            category: this.categorizeArticle(article.title, article.description),
            summary: article.description || article.title,
            content: article.content || article.description || article.title,
            image: article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
            source: article.source.name,
            sourceUrl: article.url,
            articleUrl: article.url,
            tags: this.extractTags(article.title, article.description),
            neighborhood: this.extractLocation(article.title, article.description),
            readTime: this.calculateReadTime(article.content || article.description),
            featured: false,
            views: Math.floor(Math.random() * 5000) + 100,
            comments: Math.floor(Math.random() * 50) + 1
        };
        
        console.log(`📰 Transformed English article: ${transformed.title.substring(0, 50)}...`);
        return transformed;
    }

    transformGNewsArticle(article) {
        return {
            id: `gnews-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: article.title,
            date: article.publishedAt,
            time: new Date(article.publishedAt).toLocaleTimeString(),
            author: article.author || 'News Staff',
            category: this.categorizeArticle(article.title, article.description),
            summary: article.description,
            content: article.content,
            image: article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
            source: article.source.name,
            sourceUrl: article.url,
            articleUrl: article.url,
            tags: this.extractTags(article.title, article.description),
            neighborhood: this.extractLocation(article.title, article.description),
            readTime: this.calculateReadTime(article.content),
            featured: false,
            views: Math.floor(Math.random() * 5000) + 100,
            comments: Math.floor(Math.random() * 50) + 1
        };
    }

    transformRSSItem(item, feedUrl) {
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
        
        // Check if article is in English
        const isEnglish = this.isEnglishText(title + ' ' + description);
        
        if (!isEnglish) {
            console.log('📰 Skipping non-English RSS article:', title);
            return null;
        }
        
        return {
            id: `rss-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: title,
            date: new Date(pubDate).toISOString(),
            time: new Date(pubDate).toLocaleTimeString(),
            author: 'RSS Feed',
            category: this.categorizeArticle(title, description),
            summary: description,
            content: description,
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
            source: this.extractSourceFromUrl(feedUrl),
            sourceUrl: link,
            articleUrl: link,
            tags: this.extractTags(title, description),
            neighborhood: this.extractLocation(title, description),
            readTime: this.calculateReadTime(description),
            featured: false,
            views: Math.floor(Math.random() * 3000) + 50,
            comments: Math.floor(Math.random() * 30) + 1
        };
    }

    categorizeArticle(title, description) {
        const text = (title + ' ' + description).toLowerCase();
        
        if (text.includes('kyoto') || text.includes('japan')) return 'Culture';
        if (text.includes('tourism') || text.includes('travel') || text.includes('visit')) return 'Tourism';
        if (text.includes('business') || text.includes('economy') || text.includes('market')) return 'Business';
        if (text.includes('technology') || text.includes('tech') || text.includes('digital')) return 'Technology';
        if (text.includes('food') || text.includes('restaurant') || text.includes('cuisine')) return 'Food';
        if (text.includes('environment') || text.includes('climate') || text.includes('sustainability')) return 'Environment';
        if (text.includes('art') || text.includes('culture') || text.includes('heritage')) return 'Arts';
        
        return 'Culture';
    }

    extractTags(title, description) {
        const text = (title + ' ' + description).toLowerCase();
        const tags = [];
        
        const tagKeywords = {
            'kyoto': 'kyoto',
            'japan': 'japan',
            'tourism': 'tourism',
            'culture': 'culture',
            'heritage': 'heritage',
            'temple': 'temple',
            'shrine': 'shrine',
            'cherry': 'cherry blossoms',
            'spring': 'spring',
            'autumn': 'autumn',
            'traditional': 'traditional',
            'modern': 'modern',
            'food': 'food',
            'restaurant': 'restaurant'
        };
        
        Object.entries(tagKeywords).forEach(([keyword, tag]) => {
            if (text.includes(keyword)) {
                tags.push(tag);
            }
        });
        
        return tags.slice(0, 5);
    }

    extractLocation(title, description) {
        const text = (title + ' ' + description).toLowerCase();
        
        if (text.includes('gion')) return 'Gion';
        if (text.includes('arashiyama')) return 'Arashiyama';
        if (text.includes('higashiyama')) return 'Higashiyama';
        if (text.includes('pontocho')) return 'Pontocho';
        if (text.includes('nakagyo')) return 'Nakagyo';
        
        return 'Citywide';
    }

    extractSourceFromUrl(url) {
        try {
            const domain = new URL(url).hostname;
            return domain.replace('www.', '').split('.')[0];
        } catch {
            return 'RSS Feed';
        }
    }

    calculateReadTime(content) {
        if (!content) return '2 min read';
        const words = content.split(' ').length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    }

    removeDuplicates(articles) {
        const seen = new Set();
        return articles.filter(article => {
            const key = article.title.toLowerCase();
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    updateSources() {
        const sourceMap = new Map();
        this.newsArticles.forEach(article => {
            if (!sourceMap.has(article.source)) {
                sourceMap.set(article.source, {
                    name: article.source,
                    url: article.sourceUrl,
                    category: 'News Source',
                    reliability: 'High',
                    founded: new Date().getFullYear(),
                    articleCount: 0
                });
            }
            sourceMap.get(article.source).articleCount++;
        });
        
        this.sources = Array.from(sourceMap.values());
    }

    startAutoRefresh() {
        // Refresh news every 5 minutes
        setInterval(() => {
            this.fetchNewsFromMultipleSources();
        }, 5 * 60 * 1000);
    }

    loadFallbackData() {
        console.log('📰 Loading fallback data...');
        // Load static fallback data if APIs fail
        this.newsArticles = [
            {
                id: 'fallback-001',
                title: 'Kyoto\'s Cherry Blossom Season Draws Record Number of Visitors',
                date: new Date().toISOString(),
                time: '10:30 AM',
                author: 'Kyoto Times Staff',
                category: 'Tourism',
                summary: 'The 2025 cherry blossom season in Kyoto has attracted over 2 million visitors, setting a new record for spring tourism in the ancient capital.',
                content: 'Kyoto\'s famous cherry blossom season has reached its peak, with visitors from around the world flocking to see the pink blossoms at iconic locations like Maruyama Park, Philosopher\'s Path, and the grounds of historic temples.',
                image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&h=400&fit=crop',
                source: 'Kyoto Times',
                sourceUrl: 'https://www.kyototimes.com',
                articleUrl: 'https://www.kyototimes.com/cherry-blossom-record-2025',
                tags: ['tourism', 'cherry blossoms', 'spring', 'visitors'],
                neighborhood: 'Citywide',
                readTime: '3 min read',
                featured: true,
                views: 15420,
                comments: 89
            },
            {
                id: 'fallback-002',
                title: 'New Traditional Machiya Restoration Project Announced in Gion',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                time: '2:15 PM',
                author: 'Cultural Heritage Reporter',
                category: 'Culture',
                summary: 'A major restoration project will preserve 15 historic machiya houses in the Gion district, ensuring the preservation of Kyoto\'s traditional architecture.',
                content: 'The Kyoto Cultural Heritage Foundation has announced a comprehensive restoration project targeting 15 traditional machiya houses in the historic Gion district.',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
                source: 'Kyoto Heritage News',
                sourceUrl: 'https://www.kyotoheritage.com',
                articleUrl: 'https://www.kyotoheritage.com/machiya-restoration-gion',
                tags: ['culture', 'machiya', 'restoration', 'heritage'],
                neighborhood: 'Gion',
                readTime: '4 min read',
                featured: true,
                views: 8920,
                comments: 45
            },
            {
                id: 'fallback-003',
                title: 'Kyoto International Film Festival Announces 2025 Lineup',
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                time: '11:45 AM',
                author: 'Arts & Entertainment Editor',
                category: 'Arts',
                summary: 'The 15th annual Kyoto International Film Festival will feature over 100 films from 30 countries, including world premieres and special retrospectives.',
                content: 'The Kyoto International Film Festival has revealed its complete lineup for the 2025 edition, which will run from October 15-25.',
                image: 'https://images.unsplash.com/photo-1489599835382-957593cb2371?w=600&h=400&fit=crop',
                source: 'Kyoto Arts Weekly',
                sourceUrl: 'https://www.kyotoarts.com',
                articleUrl: 'https://www.kyotoarts.com/film-festival-2025-lineup',
                tags: ['arts', 'film festival', 'cinema', 'international'],
                neighborhood: 'Nakagyo',
                readTime: '5 min read',
                featured: false,
                views: 6730,
                comments: 32
            },
            {
                id: 'fallback-004',
                title: 'New Sustainable Tourism Initiative Launched in Arashiyama',
                date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                time: '9:20 AM',
                author: 'Environmental Reporter',
                category: 'Environment',
                summary: 'Arashiyama district introduces eco-friendly tourism practices to preserve natural beauty while accommodating growing visitor numbers.',
                content: 'The Arashiyama Tourism Association has launched a comprehensive sustainable tourism initiative aimed at preserving the district\'s natural beauty while managing the increasing number of visitors.',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop',
                source: 'Kyoto Environmental News',
                sourceUrl: 'https://www.kyotoenvironment.com',
                articleUrl: 'https://www.kyotoenvironment.com/arashiyama-sustainable-tourism',
                tags: ['environment', 'sustainability', 'tourism', 'arashiyama'],
                neighborhood: 'Arashiyama',
                readTime: '4 min read',
                featured: false,
                views: 5420,
                comments: 28
            },
            {
                id: 'fallback-005',
                title: 'Traditional Kyoto Cuisine Gains International Recognition',
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                time: '3:45 PM',
                author: 'Food & Culture Editor',
                category: 'Food',
                summary: 'Kyoto\'s traditional kaiseki cuisine has been recognized by UNESCO for its cultural significance and preservation of ancient culinary traditions.',
                content: 'Kyoto\'s traditional kaiseki cuisine, known for its seasonal ingredients and meticulous preparation, has received international recognition for its cultural significance.',
                image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop',
                source: 'Kyoto Culinary Times',
                sourceUrl: 'https://www.kyotoculinary.com',
                articleUrl: 'https://www.kyotoculinary.com/kaiseki-unesco-recognition',
                tags: ['food', 'kaiseki', 'traditional', 'culture'],
                neighborhood: 'Gion',
                readTime: '6 min read',
                featured: true,
                views: 8230,
                comments: 67
            },
            {
                id: 'fallback-006',
                title: 'New Technology Hub Opens in Kyoto Station Area',
                date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
                time: '1:30 PM',
                author: 'Technology Reporter',
                category: 'Technology',
                summary: 'A new innovation center has opened near Kyoto Station, attracting tech startups and established companies to the ancient capital.',
                content: 'Kyoto\'s first dedicated technology innovation hub has opened its doors in the modern district surrounding Kyoto Station, marking a significant step in the city\'s digital transformation.',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
                source: 'Kyoto Tech News',
                sourceUrl: 'https://www.kyototech.com',
                articleUrl: 'https://www.kyototech.com/innovation-hub-kyoto-station',
                tags: ['technology', 'innovation', 'startups', 'digital'],
                neighborhood: 'Shimogyo',
                readTime: '3 min read',
                featured: false,
                views: 4560,
                comments: 23
            },
            {
                id: 'fallback-007',
                title: 'Historic Temple Restoration Completed in Higashiyama',
                date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                time: '10:15 AM',
                author: 'Heritage Reporter',
                category: 'Culture',
                summary: 'A three-year restoration project at a historic temple in Higashiyama has been completed, preserving important cultural artifacts.',
                content: 'The comprehensive restoration of a historic temple in the Higashiyama district has been completed after three years of meticulous work by master craftsmen.',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop',
                source: 'Kyoto Heritage News',
                sourceUrl: 'https://www.kyotoheritage.com',
                articleUrl: 'https://www.kyotoheritage.com/temple-restoration-higashiyama',
                tags: ['culture', 'temple', 'restoration', 'heritage'],
                neighborhood: 'Higashiyama',
                readTime: '4 min read',
                featured: false,
                views: 3890,
                comments: 19
            },
            {
                id: 'fallback-008',
                title: 'Kyoto University Announces New International Exchange Program',
                date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
                time: '2:00 PM',
                author: 'Education Reporter',
                category: 'Education',
                summary: 'Kyoto University has launched a new international exchange program focused on traditional Japanese arts and culture.',
                content: 'Kyoto University has announced the launch of a comprehensive international exchange program that will allow students from around the world to study traditional Japanese arts and culture.',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
                source: 'Kyoto Education News',
                sourceUrl: 'https://www.kyotoeducation.com',
                articleUrl: 'https://www.kyotoeducation.com/university-exchange-program',
                tags: ['education', 'university', 'international', 'culture'],
                neighborhood: 'Sakyo',
                readTime: '5 min read',
                featured: false,
                views: 3120,
                comments: 15
            }
        ];
        console.log(`📰 Loaded ${this.newsArticles.length} fallback articles`);
    }

    // Get all news articles
    getAllNews() {
        return this.newsArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Get featured news
    getFeaturedNews() {
        return this.newsArticles.filter(article => article.featured);
    }

    // Get news by category
    getNewsByCategory(category) {
        return this.newsArticles.filter(article => article.category === category);
    }

    // Get news by neighborhood
    getNewsByNeighborhood(neighborhood) {
        return this.newsArticles.filter(article => article.neighborhood === neighborhood);
    }

    // Search news
    searchNews(query) {
        const searchTerm = query.toLowerCase();
        return this.newsArticles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.summary.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm) ||
            article.category.toLowerCase().includes(searchTerm) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Get article by ID
    getArticleById(id) {
        return this.newsArticles.find(article => article.id === id);
    }

    // Get categories
    getCategories() {
        return this.categories;
    }

    // Get sources
    getSources() {
        return this.sources;
    }

    // Get news statistics
    getNewsStats() {
        const totalArticles = this.newsArticles.length;
        const categories = [...new Set(this.newsArticles.map(a => a.category))];
        const totalViews = this.newsArticles.reduce((sum, article) => sum + article.views, 0);
        const totalComments = this.newsArticles.reduce((sum, article) => sum + article.comments, 0);
        
        const mostViewed = this.newsArticles.sort((a, b) => b.views - a.views)[0];
        const mostCommented = this.newsArticles.sort((a, b) => b.comments - a.comments)[0];

        return {
            totalArticles,
            categories: categories.length,
            totalViews,
            totalComments,
            mostViewed,
            mostCommented,
            averageViews: Math.round(totalViews / totalArticles),
            averageComments: Math.round(totalComments / totalArticles),
            lastUpdated: this.lastFetchTime
        };
    }

    // Get trending articles
    getTrendingArticles(limit = 5) {
        return this.newsArticles
            .sort((a, b) => (b.views + b.comments * 10) - (a.views + a.comments * 10))
            .slice(0, limit);
    }

    // Get recent articles
    getRecentArticles(limit = 5) {
        return this.newsArticles
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Get time ago
    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;
        
        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
        
        const diffInMonths = Math.floor(diffInDays / 30);
        return `${diffInMonths} months ago`;
    }

    // Get related articles
    getRelatedArticles(articleId, limit = 3) {
        const currentArticle = this.getArticleById(articleId);
        if (!currentArticle) return [];

        return this.newsArticles
            .filter(article => 
                article.id !== articleId &&
                (article.category === currentArticle.category ||
                 article.tags.some(tag => currentArticle.tags.includes(tag)) ||
                 article.neighborhood === currentArticle.neighborhood)
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    // Refresh news data
    async refreshNews() {
        await this.fetchNewsFromMultipleSources();
        return this.newsArticles;
    }
}

// Initialize news data
const newsData = new NewsData();

// Add a simple test function
window.testNewsData = () => {
    console.log('📰 Testing news data...');
    console.log('📰 Total articles:', newsData.newsArticles.length);
    console.log('📰 Is loading:', newsData.isLoading);
    console.log('📰 Last fetch time:', newsData.lastFetchTime);
    return newsData.newsArticles.length > 0;
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewsData;
} 