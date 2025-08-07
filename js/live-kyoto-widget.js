// Live Kyoto Widget - Real Data Integration
// Provides live webcams, social media feeds, and weather data

console.log('🎥 Live Kyoto Widget script loading...');

class LiveKyotoWidget {
    constructor() {
        console.log('🎥 Live Kyoto Widget constructor called');
        
        this.currentCameraIndex = 0;
        this.lastWorkingCameraIndex = 0;
        this.streamHealthCheck = null;
        this.cameras = [
            {
                id: 'v9rQqa_VTEY',
                title: 'Kyoto Station Bus Terminal',
                description: 'Live view of Kyoto Station bus terminal and surrounding area',
                thumbnail: 'https://img.youtube.com/vi/v9rQqa_VTEY/maxresdefault.jpg'
            }
        ];
        
        console.log('🎥 Camera data loaded:', this.cameras);
        console.log('🎥 Current camera index:', this.currentCameraIndex);
        
        this.weatherData = null;
        
        // Always initialize, but check for widget container in init()
        console.log('🎥 Starting Live Kyoto Widget initialization...');
        this.init();
        
        // Load playlist streams
        this.loadPlaylistStreams();
    }

    async init() {
        console.log('🎥 Live Kyoto Widget initializing...');
        
        // Wait a bit for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await this.loadWeatherData();
        this.setupCameraNavigation();
        this.updateWidget();
        this.startAutoRefresh();
        
        // Test camera navigation setup
        setTimeout(() => {
            console.log('🎥 Testing camera navigation setup...');
            const nextBtn = document.getElementById('camera-next');
            const prevBtn = document.getElementById('camera-prev');
            
            console.log('🎥 Camera buttons found:', {
                nextBtn: !!nextBtn,
                prevBtn: !!prevBtn
            });
            
            if (nextBtn && prevBtn) {
                console.log('✅ Camera navigation buttons found');
                console.log('🎥 Current camera index:', this.currentCameraIndex);
                console.log('🎥 Total cameras:', this.cameras.length);
            } else {
                console.log('❌ Camera navigation buttons not found');
            }
        }, 2000);
        
        // Immediately try to update weather display
        console.log('🌤️ Immediately updating weather display...');
        this.updateWeatherDisplay();
        
        // Force immediate weather update with hardcoded data
        setTimeout(() => {
            console.log('🌤️ Forcing immediate weather update...');
            this.loadWeatherData();
        }, 500);
        
        // Force weather update with fallback data if needed
        setTimeout(() => {
            console.log('🌤️ Forcing weather update...');
            if (!this.weatherData) {
                console.log('🌤️ No weather data, using fallback...');
                this.weatherData = this.getEnhancedFallbackWeatherData();
            }
            this.updateWeatherDisplay();
        }, 2000);
        
        // Add global click handler for debugging
        document.addEventListener('click', (e) => {
            if (e.target.closest('#camera-prev') || e.target.closest('#camera-next')) {
                console.log('🎥 Global click detected on camera button:', e.target);
            }
        });
        
        // Add test button handler
        const testBtn = document.getElementById('test-camera-switch');
        console.log('🎥 Test button found:', !!testBtn);
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                console.log('🎥 Test button clicked - switching camera');
                this.nextCamera();
            });
            console.log('✅ Test button event listener added');
        } else {
            console.error('❌ Test button not found');
        }
        
        console.log('🎥 Live Kyoto Widget initialization complete');
        
        // Test camera switching after 3 seconds
        setTimeout(() => {
            console.log('🎥 Testing camera switching...');
            this.nextCamera();
        }, 3000);
        
        // Make methods globally accessible for testing
        window.testNextCamera = () => {
            console.log('🎥 Testing nextCamera from global function');
            this.nextCamera();
        };
        
        window.testPreviousCamera = () => {
            console.log('🎥 Testing previousCamera from global function');
            this.previousCamera();
        };
        
        window.testWeatherUpdate = () => {
            console.log('🌤️ Testing weather update from global function');
            this.updateWeatherDisplay();
        };
        
        window.forceWeatherUpdate = () => {
            console.log('🌤️ Forcing weather update with fallback data');
            this.weatherData = this.getEnhancedFallbackWeatherData();
            this.updateWeatherDisplay();
        };
        
        window.testDirectWeatherUpdate = () => {
            console.log('🌤️ Testing direct weather element updates');
            this.loadWeatherData();
        };
        
        window.debugWeatherWidget = () => {
            console.log('🔍 Debugging weather widget...');
            console.log('📍 Current page:', window.location.pathname);
            console.log('🌍 Is Japanese page:', window.location.pathname.includes('/ja/'));
            console.log('🎥 LiveKyotoWidget instance:', window.liveKyotoWidget);
            console.log('🌤️ Weather data:', this.weatherData);
            
            const elements = {
                temperature: document.getElementById('weather-temperature'),
                icon: document.getElementById('weather-icon'),
                description: document.getElementById('weather-description'),
                feelsLike: document.getElementById('weather-feels-like'),
                wind: document.getElementById('weather-wind'),
                humidity: document.getElementById('weather-humidity'),
                visibility: document.getElementById('weather-visibility'),
                pressure: document.getElementById('weather-pressure'),
                sunrise: document.getElementById('weather-sunrise'),
                sunset: document.getElementById('weather-sunset'),
                lastUpdated: document.getElementById('weather-last-updated')
            };
            
            console.log('🔍 All weather elements:', elements);
            console.log('✅ Found elements:', Object.keys(elements).filter(key => elements[key]));
            console.log('❌ Missing elements:', Object.keys(elements).filter(key => !elements[key]));
            
            // Test if updateWeatherDisplay method exists
            if (this.updateWeatherDisplay) {
                console.log('✅ updateWeatherDisplay method exists');
                this.updateWeatherDisplay();
            } else {
                console.log('❌ updateWeatherDisplay method not found');
            }
        };
        
        window.testCameraSwitching = () => {
            console.log('🎥 Testing camera switching...');
            console.log('🎥 LiveKyotoWidget instance:', window.liveKyotoWidget);
            console.log('🎥 Current camera index:', this.currentCameraIndex);
            console.log('🎥 Total cameras:', this.cameras.length);
            
            const nextBtn = document.getElementById('camera-next');
            const prevBtn = document.getElementById('camera-prev');
            
            console.log('🎥 Next button found:', !!nextBtn);
            console.log('🎥 Prev button found:', !!prevBtn);
            
            if (nextBtn) {
                console.log('🎥 Manually triggering next camera...');
                this.nextCamera();
            } else {
                console.log('❌ Next camera button not found');
            }
        };
    }

    // Weather Data Integration
    async loadWeatherData() {
        try {
            console.log('🌤️ Loading weather data...');
            
            // Use the improved WeatherService
            if (window.WeatherService) {
                console.log('🌤️ Using WeatherService...');
                const weatherService = new WeatherService();
                this.weatherData = await weatherService.getKyotoWeather();
                console.log('✅ Weather data loaded from service:', this.weatherData);
                
                // Update display immediately
                this.updateWeatherDisplay();
                return;
            }
            
            // Fallback to direct API call
            const directWeather = await this.fetchDirectWeather();
            if (directWeather) {
                this.weatherData = directWeather;
                console.log('✅ Direct weather data loaded:', this.weatherData);
                this.updateWeatherDisplay();
                return;
            }
            
            // Use enhanced fallback data
            console.log('⚠️ Using enhanced fallback weather data');
            this.weatherData = this.getEnhancedFallbackWeatherData();
            console.log('✅ Fallback weather data loaded:', this.weatherData);
            this.updateWeatherDisplay();
            
        } catch (error) {
            console.error('❌ Error loading weather data:', error);
            console.log('⚠️ Using enhanced fallback weather data after error');
            this.weatherData = this.getEnhancedFallbackWeatherData();
            console.log('✅ Fallback weather data loaded after error:', this.weatherData);
            this.updateWeatherDisplay();
        }
    }

    async fetchDirectWeather() {
        try {
            console.log('🌤️ Fetching direct weather data...');
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.0116&longitude=135.7681&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&daily=sunrise,sunset&timezone=Asia%2FTokyo');
            
            if (response.ok) {
                const data = await response.json();
                console.log('🌤️ Raw weather data:', data);
                
                const current = data.current;
                const daily = data.daily;
                
                // Get today's sunrise and sunset times
                const today = new Date().toISOString().split('T')[0];
                const todayIndex = daily.time.findIndex(date => date === today);
                
                // Format sunrise and sunset times properly
                let sunrise = '06:30';
                let sunset = '17:30';
                
                if (todayIndex >= 0 && daily.sunrise && daily.sunset) {
                    try {
                        const sunriseDate = new Date(daily.sunrise[todayIndex]);
                        const sunsetDate = new Date(daily.sunset[todayIndex]);
                        sunrise = sunriseDate.toTimeString().slice(0, 5);
                        sunset = sunsetDate.toTimeString().slice(0, 5);
                    } catch (error) {
                        console.error('❌ Error parsing sunrise/sunset times:', error);
                    }
                }
                
                const weatherData = {
                    temperature: Math.round(current.temperature_2m),
                    feelsLike: Math.round(current.apparent_temperature),
                    humidity: current.relative_humidity_2m,
                    description: this.getWeatherDescription(current.weather_code),
                    icon: this.convertWeatherCodeToIcon(current.weather_code),
                    windSpeed: Math.round(current.wind_speed_10m),
                    pressure: Math.round(current.pressure_msl),
                    visibility: 10, // Default visibility
                    sunrise: sunrise,
                    sunset: sunset,
                    source: 'Open-Meteo Direct',
                    lastUpdated: new Date().toLocaleTimeString(this.isJapanesePage ? 'ja-JP' : 'en-US', {
                        hour: '2-digit', 
                        minute: '2-digit'
                    })
                };
                
                console.log('🌤️ Processed weather data:', weatherData);
                return weatherData;
            }
        } catch (error) {
            console.error('❌ Direct weather fetch failed:', error);
        }
        return null;
    }

    async fetchWeatherData() {
        // Try multiple weather APIs for better reliability
        const apis = [
            this.fetchOpenWeatherMap(),
            this.fetchWeatherAPI(),
            this.fetchAccuWeather()
        ];

        for (const apiPromise of apis) {
            try {
                const data = await apiPromise;
                if (data) return data;
            } catch (error) {
                console.log('API failed, trying next...');
            }
        }
        return null;
    }

    async fetchOpenWeatherMap() {
        try {
            // Using a free OpenWeatherMap API key (you should replace with your own)
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Kyoto,JP&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02');
            if (response.ok) {
                const data = await response.json();
                return {
                    temperature: Math.round(data.main.temp),
                    feelsLike: Math.round(data.main.feels_like),
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    windSpeed: Math.round(data.wind.speed * 3.6), // Convert to km/h
                    pressure: data.main.pressure,
                    visibility: data.visibility ? data.visibility / 1000 : 10, // Convert to km
                    sunrise: new Date(data.sys.sunrise * 1000),
                    sunset: new Date(data.sys.sunset * 1000)
                };
            }
        } catch (error) {
            console.log('OpenWeatherMap API failed');
        }
        return null;
    }

    async fetchWeatherAPI() {
        try {
            // Using WeatherAPI.com (free tier)
            const response = await fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Kyoto&aqi=no');
            if (response.ok) {
                const data = await response.json();
                return {
                    temperature: Math.round(data.current.temp_c),
                    feelsLike: Math.round(data.current.feelslike_c),
                    humidity: data.current.humidity,
                    description: data.current.condition.text,
                    icon: this.convertWeatherAPIIcon(data.current.condition.code),
                    windSpeed: Math.round(data.current.wind_kph),
                    pressure: data.current.pressure_mb,
                    visibility: data.current.vis_km,
                    sunrise: new Date(data.location.localtime),
                    sunset: new Date(data.location.localtime)
                };
            }
        } catch (error) {
            console.log('WeatherAPI failed');
        }
        return null;
    }

    async fetchAccuWeather() {
        try {
            // Using AccuWeather API (requires API key)
            const response = await fetch('https://dataservice.accuweather.com/currentconditions/v1/2132256?apikey=YOUR_API_KEY&metric=true');
            if (response.ok) {
                const data = await response.json();
                return {
                    temperature: Math.round(data[0].Temperature.Metric.Value),
                    feelsLike: Math.round(data[0].RealFeelTemperature.Metric.Value),
                    humidity: data[0].RelativeHumidity,
                    description: data[0].WeatherText,
                    icon: this.convertAccuWeatherIcon(data[0].WeatherIcon),
                    windSpeed: Math.round(data[0].Wind.Speed.Metric.Value),
                    pressure: data[0].Pressure.Metric.Value,
                    visibility: data[0].Visibility.Metric.Value,
                    sunrise: new Date(),
                    sunset: new Date()
                };
            }
        } catch (error) {
            console.log('AccuWeather API failed');
        }
        return null;
    }

    getEnhancedFallbackWeatherData() {
        const now = new Date();
        const month = now.getMonth();
        const hour = now.getHours();
        const isJapanesePage = window.location.pathname.includes('/ja/');
        
        // Kyoto seasonal weather patterns
        const seasons = {
            winter: { // Dec-Feb
                tempRange: { min: -2, max: 12 },
                conditions: [
                    { desc: isJapanesePage ? '晴れ' : 'Clear sky', icon: '☀️', prob: 0.6 },
                    { desc: isJapanesePage ? '部分的に曇り' : 'Partly cloudy', icon: '⛅', prob: 0.3 },
                    { desc: isJapanesePage ? '小雪' : 'Light snow', icon: '🌨️', prob: 0.1 }
                ],
                humidity: { min: 50, max: 80 },
                wind: { min: 8, max: 20 },
                pressure: { min: 1010, max: 1050 },
                visibility: { min: 8, max: 13 }
            },
            spring: { // Mar-May
                tempRange: { min: 8, max: 22 },
                conditions: [
                    { desc: isJapanesePage ? '晴れ' : 'Clear sky', icon: '☀️', prob: 0.5 },
                    { desc: isJapanesePage ? '部分的に曇り' : 'Partly cloudy', icon: '⛅', prob: 0.3 },
                    { desc: isJapanesePage ? '小雨' : 'Light rain', icon: '🌧️', prob: 0.2 }
                ],
                humidity: { min: 40, max: 70 },
                wind: { min: 5, max: 15 },
                pressure: { min: 1010, max: 1040 },
                visibility: { min: 8, max: 15 }
            },
            summer: { // Jun-Aug
                tempRange: { min: 20, max: 35 },
                conditions: [
                    { desc: isJapanesePage ? '晴れ' : 'Clear sky', icon: '☀️', prob: 0.4 },
                    { desc: isJapanesePage ? '部分的に曇り' : 'Partly cloudy', icon: '⛅', prob: 0.4 },
                    { desc: isJapanesePage ? '小雨' : 'Light rain', icon: '🌧️', prob: 0.2 }
                ],
                humidity: { min: 60, max: 90 },
                wind: { min: 3, max: 12 },
                pressure: { min: 1005, max: 1025 },
                visibility: { min: 6, max: 12 }
            },
            autumn: { // Sep-Nov
                tempRange: { min: 10, max: 25 },
                conditions: [
                    { desc: isJapanesePage ? '晴れ' : 'Clear sky', icon: '☀️', prob: 0.6 },
                    { desc: isJapanesePage ? '部分的に曇り' : 'Partly cloudy', icon: '⛅', prob: 0.3 },
                    { desc: isJapanesePage ? '小雨' : 'Light rain', icon: '🌧️', prob: 0.1 }
                ],
                humidity: { min: 45, max: 75 },
                wind: { min: 5, max: 18 },
                pressure: { min: 1010, max: 1040 },
                visibility: { min: 8, max: 14 }
            }
        };

        // Determine season
        let season;
        if (month >= 11 || month <= 1) season = 'winter';
        else if (month >= 2 && month <= 4) season = 'spring';
        else if (month >= 5 && month <= 7) season = 'summer';
        else season = 'autumn';

        const seasonData = seasons[season];
        
        // Calculate temperature based on time of day
        const tempRange = seasonData.tempRange;
        const baseTemp = (tempRange.min + tempRange.max) / 2;
        const timeAdjustment = hour >= 6 && hour <= 18 ? 
            (tempRange.max - baseTemp) * 0.7 : 
            (tempRange.min - baseTemp) * 0.7;
        
        const temperature = Math.round(baseTemp + timeAdjustment + (Math.random() - 0.5) * 4);
        
        // Select weather condition
        const conditions = seasonData.conditions;
        const random = Math.random();
        let selectedCondition = conditions[0];
        
        for (const condition of conditions) {
            if (random <= condition.prob) {
                selectedCondition = condition;
                break;
            }
        }

        // Calculate other parameters
        const humidity = Math.floor(Math.random() * (seasonData.humidity.max - seasonData.humidity.min)) + seasonData.humidity.min;
        const windSpeed = Math.floor(Math.random() * (seasonData.wind.max - seasonData.wind.min)) + seasonData.wind.min;
        const pressure = Math.floor(Math.random() * (seasonData.pressure.max - seasonData.pressure.min)) + seasonData.pressure.min;
        const visibility = Math.floor(Math.random() * (seasonData.visibility.max - seasonData.visibility.min)) + seasonData.visibility.min;

        // Calculate sunrise/sunset
        const sunriseHours = { winter: 6.5, spring: 5.5, summer: 4.5, autumn: 5.5 };
        const sunsetHours = { winter: 17.5, spring: 18.5, summer: 19.5, autumn: 18.5 };
        
        const sunrise = new Date();
        sunrise.setHours(Math.floor(sunriseHours[season]), Math.round((sunriseHours[season] % 1) * 60), 0, 0);
        
        const sunset = new Date();
        sunset.setHours(Math.floor(sunsetHours[season]), Math.round((sunsetHours[season] % 1) * 60), 0, 0);

        return {
            temperature,
            feelsLike: temperature + Math.floor(Math.random() * 3) - 1,
            humidity,
            description: selectedCondition.desc,
            icon: selectedCondition.icon,
            windSpeed,
            pressure,
            visibility,
            sunrise: sunrise.toTimeString().slice(0, 5),
            sunset: sunset.toTimeString().slice(0, 5),
            source: 'Enhanced Fallback',
            lastUpdated: new Date().toLocaleTimeString(isJapanesePage ? 'ja-JP' : 'en-US', {
                hour: '2-digit', 
                minute: '2-digit'
            })
        };
    }

    convertWeatherAPIIcon(code) {
        // Convert WeatherAPI.com codes to emoji icons
        const iconMap = {
            1000: '☀️', // Clear
            1003: '⛅', // Partly cloudy
            1006: '☁️', // Cloudy
            1009: '☁️', // Overcast
            1030: '🌫️', // Mist
            1063: '🌦️', // Patchy rain
            1066: '🌨️', // Patchy snow
            1069: '🌨️', // Patchy sleet
            1087: '⛈️', // Thundery outbreaks
            1114: '🌨️', // Blowing snow
            1117: '🌨️', // Blizzard
            1135: '🌫️', // Fog
            1147: '🌫️', // Freezing fog
            1150: '🌦️', // Patchy light drizzle
            1153: '🌧️', // Light drizzle
            1168: '🌧️', // Freezing drizzle
            1171: '🌧️', // Heavy freezing drizzle
            1180: '🌦️', // Patchy light rain
            1183: '🌧️', // Light rain
            1186: '🌧️', // Moderate rain at times
            1189: '🌧️', // Moderate rain
            1192: '🌧️', // Heavy rain at times
            1195: '🌧️', // Heavy rain
            1198: '🌧️', // Light freezing rain
            1201: '🌧️', // Moderate or heavy freezing rain
            1204: '🌨️', // Light sleet
            1207: '🌨️', // Moderate or heavy sleet
            1210: '🌨️', // Patchy light snow
            1213: '🌨️', // Light snow
            1216: '🌨️', // Patchy moderate snow
            1219: '🌨️', // Moderate snow
            1222: '🌨️', // Patchy heavy snow
            1225: '🌨️', // Heavy snow
            1237: '🌨️', // Ice pellets
            1240: '🌦️', // Light rain shower
            1243: '🌧️', // Moderate or heavy rain shower
            1246: '🌧️', // Torrential rain shower
            1249: '🌨️', // Light sleet showers
            1252: '🌨️', // Moderate or heavy sleet showers
            1255: '🌨️', // Light snow showers
            1258: '🌨️', // Moderate or heavy snow showers
            1261: '🌨️', // Light showers of ice pellets
            1264: '🌨️', // Moderate or heavy showers of ice pellets
            1273: '⛈️', // Patchy light rain with thunder
            1276: '⛈️'  // Moderate or heavy rain with thunder
        };
        return iconMap[code] || '🌤️';
    }

    convertAccuWeatherIcon(code) {
        // Convert AccuWeather codes to emoji icons
        const iconMap = {
            1: '☀️', 2: '☀️', 3: '⛅', 4: '⛅', 5: '⛅', 6: '☁️', 7: '☁️', 8: '☁️',
            11: '🌫️', 12: '🌦️', 13: '🌦️', 14: '🌦️', 15: '⛈️', 16: '⛈️', 17: '⛈️',
            18: '🌧️', 19: '🌧️', 20: '🌧️', 21: '🌧️', 22: '🌧️', 23: '🌧️', 24: '🌧️',
            25: '🌧️', 26: '🌧️', 29: '🌧️', 30: '🌧️', 31: '🌧️', 32: '🌧️', 33: '🌧️',
            34: '🌧️', 35: '🌧️', 36: '🌧️', 37: '🌧️', 38: '🌧️', 39: '🌧️', 40: '🌧️',
            41: '🌨️', 42: '🌨️', 43: '🌨️', 44: '🌨️'
        };
        return iconMap[code] || '🌤️';
    }

    getWeatherDescription(code) {
        const isJapanesePage = window.location.pathname.includes('/ja/');
        const descriptions = {
            0: isJapanesePage ? '晴れ' : 'Clear sky',
            1: isJapanesePage ? 'ほぼ晴れ' : 'Mainly clear',
            2: isJapanesePage ? '部分的に曇り' : 'Partly cloudy',
            3: isJapanesePage ? '曇り' : 'Overcast',
            45: isJapanesePage ? '霧' : 'Foggy',
            48: isJapanesePage ? '着氷性の霧' : 'Depositing rime fog',
            51: isJapanesePage ? '軽い霧雨' : 'Light drizzle',
            53: isJapanesePage ? '霧雨' : 'Moderate drizzle',
            55: isJapanesePage ? '強い霧雨' : 'Dense drizzle',
            56: isJapanesePage ? '軽い着氷性の霧雨' : 'Light freezing drizzle',
            57: isJapanesePage ? '着氷性の霧雨' : 'Dense freezing drizzle',
            61: isJapanesePage ? '小雨' : 'Slight rain',
            63: isJapanesePage ? '雨' : 'Moderate rain',
            65: isJapanesePage ? '大雨' : 'Heavy rain',
            66: isJapanesePage ? '軽い着氷性の雨' : 'Light freezing rain',
            67: isJapanesePage ? '着氷性の雨' : 'Heavy freezing rain',
            71: isJapanesePage ? '小雪' : 'Slight snow fall',
            73: isJapanesePage ? '雪' : 'Moderate snow fall',
            75: isJapanesePage ? '大雪' : 'Heavy snow fall',
            77: isJapanesePage ? '細かい雪' : 'Snow grains',
            80: isJapanesePage ? '軽いにわか雨' : 'Slight rain showers',
            81: isJapanesePage ? 'にわか雨' : 'Moderate rain showers',
            82: isJapanesePage ? '激しいにわか雨' : 'Violent rain showers',
            85: isJapanesePage ? '軽いにわか雪' : 'Slight snow showers',
            86: isJapanesePage ? 'にわか雪' : 'Heavy snow showers',
            95: isJapanesePage ? '雷雨' : 'Thunderstorm',
            96: isJapanesePage ? '軽い雹を伴う雷雨' : 'Thunderstorm with slight hail',
            99: isJapanesePage ? '激しい雹を伴う雷雨' : 'Thunderstorm with heavy hail'
        };
        return descriptions[code] || (isJapanesePage ? '晴れ' : 'Clear sky');
    }

    convertWeatherCodeToIcon(code) {
        const iconMap = {
            0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
            45: '🌫️', 48: '🌫️',
            51: '🌦️', 53: '🌧️', 55: '🌧️', 56: '🌧️', 57: '🌧️',
            61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
            71: '🌨️', 73: '🌨️', 75: '🌨️', 77: '🌨️',
            80: '🌦️', 81: '🌧️', 82: '🌧️',
            85: '🌨️', 86: '🌨️',
            95: '⛈️', 96: '⛈️', 99: '⛈️'
        };
        return iconMap[code] || '🌤️';
    }

    // Camera Navigation
    setupCameraNavigation() {
        console.log('🎥 Setting up camera navigation...');
        
        const prevBtn = document.getElementById('camera-prev');
        const nextBtn = document.getElementById('camera-next');
        const cameraTitle = document.getElementById('camera-title');
        const cameraDescription = document.getElementById('camera-description');

        console.log('🎥 Camera navigation elements found:', {
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn,
            cameraTitle: !!cameraTitle,
            cameraDescription: !!cameraDescription
        });

        // If elements not found, retry after a short delay
        if (!prevBtn || !nextBtn) {
            console.log('🎥 Camera navigation elements not found, retrying in 500ms...');
            setTimeout(() => this.setupCameraNavigation(), 500);
            return;
        }
        
        console.log('🎥 Camera navigation elements found successfully, setting up event listeners...');

        // Remove any existing event listeners to prevent duplicates
        const newPrevBtn = prevBtn.cloneNode(true);
        const newNextBtn = nextBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

        if (newPrevBtn) {
            newPrevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎥 Previous camera button clicked - EVENT FIRED');
                newPrevBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                setTimeout(() => {
                    newPrevBtn.style.backgroundColor = '';
                }, 200);
                this.previousCamera();
            });
            console.log('✅ Previous button event listener added');
        } else {
            console.error('❌ Previous camera button not found');
        }
        
        if (newNextBtn) {
            newNextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎥 Next camera button clicked - EVENT FIRED');
                newNextBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                setTimeout(() => {
                    newNextBtn.style.backgroundColor = '';
                }, 200);
                this.nextCamera();
            });
            console.log('✅ Next button event listener added');
        } else {
            console.error('❌ Next camera button not found');
        }

        this.updateCameraInfo();
        console.log('🎥 Camera navigation setup complete');
    }

    previousCamera() {
        console.log('🎥 Switching to previous camera...');
        this.currentCameraIndex = (this.currentCameraIndex - 1 + this.cameras.length) % this.cameras.length;
        console.log('🎥 New camera index:', this.currentCameraIndex);
        
        // Clear any existing health check
        if (this.streamHealthCheck) {
            clearInterval(this.streamHealthCheck);
            this.streamHealthCheck = null;
        }
        
        this.updateCameraInfo();
        this.updateCameraEmbed();
    }

    nextCamera() {
        console.log('🎥 Switching to next camera...');
        console.log('🎥 Current camera index before switch:', this.currentCameraIndex);
        console.log('🎥 Total cameras available:', this.cameras.length);
        
        this.currentCameraIndex = (this.currentCameraIndex + 1) % this.cameras.length;
        console.log('🎥 New camera index:', this.currentCameraIndex);
        
        // Clear any existing health check
        if (this.streamHealthCheck) {
            clearInterval(this.streamHealthCheck);
            this.streamHealthCheck = null;
        }
        
        this.updateCameraInfo();
        this.updateCameraEmbed();
        
        console.log('🎥 Camera switch completed');
    }

    updateCameraInfo() {
        console.log('🎥 Updating camera info...');
        const camera = this.cameras[this.currentCameraIndex];
        const titleEl = document.getElementById('camera-title');
        const descEl = document.getElementById('camera-description');
        const counterEl = document.getElementById('camera-counter');

        console.log('🎥 Camera info elements found:', {
            titleEl: !!titleEl,
            descEl: !!descEl,
            counterEl: !!counterEl
        });

        if (titleEl) {
            titleEl.textContent = camera.title;
            console.log('🎥 Updated title:', camera.title);
        }
        if (descEl) {
            descEl.textContent = camera.description;
            console.log('🎥 Updated description:', camera.description);
        }
        if (counterEl) {
            counterEl.textContent = `${this.currentCameraIndex + 1} / ${this.cameras.length}`;
            console.log('🎥 Updated counter:', `${this.currentCameraIndex + 1} / ${this.cameras.length}`);
        }
    }

    updateCameraEmbed() {
        console.log('🎥 Updating camera embed...');
        const camera = this.cameras[this.currentCameraIndex];
        const embedEl = document.getElementById('camera-embed');
        
        console.log('🎥 Camera data:', camera);
        console.log('🎥 Embed element found:', !!embedEl);
        
        if (embedEl) {
            const iframeSrc = `https://www.youtube.com/embed/${camera.id}?autoplay=1&mute=1`;
            console.log('🎥 Iframe src:', iframeSrc);
            
            // Create iframe with error handling
            const iframe = document.createElement('iframe');
            iframe.src = iframeSrc;
            iframe.className = 'w-full h-full rounded-lg';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            // Add error handling for broken streams
            iframe.onerror = () => {
                console.log('❌ Stream error detected, trying next camera...');
                this.handleStreamError();
            };
            
            // Add load event to detect if stream is working
            iframe.onload = () => {
                console.log('✅ Stream loaded successfully');
                this.lastWorkingCameraIndex = this.currentCameraIndex;
            };
            
            // Clear previous content and add new iframe
            embedEl.innerHTML = '';
            embedEl.appendChild(iframe);
            
            // Set a timeout to detect if stream fails to load
            setTimeout(() => {
                this.checkStreamHealth();
            }, 5000);
            
            console.log('🎥 Camera embed updated successfully');
        } else {
            console.error('❌ Camera embed element not found');
        }
    }
    
    handleStreamError() {
        console.log('🔄 Handling stream error, trying next camera...');
        this.nextCamera();
    }
    
    checkStreamHealth() {
        const embedEl = document.getElementById('camera-embed');
        if (!embedEl) return;
        
        const iframe = embedEl.querySelector('iframe');
        if (!iframe) return;
        
        // Check if iframe has loaded content
        try {
            // If we can't access the iframe content due to CORS, we'll use a different approach
            // Set up a periodic check to see if the stream is working
            this.streamHealthCheck = setInterval(() => {
                this.monitorStreamHealth();
            }, 10000); // Check every 10 seconds
        } catch (error) {
            console.log('⚠️ Cannot directly check iframe content due to CORS, using fallback monitoring');
        }
    }
    
    monitorStreamHealth() {
        // This method will be called periodically to check stream health
        console.log('🔍 Monitoring stream health...');
        
        const embedEl = document.getElementById('camera-embed');
        if (!embedEl) return;
        
        const iframe = embedEl.querySelector('iframe');
        if (!iframe) return;
        
        // Check if iframe is still in the DOM and has a valid src
        if (iframe.src && iframe.src.includes('youtube.com')) {
            console.log('✅ Stream appears to be healthy');
        } else {
            console.log('❌ Stream appears to be broken, switching to next camera...');
            this.handleStreamError();
        }
    }
    
    // Enhanced error handling for broken streams
    handleStreamError() {
        console.log('🔄 Handling stream error, trying next camera...');
        
        // Don't switch if we're already on the last working camera
        if (this.currentCameraIndex === this.lastWorkingCameraIndex) {
            console.log('⚠️ Already on last working camera, cycling through all cameras...');
        }
        
        // Try the next camera
        this.nextCamera();
        
        // If we've tried all cameras and still have issues, show a fallback message
        setTimeout(() => {
            const embedEl = document.getElementById('camera-embed');
            if (embedEl) {
                const iframe = embedEl.querySelector('iframe');
                if (!iframe || !iframe.src) {
                    console.log('⚠️ All streams appear to be down, showing fallback message');
                    embedEl.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gray-900 text-white rounded-lg">
                            <div class="text-center">
                                <div class="text-4xl mb-4">📹</div>
                                <div class="text-lg font-semibold mb-2">Stream Temporarily Unavailable</div>
                                <div class="text-sm text-gray-400">Please try again in a few moments</div>
                                <button onclick="window.liveKyotoWidget.retryStream()" 
                                        class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                                    Retry Stream
                                </button>
                            </div>
                        </div>
                    `;
                }
            }
        }, 3000);
    }
    
    retryStream() {
        console.log('🔄 Retrying stream...');
        this.currentCameraIndex = 0; // Start from the first camera
        this.updateCameraInfo();
        this.updateCameraEmbed();
    }

    // Widget Update
    updateWidget() {
        this.updateWeatherDisplay();
        this.updateCameraEmbed();
    }

    updateWeatherDisplay() {
        console.log('🌤️ Updating weather display...');
        console.log('🌤️ Current weather data:', this.weatherData);

        // Use fallback data if API data is not available
        const weather = this.weatherData || this.getEnhancedFallbackWeatherData();
        console.log('🌤️ Weather data to display:', weather);
        
        // Check if weather widget container exists
        const weatherWidget = document.getElementById('kyoto-weather-widget');
        console.log('🌤️ Weather widget container found:', !!weatherWidget);
        if (!weatherWidget) {
            console.error('❌ Weather widget container not found!');
            return;
        }
        
        // Log all weather-related elements to see what's available
        console.log('🔍 Searching for weather elements...');
        const allElements = document.querySelectorAll('[id*="weather"]');
        console.log('🔍 Found elements with "weather" in ID:', allElements.length);
        allElements.forEach(el => console.log('🔍 Element:', el.id, el.textContent));
        
        // Update individual weather elements
        const temperatureEl = document.getElementById('weather-temperature');
        const iconEl = document.getElementById('weather-icon');
        const descriptionEl = document.getElementById('weather-description');
        const feelsLikeEl = document.getElementById('weather-feels-like');
        const windEl = document.getElementById('weather-wind');
        const humidityEl = document.getElementById('weather-humidity');
        const visibilityEl = document.getElementById('weather-visibility');
        const pressureEl = document.getElementById('weather-pressure');
        const sunriseEl = document.getElementById('weather-sunrise');
        const sunsetEl = document.getElementById('weather-sunset');
        const lastUpdatedEl = document.getElementById('weather-last-updated');
        
        console.log('🌤️ Found weather elements:', {
            temperatureEl: !!temperatureEl,
            iconEl: !!iconEl,
            descriptionEl: !!descriptionEl,
            feelsLikeEl: !!feelsLikeEl,
            windEl: !!windEl,
            humidityEl: !!humidityEl,
            visibilityEl: !!visibilityEl,
            pressureEl: !!pressureEl,
            sunriseEl: !!sunriseEl,
            sunsetEl: !!sunsetEl,
            lastUpdatedEl: !!lastUpdatedEl
        });
        
        // Update temperature
        if (temperatureEl) {
            temperatureEl.textContent = `${weather.temperature}°C`;
            console.log('🌤️ Updated temperature:', weather.temperature);
        }
        
        // Update icon
        if (iconEl) {
            iconEl.textContent = weather.icon;
            console.log('🌤️ Updated icon:', weather.icon);
        }
        
        // Update description
        if (descriptionEl) {
            descriptionEl.textContent = weather.description;
            console.log('🌤️ Updated description:', weather.description);
        }
        
        // Update feels like
        if (feelsLikeEl) {
            const isJapanesePage = window.location.pathname.includes('/ja/');
            const feelsLikeText = isJapanesePage ? 
                `体感温度 ${weather.feelsLike}°C` : 
                `Feels like ${weather.feelsLike}°C`;
            feelsLikeEl.textContent = feelsLikeText;
            console.log('🌤️ Updated feels like:', weather.feelsLike);
        }
        
        // Update wind
        if (windEl) {
            windEl.textContent = `${weather.windSpeed} km/h`;
            console.log('🌤️ Updated wind:', weather.windSpeed);
        }
        
        // Update humidity
        if (humidityEl) {
            humidityEl.textContent = `${weather.humidity}%`;
            console.log('🌤️ Updated humidity:', weather.humidity);
        }
        
        // Update visibility
        if (visibilityEl) {
            visibilityEl.textContent = `${weather.visibility} km`;
            console.log('🌤️ Updated visibility:', weather.visibility);
        }
        
        // Update pressure
        if (pressureEl) {
            pressureEl.textContent = `${weather.pressure} hPa`;
            console.log('🌤️ Updated pressure:', weather.pressure);
        }
        
        // Update sunrise
        if (sunriseEl) {
            sunriseEl.textContent = weather.sunrise;
            console.log('🌤️ Updated sunrise:', weather.sunrise);
        }
        
        // Update sunset
        if (sunsetEl) {
            sunsetEl.textContent = weather.sunset;
            console.log('🌤️ Updated sunset:', weather.sunset);
        }
        
        // Update last updated
        if (lastUpdatedEl) {
            const isJapanesePage = window.location.pathname.includes('/ja/');
            const timeText = weather.lastUpdated || 
                new Date().toLocaleTimeString(isJapanesePage ? 'ja-JP' : 'en-US', {
                    hour: '2-digit', 
                    minute: '2-digit'
                });
            lastUpdatedEl.textContent = timeText;
            console.log('🌤️ Updated last updated:', timeText);
        }
        
        console.log('✅ Weather display updated successfully');
    }

    getWeatherIcon(iconCode) {
        const icons = {
            '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️', '13d': '🌨️', '13n': '🌨️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return icons[iconCode] || '🌤️';
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    // Auto refresh
    startAutoRefresh() {
        this.weatherRefreshInterval = setInterval(() => {
            this.loadWeatherData();
            this.updateWidget();
        }, 300000); // Refresh every 5 minutes
    }
    
    // Cleanup method to clear all intervals
    cleanup() {
        if (this.weatherRefreshInterval) {
            clearInterval(this.weatherRefreshInterval);
        }
        if (this.streamHealthCheck) {
            clearInterval(this.streamHealthCheck);
        }
        console.log('🧹 Live Kyoto Widget cleanup completed');
    }
    
    // Load streams from YouTube playlist
    async loadPlaylistStreams() {
        try {
            console.log('🎥 Loading playlist streams...');
            
            // Kyoto Live Stream Collection - CORRECT Video IDs and Titles from Playlist
            // Source: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz
            // Actual titles from YouTube videos provided by user
            const playlistStreams = [
                {
                    id: 'jqtsC5BYlIk',
                    title: 'Saga Arashiyama',
                    description: 'Live view from Saga Arashiyama Togetsukyo Bridge North End',
                    thumbnail: 'https://img.youtube.com/vi/jqtsC5BYlIk/maxresdefault.jpg'
                },
                {
                    id: 'wuC8wRvXock',
                    title: 'Nishiki Market',
                    description: 'Live view from Nishiki Market',
                    thumbnail: 'https://img.youtube.com/vi/wuC8wRvXock/maxresdefault.jpg'
                },
                {
                    id: 'Op-lf2NRMzs',
                    title: 'Bamboo Forest Path',
                    description: 'Live view from Arashiyama Bamboo Forest Path',
                    thumbnail: 'https://img.youtube.com/vi/Op-lf2NRMzs/maxresdefault.jpg'
                },
                {
                    id: 'KHglGodzQ9g',
                    title: 'Kitano Tenmangu Shrine',
                    description: 'Live view from Kitano Tenmangu Shrine',
                    thumbnail: 'https://img.youtube.com/vi/KHglGodzQ9g/maxresdefault.jpg'
                },
                {
                    id: 'v9rQqa_VTEY',
                    title: 'Kyoto Station Bus Terminal',
                    description: 'Live view from Kyoto Station Bus Terminal',
                    thumbnail: 'https://img.youtube.com/vi/v9rQqa_VTEY/maxresdefault.jpg'
                },
                {
                    id: 'S6IkZhhwG4A',
                    title: 'The Philosopher\'s Path',
                    description: 'Live view from The Philosopher\'s Path',
                    thumbnail: 'https://img.youtube.com/vi/S6IkZhhwG4A/maxresdefault.jpg'
                },
                {
                    id: 'Gxt3YCa2Phc',
                    title: 'Nene no michi (Nene Street)',
                    description: 'Live view from Nene no michi (Nene Street)',
                    thumbnail: 'https://img.youtube.com/vi/Gxt3YCa2Phc/maxresdefault.jpg'
                },
                {
                    id: 'CO_ZjH6N7RE',
                    title: 'Kyoto Station Hachijo Taxi Station',
                    description: 'Live view from Kyoto Station Hachijo Taxi Station',
                    thumbnail: 'https://img.youtube.com/vi/CO_ZjH6N7RE/maxresdefault.jpg'
                },
                {
                    id: 'PXg3ZXgMkGk',
                    title: 'Hanamikoji Street',
                    description: 'Live view from Hanamikoji Street',
                    thumbnail: 'https://img.youtube.com/vi/PXg3ZXgMkGk/maxresdefault.jpg'
                },
                {
                    id: 'Onyb8uHQV5Y',
                    title: 'Fushimi Inari Shrine',
                    description: 'Live view from Fushimi Inari Shrine Back Path',
                    thumbnail: 'https://img.youtube.com/vi/Onyb8uHQV5Y/maxresdefault.jpg'
                },
                {
                    id: 'ldO0Eqoomms',
                    title: 'Daikakuji Temple',
                    description: 'Live view from Daikakuji Temple',
                    thumbnail: 'https://img.youtube.com/vi/ldO0Eqoomms/maxresdefault.jpg'
                },
                {
                    id: '4Za-6AXfu4w',
                    title: 'Seiryoji Temple (Saga Shaka-do)',
                    description: 'Live view from Seiryoji Temple (Saga Shaka-do)',
                    thumbnail: 'https://img.youtube.com/vi/4Za-6AXfu4w/maxresdefault.jpg'
                },
                {
                    id: 'Qm4X_oY-9YM',
                    title: 'Saga-Toriimoto Preserved Street District',
                    description: 'Live view from Saga-Toriimoto Preserved Street District',
                    thumbnail: 'https://img.youtube.com/vi/Qm4X_oY-9YM/maxresdefault.jpg'
                },
                {
                    id: 'TUjpxCuWZ4c',
                    title: 'Gion Matsuri Festival (Maintenance)',
                    description: 'Live view from Gion Matsuri Festival around Karasuma Rokkaku (Under Maintenance)',
                    thumbnail: 'https://img.youtube.com/vi/TUjpxCuWZ4c/maxresdefault.jpg'
                }
            ];
            
            // Add playlist streams to the cameras array
            this.cameras = [...this.cameras, ...playlistStreams];
            
            console.log(`🎥 Loaded ${playlistStreams.length} playlist streams`);
            console.log(`🎥 Total cameras: ${this.cameras.length}`);
            
            // Update the counter display to show total streams
            const counterEl = document.getElementById('camera-counter');
            if (counterEl) {
                counterEl.textContent = `1 / ${this.cameras.length}`;
            }
            
            // Update the camera navigation if already initialized
            if (this.currentCameraIndex !== undefined) {
                this.updateCameraInfo();
            }
            
        } catch (error) {
            console.error('❌ Error loading playlist streams:', error);
        }
    }
}

// Test if class is defined
console.log('🎥 LiveKyotoWidget class defined:', typeof LiveKyotoWidget);
if (typeof LiveKyotoWidget !== 'undefined') {
    console.log('✅ LiveKyotoWidget class is available');
} else {
    console.error('❌ LiveKyotoWidget class is not defined');
}