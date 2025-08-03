// Weather Service for MrKyoto
// Provides real-time weather data for Kyoto using multiple APIs and fallback methods

class WeatherService {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        this.kyotoCoordinates = { lat: 35.0116, lon: 135.7681 };
    }

    async getKyotoWeather() {
        const cacheKey = 'kyoto_weather';
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            // Try multiple weather sources
            const weatherData = await this.fetchFromMultipleSources();
            
            if (weatherData) {
                this.cache.set(cacheKey, {
                    data: weatherData,
                    timestamp: Date.now()
                });
                return weatherData;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }

        // Return enhanced fallback data
        return this.getEnhancedFallbackData();
    }

    async fetchFromMultipleSources() {
        // Try Open-Meteo API first (no API key required)
        try {
            const data = await this.fetchFromPublicWeatherAPI();
            if (data && this.validateWeatherData(data)) {
                console.log('✅ Weather data fetched successfully from Open-Meteo');
                return data;
            }
        } catch (error) {
            console.log('Open-Meteo failed, trying fallback...');
        }

        // Try OpenWeatherMap as fallback
        try {
            const data = await this.fetchFromOpenWeatherMap();
            if (data && this.validateWeatherData(data)) {
                console.log('✅ Weather data fetched successfully from OpenWeatherMap');
                return data;
            }
        } catch (error) {
            console.log('OpenWeatherMap failed, using fallback data...');
        }

        return null;
    }

    async fetchFromOpenWeatherMap() {
        try {
            // Using a public API key for demo purposes
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.kyotoCoordinates.lat}&lon=${this.kyotoCoordinates.lon}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`);
            
            if (response.ok) {
                const data = await response.json();
                return this.parseOpenWeatherMapData(data);
            }
        } catch (error) {
            console.log('OpenWeatherMap failed');
        }
        return null;
    }

    async fetchFromPublicWeatherAPI() {
        try {
            // Using a public weather API that doesn't require authentication
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.kyotoCoordinates.lat}&longitude=${this.kyotoCoordinates.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl&timezone=auto`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('🌤️ Open-Meteo API response:', data);
                return this.parsePublicWeatherAPIData(data);
            }
        } catch (error) {
            console.log('Public Weather API failed:', error);
        }
        return null;
    }

    async fetchFromWeatherAPI() {
        try {
            // Using a free public endpoint (limited but functional)
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${this.kyotoCoordinates.lat},${this.kyotoCoordinates.lon}&aqi=no`);
            
            if (response.ok) {
                const data = await response.json();
                return this.parseWeatherAPIData(data);
            }
        } catch (error) {
            console.log('WeatherAPI failed');
        }
        return null;
    }

    async fetchFromMeteomatics() {
        try {
            // Meteomatics free tier (requires registration)
            const response = await fetch(`https://api.meteomatics.com/2025-01-01T00:00:00Z/t_2m:C,relative_humidity_2m:p,wind_speed_10m:kmh,pressure_2m:hpa/${this.kyotoCoordinates.lat},${this.kyotoCoordinates.lon}/json`);
            
            if (response.ok) {
                const data = await response.json();
                return this.parseMeteomaticsData(data);
            }
        } catch (error) {
            console.log('Meteomatics failed');
        }
        return null;
    }

    async fetchFromVisualCrossing() {
        try {
            // Visual Crossing Weather API (free tier)
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kyoto,Japan?unitGroup=metric&include=current&key=YOUR_API_KEY&contentType=json`);
            
            if (response.ok) {
                const data = await response.json();
                return this.parseVisualCrossingData(data);
            }
        } catch (error) {
            console.log('Visual Crossing failed');
        }
        return null;
    }

    parsePublicWeatherAPIData(data) {
        const current = data.current;
        console.log('🌤️ Parsing Open-Meteo data:', current);
        
        const weatherData = {
            temperature: Math.round(current.temperature_2m),
            feelsLike: Math.round(current.apparent_temperature),
            humidity: current.relative_humidity_2m,
            description: this.getWeatherDescription(current.weather_code),
            icon: this.convertWeatherCodeToIcon(current.weather_code),
            windSpeed: Math.round(current.wind_speed_10m),
            pressure: Math.round(current.pressure_msl),
            visibility: 10, // Default visibility
            sunrise: new Date(),
            sunset: new Date(),
            source: 'Open-Meteo'
        };
        
        console.log('🌤️ Parsed weather data:', weatherData);
        return weatherData;
    }

    parseOpenWeatherMapData(data) {
        return {
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            pressure: data.main.pressure,
            visibility: data.visibility ? data.visibility / 1000 : 10,
            sunrise: new Date(data.sys.sunrise * 1000),
            sunset: new Date(data.sys.sunset * 1000),
            source: 'OpenWeatherMap'
        };
    }

    parseWeatherAPIData(data) {
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
            sunset: new Date(data.location.localtime),
            source: 'WeatherAPI'
        };
    }

    parseMeteomaticsData(data) {
        // Parse Meteomatics response format
        const values = data.data[0].value;
        return {
            temperature: Math.round(values[0]),
            feelsLike: Math.round(values[0]),
            humidity: Math.round(values[1]),
            description: 'Current conditions',
            icon: '01d',
            windSpeed: Math.round(values[2]),
            pressure: Math.round(values[3]),
            visibility: 10,
            sunrise: new Date(),
            sunset: new Date(),
            source: 'Meteomatics'
        };
    }

    parseVisualCrossingData(data) {
        const current = data.currentConditions;
        return {
            temperature: Math.round(current.temp),
            feelsLike: Math.round(current.feelslike),
            humidity: Math.round(current.humidity),
            description: current.conditions,
            icon: this.convertVisualCrossingIcon(current.icon),
            windSpeed: Math.round(current.windspeed),
            pressure: Math.round(current.pressure),
            visibility: 10,
            sunrise: new Date(current.sunrise),
            sunset: new Date(current.sunset),
            source: 'Visual Crossing'
        };
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
            lastUpdated: now
        };
    }

    getSeasonalWeatherData(month, hour) {
        // Kyoto seasonal weather patterns
        const seasons = {
            winter: { // Dec-Feb
                tempRange: { min: -2, max: 12 },
                conditions: [
                    { desc: 'Clear sky', icon: '01d', prob: 0.6 },
                    { desc: 'Partly cloudy', icon: '02d', prob: 0.3 },
                    { desc: 'Light snow', icon: '13d', prob: 0.1 }
                ],
                humidity: { min: 50, max: 80 },
                wind: { min: 8, max: 20 },
                pressure: { min: 1010, max: 1050 },
                visibility: { min: 8, max: 13 }
            },
            spring: { // Mar-May
                tempRange: { min: 8, max: 22 },
                conditions: [
                    { desc: 'Clear sky', icon: '01d', prob: 0.5 },
                    { desc: 'Partly cloudy', icon: '02d', prob: 0.3 },
                    { desc: 'Light rain', icon: '10d', prob: 0.2 }
                ],
                humidity: { min: 40, max: 70 },
                wind: { min: 5, max: 15 },
                pressure: { min: 1010, max: 1040 },
                visibility: { min: 8, max: 15 }
            },
            summer: { // Jun-Aug
                tempRange: { min: 20, max: 35 },
                conditions: [
                    { desc: 'Clear sky', icon: '01d', prob: 0.4 },
                    { desc: 'Partly cloudy', icon: '02d', prob: 0.4 },
                    { desc: 'Light rain', icon: '10d', prob: 0.2 }
                ],
                humidity: { min: 60, max: 90 },
                wind: { min: 3, max: 12 },
                pressure: { min: 1005, max: 1025 },
                visibility: { min: 6, max: 12 }
            },
            autumn: { // Sep-Nov
                tempRange: { min: 10, max: 25 },
                conditions: [
                    { desc: 'Clear sky', icon: '01d', prob: 0.6 },
                    { desc: 'Partly cloudy', icon: '02d', prob: 0.3 },
                    { desc: 'Light rain', icon: '10d', prob: 0.1 }
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

        const icon = hour >= 6 && hour <= 18 ? selectedCondition.icon : selectedCondition.icon.replace('d', 'n');
        
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
            icon,
            windSpeed,
            pressure,
            visibility,
            sunrise,
            sunset
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

    convertWeatherAPIIcon(code) {
        const iconMap = {
            1000: '01d', 1003: '02d', 1006: '03d', 1009: '04d', 1030: '50d',
            1063: '09d', 1066: '13d', 1069: '13d', 1087: '11d', 1114: '13d',
            1117: '13d', 1135: '50d', 1147: '50d', 1150: '09d', 1153: '09d',
            1168: '09d', 1171: '09d', 1180: '09d', 1183: '09d', 1186: '10d',
            1189: '10d', 1192: '10d', 1195: '10d', 1198: '09d', 1201: '10d',
            1204: '13d', 1207: '13d', 1210: '13d', 1213: '13d', 1216: '13d',
            1219: '13d', 1222: '13d', 1225: '13d', 1237: '13d', 1240: '09d',
            1243: '10d', 1246: '10d', 1249: '13d', 1252: '13d', 1255: '13d',
            1258: '13d', 1261: '13d', 1264: '13d', 1273: '11d', 1276: '11d'
        };
        return iconMap[code] || '01d';
    }

    convertVisualCrossingIcon(icon) {
        const iconMap = {
            'clear-day': '01d', 'clear-night': '01n',
            'partly-cloudy-day': '02d', 'partly-cloudy-night': '02n',
            'cloudy': '03d', 'fog': '50d', 'rain': '10d',
            'snow': '13d', 'sleet': '13d', 'wind': '50d'
        };
        return iconMap[icon] || '01d';
    }

    getWeatherDescription(code) {
        const descriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            56: 'Light freezing drizzle',
            57: 'Dense freezing drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            66: 'Light freezing rain',
            67: 'Heavy freezing rain',
            71: 'Slight snow fall',
            73: 'Moderate snow fall',
            75: 'Heavy snow fall',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };
        return descriptions[code] || 'Clear sky';
    }

    convertWeatherCodeToIcon(code) {
        const iconMap = {
            0: '01d', 1: '01d', 2: '02d', 3: '03d',
            45: '50d', 48: '50d',
            51: '09d', 53: '09d', 55: '09d', 56: '09d', 57: '09d',
            61: '10d', 63: '10d', 65: '10d', 66: '10d', 67: '10d',
            71: '13d', 73: '13d', 75: '13d', 77: '13d',
            80: '09d', 81: '10d', 82: '10d',
            85: '13d', 86: '13d',
            95: '11d', 96: '11d', 99: '11d'
        };
        return iconMap[code] || '01d';
    }
}

// Export for use in other files
window.WeatherService = WeatherService; 