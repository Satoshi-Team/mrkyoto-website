#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

console.log('🌤️ Testing Weather & News Functionality...\n');

async function testWeatherAndNews() {
    try {
        // Check if dist folder exists
        const distPath = path.join(__dirname, 'dist');
        if (!await fs.pathExists(distPath)) {
            console.error('❌ dist folder not found. Please run build first.');
            process.exit(1);
        }

        console.log('📁 Testing Weather Functionality...');
        
        // Check weather service
        const weatherServicePath = path.join(distPath, 'js', 'weather-service.js');
        if (!await fs.pathExists(weatherServicePath)) {
            console.error('❌ weather-service.js not found in dist/js/');
            process.exit(1);
        }
        console.log('✅ weather-service.js found');

        // Check live-kyoto-widget
        const widgetPath = path.join(distPath, 'js', 'live-kyoto-widget.js');
        if (!await fs.pathExists(widgetPath)) {
            console.error('❌ live-kyoto-widget.js not found in dist/js/');
            process.exit(1);
        }
        console.log('✅ live-kyoto-widget.js found');

        // Check live-from-kyoto page
        const livePagePath = path.join(distPath, 'live-from-kyoto', 'index.html');
        if (!await fs.pathExists(livePagePath)) {
            console.error('❌ live-from-kyoto/index.html not found in dist/');
            process.exit(1);
        }
        console.log('✅ live-from-kyoto/index.html found');

        // Check weather elements in live page
        const livePageContent = await fs.readFile(livePagePath, 'utf8');
        const weatherElements = [
            'weather-temperature',
            'weather-icon', 
            'weather-description',
            'weather-feels-like',
            'weather-wind',
            'weather-humidity',
            'weather-visibility',
            'weather-pressure',
            'weather-sunrise',
            'weather-sunset',
            'weather-last-updated',
            'kyoto-weather-widget'
        ];

        let missingWeatherElements = [];
        for (const element of weatherElements) {
            if (!livePageContent.includes(element)) {
                missingWeatherElements.push(element);
            }
        }

        if (missingWeatherElements.length > 0) {
            console.error(`❌ Missing weather elements: ${missingWeatherElements.join(', ')}`);
            process.exit(1);
        }
        console.log('✅ All weather elements found in live page');

        // Check weather service reference
        if (!livePageContent.includes('weather-service.js')) {
            console.error('❌ weather-service.js not referenced in live-from-kyoto page');
            process.exit(1);
        }
        console.log('✅ weather-service.js referenced in live page');

        console.log('\n📰 Testing News Functionality...');

        // Check news data
        const newsDataPath = path.join(distPath, 'js', 'news-data.js');
        if (!await fs.pathExists(newsDataPath)) {
            console.error('❌ news-data.js not found in dist/js/');
            process.exit(1);
        }
        console.log('✅ news-data.js found');

        // Check news manager
        const newsManagerPath = path.join(distPath, 'js', 'news-manager.js');
        if (!await fs.pathExists(newsManagerPath)) {
            console.error('❌ news-manager.js not found in dist/js/');
            process.exit(1);
        }
        console.log('✅ news-manager.js found');

        // Check news page
        const newsPagePath = path.join(distPath, 'news', 'index.html');
        if (!await fs.pathExists(newsPagePath)) {
            console.error('❌ news/index.html not found in dist/');
            process.exit(1);
        }
        console.log('✅ news/index.html found');

        // Check news elements in news page
        const newsPageContent = await fs.readFile(newsPagePath, 'utf8');
        const newsElements = [
            'news-container',
            'news-loading',
            'news-error',
            'no-results',
            'news-search',
            'category-filter',
            'time-filter',
            'sort-filter'
        ];

        let missingNewsElements = [];
        for (const element of newsElements) {
            if (!newsPageContent.includes(element)) {
                missingNewsElements.push(element);
            }
        }

        if (missingNewsElements.length > 0) {
            console.error(`❌ Missing news elements: ${missingNewsElements.join(', ')}`);
            process.exit(1);
        }
        console.log('✅ All news elements found in news page');

        // Check script paths in news page
        const scriptPaths = [
            '/js/news-data.js',
            '/js/news-manager.js',
            '/js/shared-header.js',
            '/js/shared-navigation.js',
            '/js/shared-footer.js'
        ];

        let missingScripts = [];
        for (const script of scriptPaths) {
            if (!newsPageContent.includes(script)) {
                missingScripts.push(script);
            }
        }

        if (missingScripts.length > 0) {
            console.error(`❌ Missing script references: ${missingScripts.join(', ')}`);
            process.exit(1);
        }
        console.log('✅ All script paths correct in news page');

        // Check file sizes
        const weatherServiceStats = await fs.stat(weatherServicePath);
        const widgetStats = await fs.stat(widgetPath);
        const livePageStats = await fs.stat(livePagePath);
        const newsDataStats = await fs.stat(newsDataPath);
        const newsManagerStats = await fs.stat(newsManagerPath);
        const newsPageStats = await fs.stat(newsPagePath);

        console.log('\n📊 File Sizes:');
        console.log(`🌤️ Weather service: ${(weatherServiceStats.size / 1024).toFixed(1)} KB`);
        console.log(`🎥 Live widget: ${(widgetStats.size / 1024).toFixed(1)} KB`);
        console.log(`📄 Live page: ${(livePageStats.size / 1024).toFixed(1)} KB`);
        console.log(`📰 News data: ${(newsDataStats.size / 1024).toFixed(1)} KB`);
        console.log(`📊 News manager: ${(newsManagerStats.size / 1024).toFixed(1)} KB`);
        console.log(`📄 News page: ${(newsPageStats.size / 1024).toFixed(1)} KB`);

        // Check for common issues
        console.log('\n🔍 Checking for Common Issues...');

        // Check for relative paths in news manager
        const newsManagerContent = await fs.readFile(newsManagerPath, 'utf8');
        if (newsManagerContent.includes('../js/')) {
            console.error('❌ Found relative paths in news-manager.js - should use absolute paths');
            process.exit(1);
        }
        console.log('✅ No relative paths found in news manager');

        // Check for proper weather data loading
        const widgetContent = await fs.readFile(widgetPath, 'utf8');
        if (!widgetContent.includes('fetchDirectWeather')) {
            console.error('❌ Direct weather fetch not found in live-kyoto-widget.js');
            process.exit(1);
        }
        console.log('✅ Direct weather fetch found in widget');

        // Check for proper error handling
        if (!widgetContent.includes('getEnhancedFallbackWeatherData')) {
            console.error('❌ Enhanced fallback weather not found in live-kyoto-widget.js');
            process.exit(1);
        }
        console.log('✅ Enhanced fallback weather found in widget');

        console.log('\n🎉 Weather & News Test Passed Successfully!');
        console.log('🌐 Test URLs:');
        console.log('   Weather: http://localhost:8002/live-from-kyoto/');
        console.log('   News: http://localhost:8002/news/');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

testWeatherAndNews(); 