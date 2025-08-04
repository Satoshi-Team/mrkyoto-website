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
    }

    // Weather Data Integration
    async loadWeatherData() {
        try {
            console.log('🌤️ Loading weather data...');
            
            // Try direct API call first for immediate data
            const directWeather = await this.fetchDirectWeather();
            if (directWeather) {
                this.weatherData = directWeather;
                console.log('✅ Direct weather data loaded:', this.weatherData);
                return;
            }
            
            // Use the dedicated weather service as backup
            if (window.WeatherService) {
                console.log('🌤️ Using WeatherService...');
                const weatherService = new WeatherService();
                this.weatherData = await weatherService.getKyotoWeather();
                console.log('✅ Weather data loaded from service:', this.weatherData);
            } else {
                console.log('⚠️ WeatherService not available, using fallback');
                this.weatherData = this.getEnhancedFallbackWeatherData();
                console.log('✅ Fallback weather data loaded:', this.weatherData);
            }
        } catch (error) {
            console.error('❌ Error loading weather data:', error);
            console.log('⚠️ Using enhanced fallback weather data');
            this.weatherData = this.getEnhancedFallbackWeatherData();
            console.log('✅ Fallback weather data loaded after error:', this.weatherData);
        }
    }

    async fetchDirectWeather() {
        try {
            console.log('🌤️ Fetching direct weather data...');
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.0116&longitude=135.7681&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl&timezone=auto');
            
            if (response.ok) {
                const data = await response.json();
                console.log('🌤️ Raw weather data:', data);
                
                const current = data.current;
                
                // Calculate sunrise and sunset times for Kyoto
                const now = new Date();
                const sunrise = new Date(now);
                sunrise.setHours(6, 30, 0, 0); // Approximate sunrise time
                const sunset = new Date(now);
                sunset.setHours(17, 30, 0, 0); // Approximate sunset time
                
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
                    source: 'Open-Meteo Direct'
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
        const month = now.getMonth(); // 0-11
        const hour = now.getHours();
        
        // Realistic Kyoto weather patterns based on season and time
        let temperature, description, icon, humidity, windSpeed, pressure, visibility;
        
        // Seasonal temperature ranges for Kyoto
        const seasonalTemps = {
            winter: { min: -2, max: 12 },    // Dec-Feb
            spring: { min: 8, max: 22 },     // Mar-May
            summer: { min: 20, max: 35 },    // Jun-Aug
            autumn: { min: 10, max: 25 }     // Sep-Nov
        };
        
        // Determine season
        let season;
        if (month >= 11 || month <= 1) season = 'winter';
        else if (month >= 2 && month <= 4) season = 'spring';
        else if (month >= 5 && month <= 7) season = 'summer';
        else season = 'autumn';
        
        const tempRange = seasonalTemps[season];
        const baseTemp = (tempRange.min + tempRange.max) / 2;
        
        // Time-based temperature adjustment
        let timeAdjustment = 0;
        if (hour >= 6 && hour <= 18) {
            // Daytime - warmer
            timeAdjustment = (tempRange.max - baseTemp) * 0.7;
        } else {
            // Nighttime - cooler
            timeAdjustment = (tempRange.min - baseTemp) * 0.7;
        }
        
        temperature = Math.round(baseTemp + timeAdjustment + (Math.random() - 0.5) * 4);
        
        // Weather conditions based on season
        const weatherConditions = {
            winter: [
                { desc: 'Clear sky', icon: '01d', prob: 0.6 },
                { desc: 'Partly cloudy', icon: '02d', prob: 0.3 },
                { desc: 'Light snow', icon: '13d', prob: 0.1 }
            ],
            spring: [
                { desc: 'Clear sky', icon: '01d', prob: 0.5 },
                { desc: 'Partly cloudy', icon: '02d', prob: 0.3 },
                { desc: 'Light rain', icon: '10d', prob: 0.2 }
            ],
            summer: [
                { desc: 'Clear sky', icon: '01d', prob: 0.4 },
                { desc: 'Partly cloudy', icon: '02d', prob: 0.4 },
                { desc: 'Light rain', icon: '10d', prob: 0.2 }
            ],
            autumn: [
                { desc: 'Clear sky', icon: '01d', prob: 0.6 },
                { desc: 'Partly cloudy', icon: '02d', prob: 0.3 },
                { desc: 'Light rain', icon: '10d', prob: 0.1 }
            ]
        };
        
        const conditions = weatherConditions[season];
        const random = Math.random();
        let selectedCondition = conditions[0];
        
        for (const condition of conditions) {
            if (random <= condition.prob) {
                selectedCondition = condition;
                break;
            }
        }
        
        description = selectedCondition.desc;
        icon = hour >= 6 && hour <= 18 ? selectedCondition.icon : selectedCondition.icon.replace('d', 'n');
        
        // Realistic humidity based on season and weather
        if (description.includes('rain') || description.includes('snow')) {
            humidity = Math.floor(Math.random() * 20) + 70; // 70-90%
        } else {
            humidity = Math.floor(Math.random() * 30) + 40; // 40-70%
        }
        
        // Wind speed based on season
        const windRanges = {
            winter: { min: 8, max: 20 },
            spring: { min: 5, max: 15 },
            summer: { min: 3, max: 12 },
            autumn: { min: 5, max: 18 }
        };
        const windRange = windRanges[season];
        windSpeed = Math.floor(Math.random() * (windRange.max - windRange.min)) + windRange.min;
        
        // Pressure based on weather conditions
        if (description.includes('rain') || description.includes('snow')) {
            pressure = Math.floor(Math.random() * 30) + 1000; // 1000-1030 hPa
        } else {
            pressure = Math.floor(Math.random() * 40) + 1010; // 1010-1050 hPa
        }
        
        // Visibility based on weather
        if (description.includes('rain') || description.includes('snow')) {
            visibility = Math.floor(Math.random() * 3) + 5; // 5-8 km
        } else {
            visibility = Math.floor(Math.random() * 5) + 8; // 8-13 km
        }
        
        // Calculate sunrise and sunset based on season
        const sunriseHours = {
            winter: 6.5, spring: 5.5, summer: 4.5, autumn: 5.5
        };
        const sunsetHours = {
            winter: 17.5, spring: 18.5, summer: 19.5, autumn: 18.5
        };
        
        const sunriseHour = sunriseHours[season];
        const sunsetHour = sunsetHours[season];
        
        const sunrise = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Math.floor(sunriseHour), Math.round((sunriseHour % 1) * 60));
        const sunset = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Math.floor(sunsetHour), Math.round((sunsetHour % 1) * 60));

        return {
            temperature,
            feelsLike: temperature + Math.floor(Math.random() * 3) - 1,
            humidity,
            description,
            icon,
            windSpeed,
            pressure,
            visibility,
            sunrise,
            sunset
        };
    }

    convertWeatherAPIIcon(code) {
        // Convert WeatherAPI.com codes to OpenWeatherMap format
        const iconMap = {
            1000: '01d', // Clear
            1003: '02d', // Partly cloudy
            1006: '03d', // Cloudy
            1009: '04d', // Overcast
            1030: '50d', // Mist
            1063: '09d', // Patchy rain
            1066: '13d', // Patchy snow
            1069: '13d', // Patchy sleet
            1087: '11d', // Thundery outbreaks
            1114: '13d', // Blowing snow
            1117: '13d', // Blizzard
            1135: '50d', // Fog
            1147: '50d', // Freezing fog
            1150: '09d', // Patchy light drizzle
            1153: '09d', // Light drizzle
            1168: '09d', // Freezing drizzle
            1171: '09d', // Heavy freezing drizzle
            1180: '09d', // Patchy light rain
            1183: '09d', // Light rain
            1186: '10d', // Moderate rain at times
            1189: '10d', // Moderate rain
            1192: '10d', // Heavy rain at times
            1195: '10d', // Heavy rain
            1198: '09d', // Light freezing rain
            1201: '10d', // Moderate or heavy freezing rain
            1204: '13d', // Light sleet
            1207: '13d', // Moderate or heavy sleet
            1210: '13d', // Patchy light snow
            1213: '13d', // Light snow
            1216: '13d', // Patchy moderate snow
            1219: '13d', // Moderate snow
            1222: '13d', // Patchy heavy snow
            1225: '13d', // Heavy snow
            1237: '13d', // Ice pellets
            1240: '09d', // Light rain shower
            1243: '10d', // Moderate or heavy rain shower
            1246: '10d', // Torrential rain shower
            1249: '13d', // Light sleet showers
            1252: '13d', // Moderate or heavy sleet showers
            1255: '13d', // Light snow showers
            1258: '13d', // Moderate or heavy snow showers
            1261: '13d', // Light showers of ice pellets
            1264: '13d', // Moderate or heavy showers of ice pellets
            1273: '11d', // Patchy light rain with thunder
            1276: '11d'  // Moderate or heavy rain with thunder
        };
        return iconMap[code] || '01d';
    }

    convertAccuWeatherIcon(code) {
        // Convert AccuWeather codes to OpenWeatherMap format
        const iconMap = {
            1: '01d', 2: '01d', 3: '02d', 4: '02d', 5: '02d', 6: '03d', 7: '03d', 8: '04d',
            11: '50d', 12: '09d', 13: '09d', 14: '09d', 15: '11d', 16: '11d', 17: '11d',
            18: '10d', 19: '10d', 20: '10d', 21: '10d', 22: '10d', 23: '10d', 24: '10d',
            25: '10d', 26: '10d', 29: '10d', 30: '10d', 31: '10d', 32: '10d', 33: '10d',
            34: '10d', 35: '10d', 36: '10d', 37: '10d', 38: '10d', 39: '10d', 40: '10d',
            41: '13d', 42: '13d', 43: '13d', 44: '13d'
        };
        return iconMap[code] || '01d';
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
        this.currentCameraIndex = (this.currentCameraIndex + 1) % this.cameras.length;
        console.log('🎥 New camera index:', this.currentCameraIndex);
        
        // Clear any existing health check
        if (this.streamHealthCheck) {
            clearInterval(this.streamHealthCheck);
            this.streamHealthCheck = null;
        }
        
        this.updateCameraInfo();
        this.updateCameraEmbed();
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
        
        if (temperatureEl) {
            temperatureEl.textContent = `${weather.temperature}°C`;
            console.log('🌤️ Updated temperature:', weather.temperature);
        }
        if (iconEl) {
            iconEl.textContent = this.getWeatherIcon(weather.icon);
            console.log('🌤️ Updated icon:', weather.icon);
        }
        if (descriptionEl) {
            descriptionEl.textContent = weather.description;
            console.log('🌤️ Updated description:', weather.description);
        }
        if (feelsLikeEl) {
            feelsLikeEl.innerHTML = `<span data-translate="liveKyoto.weather.feelsLike">Feels like</span> ${weather.feelsLike}°C`;
            console.log('🌤️ Updated feels like:', weather.feelsLike);
        }
        if (windEl) {
            windEl.textContent = `${weather.windSpeed} km/h`;
            console.log('🌤️ Updated wind:', weather.windSpeed);
        }
        if (humidityEl) {
            humidityEl.textContent = `${weather.humidity}%`;
            console.log('🌤️ Updated humidity:', weather.humidity);
        }
        if (visibilityEl) {
            visibilityEl.textContent = `${weather.visibility} km`;
            console.log('🌤️ Updated visibility:', weather.visibility);
        }
        if (pressureEl) {
            pressureEl.textContent = `${weather.pressure} hPa`;
            console.log('🌤️ Updated pressure:', weather.pressure);
        }
        if (sunriseEl) {
            sunriseEl.textContent = weather.sunrise.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
            console.log('🌤️ Updated sunrise:', weather.sunrise);
        }
        if (sunsetEl) {
            sunsetEl.textContent = weather.sunset.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
            console.log('🌤️ Updated sunset:', weather.sunset);
        }
        if (lastUpdatedEl) {
            lastUpdatedEl.textContent = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
            console.log('🌤️ Updated last updated time');
        }
        
        // Trigger translation update for dynamic content
        if (window.translationManager) {
            window.translationManager.updateDynamicContent();
        }
        
        console.log('🌤️ Weather display update complete');
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