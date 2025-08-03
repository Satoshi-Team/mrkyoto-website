// API Configuration for MrKyoto News Hub
// Replace 'demo' with your actual API keys for full functionality

const API_CONFIG = {
    // NewsAPI.org - Get free API key at https://newsapi.org/
    NEWSAPI_KEY: '1ba9b49d995949af901bf841dfa7ebac', // Your NewsAPI key
    
    // GNews API - Disabled (not using GNews)
    GNEWS_KEY: null, // GNews disabled
    
    // RSS Feeds (no API key required)
    RSS_FEEDS: [
        'https://rss.cnn.com/rss/edition_asia.rss',
        'https://feeds.bbci.co.uk/news/world/asia/rss.xml',
        'https://www.japantimes.co.jp/feed/',
        'https://www3.nhk.or.jp/rss/news/cat0.xml',
        'https://feeds.reuters.com/reuters/APTopNews'
    ],
    
    // CORS Proxy for RSS feeds
    CORS_PROXY: 'https://api.allorigins.win/get?url=',
    
    // Auto-refresh interval (in milliseconds)
    REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
    
    // Search keywords for Kyoto/Japan news
    SEARCH_KEYWORDS: ['kyoto', 'japan', 'japanese', 'tokyo', 'osaka'],
    
    // Categories to filter news
    CATEGORIES: [
        'Tourism', 'Culture', 'Arts', 'Environment', 'Real Estate', 
        'Food', 'Business', 'Technology', 'Education', 'Health'
    ],
    
    // Local news sources (simulated)
    LOCAL_SOURCES: [
        {
            name: 'Kyoto Times',
            url: 'https://www.kyototimes.com',
            category: 'General News'
        },
        {
            name: 'Kyoto Heritage News',
            url: 'https://www.kyotoheritage.com',
            category: 'Cultural News'
        }
    ]
};

// Instructions for setting up API keys:
/*
1. NewsAPI.org (Free tier: 1,000 requests/day)
   - Go to https://newsapi.org/
   - Sign up for a free account
   - Get your API key
   - Replace 'demo' with your key

2. GNews API (Free tier: 100 requests/day)
   - Go to https://gnews.io/
   - Sign up for a free account
   - Get your API key
   - Replace 'demo' with your key

3. RSS Feeds (No API key required)
   - These are already configured and working
   - You can add more RSS feeds to the RSS_FEEDS array

4. CORS Proxy
   - The current setup uses allorigins.win
   - You can change this to any CORS proxy service

Usage:
- With demo keys: Limited functionality, fallback to local data
- With real API keys: Full real-time news from multiple sources
- RSS feeds: Always work (no API key needed)
*/

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
} else {
    window.API_CONFIG = API_CONFIG;
} 