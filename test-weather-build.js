#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

console.log('🌤️ Testing Weather Build...\n');

async function testWeatherBuild() {
    try {
        // Check if dist folder exists
        const distPath = path.join(__dirname, 'dist');
        if (!await fs.pathExists(distPath)) {
            console.error('❌ dist folder not found. Please run build first.');
            process.exit(1);
        }

        // Check if weather service is included
        const weatherServicePath = path.join(distPath, 'js', 'weather-service.js');
        if (!await fs.pathExists(weatherServicePath)) {
            console.error('❌ weather-service.js not found in dist/js/');
            process.exit(1);
        }
        console.log('✅ weather-service.js found in dist build');

        // Check if live-kyoto-widget is included
        const widgetPath = path.join(distPath, 'js', 'live-kyoto-widget.js');
        if (!await fs.pathExists(widgetPath)) {
            console.error('❌ live-kyoto-widget.js not found in dist/js/');
            process.exit(1);
        }
        console.log('✅ live-kyoto-widget.js found in dist build');

        // Check if live-from-kyoto page is included
        const livePagePath = path.join(distPath, 'live-from-kyoto', 'index.html');
        if (!await fs.pathExists(livePagePath)) {
            console.error('❌ live-from-kyoto/index.html not found in dist/');
            process.exit(1);
        }
        console.log('✅ live-from-kyoto/index.html found in dist build');

        // Check if weather service is referenced in the live page
        const livePageContent = await fs.readFile(livePagePath, 'utf8');
        if (!livePageContent.includes('weather-service.js')) {
            console.error('❌ weather-service.js not referenced in live-from-kyoto page');
            process.exit(1);
        }
        console.log('✅ weather-service.js referenced in live-from-kyoto page');

        // Check if translation manager is included
        const translationPath = path.join(distPath, 'js', 'translation-manager.js');
        if (!await fs.pathExists(translationPath)) {
            console.error('❌ translation-manager.js not found in dist/js/');
            process.exit(1);
        }
        console.log('✅ translation-manager.js found in dist build');

        // Check file sizes
        const weatherServiceStats = await fs.stat(weatherServicePath);
        const widgetStats = await fs.stat(widgetPath);
        const livePageStats = await fs.stat(livePagePath);

        console.log(`📊 Weather service size: ${(weatherServiceStats.size / 1024).toFixed(1)} KB`);
        console.log(`📊 Widget size: ${(widgetStats.size / 1024).toFixed(1)} KB`);
        console.log(`📊 Live page size: ${(livePageStats.size / 1024).toFixed(1)} KB`);

        // Check for weather-related content in the live page
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
            'weather-last-updated'
        ];

        let missingElements = [];
        for (const element of weatherElements) {
            if (!livePageContent.includes(element)) {
                missingElements.push(element);
            }
        }

        if (missingElements.length > 0) {
            console.error(`❌ Missing weather elements: ${missingElements.join(', ')}`);
            process.exit(1);
        }
        console.log('✅ All weather elements found in live page');

        // Check for translation keys
        const translationKeys = [
            'liveKyoto.weather.title',
            'liveKyoto.weather.live',
            'liveKyoto.weather.loading',
            'liveKyoto.weather.feelsLike',
            'liveKyoto.weather.wind',
            'liveKyoto.weather.humidity',
            'liveKyoto.weather.visibility',
            'liveKyoto.weather.pressure',
            'liveKyoto.weather.sunrise',
            'liveKyoto.weather.sunset',
            'liveKyoto.weather.lastUpdated'
        ];

        let missingKeys = [];
        for (const key of translationKeys) {
            if (!livePageContent.includes(key)) {
                missingKeys.push(key);
            }
        }

        if (missingKeys.length > 0) {
            console.error(`❌ Missing translation keys: ${missingKeys.join(', ')}`);
            process.exit(1);
        }
        console.log('✅ All weather translation keys found');

        console.log('\n🎉 Weather build test passed successfully!');
        console.log('🌐 You can now test the live weather widget at: http://localhost:8001/live-from-kyoto/');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

testWeatherBuild(); 