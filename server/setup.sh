#!/bin/bash

echo "🚀 Setting up Kyoto Social Media Scraper..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
# YouTube API Key (optional)
YOUTUBE_API_KEY=your_youtube_api_key_here

# Twitter API Keys (optional)
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here

# Instagram API Keys (optional)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here

# Facebook API Keys (optional)
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
EOF
    echo "✅ .env file created. Please add your API keys if needed."
fi

echo "✅ Setup complete!"
echo "🎯 To start the server, run: npm start"
echo "🌐 Server will run on: http://localhost:3001"
echo "📱 Social Media Hub will fetch real data from: http://localhost:3001/api/social/all" 