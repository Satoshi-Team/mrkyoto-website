#!/bin/bash

echo "🚀 Setting up Kyoto Real News API Server..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
# NewsAPI.org - Get free API key at https://newsapi.org/
NEWS_API_KEY=your_newsapi_key_here

# GNews API - Get free API key at https://gnews.io/
GNEWS_API_KEY=your_gnews_key_here

# MediaStack API - Get free API key at https://mediastack.com/
MEDIASTACK_API_KEY=your_mediastack_key_here
EOF
    echo "✅ .env file created. Please add your API keys:"
    echo ""
    echo "🔑 Get your API keys:"
    echo "   • NewsAPI.org: https://newsapi.org/ (Free: 1,000 requests/day)"
    echo "   • GNews: https://gnews.io/ (Free: 100 requests/day)"
    echo "   • MediaStack: https://mediastack.com/ (Free: 500 requests/month)"
    echo ""
    echo "📝 Add your API keys to the .env file"
fi

echo "✅ Setup complete!"
echo "🎯 To start the server, run: npm start"
echo "🌐 Server will run on: http://localhost:3002"
echo "📰 Available endpoints:"
echo "   • GET /api/news/kyoto - Kyoto-specific news"
echo "   • GET /api/news/japan - Japan news"
echo "   • GET /api/news/trending - Trending topics"
echo "   • GET /api/news/search?q=query - Search news"
echo "   • GET /api/news/all - All news categories"
echo "   • GET /api/health - Health check" 