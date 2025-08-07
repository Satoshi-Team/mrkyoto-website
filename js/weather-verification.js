// Weather Verification Script
// Ensures weather data is properly formatted and displayed across all pages

console.log('🌤️ Weather verification script loading...');

class WeatherVerification {
    constructor() {
        this.verificationResults = [];
        this.init();
    }

    init() {
        console.log('🌤️ Initializing weather verification...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.verifyWeatherSystem();
            });
        } else {
            this.verifyWeatherSystem();
        }
    }

    verifyWeatherSystem() {
        console.log('🌤️ Verifying weather system...');
        
        // Check if weather service is available
        if (!window.WeatherService) {
            this.logError('❌ WeatherService not available');
            return;
        }

        // Check if weather initializer is available
        if (!window.weatherInitializer) {
            this.logError('❌ Weather initializer not available');
            return;
        }

        // Verify weather elements exist
        this.verifyWeatherElements();
        
        // Verify weather data format
        this.verifyWeatherDataFormat();
        
        // Log verification results
        this.logVerificationResults();
    }

    verifyWeatherElements() {
        console.log('🔍 Verifying weather elements...');
        
        const requiredElements = [
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

        const foundElements = [];
        const missingElements = [];

        requiredElements.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                foundElements.push(elementId);
            } else {
                missingElements.push(elementId);
            }
        });

        if (foundElements.length > 0) {
            this.logSuccess(`✅ Found ${foundElements.length} weather elements: ${foundElements.join(', ')}`);
        }

        if (missingElements.length > 0) {
            this.logWarning(`⚠️ Missing weather elements: ${missingElements.join(', ')}`);
        }
    }

    async verifyWeatherDataFormat() {
        console.log('🌤️ Verifying weather data format...');
        
        try {
            const weatherService = new WeatherService();
            const weatherData = await weatherService.getKyotoWeather();
            
            if (!weatherData) {
                this.logError('❌ No weather data received');
                return;
            }

            // Verify required fields
            const requiredFields = [
                'temperature', 'feelsLike', 'humidity', 'description', 
                'icon', 'windSpeed', 'pressure', 'visibility', 
                'sunrise', 'sunset', 'source', 'lastUpdated'
            ];

            const missingFields = [];
            const validFields = [];

            requiredFields.forEach(field => {
                if (weatherData[field] !== undefined && weatherData[field] !== null) {
                    validFields.push(field);
                } else {
                    missingFields.push(field);
                }
            });

            if (validFields.length === requiredFields.length) {
                this.logSuccess('✅ All weather data fields present');
            } else {
                this.logWarning(`⚠️ Missing weather fields: ${missingFields.join(', ')}`);
            }

            // Verify data types and formats
            this.verifyDataTypes(weatherData);
            
        } catch (error) {
            this.logError(`❌ Error verifying weather data: ${error.message}`);
        }
    }

    verifyDataTypes(weatherData) {
        console.log('🔍 Verifying weather data types...');
        
        const typeChecks = [
            { field: 'temperature', type: 'number', range: [-50, 60] },
            { field: 'feelsLike', type: 'number', range: [-50, 60] },
            { field: 'humidity', type: 'number', range: [0, 100] },
            { field: 'windSpeed', type: 'number', range: [0, 200] },
            { field: 'pressure', type: 'number', range: [800, 1200] },
            { field: 'visibility', type: 'number', range: [0, 50] },
            { field: 'description', type: 'string' },
            { field: 'icon', type: 'string' },
            { field: 'sunrise', type: 'string' },
            { field: 'sunset', type: 'string' },
            { field: 'source', type: 'string' },
            { field: 'lastUpdated', type: 'string' }
        ];

        typeChecks.forEach(check => {
            const value = weatherData[check.field];
            const isValidType = typeof value === check.type;
            const isValidRange = !check.range || (value >= check.range[0] && value <= check.range[1]);
            
            if (isValidType && isValidRange) {
                this.logSuccess(`✅ ${check.field}: ${value} (${check.type})`);
            } else {
                this.logError(`❌ ${check.field}: ${value} (expected ${check.type})`);
            }
        });

        // Verify icon format (should be emoji)
        const icon = weatherData.icon;
        if (icon && icon.length > 0 && !icon.includes('d') && !icon.includes('n')) {
            this.logSuccess(`✅ Weather icon: ${icon} (emoji format)`);
        } else {
            this.logError(`❌ Weather icon: ${icon} (should be emoji)`);
        }

        // Verify time format (should be HH:MM)
        const timeRegex = /^\d{2}:\d{2}$/;
        if (timeRegex.test(weatherData.sunrise)) {
            this.logSuccess(`✅ Sunrise format: ${weatherData.sunrise}`);
        } else {
            this.logError(`❌ Sunrise format: ${weatherData.sunrise} (should be HH:MM)`);
        }

        if (timeRegex.test(weatherData.sunset)) {
            this.logSuccess(`✅ Sunset format: ${weatherData.sunset}`);
        } else {
            this.logError(`❌ Sunset format: ${weatherData.sunset} (should be HH:MM)`);
        }
    }

    logSuccess(message) {
        console.log(message);
        this.verificationResults.push({ type: 'success', message });
    }

    logWarning(message) {
        console.warn(message);
        this.verificationResults.push({ type: 'warning', message });
    }

    logError(message) {
        console.error(message);
        this.verificationResults.push({ type: 'error', message });
    }

    logVerificationResults() {
        console.log('📊 Weather verification summary:');
        const successCount = this.verificationResults.filter(r => r.type === 'success').length;
        const warningCount = this.verificationResults.filter(r => r.type === 'warning').length;
        const errorCount = this.verificationResults.filter(r => r.type === 'error').length;
        
        console.log(`✅ Successes: ${successCount}`);
        console.log(`⚠️ Warnings: ${warningCount}`);
        console.log(`❌ Errors: ${errorCount}`);
        
        if (errorCount === 0) {
            console.log('🎉 Weather system verification completed successfully!');
        } else {
            console.log('⚠️ Weather system has issues that need attention.');
        }
    }
}

// Initialize weather verification
const weatherVerification = new WeatherVerification();

// Make it available globally for debugging
window.weatherVerification = weatherVerification;

console.log('✅ Weather verification script loaded'); 