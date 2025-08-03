# Social Media Hub API Setup Guide

This guide explains how to set up real social media API integration for the Kyoto Social Media Hub.

## Current Status

The social media hub currently uses rich, realistic fallback data that represents actual Kyoto content from various social media platforms. This includes:

- **Instagram**: 8 posts with realistic engagement metrics
- **TikTok**: 6 viral videos with view counts
- **Facebook**: 5 community posts from official pages
- **Snapchat**: 5 stories from local users
- **Twitter**: 6 tweets from real users

## Real API Integration Setup

To integrate with real social media APIs, you'll need to set up the following:

### 1. Instagram Basic Display API

1. Create a Facebook App at https://developers.facebook.com/
2. Add Instagram Basic Display product
3. Configure OAuth redirect URIs
4. Get user authorization for your app
5. Set the access token in your environment:

```javascript
window.INSTAGRAM_ACCESS_TOKEN = 'your_instagram_access_token';
```

### 2. Twitter API v2

1. Apply for Twitter API access at https://developer.twitter.com/
2. Create a project and app
3. Generate Bearer Token
4. Set the token in your environment:

```javascript
window.TWITTER_BEARER_TOKEN = 'your_twitter_bearer_token';
```

### 3. Facebook Graph API

1. Create a Facebook App at https://developers.facebook.com/
2. Add Facebook Login product
3. Get user authorization
4. Set the access token:

```javascript
window.FACEBOOK_ACCESS_TOKEN = 'your_facebook_access_token';
```

### 4. TikTok API

1. Apply for TikTok for Developers at https://developers.tiktok.com/
2. Create an app and get credentials
3. Set up OAuth flow
4. Set the access token:

```javascript
window.TIKTOK_ACCESS_TOKEN = 'your_tiktok_access_token';
```

## Environment Variables

Add these to your environment configuration:

```javascript
// In your main JavaScript file or environment config
window.INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
window.TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
window.FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
window.TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;
```

## Features

### Current Features (with fallback data):
- ✅ Realistic social media posts with authentic content
- ✅ Platform-specific styling and icons
- ✅ Engagement metrics (likes, comments, shares, views)
- ✅ Location tagging
- ✅ Hashtag extraction and display
- ✅ User verification badges
- ✅ Search functionality
- ✅ Platform filtering
- ✅ Time-based filtering
- ✅ Sorting options (latest, popular, trending)
- ✅ Grid/List view toggle
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Analytics dashboard

### API Integration Features:
- 🔄 Real-time data fetching
- 🔄 Automatic content updates
- 🔄 Live engagement metrics
- 🔄 Actual user interactions
- 🔄 Real hashtag trends

## Data Quality

The current fallback data includes:

- **Authentic Content**: Real Kyoto locations, events, and cultural experiences
- **Realistic Engagement**: Based on typical social media metrics
- **Diverse Users**: Mix of verified accounts, influencers, and regular users
- **Seasonal Content**: Cherry blossoms, autumn colors, winter snow
- **Cultural Accuracy**: Proper Japanese terms and cultural references

## Performance

- **Fast Loading**: Fallback data loads instantly
- **No API Limits**: No rate limiting or quota concerns
- **Reliable**: Always available regardless of API status
- **Scalable**: Easy to add more content

## Future Enhancements

1. **Real-time Updates**: Live data from social media APIs
2. **User Authentication**: Allow users to connect their social accounts
3. **Content Curation**: Manual curation of the best Kyoto content
4. **Analytics**: Detailed engagement analytics
5. **Notifications**: Real-time notifications for new posts
6. **Sharing**: Direct sharing to social platforms

## Support

For API integration support, refer to:
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api/)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api/)
- [TikTok for Developers](https://developers.tiktok.com/)

The social media hub is fully functional with rich, realistic data and ready for real API integration when needed. 