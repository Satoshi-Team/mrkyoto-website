# 🌤️ Weather Widget Deployment Guide

## Overview

The MrKyoto weather widget provides real-time weather data for Kyoto using multiple weather APIs and a robust fallback system. This guide covers the complete deployment process and testing procedures.

## 🏗️ Build Process

### 1. Build the Project
```bash
# Run the build script
node build.js
```

### 2. Verify Build Output
```bash
# Run the weather build test
node test-weather-build.js
```

### 3. Expected Build Results
- ✅ `dist/js/weather-service.js` (16.6 KB)
- ✅ `dist/js/live-kyoto-widget.js` (25.8 KB)
- ✅ `dist/live-from-kyoto/index.html` (22.0 KB)
- ✅ All weather elements and translation keys included

## 🌐 Weather Data Sources

### Primary API: Open-Meteo
- **URL**: `https://api.open-meteo.com/v1/forecast`
- **Status**: Free, no authentication required
- **Data**: Temperature, humidity, wind, pressure, weather codes
- **Reliability**: High availability

### Backup APIs
1. **OpenWeatherMap**: Requires API key
2. **WeatherAPI.com**: Requires API key
3. **Meteomatics**: Professional service
4. **Visual Crossing**: Comprehensive weather data

### Fallback System
- **Enhanced Fallback**: Realistic Kyoto weather patterns
- **Seasonal Accuracy**: Winter, Spring, Summer, Autumn patterns
- **Time-Based Adjustments**: Daytime vs nighttime variations

## 🧪 Testing Procedures

### 1. Local Testing
```bash
# Start local server from dist folder
cd dist && python3 -m http.server 8001

# Test URL: http://localhost:8001/live-from-kyoto/
```

### 2. Weather Widget Test Checklist
- [ ] Weather data loads within 5 seconds
- [ ] Temperature displays correctly (not --°C)
- [ ] Weather icon updates based on conditions
- [ ] All metrics show real values (wind, humidity, pressure, visibility)
- [ ] Sunrise/sunset times display correctly
- [ ] Last updated timestamp shows current time
- [ ] Live indicator pulses green
- [ ] Translation keys work for all languages

### 3. Console Debugging
Open browser console and check for:
```
🌤️ Loading weather data...
🌤️ Fetching direct weather data...
🌤️ Raw weather data: {temperature_2m: 25, ...}
🌤️ Processed weather data: {temperature: 25, ...}
✅ Direct weather data loaded: {temperature: 25, ...}
🌤️ Updating weather display...
🌤️ Weather display update complete
```

## 🚀 Deployment

### 1. Netlify Deployment
The build includes all necessary Netlify configuration:
- `_redirects`: URL redirects and SPA fallback
- `_headers`: Security headers and caching rules
- `build-report.json`: Build statistics and file list

### 2. Production URLs
- **Live Weather Page**: `https://your-domain.com/live-from-kyoto/`
- **Weather Widget**: Embedded in live page
- **API Endpoints**: Multiple weather services for redundancy

### 3. Performance Optimization
- **Caching**: 5-minute weather data cache
- **CDN**: Static assets cached for 1 year
- **Compression**: Gzip compression enabled
- **Minification**: CSS and HTML optimized

## 🔧 Configuration

### Weather Service Configuration
```javascript
// js/weather-service.js
class WeatherService {
    constructor() {
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        this.kyotoCoordinates = { lat: 35.0116, lon: 135.7681 };
    }
}
```

### Widget Configuration
```javascript
// js/live-kyoto-widget.js
class LiveKyotoWidget {
    constructor() {
        this.weatherData = null;
        this.autoRefreshInterval = 300000; // 5 minutes
    }
}
```

## 🌍 Translation Support

### Supported Languages
- **English (en)**: Default language
- **Japanese (ja)**: 日本語
- **Chinese (zh)**: 中文
- **Korean (ko)**: 한국어

### Weather Translation Keys
```javascript
'liveKyoto.weather.title': 'Kyoto Weather',
'liveKyoto.weather.live': 'LIVE',
'liveKyoto.weather.loading': 'Loading weather...',
'liveKyoto.weather.feelsLike': 'Feels like',
'liveKyoto.weather.wind': 'Wind',
'liveKyoto.weather.humidity': 'Humidity',
'liveKyoto.weather.visibility': 'Visibility',
'liveKyoto.weather.pressure': 'Pressure',
'liveKyoto.weather.sunrise': 'Sunrise',
'liveKyoto.weather.sunset': 'Sunset',
'liveKyoto.weather.lastUpdated': 'Last updated'
```

## 📊 Monitoring

### Weather Data Validation
```javascript
validateWeatherData(data) {
    return data && 
           typeof data.temperature === 'number' &&
           data.temperature >= -50 && data.temperature <= 60 &&
           data.humidity >= 0 && data.humidity <= 100 &&
           data.windSpeed >= 0 && data.windSpeed <= 200 &&
           data.pressure >= 800 && data.pressure <= 1200;
}
```

### Error Handling
- **API Failures**: Automatic fallback to next source
- **Network Issues**: Enhanced fallback data
- **Invalid Data**: Data validation and sanitization
- **Missing Elements**: Graceful degradation

## 🔍 Troubleshooting

### Common Issues

#### 1. Weather Data Not Loading
**Symptoms**: All values show --°C or placeholder data
**Solutions**:
- Check browser console for API errors
- Verify network connectivity
- Check if weather APIs are accessible
- Ensure weather-service.js is loaded

#### 2. Translation Not Working
**Symptoms**: Weather labels not translated
**Solutions**:
- Verify translation-manager.js is loaded
- Check translation keys in console
- Ensure language switching works
- Verify translation data structure

#### 3. Widget Not Updating
**Symptoms**: Weather data doesn't refresh
**Solutions**:
- Check auto-refresh interval (5 minutes)
- Verify updateWidget() function is called
- Check for JavaScript errors in console
- Ensure DOM elements exist

### Debug Commands
```javascript
// Check weather data
console.log(window.liveKyotoWidget.weatherData);

// Force weather refresh
window.liveKyotoWidget.loadWeatherData();

// Check translation manager
console.log(window.translationManager.getCurrentLanguage());

// Test weather service directly
const weatherService = new WeatherService();
weatherService.getKyotoWeather().then(console.log);
```

## 📈 Performance Metrics

### Expected Performance
- **Initial Load**: < 3 seconds
- **Weather Data**: < 2 seconds
- **Widget Updates**: < 1 second
- **Translation Switch**: < 500ms

### File Sizes
- **weather-service.js**: 16.6 KB
- **live-kyoto-widget.js**: 25.8 KB
- **live-from-kyoto/index.html**: 22.0 KB
- **Total Weather Assets**: ~64.4 KB

## 🎯 Success Criteria

### Functional Requirements
- [ ] Real weather data displays correctly
- [ ] All weather metrics show accurate values
- [ ] Auto-refresh works every 5 minutes
- [ ] Translation support for all languages
- [ ] Responsive design on all devices
- [ ] Graceful fallback when APIs fail

### Technical Requirements
- [ ] Build process completes successfully
- [ ] All files included in dist folder
- [ ] No JavaScript errors in console
- [ ] Weather data validation passes
- [ ] Translation keys work correctly
- [ ] Performance metrics met

## 🚀 Ready for Deployment

The weather widget is now fully functional and ready for production deployment. The build includes:

- ✅ Real-time weather data from multiple APIs
- ✅ Robust fallback system with realistic data
- ✅ Complete translation support
- ✅ Responsive design and accessibility
- ✅ Performance optimization
- ✅ Error handling and monitoring
- ✅ Netlify deployment configuration

**Test the live weather widget at**: `http://localhost:8001/live-from-kyoto/` 