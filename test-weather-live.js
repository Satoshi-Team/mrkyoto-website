#!/usr/bin/env node

const https = require('https');
const http = require('http');

console.log('🌤️ Testing Live Weather Data...\n');

async function testWeatherAPI() {
    try {
        console.log('🌤️ Testing Open-Meteo API...');
        
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.0116&longitude=135.7681&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl&timezone=auto';
        
        const response = await new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => resolve(JSON.parse(data)));
                res.on('error', reject);
            }).on('error', reject);
        });
        
        console.log('✅ API Response received');
        console.log('🌡️ Temperature:', response.current.temperature_2m, '°C');
        console.log('💧 Humidity:', response.current.relative_humidity_2m, '%');
        console.log('💨 Wind Speed:', response.current.wind_speed_10m, 'km/h');
        console.log('🌡️ Pressure:', response.current.pressure_msl, 'hPa');
        console.log('🌤️ Weather Code:', response.current.weather_code);
        
        return true;
    } catch (error) {
        console.error('❌ Weather API test failed:', error.message);
        return false;
    }
}

async function testLocalServer() {
    try {
        console.log('\n🌐 Testing Local Server...');
        
        const response = await new Promise((resolve, reject) => {
            http.get('http://localhost:8002/live-from-kyoto/', (res) => {
                resolve(res.statusCode);
            }).on('error', reject);
        });
        
        if (response === 200) {
            console.log('✅ Local server responding (Status:', response, ')');
            return true;
        } else {
            console.log('⚠️ Local server responding but status:', response);
            return false;
        }
    } catch (error) {
        console.error('❌ Local server test failed:', error.message);
        return false;
    }
}

async function testNewsServer() {
    try {
        console.log('\n📰 Testing News Server...');
        
        const response = await new Promise((resolve, reject) => {
            http.get('http://localhost:8002/news/', (res) => {
                resolve(res.statusCode);
            }).on('error', reject);
        });
        
        if (response === 200) {
            console.log('✅ News server responding (Status:', response, ')');
            return true;
        } else {
            console.log('⚠️ News server responding but status:', response);
            return false;
        }
    } catch (error) {
        console.error('❌ News server test failed:', error.message);
        return false;
    }
}

async function runTests() {
    console.log('🚀 Starting Live Tests...\n');
    
    const weatherAPI = await testWeatherAPI();
    const localServer = await testLocalServer();
    const newsServer = await testNewsServer();
    
    console.log('\n📊 Test Results:');
    console.log('🌤️ Weather API:', weatherAPI ? '✅ PASS' : '❌ FAIL');
    console.log('🌐 Local Server:', localServer ? '✅ PASS' : '❌ FAIL');
    console.log('📰 News Server:', newsServer ? '✅ PASS' : '❌ FAIL');
    
    if (weatherAPI && localServer && newsServer) {
        console.log('\n🎉 All tests passed!');
        console.log('🌐 You can now test the live weather widget at: http://localhost:8002/live-from-kyoto/');
        console.log('📰 You can now test the news page at: http://localhost:8002/news/');
        
        console.log('\n🔍 Debugging Tips:');
        console.log('1. Open browser console to see weather data loading logs');
        console.log('2. Look for "🌤️ Loading weather data..." messages');
        console.log('3. Check for "✅ Direct weather data loaded" success message');
        console.log('4. Verify weather elements show real values (not --°C)');
        console.log('5. Check news articles are populated on news page');
    } else {
        console.log('\n⚠️ Some tests failed. Check the issues above.');
    }
}

runTests(); 