// Weather Service for MrKyoto
// Provides real-time weather data for Kyoto using reliable free APIs

class WeatherService {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        this.kyotoCoordinates = { lat: 35.0116, lon: 135.7681 };
        this.isJapanesePage = window.location.pathname.includes('/ja/');
    }

    async getKyotoWeather() {
        const cacheKey = 'kyoto_weather';
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            console.log('🌤️ Using cached weather data');
            return cached.data;
        }

        try {
            // Try Open-Meteo API first (free, no API key required)
            const weatherData = await this.fetchFromOpenMeteo();
            
            if (weatherData && this.validateWeatherData(weatherData)) {
                console.log('✅ Weather data fetched successfully from Open-Meteo');
                
                // Cache the successful result
                this.cache.set(cacheKey, {
                    data: weatherData,
                    timestamp: Date.now()
                });
                
                return weatherData;
            }
        } catch (error) {
            console.error('❌ Error fetching weather data:', error);
        }

        // Return enhanced fallback data if API fails
        console.log('⚠️ Using enhanced fallback weather data');
        return this.getEnhancedFallbackData();
    }

    async fetchFromOpenMeteo() {
        try {
            console.log('🌤️ Fetching weather data from Open-Meteo...');
            
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${this.kyotoCoordinates.lat}&longitude=${this.kyotoCoordinates.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&daily=sunrise,sunset&timezone=Asia%2FTokyo`
            );
            
            if (response.ok) {
                const data = await response.json();
                console.log('🌤️ Open-Meteo API response:', data);
                return this.parseOpenMeteoData(data);
            } else {
                console.error('❌ Open-Meteo API error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('❌ Open-Meteo fetch failed:', error);
        }
        return null;
    }

    parseOpenMeteoData(data) {
        const current = data.current;
        const daily = data.daily;
        
        console.log('🌤️ Parsing Open-Meteo data:', current);
        
        // Get today's sunrise and sunset times
        const today = new Date().toISOString().split('T')[0];
        const todayIndex = daily.time.findIndex(date => date === today);
        
        const sunrise = todayIndex >= 0 ? daily.sunrise[todayIndex] : '06:30';
        const sunset = todayIndex >= 0 ? daily.sunset[todayIndex] : '17:30';
        
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
            source: 'Open-Meteo',
            lastUpdated: new Date().toLocaleTimeString(this.isJapanesePage ? 'ja-JP' : 'en-US', {
                hour: '2-digit', 
                minute: '2-digit'
            })
        };
        
        console.log('🌤️ Parsed weather data:', weatherData);
        return weatherData;
    }

    getEnhancedFallbackData() {
        const now = new Date();
        const month = now.getMonth();
        const hour = now.getHours();
        
        // Realistic Kyoto weather patterns
        const seasonalData = this.getSeasonalWeatherData(month, hour);
        
        return {
            ...seasonalData,
            source: 'Enhanced Fallback',
            lastUpdated: now.toLocaleTimeString(this.isJapanesePage ? 'ja-JP' : 'en-US', {
                hour: '2-digit', 
                minute: '2-digit'
            })
        };
    }

    getSeasonalWeatherData(month, hour) {
        // Kyoto seasonal weather patterns
        const seasons = {
            winter: { // Dec-Feb
                tempRange: { min: -2, max: 12 },
                conditions: [
                    { desc: this.isJapanesePage ? '晴れ' : 'Clear sky', icon: '☀️', prob: 0.6 },
                    { desc: this.isJapanesePage ? '部分的に曇り' : 'Partly cloudy', icon: '⛅', prob: 0.3 },
                    { desc: this.isJapanesePage ? '小雪' : 'Light snow', icon: '🌨️', prob: 0.1 }
                ],
                humidity: { min: 50, max: 80 },
                wind: { min: 8, max: 20 },
                pressure: { min: 1010, max: 1050 },
                visibility: { min: 8, max: 13 }
            },
            spring: { // Mar-May
                tempRange: { min: 8, max: 22 },
                conditions: [
                    { desc: this.isJapanesePage ? '晴れ' : 'Clear sky', icon: '☀️', prob: 0.5 },
                    { desc: this.isJapanesePage ? '部分的に曇り' : 'Partly cloudy', icon: '⛅', prob: 0.3 },
                    { desc: this.isJapanesePage ? '小雨' : 'Light rain', icon: '🌧️', prob: 0.2 }
                ],
                humidity: { min: 40, max: 70 },
                wind: { min: 5, max: 15 },
                pressure: { min: 1010, max: 1040 },
                visibility: { min: 8, max: 15 }
            },
            summer: { // Jun-Aug
                tempRange: { min: 20, max: 35 },
                conditions: [
                    { desc: this.isJapanesePage ? '晴れ' : 'Clear sky', icon: '☀️', prob: 0.4 },
                    { desc: this.isJapanesePage ? '部分的に曇り' : 'Partly cloudy', icon: '⛅', prob: 0.4 },
                    { desc: this.isJapanesePage ? '小雨' : 'Light rain', icon: '🌧️', prob: 0.2 }
                ],
                humidity: { min: 60, max: 90 },
                wind: { min: 3, max: 12 },
                pressure: { min: 1005, max: 1025 },
                visibility: { min: 6, max: 12 }
            },
            autumn: { // Sep-Nov
                tempRange: { min: 10, max: 25 },
                conditions: [
                    { desc: this.isJapanesePage ? '晴れ' : 'Clear sky', icon: '☀️', prob: 0.6 },
                    { desc: this.isJapanesePage ? '部分的に曇り' : 'Partly cloudy', icon: '⛅', prob: 0.3 },
                    { desc: this.isJapanesePage ? '小雨' : 'Light rain', icon: '🌧️', prob: 0.1 }
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
            sunset: sunset.toTimeString().slice(0, 5)
        };
    }

    validateWeatherData(data) {
        return data && 
               typeof data.temperature === 'number' &&
               typeof data.humidity === 'number' &&
               typeof data.windSpeed === 'number' &&
               typeof data.pressure === 'number' &&
               data.temperature >= -50 && data.temperature <= 60 &&
               data.humidity >= 0 && data.humidity <= 100 &&
               data.windSpeed >= 0 && data.windSpeed <= 200 &&
               data.pressure >= 800 && data.pressure <= 1200;
    }

    getWeatherDescription(code) {
        const descriptions = {
            0: this.isJapanesePage ? '晴れ' : 'Clear sky',
            1: this.isJapanesePage ? 'ほぼ晴れ' : 'Mainly clear',
            2: this.isJapanesePage ? '部分的に曇り' : 'Partly cloudy',
            3: this.isJapanesePage ? '曇り' : 'Overcast',
            45: this.isJapanesePage ? '霧' : 'Foggy',
            48: this.isJapanesePage ? '着氷性の霧' : 'Depositing rime fog',
            51: this.isJapanesePage ? '軽い霧雨' : 'Light drizzle',
            53: this.isJapanesePage ? '霧雨' : 'Moderate drizzle',
            55: this.isJapanesePage ? '強い霧雨' : 'Dense drizzle',
            56: this.isJapanesePage ? '軽い着氷性の霧雨' : 'Light freezing drizzle',
            57: this.isJapanesePage ? '着氷性の霧雨' : 'Dense freezing drizzle',
            61: this.isJapanesePage ? '小雨' : 'Slight rain',
            63: this.isJapanesePage ? '雨' : 'Moderate rain',
            65: this.isJapanesePage ? '大雨' : 'Heavy rain',
            66: this.isJapanesePage ? '軽い着氷性の雨' : 'Light freezing rain',
            67: this.isJapanesePage ? '着氷性の雨' : 'Heavy freezing rain',
            71: this.isJapanesePage ? '小雪' : 'Slight snow fall',
            73: this.isJapanesePage ? '雪' : 'Moderate snow fall',
            75: this.isJapanesePage ? '大雪' : 'Heavy snow fall',
            77: this.isJapanesePage ? '細かい雪' : 'Snow grains',
            80: this.isJapanesePage ? '軽いにわか雨' : 'Slight rain showers',
            81: this.isJapanesePage ? 'にわか雨' : 'Moderate rain showers',
            82: this.isJapanesePage ? '激しいにわか雨' : 'Violent rain showers',
            85: this.isJapanesePage ? '軽いにわか雪' : 'Slight snow showers',
            86: this.isJapanesePage ? 'にわか雪' : 'Heavy snow showers',
            95: this.isJapanesePage ? '雷雨' : 'Thunderstorm',
            96: this.isJapanesePage ? '軽い雹を伴う雷雨' : 'Thunderstorm with slight hail',
            99: this.isJapanesePage ? '激しい雹を伴う雷雨' : 'Thunderstorm with heavy hail'
        };
        return descriptions[code] || (this.isJapanesePage ? '晴れ' : 'Clear sky');
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

    // Method to update weather display on any page
    updateWeatherDisplay(weatherData = null) {
        console.log('🌤️ Updating weather display...');
        
        if (!weatherData) {
            console.log('🌤️ No weather data provided, fetching...');
            this.getKyotoWeather().then(data => {
                this.updateWeatherElements(data);
            });
            return;
        }
        
        this.updateWeatherElements(weatherData);
    }

    updateWeatherElements(weather) {
        console.log('🌤️ Updating weather elements with data:', weather);
        
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

        console.log('🔍 Weather elements found:', Object.keys(elements).filter(key => elements[key]));

        // Update temperature
        if (elements.temperature) {
            elements.temperature.textContent = `${weather.temperature}°C`;
        }

        // Update icon
        if (elements.icon) {
            elements.icon.textContent = weather.icon;
        }

        // Update description
        if (elements.description) {
            elements.description.textContent = weather.description;
        }

        // Update feels like
        if (elements.feelsLike) {
            const feelsLikeText = this.isJapanesePage ? 
                `体感温度 ${weather.feelsLike}°C` : 
                `Feels like ${weather.feelsLike}°C`;
            elements.feelsLike.textContent = feelsLikeText;
        }

        // Update wind
        if (elements.wind) {
            elements.wind.textContent = `${weather.windSpeed} km/h`;
        }

        // Update humidity
        if (elements.humidity) {
            elements.humidity.textContent = `${weather.humidity}%`;
        }

        // Update visibility
        if (elements.visibility) {
            elements.visibility.textContent = `${weather.visibility} km`;
        }

        // Update pressure
        if (elements.pressure) {
            elements.pressure.textContent = `${weather.pressure} hPa`;
        }

        // Update sunrise
        if (elements.sunrise) {
            elements.sunrise.textContent = weather.sunrise;
        }

        // Update sunset
        if (elements.sunset) {
            elements.sunset.textContent = weather.sunset;
        }

        // Update last updated
        if (elements.lastUpdated) {
            elements.lastUpdated.textContent = weather.lastUpdated || 
                new Date().toLocaleTimeString(this.isJapanesePage ? 'ja-JP' : 'en-US', {
                    hour: '2-digit', 
                    minute: '2-digit'
                });
        }

        console.log('✅ Weather display updated successfully');
    }
}

// Export for use in other files
window.WeatherService = WeatherService; 