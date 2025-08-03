// API Integration for MrKyoto.com
// Free APIs that don't require signups

class KyotoAPI {
    constructor() {
        this.baseURLs = {
            weather: 'https://api.open-meteo.com/v1',
            currency: 'https://api.exchangerate-api.com/v4/latest',
            news: 'https://newsapi.org/v2',
            events: 'https://api.publicapis.org/entries',
            realEstate: 'https://api.sampleapis.com/real-estate'
        };
        
        this.kyotoCoords = {
            lat: 35.0116,
            lon: 135.7681
        };
    }

    // Weather API (Open-Meteo - Free, no signup required)
    async getKyotoWeather() {
        try {
            const response = await fetch(
                `${this.baseURLs.weather}/forecast?latitude=${this.kyotoCoords.lat}&longitude=${this.kyotoCoords.lon}&current=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`
            );
            const data = await response.json();
            return this.formatWeatherData(data);
        } catch (error) {
            console.error('Weather API error:', error);
            return this.getFallbackWeather();
        }
    }

    formatWeatherData(data) {
        const weatherCodes = {
            0: { description: 'Clear sky', icon: '☀️' },
            1: { description: 'Mainly clear', icon: '🌤️' },
            2: { description: 'Partly cloudy', icon: '⛅' },
            3: { description: 'Overcast', icon: '☁️' },
            45: { description: 'Foggy', icon: '🌫️' },
            48: { description: 'Depositing rime fog', icon: '🌫️' },
            51: { description: 'Light drizzle', icon: '🌦️' },
            53: { description: 'Moderate drizzle', icon: '🌧️' },
            55: { description: 'Dense drizzle', icon: '🌧️' },
            61: { description: 'Slight rain', icon: '🌧️' },
            63: { description: 'Moderate rain', icon: '🌧️' },
            65: { description: 'Heavy rain', icon: '🌧️' },
            71: { description: 'Slight snow', icon: '🌨️' },
            73: { description: 'Moderate snow', icon: '🌨️' },
            75: { description: 'Heavy snow', icon: '🌨️' },
            95: { description: 'Thunderstorm', icon: '⛈️' }
        };

        const current = data.current;
        const daily = data.daily;
        const weatherCode = current.weather_code;
        const weatherInfo = weatherCodes[weatherCode] || { description: 'Unknown', icon: '🌤️' };

        return {
            current: {
                temperature: Math.round(current.temperature_2m),
                humidity: current.relative_humidity_2m,
                description: weatherInfo.description,
                icon: weatherInfo.icon
            },
            forecast: daily.time.slice(0, 5).map((date, index) => ({
                date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                max: Math.round(daily.temperature_2m_max[index]),
                min: Math.round(daily.temperature_2m_min[index]),
                icon: weatherCodes[daily.weather_code[index]]?.icon || '🌤️'
            }))
        };
    }

    getFallbackWeather() {
        return {
            current: {
                temperature: 22,
                humidity: 65,
                description: 'Partly cloudy',
                icon: '⛅'
            },
            forecast: [
                { date: 'Mon', max: 24, min: 18, icon: '☀️' },
                { date: 'Tue', max: 26, min: 20, icon: '🌤️' },
                { date: 'Wed', max: 23, min: 17, icon: '🌧️' },
                { date: 'Thu', max: 25, min: 19, icon: '⛅' },
                { date: 'Fri', max: 27, min: 21, icon: '☀️' }
            ]
        };
    }

    // Currency Exchange API (ExchangeRate-API - Free tier)
    async getExchangeRates() {
        try {
            const response = await fetch(`${this.baseURLs.currency}/JPY`);
            const data = await response.json();
            return {
                USD: data.rates.USD,
                EUR: data.rates.EUR,
                GBP: data.rates.GBP,
                CNY: data.rates.CNY
            };
        } catch (error) {
            console.error('Currency API error:', error);
            return {
                USD: 0.0067,
                EUR: 0.0062,
                GBP: 0.0053,
                CNY: 0.048
            };
        }
    }

    // Real Estate Data (Simulated with realistic Kyoto data)
    async getRealEstateData() {
        const areas = {
            gion: {
                name: 'Gion',
                avgPrice: 85000000,
                avgRent: 280000,
                properties: [
                    {
                        id: 1,
                        type: 'Traditional Machiya',
                        price: 95000000,
                        rent: 320000,
                        size: '120m²',
                        rooms: '3BR • 2BA',
                        description: 'Historic machiya with private garden and traditional design',
                        features: ['Garden', 'Traditional Design', 'Near Temples', 'Exclusive Location'],
                        image: '🏠'
                    },
                    {
                        id: 2,
                        type: 'Modern Apartment',
                        price: 65000000,
                        rent: 220000,
                        size: '85m²',
                        rooms: '2BR • 1BA',
                        description: 'Contemporary apartment with modern amenities',
                        features: ['Modern Kitchen', 'Balcony', 'Security', 'Near Station'],
                        image: '🏢'
                    }
                ]
            },
            arashiyama: {
                name: 'Arashiyama',
                avgPrice: 72000000,
                avgRent: 240000,
                properties: [
                    {
                        id: 3,
                        type: 'Villa with Mountain View',
                        price: 120000000,
                        rent: 380000,
                        size: '180m²',
                        rooms: '4BR • 3BA',
                        description: 'Spacious villa with stunning mountain and bamboo grove views',
                        features: ['Mountain View', 'Large Garden', 'Parking', 'Peaceful Location'],
                        image: '🏡'
                    },
                    {
                        id: 4,
                        type: 'Traditional House',
                        price: 85000000,
                        rent: 280000,
                        size: '140m²',
                        rooms: '3BR • 2BA',
                        description: 'Authentic Japanese house near bamboo grove',
                        features: ['Bamboo Grove Access', 'Traditional Design', 'Garden', 'Quiet Area'],
                        image: '🏠'
                    }
                ]
            },
            higashiyama: {
                name: 'Higashiyama',
                avgPrice: 78000000,
                avgRent: 260000,
                properties: [
                    {
                        id: 5,
                        type: 'Temple-Side Residence',
                        price: 110000000,
                        rent: 350000,
                        size: '160m²',
                        rooms: '4BR • 2BA',
                        description: 'Elegant residence with temple views and traditional architecture',
                        features: ['Temple Views', 'Traditional Architecture', 'Large Rooms', 'Historic Area'],
                        image: '⛩️'
                    },
                    {
                        id: 6,
                        type: 'Modern Townhouse',
                        price: 75000000,
                        rent: 250000,
                        size: '120m²',
                        rooms: '3BR • 2BA',
                        description: 'Contemporary townhouse with modern conveniences',
                        features: ['Modern Design', 'Efficient Layout', 'Near Shops', 'Good Transport'],
                        image: '🏘️'
                    }
                ]
            },
            sakyo: {
                name: 'Sakyo',
                avgPrice: 68000000,
                avgRent: 230000,
                properties: [
                    {
                        id: 7,
                        type: 'University District Apartment',
                        price: 55000000,
                        rent: 180000,
                        size: '90m²',
                        rooms: '2BR • 1BA',
                        description: 'Convenient apartment near Kyoto University',
                        features: ['Near University', 'Student-Friendly', 'Good Transport', 'Affordable'],
                        image: '🎓'
                    },
                    {
                        id: 8,
                        type: 'Family Home',
                        price: 95000000,
                        rent: 320000,
                        size: '150m²',
                        rooms: '4BR • 2BA',
                        description: 'Spacious family home with garden and parking',
                        features: ['Family-Friendly', 'Garden', 'Parking', 'Good Schools'],
                        image: '🏠'
                    }
                ]
            }
        };

        return areas;
    }

    // Events and Festivals Data (Realistic Kyoto events)
    async getEventsData() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;

        const events = {
            spring: [
                {
                    id: 1,
                    name: 'Cherry Blossom Festival',
                    date: 'March 25 - April 10',
                    location: 'Maruyama Park, Philosopher\'s Path',
                    price: 'Free - ¥5,000',
                    description: 'Experience the magical sakura season with hanami parties and illuminated temples',
                    image: '🌸',
                    category: 'Seasonal Festival',
                    booking: true
                },
                {
                    id: 2,
                    name: 'Aoi Matsuri (Hollyhock Festival)',
                    date: 'May 15',
                    location: 'Imperial Palace to Shimogamo Shrine',
                    price: '¥4,500',
                    description: 'Ancient imperial procession with over 500 participants in Heian period costumes',
                    image: '🌿',
                    category: 'Traditional Festival',
                    booking: true
                }
            ],
            summer: [
                {
                    id: 3,
                    name: 'Gion Matsuri',
                    date: 'July 1-31',
                    location: 'Gion District, Downtown Kyoto',
                    price: 'Free - ¥8,000',
                    description: 'Kyoto\'s most famous festival featuring massive floats and traditional parades',
                    image: '🎭',
                    category: 'Major Festival',
                    booking: true
                },
                {
                    id: 4,
                    name: 'Daimonji Gozan Okuribi',
                    date: 'August 16',
                    location: 'Five mountains around Kyoto',
                    price: 'Free',
                    description: 'Bonfire festival with giant kanji characters lit on mountainsides',
                    image: '🔥',
                    category: 'Cultural Event',
                    booking: false
                }
            ],
            autumn: [
                {
                    id: 5,
                    name: 'Jidai Matsuri (Festival of the Ages)',
                    date: 'October 22',
                    location: 'Imperial Palace to Heian Shrine',
                    price: '¥6,000',
                    description: 'Historical costume parade featuring 2,000 years of Japanese fashion',
                    image: '👘',
                    category: 'Historical Festival',
                    booking: true
                },
                {
                    id: 6,
                    name: 'Arashiyama Momiji Festival',
                    date: 'November 15-30',
                    location: 'Arashiyama District',
                    price: 'Free - ¥3,000',
                    description: 'Autumn leaves illumination and cultural performances',
                    image: '🍁',
                    category: 'Seasonal Event',
                    booking: true
                }
            ],
            winter: [
                {
                    id: 7,
                    name: 'Arashiyama Hanatouro',
                    date: 'December 10-19',
                    location: 'Arashiyama Bamboo Grove',
                    price: '¥3,500',
                    description: 'Magical winter illumination of bamboo groves and temples',
                    image: '🏮',
                    category: 'Illumination Event',
                    booking: true
                },
                {
                    id: 8,
                    name: 'Hatsumode (New Year\'s Visit)',
                    date: 'January 1-3',
                    location: 'Various temples and shrines',
                    price: 'Free',
                    description: 'Traditional New Year\'s shrine visits and prayers',
                    image: '⛩️',
                    category: 'Traditional Event',
                    booking: false
                }
            ]
        };

        // Get current season events
        let currentSeason = 'spring';
        if (currentMonth >= 3 && currentMonth <= 5) currentSeason = 'spring';
        else if (currentMonth >= 6 && currentMonth <= 8) currentSeason = 'summer';
        else if (currentMonth >= 9 && currentMonth <= 11) currentSeason = 'autumn';
        else currentSeason = 'winter';

        return {
            currentSeason,
            events,
            upcoming: this.getUpcomingEvents(events, currentDate)
        };
    }

    getUpcomingEvents(events, currentDate) {
        const allEvents = [];
        Object.values(events).forEach(seasonEvents => {
            allEvents.push(...seasonEvents);
        });

        // Sort by date (simplified - in real implementation would parse actual dates)
        return allEvents.slice(0, 6);
    }

    // Cultural Experiences Data
    async getCulturalExperiences() {
        return [
            {
                id: 1,
                name: 'Traditional Tea Ceremony',
                duration: '1-2 hours',
                price: '¥3,000 - ¥8,000',
                location: 'Various tea houses in Gion and Higashiyama',
                description: 'Experience the Japanese tea ceremony (chanoyu) with expert guidance',
                image: '🍵',
                category: 'Traditional Arts',
                booking: true,
                availability: 'Daily, multiple sessions'
            },
            {
                id: 2,
                name: 'Kimono Wearing Experience',
                duration: '2-4 hours',
                price: '¥5,000 - ¥15,000',
                location: 'Gion, Higashiyama, Arashiyama',
                description: 'Dress in authentic kimono and explore historic districts',
                image: '👘',
                category: 'Cultural Experience',
                booking: true,
                availability: 'Daily, advance booking recommended'
            },
            {
                id: 3,
                name: 'Zen Meditation Session',
                duration: '1-3 hours',
                price: '¥2,000 - ¥5,000',
                location: 'Various temples (Ryoan-ji, Daitoku-ji)',
                description: 'Learn Zen meditation techniques in authentic temple settings',
                image: '🧘',
                category: 'Spiritual Experience',
                booking: true,
                availability: 'Weekly sessions'
            },
            {
                id: 4,
                name: 'Traditional Craft Workshop',
                duration: '2-6 hours',
                price: '¥4,000 - ¥12,000',
                location: 'Nishijin Textile District, Various Studios',
                description: 'Learn traditional Kyoto crafts like weaving, pottery, or calligraphy',
                image: '🎨',
                category: 'Artisan Experience',
                booking: true,
                availability: 'By appointment'
            },
            {
                id: 5,
                name: 'Sake Brewery Tour',
                duration: '2-3 hours',
                price: '¥3,500 - ¥8,000',
                location: 'Fushimi Sake District',
                description: 'Tour traditional sake breweries and learn about sake production',
                image: '🍶',
                category: 'Culinary Experience',
                booking: true,
                availability: 'Weekdays, advance booking required'
            },
            {
                id: 6,
                name: 'Geisha Performance',
                duration: '1-2 hours',
                price: '¥15,000 - ¥50,000',
                location: 'Exclusive venues in Gion',
                description: 'Private geisha performance with traditional music and dance',
                image: '🎭',
                category: 'Exclusive Experience',
                booking: true,
                availability: 'Evenings, advance booking required'
            }
        ];
    }

    // News and Updates (Simulated with realistic Kyoto news)
    async getKyotoNews() {
        return [
            {
                id: 1,
                title: 'New Direct Flight from London to Kansai International Airport',
                date: '2025-01-15',
                category: 'Transportation',
                summary: 'British Airways announces new direct flights from London Heathrow to Kansai International Airport, making Kyoto more accessible to European travelers.',
                image: '✈️',
                readTime: '3 min read'
            },
            {
                id: 2,
                title: 'Kyoto\'s Cherry Blossom Season Expected to Peak Early This Year',
                date: '2025-01-12',
                category: 'Nature',
                summary: 'Weather experts predict cherry blossoms will bloom 5-7 days earlier than usual due to warmer winter temperatures.',
                image: '🌸',
                readTime: '2 min read'
            },
            {
                id: 3,
                title: 'New Luxury Hotel Opens in Historic Gion District',
                date: '2025-01-10',
                category: 'Accommodation',
                summary: 'A new boutique hotel combining traditional machiya architecture with modern luxury amenities opens in the heart of Gion.',
                image: '🏨',
                readTime: '4 min read'
            },
            {
                id: 4,
                title: 'Kyoto Introduces New Digital Tourist Pass',
                date: '2025-01-08',
                category: 'Tourism',
                summary: 'The city launches a digital pass providing access to major attractions, public transport, and exclusive discounts.',
                image: '📱',
                readTime: '3 min read'
            },
            {
                id: 5,
                title: 'Traditional Craft Fair Returns to Nishijin District',
                date: '2025-01-05',
                category: 'Culture',
                summary: 'Annual fair showcasing Kyoto\'s traditional crafts including textiles, pottery, and lacquerware.',
                image: '🧵',
                readTime: '2 min read'
            },
            {
                id: 6,
                title: 'New Sustainable Tourism Initiative Launched',
                date: '2025-01-03',
                category: 'Sustainability',
                summary: 'Kyoto implements new measures to promote sustainable tourism and reduce environmental impact.',
                image: '🌱',
                readTime: '4 min read'
            }
        ];
    }

    // Utility methods
    formatCurrency(amount, currency = 'JPY') {
        if (currency === 'JPY') {
            return `¥${amount.toLocaleString()}`;
        }
        return `${currency} ${amount.toLocaleString()}`;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Initialize API data
    async initialize() {
        try {
            const [weather, exchangeRates, realEstate, events, culturalExperiences, news] = await Promise.all([
                this.getKyotoWeather(),
                this.getExchangeRates(),
                this.getRealEstateData(),
                this.getEventsData(),
                this.getCulturalExperiences(),
                this.getKyotoNews()
            ]);

            return {
                weather,
                exchangeRates,
                realEstate,
                events,
                culturalExperiences,
                news
            };
        } catch (error) {
            console.error('API initialization error:', error);
            return null;
        }
    }
}

// Export for use in other files
window.KyotoAPI = KyotoAPI; 