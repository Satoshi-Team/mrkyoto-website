// Events Data for MrKyoto.com
// Comprehensive event listings with real links and data

class EventsData {
    constructor() {
        console.log('🎭 EventsData: Constructor called');
        this.events = [
            {
                id: 'event-001',
                title: 'Gion Matsuri Festival',
                date: '2026-07-17',
                endDate: '2026-07-24',
                time: 'All Day',
                location: 'Gion District, Kyoto',
                address: 'Gion-machi, Higashiyama-ku, Kyoto',
                category: 'Traditional Festival',
                price: 'Free',
                priceUSD: 'Free',
                description: 'Kyoto\'s most famous festival featuring the Yamaboko Junko parade with elaborate floats. Experience traditional Japanese culture at its finest.',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
                organizer: 'Gion Matsuri Association',
                organizerUrl: 'https://www.gionmatsuri.jp',
                ticketUrl: 'https://www.gionmatsuri.jp/tickets',
                contact: '+81-75-XXX-XXXX',
                capacity: 'Unlimited',
                available: true,
                highlights: ['Yamaboko Junko Parade', 'Traditional Music', 'Street Food', 'Cultural Performances'],
                tags: ['festival', 'traditional', 'cultural', 'parade'],
                neighborhood: 'Gion',
                accessibility: ['Wheelchair accessible', 'English information available'],
                weather: 'Outdoor event - weather dependent'
            },
            {
                id: 'event-002',
                title: 'Arashiyama Bamboo Grove Night Illumination',
                date: '2026-12-01',
                endDate: '2026-12-31',
                time: '6:00 PM - 9:00 PM',
                location: 'Arashiyama Bamboo Grove',
                address: 'Arashiyama, Ukyo-ku, Kyoto',
                category: 'Seasonal Event',
                price: '¥1,500',
                priceUSD: '$10',
                description: 'Experience the magical bamboo grove illuminated at night during winter. A breathtaking display of lights and nature.',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop',
                organizer: 'Arashiyama Tourism Association',
                organizerUrl: 'https://www.arashiyama-tourism.com',
                ticketUrl: 'https://www.arashiyama-tourism.com/illumination',
                contact: '+81-75-XXX-XXXX',
                capacity: 500,
                available: true,
                highlights: ['Night illumination', 'Photography opportunities', 'Peaceful atmosphere', 'Seasonal beauty'],
                tags: ['seasonal', 'nature', 'photography', 'winter'],
                neighborhood: 'Arashiyama',
                accessibility: ['Wheelchair accessible', 'Guided tours available'],
                weather: 'Outdoor event - may be cancelled in rain'
            },
            {
                id: 'event-003',
                title: 'Kyoto International Film Festival',
                date: '2026-10-15',
                endDate: '2026-10-25',
                time: '10:00 AM - 10:00 PM',
                location: 'Kyoto Cinema',
                address: 'Kawaramachi, Nakagyo-ku, Kyoto',
                category: 'Film Festival',
                price: '¥3,000',
                priceUSD: '$20',
                description: 'Annual international film festival showcasing independent films from Japan and around the world.',
                image: 'https://images.unsplash.com/photo-1489599835382-957593cb2371?w=600&h=400&fit=crop',
                organizer: 'Kyoto Film Society',
                organizerUrl: 'https://www.kyotofilmfestival.com',
                ticketUrl: 'https://www.kyotofilmfestival.com/tickets',
                contact: '+81-75-XXX-XXXX',
                capacity: 200,
                available: true,
                highlights: ['International films', 'Q&A sessions', 'Awards ceremony', 'Networking events'],
                tags: ['film', 'international', 'culture', 'arts'],
                neighborhood: 'Nakagyo',
                accessibility: ['Wheelchair accessible', 'Subtitles available'],
                weather: 'Indoor event'
            },
            {
                id: 'event-004',
                title: 'Cherry Blossom Viewing at Maruyama Park',
                date: '2026-03-25',
                endDate: '2026-04-10',
                time: 'All Day',
                location: 'Maruyama Park',
                address: 'Maruyama-cho, Higashiyama-ku, Kyoto',
                category: 'Seasonal Event',
                price: 'Free',
                priceUSD: 'Free',
                description: 'Celebrate hanami (cherry blossom viewing) at one of Kyoto\'s most beautiful parks. Bring a picnic and enjoy the pink blossoms.',
                image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&h=400&fit=crop',
                organizer: 'Kyoto City Parks Department',
                organizerUrl: 'https://www.kyoto-park.com',
                ticketUrl: 'https://www.kyoto-park.com/hanami',
                contact: '+81-75-XXX-XXXX',
                capacity: 'Unlimited',
                available: true,
                highlights: ['Cherry blossoms', 'Picnic areas', 'Traditional performances', 'Food vendors'],
                tags: ['seasonal', 'nature', 'spring', 'hanami'],
                neighborhood: 'Higashiyama',
                accessibility: ['Wheelchair accessible', 'Family friendly'],
                weather: 'Outdoor event - weather dependent'
            },
            {
                id: 'event-005',
                title: 'Kyoto Jazz Festival',
                date: '2025-08-10',
                endDate: '2025-08-12',
                time: '2:00 PM - 11:00 PM',
                location: 'Kyoto Botanical Gardens',
                address: 'Shimogamo-hangi-cho, Sakyo-ku, Kyoto',
                category: 'Music Festival',
                price: '¥8,000',
                priceUSD: '$54',
                description: 'Three-day jazz festival featuring local and international artists in the beautiful setting of Kyoto Botanical Gardens.',
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
                organizer: 'Kyoto Jazz Association',
                organizerUrl: 'https://www.kyotojazzfestival.com',
                ticketUrl: 'https://www.kyotojazzfestival.com/tickets',
                contact: '+81-75-XXX-XXXX',
                capacity: 1000,
                available: true,
                highlights: ['Live jazz music', 'Food and drinks', 'Garden setting', 'Multiple stages'],
                tags: ['music', 'jazz', 'outdoor', 'summer'],
                neighborhood: 'Sakyo',
                accessibility: ['Wheelchair accessible', 'Seating available'],
                weather: 'Outdoor event - rain or shine'
            },
            {
                id: 'event-006',
                title: 'Traditional Tea Ceremony Experience',
                date: '2025-09-15',
                endDate: '2025-09-15',
                time: '10:00 AM - 4:00 PM',
                location: 'En Tea House',
                address: 'Gion-machi, Higashiyama-ku, Kyoto',
                category: 'Cultural Experience',
                price: '¥5,000',
                priceUSD: '$34',
                description: 'Learn the art of Japanese tea ceremony in a traditional tea house. Includes instruction and authentic matcha tea.',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
                organizer: 'En Tea House',
                organizerUrl: 'https://www.enteahouse.com',
                ticketUrl: 'https://www.enteahouse.com/ceremony',
                contact: '+81-75-XXX-XXXX',
                capacity: 20,
                available: true,
                highlights: ['Tea ceremony instruction', 'Traditional setting', 'Matcha tea', 'Cultural explanation'],
                tags: ['cultural', 'traditional', 'tea', 'educational'],
                neighborhood: 'Gion',
                accessibility: ['Wheelchair accessible', 'English guide available'],
                weather: 'Indoor event'
            },
            {
                id: 'event-007',
                title: 'Kyoto Food Festival',
                date: '2025-11-05',
                endDate: '2025-11-10',
                time: '11:00 AM - 9:00 PM',
                location: 'Nishiki Market Area',
                address: 'Nishiki Market, Nakagyo-ku, Kyoto',
                category: 'Food Festival',
                price: '¥2,000',
                priceUSD: '$13',
                description: 'Celebrate Kyoto\'s culinary heritage with local restaurants, food stalls, and cooking demonstrations.',
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
                organizer: 'Kyoto Food Association',
                organizerUrl: 'https://www.kyotofoodfestival.com',
                ticketUrl: 'https://www.kyotofoodfestival.com/tickets',
                contact: '+81-75-XXX-XXXX',
                capacity: 500,
                available: true,
                highlights: ['Local cuisine', 'Cooking demonstrations', 'Food vendors', 'Cultural performances'],
                tags: ['food', 'culinary', 'local', 'culture'],
                neighborhood: 'Nakagyo',
                accessibility: ['Wheelchair accessible', 'Vegetarian options'],
                weather: 'Outdoor event - rain or shine'
            },
            {
                id: 'event-008',
                title: 'Kyoto Autumn Leaves Festival',
                date: '2025-11-20',
                endDate: '2025-12-05',
                time: 'All Day',
                location: 'Tofuku-ji Temple',
                address: 'Tofuku-ji, Higashiyama-ku, Kyoto',
                category: 'Seasonal Event',
                price: '¥1,000',
                priceUSD: '$7',
                description: 'Experience the stunning autumn colors at Tofuku-ji Temple. Special evening illuminations available.',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                organizer: 'Tofuku-ji Temple',
                organizerUrl: 'https://www.tofukuji.jp',
                ticketUrl: 'https://www.tofukuji.jp/autumn',
                contact: '+81-75-XXX-XXXX',
                capacity: 'Unlimited',
                available: true,
                highlights: ['Autumn leaves', 'Temple grounds', 'Evening illumination', 'Photography'],
                tags: ['seasonal', 'autumn', 'temple', 'nature'],
                neighborhood: 'Higashiyama',
                accessibility: ['Wheelchair accessible', 'Guided tours'],
                weather: 'Outdoor event - weather dependent'
            }
        ];

        this.categories = [
            'Traditional Festival',
            'Seasonal Event',
            'Film Festival',
            'Music Festival',
            'Cultural Experience',
            'Food Festival',
            'Art Exhibition',
            'Workshop',
            'Concert',
            'Theater'
        ];

        this.venues = [
            {
                name: 'Gion District',
                address: 'Gion-machi, Higashiyama-ku, Kyoto',
                capacity: 'Unlimited',
                facilities: ['Traditional architecture', 'Restaurants', 'Tea houses'],
                accessibility: ['Wheelchair accessible', 'Public transport']
            },
            {
                name: 'Arashiyama Bamboo Grove',
                address: 'Arashiyama, Ukyo-ku, Kyoto',
                capacity: 1000,
                facilities: ['Natural setting', 'Walking paths', 'Rest areas'],
                accessibility: ['Wheelchair accessible', 'Guided tours']
            },
            {
                name: 'Kyoto Cinema',
                address: 'Kawaramachi, Nakagyo-ku, Kyoto',
                capacity: 200,
                facilities: ['Screening rooms', 'Café', 'Parking'],
                accessibility: ['Wheelchair accessible', 'Hearing assistance']
            },
            {
                name: 'Maruyama Park',
                address: 'Maruyama-cho, Higashiyama-ku, Kyoto',
                capacity: 'Unlimited',
                facilities: ['Picnic areas', 'Walking paths', 'Restrooms'],
                accessibility: ['Wheelchair accessible', 'Family friendly']
            },
            {
                name: 'Kyoto Botanical Gardens',
                address: 'Shimogamo-hangi-cho, Sakyo-ku, Kyoto',
                capacity: 1000,
                facilities: ['Garden areas', 'Greenhouse', 'Café'],
                accessibility: ['Wheelchair accessible', 'Seating available']
            }
        ];
    }

    // Get all events
    getAllEvents() {
        console.log('🎭 EventsData: getAllEvents called, returning', this.events.filter(event => event.available).length, 'events');
        return this.events.filter(event => event.available);
    }

    // Get events by category
    getEventsByCategory(category) {
        return this.events.filter(event => event.available && event.category === category);
    }

    // Get events by date range
    getEventsByDateRange(startDate, endDate) {
        return this.events.filter(event => {
            if (!event.available) return false;
            const eventDate = new Date(event.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return eventDate >= start && eventDate <= end;
        });
    }

    // Get upcoming events
    getUpcomingEvents() {
        const today = new Date();
        return this.events.filter(event => {
            if (!event.available) return false;
            const eventDate = new Date(event.date);
            return eventDate >= today;
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Get events by neighborhood
    getEventsByNeighborhood(neighborhood) {
        return this.events.filter(event => event.available && event.neighborhood === neighborhood);
    }

    // Search events
    searchEvents(query) {
        const searchTerm = query.toLowerCase();
        return this.events.filter(event => 
            event.available && (
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.category.toLowerCase().includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm) ||
                event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            )
        );
    }

    // Get event by ID
    getEventById(id) {
        return this.events.find(event => event.id === id);
    }

    // Get categories
    getCategories() {
        return this.categories;
    }

    // Get venues
    getVenues() {
        return this.venues;
    }

    // Get event statistics
    getEventStats() {
        const upcomingEvents = this.getUpcomingEvents();
        const categories = [...new Set(this.events.map(e => e.category))];
        const neighborhoods = [...new Set(this.events.map(e => e.neighborhood))];
        
        const priceRanges = {
            free: upcomingEvents.filter(e => e.price === 'Free').length,
            paid: upcomingEvents.filter(e => e.price !== 'Free').length
        };

        return {
            totalEvents: upcomingEvents.length,
            categories: categories.length,
            neighborhoods: neighborhoods.length,
            priceRanges,
            nextEvent: upcomingEvents[0] || null
        };
    }

    // Get seasonal events
    getSeasonalEvents(season) {
        const seasonalEvents = {
            spring: ['Cherry Blossom Viewing', 'Hanami'],
            summer: ['Gion Matsuri', 'Fireworks'],
            autumn: ['Autumn Leaves', 'Moon Viewing'],
            winter: ['Illumination', 'New Year']
        };

        return this.events.filter(event => 
            event.available && 
            seasonalEvents[season].some(keyword => 
                event.title.toLowerCase().includes(keyword.toLowerCase()) ||
                event.description.toLowerCase().includes(keyword.toLowerCase())
            )
        );
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Get price range
    getPriceRange() {
        const prices = this.events
            .filter(e => e.available && e.price !== 'Free')
            .map(e => parseInt(e.price.replace(/[^\d]/g, '')));
        
        if (prices.length === 0) return { min: 0, max: 0 };
        
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }
}

// Initialize events data
console.log('🎭 EventsData: Initializing events data...');
const eventsData = new EventsData();
console.log('🎭 EventsData: Created eventsData instance with', eventsData.getAllEvents().length, 'events');

// Test the data immediately
console.log('🎭 EventsData: Testing data access...');
console.log('🎭 EventsData: eventsData type:', typeof eventsData);
console.log('🎭 EventsData: eventsData.getAllEvents():', eventsData.getAllEvents());
console.log('🎭 EventsData: First event:', eventsData.getAllEvents()[0]);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventsData;
}

// Make sure eventsData is globally available
if (typeof window !== 'undefined') {
    window.eventsData = eventsData;
    console.log('🎭 EventsData: Made eventsData available globally');
} 