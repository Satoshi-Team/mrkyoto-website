// Translation Manager for MrKyoto
// Handles comprehensive translation of all content across the application

class TranslationManager {
    constructor() {
        console.log('🌍 TranslationManager constructor called');
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.translations = this.loadTranslations();
        this.translatableElements = new Set();
        this.init();
    }

    init() {
        console.log('🌍 Initializing Translation Manager...');
        try {
            // Wait a bit for DOM to be fully ready
            setTimeout(() => {
                this.scanForTranslatableContent();
                this.applyTranslations();
                this.setupLanguageChangeListener();
                console.log('✅ Translation Manager initialized successfully');
            }, 100);
        } catch (error) {
            console.error('❌ Error initializing Translation Manager:', error);
        }
    }

    getStoredLanguage() {
        return localStorage.getItem('mrkyoto-language') || 'en';
    }

    loadTranslations() {
        return {
            en: {
                // Meta
                'meta.title': 'MrKyoto.com | Your Gateway to Timeless Kyoto - Real Estate, Events & Cultural Experiences',
                'meta.description': 'Discover the best of Kyoto - from traditional temples and cultural events to premium real estate and local insights. Your complete guide to exploring, living, and connecting with Japan\'s historic cultural capital.',
                
                // Navigation
                'nav.brand': 'MrKyoto',
                'nav.home': 'Home',
                'nav.realEstate': 'Real Estate',
                'nav.activities': 'Activities',
                'nav.events': 'Events',
                'nav.news': 'News',
                'nav.culture': 'Culture',
                'nav.about': 'About',
                'nav.contact': 'Contact',
                'nav.buyHouse': 'Buy House',
                'nav.rentHouse': 'Rent House',
                'nav.language': 'Language',
                'nav.theme': 'Theme',
                'nav.liveFromKyoto': 'Live from Kyoto',

                // Hero Section
                'hero.title': 'Your Gateway to Timeless Kyoto',
                'hero.subtitle': 'Discover the perfect blend of tradition and modernity in Japan\'s cultural heart. From sacred temples to modern living, every corner tells a story.',
                'hero.exploreProperties': 'Explore Properties',
                'hero.discoverActivities': 'Discover Activities',
                'hero.search.placeholder': '🔍 Search Kyoto properties, activities, events, news...',
                'hero.stats.properties': 'Properties',
                'hero.stats.activities': 'Activities',
                'hero.stats.events': 'Events',

                // Quick Actions
                'quick.realEstate': '🏠 Real Estate',
                'quick.activities': '🎯 Activities',
                'quick.events': '🎭 Events',
                'quick.news': '📰 News',

                // About Section
                'about.sectionTitle': 'Gateway to Kyoto',
                'about.welcome': 'Welcome to MrKyoto.com, your comprehensive guide to Japan\'s most beautiful city. Whether you\'re planning a visit, looking to live here, or simply want to explore Kyoto\'s rich cultural heritage, we\'re here to help you discover the perfect blend of ancient traditions and modern convenience.',
                'about.culturalHeritage.title': 'Cultural Heritage',
                'about.culturalHeritage.description': 'Explore over 1,600 Buddhist temples, 400 Shinto shrines, and countless traditional gardens that make Kyoto a living museum of Japanese culture.',
                'about.realEstate.title': 'Real Estate',
                'about.realEstate.description': 'Find your perfect home in Kyoto, from traditional machiya to modern apartments, all in the most desirable neighborhoods.',
                'about.localExperiences.title': 'Local Experiences',
                'about.localExperiences.description': 'Immerse yourself in authentic cultural experiences, from tea ceremonies to traditional festivals and seasonal celebrations.',

                // Featured Properties
                'featured.sectionTitle': 'Featured Properties',
                'featured.title': '🏠 Featured Properties',
                'featured.description': 'Discover exceptional homes in Kyoto\'s most desirable neighborhoods. From traditional machiya to modern apartments, find your perfect Kyoto residence.',
                'featured.loading': 'Loading properties...',
                'featured.browseAll': 'Browse All Properties',
                'featured.featured': 'featured',
                'featured.premium': 'premium',

                // Explore Section
                'explore.sectionTitle': 'Explore',
                'explore.description': 'Discover the perfect blend of tradition and modernity in Japan\'s cultural heart. From sacred temples to modern living, every corner tells a story.',
                'explore.topActivities.title': 'Top Activities',
                'explore.topActivities.description': 'Discover Kyoto\'s most sacred temples and authentic cultural experiences.',
                'explore.eventTickets.title': 'Event Tickets',
                'explore.eventTickets.description': 'Book tickets for traditional festivals and cultural performances.',
                'explore.localNews.title': 'Local News',
                'explore.localNews.description': 'Stay updated with the latest happenings and cultural developments.',
                'explore.cultureTraditions.title': 'Culture & Traditions',
                'explore.cultureTraditions.description': 'Immerse yourself in Kyoto\'s rich cultural heritage and traditions.',

                // Contact Section
                'contact.sectionTitle': 'Contact Us',
                'contact.description': 'Have questions about Kyoto? We\'d love to hear from you and help you discover the perfect Kyoto experience.',
                'contact.form.name': 'Name',
                'contact.form.email': 'Email',
                'contact.form.message': 'Message',
                'contact.form.send': 'Send Message',
                'contact.services.title': 'Our Services',
                'contact.services.expertGuidance.title': 'Expert Guidance',
                'contact.services.expertGuidance.description': 'Local insights and expert recommendations for the best Kyoto experience.',
                'contact.services.trustedListings.title': 'Trusted Listings',
                'contact.services.trustedListings.description': 'Curated real estate listings and verified property information.',
                'contact.services.culturalExperiences.title': 'Cultural Experiences',
                'contact.services.culturalExperiences.description': 'Authentic cultural experiences and traditional activities.',

                // Footer
                'footer.brand': 'MrKyoto',
                'footer.tagline': 'Your gateway to timeless Kyoto — explore, live, and connect with the heart of Japan\'s cultural capital.',
                'footer.explore.title': 'Explore',
                'footer.explore.activities': 'Top Activities',
                'footer.explore.culture': 'Culture & Traditions',
                'footer.explore.events': 'Events & Festivals',
                'footer.explore.news': 'Local News',
                'footer.realEstate.title': 'Real Estate',
                'footer.realEstate.buy': 'Buy a House',
                'footer.realEstate.rent': 'Rent a House',
                'footer.realEstate.listings': 'Property Listings',
                'footer.realEstate.areas': 'Local Areas',
                'footer.connect.title': 'Connect',
                'footer.connect.privacy': 'Privacy Policy',
                'footer.connect.terms': 'Terms of Service',
                'footer.copyright': '© 2025 MrKyoto.com. All rights reserved. Your gateway to timeless Kyoto.',
                'footer.copyright': '© 2025 MrKyoto.com. All rights reserved. Your gateway to timeless Kyoto.',

                // Property Cards
                'property.viewDetails': 'View Details',
                'property.contact': 'Contact',
                'property.favorite': 'Favorite',
                'property.bed': 'Bed',
                'property.bath': 'Bath',
                'property.sqft': 'sqft',
                'property.walkScore': 'Walk Score',

                // Common Actions
                'action.search': 'Search',
                'action.loadMore': 'Load More',
                'action.viewAll': 'View All',
                'action.back': 'Back',
                'action.next': 'Next',
                'action.previous': 'Previous',
                'action.close': 'Close',
                'action.save': 'Save',
                'action.cancel': 'Cancel',
                'action.edit': 'Edit',
                'action.delete': 'Delete',

                // Real Estate Page
                'realEstate.meta.title': 'Kyoto Real Estate | Buy & Rent Houses in Kyoto, Japan | Property Listings | MrKyoto.com',
                'realEstate.meta.description': 'Discover premium real estate in Kyoto, Japan. Browse houses for sale and rent in Gion, Arashiyama, Higashiyama, and other exclusive neighborhoods. Expert guidance for buying and renting property in Japan\'s cultural capital.',
                'realEstate.hero.title': 'Kyoto Real Estate 2026',
                'realEstate.hero.subtitle': 'Discover premium properties in Japan\'s cultural capital',
                'realEstate.hero.badges.updated': 'Updated 2026',
                'realEstate.hero.badges.analytics': 'Market Analytics',
                'realEstate.hero.badges.data': 'Rich Data',
                'realEstate.hero.badges.verified': 'Verified Properties',
                'realEstate.hero.marketOverview': 'Market Overview',
                'realEstate.hero.stats.properties': 'Properties',
                'realEstate.hero.stats.avgPrice': 'Avg. Price',
                'realEstate.hero.stats.marketHealth': 'Market Health',
                'realEstate.search.placeholder': '🔍 Search properties by title, location, neighborhood, features...',
                'realEstate.filters.allTypes': 'All Types',
                'realEstate.filters.forSale': 'For Sale',
                'realEstate.filters.forRent': 'For Rent',
                'realEstate.filters.allPrices': 'All Prices',
                'realEstate.filters.under50m': 'Under ¥50M',
                'realEstate.filters.50m100m': '¥50M - ¥100M',
                'realEstate.filters.100m200m': '¥100M - ¥200M',
                'realEstate.filters.over200m': 'Over ¥200M',
                'realEstate.filters.newest': 'Newest',
                'realEstate.filters.priceLow': 'Price: Low to High',
                'realEstate.filters.priceHigh': 'Price: High to Low',
                'realEstate.filters.size': 'Size',
                'realEstate.filters.walkScore': 'Walk Score',
                'realEstate.view.grid': 'Grid',
                'realEstate.view.list': 'List',
                
                // Real Estate Page - Additional Sections
                'realEstate.section.availableProperties': 'Available Properties',
                'realEstate.section.forSale': 'for sale',
                'realEstate.section.forRent': 'for rent',
                'realEstate.actions.clearFilters': 'Clear Filters',
                'realEstate.actions.saveSearch': 'Save Search',
                'realEstate.signup.title': 'Stay Updated with Kyoto Real Estate',
                'realEstate.signup.subtitle': 'Get exclusive updates about property listings, market trends, and investment opportunities in Kyoto. Find your perfect home in Japan\'s cultural capital.',
                'realEstate.signup.form.name': 'Full Name',
                'realEstate.signup.form.email': 'Email Address',
                'realEstate.signup.form.phone': 'Phone Number (Optional)',
                'realEstate.signup.form.propertyType': 'Property Type Interest',
                'realEstate.signup.form.budget': 'Budget Range',
                'realEstate.signup.form.location': 'Preferred Location',
                'realEstate.signup.form.subscribe': 'Subscribe to Updates',
                'realEstate.signup.form.submit': 'Subscribe to Real Estate Updates',
                'realEstate.signup.form.agreement': 'By subscribing, you agree to receive updates about Kyoto real estate. We respect your privacy and will never share your information.',

                // Legal Pages - Terms of Service
                'terms.meta.title': 'Terms of Service - MrKyoto.com',
                'terms.meta.description': 'Terms and conditions for using MrKyoto.com services.',
                'terms.hero.title': 'Terms of Service',
                'terms.hero.subtitle': 'Please read these terms and conditions carefully before using our services.',
                'terms.section.lastUpdated': 'Last Updated: January 2025',
                'terms.section.acceptance': 'Acceptance of Terms',
                'terms.section.acceptance.desc': 'By accessing and using MrKyoto.com, you accept and agree to be bound by the terms and provision of this agreement.',
                'terms.section.use': 'Use License',
                'terms.section.use.desc': 'Permission is granted to temporarily download one copy of the materials (information or software) on MrKyoto.com for personal, non-commercial transitory viewing only.',
                'terms.section.restrictions': 'Restrictions',
                'terms.section.restrictions.desc': 'You are specifically restricted from all of the following: modifying or copying the materials, using the materials for any commercial purpose or for any public display, attempting to reverse engineer any software contained on MrKyoto.com.',
                'terms.section.disclaimer': 'Disclaimer',
                'terms.section.disclaimer.desc': 'The materials on MrKyoto.com are provided on an \'as is\' basis. MrKyoto.com makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
                'terms.section.limitations': 'Limitations',
                'terms.section.limitations.desc': 'In no event shall MrKyoto.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MrKyoto.com.',
                'terms.section.accuracy': 'Accuracy of Materials',
                'terms.section.accuracy.desc': 'The materials appearing on MrKyoto.com could include technical, typographical, or photographic errors. MrKyoto.com does not warrant that any of the materials on its website are accurate, complete or current.',
                'terms.section.links': 'Links',
                'terms.section.links.desc': 'MrKyoto.com has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MrKyoto.com of the site.',
                'terms.section.modifications': 'Modifications',
                'terms.section.modifications.desc': 'MrKyoto.com may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.',
                'terms.section.contact': 'Contact Information',
                'terms.section.contact.desc': 'If you have any questions about these Terms of Service, please contact us at hello@mrkyoto.com.',

                // Legal Pages - Privacy Policy
                'privacy.meta.title': 'Privacy Policy - MrKyoto.com',
                'privacy.meta.description': 'Privacy policy and data protection information for MrKyoto.com users.',
                'privacy.hero.title': 'Privacy Policy',
                'privacy.hero.subtitle': 'This privacy policy describes how MrKyoto.com collects, uses, and protects your information.',
                'privacy.section.lastUpdated': 'Last Updated: January 2025',
                'privacy.section.collection': 'Information We Collect',
                'privacy.section.collection.desc': 'We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.',
                'privacy.section.usage': 'How We Use Your Information',
                'privacy.section.usage.desc': 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to develop new features.',
                'privacy.section.sharing': 'Information Sharing',
                'privacy.section.sharing.desc': 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.',
                'privacy.section.security': 'Data Security',
                'privacy.section.security.desc': 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
                'privacy.section.cookies': 'Cookies and Tracking',
                'privacy.section.cookies.desc': 'We use cookies and similar tracking technologies to enhance your experience on our website and to analyze usage patterns.',
                'privacy.section.rights': 'Your Rights',
                'privacy.section.rights.desc': 'You have the right to access, correct, or delete your personal information. You may also opt out of certain communications from us.',
                'privacy.section.changes': 'Changes to This Policy',
                'privacy.section.changes.desc': 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.',
                'privacy.section.contact': 'Contact Us',
                'privacy.section.contact.desc': 'If you have any questions about this privacy policy, please contact us at hello@mrkyoto.com.',

                // Messages
                'message.loading': 'Loading...',
                'message.noResults': 'No results found',
                'message.error': 'An error occurred',
                'message.success': 'Success!',
                'message.languageChanged': 'Language changed to',

                // Live Kyoto Page
                'liveKyoto.meta.title': 'Live from Kyoto - Real-time Cameras, Weather & Updates - MrKyoto.com',
                'liveKyoto.meta.description': 'Experience Kyoto in real-time with live cameras and current weather. Watch live streams from Kyoto Station, temples, and gardens.',
                'liveKyoto.hero.title': 'Live from Kyoto 2026',
                'liveKyoto.hero.subtitle': 'Experience Kyoto in real-time with live cameras and current weather from the heart of Japan\'s cultural capital.',
                'liveKyoto.hero.badges.live': 'Live Streams',
                'liveKyoto.hero.badges.weather': 'Real-time Weather',
                'liveKyoto.hero.badges.verified': 'Verified Sources',

                // Live Kyoto Weather Widget
                'liveKyoto.weather.title': 'Kyoto Weather',
                'liveKyoto.weather.live': 'LIVE',
                'liveKyoto.weather.loading': 'Loading weather...',
                'liveKyoto.weather.feelsLike': 'Feels like',
                'liveKyoto.weather.wind': 'Wind',
                'liveKyoto.weather.humidity': 'Humidity',
                'liveKyoto.weather.visibility': 'Visibility',
                'liveKyoto.weather.pressure': 'Pressure',
                'liveKyoto.weather.sunrise': 'Sunrise',
                'liveKyoto.weather.sunset': 'Sunset',
                'liveKyoto.weather.lastUpdated': 'Last updated',

                // Events Page
                'events.meta.title': 'Kyoto Events & Festivals | Traditional Ceremonies & Cultural Celebrations | MrKyoto.com',
                'events.meta.description': 'Experience Kyoto\'s vibrant cultural calendar with traditional festivals, seasonal celebrations, and modern events. From Gion Matsuri to cherry blossom viewing, discover authentic Japanese cultural experiences.',
                'events.hero.title': 'Kyoto Events & Festivals 2026',
                'events.hero.subtitle': 'Experience Kyoto\'s vibrant cultural calendar with traditional festivals, seasonal celebrations, and modern events.',
                'events.hero.badges.updated': 'Updated 2026',
                'events.hero.badges.cultural': 'Cultural Events',
                'events.hero.badges.festivals': 'Traditional Festivals',
                'events.hero.badges.verified': 'Verified Events',
                'events.search.placeholder': '🔍 Search events by name, category, date, location...',
                'events.filters.allCategories': 'All Categories',
                'events.filters.traditional': 'Traditional',
                'events.filters.cultural': 'Cultural',
                'events.filters.seasonal': 'Seasonal',
                'events.filters.modern': 'Modern',
                'events.filters.religious': 'Religious',
                'events.filters.allMonths': 'All Months',
                'events.filters.january': 'January',
                'events.filters.february': 'February',
                'events.filters.march': 'March',
                'events.filters.april': 'April',
                'events.filters.may': 'May',
                'events.filters.june': 'June',
                'events.filters.july': 'July',
                'events.filters.august': 'August',
                'events.filters.september': 'September',
                'events.filters.october': 'October',
                'events.filters.november': 'November',
                'events.filters.december': 'December',
                'events.filters.date': 'Date',
                'events.filters.mostPopular': 'Most Popular',
                'events.filters.nameAZ': 'Name A-Z',
                'events.filters.category': 'Category',
                'events.filters.grid': 'Grid',
                'events.filters.list': 'List',
                'events.section.availableEvents': 'Available Events',
                'events.loading.text': 'Loading events and festival data...',
                'events.noResults.title': 'No Events Found',
                'events.noResults.description': 'Try adjusting your search criteria or filters.',
                'events.modal.bookTickets': 'Book Tickets',
                'events.modal.learnMore': 'Learn More',
                'events.modal.details': 'Details',
                'events.modal.close': 'Close',
                'events.notification.dataUpdated': 'Event data updated',
                
                // Events Page - Hero Section
                'events.hero.liveEvents': 'Live Events',
                'events.hero.title': 'Kyoto Events & Festivals',
                'events.hero.subtitle': 'Experience Japan\'s most prestigious cultural celebrations and modern events.',
                'events.hero.traditionalFestivals': 'Traditional festivals',
                'events.hero.seasonalCelebrations': 'seasonal celebrations',
                'events.hero.allEvents': 'All Events',
                'events.hero.searchEvents': 'Search Events',
                
                // Events Page - Stats Section
                'events.stats.overview': 'Event Overview',
                'events.stats.events': 'Events',
                'events.stats.thisMonth': 'This Month',
                'events.stats.categories': 'Categories',
                'events.stats.upcoming': 'Upcoming',
                'events.stats.live': 'Live',
                
                // Events Page - Search and Filters
                'events.search.placeholder': '🔍 Search events by name, category, date, location...',
                'events.search.search': 'Search',
                'events.filters.allCategories': 'All Categories',
                'events.filters.traditional': 'Traditional',
                'events.filters.cultural': 'Cultural',
                'events.filters.seasonal': 'Seasonal',
                'events.filters.modern': 'Modern',
                'events.filters.religious': 'Religious',
                'events.filters.allMonths': 'All Months',
                'events.filters.january': 'January',
                'events.filters.february': 'February',
                'events.filters.march': 'March',
                'events.filters.april': 'April',
                'events.filters.may': 'May',
                'events.filters.june': 'June',
                'events.filters.july': 'July',
                'events.filters.august': 'August',
                'events.filters.september': 'September',
                'events.filters.october': 'October',
                'events.filters.november': 'November',
                'events.filters.december': 'December',
                'events.filters.date': 'Date',
                'events.filters.mostPopular': 'Most Popular',
                'events.filters.nameAZ': 'Name A-Z',
                'events.filters.category': 'Category',
                'events.filters.grid': 'Grid',
                'events.filters.list': 'List',
                'events.section.availableEvents': 'Available Events',
                'events.loading.text': 'Loading events and festivals data...',
                'events.noResults.title': 'No events found',
                'events.noResults.description': 'Try adjusting your search criteria or filters.',
                'events.modal.bookTickets': 'Book Tickets',
                'events.modal.learnMore': 'Learn More',
                'events.modal.details': 'Details',
                'events.modal.close': 'Close',

                // News Page
                'news.meta.title': 'Kyoto Real-Time News Hub | Live News from Kyoto & Japan | MrKyoto.com',
                'news.meta.description': 'Get real-time news updates from Kyoto and Japan. Stay informed with the latest breaking news, cultural events, and developments from verified news sources.',
                'news.hero.title': 'Kyoto Real-Time News Hub',
                'news.hero.subtitle': 'Stay informed with real-time news updates from Kyoto and Japan.',
                'news.hero.badges.updated': 'Updated 2026',
                'news.hero.badges.verified': 'Verified Sources',
                'news.hero.badges.live': 'Live Updates',
                'news.search.placeholder': '🔍 Search news by title, category, source, date...',
                'news.filters.allCategories': 'All Categories',
                'news.filters.culture': 'Culture',
                'news.filters.tourism': 'Tourism',
                'news.filters.events': 'Events',
                'news.filters.business': 'Business',
                'news.filters.weather': 'Weather',
                'news.filters.allSources': 'All Sources',
                'news.filters.kyotoTimes': 'Kyoto Times',
                'news.filters.japanNews': 'Japan News',
                'news.filters.localNews': 'Local News',
                'news.filters.international': 'International',
                'news.filters.newest': 'Newest',
                'news.filters.oldest': 'Oldest',
                'news.filters.mostPopular': 'Most Popular',
                'news.filters.trending': 'Trending',
                'news.filters.grid': 'Grid',
                'news.filters.list': 'List',
                'news.section.availableNews': 'Available News',
                'news.loading.text': 'Loading news and updates...',
                'news.noResults.title': 'No News Found',
                'news.noResults.description': 'Try adjusting your search criteria or filters.',
                'news.modal.readFull': 'Read Full Article',
                'news.modal.share': 'Share',
                'news.modal.favorite': 'Favorite',
                'news.modal.close': 'Close',
                'news.notification.dataUpdated': 'News data updated',
                
                // News Page - Hero Section
                'news.hero.liveUpdates': 'Live Updates',
                'news.hero.title': 'Kyoto Real-Time News Hub',
                'news.hero.subtitle': 'Stay informed with real-time news updates from Kyoto and Japan.',
                'news.hero.verifiedSources': 'Verified sources',
                'news.hero.instantUpdates': 'instant updates',
                'news.hero.latestNews': 'Latest News',
                'news.hero.searchNews': 'Search News',
                
                // News Page - Stats Section
                'news.stats.overview': 'Live News Overview',
                'news.stats.articles': 'Articles',
                'news.stats.today': 'Today',
                'news.stats.sources': 'Sources',
                'news.stats.status': 'Status',
                'news.stats.live': 'Live',
                
                // News Page - Search and Filters
                'news.search.placeholder': '🔍 Search news by title, category, source, date...',
                'news.search.search': 'Search',
                'news.filters.allCategories': 'All Categories',
                'news.filters.culture': 'Culture',
                'news.filters.tourism': 'Tourism',
                'news.filters.events': 'Events',
                'news.filters.business': 'Business',
                'news.filters.weather': 'Weather',
                'news.filters.allSources': 'All Sources',
                'news.filters.kyotoTimes': 'Kyoto Times',
                'news.filters.japanNews': 'Japan News',
                'news.filters.localNews': 'Local News',
                'news.filters.international': 'International',
                'news.filters.newest': 'Newest',
                'news.filters.oldest': 'Oldest',
                'news.filters.mostPopular': 'Most Popular',
                'news.filters.trending': 'Trending',
                'news.filters.grid': 'Grid',
                'news.filters.list': 'List',
                'news.section.availableNews': 'Available News',
                'news.loading.text': 'Loading news and updates...',
                'news.noResults.title': 'No news found',
                'news.noResults.description': 'Try adjusting your search criteria or filters.',
                'news.modal.readFull': 'Read Full Article',
                'news.modal.share': 'Share',
                'news.modal.favorite': 'Favorite',
                'news.modal.close': 'Close',

                // Real Estate Page
                'realEstate.meta.title': 'Kyoto Real Estate | Buy & Rent Houses in Kyoto, Japan | Property Listings | MrKyoto.com',
                'realEstate.meta.description': 'Discover premium real estate in Kyoto, Japan. Browse houses for sale and rent in Gion, Arashiyama, Higashiyama, and other exclusive neighborhoods. Expert guidance for buying and renting property in Japan\'s cultural capital.',
                'realEstate.hero.title': 'Kyoto Real Estate 2026',
                'realEstate.hero.subtitle': 'Discover premium properties in Japan\'s cultural capital',
                'realEstate.hero.badges.updated': 'Updated 2026',
                'realEstate.hero.badges.analytics': 'Market Analytics',
                'realEstate.hero.badges.data': 'Rich Data',
                'realEstate.hero.badges.verified': 'Verified Properties',
                'realEstate.hero.marketOverview': 'Market Overview',
                'realEstate.hero.stats.properties': 'Properties',
                'realEstate.hero.stats.avgPrice': 'Avg. Price',
                'realEstate.hero.stats.marketHealth': 'Market Health',
                'realEstate.search.placeholder': '🔍 Search properties by title, location, neighborhood, features...',
                'realEstate.filters.allTypes': 'All Types',
                'realEstate.filters.forSale': 'For Sale',
                'realEstate.filters.forRent': 'For Rent',
                'realEstate.filters.allPrices': 'All Prices',
                'realEstate.filters.under50m': 'Under ¥50M',
                'realEstate.filters.50m100m': '¥50M - ¥100M',
                'realEstate.filters.100m200m': '¥100M - ¥200M',
                'realEstate.filters.over200m': 'Over ¥200M',
                'realEstate.filters.newest': 'Newest',
                'realEstate.filters.priceLow': 'Price: Low to High',
                'realEstate.filters.priceHigh': 'Price: High to Low',
                'realEstate.filters.size': 'Size',
                'realEstate.filters.walkScore': 'Walk Score',
                'realEstate.view.grid': 'Grid',
                'realEstate.view.list': 'List',

                // Live from Kyoto Page
                'liveKyoto.meta.title': 'Live from Kyoto - Real-time Cameras, Weather & Updates - MrKyoto.com',
                'liveKyoto.meta.description': 'Experience Kyoto in real-time with live cameras and current weather. Watch live streams from Kyoto Station, temples, and gardens.',
                'liveKyoto.hero.title': 'Live from Kyoto 2026',
                'liveKyoto.hero.subtitle': 'Experience Kyoto in real-time with live cameras and current weather from the heart of Japan\'s cultural capital.',
                'liveKyoto.hero.badges.live': 'Live Streams',
                'liveKyoto.hero.badges.weather': 'Real-time Weather',
                'liveKyoto.hero.badges.verified': 'Verified Sources',

                // Common Widget Elements
                'Live from Kyoto': 'Live from Kyoto',
                'Real-time cameras, weather & social updates': 'Real-time cameras, weather & social updates',
                'Kyoto Weather': 'Kyoto Weather',
                'Social Updates': 'Social Updates',
                'Quick Links': 'Quick Links',
                'Refresh': 'Refresh',
                'Search': 'Search',
                'Grid': 'Grid',
                'List': 'List',
                'View Details': 'View Details',
                'Read Full Article': 'Read Full Article',
                'Book Now': 'Book Now',
                'Subscribe': 'Subscribe',
                'Featured': 'Featured',
                'Premium': 'Premium',
                'Verified': 'Verified',
                'Live': 'Live',
                'Loading...': 'Loading...',
                'No results found': 'No results found',
                'Error loading data': 'Error loading data',
                'Data updated': 'Data updated',
                'Success!': 'Success!',
                'Error occurred': 'Error occurred',
                
                // Homepage specific translations
                'homepage.hero.title': 'Your Gateway to Timeless Kyoto',
                'homepage.hero.subtitle': 'Discover the perfect blend of tradition and modernity in Japan\'s cultural heart. From sacred temples to modern living, every corner tells a story.',
                'homepage.hero.exploreProperties': 'Explore Properties',
                'homepage.hero.discoverActivities': 'Discover Activities',
                'homepage.hero.searchPlaceholder': '🔍 Search Kyoto properties, activities, events, news...',
                
                // Featured Properties Section
                'featured.title': 'Buy Your Dream Kyoto Machiya',
                'featured.viewAll': 'View All Properties',
                'featured.properties': 'Properties',
                'featured.activities': 'Activities',
                'featured.events': 'Events',
                
                // Property Card Elements
                'property.forSale': 'For Sale',
                'property.forRent': 'For Rent',
                'property.viewDetails': 'View Details',
                'property.contact': 'Contact',
                'property.bed': 'Bed',
                'property.bath': 'Bath',
                'property.sqm': 'sqm',
                'property.sqft': 'sqft',
                'property.walkScore': 'Walk',
                'property.verified': 'Verified',
                'property.features': 'Features:',
                'property.moreFeatures': 'more',
                'property.listedBy': 'Listed by:',
                'property.id': 'ID:',
                
                // Explore Kyoto Section
                'explore.title': '🗺️ Explore Kyoto 2025',
                'explore.subtitle': 'Discover the many facets of Japan\'s cultural capital with our comprehensive guides, authentic experiences, and rich cultural heritage.',
                'explore.activities.title': 'Top Activities',
                'explore.activities.subtitle': 'Cultural experiences and authentic adventures',
                'explore.buyHouse.title': 'Buy House',
                'explore.buyHouse.subtitle': 'Premium properties in Kyoto\'s finest neighborhoods',
                'explore.rentHouse.title': 'Rent House',
                'explore.rentHouse.subtitle': 'Flexible accommodation options for your stay',
                'explore.traditionalArts': '🏮\nTraditional Arts',
                'explore.traditionalArtsDesc': 'Tea ceremony, calligraphy, and more',
                'explore.templesShrines': '⛩️\nTemples & Shrines',
                'explore.templesShrinesDesc': 'Sacred sites and spiritual heritage',
                'explore.culturalExperiences': '🎎\nCultural Experiences',
                'explore.culturalExperiencesDesc': 'Hands-on workshops and activities',
                
                // Culture Section
                'culture.traditions.title': 'Traditional Arts',
                'culture.traditions.subtitle': 'Tea ceremony, calligraphy, and more',
                'culture.temples.title': 'Temples & Shrines',
                'culture.temples.subtitle': 'Sacred sites and spiritual heritage',
                'culture.experiences.title': 'Cultural Experiences',
                'culture.experiences.subtitle': 'Hands-on workshops and activities',
                
                // Live from Kyoto Widget
                'liveWidget.title': 'Live from Kyoto',
                'liveWidget.subtitle': 'Real-time cameras, weather & social updates',
                'liveWidget.weather.title': 'Kyoto Weather',
                'liveWidget.weather.loading': 'Loading weather...',
                'liveWidget.weather.feelsLike': 'Feels like',
                'liveWidget.weather.wind': 'Wind',
                'liveWidget.weather.humidity': 'Humidity',
                'liveWidget.weather.visibility': 'Visibility',
                'liveWidget.weather.pressure': 'Pressure',
                'liveWidget.weather.sunrise': 'Sunrise',
                'liveWidget.weather.sunset': 'Sunset',
                'liveWidget.weather.lastUpdated': 'Time in Kyoto',
                
                // Footer
                'footer.about': 'About MrKyoto',
                'footer.aboutDesc': 'Your gateway to timeless Kyoto - connecting you with the best of Japan\'s cultural capital.',
                'footer.explore': 'Explore',
                'footer.activities': 'Activities',
                'footer.events': 'Events & Festivals',
                'footer.news': 'News',
                'footer.liveFromKyoto': 'Live from Kyoto',
                'footer.realEstate': 'Real Estate',
                'footer.propertyListings': 'Property Listings',
                'footer.localAreas': 'Local Areas',
                'footer.marketInsights': 'Market Insights',
                'footer.neighborhoodGuide': 'Neighborhood Guide',
                'footer.connect': 'Connect',
                'footer.contact': 'Contact',
                'footer.legal': 'Legal',
                'footer.terms': 'Terms of Service',
                'footer.privacy': 'Privacy Policy',
                'footer.copyright': '© 2025 MrKyoto.com. All rights reserved. Your gateway to timeless Kyoto.',
                
                // Contact Section
                'contact.title': 'Contact Us',
                'contact.subtitle': 'Get in touch with our team',
                'contact.email': 'Email',
                'contact.phone': 'Phone',
                'contact.address': 'Address',
                'contact.sendMessage': 'Send Message',
                'contact.contactUs': 'Contact Us',
                'contact.arrow': '→'
            },
            ja: {
                // Meta
                'meta.title': 'MrKyoto.com | 永遠の京都へのゲートウェイ - 不動産、イベント、文化的体験',
                'meta.description': '京都の最高のものを発見 - 伝統的な寺院や文化イベントからプレミアム不動産、地域の洞察まで。日本の歴史的文化首都で探検し、暮らし、つながるための完全ガイド。',
                
                // Navigation
                'nav.brand': 'MrKyoto',
                'nav.home': 'ホーム',
                'nav.realEstate': '不動産',
                'nav.activities': 'アクティビティ',
                'nav.events': 'イベント',
                'nav.news': 'ニュース',
                'nav.culture': '文化',
                'nav.about': '会社概要',
                'nav.contact': 'お問い合わせ',
                'nav.buyHouse': '家を買う',
                'nav.rentHouse': '家を借りる',
                'nav.language': '言語',
                'nav.theme': 'テーマ',
                'nav.liveFromKyoto': '京都ライブ',

                // Hero Section
                'hero.title': '永遠の京都へのゲートウェイ',
                'hero.subtitle': '日本の文化首都で伝統と現代の完璧な調和を発見。神聖な寺院から現代的な生活まで、すべての角が物語を語っています。',
                'hero.exploreProperties': '物件を探す',
                'hero.discoverActivities': 'アクティビティを発見',
                'hero.search.placeholder': '🔍 京都の物件、アクティビティ、イベント、ニュースを検索...',
                'hero.stats.properties': '物件',
                'hero.stats.activities': 'アクティビティ',
                'hero.stats.events': 'イベント',

                // About Section
                'about.sectionTitle': '京都への扉',
                'about.welcome': 'MrKyoto.comへようこそ。日本で最も美しい都市への包括的なガイドです。訪問を計画している方、ここに住みたい方、または単に京都の豊かな文化遺産を探求したい方に、古代の伝統と現代の利便性の完璧な調和を発見するお手伝いをします。',
                'about.culturalHeritage.title': '文化遺産',
                'about.culturalHeritage.description': '1,600以上の仏教寺院、400の神社、そして無数の伝統庭園を探索し、京都を日本の文化の生きた博物館にしています。',
                'about.realEstate.title': '不動産',
                'about.realEstate.description': '伝統的な町家からモダンなアパートまで、京都の最も望ましい地域で完璧な家を見つけましょう。',
                'about.localExperiences.title': '地域体験',
                'about.localExperiences.description': '茶道から伝統的な祭り、季節の祝祭まで、本格的な文化的体験に没頭しましょう。',

                // Quick Actions
                'quick.realEstate': '🏠 不動産',
                'quick.activities': '🎯 アクティビティ',
                'quick.events': '🎭 イベント',
                'quick.news': '📰 ニュース',

                // Featured Properties
                'featured.sectionTitle': '精選物件',
                'featured.title': '🏠 おすすめ物件',
                'featured.description': '京都の最も望ましい地域で卓越した家を発見。伝統的な町家からモダンなアパートまで、完璧な京都の住まいを見つけましょう。',
                'featured.loading': '物件を読み込み中...',
                'featured.browseAll': 'すべての物件を閲覧',
                'featured.featured': 'おすすめ',
                'featured.premium': 'プレミアム',

                // Explore Section
                'explore.sectionTitle': '探索',
                'explore.description': '日本の文化首都で伝統と現代の完璧な調和を発見。神聖な寺院から現代的な生活まで、すべての角が物語を語っています。',
                'explore.topActivities.title': 'トップアクティビティ',
                'explore.topActivities.description': '京都の最も神聖な寺院と本格的な文化的体験を発見。',
                'explore.eventTickets.title': 'イベントチケット',
                'explore.eventTickets.description': '伝統的な祭りと文化的パフォーマンスのチケットを予約。',
                'explore.localNews.title': '地域ニュース',
                'explore.localNews.description': '最新の出来事と文化的発展について最新情報を入手。',
                'explore.cultureTraditions.title': '文化と伝統',
                'explore.cultureTraditions.description': '京都の豊かな文化遺産と伝統に没頭しましょう。',

                // Contact Section
                'contact.sectionTitle': 'お問い合わせ',
                'contact.description': '京都について質問がありますか？お聞かせください。完璧な京都体験を発見するお手伝いをします。',
                'contact.form.name': '名前',
                'contact.form.email': 'メールアドレス',
                'contact.form.message': 'メッセージ',
                'contact.form.send': 'メッセージを送信',
                'contact.services.title': '私たちのサービス',
                'contact.services.expertGuidance.title': '専門ガイダンス',
                'contact.services.expertGuidance.description': '最高の京都体験のための地域の洞察と専門家の推奨事項。',
                'contact.services.trustedListings.title': '信頼できる物件',
                'contact.services.trustedListings.description': '厳選された不動産物件と検証済みの物件情報。',
                'contact.services.culturalExperiences.title': '文化的体験',
                'contact.services.culturalExperiences.description': '本格的な文化的体験と伝統的な活動。',
                
                // Activities Page - Missing translations
                'activities.hero.title': '京都アクティビティ・体験 2026',
                'activities.hero.subtitle': '古代寺院から現代の文化的冒険まで、京都の最も象徴的で本格的なアクティビティを発見しましょう。',
                'activities.featured.sectionTitle': 'トップアクティビティと必見アトラクション',
                'activities.section.availableActivities': '利用可能なアクティビティ',
                'liveKyoto.title': '京都ライブ',
                
                // Activity titles and descriptions
                'activity.goldenPavilion.title': '金閣寺ツアー',
                'activity.goldenPavilion.description': '金箔で覆われた象徴的な金閣寺（金閣）を訪れ、美しい庭園と反射池に囲まれたユネスコ世界遺産を体験してください。',
                'activity.fushimiInari.title': '伏見稲荷大社',
                'activity.fushimiInari.description': '伏見稲荷大社の有名な赤い鳥居を探索し、山道をハイキングして神道の伝統について学びましょう。',
                'activity.arashiyamaBamboo.title': '嵐山竹林',
                'activity.arashiyamaBamboo.description': '嵐山の魅惑的な竹林を歩き、天龍寺を訪れ、この歴史的な地域の平和な雰囲気を体験しましょう。',
                'activity.gionDistrict.title': '祇園地区',
                'activity.gionDistrict.description': '祇園の歴史的な芸者地区を発見し、伝統的な通りを歩き、京都の伝統的なエンターテイメント文化について学びましょう。',
                'activity.teaCeremony.title': '茶道体験',
                'activity.teaCeremony.description': '歴史的な茶室で伝統的な日本茶道を体験し、茶文化について学び、抹茶と伝統的なお菓子を楽しみましょう。',
                'activity.kyotoFoodTour.title': '京都フードツアー',
                'activity.kyotoFoodTour.description': '地元の市場、伝統的なレストランを訪れ、本格的な日本料理をサンプリングして京都の料理シーンを探索しましょう。',
                'activity.kimonoDressing.title': '着物着付け体験',
                'activity.kimonoDressing.description': '美しい着物を着て、歴史的な場所で写真を撮り、着物の作法について学んで伝統的な日本文化を体験しましょう。',
                'activity.kyotoCycling.title': '京都サイクリングツアー',
                'activity.kyotoCycling.description': '自転車で京都の隠れた名所と歴史的スポットを探索し、より多くの場所をカバーしながら美しい街の景色を楽しみましょう。',
                'activity.zenMeditation.title': '禅瞑想',
                'activity.zenMeditation.description': '伝統的な寺院で本格的な禅瞑想を体験し、瞑想の技法を学び、静寂な環境で内なる平安を見つけましょう。',
                'activity.kiyomizuTemple.title': '清水寺',
                'activity.kiyomizuTemple.description': '京都の美しい景色を一望できる有名な木造寺院複合施設を訪れ、山腹から突き出した「舞台」で知られる寺院を体験しましょう。',
                'activity.nijoCastle.title': '二条城',
                'activity.nijoCastle.description': '「鶯張り」の床と美しい庭園を持つ歴史ある城を探索し、かつて徳川将軍の住居だった場所を体験しましょう。',
                'activity.sakeBrewery.title': '酒蔵ツアー',
                'activity.sakeBrewery.description': '伏見地区の伝統的な酒蔵を訪れ、日本酒の製造について学び、プレミアム日本酒の試飲を楽しみましょう。',
                'activity.kyotoPottery.title': '京都陶芸ワークショップ',
                'activity.kyotoPottery.description': '職人から伝統的な日本陶芸技法を学び、持ち帰るための自分の陶器作品を作りましょう。',
                'activity.kyotoNightPhotography.title': '京都夜景撮影',
                'activity.kyotoNightPhotography.description': 'プロの写真撮影ガイダンスと独占的な場所へのアクセスで、夜の京都の魔法のような雰囲気を撮影しましょう。',
                
                // Activity badges and buttons
                'activities.featured': 'おすすめ',
                'activities.bookNow': '今すぐ予約',
                'activities.details': '詳細',
                'activities.stats.total': '総アクティビティ数',
                'activities.stats.categories': 'アクティビティカテゴリ',
                'activities.stats.rating': '平均評価',
                'activities.stats.featured': 'おすすめアクティビティ',

                // Footer
                'footer.brand': 'MrKyoto',
                'footer.tagline': '永遠の京都へのゲートウェイ — 日本の文化首都の中心で探検し、暮らし、つながりましょう。',
                'footer.explore.title': '探す',
                'footer.explore.activities': 'トップアクティビティ',
                'footer.explore.culture': '文化と伝統',
                'footer.explore.events': 'イベントと祭り',
                'footer.explore.news': '地域ニュース',
                'footer.realEstate.title': '不動産',
                'footer.realEstate.buy': '家を買う',
                'footer.realEstate.rent': '家を借りる',
                'footer.realEstate.listings': '物件一覧',
                'footer.realEstate.areas': '地域',
                'footer.connect.title': 'つながる',
                'footer.connect.privacy': 'プライバシーポリシー',
                'footer.connect.terms': '利用規約',
                'footer.copyright': '© 2025 MrKyoto.com. All rights reserved. Your gateway to timeless Kyoto.',
                'footer.copyright': '© 2025 MrKyoto.com. All rights reserved. 永遠の京都へのゲートウェイ。',

                // Live Kyoto Page
                'liveKyoto.meta.title': '京都ライブ - リアルタイムカメラ、天気、更新情報 - MrKyoto.com',
                'liveKyoto.meta.description': 'ライブカメラと現在の天気で京都をリアルタイムで体験。京都駅、寺院、庭園からのライブストリームをご覧ください。',
                'liveKyoto.hero.title': '京都ライブ 2026',
                'liveKyoto.hero.subtitle': 'ライブカメラと現在の天気で日本の文化首都の中心から京都をリアルタイムで体験。',
                'liveKyoto.hero.badges.live': 'ライブストリーム',
                'liveKyoto.hero.badges.weather': 'リアルタイム天気',
                'liveKyoto.hero.badges.verified': '検証済みソース',

                // Live Kyoto Weather Widget
                'liveKyoto.weather.title': '京都の天気',
                'liveKyoto.weather.live': 'ライブ',
                'liveKyoto.weather.loading': '天気を読み込み中...',
                'liveKyoto.weather.feelsLike': '体感温度',
                'liveKyoto.weather.wind': '風',
                'liveKyoto.weather.humidity': '湿度',
                'liveKyoto.weather.visibility': '視界',
                'liveKyoto.weather.pressure': '気圧',
                'liveKyoto.weather.sunrise': '日の出',
                'liveKyoto.weather.sunset': '日の入り',
                'liveKyoto.weather.lastUpdated': '最終更新',

                // Real Estate Page
                'realEstate.meta.title': '京都不動産 | 京都の家を買う・借りる | 物件一覧 | MrKyoto.com',
                'realEstate.meta.description': '京都のプレミアム不動産を発見。祇園、嵐山、東山などの高級エリアで販売・賃貸物件を閲覧。日本の文化首都での不動産購入・賃貸の専門ガイダンス。',
                'realEstate.hero.title': '京都不動産 2026',
                'realEstate.hero.subtitle': '日本の文化首都でプレミアム物件を発見',
                'realEstate.hero.badges.updated': '2026年更新',
                'realEstate.hero.badges.analytics': '市場分析',
                'realEstate.hero.badges.data': '豊富なデータ',
                'realEstate.hero.badges.verified': '検証済み物件',
                'realEstate.hero.marketOverview': '市場概要',
                'realEstate.hero.stats.properties': '物件数',
                'realEstate.hero.stats.avgPrice': '平均価格',
                'realEstate.hero.stats.marketHealth': '市場健全性',
                'realEstate.search.placeholder': '🔍 タイトル、場所、地域、特徴で物件を検索...',
                'realEstate.filters.allTypes': 'すべてのタイプ',
                'realEstate.filters.forSale': '販売',
                'realEstate.filters.forRent': '賃貸',
                'realEstate.filters.allPrices': 'すべての価格',
                'realEstate.filters.under50m': '5,000万円未満',
                'realEstate.filters.50m100m': '5,000万円 - 1億円',
                'realEstate.filters.100m200m': '1億円 - 2億円',
                'realEstate.filters.over200m': '2億円以上',
                'realEstate.filters.newest': '最新',
                'realEstate.filters.priceLow': '価格：安い順',
                'realEstate.filters.priceHigh': '価格：高い順',
                'realEstate.filters.size': 'サイズ',
                'realEstate.filters.walkScore': 'ウォークスコア',
                'realEstate.view.grid': 'グリッド',
                'realEstate.view.list': 'リスト',
                
                // Real Estate Page - Additional Sections
                'realEstate.section.availableProperties': '利用可能な物件',
                'realEstate.section.forSale': '売り出し中',
                'realEstate.section.forRent': '賃貸中',
                'realEstate.actions.clearFilters': 'フィルターをクリア',
                'realEstate.actions.saveSearch': '検索を保存',
                'realEstate.signup.title': '京都不動産の最新情報を入手',
                'realEstate.signup.subtitle': '京都の物件リスト、市場動向、投資機会に関する独占的な更新情報を入手してください。日本文化首都で完璧な家を見つけましょう。',
                'realEstate.signup.form.name': '氏名',
                'realEstate.signup.form.email': 'メールアドレス',
                'realEstate.signup.form.phone': '電話番号（任意）',
                'realEstate.signup.form.propertyType': '物件タイプの興味',
                'realEstate.signup.form.budget': '予算範囲',
                'realEstate.signup.form.location': '希望する場所',
                'realEstate.signup.form.subscribe': '更新を購読',
                'realEstate.signup.form.submit': '不動産更新を購読',
                'realEstate.signup.form.agreement': '購読することで、京都不動産に関する更新情報の受信に同意します。私たちはあなたのプライバシーを尊重し、あなたの情報を共有することは決してありません。',

                // Legal Pages - Terms of Service
                'terms.meta.title': '利用規約 - MrKyoto.com',
                'terms.meta.description': 'MrKyoto.comサービスの利用規約と条件。',
                'terms.hero.title': '利用規約',
                'terms.hero.subtitle': 'サービスをご利用になる前に、これらの利用規約を注意深くお読みください。',
                'terms.section.lastUpdated': '最終更新: 2025年1月',
                'terms.section.acceptance': '利用規約の承諾',
                'terms.section.acceptance.desc': 'MrKyoto.comにアクセスし利用することで、この契約の条項に拘束されることに同意し、承諾します。',
                'terms.section.use': '使用ライセンス',
                'terms.section.use.desc': 'MrKyoto.comの資料（情報またはソフトウェア）のコピーを1つ、個人的で非商業的な一時的な閲覧のみのために一時的にダウンロードする許可が与えられます。',
                'terms.section.restrictions': '制限事項',
                'terms.section.restrictions.desc': '以下のすべての行為が特に制限されています：資料の修正または複製、資料を商業目的または公衆展示に使用、MrKyoto.comに含まれるソフトウェアのリバースエンジニアリングを試行。',
                'terms.section.disclaimer': '免責事項',
                'terms.section.disclaimer.desc': 'MrKyoto.comの資料は「現状のまま」提供されます。MrKyoto.comは明示または暗示の保証を行わず、商品性、特定目的への適合性、知的財産権の侵害またはその他の権利侵害を含むがこれらに限定されない、その他のすべての保証を否認します。',
                'terms.section.limitations': '制限',
                'terms.section.limitations.desc': 'MrKyoto.comまたはその供給者は、MrKyoto.comの資料の使用または使用不能に起因する損害（データまたは利益の損失、または事業中断による損害を含むがこれらに限定されない）について一切責任を負いません。',
                'terms.section.accuracy': '資料の正確性',
                'terms.section.accuracy.desc': 'MrKyoto.comに表示される資料には技術的、タイプミス、または写真のエラーが含まれる可能性があります。MrKyoto.comは、ウェブサイト上の資料が正確、完全、または最新であることを保証しません。',
                'terms.section.links': 'リンク',
                'terms.section.links.desc': 'MrKyoto.comは、ウェブサイトにリンクされているすべてのサイトをレビューしておらず、そのようなリンクされたサイトの内容について責任を負いません。リンクの包含は、MrKyoto.comによるサイトの推奨を意味するものではありません。',
                'terms.section.modifications': '修正',
                'terms.section.modifications.desc': 'MrKyoto.comは、事前の通知なしに、いつでもウェブサイトのこれらの利用規約を改訂する場合があります。このウェブサイトを使用することで、これらの利用規約の現在のバージョンに拘束されることに同意します。',
                'terms.section.contact': 'お問い合わせ',
                'terms.section.contact.desc': 'これらの利用規約についてご質問がございましたら、hello@mrkyoto.comまでお問い合わせください。',

                // Legal Pages - Privacy Policy
                'privacy.meta.title': 'プライバシーポリシー - MrKyoto.com',
                'privacy.meta.description': 'MrKyoto.comユーザーのプライバシーポリシーとデータ保護情報。',
                'privacy.hero.title': 'プライバシーポリシー',
                'privacy.hero.subtitle': 'このプライバシーポリシーは、MrKyoto.comがお客様の情報をどのように収集、使用、保護するかを説明しています。',
                'privacy.section.lastUpdated': '最終更新: 2025年1月',
                'privacy.section.collection': '収集する情報',
                'privacy.section.collection.desc': 'アカウント作成、ニュースレター購読、サポートへのお問い合わせなど、お客様が直接提供する情報を収集します。',
                'privacy.section.usage': '情報の使用方法',
                'privacy.section.usage.desc': '収集した情報を使用して、サービスの提供、維持、改善、お客様とのコミュニケーション、新機能の開発を行います。',
                'privacy.section.sharing': '情報の共有',
                'privacy.section.sharing.desc': 'お客様の同意なしに、このポリシーで説明されている場合を除き、個人情報を第三者に販売、取引、またはその他の方法で転送することはありません。',
                'privacy.section.security': 'データセキュリティ',
                'privacy.section.security.desc': 'お客様の個人情報を不正アクセス、改ざん、開示、または破壊から保護するため、適切なセキュリティ対策を実施しています。',
                'privacy.section.cookies': 'クッキーとトラッキング',
                'privacy.section.cookies.desc': 'ウェブサイトでのお客様の体験を向上させ、使用パターンを分析するために、クッキーと類似のトラッキング技術を使用しています。',
                'privacy.section.rights': 'お客様の権利',
                'privacy.section.rights.desc': 'お客様には、個人情報にアクセス、修正、または削除する権利があります。また、当社からの特定の通信をオプトアウトすることもできます。',
                'privacy.section.changes': 'このポリシーの変更',
                'privacy.section.changes.desc': 'このプライバシーポリシーを随時更新する場合があります。このページに新しいポリシーを投稿することで、変更をお知らせします。',
                'privacy.section.contact': 'お問い合わせ',
                'privacy.section.contact.desc': 'このプライバシーポリシーについてご質問がございましたら、hello@mrkyoto.comまでお問い合わせください。',

                // Property Cards
                'property.viewDetails': '詳細を見る',
                'property.contact': 'お問い合わせ',
                'property.favorite': 'お気に入り',
                'property.bed': 'ベッド',
                'property.bath': 'バス',
                'property.sqft': '平方フィート',
                'property.walkScore': 'ウォークスコア',

                // Common Actions
                'action.search': '検索',
                'action.loadMore': 'もっと見る',
                'action.viewAll': 'すべて見る',
                'action.back': '戻る',
                'action.next': '次へ',
                'action.previous': '前へ',
                'action.close': '閉じる',
                'action.save': '保存',
                'action.cancel': 'キャンセル',
                'action.edit': '編集',
                'action.delete': '削除',

                // Messages
                'message.loading': '読み込み中...',
                'message.noResults': '結果が見つかりません',
                'message.error': 'エラーが発生しました',
                'message.success': '成功！',
                'message.languageChanged': '言語が変更されました：',

                // Events Page
                'events.meta.title': '京都イベント・祭り | 伝統儀式・文化祝祭 | MrKyoto.com',
                'events.meta.description': '京都の活気ある文化カレンダーを体験。伝統的な祭り、季節の祝祭、現代のイベント。祇園祭から桜見物まで、本格的な日本の文化的体験を発見。',
                'events.hero.title': '京都イベント・祭り 2026',
                'events.hero.subtitle': '伝統的な祭り、季節の祝祭、現代のイベントで京都の活気ある文化カレンダーを体験。',
                'events.hero.badges.updated': '2026年更新',
                'events.hero.badges.cultural': '文化イベント',
                'events.hero.badges.festivals': '伝統祭り',
                'events.hero.badges.verified': '認証済みイベント',
                'events.search.placeholder': '🔍 名前・カテゴリ・日付・場所でイベントを検索...',
                'events.filters.allCategories': 'すべてのカテゴリ',
                'events.filters.traditional': '伝統',
                'events.filters.cultural': '文化',
                'events.filters.seasonal': '季節',
                'events.filters.modern': '現代',
                'events.filters.religious': '宗教',
                'events.filters.allMonths': 'すべての月',
                'events.filters.january': '1月',
                'events.filters.february': '2月',
                'events.filters.march': '3月',
                'events.filters.april': '4月',
                'events.filters.may': '5月',
                'events.filters.june': '6月',
                'events.filters.july': '7月',
                'events.filters.august': '8月',
                'events.filters.september': '9月',
                'events.filters.october': '10月',
                'events.filters.november': '11月',
                'events.filters.december': '12月',
                'events.filters.date': '日付',
                'events.filters.mostPopular': '人気順',
                'events.filters.nameAZ': '名前順',
                'events.filters.category': 'カテゴリ',
                'events.filters.grid': 'グリッド',
                'events.filters.list': 'リスト',
                'events.section.availableEvents': '利用可能なイベント',
                'events.loading.text': 'イベントと祭りデータを読み込み中...',
                'events.noResults.title': 'イベントが見つかりません',
                'events.noResults.description': '検索条件やフィルターを調整してみてください。',
                'events.modal.bookTickets': 'チケットを予約',
                'events.modal.learnMore': '詳細を見る',
                'events.modal.details': '詳細',
                'events.modal.close': '閉じる',
                'events.notification.dataUpdated': 'イベントデータが更新されました',
                
                // Events Page - Hero Section
                'events.hero.liveEvents': 'ライブイベント',
                'events.hero.title': '京都イベントと祭り',
                'events.hero.subtitle': '日本で最も権威のある文化的祝祭と現代イベントを体験してください。',
                'events.hero.traditionalFestivals': '伝統的な祭り',
                'events.hero.seasonalCelebrations': '季節の祝祭',
                'events.hero.allEvents': 'すべてのイベント',
                'events.hero.searchEvents': 'イベントを検索',
                
                // Events Page - Stats Section
                'events.stats.overview': 'イベント概要',
                'events.stats.events': 'イベント',
                'events.stats.thisMonth': '今月',
                'events.stats.categories': 'カテゴリ',
                'events.stats.upcoming': '今後の予定',
                'events.stats.live': 'ライブ',
                
                // Events Page - Search and Filters
                'events.search.placeholder': '🔍 名前、カテゴリ、日付、場所でイベントを検索...',
                'events.search.search': '検索',
                'events.filters.allCategories': 'すべてのカテゴリ',
                'events.filters.traditional': '伝統',
                'events.filters.cultural': '文化',
                'events.filters.seasonal': '季節',
                'events.filters.modern': '現代',
                'events.filters.religious': '宗教',
                'events.filters.allMonths': 'すべての月',
                'events.filters.january': '1月',
                'events.filters.february': '2月',
                'events.filters.march': '3月',
                'events.filters.april': '4月',
                'events.filters.may': '5月',
                'events.filters.june': '6月',
                'events.filters.july': '7月',
                'events.filters.august': '8月',
                'events.filters.september': '9月',
                'events.filters.october': '10月',
                'events.filters.november': '11月',
                'events.filters.december': '12月',
                'events.filters.date': '日付',
                'events.filters.mostPopular': '人気順',
                'events.filters.nameAZ': '名前順',
                'events.filters.category': 'カテゴリ',
                'events.filters.grid': 'グリッド',
                'events.filters.list': 'リスト',
                'events.section.availableEvents': '利用可能なイベント',
                'events.loading.text': 'イベントと祭りデータを読み込み中...',
                'events.noResults.title': 'イベントが見つかりません',
                'events.noResults.description': '検索条件やフィルターを調整してみてください。',
                'events.modal.bookTickets': 'チケットを予約',
                'events.modal.learnMore': '詳細を見る',
                'events.modal.details': '詳細',
                'events.modal.close': '閉じる',

                // News Page
                'news.meta.title': '京都リアルタイムニュースハブ | 京都・日本からのライブニュース | MrKyoto.com',
                'news.meta.description': '京都と日本からのリアルタイムニュース更新を入手。認証済みニュースソースからの最新の速報、文化イベント、発展について最新情報を入手。',
                'news.hero.title': '京都リアルタイムニュースハブ',
                'news.hero.subtitle': '京都と日本からのリアルタイムニュース更新で最新情報を入手。',
                'news.hero.badges.updated': '2026年更新',
                'news.hero.badges.verified': '認証済みソース',
                'news.hero.badges.live': 'ライブ更新',
                'news.search.placeholder': '🔍 タイトル・カテゴリ・ソース・日付でニュースを検索...',
                'news.filters.allCategories': 'すべてのカテゴリ',
                'news.filters.culture': '文化',
                'news.filters.tourism': '観光',
                'news.filters.events': 'イベント',
                'news.filters.business': 'ビジネス',
                'news.filters.weather': '天気',
                'news.filters.allSources': 'すべてのソース',
                'news.filters.kyotoTimes': '京都タイムズ',
                'news.filters.japanNews': '日本ニュース',
                'news.filters.localNews': '地域ニュース',
                'news.filters.international': '国際',
                'news.filters.newest': '最新',
                'news.filters.oldest': '最古',
                'news.filters.mostPopular': '人気順',
                'news.filters.trending': 'トレンド',
                'news.filters.grid': 'グリッド',
                'news.filters.list': 'リスト',
                'news.section.availableNews': '利用可能なニュース',
                'news.loading.text': 'ニュースと更新を読み込み中...',
                'news.noResults.title': 'ニュースが見つかりません',
                'news.noResults.description': '検索条件やフィルターを調整してみてください。',
                'news.modal.readFull': '全文を読む',
                'news.modal.share': '共有',
                'news.modal.favorite': 'お気に入り',
                'news.modal.close': '閉じる',
                'news.notification.dataUpdated': 'ニュースデータが更新されました',
                
                // News Page - Hero Section
                'news.hero.liveUpdates': 'ライブ更新',
                'news.hero.title': '京都リアルタイムニュースハブ',
                'news.hero.subtitle': '京都と日本からのリアルタイムニュース更新で情報を入手してください。',
                'news.hero.verifiedSources': '検証済みソース',
                'news.hero.instantUpdates': '即座の更新',
                'news.hero.latestNews': '最新ニュース',
                'news.hero.searchNews': 'ニュース検索',
                
                // News Page - Stats Section
                'news.stats.overview': 'ライブニュース概要',
                'news.stats.articles': '記事',
                'news.stats.today': '今日',
                'news.stats.sources': 'ソース',
                'news.stats.status': 'ステータス',
                'news.stats.live': 'ライブ',
                
                // News Page - Search and Filters
                'news.search.placeholder': '🔍 タイトル、カテゴリ、ソース、日付でニュースを検索...',
                'news.search.search': '検索',
                'news.filters.allCategories': 'すべてのカテゴリ',
                'news.filters.culture': '文化',
                'news.filters.tourism': '観光',
                'news.filters.events': 'イベント',
                'news.filters.business': 'ビジネス',
                'news.filters.weather': '天気',
                'news.filters.allSources': 'すべてのソース',
                'news.filters.kyotoTimes': '京都タイムズ',
                'news.filters.japanNews': '日本ニュース',
                'news.filters.localNews': 'ローカルニュース',
                'news.filters.international': '国際',
                'news.filters.newest': '最新',
                'news.filters.oldest': '最古',
                'news.filters.mostPopular': '人気順',
                'news.filters.trending': 'トレンド',
                'news.filters.grid': 'グリッド',
                'news.filters.list': 'リスト',
                'news.section.availableNews': '利用可能なニュース',
                'news.loading.text': 'ニュースと更新を読み込み中...',
                'news.noResults.title': 'ニュースが見つかりません',
                'news.noResults.description': '検索条件やフィルターを調整してみてください。',
                'news.modal.readFull': '全文を読む',
                'news.modal.share': '共有',
                'news.modal.favorite': 'お気に入り',
                'news.modal.close': '閉じる',

                // Common Widget Elements
                'Live from Kyoto': '京都ライブ',
                'Real-time cameras, weather & social updates': 'リアルタイムカメラ、天気、ソーシャル更新',
                'Kyoto Weather': '京都の天気',
                'Social Updates': 'ソーシャル更新',
                'Quick Links': 'クイックリンク',
                'Refresh': '更新',
                'Search': '検索',
                'Grid': 'グリッド',
                'List': 'リスト',
                'View Details': '詳細を見る',
                'Read Full Article': '全文を読む',
                'Book Now': '今すぐ予約',
                'Subscribe': '購読',
                'Featured': 'おすすめ',
                'Premium': 'プレミアム',
                'Verified': '認証済み',
                'Live': 'ライブ',
                'Loading...': '読み込み中...',
                'No results found': '結果が見つかりません',
                'Error loading data': 'データ読み込みエラー',
                'Data updated': 'データが更新されました',
                'Success!': '成功！',
                'Error occurred': 'エラーが発生しました',
                
                // Homepage specific translations
                'homepage.hero.title': '永遠の京都へのゲートウェイ',
                'homepage.hero.subtitle': '日本の文化首都で伝統と現代の完璧な調和を発見。神聖な寺院から現代的な生活まで、すべての角が物語を語っています。',
                'homepage.hero.exploreProperties': '物件を探す',
                'homepage.hero.discoverActivities': 'アクティビティを発見',
                'homepage.hero.searchPlaceholder': '🔍 京都の物件、アクティビティ、イベント、ニュースを検索...',
                
                // Featured Properties Section
                'featured.title': '夢の京都町家を購入',
                'featured.viewAll': 'すべての物件を見る',
                'featured.properties': '物件',
                'featured.activities': 'アクティビティ',
                'featured.events': 'イベント',
                
                // Property Card Elements
                'property.forSale': '売り出し中',
                'property.forRent': '賃貸',
                'property.viewDetails': '詳細を見る',
                'property.contact': 'お問い合わせ',
                'property.bed': 'ベッド',
                'property.bath': 'バス',
                'property.sqm': '平方メートル',
                'property.sqft': '平方フィート',
                'property.walkScore': 'ウォーク',
                'property.verified': '認証済み',
                'property.features': '特徴:',
                'property.moreFeatures': 'さらに',
                'property.listedBy': '掲載者:',
                'property.id': 'ID:',
                
                // Explore Kyoto Section
                'explore.title': '🗺️ 京都2025を探索',
                'explore.subtitle': '包括的なガイド、本格的な体験、豊かな文化遺産で日本の文化首都の多様な側面を発見しましょう。',
                'explore.topActivities': '🎯\nトップアクティビティ',
                'explore.topActivitiesDesc': '文化的体験と本格的な冒険',
                'explore.buyHouse': '🏠\n家を買う',
                'explore.buyHouseDesc': '京都最高の地域のプレミアム物件',
                'explore.rentHouse': '🏡\n家を借りる',
                'explore.rentHouseDesc': '滞在のための柔軟な宿泊オプション',
                'explore.traditionalArts': '🏮\n伝統芸術',
                'explore.traditionalArtsDesc': '茶道、書道など',
                'explore.templesShrines': '⛩️\n寺院と神社',
                'explore.templesShrinesDesc': '聖なる場所と精神的な遺産',
                'explore.culturalExperiences': '🎎\n文化的体験',
                'explore.culturalExperiencesDesc': '実践的なワークショップとアクティビティ',
                
                // Culture Section
                'culture.traditions.title': '伝統芸術',
                'culture.traditions.subtitle': '茶道、書道など',
                'culture.temples.title': '寺院と神社',
                'culture.temples.subtitle': '聖なる場所と精神的な遺産',
                'culture.experiences.title': '文化的体験',
                'culture.experiences.subtitle': '実践的なワークショップとアクティビティ',
                
                // Live from Kyoto Widget
                'liveWidget.title': '京都ライブ',
                'liveWidget.subtitle': 'リアルタイムカメラ、天気、ソーシャル更新',
                'liveWidget.weather.title': '京都の天気',
                'liveWidget.weather.loading': '天気を読み込み中...',
                'liveWidget.weather.feelsLike': '体感温度',
                'liveWidget.weather.wind': '風',
                'liveWidget.weather.humidity': '湿度',
                'liveWidget.weather.visibility': '視界',
                'liveWidget.weather.pressure': '気圧',
                'liveWidget.weather.sunrise': '日の出',
                'liveWidget.weather.sunset': '日の入り',
                'liveWidget.weather.lastUpdated': '京都の時間',
                
                // Footer
                'footer.about': 'MrKyotoについて',
                'footer.aboutDesc': '永遠の京都へのゲートウェイ - 日本の文化首都の最高のものとあなたをつなぎます。',
                'footer.explore': '探す',
                'footer.activities': 'アクティビティ',
                'footer.events': 'イベントと祭り',
                'footer.news': 'ニュース',
                'footer.liveFromKyoto': '京都ライブ',
                'footer.realEstate': '不動産',
                'footer.propertyListings': '物件一覧',
                'footer.localAreas': '地域',
                'footer.marketInsights': '市場インサイト',
                'footer.neighborhoodGuide': '地域ガイド',
                'footer.connect': 'つながる',
                'footer.contact': 'お問い合わせ',
                'footer.legal': '法的',
                'footer.terms': '利用規約',
                'footer.privacy': 'プライバシーポリシー',
                'footer.copyright': '© 2025 MrKyoto.com. 全著作権所有。永遠の京都へのゲートウェイ。',
                
                // Contact Section
                'contact.title': 'お問い合わせ',
                'contact.subtitle': '私たちのチームにご連絡ください',
                'contact.email': 'メール',
                'contact.phone': '電話',
                'contact.address': '住所',
                'contact.sendMessage': 'メッセージを送信',
                'contact.contactUs': 'お問い合わせ',
                'contact.arrow': '→'
            },
            ko: {
                // Meta
                'meta.title': 'MrKyoto.com | 영원한 교토로의 관문 - 부동산, 이벤트, 문화적 경험',
                'meta.description': '교토의 최고를 발견하세요 - 전통 사원과 문화 이벤트부터 프리미엄 부동산, 지역 인사이트까지. 일본의 역사적 문화 수도 교토에서 탐험하고, 살고, 연결하는 완전한 가이드.',
                
                // Navigation
                'nav.brand': 'MrKyoto',
                'nav.home': '홈',
                'nav.realEstate': '부동산',
                'nav.activities': '액티비티',
                'nav.events': '이벤트',
                'nav.news': '뉴스',
                'nav.culture': '문화',
                'nav.about': '회사 소개',
                'nav.contact': '연락처',
                'nav.buyHouse': '집 구매',
                'nav.rentHouse': '집 임대',
                'nav.language': '언어',
                'nav.theme': '테마',
                'nav.liveFromKyoto': '교토 라이브',

                // Hero Section
                'hero.title': '영원한 교토로의 관문',
                'hero.subtitle': '일본의 문화 수도에서 전통과 현대의 완벽한 조화를 발견하세요. 신성한 사원부터 현대적인 생활까지, 모든 모퉁이가 이야기를 들려줍니다.',
                'hero.exploreProperties': '부동산 탐험',
                'hero.discoverActivities': '액티비티 발견',
                'hero.search.placeholder': '🔍 교토 부동산, 액티비티, 이벤트, 뉴스 검색...',
                'hero.stats.properties': '부동산',
                'hero.stats.activities': '액티비티',
                'hero.stats.events': '이벤트',

                // About Section
                'about.sectionTitle': '교토로의 문',
                'about.welcome': 'MrKyoto.com에 오신 것을 환영합니다. 일본에서 가장 아름다운 도시에 대한 포괄적인 가이드입니다. 방문을 계획하고 계시거나, 여기에 살고 싶으시거나, 단순히 교토의 풍부한 문화 유산을 탐험하고 싶으시다면, 우리는 고대 전통과 현대적 편의의 완벽한 조화를 발견하는 데 도움을 드릴 것입니다.',
                'about.culturalHeritage.title': '문화 유산',
                'about.culturalHeritage.description': '1,600개 이상의 불교 사원, 400개의 신사, 그리고 수많은 전통 정원을 탐험하여 교토를 일본 문화의 살아있는 박물관으로 만드세요.',
                'about.realEstate.title': '부동산',
                'about.realEstate.description': '전통적인 마치야부터 현대적인 아파트까지, 교토의 가장 바람직한 지역에서 완벽한 집을 찾으세요.',
                'about.localExperiences.title': '지역 경험',
                'about.localExperiences.description': '차 의식부터 전통 축제, 계절 축하까지, 진정한 문화적 경험에 몰입하세요.',

                // Quick Actions
                'quick.realEstate': '🏠 부동산',
                'quick.activities': '🎯 액티비티',
                'quick.events': '🎭 이벤트',
                'quick.news': '📰 뉴스',

                // Featured Properties
                'featured.sectionTitle': '추천 부동산',
                'featured.title': '🏠 추천 부동산',
                'featured.description': '교토의 가장 바람직한 지역에서 탁월한 집을 발견하세요. 전통적인 마치야부터 현대적인 아파트까지, 완벽한 교토 거주지를 찾으세요.',
                'featured.loading': '부동산 로딩 중...',
                'featured.browseAll': '모든 부동산 둘러보기',
                'featured.viewAll': '모든 부동산 보기',
                'featured.featured': '추천',
                'featured.premium': '프리미엄',

                // Explore Section
                'explore.sectionTitle': '탐험',
                'explore.description': '일본의 문화 수도에서 전통과 현대의 완벽한 조화를 발견하세요. 신성한 사원부터 현대적인 생활까지, 모든 모퉁이가 이야기를 들려줍니다.',
                'explore.title': '🗺️ 교토 탐험',
                'explore.subtitle': '포괄적인 가이드로 일본 문화 수도 교토의 다양한 면을 발견하세요.',
                'explore.topActivities.title': '인기 액티비티',
                'explore.topActivities.description': '교토의 가장 신성한 사원과 진정한 문화적 경험을 발견하세요.',
                'explore.eventTickets.title': '이벤트 티켓',
                'explore.eventTickets.description': '전통 축제와 문화 공연을 위한 티켓을 예약하세요.',
                'explore.localNews.title': '지역 뉴스',
                'explore.localNews.description': '최신 소식과 문화적 발전에 대한 최신 정보를 받으세요.',
                'explore.cultureTraditions.title': '문화와 전통',
                'explore.cultureTraditions.description': '교토의 풍부한 문화 유산과 전통에 몰입하세요.',
                'explore.activities.title': '인기 액티비티',
                'explore.activities.subtitle': '문화적 경험과 진정한 모험',
                'explore.buyHouse.title': '집 구매',
                'explore.buyHouse.subtitle': '교토 최고 지역의 프리미엄 부동산',
                'explore.rentHouse.title': '집 임대',
                'explore.rentHouse.subtitle': '체류를 위한 유연한 숙박 옵션',
                'explore.events.title': '이벤트 티켓',
                'explore.events.subtitle': '문화 축제와 전통 축하',

                // Contact Section
                'contact.sectionTitle': '연락처',
                'contact.description': '교토에 대해 질문이 있으신가요? 여러분의 의견을 듣고 완벽한 교토 경험을 발견하는 데 도움을 드리고 싶습니다.',
                'contact.form.name': '이름',
                'contact.form.email': '이메일',
                'contact.form.message': '메시지',
                'contact.form.send': '메시지 보내기',
                'contact.services.title': '우리의 서비스',
                'contact.services.expertGuidance.title': '전문 가이드',
                'contact.services.expertGuidance.description': '최고의 교토 경험을 위한 지역 인사이트와 전문가 추천.',
                'contact.services.trustedListings.title': '신뢰할 수 있는 목록',
                'contact.services.trustedListings.description': '엄선된 부동산 목록과 검증된 부동산 정보.',
                'contact.services.culturalExperiences.title': '문화적 경험',
                'contact.services.culturalExperiences.description': '진정한 문화적 경험과 전통 활동.',
                
                // Activities Page - Missing translations
                'activities.hero.title': '교토 액티비티 및 경험 2026',
                'activities.hero.subtitle': '교토의 가장 상징적이고 진정한 액티비티를 발견하세요',
                'activities.featured.sectionTitle': '인기 액티비티 및 필수 방문지',
                'activities.section.availableActivities': '이용 가능한 액티비티',
                
                // Activity titles and descriptions
                'activity.goldenPavilion.title': '금각사 투어',
                'activity.goldenPavilion.description': '금박으로 덮인 상징적인 금각사(금각)를 방문하여 아름다운 정원과 반영 연못으로 둘러싸인 유네스코 세계유산을 체험하세요.',
                'activity.fushimiInari.title': '후시미 이나리 신사',
                'activity.fushimiInari.description': '후시미 이나리 신사의 유명한 빨간 도리이를 탐험하고, 산길을 하이킹하며 신도 전통에 대해 배우세요.',
                'activity.arashiyamaBamboo.title': '아라시야마 대나무 숲',
                'activity.arashiyamaBamboo.description': '아라시야마의 매혹적인 대나무 숲을 걸으며, 덴류지 사원을 방문하고 이 역사적인 지역의 평화로운 분위기를 체험하세요.',
                'activity.gionDistrict.title': '기온 지구',
                'activity.gionDistrict.description': '기온의 역사적인 게이샤 지구를 발견하고, 전통적인 거리를 걸으며 교토의 전통적인 엔터테인먼트 문화에 대해 배우세요.',
                'activity.teaCeremony.title': '다도 체험',
                'activity.teaCeremony.description': '역사적인 다실에서 전통적인 일본 다도를 체험하고, 차 문화에 대해 배우며 말차와 전통 과자를 즐기세요.',
                'activity.kyotoFoodTour.title': '교토 푸드 투어',
                'activity.kyotoFoodTour.description': '현지 시장, 전통적인 레스토랑을 방문하고 진정한 일본 요리를 샘플링하여 교토의 요리 현장을 탐험하세요.',
                'activity.kimonoDressing.title': '기모노 착용 체험',
                'activity.kimonoDressing.description': '아름다운 기모노를 입고, 역사적인 장소에서 사진을 찍으며, 기모노 예법에 대해 배워 전통적인 일본 문화를 체험하세요.',
                'activity.kyotoCycling.title': '교토 사이클링 투어',
                'activity.kyotoCycling.description': '자전거로 교토의 숨겨진 보석과 역사적인 장소를 탐험하며, 더 많은 장소를 커버하면서 아름다운 도시의 경치를 즐기세요.',
                'activity.zenMeditation.title': '선 명상',
                'activity.zenMeditation.description': '전통적인 사원에서 진정한 선 명상을 체험하고, 명상 기법을 배우며 고요한 환경에서 내면의 평화를 찾으세요.',
                'activity.kiyomizuTemple.title': '기요미즈데라 사원',
                'activity.kiyomizuTemple.description': '교토의 아름다운 경치를 한눈에 볼 수 있는 유명한 목조 사원 단지를 방문하고, 산비탈에서 튀어나온 "무대"로 알려진 사원을 체험하세요.',
                'activity.nijoCastle.title': '니조 성',
                'activity.nijoCastle.description': '"나이팅게일 바닥"과 아름다운 정원을 가진 역사적인 성을 탐험하고, 한때 도쿠가와 쇼군의 거주지였던 곳을 체험하세요.',
                'activity.sakeBrewery.title': '사케 양조장 투어',
                'activity.sakeBrewery.description': '후시미 지구의 전통적인 사케 양조장을 방문하고, 사케 생산에 대해 배우며 프리미엄 사케의 시음을 즐기세요.',
                'activity.kyotoPottery.title': '교토 도자기 워크숍',
                'activity.kyotoPottery.description': '장인으로부터 전통적인 일본 도자기 기법을 배우고, 집으로 가져갈 자신만의 도자기 작품을 만드세요.',
                'activity.kyotoNightPhotography.title': '교토 야경 촬영',
                'activity.kyotoNightPhotography.description': '전문 사진 촬영 가이던스와 독점적인 장소에 대한 접근으로, 밤의 교토의 마법 같은 분위기를 촬영하세요.',
                
                // Activity badges and buttons
                'activities.featured': '추천',
                'activities.bookNow': '지금 예약',
                'activities.details': '상세보기',
                'activities.stats.total': '총 액티비티',
                'activities.stats.categories': '액티비티 카테고리',
                'activities.stats.rating': '평균 평점',
                'activities.stats.featured': '추천 액티비티',
                'liveKyoto.title': '교토 라이브',

                // Footer
                'footer.brand': 'MrKyoto',
                'footer.tagline': '영원한 교토로의 관문 — 일본 문화 수도 교토의 중심에서 탐험하고, 살고, 연결하세요.',
                'footer.explore.title': '탐험',
                'footer.explore.activities': '인기 액티비티',
                'footer.explore.culture': '문화와 전통',
                'footer.explore.events': '이벤트와 축제',
                'footer.explore.news': '지역 뉴스',
                'footer.realEstate.title': '부동산',
                'footer.realEstate.buy': '집 구매',
                'footer.realEstate.rent': '집 임대',
                'footer.realEstate.listings': '부동산 목록',
                'footer.realEstate.areas': '지역',
                'footer.connect.title': '연결',
                'footer.connect.privacy': '개인정보 보호정책',
                'footer.connect.terms': '서비스 약관',
                'footer.copyright': '© 2025 MrKyoto.com. All rights reserved. 영원한 교토로의 관문.',

                // Property Cards
                'property.viewDetails': '상세 보기',
                'property.contact': '연락처',
                'property.favorite': '즐겨찾기',
                'property.bed': '침실',
                'property.bath': '욕실',
                'property.sqft': '평방피트',
                'property.walkScore': '워크 스코어',

                // Common Actions
                'action.search': '검색',
                'action.loadMore': '더 보기',
                'action.viewAll': '모두 보기',
                'action.back': '뒤로',
                'action.next': '다음',
                'action.previous': '이전',
                'action.close': '닫기',
                'action.save': '저장',
                'action.cancel': '취소',
                'action.edit': '편집',
                'action.delete': '삭제',

                // Messages
                'message.loading': '로딩 중...',
                'message.noResults': '결과를 찾을 수 없습니다',
                'message.error': '오류가 발생했습니다',
                'message.success': '성공!',
                'message.languageChanged': '언어가 변경되었습니다:',

                // Real Estate Page
                'realEstate.meta.title': '교토 부동산 | 교토에서 집 구매 및 임대 | 부동산 목록 | MrKyoto.com',
                'realEstate.meta.description': '교토의 프리미엄 부동산을 발견하세요. 기온, 아라시야마, 히가시야마 등의 독점 지역에서 판매 및 임대 주택을 둘러보세요. 일본 문화 수도에서 부동산 구매 및 임대를 위한 전문 가이드.',
                'realEstate.hero.title': '교토 부동산 2026',
                'realEstate.hero.subtitle': '일본 문화 수도에서 프리미엄 부동산을 발견하세요',
                'realEstate.hero.badges.updated': '2026년 업데이트',
                'realEstate.hero.badges.analytics': '시장 분석',
                'realEstate.hero.badges.data': '풍부한 데이터',
                'realEstate.hero.badges.verified': '검증된 부동산',
                'realEstate.hero.marketOverview': '시장 개요',
                'realEstate.hero.stats.properties': '부동산',
                'realEstate.hero.stats.avgPrice': '평균 가격',
                'realEstate.hero.stats.marketHealth': '시장 건강도',
                'realEstate.search.placeholder': '🔍 제목, 위치, 지역, 특징으로 부동산 검색...',
                'realEstate.filters.allTypes': '모든 유형',
                'realEstate.filters.forSale': '판매',
                'realEstate.filters.forRent': '임대',
                'realEstate.filters.allPrices': '모든 가격',
                'realEstate.filters.under50m': '5,000만엔 미만',
                'realEstate.filters.50m100m': '5,000만엔 - 1억엔',
                'realEstate.filters.100m200m': '1억엔 - 2억엔',
                'realEstate.filters.over200m': '2억엔 이상',
                'realEstate.filters.newest': '최신',
                'realEstate.filters.priceLow': '가격: 낮음에서 높음',
                'realEstate.filters.priceHigh': '가격: 높음에서 낮음',
                'realEstate.filters.size': '크기',
                'realEstate.filters.walkScore': '워크 스코어',
                'realEstate.view.grid': '그리드',
                'realEstate.view.list': '목록',
                
                // Real Estate Page - Additional Sections
                'realEstate.section.availableProperties': '사용 가능한 부동산',
                'realEstate.section.forSale': '매매',
                'realEstate.section.forRent': '임대',
                'realEstate.actions.clearFilters': '필터 지우기',
                'realEstate.actions.saveSearch': '검색 저장',
                'realEstate.signup.title': '교토 부동산 업데이트 받기',
                'realEstate.signup.subtitle': '교토의 부동산 목록, 시장 동향, 투자 기회에 대한 독점 업데이트를 받으세요. 일본 문화 수도에서 완벽한 집을 찾으세요.',
                'realEstate.signup.form.name': '전체 이름',
                'realEstate.signup.form.email': '이메일 주소',
                'realEstate.signup.form.phone': '전화번호 (선택사항)',
                'realEstate.signup.form.propertyType': '부동산 유형 관심사',
                'realEstate.signup.form.budget': '예산 범위',
                'realEstate.signup.form.location': '선호 위치',
                'realEstate.signup.form.subscribe': '업데이트 구독',
                'realEstate.signup.form.submit': '부동산 업데이트 구독',
                'realEstate.signup.form.agreement': '구독함으로써 교토 부동산에 대한 업데이트 수신에 동의합니다. 우리는 귀하의 개인정보를 존중하며 귀하의 정보를 공유하지 않습니다.',

                // Legal Pages - Terms of Service
                'terms.meta.title': '이용약관 - MrKyoto.com',
                'terms.meta.description': 'MrKyoto.com 서비스 이용약관 및 조건.',
                'terms.hero.title': '이용약관',
                'terms.hero.subtitle': '서비스를 이용하기 전에 이 이용약관을 주의 깊게 읽어주세요.',
                'terms.section.lastUpdated': '최종 업데이트: 2025년 1월',
                'terms.section.acceptance': '이용약관 동의',
                'terms.section.acceptance.desc': 'MrKyoto.com에 접속하고 이용함으로써, 이 계약의 조항에 구속되는 것에 동의하고 수락합니다.',
                'terms.section.use': '사용 라이선스',
                'terms.section.use.desc': '개인적이고 비상업적인 일시적 보기만을 위해 MrKyoto.com의 자료(정보 또는 소프트웨어) 복사본 하나를 임시로 다운로드할 수 있는 권한이 부여됩니다.',
                'terms.section.restrictions': '제한사항',
                'terms.section.restrictions.desc': '다음과 같은 모든 행위가 특별히 제한됩니다: 자료 수정 또는 복사, 자료를 상업적 목적이나 공개 전시에 사용, MrKyoto.com에 포함된 소프트웨어의 리버스 엔지니어링 시도.',
                'terms.section.disclaimer': '면책조항',
                'terms.section.disclaimer.desc': 'MrKyoto.com의 자료는 "있는 그대로" 제공됩니다. MrKyoto.com은 명시적이거나 암묵적인 보증을 하지 않으며, 상품성, 특정 목적에의 적합성, 지적재산권 침해 또는 기타 권리 침해를 포함하되 이에 국한되지 않는 모든 기타 보증을 부인합니다.',
                'terms.section.limitations': '제한',
                'terms.section.limitations.desc': 'MrKyoto.com 또는 그 공급자는 MrKyoto.com 자료의 사용 또는 사용 불가능으로 인한 손해(데이터 또는 이익 손실, 또는 사업 중단으로 인한 손해를 포함하되 이에 국한되지 않음)에 대해 어떠한 책임도 지지 않습니다.',
                'terms.section.accuracy': '자료의 정확성',
                'terms.section.accuracy.desc': 'MrKyoto.com에 나타나는 자료에는 기술적, 타이포그래피, 또는 사진 오류가 포함될 수 있습니다. MrKyoto.com은 웹사이트의 자료가 정확하고 완전하며 최신이라고 보장하지 않습니다.',
                'terms.section.links': '링크',
                'terms.section.links.desc': 'MrKyoto.com은 웹사이트에 링크된 모든 사이트를 검토하지 않았으며, 그러한 링크된 사이트의 내용에 대해 책임을 지지 않습니다. 링크 포함은 MrKyoto.com의 사이트 추천을 의미하지 않습니다.',
                'terms.section.modifications': '수정',
                'terms.section.modifications.desc': 'MrKyoto.com은 사전 통지 없이 언제든지 웹사이트의 이 이용약관을 개정할 수 있습니다. 이 웹사이트를 사용함으로써 이 이용약관의 현재 버전에 구속되는 것에 동의합니다.',
                'terms.section.contact': '연락처',
                'terms.section.contact.desc': '이 이용약관에 대해 문의사항이 있으시면 hello@mrkyoto.com으로 연락해 주세요.',

                // Legal Pages - Privacy Policy
                'privacy.meta.title': '개인정보처리방침 - MrKyoto.com',
                'privacy.meta.description': 'MrKyoto.com 사용자의 개인정보처리방침 및 데이터 보호 정보.',
                'privacy.hero.title': '개인정보처리방침',
                'privacy.hero.subtitle': '이 개인정보처리방침은 MrKyoto.com이 귀하의 정보를 어떻게 수집, 사용, 보호하는지 설명합니다.',
                'privacy.section.lastUpdated': '최종 업데이트: 2025년 1월',
                'privacy.section.collection': '수집하는 정보',
                'privacy.section.collection.desc': '계정 생성, 뉴스레터 구독, 지원 문의 등 귀하가 직접 제공하는 정보를 수집합니다.',
                'privacy.section.usage': '정보 사용 방법',
                'privacy.section.usage.desc': '수집한 정보를 사용하여 서비스 제공, 유지, 개선, 귀하와의 커뮤니케이션, 새로운 기능 개발을 수행합니다.',
                'privacy.section.sharing': '정보 공유',
                'privacy.section.sharing.desc': '귀하의 동의 없이 이 정책에서 설명한 경우를 제외하고 개인정보를 제3자에게 판매, 거래 또는 기타 방법으로 이전하지 않습니다.',
                'privacy.section.security': '데이터 보안',
                'privacy.section.security.desc': '귀하의 개인정보를 무단 접근, 변경, 공개 또는 파괴로부터 보호하기 위해 적절한 보안 조치를 구현합니다.',
                'privacy.section.cookies': '쿠키 및 추적',
                'privacy.section.cookies.desc': '웹사이트에서 귀하의 경험을 향상시키고 사용 패턴을 분석하기 위해 쿠키 및 유사한 추적 기술을 사용합니다.',
                'privacy.section.rights': '귀하의 권리',
                'privacy.section.rights.desc': '귀하에게는 개인정보에 접근, 수정 또는 삭제할 권리가 있습니다. 또한 당사로부터의 특정 커뮤니케이션을 거부할 수도 있습니다.',
                'privacy.section.changes': '이 정책의 변경',
                'privacy.section.changes.desc': '이 개인정보처리방침을 수시로 업데이트할 수 있습니다. 이 페이지에 새로운 정책을 게시하여 변경사항을 알려드립니다.',
                'privacy.section.contact': '연락처',
                'privacy.section.contact.desc': '이 개인정보처리방침에 대해 문의사항이 있으시면 hello@mrkyoto.com으로 연락해 주세요.',

                // Live Kyoto Page
                'liveKyoto.meta.title': '교토 라이브 - 실시간 카메라, 날씨 및 업데이트 - MrKyoto.com',
                'liveKyoto.meta.description': '실시간 카메라와 현재 날씨로 교토를 경험하세요. 교토역, 사원, 정원의 라이브 스트림을 시청하세요.',
                'liveKyoto.hero.title': '교토 라이브 2026',
                'liveKyoto.hero.subtitle': '실시간 카메라와 현재 날씨로 일본 문화 수도 교토의 중심에서 실시간으로 교토를 경험하세요.',
                'liveKyoto.hero.badges.live': '라이브 스트림',
                'liveKyoto.hero.badges.weather': '실시간 날씨',
                'liveKyoto.hero.badges.verified': '검증된 소스',

                // Live Kyoto Weather Widget
                'liveKyoto.weather.title': '교토 날씨',
                'liveKyoto.weather.live': '라이브',
                'liveKyoto.weather.loading': '날씨 로딩 중...',
                'liveKyoto.weather.feelsLike': '체감 온도',
                'liveKyoto.weather.wind': '바람',
                'liveKyoto.weather.humidity': '습도',
                'liveKyoto.weather.visibility': '가시거리',
                'liveKyoto.weather.pressure': '기압',
                'liveKyoto.weather.sunrise': '일출',
                'liveKyoto.weather.sunset': '일몰',
                'liveKyoto.weather.lastUpdated': '마지막 업데이트',

                // Events Page
                'events.meta.title': '교토 이벤트 & 축제 | 전통 의식 & 문화 축하 | MrKyoto.com',
                'events.meta.description': '전통 축제, 계절 축하, 현대 이벤트로 교토의 활기찬 문화 캘린더를 경험하세요. 기온 마츠리부터 벚꽃 구경까지, 진정한 일본 문화적 경험을 발견하세요.',
                'events.hero.title': '교토 이벤트 & 축제 2026',
                'events.hero.subtitle': '전통 축제, 계절 축하, 현대 이벤트로 교토의 활기찬 문화 캘린더를 경험하세요.',
                'events.hero.badges.updated': '2026년 업데이트',
                'events.hero.badges.cultural': '문화 이벤트',
                'events.hero.badges.festivals': '전통 축제',
                'events.hero.badges.verified': '검증된 이벤트',
                'events.search.placeholder': '🔍 이름, 카테고리, 날짜, 위치로 이벤트 검색...',
                'events.filters.allCategories': '모든 카테고리',
                'events.filters.traditional': '전통',
                'events.filters.cultural': '문화',
                'events.filters.seasonal': '계절',
                'events.filters.modern': '현대',
                'events.filters.religious': '종교',
                'events.filters.allMonths': '모든 월',
                'events.filters.january': '1월',
                'events.filters.february': '2월',
                'events.filters.march': '3월',
                'events.filters.april': '4월',
                'events.filters.may': '5월',
                'events.filters.june': '6월',
                'events.filters.july': '7월',
                'events.filters.august': '8월',
                'events.filters.september': '9월',
                'events.filters.october': '10월',
                'events.filters.november': '11월',
                'events.filters.december': '12월',
                'events.filters.date': '날짜',
                'events.filters.mostPopular': '인기순',
                'events.filters.nameAZ': '이름순',
                'events.filters.category': '카테고리',
                'events.filters.grid': '그리드',
                'events.filters.list': '목록',
                'events.section.availableEvents': '사용 가능한 이벤트',
                'events.loading.text': '이벤트와 축제 데이터 로딩 중...',
                'events.noResults.title': '이벤트를 찾을 수 없습니다',
                'events.noResults.description': '검색 조건이나 필터를 조정해 보세요.',
                'events.modal.bookTickets': '티켓 예약',
                'events.modal.learnMore': '자세히 보기',
                'events.modal.details': '상세',
                'events.modal.close': '닫기',
                'events.notification.dataUpdated': '이벤트 데이터가 업데이트되었습니다',
                
                // Events Page - Hero Section
                'events.hero.liveEvents': '라이브 이벤트',
                'events.hero.title': '교토 이벤트와 축제',
                'events.hero.subtitle': '일본에서 가장 권위 있는 문화적 축하와 현대 이벤트를 경험하세요.',
                'events.hero.traditionalFestivals': '전통 축제',
                'events.hero.seasonalCelebrations': '계절 축하',
                'events.hero.allEvents': '모든 이벤트',
                'events.hero.searchEvents': '이벤트 검색',
                
                // Events Page - Stats Section
                'events.stats.overview': '이벤트 개요',
                'events.stats.events': '이벤트',
                'events.stats.thisMonth': '이번 달',
                'events.stats.categories': '카테고리',
                'events.stats.upcoming': '예정',
                'events.stats.live': '라이브',
                
                // Events Page - Search and Filters
                'events.search.placeholder': '🔍 이름, 카테고리, 날짜, 위치로 이벤트 검색...',
                'events.search.search': '검색',
                'events.filters.allCategories': '모든 카테고리',
                'events.filters.traditional': '전통',
                'events.filters.cultural': '문화',
                'events.filters.seasonal': '계절',
                'events.filters.modern': '현대',
                'events.filters.religious': '종교',
                'events.filters.allMonths': '모든 월',
                'events.filters.january': '1월',
                'events.filters.february': '2월',
                'events.filters.march': '3월',
                'events.filters.april': '4월',
                'events.filters.may': '5월',
                'events.filters.june': '6월',
                'events.filters.july': '7월',
                'events.filters.august': '8월',
                'events.filters.september': '9월',
                'events.filters.october': '10월',
                'events.filters.november': '11월',
                'events.filters.december': '12월',
                'events.filters.date': '날짜',
                'events.filters.mostPopular': '인기순',
                'events.filters.nameAZ': '이름순',
                'events.filters.category': '카테고리',
                'events.filters.grid': '그리드',
                'events.filters.list': '목록',
                'events.section.availableEvents': '사용 가능한 이벤트',
                'events.loading.text': '이벤트와 축제 데이터 로딩 중...',
                'events.noResults.title': '이벤트를 찾을 수 없습니다',
                'events.noResults.description': '검색 조건이나 필터를 조정해 보세요.',
                'events.modal.bookTickets': '티켓 예약',
                'events.modal.learnMore': '자세히 보기',
                'events.modal.details': '상세',
                'events.modal.close': '닫기',

                // News Page
                'news.meta.title': '교토 실시간 뉴스 허브 | 교토 & 일본의 라이브 뉴스 | MrKyoto.com',
                'news.meta.description': '교토와 일본의 실시간 뉴스 업데이트를 받으세요. 검증된 뉴스 소스의 최신 속보, 문화 이벤트, 발전에 대한 최신 정보를 받으세요.',
                'news.hero.title': '교토 실시간 뉴스 허브',
                'news.hero.subtitle': '교토와 일본의 실시간 뉴스 업데이트로 최신 정보를 받으세요.',
                'news.hero.badges.updated': '2026년 업데이트',
                'news.hero.badges.verified': '검증된 소스',
                'news.hero.badges.live': '라이브 업데이트',
                'news.search.placeholder': '🔍 제목, 카테고리, 소스, 날짜로 뉴스 검색...',
                'news.filters.allCategories': '모든 카테고리',
                'news.filters.culture': '문화',
                'news.filters.tourism': '관광',
                'news.filters.events': '이벤트',
                'news.filters.business': '비즈니스',
                'news.filters.weather': '날씨',
                'news.filters.allSources': '모든 소스',
                'news.filters.kyotoTimes': '교토 타임즈',
                'news.filters.japanNews': '일본 뉴스',
                'news.filters.localNews': '지역 뉴스',
                'news.filters.international': '국제',
                'news.filters.newest': '최신',
                'news.filters.oldest': '최고',
                'news.filters.mostPopular': '인기순',
                'news.filters.trending': '트렌딩',
                'news.filters.grid': '그리드',
                'news.filters.list': '목록',
                'news.section.availableNews': '사용 가능한 뉴스',
                'news.loading.text': '뉴스와 업데이트 로딩 중...',
                'news.noResults.title': '뉴스를 찾을 수 없습니다',
                'news.noResults.description': '검색 조건이나 필터를 조정해 보세요.',
                'news.modal.readFull': '전문 읽기',
                'news.modal.share': '공유',
                'news.modal.favorite': '즐겨찾기',
                'news.modal.close': '닫기',
                'news.notification.dataUpdated': '뉴스 데이터가 업데이트되었습니다',
                
                // News Page - Hero Section
                'news.hero.liveUpdates': '라이브 업데이트',
                'news.hero.title': '교토 실시간 뉴스 허브',
                'news.hero.subtitle': '교토와 일본의 실시간 뉴스 업데이트로 정보를 얻으세요.',
                'news.hero.verifiedSources': '검증된 소스',
                'news.hero.instantUpdates': '즉시 업데이트',
                'news.hero.latestNews': '최신 뉴스',
                'news.hero.searchNews': '뉴스 검색',
                
                // News Page - Stats Section
                'news.stats.overview': '라이브 뉴스 개요',
                'news.stats.articles': '기사',
                'news.stats.today': '오늘',
                'news.stats.sources': '소스',
                'news.stats.status': '상태',
                'news.stats.live': '라이브',
                
                // News Page - Search and Filters
                'news.search.placeholder': '🔍 제목, 카테고리, 소스, 날짜로 뉴스 검색...',
                'news.search.search': '검색',
                'news.filters.allCategories': '모든 카테고리',
                'news.filters.culture': '문화',
                'news.filters.tourism': '관광',
                'news.filters.events': '이벤트',
                'news.filters.business': '비즈니스',
                'news.filters.weather': '날씨',
                'news.filters.allSources': '모든 소스',
                'news.filters.kyotoTimes': '교토 타임즈',
                'news.filters.japanNews': '일본 뉴스',
                'news.filters.localNews': '로컬 뉴스',
                'news.filters.international': '국제',
                'news.filters.newest': '최신',
                'news.filters.oldest': '최고',
                'news.filters.mostPopular': '인기순',
                'news.filters.trending': '트렌딩',
                'news.filters.grid': '그리드',
                'news.filters.list': '목록',
                'news.section.availableNews': '사용 가능한 뉴스',
                'news.loading.text': '뉴스와 업데이트 로딩 중...',
                'news.noResults.title': '뉴스를 찾을 수 없습니다',
                'news.noResults.description': '검색 조건이나 필터를 조정해 보세요.',
                'news.modal.readFull': '전문 읽기',
                'news.modal.share': '공유',
                'news.modal.favorite': '즐겨찾기',
                'news.modal.close': '닫기',

                // Common Widget Elements
                'Live from Kyoto': '교토 라이브',
                'Real-time cameras, weather & social updates': '실시간 카메라, 날씨, 소셜 업데이트',
                'Kyoto Weather': '교토 날씨',
                'Social Updates': '소셜 업데이트',
                'Quick Links': '빠른 링크',
                'Refresh': '새로고침',
                'Search': '검색',
                'Grid': '그리드',
                'List': '목록',
                'View Details': '상세 보기',
                'Read Full Article': '전문 읽기',
                'Book Now': '지금 예약',
                'Subscribe': '구독',
                'Featured': '추천',
                'Premium': '프리미엄',
                'Verified': '검증됨',
                'Live': '라이브',
                'Loading...': '로딩 중...',
                'No results found': '결과를 찾을 수 없습니다',
                'Error loading data': '데이터 로딩 오류',
                'Data updated': '데이터가 업데이트되었습니다',
                'Success!': '성공!',
                'Error occurred': '오류가 발생했습니다',
                
                // Homepage specific translations
                'homepage.hero.title': '영원한 교토로의 관문',
                'homepage.hero.subtitle': '일본의 문화 수도에서 전통과 현대의 완벽한 조화를 발견하세요. 신성한 사원에서 현대적인 생활까지, 모든 모서리가 이야기를 전합니다.',
                'homepage.hero.exploreProperties': '부동산 탐색',
                'homepage.hero.discoverActivities': '액티비티 발견',
                'homepage.hero.searchPlaceholder': '🔍 교토 부동산, 액티비티, 이벤트, 뉴스 검색...',
                
                // Featured Properties Section
                'featured.title': '꿈의 교토 마치야 구매',
                'featured.viewAll': '모든 부동산 보기',
                'featured.properties': '부동산',
                'featured.activities': '액티비티',
                'featured.events': '이벤트',
                
                // Property Card Elements
                'property.forSale': '매물',
                'property.forRent': '임대',
                'property.viewDetails': '상세 보기',
                'property.contact': '연락처',
                'property.bed': '침실',
                'property.bath': '욕실',
                'property.sqm': '평방미터',
                'property.sqft': '평방피트',
                'property.walkScore': '워크',
                'property.verified': '검증됨',
                'property.features': '특징:',
                'property.moreFeatures': '더 보기',
                'property.listedBy': '등록자:',
                'property.id': 'ID:',
                
                // Explore Kyoto Section
                'explore.title': '🗺️ 교토 2025 탐험',
                'explore.subtitle': '포괄적인 가이드, 진정한 경험, 풍부한 문화 유산으로 일본 문화 수도의 다양한 측면을 발견하세요.',
                'explore.topActivities': '🎯\n인기 액티비티',
                'explore.topActivitiesDesc': '문화적 경험과 진정한 모험',
                'explore.buyHouse': '🏠\n집 구매',
                'explore.buyHouseDesc': '교토 최고 지역의 프리미엄 부동산',
                'explore.rentHouse': '🏡\n집 임대',
                'explore.rentHouseDesc': '체류를 위한 유연한 숙박 옵션',
                'explore.traditionalArts': '🏮\n전통 예술',
                'explore.traditionalArtsDesc': '다도, 서예 등',
                'explore.templesShrines': '⛩️\n사원과 신사',
                'explore.templesShrinesDesc': '신성한 장소와 영적 유산',
                'explore.culturalExperiences': '🎎\n문화적 경험',
                'explore.culturalExperiencesDesc': '실습 워크샵과 액티비티',
                
                // Culture Section
                'culture.traditions.title': '전통 예술',
                'culture.traditions.subtitle': '다도, 서예 등',
                'culture.temples.title': '사원과 신사',
                'culture.temples.subtitle': '신성한 장소와 영적 유산',
                'culture.experiences.title': '문화적 경험',
                'culture.experiences.subtitle': '실습 워크샵과 액티비티',
                
                // Live from Kyoto Widget
                'liveWidget.title': '교토 라이브',
                'liveWidget.subtitle': '실시간 카메라, 날씨, 소셜 업데이트',
                'liveWidget.weather.title': '교토 날씨',
                'liveWidget.weather.loading': '날씨 로딩 중...',
                'liveWidget.weather.feelsLike': '체감 온도',
                'liveWidget.weather.wind': '바람',
                'liveWidget.weather.humidity': '습도',
                'liveWidget.weather.visibility': '가시거리',
                'liveWidget.weather.pressure': '기압',
                'liveWidget.weather.sunrise': '일출',
                'liveWidget.weather.sunset': '일몰',
                'liveWidget.weather.lastUpdated': '교토 시간',
                
                // Footer
                'footer.about': 'MrKyoto 소개',
                'footer.aboutDesc': '영원한 교토로의 관문 - 일본 문화 수도 최고의 것들과 연결합니다.',
                'footer.explore': '탐험',
                'footer.activities': '액티비티',
                'footer.events': '이벤트 & 축제',
                'footer.news': '뉴스',
                'footer.liveFromKyoto': '교토 라이브',
                'footer.realEstate': '부동산',
                'footer.propertyListings': '부동산 목록',
                'footer.localAreas': '지역',
                'footer.marketInsights': '시장 인사이트',
                'footer.neighborhoodGuide': '지역 가이드',
                'footer.connect': '연결',
                'footer.contact': '연락처',
                'footer.legal': '법적',
                'footer.terms': '이용약관',
                'footer.privacy': '개인정보처리방침',
                'footer.copyright': '© 2025 MrKyoto.com. 모든 권리 보유. 영원한 교토로의 관문.',
                
                // Contact Section
                'contact.title': '연락처',
                'contact.subtitle': '우리 팀에 연락하세요',
                'contact.email': '이메일',
                'contact.phone': '전화',
                'contact.address': '주소',
                'contact.sendMessage': '메시지 보내기',
                'contact.contactUs': '연락처',
                'contact.arrow': '→'
            },
            zh: {
                // Meta
                'meta.title': 'MrKyoto.com | 通往永恒京都的门户 - 房地产、活动、文化体验',
                'meta.description': '发现京都的最佳 - 从传统寺庙和文化活动到高端房地产和当地见解。探索、生活和连接日本历史文化首都的完整指南。',
                
                // Navigation
                'nav.brand': 'MrKyoto',
                'nav.home': '首页',
                'nav.realEstate': '房地产',
                'nav.activities': '活动',
                'nav.events': '活动',
                'nav.news': '新闻',
                'nav.culture': '文化',
                'nav.about': '关于我们',
                'nav.contact': '联系我们',
                'nav.buyHouse': '购买房屋',
                'nav.rentHouse': '租赁房屋',
                'nav.language': '语言',
                'nav.theme': '主题',
                'nav.liveFromKyoto': '京都直播',
                'nav.contact': '联系我们',

                // Hero Section
                'hero.title': '通往永恒京都的门户',
                'hero.subtitle': '在日本文化首都发现传统与现代的完美融合。从神圣寺庙到现代生活，每个角落都在讲述故事。',
                'hero.exploreProperties': '探索房产',
                'hero.discoverActivities': '发现活动',
                'hero.search.placeholder': '🔍 搜索京都房产、活动、事件、新闻...',
                'hero.stats.properties': '房产',
                'hero.stats.activities': '活动',
                'hero.stats.events': '事件',

                // About Section
                'about.sectionTitle': '京都之门',
                'about.welcome': '欢迎来到MrKyoto.com，您通往日本最美丽城市的综合指南。无论您是计划访问、想要在这里生活，还是只想探索京都丰富的文化遗产，我们都在这里帮助您发现古代传统与现代便利的完美融合。',
                'about.culturalHeritage.title': '文化遗产',
                'about.culturalHeritage.description': '探索超过1,600座佛教寺庙、400座神道教神社和无数传统花园，使京都成为日本文化的活博物馆。',
                'about.realEstate.title': '房地产',
                'about.realEstate.description': '在京都找到您完美的家，从传统町屋到现代公寓，都在最理想的社区。',
                'about.localExperiences.title': '当地体验',
                'about.localExperiences.description': '沉浸在真实的文化体验中，从茶道到传统节日和季节性庆祝活动。',

                // Quick Actions
                'quick.realEstate': '🏠 房地产',
                'quick.activities': '🎯 活动',
                'quick.events': '🎭 事件',
                'quick.news': '📰 新闻',

                // Featured Properties
                'featured.sectionTitle': '精选房产',
                'featured.title': '🏠 精选房产',
                'featured.description': '在京都最理想的社区发现卓越的住宅。从传统町屋到现代公寓，找到您完美的京都居所。',
                'featured.loading': '正在加载房产...',
                'featured.browseAll': '浏览所有房产',
                'featured.viewAll': '查看所有房产',
                'featured.featured': '精选',
                'featured.premium': '高端',

                // Explore Section
                'explore.sectionTitle': '探索',
                'explore.description': '在日本文化首都发现传统与现代的完美融合。从神圣寺庙到现代生活，每个角落都在讲述故事。',
                'explore.title': '🗺️ 探索京都',
                'explore.subtitle': '通过我们的综合指南发现日本文化首都的多个方面。',
                'explore.topActivities.title': '热门活动',
                'explore.topActivities.description': '发现京都最神圣的寺庙和真实的文化体验。',
                'explore.eventTickets.title': '活动门票',
                'explore.eventTickets.description': '预订传统节日和文化表演的门票。',
                'explore.localNews.title': '本地新闻',
                'explore.localNews.description': '了解最新动态和文化发展。',
                'explore.cultureTraditions.title': '文化与传统',
                'explore.cultureTraditions.description': '沉浸在京都丰富的文化遗产和传统中。',
                'explore.activities.title': '热门活动',
                'explore.activities.subtitle': '文化体验和真实冒险',
                'explore.buyHouse.title': '购买房屋',
                'explore.buyHouse.subtitle': '京都最优质社区的豪华房产',
                'explore.rentHouse.title': '租赁房屋',
                'explore.rentHouse.subtitle': '灵活的住宿选择',
                'explore.events.title': '活动门票',
                'explore.events.subtitle': '文化节日和传统庆典',

                // Contact Section
                'contact.sectionTitle': '联系我们',
                'contact.description': '对京都有疑问吗？我们很乐意听取您的意见，帮助您发现完美的京都体验。',
                'contact.form.name': '姓名',
                'contact.form.email': '邮箱',
                'contact.form.message': '消息',
                'contact.form.send': '发送消息',
                'contact.services.title': '我们的服务',
                'contact.services.expertGuidance.title': '专业指导',
                'contact.services.expertGuidance.description': '为最佳京都体验提供当地见解和专家建议。',
                'contact.services.trustedListings.title': '可信列表',
                'contact.services.trustedListings.description': '精选房地产列表和验证的房产信息。',
                'contact.services.culturalExperiences.title': '文化体验',
                'contact.services.culturalExperiences.description': '真实的文化体验和传统活动。',

                // Footer
                'footer.brand': 'MrKyoto',
                'footer.tagline': '通往永恒京都的门户 — 在日本文化首都的中心探索、生活和连接。',
                'footer.explore.title': '探索',
                'footer.explore.activities': '热门活动',
                'footer.explore.culture': '文化与传统',
                'footer.explore.events': '活动与节日',
                'footer.explore.news': '本地新闻',
                'footer.realEstate.title': '房地产',
                'footer.realEstate.buy': '购买房屋',
                'footer.realEstate.rent': '租赁房屋',
                'footer.realEstate.listings': '房产列表',
                'footer.realEstate.areas': '本地区域',
                'footer.connect.title': '联系',
                'footer.connect.privacy': '隐私政策',
                'footer.connect.terms': '服务条款',
                'footer.copyright': '© 2025 MrKyoto.com. All rights reserved. 通往永恒京都的门户。',

                // Property Cards
                'property.viewDetails': '查看详情',
                'property.contact': '联系',
                'property.favorite': '收藏',
                'property.bed': '卧室',
                'property.bath': '浴室',
                'property.sqft': '平方英尺',
                'property.walkScore': '步行评分',

                // Common Actions
                'action.search': '搜索',
                'action.loadMore': '加载更多',
                'action.viewAll': '查看全部',
                'action.back': '返回',
                'action.next': '下一个',
                'action.previous': '上一个',
                'action.close': '关闭',
                'action.save': '保存',
                'action.cancel': '取消',
                'action.edit': '编辑',
                'action.delete': '删除',

                // Messages
                'message.loading': '加载中...',
                'message.noResults': '未找到结果',
                'message.error': '发生错误',
                'message.success': '成功！',
                'message.languageChanged': '语言已更改为',

                // Real Estate Page
                'realEstate.meta.title': '京都房地产 | 在日本京都购买和租赁房屋 | 房产列表 | MrKyoto.com',
                'realEstate.meta.description': '发现京都的优质房地产。浏览祇园、岚山、东山等独家社区的销售和租赁房屋。日本文化首都房地产购买和租赁的专业指导。',
                'realEstate.hero.title': '京都房地产 2026',
                'realEstate.hero.subtitle': '在日本文化首都发现优质房产',
                'realEstate.hero.badges.updated': '2026年更新',
                'realEstate.hero.badges.analytics': '市场分析',
                'realEstate.hero.badges.data': '丰富数据',
                'realEstate.hero.badges.verified': '验证房产',
                'realEstate.hero.marketOverview': '市场概览',
                'realEstate.hero.stats.properties': '房产',
                'realEstate.hero.stats.avgPrice': '平均价格',
                'realEstate.hero.stats.marketHealth': '市场健康度',
                'realEstate.search.placeholder': '🔍 按标题、位置、社区、特色搜索房产...',
                'realEstate.filters.allTypes': '所有类型',
                'realEstate.filters.forSale': '出售',
                'realEstate.filters.forRent': '出租',
                'realEstate.filters.allPrices': '所有价格',
                'realEstate.filters.under50m': '5000万日元以下',
                'realEstate.filters.50m100m': '5000万 - 1亿日元',
                'realEstate.filters.100m200m': '1亿 - 2亿日元',
                'realEstate.filters.over200m': '2亿日元以上',
                'realEstate.filters.newest': '最新',
                'realEstate.filters.priceLow': '价格：从低到高',
                'realEstate.filters.priceHigh': '价格：从高到低',
                'realEstate.filters.size': '面积',
                'realEstate.filters.walkScore': '步行评分',
                'realEstate.view.grid': '网格',
                'realEstate.view.list': '列表',
                
                // Real Estate Page - Additional Sections
                'realEstate.section.availableProperties': '可用房产',
                'realEstate.section.forSale': '出售',
                'realEstate.section.forRent': '出租',
                'realEstate.actions.clearFilters': '清除过滤器',
                'realEstate.actions.saveSearch': '保存搜索',
                'realEstate.signup.title': '关注京都房地产更新',
                'realEstate.signup.subtitle': '获取关于房产列表、市场趋势和京都投资机会的独家更新。在日本文化首都找到您完美的家。',
                'realEstate.signup.form.name': '全名',
                'realEstate.signup.form.email': '邮箱地址',
                'realEstate.signup.form.phone': '电话号码（可选）',
                'realEstate.signup.form.propertyType': '房产类型兴趣',
                'realEstate.signup.form.budget': '预算范围',
                'realEstate.signup.form.location': '首选位置',
                'realEstate.signup.form.subscribe': '订阅更新',
                'realEstate.signup.form.submit': '订阅房地产更新',
                'realEstate.signup.form.agreement': '通过订阅，您同意接收关于京都房地产的更新。我们尊重您的隐私，绝不会分享您的信息。',

                // Legal Pages - Terms of Service
                'terms.meta.title': '服务条款 - MrKyoto.com',
                'terms.meta.description': 'MrKyoto.com服务的使用条款和条件。',
                'terms.hero.title': '服务条款',
                'terms.hero.subtitle': '在使用我们的服务之前，请仔细阅读这些条款和条件。',
                'terms.section.lastUpdated': '最后更新：2025年1月',
                'terms.section.acceptance': '条款接受',
                'terms.section.acceptance.desc': '通过访问和使用MrKyoto.com，您接受并同意受本协议条款的约束。',
                'terms.section.use': '使用许可',
                'terms.section.use.desc': '允许临时下载MrKyoto.com上的材料（信息或软件）的一个副本，仅供个人、非商业性的临时查看使用。',
                'terms.section.restrictions': '限制',
                'terms.section.restrictions.desc': '您特别被限制进行以下所有行为：修改或复制材料，将材料用于任何商业目的或任何公开展示，试图对MrKyoto.com上包含的任何软件进行反向工程。',
                'terms.section.disclaimer': '免责声明',
                'terms.section.disclaimer.desc': 'MrKyoto.com上的材料按"现状"提供。MrKyoto.com不作任何明示或暗示的保证，并在此否认所有其他保证，包括但不限于适销性、特定用途适用性、知识产权不侵权或其他权利侵犯的暗示保证或条件。',
                'terms.section.limitations': '限制',
                'terms.section.limitations.desc': '在任何情况下，MrKyoto.com或其供应商均不对因使用或无法使用MrKyoto.com上的材料而造成的任何损害（包括但不限于数据或利润损失，或由于业务中断造成的损害）承担责任。',
                'terms.section.accuracy': '材料准确性',
                'terms.section.accuracy.desc': 'MrKyoto.com上出现的材料可能包含技术、排版或摄影错误。MrKyoto.com不保证其网站上的任何材料准确、完整或最新。',
                'terms.section.links': '链接',
                'terms.section.links.desc': 'MrKyoto.com尚未审查链接到其网站的所有网站，也不对任何此类链接网站的内容负责。包含任何链接并不意味着MrKyoto.com对该网站的认可。',
                'terms.section.modifications': '修改',
                'terms.section.modifications.desc': 'MrKyoto.com可能随时修改其网站的这些服务条款，恕不另行通知。通过使用本网站，您同意受这些服务条款当前版本的约束。',
                'terms.section.contact': '联系信息',
                'terms.section.contact.desc': '如果您对这些服务条款有任何疑问，请通过hello@mrkyoto.com联系我们。',

                // Legal Pages - Privacy Policy
                'privacy.meta.title': '隐私政策 - MrKyoto.com',
                'privacy.meta.description': 'MrKyoto.com用户的隐私政策和数据保护信息。',
                'privacy.hero.title': '隐私政策',
                'privacy.hero.subtitle': '本隐私政策描述了MrKyoto.com如何收集、使用和保护您的信息。',
                'privacy.section.lastUpdated': '最后更新：2025年1月',
                'privacy.section.collection': '我们收集的信息',
                'privacy.section.collection.desc': '我们收集您直接提供给我们的信息，例如当您创建账户、订阅我们的新闻通讯或联系我们寻求支持时。',
                'privacy.section.usage': '我们如何使用您的信息',
                'privacy.section.usage.desc': '我们使用收集的信息来提供、维护和改进我们的服务，与您沟通，并开发新功能。',
                'privacy.section.sharing': '信息共享',
                'privacy.section.sharing.desc': '未经您的同意，我们不会向第三方出售、交易或以其他方式转让您的个人信息，本政策中描述的情况除外。',
                'privacy.section.security': '数据安全',
                'privacy.section.security.desc': '我们实施适当的安全措施来保护您的个人信息免受未经授权的访问、更改、披露或破坏。',
                'privacy.section.cookies': 'Cookie和跟踪',
                'privacy.section.cookies.desc': '我们使用Cookie和类似的跟踪技术来增强您在网站上的体验并分析使用模式。',
                'privacy.section.rights': '您的权利',
                'privacy.section.rights.desc': '您有权访问、更正或删除您的个人信息。您也可以选择退出我们的某些通信。',
                'privacy.section.changes': '本政策的变更',
                'privacy.section.changes.desc': '我们可能会不时更新本隐私政策。我们将通过在本页面上发布新政策来通知您任何变更。',
                'privacy.section.contact': '联系我们',
                'privacy.section.contact.desc': '如果您对本隐私政策有任何疑问，请通过hello@mrkyoto.com联系我们。',

                // Live Kyoto Page
                'liveKyoto.meta.title': '京都直播 - 实时摄像头、天气和更新 - MrKyoto.com',
                'liveKyoto.meta.description': '通过实时摄像头和当前天气体验京都。观看京都站、寺庙和花园的直播流。',
                'liveKyoto.hero.title': '京都直播 2026',
                'liveKyoto.hero.subtitle': '通过实时摄像头和当前天气从日本文化首都的中心实时体验京都。',
                'liveKyoto.hero.badges.live': '直播流',
                'liveKyoto.hero.badges.weather': '实时天气',
                'liveKyoto.hero.badges.verified': '验证来源',

                // Live Kyoto Weather Widget
                'liveKyoto.weather.title': '京都天气',
                'liveKyoto.weather.live': '直播',
                'liveKyoto.weather.loading': '正在加载天气...',
                'liveKyoto.weather.feelsLike': '体感温度',
                'liveKyoto.weather.wind': '风速',
                'liveKyoto.weather.humidity': '湿度',
                'liveKyoto.weather.visibility': '能见度',
                'liveKyoto.weather.pressure': '气压',
                'liveKyoto.weather.sunrise': '日出',
                'liveKyoto.weather.sunset': '日落',
                'liveKyoto.weather.lastUpdated': '最后更新',

                // Events Page
                'events.meta.title': '京都活动与节日 | 传统仪式与文化庆典 | MrKyoto.com',
                'events.meta.description': '体验京都充满活力的文化日历，包括传统节日、季节性庆典和现代活动。从祇园祭到樱花观赏，发现真实的日本文化体验。',
                'events.hero.title': '京都活动与节日 2026',
                'events.hero.subtitle': '体验京都充满活力的文化日历，包括传统节日、季节性庆典和现代活动。',
                'events.hero.badges.updated': '2026年更新',
                'events.hero.badges.cultural': '文化活动',
                'events.hero.badges.festivals': '传统节日',
                'events.hero.badges.verified': '验证活动',
                'events.search.placeholder': '🔍 按名称、类别、日期、位置搜索活动...',
                'events.filters.allCategories': '所有类别',
                'events.filters.traditional': '传统',
                'events.filters.cultural': '文化',
                'events.filters.seasonal': '季节性',
                'events.filters.modern': '现代',
                'events.filters.religious': '宗教',
                'events.filters.allMonths': '所有月份',
                'events.filters.january': '一月',
                'events.filters.february': '二月',
                'events.filters.march': '三月',
                'events.filters.april': '四月',
                'events.filters.may': '五月',
                'events.filters.june': '六月',
                'events.filters.july': '七月',
                'events.filters.august': '八月',
                'events.filters.september': '九月',
                'events.filters.october': '十月',
                'events.filters.november': '十一月',
                'events.filters.december': '十二月',
                'events.filters.date': '日期',
                'events.filters.mostPopular': '最受欢迎',
                'events.filters.nameAZ': '名称A-Z',
                'events.filters.category': '类别',
                'events.filters.grid': '网格',
                'events.filters.list': '列表',
                'events.section.availableEvents': '可用活动',
                'events.loading.text': '正在加载活动和节日数据...',
                'events.noResults.title': '未找到活动',
                'events.noResults.description': '请尝试调整搜索条件或过滤器。',
                'events.modal.bookTickets': '预订门票',
                'events.modal.learnMore': '了解更多',
                'events.modal.details': '详情',
                'events.modal.close': '关闭',
                'events.notification.dataUpdated': '活动数据已更新',
                
                // Events Page - Hero Section
                'events.hero.liveEvents': '直播活动',
                'events.hero.title': '京都活动与节日',
                'events.hero.subtitle': '体验日本最负盛名的文化庆典和现代活动。',
                'events.hero.traditionalFestivals': '传统节日',
                'events.hero.seasonalCelebrations': '季节庆典',
                'events.hero.allEvents': '所有活动',
                'events.hero.searchEvents': '搜索活动',
                
                // Events Page - Stats Section
                'events.stats.overview': '活动概览',
                'events.stats.events': '活动',
                'events.stats.thisMonth': '本月',
                'events.stats.categories': '类别',
                'events.stats.upcoming': '即将到来',
                'events.stats.live': '直播',

                // News Page
                'news.meta.title': '京都实时新闻中心 | 来自京都和日本的实时新闻 | MrKyoto.com',
                'news.meta.description': '获取来自京都和日本的实时新闻更新。通过验证的新闻来源了解最新的突发新闻、文化事件和发展。',
                'news.hero.title': '京都实时新闻中心',
                'news.hero.subtitle': '通过来自京都和日本的实时新闻更新保持信息畅通。',
                'news.hero.badges.updated': '2026年更新',
                'news.hero.badges.verified': '验证来源',
                'news.hero.badges.live': '实时更新',
                'news.search.placeholder': '🔍 按标题、类别、来源、日期搜索新闻...',
                'news.filters.allCategories': '所有类别',
                'news.filters.culture': '文化',
                'news.filters.tourism': '旅游',
                'news.filters.events': '活动',
                'news.filters.business': '商业',
                'news.filters.weather': '天气',
                'news.filters.allSources': '所有来源',
                'news.filters.kyotoTimes': '京都时报',
                'news.filters.japanNews': '日本新闻',
                'news.filters.localNews': '本地新闻',
                'news.filters.international': '国际',
                'news.filters.newest': '最新',
                'news.filters.oldest': '最旧',
                'news.filters.mostPopular': '最受欢迎',
                'news.filters.trending': '趋势',
                'news.filters.grid': '网格',
                'news.filters.list': '列表',
                'news.section.availableNews': '可用新闻',
                'news.loading.text': '正在加载新闻和更新...',
                'news.noResults.title': '未找到新闻',
                'news.noResults.description': '请尝试调整搜索条件或过滤器。',
                'news.modal.readFull': '阅读全文',
                'news.modal.share': '分享',
                'news.modal.favorite': '收藏',
                'news.modal.close': '关闭',
                'news.notification.dataUpdated': '新闻数据已更新',
                
                // News Page - Hero Section
                'news.hero.liveUpdates': '实时更新',
                'news.hero.title': '京都实时新闻中心',
                'news.hero.subtitle': '通过来自京都和日本的实时新闻更新保持信息畅通。',
                'news.hero.verifiedSources': '验证来源',
                'news.hero.instantUpdates': '即时更新',
                'news.hero.latestNews': '最新新闻',
                'news.hero.searchNews': '搜索新闻',
                
                // News Page - Stats Section
                'news.stats.overview': '实时新闻概览',
                'news.stats.articles': '文章',
                'news.stats.today': '今天',
                'news.stats.sources': '来源',
                'news.stats.status': '状态',
                'news.stats.live': '直播',
                
                // News Page - Search and Filters
                'news.search.placeholder': '🔍 按标题、类别、来源、日期搜索新闻...',
                'news.search.search': '搜索',
                'news.filters.allCategories': '所有类别',
                'news.filters.culture': '文化',
                'news.filters.tourism': '旅游',
                'news.filters.events': '活动',
                'news.filters.business': '商业',
                'news.filters.weather': '天气',
                'news.filters.allSources': '所有来源',
                'news.filters.kyotoTimes': '京都时报',
                'news.filters.japanNews': '日本新闻',
                'news.filters.localNews': '本地新闻',
                'news.filters.international': '国际',
                'news.filters.newest': '最新',
                'news.filters.oldest': '最旧',
                'news.filters.mostPopular': '最受欢迎',
                'news.filters.trending': '趋势',
                'news.filters.grid': '网格',
                'news.filters.list': '列表',
                'news.section.availableNews': '可用新闻',
                'news.loading.text': '正在加载新闻和更新...',
                'news.noResults.title': '未找到新闻',
                'news.noResults.description': '请尝试调整搜索条件或过滤器。',
                'news.modal.readFull': '阅读全文',
                'news.modal.share': '分享',
                'news.modal.favorite': '收藏',
                'news.modal.close': '关闭',

                // Common Widget Elements
                'Live from Kyoto': '京都直播',
                'Real-time cameras, weather & social updates': '实时摄像头、天气和社交更新',
                'Kyoto Weather': '京都天气',
                'Social Updates': '社交更新',
                'Quick Links': '快速链接',
                'Refresh': '刷新',
                'Search': '搜索',
                'Grid': '网格',
                'List': '列表',
                'View Details': '查看详情',
                'Read Full Article': '阅读全文',
                'Book Now': '立即预订',
                'Subscribe': '订阅',
                'Featured': '精选',
                'Premium': '高级',
                'Verified': '已验证',
                'Live': '直播',
                'Loading...': '加载中...',
                'No results found': '未找到结果',
                'Error loading data': '加载数据错误',
                'Data updated': '数据已更新',
                'Success!': '成功！',
                'Error occurred': '发生错误',
                
                // Homepage specific translations
                'homepage.hero.title': '通往永恒京都的门户',
                'homepage.hero.subtitle': '在日本文化首都发现传统与现代的完美融合。从神圣寺庙到现代生活，每个角落都在讲述故事。',
                'homepage.hero.exploreProperties': '探索房产',
                'homepage.hero.discoverActivities': '发现活动',
                'homepage.hero.searchPlaceholder': '🔍 搜索京都房产、活动、事件、新闻...',
                
                // Featured Properties Section
                'featured.title': '购买您梦想的京都町屋',
                'featured.viewAll': '查看所有房产',
                'featured.properties': '房产',
                'featured.activities': '活动',
                'featured.events': '事件',
                
                // Property Card Elements
                'property.forSale': '出售',
                'property.forRent': '出租',
                'property.viewDetails': '查看详情',
                'property.contact': '联系',
                'property.bed': '卧室',
                'property.bath': '浴室',
                'property.sqm': '平方米',
                'property.sqft': '平方英尺',
                'property.walkScore': '步行',
                'property.verified': '已验证',
                'property.features': '特色:',
                'property.moreFeatures': '更多',
                'property.listedBy': '挂牌者:',
                'property.id': 'ID:',
                
                // Explore Kyoto Section
                'explore.title': '🗺️ 探索京都 2025',
                'explore.subtitle': '通过我们的综合指南、真实体验和丰富的文化遗产发现日本文化首都的多个方面。',
                'explore.topActivities': '🎯\n热门活动',
                'explore.topActivitiesDesc': '文化体验和真实冒险',
                'explore.buyHouse': '🏠\n购买房屋',
                'explore.buyHouseDesc': '京都最优质社区的豪华房产',
                'explore.rentHouse': '🏡\n租赁房屋',
                'explore.rentHouseDesc': '灵活的住宿选择',
                'explore.traditionalArts': '🏮\n传统艺术',
                'explore.traditionalArtsDesc': '茶道、书法等',
                'explore.templesShrines': '⛩️\n寺庙与神社',
                'explore.templesShrinesDesc': '神圣场所和精神遗产',
                'explore.culturalExperiences': '🎎\n文化体验',
                'explore.culturalExperiencesDesc': '实践工作坊和活动',
                
                // Culture Section
                'culture.traditions.title': '传统艺术',
                'culture.traditions.subtitle': '茶道、书法等',
                'culture.temples.title': '寺庙与神社',
                'culture.temples.subtitle': '神圣场所和精神遗产',
                'culture.experiences.title': '文化体验',
                'culture.experiences.subtitle': '实践工作坊和活动',
                
                // Live from Kyoto Widget
                'liveWidget.title': '京都直播',
                'liveWidget.subtitle': '实时摄像头、天气、社交更新',
                'liveWidget.weather.title': '京都天气',
                'liveWidget.weather.loading': '加载天气中...',
                'liveWidget.weather.feelsLike': '体感温度',
                'liveWidget.weather.wind': '风',
                'liveWidget.weather.humidity': '湿度',
                'liveWidget.weather.visibility': '能见度',
                'liveWidget.weather.pressure': '气压',
                'liveWidget.weather.sunrise': '日出',
                'liveWidget.weather.sunset': '日落',
                'liveWidget.weather.lastUpdated': '京都时间',
                
                // Footer
                'footer.about': '关于 MrKyoto',
                'footer.aboutDesc': '通往永恒京都的门户 - 连接您与日本文化首都的最佳。',
                'footer.explore': '探索',
                'footer.activities': '活动',
                'footer.events': '活动与节日',
                'footer.news': '新闻',
                'footer.liveFromKyoto': '京都直播',
                'footer.realEstate': '房地产',
                'footer.propertyListings': '房产列表',
                'footer.localAreas': '当地区域',
                'footer.marketInsights': '市场洞察',
                'footer.neighborhoodGuide': '社区指南',
                'footer.connect': '联系',
                'footer.contact': '联系',
                'footer.legal': '法律',
                'footer.terms': '服务条款',
                'footer.privacy': '隐私政策',
                'footer.copyright': '© 2025 MrKyoto.com. 保留所有权利。通往永恒京都的门户。',
                
                // Contact Section
                'contact.title': '联系我们',
                'contact.subtitle': '与我们的团队联系',
                'contact.email': '邮箱',
                'contact.phone': '电话',
                'contact.address': '地址',
                'contact.sendMessage': '发送消息',
                'contact.contactUs': '联系我们',
                'contact.arrow': '→',

                // Property-specific translations
                'property.forSale': 'For Sale',
                'property.forRent': 'For Rent',
                'property.verified': 'Verified',
                'property.viewDetails': 'View Details',
                'property.contact': 'Contact',
                'property.bed': 'Bed',
                'property.bath': 'Bath',
                'property.sqm': 'sqm',
                'property.walkScore': 'Walk Score',
                'property.features': 'Features',
                'property.moreFeatures': '+{count} more',

                // Live section translations
                'live.title': '📺 Live from Kyoto',
                'live.subtitle': 'Experience Kyoto in real-time with our live streams, weather updates, and cultural insights.',
                'live.weather.title': 'Live Weather',
                'live.weather.subtitle': 'Real-time weather conditions in Kyoto',
                'live.news.title': 'Local News',
                'live.news.subtitle': 'Latest updates from Kyoto and Japan',
                'live.events.title': 'Cultural Events',
                'live.events.subtitle': 'Upcoming festivals and celebrations',

                // Explore section translations
                'explore.title': '🗺️ Explore Kyoto 2025',
                'explore.subtitle': 'Discover the many facets of Japan\'s cultural capital with our comprehensive guides, authentic experiences, and rich cultural heritage.',
                'explore.activities.title': 'Top Activities',
                'explore.activities.subtitle': 'Cultural experiences and authentic adventures',
                'explore.buyHouse.title': 'Buy House',
                'explore.buyHouse.subtitle': 'Premium properties in Kyoto\'s finest neighborhoods',
                'explore.rentHouse.title': 'Rent House',
                'explore.rentHouse.subtitle': 'Flexible accommodation options for your stay',
                'explore.traditionalArts.title': 'Traditional Arts',
                'explore.traditionalArts.subtitle': 'Tea ceremony, calligraphy, and more',
                'explore.templesShrines.title': 'Temples & Shrines',
                'explore.templesShrines.subtitle': 'Sacred sites and spiritual heritage',
                'explore.culturalExperiences.title': 'Cultural Experiences',
                'explore.culturalExperiences.subtitle': 'Hands-on workshops and activities',
                
                // Activities Page - Hero, Featured, Filters, Live Widget
                'activities.meta.title': 'Kyoto Activities & Experiences 2026 - Book Real Tours & Attractions',
                'activities.meta.description': 'Discover and book authentic Kyoto activities with real reviews. From temple tours to food experiences, find the best things to do in Kyoto with verified providers.',
                'activities.hero.title': 'Kyoto Activities & Experiences 2026',
                'activities.hero.subtitle': 'Discover Kyoto\'s most iconic and authentic activities, from ancient temples to modern cultural adventures.',
                'activities.hero.badges.updated': 'Updated 2026',
                'activities.hero.badges.cultural': 'Cultural Experiences',
                'activities.hero.badges.guides': 'Expert Guides',
                'activities.hero.badges.verified': 'Verified Activities',
                'activities.mustsee.sectionTitle': 'Must-See Activities in Kyoto',
                'activities.mustsee.kiyomizu': 'Kiyomizu-dera Temple',
                'activities.mustsee.kiyomizu.desc': 'A UNESCO World Heritage site, Kiyomizu-dera is famous for its wooden stage that juts out from the main hall, offering breathtaking views of Kyoto, especially during cherry blossom and autumn foliage seasons. Don\'t miss the Otowa Waterfall, whose waters are believed to grant wishes.',
                'activities.mustsee.kiyomizu.tip1': 'Best time: Early morning for fewer crowds',
                'activities.mustsee.kiyomizu.tip2': 'Unique: Panoramic city views, historic architecture',
                'activities.mustsee.fushimi': 'Fushimi Inari Taisha',
                'activities.mustsee.fushimi.desc': 'Known for its iconic thousands of vermilion torii gates, this shrine is dedicated to Inari, the Shinto god of rice. The scenic trail up Mount Inari is lined with smaller shrines and fox statues.',
                'activities.mustsee.fushimi.tip1': 'Best time: Early morning or dusk for magical light',
                'activities.mustsee.fushimi.tip2': 'Unique: Endless torii gate tunnels, fox symbolism',
                'activities.mustsee.arashiyama': 'Arashiyama Bamboo Grove',
                'activities.mustsee.arashiyama.desc': 'Walk through towering bamboo stalks in one of Kyoto\'s most photographed locations. The grove is especially atmospheric in the early morning mist. Nearby, visit the Iwatayama Monkey Park and Togetsukyo Bridge.',
                'activities.mustsee.arashiyama.tip1': 'Best time: Early morning for tranquility',
                'activities.mustsee.arashiyama.tip2': 'Unique: Natural soundscape, close to river and monkeys',
                'activities.featured.sectionTitle': 'Top Activities & Must-See Attractions',
                'activities.featured.kiyomizu': 'Kiyomizu-dera Temple',
                'activities.featured.kiyomizu.desc': 'World Heritage temple with panoramic city views.',
                'activities.featured.fushimi': 'Fushimi Inari Taisha',
                'activities.featured.fushimi.desc': 'Famous for its thousands of red torii gates.',
                'activities.featured.arashiyama': 'Arashiyama Bamboo Grove',
                'activities.featured.arashiyama.desc': 'Walk through Kyoto\'s magical bamboo forest.',
                'activities.featured.gion': 'Gion District',
                'activities.featured.gion.desc': 'Historic geisha district with traditional tea houses.',
                'activities.featured.temple': 'Temple',
                'activities.featured.shrine': 'Shrine',
                'activities.featured.nature': 'Nature',
                'activities.featured.district': 'District',
                'activities.search.placeholder': '🔍 Search activities by name, category, location, guide...',
                'activities.filters.allCategories': 'All Categories',
                'activities.filters.cultural': 'Cultural',
                'activities.filters.outdoor': 'Outdoor',
                'activities.filters.food': 'Food & Dining',
                'activities.filters.art': 'Art & Craft',
                'activities.filters.spiritual': 'Spiritual',
                'activities.filters.allDurations': 'All Durations',
                'activities.filters.short': 'Short (1-2h)',
                'activities.filters.medium': 'Medium (3-4h)',
                'activities.filters.long': 'Long (5h+)',
                'activities.filters.fullDay': 'Full Day',
                'activities.filters.mostPopular': 'Most Popular',
                'activities.filters.highestRated': 'Highest Rated',
                'activities.filters.priceLow': 'Price: Low to High',
                'activities.filters.priceHigh': 'Price: High to Low',
                'activities.filters.duration': 'Duration',
                'activities.filters.grid': 'Grid',
                'activities.filters.list': 'List',
                'activities.section.availableActivities': 'Available Activities',
                'activities.loading.text': 'Loading real activities and reviews...',
                'activities.noResults.title': 'No Activities Found',
                'activities.noResults.description': 'Try adjusting your search criteria or filters.',
                'activities.reviews.title': 'Recent Reviews:',
                'activities.reviews.recentReview': 'Recent Review:',
                'activities.modal.reviews.title': 'Recent Reviews',
                'activities.modal.related.title': 'Related Activities',
                'activities.modal.bookActivity': 'Book Activity',
                'activities.modal.callProvider': 'Call Provider',
                'activities.modal.learnMore': 'Learn More',
                'activities.modal.details': 'Details',
                'activities.modal.close': 'Close',
                'activities.notification.apiError': 'API connection issue. Using local data.',
                'activities.notification.loadingError': 'Error loading activities. Using local data.',
                'activities.notification.dataUpdated': 'Activity data updated',
                'activities.featured': 'Featured',
                'activities.bookNow': 'Book Now',
                'activities.details': 'Details',
                'activities.stats.total': 'Total Activities',
                'activities.stats.categories': 'Activity Categories',
                'activities.stats.rating': 'Average Rating',
                'activities.stats.featured': 'Featured Activities',
                'liveKyoto.title': 'Live from Kyoto',
                'liveKyoto.subtitle': 'Real-time cameras, weather & social updates',
                // Live Widget
                'liveWidget.sectionTitle': 'Live from Kyoto',
                'liveWidget.cameraTitle': 'Kyoto Live Camera',
                'liveWidget.weatherTitle': 'Current Weather',
                'liveWidget.socialTitle': '#Kyoto Social Updates'
            }
        };
    }

    scanForTranslatableContent() {
        console.log('🌍 Scanning for translatable content...');
        
        // Clear existing elements
        this.translatableElements.clear();
        
        // Common translatable elements
        const selectors = [
            '[data-translate]',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'span', 'a', 'button', 'label',
            'input[placeholder]', 'textarea[placeholder]',
            'div[data-translate]', 'li', 'td', 'th'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                // Only add elements that have actual text content
                if (element.textContent && element.textContent.trim()) {
                    this.translatableElements.add(element);
                }
            });
        });

        // Also scan for elements with specific classes that should be translated
        const classSelectors = [
            '.nav-link', '.hero-title', '.hero-subtitle', '.section-title',
            '.card-title', '.card-subtitle', '.button-text', '.footer-link'
        ];

        classSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element.textContent && element.textContent.trim()) {
                    this.translatableElements.add(element);
                }
            });
        });

        console.log(`🌍 Found ${this.translatableElements.size} translatable elements`);
    }

    applyTranslations() {
        console.log('🌍 Applying translations for language:', this.currentLanguage);
        console.log('🌍 Translatable elements found:', this.translatableElements.size);
        
        this.translatableElements.forEach(element => {
            this.translateElement(element);
        });

        // Update dynamic content
        this.updateDynamicContent();
        
        console.log('✅ Translations applied');
    }

    translateElement(element) {
        // Check for data-translate attribute first
        const translateKey = element.getAttribute('data-translate');
        if (translateKey) {
            const translation = this.getTranslation(translateKey);
            if (translation) {
                element.textContent = translation;
                return;
            }
        }

        // Translate text content if it exists and is not empty
        if (element.textContent && element.textContent.trim()) {
            const originalText = element.textContent.trim();
            const translation = this.translateText(originalText);
            if (translation !== originalText) {
                element.textContent = translation;
            }
        }

        // Check for placeholder translation
        if (element.hasAttribute('placeholder')) {
            const placeholder = element.getAttribute('placeholder');
            const translation = this.translateText(placeholder);
            if (translation !== placeholder) {
                element.setAttribute('placeholder', translation);
            }
        }

        // Check for title translation
        if (element.hasAttribute('title')) {
            const title = element.getAttribute('title');
            const translation = this.translateText(title);
            if (translation !== title) {
                element.setAttribute('title', translation);
            }
        }

        // Check for alt text translation
        if (element.hasAttribute('alt')) {
            const alt = element.getAttribute('alt');
            const translation = this.translateText(alt);
            if (translation !== alt) {
                element.setAttribute('alt', translation);
            }
        }
    }

    translateText(text) {
        if (!text || typeof text !== 'string') return text;

        // Simple text matching for common phrases (English and Japanese only)
        const commonTranslations = {
            'Home': { ja: 'ホーム' },
            'Real Estate': { ja: '不動産' },
            'Activities': { ja: 'アクティビティ' },
            'Events': { ja: 'イベント' },
            'News': { ja: 'ニュース' },
            'Culture': { ja: '文化' },
            'About': { ja: '会社概要' },
            'Contact': { ja: 'お問い合わせ' },
            'View Details': { ja: '詳細を見る' },
            'Search': { ja: '検索' },
            'Loading...': { ja: '読み込み中...' },
            'Discover Timeless Kyoto': { ja: '永遠の京都を発見' },
            'Your gateway to Japan\'s cultural capital': { ja: '日本の文化首都へのゲートウェイ' },
            'Featured Properties': { ja: 'おすすめ物件' },
            'View All Properties': { ja: 'すべての物件を見る' },
            'Explore Kyoto': { ja: '京都を探す' },
            'Discover the many facets of Japan\'s cultural capital with our comprehensive guides.': { ja: '包括的なガイドで日本の文化首都の多様な側面を発見しましょう。' },
            'Top Activities': { ja: 'トップアクティビティ' },
            'Cultural experiences and authentic adventures': { ja: '文化的体験と本格的な冒険' },
            'Buy House': { ja: '家を買う' },
            'Premium properties in Kyoto\'s finest neighborhoods': { ja: '京都の最高級エリアのプレミアム物件' },
            'Rent House': { ja: '家を借りる' },
            'Flexible accommodation options for your stay': { ja: '滞在のための柔軟な宿泊オプション' },
            'Event Tickets': { ja: 'イベントチケット' },
            'Cultural festivals and traditional celebrations': { ja: '文化祭と伝統的な祝祭' },
            'Bed': { ja: 'ベッド' },
            'Bath': { ja: 'バス' },
            'sqft': { ja: '平方フィート' },
            'Walk Score': { ja: 'ウォークスコア' },
            'Favorite': { ja: 'お気に入り' },
            'Load More': { ja: 'もっと見る' },
            'View All': { ja: 'すべて見る' },
            'Back': { ja: '戻る' },
            'Next': { ja: '次へ' },
            'Previous': { ja: '前へ' },
            'Close': { ja: '閉じる' },
            'Save': { ja: '保存' },
            'Cancel': { ja: 'キャンセル' },
            'Edit': { ja: '編集' },
            'Delete': { ja: '削除' },
            'No results found': { ja: '結果が見つかりません' },
            'An error occurred': { ja: 'エラーが発生しました' },
            'Success!': { ja: '成功！' },
            'Language changed to': { ja: '言語が変更されました：' }
        };

        const translation = commonTranslations[text];
        if (translation && translation[this.currentLanguage]) {
            return translation[this.currentLanguage];
        }

        return text;
    }

    getTranslation(key) {
        const langTranslations = this.translations[this.currentLanguage];
        let translation = langTranslations ? langTranslations[key] : null;
        
        // If translation not found in current language, fall back to English
        if (!translation && this.currentLanguage !== 'en') {
            const englishTranslations = this.translations['en'];
            translation = englishTranslations ? englishTranslations[key] : null;
            console.log(`🌍 Fallback to English for ${key}:`, translation);
        }
        
        console.log(`🌍 getTranslation(${key}) for ${this.currentLanguage}:`, translation);
        return translation;
    }

    updateDynamicContent() {
        // Update property counts
        const featuredCount = document.getElementById('featured-count');
        const premiumCount = document.getElementById('premium-count');
        
        if (featuredCount) {
            const count = featuredCount.textContent;
            const label = this.getTranslation('featured.featured');
            if (label) {
                featuredCount.textContent = count;
            }
        }

        if (premiumCount) {
            const count = premiumCount.textContent;
            const label = this.getTranslation('featured.premium');
            if (label) {
                premiumCount.textContent = count;
            }
        }

        // Update hero stats
        const heroStats = document.querySelectorAll('[id^="hero-total-"]');
        heroStats.forEach(stat => {
            const type = stat.id.replace('hero-total-', '');
            const label = this.getTranslation(`hero.stats.${type}`);
            if (label) {
                const labelElement = stat.previousElementSibling;
                if (labelElement) {
                    labelElement.textContent = label;
                }
            }
        });

        // Update activities dynamic content
        this.updateActivitiesDynamicContent();
    }

    updateActivitiesDynamicContent() {
        // Update activities stats
        const activityStats = document.querySelectorAll('[data-translate^="activities.stats."]');
        activityStats.forEach(stat => {
            const key = stat.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                stat.textContent = translation;
            }
        });

        // Update activities buttons and badges
        const activitiesElements = document.querySelectorAll('[data-translate^="activities."]');
        activitiesElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Force activities manager to re-render if it exists
        if (window.activitiesManager) {
            console.log('🔄 Re-rendering activities after language change...');
            setTimeout(() => {
                window.activitiesManager.displayActivities();
            }, 100);
        }
    }

    setupLanguageChangeListener() {
        window.addEventListener('languageChanged', (event) => {
            console.log('🌍 Language change detected:', event.detail.language);
            this.currentLanguage = event.detail.language;
            this.applyTranslations();
        });
    }

    // Public methods
    changeLanguage(lang) {
        console.log('🌍 TranslationManager changing language to:', lang);
        console.log('🌍 Previous language was:', this.currentLanguage);
        console.log('🌍 Available languages:', Object.keys(this.translations));
        console.log('🌍 Translations for new language:', this.translations[lang]);
        
        this.currentLanguage = lang;
        
        // Test translation
        const testTranslation = this.getTranslation('property.viewDetails');
        console.log('🌍 Test translation for property.viewDetails:', testTranslation);
        
        // Rescan for translatable content and apply translations
        this.scanForTranslatableContent();
        this.applyTranslations();
        
        // Force re-render of dynamic content
        this.updateDynamicContent();
        
        console.log('✅ TranslationManager language changed to:', lang);
        console.log('🌍 Current translations available:', Object.keys(this.translations[lang] || {}));
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Alias for changeLanguage for compatibility
    setLanguage(lang) {
        return this.changeLanguage(lang);
    }

    // Add translatable element dynamically
    addTranslatableElement(element) {
        this.translatableElements.add(element);
        this.translateElement(element);
    }

    // Remove translatable element
    removeTranslatableElement(element) {
        this.translatableElements.delete(element);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌍 DOMContentLoaded - Creating TranslationManager...');
    try {
        window.translationManager = new TranslationManager();
        console.log('✅ TranslationManager created and assigned to window');
    } catch (error) {
        console.error('❌ Error creating TranslationManager:', error);
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationManager;
} 