# News API Setup Guide for MrKyoto News Hub

This guide will help you set up real-time news functionality using free API sources.

## 🚀 Quick Start

1. **Get Free API Keys** (Optional but recommended)
2. **Update Configuration**
3. **Test the News Page**

## 📰 Available News Sources

### 1. NewsAPI.org (Active)
- **API Key**: Configured and active
- **Free Tier**: 1,000 requests/day
- **Features**: Real-time news, multiple languages, categories

### 2. RSS Feeds (Always Available)
- **No API Key Required**
- **Sources**: CNN, BBC, Japan Times, NHK, Reuters
- **Features**: Real-time updates, no rate limits

### 3. Local Sources (Simulated)
- **No API Key Required**
- **Features**: Kyoto-specific news and updates

## 🔧 Setup Instructions

### Step 1: API Configuration

The NewsAPI key is already configured in `js/api-config.js`:

```javascript
const API_CONFIG = {
    // NewsAPI.org - Active and configured
    NEWSAPI_KEY: '1ba9b49d995949af901bf841dfa7ebac',
    
    // GNews API - Disabled (not using GNews)
    GNEWS_KEY: null,
    
    // RSS feeds (no changes needed)
    RSS_FEEDS: [
        'https://rss.cnn.com/rss/edition_asia.rss',
        'https://feeds.bbci.co.uk/news/world/asia/rss.xml',
        'https://www.japantimes.co.jp/feed/',
        'https://www3.nhk.or.jp/rss/news/cat0.xml',
        'https://feeds.reuters.com/reuters/APTopNews'
    ],
    
    // Other settings remain the same
    CORS_PROXY: 'https://api.allorigins.win/get?url=',
    REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
    SEARCH_KEYWORDS: ['kyoto', 'japan', 'japanese', 'tokyo', 'osaka'],
    CATEGORIES: [
        'Tourism', 'Culture', 'Arts', 'Environment', 'Real Estate', 
        'Food', 'Business', 'Technology', 'Education', 'Health'
    ]
};
```

### Step 2: Test the News Page

1. Open `http://localhost:8000/news/`
2. Check the browser console for any errors
3. Verify that news articles are loading from NewsAPI
4. Test the refresh functionality
5. You should see real-time news about Kyoto and Japan

## 🎯 Features

### Real-time News Updates
- **Auto-refresh**: Every 5 minutes
- **Manual refresh**: Click "Refresh News" button
- **Live indicators**: Shows when data was last updated

### Multiple News Sources
- **NewsAPI**: International news about Kyoto/Japan (1,000 requests/day)
- **RSS Feeds**: Major news outlets (CNN, BBC, Japan Times, etc.)
- **Local Sources**: Simulated Kyoto-specific news

### Smart Content Processing
- **Automatic categorization**: Articles are categorized based on content
- **Tag extraction**: Relevant keywords are extracted
- **Location detection**: Identifies Kyoto neighborhoods mentioned
- **Duplicate removal**: Prevents duplicate articles

### User Interface
- **Search functionality**: Search by keywords, categories, locations
- **Filter options**: By category, time, source, neighborhood
- **Sort options**: Latest, most popular, trending
- **View modes**: Grid and list views
- **Responsive design**: Works on all devices

## 🔍 Troubleshooting

### No News Loading
1. Check browser console for errors
2. Verify API keys are correct
3. Check internet connection
4. RSS feeds should work even without API keys

### API Rate Limits
- NewsAPI: 1,000 requests/day (configured and active)
- RSS feeds: No limits

### CORS Issues
- RSS feeds use a CORS proxy
- If proxy fails, try alternative: `https://cors-anywhere.herokuapp.com/`

### Fallback Mode
If APIs fail, the system automatically falls back to:
- RSS feeds (if available)
- Local simulated news
- Static fallback data

## 📊 Analytics Dashboard

The news page includes:
- **Total articles count**
- **Today's articles**
- **Source distribution**
- **Category breakdown**
- **Trending articles**
- **Interactive charts**

## 🎨 Customization

### Add More RSS Feeds
Edit `RSS_FEEDS` in `api-config.js`:

```javascript
RSS_FEEDS: [
    'https://rss.cnn.com/rss/edition_asia.rss',
    'https://feeds.bbci.co.uk/news/world/asia/rss.xml',
    'https://www.japantimes.co.jp/feed/',
    'https://www3.nhk.or.jp/rss/news/cat0.xml',
    'https://feeds.reuters.com/reuters/APTopNews',
    // Add your own RSS feeds here
    'https://your-news-site.com/feed.xml'
]
```

### Change Refresh Interval
Edit `REFRESH_INTERVAL` in `api-config.js`:

```javascript
REFRESH_INTERVAL: 10 * 60 * 1000, // 10 minutes
```

### Add Custom Categories
Edit `CATEGORIES` in `api-config.js`:

```javascript
CATEGORIES: [
    'Tourism', 'Culture', 'Arts', 'Environment', 'Real Estate', 
    'Food', 'Business', 'Technology', 'Education', 'Health',
    // Add your own categories
    'Sports', 'Politics', 'Entertainment'
]
```

## 🔒 Security Notes

- API keys are stored in client-side JavaScript
- For production, consider server-side API calls
- RSS feeds are safe to use (no API keys)
- CORS proxy is used for RSS feeds

## 📈 Performance

- **Lazy loading**: Images load as needed
- **Caching**: Articles are cached locally
- **Efficient updates**: Only new articles are fetched
- **Compression**: Images are optimized

## 🆘 Support

If you encounter issues:
1. Check browser console for errors
2. Verify API keys are valid
3. Test with RSS feeds only (no API keys needed)
4. Check network connectivity

## 🎉 Success Indicators

You'll know it's working when:
- ✅ News articles appear on the page
- ✅ "Refresh News" button works
- ✅ Search and filters function
- ✅ Analytics dashboard shows data
- ✅ No errors in browser console

---

**Note**: The news page works with demo keys but has limited functionality. For full real-time news, get free API keys from the recommended services. 