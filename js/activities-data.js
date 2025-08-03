// Activities Data for MrKyoto.com
// Comprehensive activities and tours with real booking links

const activitiesData = [
    {
        id: 1,
        title: 'Golden Pavilion Tour',
        titleKey: 'activity.goldenPavilion.title',
        description: 'Visit the iconic Kinkaku-ji (Golden Pavilion), a UNESCO World Heritage site covered in gold leaf, surrounded by beautiful gardens and reflecting pond.',
        descriptionKey: 'activity.goldenPavilion.description',
        image: 'https://images.unsplash.com/photo-1695686101263-e13359e45d4d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '¥8,500',
        duration: '3 hours',
        category: 'Cultural',
        location: 'Kinkaku-ji Temple',
        rating: 4.8,
        reviews: 1247,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Professional guide', 'Temple entrance fee', 'Transportation', 'Hotel pickup'],
        highlights: ['Golden Pavilion', 'Zen gardens', 'Reflecting pond', 'Historical commentary'],
        provider: 'Kyoto Cultural Tours',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Golden+Pavilion+Tour&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-354-8708',
        capacity: '12 people per tour',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: true
    },
    {
        id: 2,
        title: 'Fushimi Inari Shrine',
        titleKey: 'activity.fushimiInari.title',
        description: 'Explore the famous red torii gates of Fushimi Inari Shrine, hike through the mountain trails, and learn about Shinto traditions.',
        descriptionKey: 'activity.fushimiInari.description',
        image: 'https://images.unsplash.com/photo-1682336276985-38ac477bb876?q=80&w=3262&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '¥6,800',
        duration: '4 hours',
        category: 'Cultural',
        location: 'Fushimi Inari Shrine',
        rating: 4.9,
        reviews: 2156,
        difficulty: 'Moderate',
        groupSize: 'Small Group',
        includes: ['Professional guide', 'Shrine visit', 'Mountain hike', 'Cultural insights'],
        highlights: ['Red torii gates', 'Mountain trails', 'Shinto traditions', 'City views'],
        provider: 'Kyoto Heritage Tours',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Fushimi+Inari+Shrine&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-611-0123',
        capacity: '15 people per tour',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: true
    },
    {
        id: 3,
        title: 'Arashiyama Bamboo Grove',
        titleKey: 'activity.arashiyamaBamboo.title',
        description: 'Walk through the enchanting bamboo forest of Arashiyama, visit Tenryu-ji Temple, and experience the peaceful atmosphere of this historic district.',
        descriptionKey: 'activity.arashiyamaBamboo.description',
        image: 'https://images.unsplash.com/photo-1632923754832-60642c12a7ed?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '¥7,200',
        duration: '3.5 hours',
        category: 'Nature',
        location: 'Arashiyama District',
        rating: 4.7,
        reviews: 1893,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Professional guide', 'Bamboo grove walk', 'Temple visit', 'Scenic views'],
        highlights: ['Bamboo forest', 'Tenryu-ji Temple', 'Togetsukyo Bridge', 'Monkey Park'],
        provider: 'Arashiyama Experience',
        providerUrl: 'https://www.insidekyoto.com',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Arashiyama+Bamboo+Grove&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-861-0012',
        capacity: '8 people per tour',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: true
    },
    {
        id: 4,
        title: 'Gion District',
        titleKey: 'activity.gionDistrict.title',
        description: 'Discover the historic geisha district of Gion, walk through traditional streets, and learn about Kyoto\'s traditional entertainment culture.',
        descriptionKey: 'activity.gionDistrict.description',
        image: 'https://images.unsplash.com/photo-1597730763269-c49ab9f9db0f?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '¥6,500',
        duration: '2.5 hours',
        category: 'Cultural',
        location: 'Gion District',
        rating: 4.6,
        reviews: 1567,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Professional guide', 'District walk', 'Cultural insights', 'Photo opportunities'],
        highlights: ['Traditional streets', 'Geisha culture', 'Historic buildings', 'Evening atmosphere'],
        provider: 'Gion Cultural Tours',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Gion+District&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-561-1119',
        capacity: '15 people per tour',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 5,
        title: 'Tea Ceremony',
        titleKey: 'activity.teaCeremony.title',
        description: 'Experience a traditional Japanese tea ceremony in a historic tea house, learn about tea culture, and enjoy matcha tea and sweets.',
        descriptionKey: 'activity.teaCeremony.description',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        price: '¥4,800',
        duration: '1.5 hours',
        category: 'Cultural',
        location: 'Traditional Tea House',
        rating: 4.8,
        reviews: 892,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Tea ceremony', 'Matcha tea', 'Traditional sweets', 'Cultural explanation'],
        highlights: ['Traditional ceremony', 'Tea house setting', 'Matcha preparation', 'Cultural learning'],
        provider: 'En Tea House',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kyoto+Tea+Ceremony&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-221-0123',
        capacity: '6 people per session',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 6,
        title: 'Kyoto Food Tour',
        titleKey: 'activity.kyotoFoodTour.title',
        description: 'Explore Kyoto\'s culinary scene with visits to local markets, traditional restaurants, and sampling of authentic Japanese cuisine.',
        descriptionKey: 'activity.kyotoFoodTour.description',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop&crop=center',
        price: '¥9,200',
        duration: '4 hours',
        category: 'Food',
        location: 'Various Locations',
        rating: 4.9,
        reviews: 1345,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Food tastings', 'Market visit', 'Restaurant stops', 'Cultural insights'],
        highlights: ['Local markets', 'Traditional cuisine', 'Food culture', 'Multiple tastings'],
        provider: 'Kyoto Food Adventures',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/Kyoto-tours/Food-Tours/d332-g6-c80?pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-213-4567',
        capacity: '10 people per tour',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: true
    },
    {
        id: 7,
        title: 'Kimono Dressing',
        titleKey: 'activity.kimonoDressing.title',
        description: 'Experience traditional Japanese culture by wearing a beautiful kimono, taking photos at historic locations, and learning about kimono etiquette.',
        descriptionKey: 'activity.kimonoDressing.description',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop&crop=center',
        price: '¥5,500',
        duration: '3 hours',
        category: 'Cultural',
        location: 'Kimono Studio',
        rating: 4.7,
        reviews: 678,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Kimono rental', 'Dressing assistance', 'Photo session', 'Cultural guidance'],
        highlights: ['Traditional kimono', 'Professional dressing', 'Photo opportunities', 'Cultural learning'],
        provider: 'Yumeya Kimono Studio',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kyoto+Kimono+Dressing&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-708-7102',
        capacity: '4 people per session',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 8,
        title: 'Kyoto Cycling Tour',
        titleKey: 'activity.kyotoCycling.title',
        description: 'Explore Kyoto\'s hidden gems and historic sites by bicycle, covering more ground while enjoying the city\'s beautiful scenery.',
        descriptionKey: 'activity.kyotoCycling.description',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        price: '¥8,800',
        duration: '5 hours',
        category: 'Adventure',
        location: 'Various Locations',
        rating: 4.6,
        reviews: 945,
        difficulty: 'Moderate',
        groupSize: 'Small Group',
        includes: ['Bicycle rental', 'Professional guide', 'Safety equipment', 'Refreshments'],
        highlights: ['Hidden temples', 'Scenic routes', 'Local neighborhoods', 'Comprehensive tour'],
        provider: 'Kyoto Cycling Tours',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kyoto+Cycling+Tour&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-708-7100',
        capacity: '8 people per tour',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 9,
        title: 'Zen Meditation',
        titleKey: 'activity.zenMeditation.title',
        description: 'Experience authentic Zen meditation at a traditional temple, learn meditation techniques, and find inner peace in a serene setting.',
        descriptionKey: 'activity.zenMeditation.description',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        price: '¥3,500',
        duration: '2 hours',
        category: 'Wellness',
        location: 'Zen Temple',
        rating: 4.8,
        reviews: 456,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Meditation session', 'Temple visit', 'Zen instruction', 'Peaceful environment'],
        highlights: ['Zen meditation', 'Temple atmosphere', 'Mindfulness practice', 'Cultural experience'],
        provider: 'Daitoku-ji Zen Center',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kyoto+Zen+Meditation&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-491-0123',
        capacity: '8 people per session',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 10,
        title: 'Kiyomizu-dera Temple',
        titleKey: 'activity.kiyomizuTemple.title',
        description: 'Visit the famous wooden temple complex with stunning views of Kyoto, known for its "stage" that juts out over the hillside.',
        descriptionKey: 'activity.kiyomizuTemple.description',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop&crop=center',
        price: '¥5,200',
        duration: '2.5 hours',
        category: 'Cultural',
        location: 'Kiyomizu-dera Temple',
        rating: 4.7,
        reviews: 1234,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Temple entrance', 'Professional guide', 'Cultural insights', 'Photo opportunities'],
        highlights: ['Wooden architecture', 'City views', 'Pure water spring', 'Historic significance'],
        provider: 'Kyoto Heritage Tours',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kiyomizu-dera+Temple&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-551-1234',
        capacity: '12 people per tour',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 11,
        title: 'Nijo Castle',
        titleKey: 'activity.nijoCastle.title',
        description: 'Explore the historic castle with its "nightingale floors" and beautiful gardens, once the residence of the Tokugawa shoguns.',
        descriptionKey: 'activity.nijoCastle.description',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        price: '¥4,800',
        duration: '2 hours',
        category: 'Cultural',
        location: 'Nijo Castle',
        rating: 4.6,
        reviews: 987,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Castle entrance', 'Professional guide', 'Historical commentary', 'Garden access'],
        highlights: ['Nightingale floors', 'Beautiful gardens', 'Historical architecture', 'Shogun history'],
        provider: 'Kyoto Castle Tours',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Nijo+Castle+Kyoto&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-841-0096',
        capacity: '10 people per tour',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 12,
        title: 'Sake Brewery Tour',
        titleKey: 'activity.sakeBrewery.title',
        description: 'Visit traditional sake breweries in Fushimi district, learn about sake production, and enjoy tastings of premium sake.',
        descriptionKey: 'activity.sakeBrewery.description',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        price: '¥6,800',
        duration: '3 hours',
        category: 'Culinary',
        location: 'Fushimi District',
        rating: 4.8,
        reviews: 567,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Brewery tour', 'Sake tasting', 'Expert guide', 'Traditional snacks'],
        highlights: ['Sake production', 'Traditional methods', 'Premium tastings', 'Cultural experience'],
        provider: 'Fushimi Sake Tours',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kyoto+Sake+Brewery+Tour&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-611-0123',
        capacity: '8 people per tour',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 13,
        title: 'Kyoto Pottery Workshop',
        titleKey: 'activity.kyotoPottery.title',
        description: 'Learn traditional Japanese pottery techniques from master craftsmen and create your own ceramic piece to take home.',
        descriptionKey: 'activity.kyotoPottery.description',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        price: '¥7,500',
        duration: '3.5 hours',
        category: 'Arts & Crafts',
        location: 'Kyoto Pottery District',
        rating: 4.9,
        reviews: 432,
        difficulty: 'Moderate',
        groupSize: 'Small Group',
        includes: ['Pottery instruction', 'Materials provided', 'Firing service', 'Take-home piece'],
        highlights: ['Traditional techniques', 'Hands-on experience', 'Cultural craft', 'Souvenir creation'],
        provider: 'Kyoto Pottery Studio',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kyoto+Pottery+Workshop&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-491-0123',
        capacity: '6 people per session',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 14,
        title: 'Kyoto Night Photography',
        titleKey: 'activity.kyotoNightPhotography.title',
        description: 'Capture the magical atmosphere of Kyoto at night with professional photography guidance and access to exclusive locations.',
        descriptionKey: 'activity.kyotoNightPhotography.description',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        price: '¥8,800',
        duration: '4 hours',
        category: 'Photography',
        location: 'Various Kyoto Locations',
        rating: 4.7,
        reviews: 298,
        difficulty: 'Moderate',
        groupSize: 'Small Group',
        includes: ['Professional guidance', 'Equipment rental', 'Exclusive access', 'Photo editing tips'],
        highlights: ['Night photography', 'Exclusive locations', 'Professional tips', 'Unique perspectives'],
        provider: 'Kyoto Photo Tours',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kyoto+Night+Photography&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-708-7100',
        capacity: '4 people per tour',
        availability: 'Evening tours',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: false
    },
    {
        id: 15,
        title: 'Kyoto Tea Ceremony Experience',
        titleKey: 'activity.kyotoTeaCeremony.title',
        description: 'Experience the traditional Japanese tea ceremony in a historic tea house, learn about tea culture, and participate in this centuries-old ritual.',
        descriptionKey: 'activity.kyotoTeaCeremony.description',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        price: '¥9,200',
        duration: '2 hours',
        category: 'Cultural',
        location: 'Traditional Tea House',
        rating: 4.9,
        reviews: 456,
        difficulty: 'Easy',
        groupSize: 'Small Group',
        includes: ['Tea ceremony instruction', 'Traditional sweets', 'Tea house visit', 'Cultural explanation'],
        highlights: ['Traditional tea ceremony', 'Historic tea house', 'Cultural immersion', 'Authentic experience'],
        provider: 'Kyoto Tea Culture',
        providerUrl: 'https://www.kyoto.travel',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Kyoto+Tea+Ceremony&pid=P00242318&mcid=42383&medium=link',
        contact: '+81-75-708-7200',
        capacity: '6 people per session',
        availability: 'Daily',
        languages: ['English', 'Japanese'],
        cancellation: 'Free cancellation up to 24 hours before',
        featured: true
    }
];

// Activities Data Manager
class ActivitiesDataManager {
    constructor() {
        this.activities = activitiesData;
    }

    // Get all activities
    getAllActivities() {
        return this.activities;
    }

    // Get featured activities
    getFeaturedActivities() {
        return this.activities.filter(activity => activity.featured);
    }

    // Get activities by category
    getActivitiesByCategory(category) {
        return this.activities.filter(activity => activity.category === category);
    }

    // Search activities
    searchActivities(query) {
        const searchTerm = query.toLowerCase();
        return this.activities.filter(activity => 
                activity.title.toLowerCase().includes(searchTerm) ||
                activity.description.toLowerCase().includes(searchTerm) ||
            activity.category.toLowerCase().includes(searchTerm)
        );
    }

    // Get activity by ID
    getActivityById(id) {
        return this.activities.find(activity => activity.id === id);
    }

    // Get categories
    getCategories() {
        return [...new Set(this.activities.map(activity => activity.category))];
    }

    // Get activity statistics
    getActivityStats() {
        const totalActivities = this.activities.length;
        const categories = this.getCategories();
        const totalRating = this.activities.reduce((sum, activity) => sum + activity.rating, 0);
        const averageRating = totalRating / totalActivities;

        return {
            totalActivities,
            categories: categories.length,
            averageRating: Math.round(averageRating * 10) / 10,
            featuredCount: this.activities.filter(a => a.featured).length
        };
    }
}

// Initialize activities data
const activitiesDataInstance = new ActivitiesDataManager();

// Make available globally for debugging
window.activitiesData = activitiesDataInstance;
window.activitiesDataArray = activitiesData; // Also expose the raw array
console.log('🎭 ActivitiesData: Initializing activities data...');
console.log('🎭 ActivitiesData: Created activitiesData instance with', activitiesDataInstance.getAllActivities().length, 'activities');
console.log('🎭 ActivitiesData: Made activitiesData available globally');
console.log('🎭 ActivitiesData: Raw array has', activitiesData.length, 'activities'); 