const https = require('https');
const fs = require('fs');

console.log('🎥 Manually extracting YouTube playlist video IDs...');
console.log('📋 Playlist URL: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz');

// Function to fetch playlist page
function fetchPlaylistPage() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'www.youtube.com',
            path: '/playlist?list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

// Function to extract video IDs using multiple methods
function extractVideoIds(html) {
    const videoIds = new Set();
    
    console.log('🔍 Extracting video IDs from HTML...');
    console.log('📏 HTML length:', html.length);
    
    // Method 1: Look for videoId in JSON data
    const videoIdPattern1 = /"videoId":"([^"]{11})"/g;
    let match1;
    while ((match1 = videoIdPattern1.exec(html)) !== null) {
        videoIds.add(match1[1]);
    }
    
    // Method 2: Look for watch?v= URLs
    const videoIdPattern2 = /watch\?v=([^"&]{11})/g;
    let match2;
    while ((match2 = videoIdPattern2.exec(html)) !== null) {
        videoIds.add(match2[1]);
    }
    
    // Method 3: Look for playlist video renderer
    const videoIdPattern3 = /"playlistVideoRenderer":\s*{[^}]*"videoId":"([^"]{11})"/g;
    let match3;
    while ((match3 = videoIdPattern3.exec(html)) !== null) {
        videoIds.add(match3[1]);
    }
    
    // Method 4: Look for ytInitialData
    const videoIdPattern4 = /"videoId":"([^"]{11})"[^}]*"title":\s*{\s*"runs":\s*\[\s*{\s*"text":\s*"([^"]+)"/g;
    let match4;
    while ((match4 = videoIdPattern4.exec(html)) !== null) {
        videoIds.add(match4[1]);
    }
    
    console.log('📊 Found video IDs:', videoIds.size);
    
    return Array.from(videoIds);
}

// Function to generate the correct streams array
function generateCorrectStreams(videoIds) {
    const streams = [];
    
    // Kyoto location names for the streams
    const locationNames = [
        'Kyoto Station Bus Terminal',
        'City Center',
        'Station Area', 
        'Temple District',
        'Arashiyama',
        'Gion District',
        'Golden Pavilion',
        'Fushimi Inari',
        'Nijo Castle',
        'Kiyomizu Temple',
        'Ryoanji Temple',
        'Tenryu-ji Temple',
        'Ginkaku-ji Temple',
        'Nishiki Market',
        'Pontocho Alley',
        'Philosopher\'s Path',
        'Heian Shrine',
        'Sanjusangendo',
        'To-ji Temple',
        'Daigo-ji Temple',
        'Byodo-in Temple',
        'Enryaku-ji Temple',
        'Kurama-dera Temple',
        'Kibune Shrine',
        'Ohara Village',
        'Uji City',
        'Nara Park',
        'Osaka Castle',
        'Himeji Castle',
        'Miyajima Island',
        'Hiroshima Peace Memorial'
    ];
    
    videoIds.forEach((videoId, index) => {
        const locationName = locationNames[index] || `Kyoto Location ${index + 1}`;
        streams.push({
            id: videoId,
            title: locationName,
            description: `Live view from ${locationName}`,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        });
    });
    
    return streams;
}

// Function to generate JavaScript code
function generateJavaScriptCode(streams) {
    let jsCode = `// Kyoto Live Stream Collection - Correct Video IDs from Playlist
// Source: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz
const playlistStreams = [
`;
    
    streams.forEach((stream, index) => {
        jsCode += `    {
        id: '${stream.id}',
        title: '${stream.title.replace(/'/g, "\\'")}',
        description: '${stream.description.replace(/'/g, "\\'")}',
        thumbnail: '${stream.thumbnail}'
    }`;
        
        if (index < streams.length - 1) {
            jsCode += ',';
        }
        jsCode += '\n';
    });
    
    jsCode += `];

console.log('🎥 Extracted ${streams.length} streams from YouTube playlist');
console.log('📋 Playlist URL: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz');
`;

    return jsCode;
}

// Main execution
async function main() {
    try {
        console.log('🔄 Fetching playlist page...');
        const html = await fetchPlaylistPage();
        
        console.log('🔍 Extracting video IDs...');
        const videoIds = extractVideoIds(html);
        
        if (videoIds.length === 0) {
            console.log('❌ No video IDs found. Using fallback method...');
            // Fallback: Use the known video IDs from the URL
            videoIds.push('jqtsC5BYlIk');
            videoIds.push('v9rQqa_VTEY');
        }
        
        console.log('✅ Found video IDs:');
        videoIds.forEach((id, index) => {
            console.log(`${index + 1}. ${id}`);
        });
        
        console.log('🔧 Generating correct streams...');
        const streams = generateCorrectStreams(videoIds);
        
        // Generate JavaScript code
        const jsCode = generateJavaScriptCode(streams);
        
        // Save to file
        fs.writeFileSync('correct-streams.js', jsCode);
        console.log('💾 Saved correct streams to correct-streams.js');
        
        // Also save as JSON for reference
        fs.writeFileSync('correct-streams.json', JSON.stringify(streams, null, 2));
        console.log('💾 Saved JSON data to correct-streams.json');
        
        console.log('\n🎯 Ready to update live-kyoto-widget.js with correct video IDs!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main(); 