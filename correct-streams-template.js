// Kyoto Live Stream Collection - CORRECT Video IDs from Playlist
// Source: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz
// 
// INSTRUCTIONS: Replace the video IDs below with the actual video IDs from the playlist
// To get video IDs: Right-click each video in playlist → Copy video URL → Extract ID after "v="
// 
// Example: https://www.youtube.com/watch?v=ABC123DEF45 → video ID is "ABC123DEF45"

const playlistStreams = [
    {
        id: 'VIDEO_ID_1_HERE', // Replace with actual video ID from playlist
        title: 'Kyoto Station Bus Terminal',
        description: 'Live view from Kyoto Station bus terminal and surrounding area',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_1_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_2_HERE', // Replace with actual video ID from playlist
        title: 'City Center',
        description: 'Live view from Kyoto city center with temples',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_2_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_3_HERE', // Replace with actual video ID from playlist
        title: 'Station Area',
        description: 'Live view from Kyoto station and surrounding area',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_3_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_4_HERE', // Replace with actual video ID from playlist
        title: 'Temple District',
        description: 'Live view from Kyoto temple district',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_4_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_5_HERE', // Replace with actual video ID from playlist
        title: 'Arashiyama',
        description: 'Live view from Arashiyama bamboo grove',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_5_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_6_HERE', // Replace with actual video ID from playlist
        title: 'Gion District',
        description: 'Live view from Gion geisha district',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_6_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_7_HERE', // Replace with actual video ID from playlist
        title: 'Golden Pavilion',
        description: 'Live view from Kinkaku-ji Golden Pavilion',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_7_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_8_HERE', // Replace with actual video ID from playlist
        title: 'Fushimi Inari',
        description: 'Live view from Fushimi Inari Shrine',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_8_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_9_HERE', // Replace with actual video ID from playlist
        title: 'Nijo Castle',
        description: 'Live view from Nijo Castle',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_9_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_10_HERE', // Replace with actual video ID from playlist
        title: 'Kiyomizu Temple',
        description: 'Live view from Kiyomizu-dera Temple',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_10_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_11_HERE', // Replace with actual video ID from playlist
        title: 'Ryoanji Temple',
        description: 'Live view from Ryoan-ji Temple rock garden',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_11_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_12_HERE', // Replace with actual video ID from playlist
        title: 'Tenryu-ji Temple',
        description: 'Live view from Tenryu-ji Temple and garden',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_12_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_13_HERE', // Replace with actual video ID from playlist
        title: 'Ginkaku-ji Temple',
        description: 'Live view from Ginkaku-ji Silver Pavilion',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_13_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_14_HERE', // Replace with actual video ID from playlist
        title: 'Nishiki Market',
        description: 'Live view from Nishiki traditional market',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_14_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_15_HERE', // Replace with actual video ID from playlist
        title: 'Pontocho Alley',
        description: 'Live view from Pontocho traditional alley',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_15_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_16_HERE', // Replace with actual video ID from playlist
        title: 'Philosopher\'s Path',
        description: 'Live view from Philosopher\'s Path walkway',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_16_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_17_HERE', // Replace with actual video ID from playlist
        title: 'Heian Shrine',
        description: 'Live view from Heian Shrine and garden',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_17_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_18_HERE', // Replace with actual video ID from playlist
        title: 'Sanjusangendo',
        description: 'Live view from Sanjusangendo Temple',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_18_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_19_HERE', // Replace with actual video ID from playlist
        title: 'To-ji Temple',
        description: 'Live view from To-ji Temple and pagoda',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_19_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_20_HERE', // Replace with actual video ID from playlist
        title: 'Daigo-ji Temple',
        description: 'Live view from Daigo-ji Temple complex',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_20_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_21_HERE', // Replace with actual video ID from playlist
        title: 'Byodo-in Temple',
        description: 'Live view from Byodo-in Temple',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_21_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_22_HERE', // Replace with actual video ID from playlist
        title: 'Enryaku-ji Temple',
        description: 'Live view from Enryaku-ji Temple on Mount Hiei',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_22_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_23_HERE', // Replace with actual video ID from playlist
        title: 'Kurama-dera Temple',
        description: 'Live view from Kurama-dera Temple',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_23_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_24_HERE', // Replace with actual video ID from playlist
        title: 'Kibune Shrine',
        description: 'Live view from Kibune Shrine',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_24_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_25_HERE', // Replace with actual video ID from playlist
        title: 'Ohara Village',
        description: 'Live view from Ohara traditional village',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_25_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_26_HERE', // Replace with actual video ID from playlist
        title: 'Uji City',
        description: 'Live view from Uji city and Byodo-in',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_26_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_27_HERE', // Replace with actual video ID from playlist
        title: 'Nara Park',
        description: 'Live view from Nara Park and temples',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_27_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_28_HERE', // Replace with actual video ID from playlist
        title: 'Osaka Castle',
        description: 'Live view from Osaka Castle',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_28_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_29_HERE', // Replace with actual video ID from playlist
        title: 'Himeji Castle',
        description: 'Live view from Himeji Castle',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_29_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_30_HERE', // Replace with actual video ID from playlist
        title: 'Miyajima Island',
        description: 'Live view from Miyajima Island and Itsukushima Shrine',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_30_HERE/maxresdefault.jpg'
    },
    {
        id: 'VIDEO_ID_31_HERE', // Replace with actual video ID from playlist
        title: 'Hiroshima Peace Memorial',
        description: 'Live view from Hiroshima Peace Memorial Park',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_31_HERE/maxresdefault.jpg'
    }
];

console.log('🎥 Template created for 31 streams from YouTube playlist');
console.log('📋 Playlist URL: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz');
console.log('⚠️  Please replace VIDEO_ID_X_HERE with actual video IDs from the playlist'); 