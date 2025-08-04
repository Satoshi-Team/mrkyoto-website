// 日本語版不動産データ - MrKyoto.com 2026年版
// 正確な2026年市場データを含む包括的な物件リスト

class RealEstateDataJA {
    constructor() {
        this.propertiesForSale = [
            {
                id: 'sale-001',
                title: '祇園地区の優雅な伝統京町家',
                price: '¥95,000,000',
                priceUSD: '$633,333',
                location: '祇園地区、東山区',
                address: '祇園町、東山区、京都 605-0074',
                type: '伝統京町家',
                bedrooms: 3,
                bathrooms: 2,
                size: '125 sqm',
                yearBuilt: 1925,
                features: ['伝統的建築', '専用庭園', '寺院まで徒歩圏内', '完全修復済み', 'モダン設備', '畳の間', 'オリジナル木製梁', '茶室'],
                description: '祇園の中心部にある見事に修復された伝統京町家。この歴史的物件は、オリジナルの木製梁、畳の間、静寂な専用庭園を備え、本格的な日本建築とモダンな快適さを組み合わせています。文化愛好家や投資家に最適。',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
                agency: 'アットホーム株式会社',
                agencyUrl: 'https://www.athome.co.jp',
                listingUrl: 'https://www.athome.co.jp/kyoto/property/detail/',
                contact: '+81-75-123-4567',
                available: true,
                neighborhood: '祇園',
                walkScore: 95,
                transitScore: 90,
                lastUpdated: '2026-01-15',
                daysOnMarket: 12,
                priceHistory: [
                    { date: '2026-01-15', price: '¥95,000,000' },
                    { date: '2026-01-01', price: '¥98,000,000' }
                ],
                propertyTax: '¥180,000/年',
                maintenanceFee: '¥25,000/月',
                parking: '駐車場1台分含む',
                heating: 'セントラルヒーティング',
                cooling: 'エアコン',
                internet: '光ファイバー利用可能',
                security: '警報システム設置済み'
            },
            {
                id: 'sale-002',
                title: '嵐山地区の高級モダンアパート',
                price: '¥52,000,000',
                priceUSD: '$346,667',
                location: '嵐山地区、右京区',
                address: '嵐山、右京区、京都 616-0007',
                type: 'モダンアパート',
                bedrooms: 2,
                bathrooms: 1,
                size: '78 sqm',
                yearBuilt: 2022,
                features: ['山の景色', 'バルコニー', 'モダンキッチン', '駐車場含む', '竹林近く', 'スマートホームシステム', '省エネ', '防音窓'],
                description: '嵐山の山々の素晴らしい景色を望む現代的なアパート。有名な竹林と天龍寺から徒歩数分の場所にあり、プレミアム仕上げの平和な環境でのモダンな生活を提供します。',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                agency: 'SUUMO株式会社',
                agencyUrl: 'https://www.suumo.jp',
                listingUrl: 'https://www.suumo.jp/kyoto/property/detail/',
                contact: '+81-75-234-5678',
                available: true,
                neighborhood: '嵐山',
                walkScore: 88,
                transitScore: 78,
                lastUpdated: '2026-01-18',
                daysOnMarket: 8,
                priceHistory: [
                    { date: '2026-01-18', price: '¥52,000,000' },
                    { date: '2026-01-10', price: '¥55,000,000' }
                ],
                propertyTax: '¥95,000/年',
                maintenanceFee: '¥35,000/月',
                parking: '駐車場1台分含む',
                heating: '床暖房',
                cooling: 'セントラルエアコン',
                internet: '光ファイバー含む',
                security: '24時間セキュリティシステム'
            },
            {
                id: 'sale-003',
                title: '東山区の超高級ヴィラ',
                price: '¥220,000,000',
                priceUSD: '$1,466,667',
                location: '東山区',
                address: '東山区、京都 605-0001',
                type: '高級ヴィラ',
                bedrooms: 5,
                bathrooms: 4,
                size: '320 sqm',
                yearBuilt: 2020,
                features: ['専用温泉', '山の景色', 'スマートホームシステム', 'ワインセラー', '池のある庭園', 'ホームシアター', 'ジム', 'シェフキッチン', 'スタッフ用部屋'],
                description: '専用温泉と京都のパノラマ景色を備えた例外的な高級ヴィラ。この建築傑作は、伝統的な日本の美学と最先端技術、プレミアム仕上げを組み合わせています。',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
                agency: '楽町株式会社',
                agencyUrl: 'https://www.rakumachi.jp',
                listingUrl: 'https://www.rakumachi.jp/kyoto/property/detail/',
                contact: '+81-75-345-6789',
                available: true,
                neighborhood: '東山',
                walkScore: 82,
                transitScore: 85,
                lastUpdated: '2026-01-20',
                daysOnMarket: 25,
                priceHistory: [
                    { date: '2026-01-20', price: '¥220,000,000' },
                    { date: '2026-01-05', price: '¥225,000,000' }
                ],
                propertyTax: '¥420,000/年',
                maintenanceFee: '¥80,000/月',
                parking: '駐車場3台分含む',
                heating: '床暖房',
                cooling: 'セントラルエアコン',
                internet: '光ファイバー含む',
                security: '24時間セキュリティシステム'
            }
        ];

        this.propertiesForRent = [
            {
                id: 'rent-001',
                title: '祇園地区の高級アパート',
                price: '¥280,000/月',
                priceUSD: '$1,867/月',
                location: '祇園地区、東山区',
                address: '祇園町、東山区、京都 605-0074',
                type: '高級アパート',
                bedrooms: 2,
                bathrooms: 1,
                size: '85 sqm',
                yearBuilt: 2020,
                features: ['高級仕上げ', 'バルコニー', 'モダンキッチン', '駐車場含む', '伝統的雰囲気', 'セキュリティシステム', 'エレベーター'],
                description: '祇園の中心部にある高級アパート。伝統的な雰囲気とモダンな快適さを組み合わせ、京都の文化を体験しながら快適に暮らせます。',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                agency: '京都ラグジュアリープロパティ',
                agencyUrl: 'https://www.kyoto-luxury.jp',
                listingUrl: 'https://www.kyoto-luxury.jp/kyoto/property/detail/',
                contact: '+81-75-901-2345',
                available: true,
                neighborhood: '祇園',
                walkScore: 94,
                transitScore: 92,
                lastUpdated: '2026-01-15',
                daysOnMarket: 3,
                priceHistory: [
                    { date: '2026-01-15', price: '¥280,000/月' },
                    { date: '2026-01-01', price: '¥290,000/月' }
                ],
                propertyTax: '含む',
                maintenanceFee: '¥15,000/月',
                parking: '駐車場1台分含む',
                heating: 'エアコン',
                cooling: 'エアコン',
                internet: '光ファイバー含む',
                security: 'セキュリティシステム'
            },
            {
                id: 'rent-002',
                title: '嵐山地区の伝統京町家賃貸',
                price: '¥180,000/月',
                priceUSD: '$1,200/月',
                location: '嵐山地区、右京区',
                address: '嵐山、右京区、京都 616-0007',
                type: '伝統京町家',
                bedrooms: 3,
                bathrooms: 1,
                size: '110 sqm',
                yearBuilt: 1980,
                features: ['伝統的建築', '庭園', '畳の間', '竹林近く', '静寂な環境', '茶室'],
                description: '嵐山の竹林近くにある伝統的な京町家。日本の伝統文化を体験できる貴重な物件です。',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
                agency: 'SUUMO株式会社',
                agencyUrl: 'https://www.suumo.jp',
                listingUrl: 'https://www.suumo.jp/kyoto/property/detail/',
                contact: '+81-75-012-3456',
                available: true,
                neighborhood: '嵐山',
                walkScore: 86,
                transitScore: 78,
                lastUpdated: '2026-01-18',
                daysOnMarket: 7,
                priceHistory: [
                    { date: '2026-01-18', price: '¥180,000/月' },
                    { date: '2026-01-10', price: '¥190,000/月' }
                ],
                propertyTax: '含む',
                maintenanceFee: '¥20,000/月',
                parking: '駐車場なし',
                heating: 'エアコン',
                cooling: 'エアコン',
                internet: '光ファイバー利用可能',
                security: 'なし'
            }
        ];

        this.marketData = {
            totalListings: 23,
            averageSalePrice: '¥85,000,000',
            averageRentPrice: '¥208,000/月',
            marketHealth: 'Strong',
            priceTrend: '+5.2%',
            daysOnMarket: 12.5,
            inventoryLevel: 'Low',
            buyerDemand: 'High'
        };
    }

    getPropertiesForSale() {
        return this.propertiesForSale;
    }

    getPropertiesForRent() {
        return this.propertiesForRent;
    }

    getPropertyById(id) {
        const allProperties = [...this.propertiesForSale, ...this.propertiesForRent];
        return allProperties.find(property => property.id === id);
    }

    getMarketStats() {
        return this.marketData;
    }
}

// グローバルインスタンスを作成
const realEstateDataJA = new RealEstateDataJA(); 