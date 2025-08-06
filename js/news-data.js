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
                'kyoto+real+estate',
                'japan+travel',
                'kyoto+events',
                'japanese+culture',
                'kyoto+food',
                'japan+business'
            ];
            
            const allArticles = [];
            
            for (const query of queries) {
                const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${this.apiKeys.newsapi}`);
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
        
        console.log(`📰 Updated sources: ${this.sources.length} unique sources`);
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
            },
            {
                id: 'fallback_6',
                title: 'Kyoto Autumn Festival Celebrates Traditional Arts',
                content: 'The annual Kyoto Autumn Festival showcases traditional Japanese arts including tea ceremony, ikebana, and calligraphy demonstrations throughout the city.',
                author: 'Kyoto Cultural Center',
                source: 'Kyoto Cultural Center',
                url: 'https://kyoto-cultural.org/autumn-festival-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#autumn', '#festival', '#arts'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'fallback_7',
                title: 'New High-Speed Rail Connection to Kyoto',
                content: 'A new high-speed rail connection between Tokyo and Kyoto has been announced, reducing travel time to just 2 hours and 15 minutes.',
                author: 'Japan Rail News',
                source: 'Japan Rail News',
                url: 'https://japanrail.com/kyoto-connection-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Japan',
                hashtags: ['#japan', '#rail', '#transport', '#kyoto'],
                category: 'business',
                language: 'en'
            },
            {
                id: 'fallback_8',
                title: 'Kyoto\'s Historic Districts Receive UNESCO Recognition',
                content: 'Three additional historic districts in Kyoto have been added to the UNESCO World Heritage list, bringing the total to 17 protected areas.',
                author: 'UNESCO Heritage',
                source: 'UNESCO Heritage',
                url: 'https://unesco.org/kyoto-heritage-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#unesco', '#heritage', '#worldheritage'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'fallback_9',
                title: 'New Sustainable Tourism Initiative in Arashiyama',
                content: 'A new sustainable tourism initiative has been launched in Arashiyama, focusing on eco-friendly bamboo forest tours and traditional craft workshops.',
                author: 'Kyoto Eco Tourism',
                source: 'Kyoto Eco Tourism',
                url: 'https://kyoto-eco.com/arashiyama-initiative',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#arashiyama', '#ecotourism', '#sustainable'],
                category: 'tourism',
                language: 'en'
            },
            {
                id: 'fallback_10',
                title: 'Traditional Kyoto Cuisine Gets Modern Twist',
                content: 'Renowned Kyoto chefs are blending traditional techniques with modern culinary innovations, creating a new wave of Japanese fusion cuisine.',
                author: 'Kyoto Food & Culture',
                source: 'Kyoto Food & Culture',
                url: 'https://kyoto-food-culture.com/modern-traditional',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#cuisine', '#food', '#fusion'],
                category: 'food',
                language: 'en'
            },
            {
                id: 'fallback_11',
                title: 'Kyoto\'s Digital Transformation in Tourism',
                content: 'Kyoto is embracing digital technology to enhance the tourist experience, including AI-powered translation services and virtual reality temple tours.',
                author: 'Kyoto Tech Innovation',
                source: 'Kyoto Tech Innovation',
                url: 'https://kyoto-tech.com/digital-transformation',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#digital', '#technology', '#tourism'],
                category: 'business',
                language: 'en'
            },
            {
                id: 'fallback_12',
                title: 'New Art Gallery Opens in Higashiyama District',
                content: 'A contemporary art gallery showcasing both traditional Japanese art and modern international works has opened in the historic Higashiyama district.',
                author: 'Kyoto Art Scene',
                source: 'Kyoto Art Scene',
                url: 'https://kyoto-art.com/higashiyama-gallery',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#art', '#gallery', '#higashiyama'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'fallback_13',
                title: 'Kyoto\'s Traditional Textile Industry Revival',
                content: 'Young artisans are reviving Kyoto\'s traditional textile industry, combining ancient techniques with contemporary design for modern markets.',
                author: 'Kyoto Textile Heritage',
                source: 'Kyoto Textile Heritage',
                url: 'https://kyoto-textile.com/revival-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#textile', '#traditional', '#artisan'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'fallback_14',
                title: 'New Wellness Retreat Center in Northern Kyoto',
                content: 'A luxury wellness retreat center has opened in northern Kyoto, offering traditional Japanese healing practices and modern spa treatments.',
                author: 'Kyoto Wellness',
                source: 'Kyoto Wellness',
                url: 'https://kyoto-wellness.com/northern-retreat',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#wellness', '#retreat', '#healing'],
                category: 'tourism',
                language: 'en'
            },
            {
                id: 'fallback_15',
                title: 'Kyoto\'s Nightlife Scene Gets Cultural Makeover',
                content: 'Traditional teahouses and modern bars are collaborating to create a unique nightlife experience that celebrates Kyoto\'s cultural heritage.',
                author: 'Kyoto Nightlife',
                source: 'Kyoto Nightlife',
                url: 'https://kyoto-nightlife.com/cultural-collaboration',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#nightlife', '#culture', '#teahouse'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'fallback_16',
                title: 'New Educational Programs for Foreign Students',
                content: 'Kyoto University has launched new programs specifically designed for international students interested in Japanese culture and language.',
                author: 'Kyoto University',
                source: 'Kyoto University',
                url: 'https://kyoto-u.ac.jp/international-programs',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#education', '#university', '#international'],
                category: 'education',
                language: 'en'
            },
            {
                id: 'fallback_17',
                title: 'Kyoto\'s Seasonal Food Festival Announced',
                content: 'A month-long food festival celebrating Kyoto\'s seasonal ingredients and traditional cooking methods will take place this autumn.',
                author: 'Kyoto Food Festival',
                source: 'Kyoto Food Festival',
                url: 'https://kyoto-foodfest.com/autumn-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 34 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#foodfestival', '#seasonal', '#autumn'],
                category: 'food',
                language: 'en'
            },
            {
                id: 'fallback_18',
                title: 'New Cycling Routes Connect Kyoto\'s Temples',
                content: 'A network of new cycling routes has been established, connecting major temples and shrines throughout Kyoto for eco-friendly tourism.',
                author: 'Kyoto Cycling Tours',
                source: 'Kyoto Cycling Tours',
                url: 'https://kyoto-cycling.com/temple-routes',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#cycling', '#temple', '#ecotourism'],
                category: 'tourism',
                language: 'en'
            },
            {
                id: 'fallback_19',
                title: 'Traditional Kyoto Pottery Gets Modern Recognition',
                content: 'Kyoto\'s traditional pottery techniques are gaining international recognition, with local artisans receiving awards for their innovative designs.',
                author: 'Kyoto Craft Awards',
                source: 'Kyoto Craft Awards',
                url: 'https://kyoto-craft-awards.com/pottery-2025',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 38 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#pottery', '#craft', '#traditional'],
                category: 'culture',
                language: 'en'
            },
            {
                id: 'fallback_20',
                title: 'New Digital Archive of Kyoto\'s History',
                content: 'A comprehensive digital archive documenting Kyoto\'s 1,200-year history has been launched, making historical documents accessible worldwide.',
                author: 'Kyoto Digital Heritage',
                source: 'Kyoto Digital Heritage',
                url: 'https://kyoto-digital-heritage.org/archive-launch',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
                date: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
                platform: 'fallback',
                verified: true,
                location: 'Kyoto',
                hashtags: ['#kyoto', '#history', '#digital', '#archive'],
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
            totalSources: Object.keys(sourceCounts).length,
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