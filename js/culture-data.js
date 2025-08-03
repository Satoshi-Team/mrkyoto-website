// Culture Data for MrKyoto.com
// Comprehensive cultural experiences and traditional activities

class CultureData {
    constructor() {
        this.culturalExperiences = [
            {
                id: 'culture-001',
                title: 'Traditional Tea Ceremony Experience',
                category: 'Tea Culture',
                location: 'En Tea House, Gion',
                address: 'Gion-machi, Higashiyama-ku, Kyoto',
                duration: '2 hours',
                price: '¥8,000',
                priceUSD: '$54',
                description: 'Experience the authentic Japanese tea ceremony in a traditional tea house. Learn about the philosophy of wabi-sabi and the art of preparing matcha tea.',
                longDescription: 'Immerse yourself in the centuries-old tradition of the Japanese tea ceremony. Our experienced tea masters will guide you through every step of the ritual, from the proper way to enter the tea room to the correct way to hold and drink from the tea bowl. You\'ll learn about the philosophy of wabi-sabi (finding beauty in imperfection) and gain a deeper understanding of Japanese culture and hospitality.',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
                provider: 'En Tea House',
                providerUrl: 'https://www.enteahouse.com',
                bookingUrl: 'https://www.enteahouse.com/book',
                contact: '+81-75-XXX-XXXX',
                capacity: '4 people per session',
                available: true,
                highlights: ['Authentic tea ceremony', 'Traditional tea house', 'Matcha preparation', 'Cultural explanation', 'Take-home certificate'],
                requirements: ['Comfortable sitting position', 'No food restrictions'],
                languages: ['English', 'Japanese'],
                seasonality: 'Year-round',
                bestTime: 'Morning sessions recommended',
                neighborhood: 'Gion',
                tags: ['tea ceremony', 'traditional', 'cultural', 'matcha', 'zen'],
                rating: 4.9,
                reviews: 156,
                featured: true
            },
            {
                id: 'culture-002',
                title: 'Kimono Dressing & Photo Session',
                category: 'Traditional Dress',
                location: 'Kyoto Kimono Studio',
                address: 'Kawaramachi, Nakagyo-ku, Kyoto',
                duration: '3 hours',
                price: '¥12,000',
                priceUSD: '$81',
                description: 'Dress in authentic kimono and explore Kyoto\'s historic districts while professional photographers capture your memories.',
                longDescription: 'Transform into a traditional Japanese beauty with our comprehensive kimono experience. Our expert kimono dressers will help you select and properly wear an authentic kimono, complete with obi (sash), geta (wooden sandals), and traditional accessories. After dressing, you\'ll be guided through Kyoto\'s most picturesque locations for a professional photo session that captures the essence of traditional Japan.',
                image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop',
                provider: 'Kyoto Kimono Studio',
                providerUrl: 'https://www.kyotokimonostudio.com',
                bookingUrl: 'https://www.kyotokimonostudio.com/book',
                contact: '+81-75-XXX-XXXX',
                capacity: '2-6 people per session',
                available: true,
                highlights: ['Authentic kimono dressing', 'Professional photography', 'Historic location tour', 'Digital photos included', 'Traditional accessories'],
                requirements: ['Reservation required', 'Comfortable walking shoes'],
                languages: ['English', 'Japanese', 'Chinese'],
                seasonality: 'Year-round',
                bestTime: 'Spring and Autumn',
                neighborhood: 'Nakagyo',
                tags: ['kimono', 'photography', 'traditional', 'fashion', 'cultural'],
                rating: 4.8,
                reviews: 203,
                featured: true
            },
            {
                id: 'culture-003',
                title: 'Japanese Calligraphy Workshop',
                category: 'Arts & Crafts',
                location: 'Kyoto Calligraphy Center',
                address: 'Pontocho, Nakagyo-ku, Kyoto',
                duration: '2.5 hours',
                price: '¥6,500',
                priceUSD: '$44',
                description: 'Learn the art of Japanese calligraphy (shodo) from master calligraphers in a traditional setting.',
                longDescription: 'Discover the meditative art of Japanese calligraphy, where every brushstroke carries meaning and beauty. Our master calligraphers will teach you the fundamentals of shodo, including proper brush handling, ink preparation, and the philosophy behind this ancient art form. You\'ll practice writing kanji characters and create your own calligraphy piece to take home.',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
                provider: 'Kyoto Calligraphy Center',
                providerUrl: 'https://www.kyotocalligraphy.com',
                bookingUrl: 'https://www.kyotocalligraphy.com/book',
                contact: '+81-75-XXX-XXXX',
                capacity: '6 people per class',
                available: true,
                highlights: ['Master instruction', 'Traditional materials', 'Take-home artwork', 'Cultural background', 'Meditation aspect'],
                requirements: ['No experience needed', 'Patience and focus'],
                languages: ['English', 'Japanese'],
                seasonality: 'Year-round',
                bestTime: 'Afternoon sessions',
                neighborhood: 'Pontocho',
                tags: ['calligraphy', 'shodo', 'art', 'traditional', 'meditation'],
                rating: 4.7,
                reviews: 89,
                featured: false
            },
            {
                id: 'culture-004',
                title: 'Zen Meditation at Ryoan-ji Temple',
                category: 'Spiritual Practice',
                location: 'Ryoan-ji Temple',
                address: 'Ryoanji Goryonoshitacho, Ukyo-ku, Kyoto',
                duration: '1.5 hours',
                price: '¥3,000',
                priceUSD: '$20',
                description: 'Experience authentic Zen meditation in the serene surroundings of Ryoan-ji Temple, home to Japan\'s most famous rock garden.',
                longDescription: 'Find inner peace through authentic Zen meditation practice at the historic Ryoan-ji Temple. Our experienced Zen monks will guide you through the fundamentals of zazen (seated meditation) in the temple\'s meditation hall. The session includes an introduction to Zen philosophy, proper meditation posture, and time for silent practice. After meditation, you\'ll have the opportunity to contemplate the famous rock garden.',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop',
                provider: 'Ryoan-ji Temple',
                providerUrl: 'https://www.ryoanji.jp',
                bookingUrl: 'https://www.ryoanji.jp/meditation',
                contact: '+81-75-XXX-XXXX',
                capacity: '10 people per session',
                available: true,
                highlights: ['Authentic Zen practice', 'Historic temple setting', 'Rock garden access', 'Monk instruction', 'Peaceful atmosphere'],
                requirements: ['Comfortable sitting position', 'Quiet demeanor'],
                languages: ['English', 'Japanese'],
                seasonality: 'Year-round',
                bestTime: 'Early morning',
                neighborhood: 'Ukyo',
                tags: ['zen', 'meditation', 'temple', 'spiritual', 'peace'],
                rating: 4.9,
                reviews: 134,
                featured: true
            },
            {
                id: 'culture-005',
                title: 'Traditional Japanese Cooking Class',
                category: 'Culinary Arts',
                location: 'Kyoto Cooking School',
                address: 'Nishiki Market Area, Nakagyo-ku, Kyoto',
                duration: '4 hours',
                price: '¥15,000',
                priceUSD: '$101',
                description: 'Learn to prepare authentic Japanese dishes using traditional techniques and fresh local ingredients.',
                longDescription: 'Master the art of Japanese cuisine in our hands-on cooking class. You\'ll learn to prepare classic dishes such as miso soup, tempura, sushi rolls, and traditional desserts. Our expert chefs will teach you about Japanese cooking techniques, ingredient selection, and the cultural significance of each dish. The class includes a visit to Nishiki Market to select fresh ingredients.',
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
                provider: 'Kyoto Cooking School',
                providerUrl: 'https://www.kyotocooking.com',
                bookingUrl: 'https://www.kyotocooking.com/book',
                contact: '+81-75-XXX-XXXX',
                capacity: '8 people per class',
                available: true,
                highlights: ['Hands-on cooking', 'Market visit', 'Recipe booklet', 'Lunch included', 'Cultural insights'],
                requirements: ['No cooking experience needed', 'Dietary restrictions accommodated'],
                languages: ['English', 'Japanese'],
                seasonality: 'Year-round',
                bestTime: 'Morning sessions',
                neighborhood: 'Nakagyo',
                tags: ['cooking', 'culinary', 'traditional', 'food', 'culture'],
                rating: 4.8,
                reviews: 167,
                featured: false
            },
            {
                id: 'culture-006',
                title: 'Traditional Japanese Garden Tour',
                category: 'Nature & Gardens',
                location: 'Various Kyoto Gardens',
                address: 'Multiple locations across Kyoto',
                duration: '3 hours',
                price: '¥7,500',
                priceUSD: '$51',
                description: 'Explore Kyoto\'s most beautiful traditional gardens with expert guides who explain the philosophy and design principles.',
                longDescription: 'Discover the hidden meanings and artistic principles behind Kyoto\'s most exquisite traditional gardens. Our expert guides will take you through carefully selected gardens, explaining the symbolism of rocks, water features, and plant arrangements. You\'ll learn about the different garden styles, seasonal considerations, and the Zen philosophy that influences Japanese garden design.',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                provider: 'Kyoto Garden Tours',
                providerUrl: 'https://www.kyotogardentours.com',
                bookingUrl: 'https://www.kyotogardentours.com/book',
                contact: '+81-75-XXX-XXXX',
                capacity: '12 people per tour',
                available: true,
                highlights: ['Expert guide', 'Multiple gardens', 'Cultural explanation', 'Photography tips', 'Seasonal insights'],
                requirements: ['Comfortable walking', 'Weather appropriate clothing'],
                languages: ['English', 'Japanese'],
                seasonality: 'Year-round',
                bestTime: 'Spring and Autumn',
                neighborhood: 'Multiple',
                tags: ['gardens', 'nature', 'traditional', 'zen', 'photography'],
                rating: 4.6,
                reviews: 78,
                featured: false
            },
            {
                id: 'culture-007',
                title: 'Traditional Japanese Music Performance',
                category: 'Performing Arts',
                location: 'Gion Corner',
                address: 'Gion-machi, Higashiyama-ku, Kyoto',
                duration: '1 hour',
                price: '¥4,500',
                priceUSD: '$30',
                description: 'Experience traditional Japanese music including koto, shamisen, and traditional dance performances.',
                longDescription: 'Immerse yourself in the enchanting world of traditional Japanese music and dance. This intimate performance features skilled musicians playing the koto (Japanese harp), shamisen (three-stringed instrument), and traditional Japanese drums. The program includes classical pieces, folk songs, and elegant dance performances that showcase the grace and beauty of Japanese performing arts.',
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
                provider: 'Gion Corner',
                providerUrl: 'https://www.gioncorner.com',
                bookingUrl: 'https://www.gioncorner.com/book',
                contact: '+81-75-XXX-XXXX',
                capacity: '50 people per performance',
                available: true,
                highlights: ['Live music performance', 'Traditional instruments', 'Dance performance', 'Cultural explanation', 'Intimate setting'],
                requirements: ['Reservation recommended', 'Quiet audience'],
                languages: ['English', 'Japanese'],
                seasonality: 'Year-round',
                bestTime: 'Evening performances',
                neighborhood: 'Gion',
                tags: ['music', 'dance', 'traditional', 'performance', 'cultural'],
                rating: 4.7,
                reviews: 112,
                featured: false
            },
            {
                id: 'culture-008',
                title: 'Sake Brewery Tour & Tasting',
                category: 'Traditional Crafts',
                location: 'Fushimi Sake District',
                address: 'Fushimi-ku, Kyoto',
                duration: '2.5 hours',
                price: '¥9,000',
                priceUSD: '$61',
                description: 'Visit a traditional sake brewery, learn about the brewing process, and sample premium sake varieties.',
                longDescription: 'Discover the art of sake brewing in Kyoto\'s historic Fushimi district, known for its pure water and sake production. Tour a traditional brewery to learn about the centuries-old brewing process, from rice polishing to fermentation. Our expert guides will explain the different types of sake, brewing techniques, and the cultural significance of sake in Japanese society. The tour concludes with a tasting session featuring premium sake varieties.',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
                provider: 'Fushimi Sake Tours',
                providerUrl: 'https://www.fushimisake.com',
                bookingUrl: 'https://www.fushimisake.com/book',
                contact: '+81-75-XXX-XXXX',
                capacity: '15 people per tour',
                available: true,
                highlights: ['Brewery tour', 'Sake tasting', 'Cultural history', 'Expert guide', 'Take-home souvenir'],
                requirements: ['Age 20+ for tasting', 'Comfortable walking'],
                languages: ['English', 'Japanese'],
                seasonality: 'Year-round',
                bestTime: 'Afternoon tours',
                neighborhood: 'Fushimi',
                tags: ['sake', 'brewing', 'traditional', 'tasting', 'cultural'],
                rating: 4.8,
                reviews: 95,
                featured: false
            }
        ];

        this.categories = [
            'Tea Culture',
            'Traditional Dress',
            'Arts & Crafts',
            'Spiritual Practice',
            'Culinary Arts',
            'Nature & Gardens',
            'Performing Arts',
            'Traditional Crafts'
        ];

        this.providers = [
            {
                name: 'En Tea House',
                url: 'https://www.enteahouse.com',
                category: 'Tea Ceremony',
                rating: 4.9,
                founded: 1985
            },
            {
                name: 'Kyoto Kimono Studio',
                url: 'https://www.kyotokimonostudio.com',
                category: 'Traditional Dress',
                rating: 4.8,
                founded: 1990
            },
            {
                name: 'Kyoto Calligraphy Center',
                url: 'https://www.kyotocalligraphy.com',
                category: 'Arts & Crafts',
                rating: 4.7,
                founded: 1995
            },
            {
                name: 'Ryoan-ji Temple',
                url: 'https://www.ryoanji.jp',
                category: 'Spiritual Practice',
                rating: 4.9,
                founded: 1450
            }
        ];
    }

    // Get all cultural experiences
    getAllExperiences() {
        return this.culturalExperiences.filter(exp => exp.available);
    }

    // Get featured experiences
    getFeaturedExperiences() {
        return this.culturalExperiences.filter(exp => exp.available && exp.featured);
    }

    // Get experiences by category
    getExperiencesByCategory(category) {
        return this.culturalExperiences.filter(exp => exp.available && exp.category === category);
    }

    // Get experiences by neighborhood
    getExperiencesByNeighborhood(neighborhood) {
        return this.culturalExperiences.filter(exp => exp.available && exp.neighborhood === neighborhood);
    }

    // Search experiences
    searchExperiences(query) {
        const searchTerm = query.toLowerCase();
        return this.culturalExperiences.filter(exp => 
            exp.available && (
                exp.title.toLowerCase().includes(searchTerm) ||
                exp.description.toLowerCase().includes(searchTerm) ||
                exp.category.toLowerCase().includes(searchTerm) ||
                exp.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            )
        );
    }

    // Get experience by ID
    getExperienceById(id) {
        return this.culturalExperiences.find(exp => exp.id === id);
    }

    // Get categories
    getCategories() {
        return this.categories;
    }

    // Get providers
    getProviders() {
        return this.providers;
    }

    // Get experience statistics
    getExperienceStats() {
        const totalExperiences = this.culturalExperiences.length;
        const categories = [...new Set(this.culturalExperiences.map(e => e.category))];
        const totalRating = this.culturalExperiences.reduce((sum, exp) => sum + exp.rating, 0);
        const averageRating = totalRating / totalExperiences;
        
        const priceRange = {
            min: Math.min(...this.culturalExperiences.map(e => parseInt(e.price.replace(/[^\d]/g, '')))),
            max: Math.max(...this.culturalExperiences.map(e => parseInt(e.price.replace(/[^\d]/g, ''))))
        };

        return {
            totalExperiences,
            categories: categories.length,
            averageRating: Math.round(averageRating * 10) / 10,
            priceRange,
            featuredCount: this.culturalExperiences.filter(e => e.featured).length
        };
    }

    // Get top rated experiences
    getTopRatedExperiences(limit = 5) {
        return this.culturalExperiences
            .filter(exp => exp.available)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    // Get experiences by price range
    getExperiencesByPriceRange(min, max) {
        return this.culturalExperiences.filter(exp => {
            if (!exp.available) return false;
            const price = parseInt(exp.price.replace(/[^\d]/g, ''));
            return price >= min && price <= max;
        });
    }

    // Get seasonal experiences
    getSeasonalExperiences(season) {
        const seasonalExperiences = {
            spring: ['Cherry Blossom Viewing', 'Garden Tours'],
            summer: ['Tea Ceremony', 'Indoor Activities'],
            autumn: ['Maple Viewing', 'Garden Tours'],
            winter: ['Indoor Activities', 'Tea Ceremony']
        };

        return this.culturalExperiences.filter(exp => 
            exp.available && 
            seasonalExperiences[season].some(keyword => 
                exp.title.toLowerCase().includes(keyword.toLowerCase()) ||
                exp.description.toLowerCase().includes(keyword.toLowerCase())
            )
        );
    }

    // Format price for display
    formatPrice(price) {
        return price;
    }

    // Get duration in hours
    getDurationInHours(duration) {
        const match = duration.match(/(\d+(?:\.\d+)?)\s*hours?/i);
        return match ? parseFloat(match[1]) : 0;
    }

    // Get related experiences
    getRelatedExperiences(experienceId, limit = 3) {
        const currentExp = this.getExperienceById(experienceId);
        if (!currentExp) return [];

        return this.culturalExperiences
            .filter(exp => 
                exp.available &&
                exp.id !== experienceId &&
                (exp.category === currentExp.category ||
                 exp.tags.some(tag => currentExp.tags.includes(tag)) ||
                 exp.neighborhood === currentExp.neighborhood)
            )
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }
}

// Initialize culture data
const cultureData = new CultureData();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CultureData;
} 