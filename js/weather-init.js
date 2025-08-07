// Weather Initialization Script
// Ensures weather widgets work across all pages

console.log('🌤️ Weather initialization script loading...');

class WeatherInitializer {
    constructor() {
        this.weatherService = null;
        this.init();
    }

    init() {
        console.log('🌤️ Initializing weather system...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupWeather();
            });
        } else {
            this.setupWeather();
        }
    }

    setupWeather() {
        console.log('🌤️ Setting up weather system...');
        
        // Initialize weather service
        if (window.WeatherService) {
            this.weatherService = new WeatherService();
            console.log('✅ WeatherService initialized');
            
            // Load weather data immediately
            this.loadWeatherData();
            
            // Set up periodic updates
            this.setupPeriodicUpdates();
            
            // Set up manual refresh button if it exists
            this.setupRefreshButton();
            
        } else {
            console.error('❌ WeatherService not available');
        }
    }

    async loadWeatherData() {
        try {
            console.log('🌤️ Loading weather data...');
            const weatherData = await this.weatherService.getKyotoWeather();
            console.log('✅ Weather data loaded:', weatherData);
            
            // Update display
            this.weatherService.updateWeatherDisplay(weatherData);
            
            // Also update live widget if it exists
            if (window.liveKyotoWidget && window.liveKyotoWidget.updateWeatherDisplay) {
                window.liveKyotoWidget.weatherData = weatherData;
                window.liveKyotoWidget.updateWeatherDisplay();
            }
            
        } catch (error) {
            console.error('❌ Error loading weather data:', error);
        }
    }

    setupPeriodicUpdates() {
        // Update weather every 5 minutes
        setInterval(() => {
            console.log('🌤️ Periodic weather update...');
            this.loadWeatherData();
        }, 5 * 60 * 1000); // 5 minutes
        
        console.log('✅ Periodic weather updates configured');
    }

    setupRefreshButton() {
        // Look for weather refresh buttons
        const refreshButtons = document.querySelectorAll('[data-weather-refresh]');
        refreshButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🌤️ Manual weather refresh triggered');
                this.loadWeatherData();
            });
        });
        
        if (refreshButtons.length > 0) {
            console.log('✅ Weather refresh buttons configured');
        }
    }

    // Method to force weather update (can be called from console)
    forceWeatherUpdate() {
        console.log('🌤️ Forcing weather update...');
        this.loadWeatherData();
    }
}

// Initialize weather system when script loads
const weatherInitializer = new WeatherInitializer();

// Make it available globally for debugging
window.weatherInitializer = weatherInitializer;

console.log('✅ Weather initialization script loaded'); 