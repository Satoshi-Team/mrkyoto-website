#!/bin/bash

echo "🚀 Setting up Kyoto Free News API Server..."
echo "✅ No API keys or signup required!"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

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
echo ""
echo "🎉 Features:"
echo "   • ✅ No signup required"
echo "   • ✅ No API keys needed"
echo "   • ✅ Real-time RSS feeds"
echo "   • ✅ Public news sources"
echo "   • ✅ Rich fallback data"
echo "   • ✅ Free forever" 