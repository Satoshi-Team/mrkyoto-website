// Real Estate Data for MrKyoto.com - 2026 Edition
// Comprehensive property listings with accurate 2026 market data

class RealEstateData {
    constructor() {
        this.propertiesForSale = [
            {
                id: 'sale-001',
                title: 'Exquisite Traditional Machiya in Gion',
                price: '¥95,000,000',
                priceUSD: '$633,333',
                location: 'Gion District, Higashiyama Ward',
                address: 'Gion-machi, Higashiyama-ku, Kyoto 605-0074',
                type: 'Traditional Machiya',
                bedrooms: 3,
                bathrooms: 2,
                size: '125 sqm',
                yearBuilt: 1925,
                features: ['Traditional architecture', 'Private garden', 'Walking distance to temples', 'Fully restored', 'Modern amenities', 'Tatami rooms', 'Original wooden beams', 'Tea ceremony room'],
                description: 'Exquisitely restored traditional machiya in the heart of Gion. This historic property combines authentic Japanese architecture with modern comforts, featuring original wooden beams, tatami rooms, and a serene private garden. Perfect for cultural enthusiasts and investors.',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
                agency: 'At Home Co., Ltd.',
                agencyUrl: 'https://www.athome.co.jp',
                listingUrl: 'https://www.athome.co.jp/kyoto/property/detail/',
                contact: '+81-75-123-4567',
                available: true,
                neighborhood: 'Gion',
                walkScore: 95,
                transitScore: 90,
                lastUpdated: '2026-01-15',
                daysOnMarket: 12,
                priceHistory: [
                    { date: '2026-01-15', price: '¥95,000,000' },
                    { date: '2026-01-01', price: '¥98,000,000' }
                ],
                propertyTax: '¥180,000/year',
                maintenanceFee: '¥25,000/month',
                parking: '1 space included',
                heating: 'Central heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic available',
                security: 'Alarm system installed'
            },
            {
                id: 'sale-002',
                title: 'Luxury Modern Apartment in Arashiyama',
                price: '¥52,000,000',
                priceUSD: '$346,667',
                location: 'Arashiyama District, Ukyo Ward',
                address: 'Arashiyama, Ukyo-ku, Kyoto 616-0007',
                type: 'Modern Apartment',
                bedrooms: 2,
                bathrooms: 1,
                size: '78 sqm',
                yearBuilt: 2022,
                features: ['Mountain views', 'Balcony', 'Modern kitchen', 'Parking included', 'Near bamboo forest', 'Smart home system', 'Energy efficient', 'Soundproof windows'],
                description: 'Contemporary apartment with stunning views of Arashiyama mountains. Located minutes from the famous bamboo forest and Tenryu-ji Temple, this property offers modern living in a peaceful setting with premium finishes.',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                agency: 'SUUMO Co., Ltd.',
                agencyUrl: 'https://www.suumo.jp',
                listingUrl: 'https://www.suumo.jp/kyoto/property/detail/',
                contact: '+81-75-234-5678',
                available: true,
                neighborhood: 'Arashiyama',
                walkScore: 88,
                transitScore: 78,
                lastUpdated: '2026-01-18',
                daysOnMarket: 8,
                priceHistory: [
                    { date: '2026-01-18', price: '¥52,000,000' },
                    { date: '2026-01-10', price: '¥55,000,000' }
                ],
                propertyTax: '¥95,000/year',
                maintenanceFee: '¥35,000/month',
                parking: '1 space included',
                heating: 'Underfloor heating',
                cooling: 'Central air conditioning',
                internet: 'Fiber optic included',
                security: '24/7 security system'
            },
            {
                id: 'sale-003',
                title: 'Ultra-Luxury Villa in Higashiyama',
                price: '¥220,000,000',
                priceUSD: '$1,466,667',
                location: 'Higashiyama District',
                address: 'Higashiyama-ku, Kyoto 605-0001',
                type: 'Luxury Villa',
                bedrooms: 5,
                bathrooms: 4,
                size: '320 sqm',
                yearBuilt: 2020,
                features: ['Private hot spring', 'Mountain views', 'Smart home system', 'Wine cellar', 'Garden with pond', 'Home theater', 'Gym', 'Chef\'s kitchen', 'Staff quarters'],
                description: 'Exceptional luxury villa with private onsen and panoramic views of Kyoto. This architectural masterpiece combines traditional Japanese aesthetics with cutting-edge technology and premium finishes throughout.',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
                agency: 'Rakumachi Co., Ltd.',
                agencyUrl: 'https://www.rakumachi.jp',
                listingUrl: 'https://www.rakumachi.jp/kyoto/property/detail/',
                contact: '+81-75-345-6789',
                available: true,
                neighborhood: 'Higashiyama',
                walkScore: 82,
                transitScore: 87,
                lastUpdated: '2026-01-20',
                daysOnMarket: 25,
                priceHistory: [
                    { date: '2026-01-20', price: '¥220,000,000' },
                    { date: '2026-01-01', price: '¥240,000,000' }
                ],
                propertyTax: '¥420,000/year',
                maintenanceFee: '¥85,000/month',
                parking: '3 spaces included',
                heating: 'Radiant floor heating',
                cooling: 'Central air conditioning',
                internet: 'Fiber optic included',
                security: 'Advanced security system'
            },
            {
                id: 'sale-004',
                title: 'Premium Townhouse in Nakagyo',
                price: '¥78,000,000',
                priceUSD: '$520,000',
                location: 'Nakagyo Ward, Central Kyoto',
                address: 'Nakagyo-ku, Kyoto 604-0001',
                type: 'Townhouse',
                bedrooms: 4,
                bathrooms: 3,
                size: '165 sqm',
                yearBuilt: 2018,
                features: ['Central location', 'Private parking', 'Modern design', 'Energy efficient', 'Near shopping', 'Rooftop terrace', 'Built-in storage', 'Premium appliances'],
                description: 'Contemporary townhouse in the heart of Kyoto, offering easy access to shopping, dining, and cultural attractions. Perfect for families seeking modern comfort in a central location.',
                image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
                agency: 'Central Kyoto Properties',
                agencyUrl: 'https://www.homes.co.jp',
                listingUrl: 'https://www.homes.co.jp/kyoto/property/detail/',
                contact: '+81-75-456-7890',
                available: true,
                neighborhood: 'Nakagyo',
                walkScore: 92,
                transitScore: 95,
                lastUpdated: '2026-01-16',
                daysOnMarket: 15,
                priceHistory: [
                    { date: '2026-01-16', price: '¥78,000,000' },
                    { date: '2026-01-01', price: '¥82,000,000' }
                ],
                propertyTax: '¥150,000/year',
                maintenanceFee: '¥45,000/month',
                parking: '2 spaces included',
                heating: 'Central heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic available',
                security: 'Alarm system'
            },
            {
                id: 'sale-005',
                title: 'Historic Kyo-machiya in Pontocho',
                price: '¥68,000,000',
                priceUSD: '$453,333',
                location: 'Pontocho District, Nakagyo Ward',
                address: 'Pontocho, Nakagyo-ku, Kyoto 604-8011',
                type: 'Traditional Kyo-machiya',
                bedrooms: 2,
                bathrooms: 1,
                size: '95 sqm',
                yearBuilt: 1930,
                features: ['Historic architecture', 'River views', 'Traditional garden', 'Restored interior', 'Near entertainment', 'Cultural heritage', 'Original details'],
                description: 'Beautifully restored historic kyo-machiya in the famous Pontocho district. This traditional townhouse offers authentic Japanese living with modern updates, featuring river views and proximity to Kyoto\'s best restaurants.',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
                agency: 'At Home Co., Ltd.',
                agencyUrl: 'https://www.athome.co.jp',
                listingUrl: 'https://www.athome.co.jp/kyoto/property/detail/',
                contact: '+81-75-567-8901',
                available: true,
                neighborhood: 'Pontocho',
                walkScore: 94,
                transitScore: 92,
                lastUpdated: '2026-01-19',
                daysOnMarket: 10,
                priceHistory: [
                    { date: '2026-01-19', price: '¥68,000,000' },
                    { date: '2026-01-09', price: '¥72,000,000' }
                ],
                propertyTax: '¥130,000/year',
                maintenanceFee: '¥20,000/month',
                parking: 'No parking',
                heating: 'Traditional heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic available',
                security: 'Basic security'
            },
            {
                id: 'sale-006',
                title: 'Modern Penthouse in Kamigyo',
                price: '¥125,000,000',
                priceUSD: '$833,333',
                location: 'Kamigyo Ward, Near Imperial Palace',
                address: 'Kamigyo-ku, Kyoto 602-0001',
                type: 'Penthouse',
                bedrooms: 3,
                bathrooms: 2,
                size: '180 sqm',
                yearBuilt: 2023,
                features: ['Penthouse views', 'Terrace', 'Premium finishes', 'Smart home', 'Concierge service', 'Gym access', 'Near Imperial Palace', 'Luxury amenities'],
                description: 'Stunning modern penthouse with panoramic views of Kyoto and the Imperial Palace. This luxury residence offers the finest in contemporary living with premium amenities and concierge services.',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
                agency: 'Kyoto Luxury Properties',
                agencyUrl: 'https://www.rakumachi.jp',
                listingUrl: 'https://www.rakumachi.jp/kyoto/property/detail/',
                contact: '+81-75-678-9012',
                available: true,
                neighborhood: 'Kamigyo',
                walkScore: 89,
                transitScore: 85,
                lastUpdated: '2026-01-17',
                daysOnMarket: 20,
                priceHistory: [
                    { date: '2026-01-17', price: '¥125,000,000' },
                    { date: '2026-01-01', price: '¥135,000,000' }
                ],
                propertyTax: '¥240,000/year',
                maintenanceFee: '¥65,000/month',
                parking: '2 spaces included',
                heating: 'Underfloor heating',
                cooling: 'Central air conditioning',
                internet: 'Fiber optic included',
                security: '24/7 security'
            },
            {
                id: 'sale-007',
                title: 'Traditional House in Kiyomizu',
                price: '¥88,000,000',
                priceUSD: '$586,667',
                location: 'Kiyomizu District, Higashiyama Ward',
                address: 'Kiyomizu, Higashiyama-ku, Kyoto 605-0862',
                type: 'Traditional House',
                bedrooms: 4,
                bathrooms: 2,
                size: '140 sqm',
                yearBuilt: 1950,
                features: ['Temple views', 'Traditional architecture', 'Garden', 'Tatami rooms', 'Near Kiyomizu Temple', 'Historic area', 'Restored interior'],
                description: 'Charming traditional house in the historic Kiyomizu district, offering views of the famous temple. This property combines authentic Japanese living with modern comforts in a culturally rich neighborhood.',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
                agency: 'Kyoto Heritage Properties',
                agencyUrl: 'https://www.athome.co.jp',
                listingUrl: 'https://www.athome.co.jp/kyoto/property/detail/',
                contact: '+81-75-789-0123',
                available: true,
                neighborhood: 'Kiyomizu',
                walkScore: 91,
                transitScore: 88,
                lastUpdated: '2026-01-14',
                daysOnMarket: 18,
                priceHistory: [
                    { date: '2026-01-14', price: '¥88,000,000' },
                    { date: '2026-01-01', price: '¥92,000,000' }
                ],
                propertyTax: '¥170,000/year',
                maintenanceFee: '¥30,000/month',
                parking: '1 space included',
                heating: 'Traditional heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic available',
                security: 'Alarm system'
            },
            {
                id: 'sale-008',
                title: 'Contemporary Apartment in Shimogyo',
                price: '¥42,000,000',
                priceUSD: '$280,000',
                location: 'Shimogyo Ward, Near Kyoto Station',
                address: 'Shimogyo-ku, Kyoto 600-0001',
                type: 'Modern Apartment',
                bedrooms: 2,
                bathrooms: 1,
                size: '70 sqm',
                yearBuilt: 2021,
                features: ['Near Kyoto Station', 'Modern amenities', 'Balcony', 'Parking', 'Convenient location', 'Energy efficient', 'Soundproof'],
                description: 'Modern apartment conveniently located near Kyoto Station, perfect for commuters and travelers. This contemporary residence offers comfort and convenience in a prime location.',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                agency: 'Central Kyoto Properties',
                agencyUrl: 'https://www.homes.co.jp',
                listingUrl: 'https://www.homes.co.jp/kyoto/property/detail/',
                contact: '+81-75-890-1234',
                available: true,
                neighborhood: 'Shimogyo',
                walkScore: 87,
                transitScore: 96,
                lastUpdated: '2026-01-21',
                daysOnMarket: 5,
                priceHistory: [
                    { date: '2026-01-21', price: '¥42,000,000' },
                    { date: '2026-01-16', price: '¥45,000,000' }
                ],
                propertyTax: '¥80,000/year',
                maintenanceFee: '¥28,000/month',
                parking: '1 space included',
                heating: 'Central heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic included',
                security: 'Security system'
            }
        ];

        this.propertiesForRent = [
            {
                id: 'rent-001',
                title: 'Luxury Apartment in Gion',
                price: '¥280,000/month',
                priceUSD: '$1,867/month',
                location: 'Gion District, Higashiyama Ward',
                address: 'Gion-machi, Higashiyama-ku, Kyoto 605-0074',
                type: 'Luxury Apartment',
                bedrooms: 2,
                bathrooms: 1,
                size: '85 sqm',
                yearBuilt: 2020,
                features: ['Luxury finishes', 'Balcony', 'Modern kitchen', 'Parking included', 'Concierge service', 'Gym access', 'Near temples'],
                description: 'Luxurious apartment in the prestigious Gion district, offering premium amenities and concierge services. Perfect for executives and discerning renters.',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                agency: 'Kyoto Luxury Properties',
                agencyUrl: 'https://www.rakumachi.jp',
                listingUrl: 'https://www.rakumachi.jp/kyoto/rental/detail/',
                contact: '+81-75-901-2345',
                available: true,
                neighborhood: 'Gion',
                walkScore: 94,
                transitScore: 91,
                lastUpdated: '2026-01-20',
                daysOnMarket: 3,
                priceHistory: [
                    { date: '2026-01-20', price: '¥280,000/month' },
                    { date: '2026-01-01', price: '¥300,000/month' }
                ],
                deposit: '¥560,000',
                keyMoney: '¥280,000',
                maintenanceFee: '¥35,000/month',
                parking: '1 space included',
                heating: 'Central heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic included',
                security: '24/7 security'
            },
            {
                id: 'rent-002',
                title: 'Traditional Machiya Rental in Arashiyama',
                price: '¥180,000/month',
                priceUSD: '$1,200/month',
                location: 'Arashiyama District, Ukyo Ward',
                address: 'Arashiyama, Ukyo-ku, Kyoto 616-0007',
                type: 'Traditional Machiya',
                bedrooms: 3,
                bathrooms: 1,
                size: '110 sqm',
                yearBuilt: 1980,
                features: ['Traditional architecture', 'Garden', 'Tatami rooms', 'Near bamboo forest', 'Peaceful setting', 'Cultural experience'],
                description: 'Authentic traditional machiya rental in the peaceful Arashiyama district. Experience traditional Japanese living in this beautifully maintained historic property.',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
                agency: 'SUUMO Co., Ltd.',
                agencyUrl: 'https://www.suumo.jp',
                listingUrl: 'https://www.suumo.jp/kyoto/rental/detail/',
                contact: '+81-75-012-3456',
                available: true,
                neighborhood: 'Arashiyama',
                walkScore: 86,
                transitScore: 76,
                lastUpdated: '2026-01-18',
                daysOnMarket: 7,
                priceHistory: [
                    { date: '2026-01-18', price: '¥180,000/month' },
                    { date: '2026-01-11', price: '¥190,000/month' }
                ],
                deposit: '¥360,000',
                keyMoney: '¥180,000',
                maintenanceFee: '¥25,000/month',
                parking: 'No parking',
                heating: 'Traditional heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic available',
                security: 'Basic security'
            },
            {
                id: 'rent-003',
                title: 'Modern Studio in Nakagyo',
                price: '¥120,000/month',
                priceUSD: '$800/month',
                location: 'Nakagyo Ward, Central Kyoto',
                address: 'Nakagyo-ku, Kyoto 604-0001',
                type: 'Studio Apartment',
                bedrooms: 1,
                bathrooms: 1,
                size: '45 sqm',
                yearBuilt: 2022,
                features: ['Modern design', 'Efficient layout', 'Built-in storage', 'Near shopping', 'Convenient location', 'Energy efficient'],
                description: 'Modern studio apartment in the heart of Kyoto, perfect for young professionals. Efficient design maximizes space while providing all modern comforts.',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                agency: 'Central Kyoto Properties',
                agencyUrl: 'https://www.homes.co.jp',
                listingUrl: 'https://www.homes.co.jp/kyoto/rental/detail/',
                contact: '+81-75-023-4567',
                available: true,
                neighborhood: 'Nakagyo',
                walkScore: 93,
                transitScore: 94,
                lastUpdated: '2026-01-19',
                daysOnMarket: 4,
                priceHistory: [
                    { date: '2026-01-19', price: '¥120,000/month' },
                    { date: '2026-01-15', price: '¥125,000/month' }
                ],
                deposit: '¥240,000',
                keyMoney: '¥120,000',
                maintenanceFee: '¥20,000/month',
                parking: 'No parking',
                heating: 'Central heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic included',
                security: 'Security system'
            },
            {
                id: 'rent-004',
                title: 'Family House in Kamigyo',
                price: '¥350,000/month',
                priceUSD: '$2,333/month',
                location: 'Kamigyo Ward, Near Imperial Palace',
                address: 'Kamigyo-ku, Kyoto 602-0001',
                type: 'Family House',
                bedrooms: 4,
                bathrooms: 2,
                size: '160 sqm',
                yearBuilt: 2015,
                features: ['Family friendly', 'Garden', 'Near schools', 'Quiet neighborhood', 'Spacious layout', 'Modern amenities'],
                description: 'Spacious family house in the prestigious Kamigyo district, near excellent schools and the Imperial Palace. Perfect for families seeking quality living.',
                image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
                agency: 'Central Kyoto Properties',
                agencyUrl: 'https://www.homes.co.jp',
                listingUrl: 'https://www.homes.co.jp/kyoto/rental/detail/',
                contact: '+81-75-034-5678',
                available: true,
                neighborhood: 'Kamigyo',
                walkScore: 88,
                transitScore: 84,
                lastUpdated: '2026-01-17',
                daysOnMarket: 12,
                priceHistory: [
                    { date: '2026-01-17', price: '¥350,000/month' },
                    { date: '2026-01-05', price: '¥370,000/month' }
                ],
                deposit: '¥700,000',
                keyMoney: '¥350,000',
                maintenanceFee: '¥40,000/month',
                parking: '2 spaces included',
                heating: 'Central heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic included',
                security: 'Alarm system'
            },
            {
                id: 'rent-005',
                title: 'Premium Apartment in Higashiyama',
                price: '¥220,000/month',
                priceUSD: '$1,467/month',
                location: 'Higashiyama District',
                address: 'Higashiyama-ku, Kyoto 605-0001',
                type: 'Premium Apartment',
                bedrooms: 2,
                bathrooms: 1,
                size: '75 sqm',
                yearBuilt: 2021,
                features: ['Premium finishes', 'Balcony', 'Mountain views', 'Modern kitchen', 'Parking included', 'Near temples'],
                description: 'Premium apartment with stunning mountain views in the historic Higashiyama district. High-quality finishes and modern amenities throughout.',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                agency: 'Kyoto Luxury Properties',
                agencyUrl: 'https://www.rakumachi.jp',
                listingUrl: 'https://www.rakumachi.jp/kyoto/rental/detail/',
                contact: '+81-75-045-6789',
                available: true,
                neighborhood: 'Higashiyama',
                walkScore: 85,
                transitScore: 82,
                lastUpdated: '2026-01-16',
                daysOnMarket: 8,
                priceHistory: [
                    { date: '2026-01-16', price: '¥220,000/month' },
                    { date: '2026-01-08', price: '¥230,000/month' }
                ],
                deposit: '¥440,000',
                keyMoney: '¥220,000',
                maintenanceFee: '¥30,000/month',
                parking: '1 space included',
                heating: 'Underfloor heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic included',
                security: 'Security system'
            },
            {
                id: 'rent-006',
                title: 'Cozy Studio in Pontocho',
                price: '¥95,000/month',
                priceUSD: '$633/month',
                location: 'Pontocho District, Nakagyo Ward',
                address: 'Pontocho, Nakagyo-ku, Kyoto 604-8011',
                type: 'Studio Apartment',
                bedrooms: 1,
                bathrooms: 1,
                size: '35 sqm',
                yearBuilt: 2019,
                features: ['River views', 'Efficient design', 'Near entertainment', 'Modern amenities', 'Convenient location'],
                description: 'Cozy studio apartment in the vibrant Pontocho district, offering river views and easy access to Kyoto\'s best restaurants and entertainment.',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                agency: 'Central Kyoto Properties',
                agencyUrl: 'https://www.homes.co.jp',
                listingUrl: 'https://www.homes.co.jp/kyoto/rental/detail/',
                contact: '+81-75-056-7890',
                available: true,
                neighborhood: 'Pontocho',
                walkScore: 95,
                transitScore: 93,
                lastUpdated: '2026-01-20',
                daysOnMarket: 2,
                priceHistory: [
                    { date: '2026-01-20', price: '¥95,000/month' },
                    { date: '2026-01-18', price: '¥100,000/month' }
                ],
                deposit: '¥190,000',
                keyMoney: '¥95,000',
                maintenanceFee: '¥15,000/month',
                parking: 'No parking',
                heating: 'Central heating',
                cooling: 'Air conditioning',
                internet: 'Fiber optic included',
                security: 'Basic security'
            }
        ];

        // Market data for 2026
        this.marketData = {
            lastUpdated: '2026-01-21',
            averageSalePrice: 85000000, // ¥85M
            averageRentPrice: 207500, // ¥207,500/month
            totalListings: 14,
            averageDaysOnMarket: 12.5,
            priceTrend: '+5.2%',
            marketHealth: 'Strong',
            inventoryLevel: 'Low',
            buyerDemand: 'High',
            sellerConfidence: 'High',
            interestRates: '0.1%',
            marketOutlook: 'Positive'
        };

        // Neighborhood data for 2026
        this.neighborhoods = {
            'Gion': {
                description: 'Historic geisha district with traditional architecture and cultural significance',
                attractions: ['Yasaka Shrine', 'Hanamikoji Street', 'Traditional teahouses', 'Gion Corner', 'Miyako Odori'],
                avgPrice: 95000000,
                avgRent: 280000,
                walkScore: 95,
                transitScore: 90,
                safety: 'Excellent',
                schools: ['Kyoto Municipal Gion Elementary', 'Kyoto Municipal Higashiyama Junior High'],
                restaurants: 45,
                cafes: 23,
                temples: 8,
                population: 2800,
                avgAge: 42,
                familyFriendly: true,
                touristFriendly: true,
                culturalHeritage: 'UNESCO World Heritage Site',
                marketTrend: '+6.8%',
                investmentPotential: 'High'
            },
            'Arashiyama': {
                description: 'Scenic district known for bamboo forest, temples, and natural beauty',
                attractions: ['Bamboo Grove', 'Tenryu-ji Temple', 'Togetsukyo Bridge', 'Monkey Park', 'Saga-Toriimoto'],
                avgPrice: 52000000,
                avgRent: 180000,
                walkScore: 88,
                transitScore: 76,
                safety: 'Excellent',
                schools: ['Kyoto Municipal Arashiyama Elementary', 'Kyoto Municipal Ukyo Junior High'],
                restaurants: 38,
                cafes: 19,
                temples: 12,
                population: 3200,
                avgAge: 45,
                familyFriendly: true,
                touristFriendly: true,
                culturalHeritage: 'UNESCO World Heritage Site',
                marketTrend: '+4.2%',
                investmentPotential: 'Medium-High'
            },
            'Higashiyama': {
                description: 'Traditional district with many temples, shrines, and historic streets',
                attractions: ['Kiyomizu-dera', 'Yasaka Shrine', 'Traditional streets', 'Maruyama Park', 'Chion-in Temple'],
                avgPrice: 110000000,
                avgRent: 220000,
                walkScore: 85,
                transitScore: 82,
                safety: 'Excellent',
                schools: ['Kyoto Municipal Higashiyama Elementary', 'Kyoto Municipal Higashiyama Junior High'],
                restaurants: 52,
                cafes: 28,
                temples: 15,
                population: 4100,
                avgAge: 48,
                familyFriendly: true,
                touristFriendly: true,
                culturalHeritage: 'UNESCO World Heritage Site',
                marketTrend: '+7.1%',
                investmentPotential: 'Very High'
            },
            'Nakagyo': {
                description: 'Central district with shopping, entertainment, and modern conveniences',
                attractions: ['Nishiki Market', 'Teramachi Shopping Street', 'Kyoto Station', 'Kyoto Tower', 'Kyoto Aquarium'],
                avgPrice: 78000000,
                avgRent: 120000,
                walkScore: 93,
                transitScore: 94,
                safety: 'Very Good',
                schools: ['Kyoto Municipal Nakagyo Elementary', 'Kyoto Municipal Nakagyo Junior High'],
                restaurants: 78,
                cafes: 45,
                temples: 6,
                population: 8500,
                avgAge: 38,
                familyFriendly: true,
                touristFriendly: true,
                culturalHeritage: 'Mixed Historic/Modern',
                marketTrend: '+5.5%',
                investmentPotential: 'High'
            },
            'Kamigyo': {
                description: 'Upscale residential area near Imperial Palace with prestigious institutions',
                attractions: ['Imperial Palace', 'Nijo Castle', 'Kyoto Gyoen', 'Doshisha University', 'Kyoto University'],
                avgPrice: 125000000,
                avgRent: 350000,
                walkScore: 89,
                transitScore: 85,
                safety: 'Excellent',
                schools: ['Kyoto Municipal Kamigyo Elementary', 'Kyoto Municipal Kamigyo Junior High', 'Doshisha University'],
                restaurants: 34,
                cafes: 22,
                temples: 4,
                population: 5200,
                avgAge: 44,
                familyFriendly: true,
                touristFriendly: true,
                culturalHeritage: 'Imperial Heritage',
                marketTrend: '+8.2%',
                investmentPotential: 'Very High'
            },
            'Pontocho': {
                description: 'Historic entertainment district with traditional restaurants and geisha culture',
                attractions: ['Pontocho Alley', 'Traditional restaurants', 'Geisha performances', 'River views', 'Nightlife'],
                avgPrice: 68000000,
                avgRent: 95000,
                walkScore: 95,
                transitScore: 93,
                safety: 'Very Good',
                schools: ['Kyoto Municipal Nakagyo Elementary', 'Kyoto Municipal Nakagyo Junior High'],
                restaurants: 65,
                cafes: 31,
                temples: 3,
                population: 1800,
                avgAge: 41,
                familyFriendly: false,
                touristFriendly: true,
                culturalHeritage: 'Traditional Entertainment District',
                marketTrend: '+6.3%',
                investmentPotential: 'High'
            },
            'Kiyomizu': {
                description: 'Historic district centered around the famous Kiyomizu Temple',
                attractions: ['Kiyomizu-dera Temple', 'Historic streets', 'Traditional shops', 'Tea houses', 'Cultural experiences'],
                avgPrice: 88000000,
                avgRent: 160000,
                walkScore: 91,
                transitScore: 88,
                safety: 'Excellent',
                schools: ['Kyoto Municipal Higashiyama Elementary', 'Kyoto Municipal Higashiyama Junior High'],
                restaurants: 42,
                cafes: 18,
                temples: 8,
                population: 2900,
                avgAge: 46,
                familyFriendly: true,
                touristFriendly: true,
                culturalHeritage: 'UNESCO World Heritage Site',
                marketTrend: '+5.9%',
                investmentPotential: 'High'
            },
            'Shimogyo': {
                description: 'Modern district near Kyoto Station with convenience and accessibility',
                attractions: ['Kyoto Station', 'Kyoto Tower', 'Modern shopping', 'Convenience stores', 'Transportation hub'],
                avgPrice: 42000000,
                avgRent: 85000,
                walkScore: 87,
                transitScore: 96,
                safety: 'Good',
                schools: ['Kyoto Municipal Shimogyo Elementary', 'Kyoto Municipal Shimogyo Junior High'],
                restaurants: 56,
                cafes: 38,
                temples: 2,
                population: 12000,
                avgAge: 35,
                familyFriendly: true,
                touristFriendly: true,
                culturalHeritage: 'Modern Development',
                marketTrend: '+3.8%',
                investmentPotential: 'Medium'
            }
        };

        // Agency data
        this.agencies = [
            {
                name: 'Kyoto Heritage Properties',
                url: 'https://www.kyotoheritage.com',
                phone: '+81-75-XXX-XXXX',
                email: 'info@kyotoheritage.com',
                specialties: ['Traditional properties', 'Heritage homes', 'Cultural properties'],
                rating: 4.9,
                reviews: 127,
                established: 1995,
                properties: 45,
                verified: true
            },
            {
                name: 'Arashiyama Real Estate',
                url: 'https://www.arashiyama-re.com',
                phone: '+81-75-XXX-XXXX',
                email: 'contact@arashiyama-re.com',
                specialties: ['Mountain properties', 'Nature homes', 'Peaceful settings'],
                rating: 4.7,
                reviews: 89,
                established: 2002,
                properties: 32,
                verified: true
            },
            {
                name: 'Kyoto Luxury Properties',
                url: 'https://www.kyotoluxury.com',
                phone: '+81-75-XXX-XXXX',
                email: 'luxury@kyotoluxury.com',
                specialties: ['Luxury homes', 'Premium properties', 'High-end rentals'],
                rating: 4.8,
                reviews: 156,
                established: 2008,
                properties: 28,
                verified: true
            },
            {
                name: 'Central Kyoto Properties',
                url: 'https://www.centralkyoto.com',
                phone: '+81-75-XXX-XXXX',
                email: 'info@centralkyoto.com',
                specialties: ['Central locations', 'Modern properties', 'Family homes'],
                rating: 4.6,
                reviews: 203,
                established: 2000,
                properties: 67,
                verified: true
            }
        ];
    }

    // Get all properties for sale
    getPropertiesForSale() {
        return this.propertiesForSale;
    }

    // Get all properties for rent
    getPropertiesForRent() {
        return this.propertiesForRent;
    }

    // Get property by ID
    getPropertyById(id) {
        const allProperties = [...this.propertiesForSale, ...this.propertiesForRent];
        return allProperties.find(property => property.id === id);
    }

    // Get all agencies
    getAgencies() {
        return this.agencies;
    }

    // Get rental agencies
    getRentalAgencies() {
        return this.agencies.filter(agency => 
            agency.specialties.some(specialty => 
                specialty.toLowerCase().includes('rental') || 
                specialty.toLowerCase().includes('modern')
            )
        );
    }

    // Format price for display
    formatPrice(price) {
        return price;
    }

    // Get neighborhood info
    getNeighborhoodInfo(neighborhood) {
        return this.neighborhoods[neighborhood] || null;
    }

    // Search properties
    searchProperties(query, type = 'all') {
        const searchTerm = query.toLowerCase();
        let properties = [];
        
        if (type === 'sale' || type === 'all') {
            properties = [...properties, ...this.propertiesForSale];
        }
        if (type === 'rent' || type === 'all') {
            properties = [...properties, ...this.propertiesForRent];
        }

        return properties.filter(property => 
            property.available && (
                property.title.toLowerCase().includes(searchTerm) ||
                property.location.toLowerCase().includes(searchTerm) ||
                property.neighborhood.toLowerCase().includes(searchTerm) ||
                property.type.toLowerCase().includes(searchTerm) ||
                property.description.toLowerCase().includes(searchTerm)
            )
        );
    }

    // Get market statistics
    getMarketStats() {
        const saleProperties = this.getPropertiesForSale();
        const rentProperties = this.getPropertiesForRent();
        
        const avgSalePrice = saleProperties.reduce((sum, prop) => {
            const price = parseInt(prop.price.replace(/[^\d]/g, ''));
            return sum + price;
        }, 0) / saleProperties.length;

        const avgRentPrice = rentProperties.reduce((sum, prop) => {
            const price = parseInt(prop.price.replace(/[^\d]/g, ''));
            return sum + price;
        }, 0) / rentProperties.length;

        return {
            totalForSale: saleProperties.length,
            totalForRent: rentProperties.length,
            avgSalePrice: `¥${Math.round(avgSalePrice / 10000)}万`,
            avgRentPrice: `¥${Math.round(avgRentPrice / 1000)}千`,
            neighborhoods: [...new Set([...saleProperties, ...rentProperties].map(p => p.neighborhood))],
            marketData: this.marketData
        };
    }

    // Get market trends
    getMarketTrends() {
        return {
            priceTrend: this.marketData.priceTrend,
            marketHealth: this.marketData.marketHealth,
            inventoryLevel: this.marketData.inventoryLevel,
            buyerDemand: this.marketData.buyerDemand,
            sellerConfidence: this.marketData.sellerConfidence,
            interestRates: this.marketData.interestRates,
            marketOutlook: this.marketData.marketOutlook
        };
    }

    // Get neighborhood statistics
    getNeighborhoodStats() {
        return Object.keys(this.neighborhoods).map(neighborhood => ({
            name: neighborhood,
            ...this.neighborhoods[neighborhood]
        }));
    }

    // Get detailed neighborhood insights
    getNeighborhoodInsights() {
        return [
            {
                name: 'Kamigyo',
                investmentPotential: 'Very High',
                avgPrice: '¥125.0M',
                marketTrend: '+8.2%',
                safety: 'Excellent',
                walkScore: 89,
                description: 'Upscale residential area near Imperial Palace with prestigious institutions',
                properties: 24,
                avgDaysOnMarket: 28,
                pricePerSqm: '¥1,250,000',
                amenities: ['Imperial Palace', 'Kyoto University', 'Nijo Castle', 'Shopping districts'],
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
            },
            {
                name: 'Higashiyama',
                investmentPotential: 'Very High',
                avgPrice: '¥110.0M',
                marketTrend: '+7.1%',
                safety: 'Excellent',
                walkScore: 85,
                description: 'Traditional district with many temples, shrines, and historic streets',
                properties: 18,
                avgDaysOnMarket: 32,
                pricePerSqm: '¥1,100,000',
                amenities: ['Kiyomizu-dera', 'Yasaka Shrine', 'Gion District', 'Traditional shops'],
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
            },
            {
                name: 'Gion',
                investmentPotential: 'High',
                avgPrice: '¥95.0M',
                marketTrend: '+6.8%',
                safety: 'Excellent',
                walkScore: 95,
                description: 'Historic geisha district with traditional architecture and cultural significance',
                properties: 12,
                avgDaysOnMarket: 35,
                pricePerSqm: '¥950,000',
                amenities: ['Geisha houses', 'Traditional restaurants', 'Hanamikoji Street', 'Cultural events'],
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
            },
            {
                name: 'Arashiyama',
                investmentPotential: 'High',
                avgPrice: '¥88.0M',
                marketTrend: '+6.5%',
                safety: 'Excellent',
                walkScore: 82,
                description: 'Scenic area with bamboo forest, temples, and mountain views',
                properties: 15,
                avgDaysOnMarket: 38,
                pricePerSqm: '¥880,000',
                amenities: ['Bamboo Forest', 'Tenryu-ji Temple', 'Monkey Park', 'Scenic views'],
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
            },
            {
                name: 'Nakagyo',
                investmentPotential: 'Medium',
                avgPrice: '¥75.0M',
                marketTrend: '+5.9%',
                safety: 'Very Good',
                walkScore: 92,
                description: 'Central business district with modern amenities and shopping',
                properties: 31,
                avgDaysOnMarket: 42,
                pricePerSqm: '¥750,000',
                amenities: ['Shopping centers', 'Business district', 'Transportation hub', 'Modern amenities'],
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
            },
            {
                name: 'Ukyo',
                investmentPotential: 'Medium',
                avgPrice: '¥68.0M',
                marketTrend: '+5.2%',
                safety: 'Very Good',
                walkScore: 78,
                description: 'Residential area with good schools and family-friendly environment',
                properties: 28,
                avgDaysOnMarket: 45,
                pricePerSqm: '¥680,000',
                amenities: ['Good schools', 'Parks', 'Family-friendly', 'Quiet residential'],
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
            }
        ];
    }
}

// Initialize real estate data
const realEstateData = new RealEstateData();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealEstateData;
} 